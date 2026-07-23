import json

# Maximum number of dynamic output slots besides the "输出全部" slot.
# Each item (词组栏 or 文本框) only generates a dedicated output when its
# "单独输出" (solo) switch is enabled. 20 is a comfortable ceiling.
MAX_SOLO_ITEMS = 20
# Total outputs the node advertises statically: 1 (输出全部) + MAX_SOLO_ITEMS.
# The frontend dynamically trims visible slots to match the actual solo count.
MAX_OUTPUTS = 1 + MAX_SOLO_ITEMS


def _item_label(index, name=None):
    """Return a human-readable label for an item."""
    if name:
        return name
    return f"条目{str(index + 1).zfill(2)}"


def _migrate_to_items(data):
    """Convert any persisted payload into a normalized ``items`` list.

    Accepted shapes:
      * {"items": [...]}            -> normalized as-is
      * {"bars": [...]} (legacy)    -> each bar becomes a type:'bar' item
      * {"prompts": ...} (legacy)   -> wrapped into a single bar item
    Every item is guaranteed to have a ``type`` field.
    """
    items = []
    if isinstance(data.get("items"), list):
        items = data["items"]
    elif isinstance(data.get("bars"), list):
        for bar in data["bars"]:
            if not isinstance(bar, dict):
                continue
            item = dict(bar)
            item["type"] = "bar"
            items.append(item)
    elif isinstance(data.get("prompts"), list):
        items = [{
            "type": "bar",
            "name": _item_label(0),
            "prompts": data.get("prompts", []),
            "weights": data.get("weights", {}),
            "disabled": data.get("disabled", {}),
            "prompt_separator": ", ",
            "bar_separator": ", ",
        }]
    return items


def _resolve_item_value(item, name, kwargs):
    """Return the output string for a single item given incoming connections.

    For a 文本框 (textbox): a connected STRING input wins over the manually
    typed text (per the user's chosen "连接优先" rule). Otherwise the typed
    ``text`` field is used.
    """
    if item.get("type") == "textbox":
        if item.get("disabled", False):  # 手动禁用:输出空字符串
            return ""
        connected = kwargs.get(name)
        if connected not in (None, ""):
            return str(connected)
        return item.get("text", "") or ""

    # Default: treat as 词组栏 (bar) for backward compatibility.
    prompts = item.get("prompts", [])
    weights = item.get("weights", {})
    disabled = item.get("disabled", {})
    disabled_words_map = item.get("disabledWords", {})
    separator = item.get("prompt_separator", ", ")
    parts = []
    for p in prompts:
        content = p.get("content", "")
        pid = p.get("id", p.get("title", ""))  # key by id, fallback to title
        if disabled.get(str(pid), False):
            continue
        # 单词级开关: 按 "," 拆分内容,过滤掉被禁用的单词后重新拼接.
        dw = disabled_words_map.get(str(pid), [])
        if dw:
            dw_set = set(str(w).strip() for w in dw if str(w).strip())
            words = [w.strip() for w in str(content).split(",")]
            words = [w for w in words if w and w not in dw_set]
            content = separator.join(words)
        weight = weights.get(str(pid), 1.0)
        if weight != 1.0:
            parts.append(f"({content}:{weight:.2f})")
        else:
            parts.append(content)
    return separator.join(parts)


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

    # Static ceiling; the frontend trims visible slots to the live solo count.
    RETURN_TYPES = ("STRING",) * MAX_OUTPUTS
    RETURN_NAMES = ("输出全部",) + tuple(f"单独输出{i+1:02d}" for i in range(MAX_SOLO_ITEMS))
    FUNCTION = "generate_prompt"
    CATEGORY = "Hezl-Node/Prompt"
    OUTPUT_NODE = True

    @classmethod
    def IS_CHANGED(cls, **kwargs):
        return float("nan")

    @classmethod
    def VALIDATE_INPUTS(cls, **kwargs):
        # Dynamic textbox inputs arrive as arbitrary kwargs; accept them all.
        return True

    def generate_prompt(self, selected_prompts, prompt_id=None, **kwargs):
        try:
            data = json.loads(selected_prompts) if selected_prompts else {}
            items = _migrate_to_items(data)

            # Make sure every item has a name and a solo flag.
            for i, item in enumerate(items):
                if not item.get("name"):
                    item["name"] = _item_label(i)
                if item.get("solo") is None:
                    item["solo"] = False

            # Compute each item's resolved string once.
            resolved = []
            for item in items:
                resolved.append(_resolve_item_value(item, item["name"], kwargs))

            # "输入全部替换": if an external STRING is connected to this slot,
            # the "输出全部" output returns ONLY the external string.
            replace_all = kwargs.get("输入全部替换")
            if replace_all not in (None, ""):
                all_output = str(replace_all)
            else:
                # "输出全部": concatenate items in display order, skipping solo ones.
                # Each item's ``bar_separator`` ("与下一个词组栏间隔符号") means
                # "the gap between THIS item and the next non-solo item". So the
                # separator that glues the previous item to the current one is
                # the previous item's ``bar_separator``.
                non_solo = [it for it in items if not it.get("solo")]
                resolved_non_solo = [
                    resolved[i] for i, it in enumerate(items) if not it.get("solo")
                ]
                all_output = ""
                for idx, text in enumerate(resolved_non_solo):
                    if idx == 0:
                        all_output = text
                    else:
                        # Gap between previous item and current = previous item's separator
                        all_output += non_solo[idx - 1].get("bar_separator", ", ")
                        all_output += text

            # Dedicated outputs: one per solo item, in display order.
            solo_outputs = []
            for i, item in enumerate(items):
                if item.get("solo"):
                    solo_outputs.append(resolved[i])

            results = [all_output] + solo_outputs
            while len(results) < MAX_OUTPUTS:
                results.append("")
            return tuple(results)
        except Exception as e:
            error_result = f"Error: {str(e)}"
            return tuple([error_result] * MAX_OUTPUTS)
