# ComfyUI插件开发计划

## 项目概述
创建一个ComfyUI自定义节点插件，并提供一个skill来帮助开发ComfyUI插件。

## 实施步骤

### 第一步：创建ComfyUI插件开发Skill
创建 `.trae/skills/comfyui-plugin/SKILL.md` 文件，包含：
- ComfyUI插件的标准结构
- 节点开发规范
- 常用API和模式
- 调试和测试方法

### 第二步：创建插件基础结构
创建以下文件结构：
```
Comfyui_Hezl-Prompt/
├── __init__.py          # 插件入口，注册节点
├── nodes.py             # 节点定义
├── requirements.txt     # 依赖（如需要）
└── README.md            # 说明文档
```

### 第三步：实现核心节点
根据插件名称 "Hezl-Prompt"，创建提示词相关的节点：
- 提示词处理节点
- 提示词组合/增强节点
- 可能的其他辅助节点

### 第四步：完善插件配置
- 添加必要的依赖
- 配置节点显示信息
- 添加示例工作流

## Skill内容设计

### ComfyUI Plugin Skill
- **名称**: comfyui-plugin
- **描述**: 帮助开发ComfyUI自定义节点插件。当用户需要创建ComfyUI节点、开发ComfyUI插件或修改现有节点时调用此skill。
- **内容**:
  - 插件目录结构规范
  - 节点类定义模板
  - INPUT_TYPES定义方法
  - 返回值格式
  - 常用数据类型
  - 调试技巧

## 插件节点设计（初步）

### HezlPromptNode
- 输入：文本提示词
- 功能：处理/增强提示词
- 输出：处理后的提示词

## 注意事项
- 遵循ComfyUI的节点开发规范
- 确保与ComfyUI主程序兼容
- 提供清晰的节点说明
