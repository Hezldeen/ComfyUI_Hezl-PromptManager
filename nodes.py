import json

class HezlPromptNode:
    @classmethod
    def INPUT_TYPES(cls):
        return {
            "required": {
                "selected_prompts": ("STRING", {"default": "{}", "multiline": True}),
            },
            "optional": {},
            "hidden": {
                "prompt_id": "UNIQUE_ID",
            },
        }

    RETURN_TYPES = ("STRING",)
    RETURN_NAMES = ("prompt",)
    FUNCTION = "generate_prompt"
    CATEGORY = "Hezl-Node/Prompt"
    OUTPUT_NODE = True

    def generate_prompt(self, selected_prompts, prompt_id=None):
        try:
            data = json.loads(selected_prompts)
            prompts = data.get("prompts", [])
            weights = data.get("weights", {})
            disabled = data.get("disabled", {})
            
            result_parts = []
            for p in prompts:
                title = p.get("title", "")
                content = p.get("content", "")
                
                if disabled.get(title, False):
                    continue
                
                weight = weights.get(title, 1.0)
                
                if weight != 1.0:
                    formatted = f"({content}:{weight:.2f})"
                else:
                    formatted = content
                result_parts.append(formatted)
            
            result = ", ".join(result_parts)
            return (result,)
        except Exception as e:
            return (f"Error: {str(e)}",)

    @classmethod
    def IS_CHANGED(cls, **kwargs):
        return float("nan")
