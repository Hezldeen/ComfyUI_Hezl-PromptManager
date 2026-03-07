---
name: "comfyui-plugin"
description: "Helps develop ComfyUI custom node plugins. Invoke when user needs to create ComfyUI nodes, develop ComfyUI plugins, or modify existing nodes."
---

# ComfyUI Plugin Development Skill

This skill provides guidance for developing ComfyUI custom node plugins.

## Plugin Directory Structure

```
ComfyUI/
└── custom_nodes/
    └── your_plugin_name/
        ├── __init__.py          # Plugin entry point, registers nodes
        ├── nodes.py             # Node definitions
        ├── js/                  # JavaScript UI files
        │   └── your_node.js
        ├── csv/                 # Data files (if needed)
        ├── requirements.txt     # Dependencies
        └── README.md            # Documentation
```

## Node Class Definition Template

```python
class YourNodeName:
    @classmethod
    def INPUT_TYPES(cls):
        return {
            "required": {
                "input_name": ("DATA_TYPE", {"default": value}),
            },
        }

    RETURN_TYPES = ("STRING",)
    RETURN_NAMES = ("output_name",)
    FUNCTION = "function_name"
    CATEGORY = "category/subcategory"
    OUTPUT_NODE = True  # Set True if this is an output node

    def function_name(self, input_name):
        # Process your logic here
        return (result,)
```

## Common Data Types

- `STRING` - Text input
- `INT` - Integer number
- `FLOAT` - Floating point number
- `BOOLEAN` - True/False
- `IMAGE` - Image tensor (C,H,W format, 0-1 range)
- `LATENT` - Latent representation
- `CONDITIONING` - Conditioning data
- `MODEL` - Model weights
- `CLIP` - CLIP model
- `VAE` - VAE model
- `COMBO` - Dropdown selection

## Input Types Configuration

```python
@classmethod
def INPUT_TYPES(cls):
    return {
        "required": {
            "text": ("STRING", {"default": "", "multiline": True}),
            "number": ("INT", {"default": 0, "min": 0, "max": 100}),
            "float_val": ("FLOAT", {"default": 1.0, "min": 0.0, "max": 10.0, "step": 0.1}),
            "choice": (["option1", "option2", "option3"], {"default": "option1"}),
        },
        "optional": {
            "optional_input": ("STRING", {"default": ""}),
        },
        "hidden": {
            "hidden_param": ("STRING", {"default": ""}),
        },
    }
```

## JavaScript UI Integration

```javascript
import { app } from "../../../scripts/app.js";
import { ComfyWidgets } from "../../../scripts/widgets.js";

app.registerExtension({
    name: "your.plugin.name",
    async beforeRegisterNodeDef(nodeType, nodeData, app) {
        if (nodeData.name === "YourNodeName") {
            // Customize node behavior
        }
    },
    async setup(app) {
        // Setup code
    },
});
```

## API Routes (Python Backend)

```python
from aiohttp import web

class YourNode:
    @classmethod
    def IS_CHANGED(cls, **kwargs):
        return float("nan")  # Always re-execute

# In __init__.py
WEB_DIRECTORY = "./js"
NODE_CLASS_MAPPINGS = {
    "YourNodeName": YourNode,
}
NODE_DISPLAY_NAME_MAPPINGS = {
    "YourNodeName": "Display Name"
}

__all__ = ['NODE_CLASS_MAPPINGS', 'NODE_DISPLAY_NAME_MAPPINGS', 'WEB_DIRECTORY']

# Add API routes
from server import PromptServer
routes = PromptServer.instance.routes

@routes.post("/api/your_endpoint")
async def your_endpoint(request):
    data = await request.json()
    # Process request
    return web.json_response({"result": "success"})
```

## Debugging Tips

1. Check ComfyUI console output for errors
2. Use `print()` statements in Python code
3. Use browser developer tools for JavaScript debugging
4. Restart ComfyUI after code changes
5. Clear browser cache if UI changes don't appear

## Best Practices

1. Use descriptive node and parameter names
2. Provide default values for all inputs
3. Include input validation
4. Handle edge cases gracefully
5. Document complex logic with comments
6. Follow ComfyUI naming conventions
