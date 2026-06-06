import json

MAX_BARS = 10
# Default number of bars shown on a freshly created node (1 bar => 2 outputs).
DEFAULT_BARS = 1


def _bar_label(index, name=None):
    if name:
        return name
    return f"词组栏{str(index + 1).zfill(2)}"


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

    # Source of truth: the maximum number of outputs (1 + MAX_BARS).
    # The frontend dynamically trims the visible output slots to match the
    # current bar count (default 1 bar => only "输出全部" and "词组栏01" are visible).
    RETURN_TYPES = ("STRING",) * (1 + MAX_BARS)
    RETURN_NAMES = ("输出全部",) + tuple(_bar_label(i) for i in range(MAX_BARS))
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
                    "name": _bar_label(0),
                    "prompts": prompts,
                    "weights": weights,
                    "disabled": disabled
                }]

            # Make sure every bar has a name; otherwise label it with its index
            for i, bar in enumerate(bars):
                if not bar.get("name"):
                    bar["name"] = _bar_label(i)

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
