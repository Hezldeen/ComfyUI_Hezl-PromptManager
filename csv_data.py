import os
import csv
import shutil

class CSVDataManager:
    def __init__(self, csv_dir):
        self.csv_dir = csv_dir
        self.ensure_directories()
    
    def ensure_directories(self):
        os.makedirs(self.csv_dir, exist_ok=True)
    
    def get_folder_structure(self):
        def scan_directory(base_path, relative_path=""):
            result = {
                "name": os.path.basename(base_path) if relative_path else "root",
                "path": relative_path,
                "type": "folder",
                "children": []
            }
            
            try:
                items = sorted(os.listdir(base_path))
            except:
                return result
            
            for item in items:
                item_path = os.path.join(base_path, item)
                item_rel_path = os.path.join(relative_path, item) if relative_path else item
                
                if os.path.isdir(item_path):
                    child = scan_directory(item_path, item_rel_path)
                    result["children"].append(child)
                elif item.endswith('.csv'):
                    prompt_count = self.count_prompts_in_csv(item_path)
                    result["children"].append({
                        "name": item[:-4],
                        "path": item_rel_path,
                        "type": "csv",
                        "count": prompt_count
                    })
            
            return result
        
        structure = scan_directory(self.csv_dir)
        
        return {
            "default": structure
        }
    
    def count_prompts_in_csv(self, csv_path):
        try:
            with open(csv_path, 'r', encoding='utf-8') as f:
                reader = csv.reader(f)
                header = next(reader, None)
                if header:
                    return sum(1 for _ in reader)
        except:
            pass
        return 0
    
    def get_prompts_in_folder(self, folder_path):
        prompts = []
        
        actual_path = os.path.join(self.csv_dir, folder_path)
        
        if os.path.isfile(actual_path) and actual_path.endswith('.csv'):
            prompts = self.read_csv_file(actual_path)
        elif os.path.isdir(actual_path):
            prompts = self._read_all_csv_in_dir(actual_path)
        
        return prompts
    
    def _read_all_csv_in_dir(self, dir_path):
        prompts = []
        try:
            for item in sorted(os.listdir(dir_path)):
                item_path = os.path.join(dir_path, item)
                if os.path.isfile(item_path) and item.endswith('.csv'):
                    prompts.extend(self.read_csv_file(item_path))
                elif os.path.isdir(item_path):
                    prompts.extend(self._read_all_csv_in_dir(item_path))
        except Exception as e:
            print(f"Error reading directory {dir_path}: {e}")
        return prompts
    
    def read_csv_file(self, csv_path):
        prompts = []
        try:
            with open(csv_path, 'r', encoding='utf-8') as f:
                reader = csv.DictReader(f)
                for row in reader:
                    prompts.append({
                        "title": row.get('title', ''),
                        "content": row.get('content', '')
                    })
        except FileNotFoundError:
            pass
        except Exception as e:
            print(f"Error reading CSV {csv_path}: {e}")
        
        return prompts
    
    def write_csv_file(self, csv_path, prompts):
        try:
            os.makedirs(os.path.dirname(csv_path), exist_ok=True)
            with open(csv_path, 'w', encoding='utf-8', newline='') as f:
                fieldnames = ['title', 'content']
                writer = csv.DictWriter(f, fieldnames=fieldnames)
                writer.writeheader()
                for prompt in prompts:
                    writer.writerow({
                        'title': prompt.get('title', ''),
                        'content': prompt.get('content', '')
                    })
            return True
        except Exception as e:
            print(f"Error writing CSV {csv_path}: {e}")
            return False
    
    def add_folder(self, parent_path, folder_name):
        try:
            if parent_path:
                base_path = os.path.join(self.csv_dir, parent_path)
            else:
                base_path = self.csv_dir
            
            new_folder_path = os.path.join(base_path, folder_name)
            os.makedirs(new_folder_path, exist_ok=True)
            
            relative_path = os.path.join(parent_path, folder_name) if parent_path else folder_name
            return {"success": True, "path": relative_path}
        except Exception as e:
            return {"success": False, "error": str(e)}
    
    def delete_folder(self, folder_path):
        try:
            actual_path = os.path.join(self.csv_dir, folder_path)
            
            if os.path.exists(actual_path):
                shutil.rmtree(actual_path)
            
            return {"success": True}
        except Exception as e:
            return {"success": False, "error": str(e)}
    
    def rename_folder(self, folder_path, new_name):
        try:
            actual_path = os.path.join(self.csv_dir, folder_path)
            
            if not os.path.exists(actual_path):
                return {"success": False, "error": "Folder not found"}
            
            parent_path = os.path.dirname(actual_path)
            new_path = os.path.join(parent_path, new_name)
            
            if os.path.exists(new_path):
                return {"success": False, "error": "A folder with this name already exists"}
            
            os.rename(actual_path, new_path)
            
            return {"success": True}
        except Exception as e:
            return {"success": False, "error": str(e)}
    
    def update_prompt(self, folder, old_title, new_title, new_content):
        try:
            actual_path = os.path.join(self.csv_dir, folder)
            
            csv_path = None
            if os.path.isfile(actual_path) and actual_path.endswith('.csv'):
                csv_path = actual_path
            elif os.path.isdir(actual_path):
                for item in os.listdir(actual_path):
                    if item.endswith('.csv'):
                        csv_path = os.path.join(actual_path, item)
                        break
            
            if not csv_path or not os.path.exists(csv_path):
                return {"success": False, "error": "CSV file not found"}
            
            prompts = self.read_csv_file(csv_path)
            
            found = False
            for prompt in prompts:
                if prompt['title'] == old_title:
                    prompt['title'] = new_title
                    prompt['content'] = new_content
                    found = True
                    break
            
            if not found:
                return {"success": False, "error": "Prompt not found"}
            
            if self.write_csv_file(csv_path, prompts):
                return {"success": True}
            else:
                return {"success": False, "error": "Failed to write CSV file"}
        except Exception as e:
            return {"success": False, "error": str(e)}
    
    def add_prompt(self, folder, title, content):
        try:
            actual_path = os.path.join(self.csv_dir, folder)
            
            if not os.path.isfile(actual_path) or not actual_path.endswith('.csv'):
                return {"success": False, "error": "Invalid CSV file path"}
            
            csv_path = actual_path
            prompts = self.read_csv_file(csv_path)
            
            for prompt in prompts:
                if prompt['title'] == title:
                    return {"success": False, "error": "Prompt already exists"}
            
            prompts.append({
                "title": title,
                "content": content
            })
            
            if self.write_csv_file(csv_path, prompts):
                return {"success": True}
            else:
                return {"success": False, "error": "Failed to write CSV file"}
        except Exception as e:
            return {"success": False, "error": str(e)}