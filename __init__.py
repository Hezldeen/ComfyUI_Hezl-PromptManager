from .nodes import HezlPromptNode
from .csv_data import CSVDataManager
from .csv_data import PresetManager

WEB_DIRECTORY = "./js"

NODE_CLASS_MAPPINGS = {
    "HezlPrompt": HezlPromptNode,
}

NODE_DISPLAY_NAME_MAPPINGS = {
    "HezlPrompt": "Hezl-PromptManager",
}

__all__ = ['NODE_CLASS_MAPPINGS', 'NODE_DISPLAY_NAME_MAPPINGS', 'WEB_DIRECTORY']

import os
import json
from aiohttp import web
from server import PromptServer

csv_dir = os.path.join(os.path.dirname(__file__), "csv")

os.makedirs(csv_dir, exist_ok=True)

data_manager = CSVDataManager(csv_dir)

# 词组栏预设存储目录 (SavePreset), 与 csv 目录同级.
preset_dir = os.path.join(os.path.dirname(__file__), "SavePreset")
os.makedirs(preset_dir, exist_ok=True)
preset_manager = PresetManager(preset_dir)

routes = PromptServer.instance.routes

@routes.get("/hezl_prompt/get_structure")
async def get_structure(request):
    structure = data_manager.get_folder_structure()
    return web.json_response(structure)

@routes.get("/hezl_prompt/get_prompts")
async def get_prompts(request):
    folder_path = request.rel_url.query.get("folder", "")
    prompts = data_manager.get_prompts_in_folder(folder_path)
    return web.json_response(prompts)

@routes.get("/hezl_prompt/search_prompts")
async def search_prompts(request):
    keyword = request.rel_url.query.get("keyword", "")
    matches = data_manager.search_prompts(keyword)
    return web.json_response({"matches": list(matches)})

@routes.post("/hezl_prompt/add_folder")
async def add_folder(request):
    data = await request.json()
    result = data_manager.add_folder(
        parent_path=data.get("parent", ""),
        folder_name=data.get("name", "")
    )
    return web.json_response(result)

@routes.post("/hezl_prompt/delete_folder")
async def delete_folder(request):
    data = await request.json()
    result = data_manager.delete_folder(
        folder_path=data.get("path", "")
    )
    return web.json_response(result)

@routes.post("/hezl_prompt/rename_folder")
async def rename_folder(request):
    data = await request.json()
    result = data_manager.rename_folder(
        folder_path=data.get("path", ""),
        new_name=data.get("new_name", "")
    )
    return web.json_response(result)

@routes.post("/hezl_prompt/update_prompt")
async def update_prompt(request):
    data = await request.json()
    result = data_manager.update_prompt(
        folder=data.get("folder", ""),
        old_title=data.get("old_title", ""),
        new_title=data.get("new_title", ""),
        new_content=data.get("new_content", "")
    )
    return web.json_response(result)

@routes.post("/hezl_prompt/add_prompt")
async def add_prompt(request):
    data = await request.json()
    result = data_manager.add_prompt(
        folder=data.get("folder", ""),
        title=data.get("title", ""),
        content=data.get("content", "")
    )
    return web.json_response(result)

@routes.post("/hezl_prompt/add_prompt_at")
async def add_prompt_at(request):
    data = await request.json()
    result = data_manager.add_prompt_at(
        folder=data.get("folder", ""),
        title=data.get("title", ""),
        content=data.get("content", ""),
        index=data.get("index", 0)
    )
    return web.json_response(result)

@routes.post("/hezl_prompt/create_csv_file")
async def create_csv_file(request):
    data = await request.json()
    result = data_manager.create_csv_file(
        folder_path=data.get("folder", ""),
        file_name=data.get("name", "")
    )
    return web.json_response(result)

@routes.post("/hezl_prompt/delete_csv_file")
async def delete_csv_file(request):
    data = await request.json()
    result = data_manager.delete_csv_file(
        csv_path=data.get("path", "")
    )
    return web.json_response(result)

@routes.post("/hezl_prompt/rename_csv_file")
async def rename_csv_file(request):
    data = await request.json()
    result = data_manager.rename_csv_file(
        csv_path=data.get("path", ""),
        new_name=data.get("new_name", "")
    )
    return web.json_response(result)

@routes.post("/hezl_prompt/move_csv_file")
async def move_csv_file(request):
    data = await request.json()
    result = data_manager.move_csv_file(
        csv_path=data.get("path", ""),
        target_folder=data.get("target_folder", "")
    )
    return web.json_response(result)

@routes.post("/hezl_prompt/delete_prompt")
async def delete_prompt(request):
    data = await request.json()
    result = data_manager.delete_prompt(
        folder=data.get("folder", ""),
        title=data.get("title", "")
    )
    return web.json_response(result)

@routes.post("/hezl_prompt/batch_move_prompts")
async def batch_move_prompts(request):
    data = await request.json()
    result = data_manager.batch_move_prompts(
        source_csv=data.get("source", ""),
        target_csv=data.get("target", ""),
        titles=data.get("titles", [])
    )
    return web.json_response(result)

@routes.post("/hezl_prompt/reorder_prompts")
async def reorder_prompts(request):
    data = await request.json()
    result = data_manager.reorder_prompts(
        folder=data.get("folder", ""),
        prompts=data.get("prompts", [])
    )
    return web.json_response(result)

# ==================== 词组栏预设 (SavePreset) ====================

@routes.get("/hezl_prompt/list_presets")
async def list_presets(request):
    return web.json_response({"presets": preset_manager.list_presets()})

@routes.get("/hezl_prompt/get_preset")
async def get_preset(request):
    name = request.rel_url.query.get("name", "")
    result = preset_manager.get_preset(name)
    return web.json_response(result)

@routes.post("/hezl_prompt/save_preset")
async def save_preset(request):
    data = await request.json()
    result = preset_manager.save_preset(
        name=data.get("name", ""),
        data=data.get("data", {})
    )
    return web.json_response(result)

@routes.post("/hezl_prompt/rename_preset")
async def rename_preset(request):
    data = await request.json()
    result = preset_manager.rename_preset(
        old_name=data.get("old_name", ""),
        new_name=data.get("new_name", "")
    )
    return web.json_response(result)

@routes.post("/hezl_prompt/delete_preset")
async def delete_preset(request):
    data = await request.json()
    result = preset_manager.delete_preset(name=data.get("name", ""))
    return web.json_response(result)
