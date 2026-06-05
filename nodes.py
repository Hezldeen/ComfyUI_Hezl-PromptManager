import json

MAX_BARS = 10

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

    # Define max outputs: 1 (输出全部) + MAX_BARS
    RETURN_TYPES = ("STRING",) * (1 + MAX_BARS)
    RETURN_NAMES = ("输出全部",) + tuple(f"词组栏{str(i+1).zfill(2)}" for i in range(MAX_BARS))
    FUNCTION = "generate_prompt"
    CATEGORY = "Hezl-Node/Prompt"
    OUTPUT_NODE = True

    @classmethod
    def IS_CHANGED(cls, **kwargs):
        return float("nan")

    @classmethod
    def VALIDATE_INPUTS(cls, **kwargs):
        return True

    def generate_prompt(self, selected_prompts, prompt_id=None):
        try:
            data = json.loads(selected_prompts)
            bars = data.get("bars", None)
            if bars is None:
                # Legacy format - convert to single bar
                prompts = data.get("prompts", [])
                weights = data.get("weights", {})
                disabled = data.get("disabled", {})
                bars = [{
                    "prompts": prompts,
                    "weights": weights,
                    "disabled": disabled
                }]

            def format_bar(bar):
                prompts = bar.get("prompts", [])
                weights = bar.get("weights", {})
                disabled = bar.get("disabled", {})
                result_parts = []
                for p in prompts:
                    title = p.get("title", "")
                    content = p.get("content", "")
                    pid = p.get("id", title)  # Use id as key, fallback to title for legacy
                    if disabled.get(str(pid), False):
                        continue
                    weight = weights.get(str(pid), 1.0)
                    if weight != 1.0:
                        formatted = f"({content}:{weight:.2f})"
                    else:
                        formatted = content
                    result_parts.append(formatted)
                return ", ".join(result_parts)

            # Build all outputs
            all_parts = []
            bar_results = []
            for bar in bars:
                bar_result = format_bar(bar)
                bar_results.append(bar_result)
                all_parts.append(bar_result)

            all_output = ", ".join(all_parts)

            # Build results: first is all combined, then one per bar
            # Pad with empty strings for unused outputs
            results = [all_output] + bar_results
            while len(results) < 1 + MAX_BARS:
                results.append("")

            return tuple(results)
        except Exception as e:
            error_result = f"Error: {str(e)}"
            return tuple([error_result] * (1 + MAX_BARS))
