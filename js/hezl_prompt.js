import { app } from "../../../scripts/app.js";
import { ComfyWidgets } from "../../../scripts/widgets.js";

const HEZL_PROMPT_CSS = `
.hezl-prompt-container {
    display: flex;
    flex-direction: column;
    height: 600px;
    background: #1e1e1e;
    border-radius: 8px;
    overflow: hidden;
    font-family: Arial, sans-serif;
    color: #fff;
}

.hezl-prompt-top {
    display: flex;
    flex: 1;
    min-height: 0;
    border-bottom: 1px solid #444;
}

.hezl-prompt-bottom {
    height: 200px;
    padding: 8px;
    overflow-y: auto;
    background: #252525;
}

.hezl-prompt-sidebar {
    width: 200px;
    border-right: 1px solid #444;
    overflow-y: auto;
    background: #1a1a1a;
}

.hezl-prompt-list {
    flex: 1;
    overflow-y: auto;
    padding: 6px;
    background: #222;
}

.hezl-folder-tree {
    padding: 4px;
}

.hezl-folder-item {
    cursor: pointer;
    padding: 3px 6px;
    margin: 1px 0;
    border-radius: 3px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    transition: background 0.2s;
    font-size: 11px;
}

.hezl-folder-item:hover {
    background: #333;
}

.hezl-folder-item.selected {
    background: #3a3a3a;
}

.hezl-folder-icon {
    margin-right: 4px;
    font-size: 10px;
}

.hezl-folder-name {
    flex: 1;
}

.hezl-folder-count {
    background: #e74c3c;
    color: white;
    border-radius: 8px;
    padding: 1px 5px;
    font-size: 9px;
    cursor: pointer;
    min-width: 14px;
    text-align: center;
}

.hezl-folder-count:hover::after {
    content: '✕';
}

.hezl-folder-count:hover {
    background: #c0392b;
}

.hezl-prompt-item {
    background: #2a2a2a;
    border-radius: 4px;
    padding: 5px 8px;
    margin: 3px 0;
    cursor: pointer;
    transition: all 0.2s;
    border-left: 2px solid #3498db;
    font-size: 11px;
}

.hezl-prompt-item:hover {
    background: #333;
}

.hezl-prompt-item.selected {
    border-left-color: #27ae60;
    background: #2d3748;
}

.hezl-prompt-item.dragging {
    opacity: 0.5;
    transform: scale(0.98);
}

.hezl-prompt-title {
    font-weight: bold;
    margin-bottom: 2px;
    font-size: 11px;
}

.hezl-prompt-content {
    font-size: 10px;
    color: #aaa;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
}

.hezl-preview-container {
    display: flex;
    flex-wrap: wrap;
    gap: 4px;
    min-height: 40px;
    padding: 6px;
    background: #1a1a1a;
    border-radius: 4px;
}

.hezl-preview-item {
    background: #2a5298;
    border-radius: 3px;
    padding: 4px 8px;
    cursor: grab;
    display: flex;
    align-items: center;
    gap: 4px;
    transition: all 0.2s;
    font-size: 11px;
}

.hezl-preview-item:hover {
    background: #2e6da4;
}

.hezl-preview-item.dragging {
    opacity: 0.5;
    cursor: grabbing;
}

.hezl-preview-item.drag-over {
    border: 1px dashed #fff;
}

.hezl-preview-item.disabled {
    background: #555;
    color: #888;
    opacity: 0.6;
}

.hezl-preview-item.disabled:hover {
    background: #666;
}

.hezl-preview-text {
    max-width: 120px;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
}

.hezl-weight-control {
    display: flex;
    align-items: center;
    gap: 2px;
}

.hezl-weight-btn {
    width: 16px;
    height: 16px;
    border: none;
    border-radius: 2px;
    background: #444;
    color: #fff;
    cursor: pointer;
    font-size: 10px;
}

.hezl-weight-btn:hover {
    background: #555;
}

.hezl-weight-value {
    font-size: 9px;
    min-width: 28px;
    text-align: center;
}

.hezl-remove-btn {
    width: 14px;
    height: 14px;
    border: none;
    border-radius: 2px;
    background: #e74c3c;
    color: #fff;
    cursor: pointer;
    font-size: 8px;
    margin-left: 2px;
}

.hezl-remove-btn:hover {
    background: #c0392b;
}

.hezl-toolbar {
    display: flex;
    gap: 6px;
    padding: 6px;
    background: #1a1a1a;
    border-bottom: 1px solid #444;
    flex-wrap: wrap;
}

.hezl-btn {
    padding: 4px 10px;
    border: none;
    border-radius: 3px;
    background: #3498db;
    color: #fff;
    cursor: pointer;
    font-size: 11px;
    transition: background 0.2s;
}

.hezl-btn:hover {
    background: #2980b9;
}

.hezl-btn.success {
    background: #27ae60;
}

.hezl-btn.success:hover {
    background: #219a52;
}

.hezl-btn.danger {
    background: #e74c3c;
}

.hezl-btn.danger:hover {
    background: #c0392b;
}

.hezl-btn.warning {
    background: #f39c12;
}

.hezl-btn.warning:hover {
    background: #d68910;
}

.hezl-btn.small {
    padding: 2px 6px;
    font-size: 10px;
}

.hezl-modal {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0,0,0,0.7);
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 10000;
}

.hezl-modal-content {
    background: #2a2a2a;
    border-radius: 8px;
    padding: 20px;
    width: 400px;
    max-height: 80vh;
    overflow-y: auto;
}

.hezl-modal-header {
    font-size: 18px;
    font-weight: bold;
    margin-bottom: 15px;
    padding-bottom: 10px;
    border-bottom: 1px solid #444;
}

.hezl-form-group {
    margin-bottom: 15px;
}

.hezl-form-label {
    display: block;
    margin-bottom: 5px;
    font-size: 13px;
    color: #aaa;
}

.hezl-form-input {
    width: 100%;
    padding: 8px;
    border: 1px solid #444;
    border-radius: 4px;
    background: #1a1a1a;
    color: #fff;
    font-size: 13px;
    box-sizing: border-box;
}

.hezl-form-input:focus {
    outline: none;
    border-color: #3498db;
}

.hezl-form-textarea {
    width: 100%;
    min-height: 80px;
    padding: 8px;
    border: 1px solid #444;
    border-radius: 4px;
    background: #1a1a1a;
    color: #fff;
    font-size: 13px;
    resize: vertical;
    box-sizing: border-box;
}

.hezl-modal-actions {
    display: flex;
    gap: 10px;
    justify-content: flex-end;
    margin-top: 20px;
}

.hezl-empty-state {
    text-align: center;
    padding: 30px;
    color: #666;
    font-size: 11px;
}

.hezl-output-text {
    background: #1a1a1a;
    border-radius: 4px;
    padding: 8px;
    margin-top: 8px;
    font-family: monospace;
    font-size: 11px;
    word-break: break-all;
    color: #27ae60;
}

.hezl-section-title {
    font-size: 11px;
    font-weight: bold;
    margin-bottom: 4px;
    color: #aaa;
    padding: 4px 6px;
    display: flex;
    justify-content: space-between;
    align-items: center;
}

.hezl-sidebar-actions {
    display: flex;
    gap: 2px;
}

.hezl-sidebar-actions .hezl-btn {
    padding: 2px 5px;
    font-size: 10px;
}

.hezl-tree-toggle {
    display: inline-block;
    width: 12px;
    cursor: pointer;
    text-align: center;
    font-size: 8px;
}

.hezl-folder-children {
    overflow: hidden;
    transition: max-height 0.3s ease-out;
}

.hezl-folder-children.collapsed {
    max-height: 0 !important;
}

.hezl-hover-preview {
    position: fixed;
    z-index: 10002;
    background: #2a2a2a;
    border: 1px solid #444;
    border-radius: 6px;
    padding: 8px;
    box-shadow: 0 4px 12px rgba(0,0,0,0.5);
    max-width: 300px;
}

.hezl-hover-preview img {
    max-width: 280px;
    max-height: 200px;
    border-radius: 4px;
    display: block;
}

.hezl-hover-preview-text {
    font-size: 11px;
    color: #aaa;
    margin-top: 6px;
    word-break: break-all;
}

.hezl-preview-actions {
    display: flex;
    gap: 4px;
    margin-bottom: 6px;
}

.hezl-context-menu {
    position: fixed;
    background: #2a2a2a;
    border: 1px solid #444;
    border-radius: 4px;
    padding: 4px 0;
    z-index: 10003;
    min-width: 120px;
}

.hezl-context-menu-item {
    padding: 6px 12px;
    cursor: pointer;
    font-size: 11px;
}

.hezl-context-menu-item:hover {
    background: #3498db;
}

.hezl-prompt-item-wrapper {
    display: flex;
    align-items: center;
    background: #2a2a2a;
    border-radius: 4px;
    margin: 3px 0;
    border-left: 2px solid #3498db;
    transition: all 0.2s;
}

.hezl-prompt-item-wrapper:hover {
    background: #333;
}

.hezl-prompt-item-wrapper.selected {
    border-left-color: #27ae60;
    background: #2d3748;
}

.hezl-prompt-item-content {
    flex: 1;
    padding: 5px 8px;
    cursor: pointer;
    min-width: 0;
}

.hezl-prompt-edit-btn {
    padding: 3px 8px;
    border: none;
    border-radius: 3px;
    background: #3498db;
    color: #fff;
    cursor: pointer;
    font-size: 10px;
    margin-right: 6px;
    flex-shrink: 0;
}

.hezl-prompt-edit-btn:hover {
    background: #2980b9;
}
`;

class HezlPromptWidget {
    constructor(node, inputName, inputData, app) {
        this.node = node;
        this.app = app;
        this.selectedPrompts = [];
        this.promptWeights = {};
        this.promptDisabled = {};
        this.folderStructure = null;
        this.currentFolder = "";
        this.promptsData = [];
        this.folderSelectedCounts = {};
        this.expandedFolders = new Set();
        this.hoverPreview = null;
        this.contextMenu = null;
        
        this.injectStyles();
        this.createWidget();
        this.loadFolderStructure();
    }
    
    injectStyles() {
        if (!document.getElementById('hezl-prompt-styles')) {
            const style = document.createElement('style');
            style.id = 'hezl-prompt-styles';
            style.textContent = HEZL_PROMPT_CSS;
            document.head.appendChild(style);
        }
    }
    
    createWidget() {
        this.container = document.createElement('div');
        this.container.className = 'hezl-prompt-container';
        
        this.container.innerHTML = `
            <div class="hezl-prompt-top">
                <div class="hezl-prompt-sidebar">
                    <div class="hezl-section-title">
                        <span>分类目录</span>
                        <div class="hezl-sidebar-actions">
                            <button class="hezl-btn small success" id="hezl-add-prompt" title="添加提示词">+词</button>
                            <button class="hezl-btn small" id="hezl-refresh" title="刷新">↻</button>
                            <button class="hezl-btn small" id="hezl-add-folder" title="添加文件夹">+</button>
                            <button class="hezl-btn small danger" id="hezl-delete-folder" title="删除文件夹">-</button>
                            <button class="hezl-btn small warning" id="hezl-rename-folder" title="重命名">✎</button>
                        </div>
                    </div>
                    <div class="hezl-folder-tree" id="hezl-folder-tree"></div>
                </div>
                <div class="hezl-prompt-list" id="hezl-prompt-list">
                    <div class="hezl-empty-state">请选择左侧分类查看词组</div>
                </div>
            </div>
            <div class="hezl-prompt-bottom">
                <div class="hezl-section-title">
                    <span>已选词组预览 (可拖拽排序，点击调节权重，单击禁用/启用)</span>
                </div>
                <div class="hezl-preview-actions">
                    <button class="hezl-btn small danger" id="hezl-remove-all">移除全部</button>
                    <button class="hezl-btn small warning" id="hezl-disable-all">禁用全部</button>
                    <button class="hezl-btn small success" id="hezl-enable-all">启用全部</button>
                </div>
                <div class="hezl-preview-container" id="hezl-preview-container"></div>
                <div class="hezl-output-text" id="hezl-output-text"></div>
            </div>
        `;
        
        this.folderTree = this.container.querySelector('#hezl-folder-tree');
        this.promptList = this.container.querySelector('#hezl-prompt-list');
        this.previewContainer = this.container.querySelector('#hezl-preview-container');
        this.outputText = this.container.querySelector('#hezl-output-text');
        
        this.setupEventListeners();
    }
    
    setupEventListeners() {
        this.container.querySelector('#hezl-refresh').addEventListener('click', () => {
            this.loadFolderStructure();
        });
        
        this.container.querySelector('#hezl-add-prompt').addEventListener('click', () => {
            this.showAddPromptModal();
        });
        
        this.container.querySelector('#hezl-add-folder').addEventListener('click', () => {
            this.showAddFolderModal();
        });
        
        this.container.querySelector('#hezl-delete-folder').addEventListener('click', () => {
            this.deleteCurrentFolder();
        });
        
        this.container.querySelector('#hezl-rename-folder').addEventListener('click', () => {
            this.showRenameFolderModal();
        });
        
        this.container.querySelector('#hezl-remove-all').addEventListener('click', () => {
            this.removeAllPrompts();
        });
        
        this.container.querySelector('#hezl-disable-all').addEventListener('click', () => {
            this.toggleAllPromptsDisabled(true);
        });
        
        this.container.querySelector('#hezl-enable-all').addEventListener('click', () => {
            this.toggleAllPromptsDisabled(false);
        });
        
        this.previewContainer.addEventListener('dragover', (e) => {
            e.preventDefault();
            e.dataTransfer.dropEffect = 'move';
        });
        
        this.previewContainer.addEventListener('drop', (e) => {
            e.preventDefault();
            const dragIndex = parseInt(e.dataTransfer.getData('text/plain'));
            if (!isNaN(dragIndex)) {
                const dropTarget = e.target.closest('.hezl-preview-item');
                if (dropTarget) {
                    const dropIndex = parseInt(dropTarget.dataset.index);
                    this.reorderPrompts(dragIndex, dropIndex);
                } else {
                    const lastIndex = this.selectedPrompts.length - 1;
                    this.reorderPrompts(dragIndex, lastIndex);
                }
            }
        });
        
        document.addEventListener('click', (e) => {
            if (this.contextMenu && !this.contextMenu.contains(e.target)) {
                this.hideContextMenu();
            }
        });
    }
    
    async loadFolderStructure() {
        try {
            const response = await fetch('/hezl_prompt/get_structure');
            this.folderStructure = await response.json();
            this.renderFolderTree();
        } catch (error) {
            console.error('Failed to load folder structure:', error);
        }
    }
    
    getAllCsvPaths(node) {
        let paths = [];
        if (node.type === 'csv') {
            paths.push(node.path);
        }
        if (node.children) {
            for (const child of node.children) {
                paths = paths.concat(this.getAllCsvPaths(child));
            }
        }
        return paths;
    }
    
    calculateFolderCounts(node) {
        let count = 0;
        if (node.type === 'csv') {
            count = this.folderSelectedCounts[node.path] || 0;
        }
        if (node.children) {
            for (const child of node.children) {
                count += this.calculateFolderCounts(child);
            }
        }
        return count;
    }
    
    renderFolderTree() {
        if (!this.folderStructure) return;
        
        const renderNode = (node, indent = 0) => {
            let html = '';
            
            if (node.type === 'folder') {
                const hasChildren = node.children && node.children.length > 0;
                const isExpanded = this.expandedFolders.has(node.path);
                const toggleIcon = hasChildren ? (isExpanded ? '▼' : '▶') : '';
                const totalCount = this.calculateFolderCounts(node);
                const countBadge = totalCount > 0 ? `<span class="hezl-folder-count" data-path="${node.path}" title="点击取消选择">${totalCount}</span>` : '';
                const isSelected = this.currentFolder === node.path ? 'selected' : '';
                
                html += `<div class="hezl-folder-item ${isSelected}" data-path="${node.path}" data-type="folder" style="padding-left: ${indent * 12 + 4}px">
                    <span class="hezl-tree-toggle" data-path="${node.path}">${toggleIcon}</span>
                    <span class="hezl-folder-icon">${hasChildren ? (isExpanded ? '📂' : '📁') : '📁'}</span>
                    <span class="hezl-folder-name">${node.name}</span>
                    ${countBadge}
                </div>`;
                
                if (hasChildren) {
                    const childrenHtml = node.children.map(child => renderNode(child, indent + 1)).join('');
                    const collapsedClass = isExpanded ? '' : 'collapsed';
                    html += `<div class="hezl-folder-children ${collapsedClass}" data-parent="${node.path}">${childrenHtml}</div>`;
                }
            } else if (node.type === 'csv') {
                const count = this.folderSelectedCounts[node.path] || 0;
                const countBadge = count > 0 ? `<span class="hezl-folder-count" data-path="${node.path}" title="点击取消选择">${count}</span>` : '';
                const isSelected = this.currentFolder === node.path ? 'selected' : '';
                
                html += `<div class="hezl-folder-item ${isSelected}" data-path="${node.path}" data-type="csv" style="padding-left: ${indent * 12 + 4}px">
                    <span class="hezl-tree-toggle"></span>
                    <span class="hezl-folder-icon">📄</span>
                    <span class="hezl-folder-name">${node.name}</span>
                    ${countBadge}
                </div>`;
            }
            
            return html;
        };
        
        let treeHtml = '';
        
        if (this.folderStructure.default) {
            for (const child of this.folderStructure.default.children || []) {
                treeHtml += renderNode(child, 0);
            }
        }
        
        this.folderTree.innerHTML = treeHtml;
        
        this.folderTree.querySelectorAll('.hezl-tree-toggle').forEach(toggle => {
            toggle.addEventListener('click', (e) => {
                e.stopPropagation();
                const folderPath = toggle.dataset.path;
                if (folderPath) {
                    this.toggleFolderExpand(folderPath);
                }
            });
        });
        
        this.folderTree.querySelectorAll('.hezl-folder-item').forEach(item => {
            item.addEventListener('click', (e) => {
                if (e.target.classList.contains('hezl-folder-count')) {
                    e.stopPropagation();
                    this.clearFolderSelection(item.dataset.path);
                } else {
                    this.selectFolder(item.dataset.path, item.dataset.type);
                }
            });
            
            item.addEventListener('contextmenu', (e) => {
                e.preventDefault();
                this.showContextMenu(e, item.dataset.path, item.dataset.type);
            });
        });
    }
    
    showContextMenu(e, path, type) {
        this.hideContextMenu();
        
        this.contextMenu = document.createElement('div');
        this.contextMenu.className = 'hezl-context-menu';
        
        let menuHtml = '';
        if (type === 'folder') {
            menuHtml = `
                <div class="hezl-context-menu-item" data-action="add">添加子文件夹</div>
                <div class="hezl-context-menu-item" data-action="rename">重命名</div>
                <div class="hezl-context-menu-item" data-action="delete">删除</div>
            `;
        } else if (type === 'csv') {
            menuHtml = `
                <div class="hezl-context-menu-item" data-action="clear">取消选择</div>
            `;
        }
        
        this.contextMenu.innerHTML = menuHtml;
        document.body.appendChild(this.contextMenu);
        
        this.contextMenu.style.left = e.clientX + 'px';
        this.contextMenu.style.top = e.clientY + 'px';
        
        this.contextMenu.querySelectorAll('.hezl-context-menu-item').forEach(item => {
            item.addEventListener('click', () => {
                const action = item.dataset.action;
                if (action === 'add') {
                    this.showAddFolderModal(path);
                } else if (action === 'rename') {
                    this.showRenameFolderModal(path);
                } else if (action === 'delete') {
                    this.deleteFolder(path);
                } else if (action === 'clear') {
                    this.clearFolderSelection(path);
                }
                this.hideContextMenu();
            });
        });
    }
    
    hideContextMenu() {
        if (this.contextMenu) {
            this.contextMenu.remove();
            this.contextMenu = null;
        }
    }
    
    toggleFolderExpand(folderPath) {
        if (this.expandedFolders.has(folderPath)) {
            this.expandedFolders.delete(folderPath);
        } else {
            this.expandedFolders.add(folderPath);
        }
        this.renderFolderTree();
    }
    
    async selectFolder(path, type) {
        this.currentFolder = path;
        this.currentFolderType = type;
        
        this.folderTree.querySelectorAll('.hezl-folder-item').forEach(item => {
            item.classList.remove('selected');
            if (item.dataset.path === path) {
                item.classList.add('selected');
            }
        });
        
        try {
            const response = await fetch(`/hezl_prompt/get_prompts?folder=${encodeURIComponent(path)}`);
            this.promptsData = await response.json();
            this.renderPromptList();
        } catch (error) {
            console.error('Failed to load prompts:', error);
            this.promptList.innerHTML = '<div class="hezl-empty-state">加载失败</div>';
        }
    }
    
    renderPromptList() {
        if (this.promptsData.length === 0) {
            this.promptList.innerHTML = '<div class="hezl-empty-state">暂无词组</div>';
            return;
        }
        
        let html = '';
        for (const prompt of this.promptsData) {
            const isSelected = this.selectedPrompts.some(p => p.title === prompt.title && p.folder === this.currentFolder);
            html += `
                <div class="hezl-prompt-item-wrapper ${isSelected ? 'selected' : ''}" 
                     data-title="${this.escapeHtml(prompt.title)}" 
                     data-folder="${this.currentFolder}">
                    <div class="hezl-prompt-item-content" draggable="true">
                        <div class="hezl-prompt-title">${this.escapeHtml(prompt.title)}</div>
                        <div class="hezl-prompt-content">${this.escapeHtml(prompt.content)}</div>
                    </div>
                    <button class="hezl-prompt-edit-btn" data-title="${this.escapeHtml(prompt.title)}">编辑</button>
                </div>
            `;
        }
        
        this.promptList.innerHTML = html;
        
        this.promptList.querySelectorAll('.hezl-prompt-item-content').forEach(item => {
            const wrapper = item.closest('.hezl-prompt-item-wrapper');
            item.addEventListener('click', () => {
                this.togglePromptSelection(wrapper.dataset.title);
            });
            
            item.addEventListener('mouseenter', (e) => {
                const promptTitle = wrapper.dataset.title;
                const prompt = this.promptsData.find(p => p.title === promptTitle);
                if (prompt) {
                    this.showHoverPreview(e, prompt);
                }
            });
            
            item.addEventListener('mouseleave', () => {
                this.hideHoverPreview();
            });
            
            item.addEventListener('dragstart', (e) => {
                wrapper.classList.add('dragging');
                e.dataTransfer.effectAllowed = 'copy';
            });
            
            item.addEventListener('dragend', () => {
                wrapper.classList.remove('dragging');
            });
        });
        
        this.promptList.querySelectorAll('.hezl-prompt-edit-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                e.stopPropagation();
                this.showEditPromptModal(btn.dataset.title);
            });
        });
    }
    
    async showEditPromptModal(promptTitle) {
        const prompt = this.promptsData.find(p => p.title === promptTitle);
        if (!prompt) return;
        
        const folder = this.currentFolder;
        
        const modal = document.createElement('div');
        modal.className = 'hezl-modal';
        modal.innerHTML = `
            <div class="hezl-modal-content">
                <div class="hezl-modal-header">编辑词组</div>
                <div class="hezl-form-group">
                    <label class="hezl-form-label">标题</label>
                    <input type="text" class="hezl-form-input" id="hezl-edit-title" value="${this.escapeHtml(prompt.title)}">
                </div>
                <div class="hezl-form-group">
                    <label class="hezl-form-label">内容</label>
                    <textarea class="hezl-form-textarea" id="hezl-edit-content">${this.escapeHtml(prompt.content)}</textarea>
                </div>
                <div class="hezl-modal-actions">
                    <button class="hezl-btn" id="hezl-modal-cancel">取消</button>
                    <button class="hezl-btn success" id="hezl-modal-save">保存</button>
                </div>
            </div>
        `;
        
        document.body.appendChild(modal);
        
        modal.querySelector('#hezl-modal-cancel').addEventListener('click', () => {
            modal.remove();
        });
        
        modal.querySelector('#hezl-modal-save').addEventListener('click', async () => {
            const newTitle = modal.querySelector('#hezl-edit-title').value.trim();
            const newContent = modal.querySelector('#hezl-edit-content').value.trim();
            
            if (!newTitle) {
                alert('请输入标题');
                return;
            }
            
            if (newTitle !== prompt.title) {
                const existingPrompt = this.promptsData.find(p => p.title === newTitle && p.title !== promptTitle);
                if (existingPrompt) {
                    alert('已存在同名词组，请使用不同的标题');
                    return;
                }
            }
            
            try {
                const response = await fetch('/hezl_prompt/update_prompt', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({
                        folder: folder,
                        old_title: prompt.title,
                        new_title: newTitle,
                        new_content: newContent
                    })
                });
                
                const result = await response.json();
                
                if (result.success) {
                    const selectedIndex = this.selectedPrompts.findIndex(p => p.title === promptTitle && p.folder === folder);
                    if (selectedIndex !== -1) {
                        this.selectedPrompts[selectedIndex].title = newTitle;
                        this.selectedPrompts[selectedIndex].content = newContent;
                        if (prompt.title !== newTitle) {
                            this.promptWeights[newTitle] = this.promptWeights[prompt.title];
                            this.promptDisabled[newTitle] = this.promptDisabled[prompt.title];
                            delete this.promptWeights[prompt.title];
                            delete this.promptDisabled[prompt.title];
                        }
                        this.renderPreview();
                        this.updateOutput();
                    }
                    
                    modal.remove();
                    await this.selectFolder(folder, this.currentFolderType);
                } else {
                    alert('保存失败: ' + result.error);
                }
            } catch (error) {
                alert('保存失败: ' + error.message);
            }
        });
        
        modal.addEventListener('click', (e) => {
            if (e.target === modal) {
                modal.remove();
            }
        });
    }
    
    async showAddPromptModal() {
        if (!this.currentFolder || this.currentFolderType !== 'csv') {
            alert('请选中csv文件');
            return;
        }
        
        const folder = this.currentFolder;
        
        const modal = document.createElement('div');
        modal.className = 'hezl-modal';
        modal.innerHTML = `
            <div class="hezl-modal-content">
                <div class="hezl-modal-header">添加词组</div>
                <div class="hezl-form-group">
                    <label class="hezl-form-label">标题</label>
                    <input type="text" class="hezl-form-input" id="hezl-add-title" placeholder="输入标题">
                </div>
                <div class="hezl-form-group">
                    <label class="hezl-form-label">内容</label>
                    <textarea class="hezl-form-textarea" id="hezl-add-content" placeholder="输入内容"></textarea>
                </div>
                <div class="hezl-modal-actions">
                    <button class="hezl-btn" id="hezl-modal-cancel">取消</button>
                    <button class="hezl-btn success" id="hezl-modal-save">保存</button>
                </div>
            </div>
        `;
        
        document.body.appendChild(modal);
        
        modal.querySelector('#hezl-modal-cancel').addEventListener('click', () => {
            modal.remove();
        });
        
        modal.querySelector('#hezl-modal-save').addEventListener('click', async () => {
            const newTitle = modal.querySelector('#hezl-add-title').value.trim();
            const newContent = modal.querySelector('#hezl-add-content').value.trim();
            
            if (!newTitle) {
                alert('请输入标题');
                return;
            }
            
            const existingPrompt = this.promptsData.find(p => p.title === newTitle);
            if (existingPrompt) {
                alert('已存在同名词组，请使用不同的标题');
                return;
            }
            
            try {
                const response = await fetch('/hezl_prompt/add_prompt', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({
                        folder: folder,
                        title: newTitle,
                        content: newContent
                    })
                });
                
                const result = await response.json();
                
                if (result.success) {
                    modal.remove();
                    await this.selectFolder(folder, this.currentFolderType);
                } else {
                    alert('保存失败: ' + result.error);
                }
            } catch (error) {
                alert('保存失败: ' + error.message);
            }
        });
        
        modal.addEventListener('click', (e) => {
            if (e.target === modal) {
                modal.remove();
            }
        });
    }
    
    showHoverPreview(e, prompt) {
        this.hideHoverPreview();
        
        this.hoverPreview = document.createElement('div');
        this.hoverPreview.className = 'hezl-hover-preview';
        this.hoverPreview.innerHTML = `<div class="hezl-hover-preview-text">${this.escapeHtml(prompt.content)}</div>`;
        
        document.body.appendChild(this.hoverPreview);
        
        let x = e.clientX + 10;
        let y = e.clientY + 10;
        
        this.hoverPreview.style.left = x + 'px';
        this.hoverPreview.style.top = y + 'px';
        
        const moveHandler = (moveEvent) => {
            let newX = moveEvent.clientX + 10;
            let newY = moveEvent.clientY + 10;
            
            if (newX + 300 > window.innerWidth) {
                newX = moveEvent.clientX - 310;
            }
            if (newY + 250 > window.innerHeight) {
                newY = moveEvent.clientY - 260;
            }
            
            this.hoverPreview.style.left = newX + 'px';
            this.hoverPreview.style.top = newY + 'px';
        };
        
        document.addEventListener('mousemove', moveHandler);
        this.hoverPreview._moveHandler = moveHandler;
    }
    
    hideHoverPreview() {
        if (this.hoverPreview) {
            if (this.hoverPreview._moveHandler) {
                document.removeEventListener('mousemove', this.hoverPreview._moveHandler);
            }
            this.hoverPreview.remove();
            this.hoverPreview = null;
        }
    }
    
    togglePromptSelection(promptTitle) {
        const prompt = this.promptsData.find(p => p.title === promptTitle);
        if (!prompt) return;
        
        const index = this.selectedPrompts.findIndex(p => p.title === promptTitle && p.folder === this.currentFolder);
        
        if (index === -1) {
            const newPrompt = {
                title: prompt.title,
                content: prompt.content,
                folder: this.currentFolder
            };
            this.selectedPrompts.push(newPrompt);
            this.promptWeights[promptTitle] = 1.0;
            this.promptDisabled[promptTitle] = false;
        } else {
            this.selectedPrompts.splice(index, 1);
            delete this.promptWeights[promptTitle];
            delete this.promptDisabled[promptTitle];
        }
        
        this.updateFolderCounts();
        this.renderPromptList();
        this.renderPreview();
        this.updateOutput();
    }
    
    updateFolderCounts() {
        this.folderSelectedCounts = {};
        
        for (const prompt of this.selectedPrompts) {
            const folder = prompt.folder || '';
            if (folder) {
                this.folderSelectedCounts[folder] = (this.folderSelectedCounts[folder] || 0) + 1;
            }
        }
        
        this.renderFolderTree();
    }
    
    renderPreview() {
        if (this.selectedPrompts.length === 0) {
            this.previewContainer.innerHTML = '<div class="hezl-empty-state" style="width: 100%; padding: 15px;">点击上方词组添加到预览</div>';
            return;
        }
        
        let html = '';
        this.selectedPrompts.forEach((prompt, index) => {
            const weight = this.promptWeights[prompt.title] || 1.0;
            const isDisabled = this.promptDisabled[prompt.title] || false;
            html += `
                <div class="hezl-preview-item ${isDisabled ? 'disabled' : ''}" data-index="${index}" draggable="true">
                    <span class="hezl-preview-text" title="${this.escapeHtml(prompt.content)}">${this.escapeHtml(prompt.title)}</span>
                    <div class="hezl-weight-control">
                        <button class="hezl-weight-btn" data-action="decrease">-</button>
                        <span class="hezl-weight-value">${weight.toFixed(2)}</span>
                        <button class="hezl-weight-btn" data-action="increase">+</button>
                    </div>
                    <button class="hezl-remove-btn" data-index="${index}">✕</button>
                </div>
            `;
        });
        
        this.previewContainer.innerHTML = html;
        
        this.previewContainer.querySelectorAll('.hezl-preview-item').forEach(item => {
            item.addEventListener('click', (e) => {
                if (!e.target.classList.contains('hezl-weight-btn') && 
                    !e.target.classList.contains('hezl-remove-btn')) {
                    const index = parseInt(item.dataset.index);
                    const prompt = this.selectedPrompts[index];
                    if (prompt) {
                        this.togglePromptDisabled(prompt.title);
                    }
                }
            });
            
            item.addEventListener('dragstart', (e) => {
                item.classList.add('dragging');
                e.dataTransfer.effectAllowed = 'move';
                e.dataTransfer.setData('text/plain', item.dataset.index);
            });
            
            item.addEventListener('dragend', () => {
                item.classList.remove('dragging');
                this.previewContainer.querySelectorAll('.hezl-preview-item').forEach(i => {
                    i.classList.remove('drag-over');
                });
            });
            
            item.addEventListener('dragover', (e) => {
                e.preventDefault();
                e.dataTransfer.dropEffect = 'move';
            });
            
            item.addEventListener('dragenter', (e) => {
                e.preventDefault();
                if (!item.classList.contains('dragging')) {
                    item.classList.add('drag-over');
                }
            });
            
            item.addEventListener('dragleave', () => {
                item.classList.remove('drag-over');
            });
            
            item.addEventListener('drop', (e) => {
                e.preventDefault();
                item.classList.remove('drag-over');
                const dragIndex = parseInt(e.dataTransfer.getData('text/plain'));
                const dropIndex = parseInt(item.dataset.index);
                if (!isNaN(dragIndex) && !isNaN(dropIndex)) {
                    this.reorderPrompts(dragIndex, dropIndex);
                }
            });
        });
        
        this.previewContainer.querySelectorAll('.hezl-weight-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                e.stopPropagation();
                const item = btn.closest('.hezl-preview-item');
                const index = parseInt(item.dataset.index);
                const prompt = this.selectedPrompts[index];
                if (!prompt) return;
                
                const promptTitle = prompt.title;
                const action = btn.dataset.action;
                
                let weight = this.promptWeights[promptTitle] || 1.0;
                if (action === 'increase') {
                    weight = Math.min(2.0, weight + 0.1);
                } else {
                    weight = Math.max(0.1, weight - 0.1);
                }
                this.promptWeights[promptTitle] = weight;
                this.renderPreview();
                this.updateOutput();
            });
        });
        
        this.previewContainer.querySelectorAll('.hezl-remove-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                e.stopPropagation();
                const index = parseInt(btn.dataset.index);
                const prompt = this.selectedPrompts[index];
                if (prompt) {
                    this.removePromptByTitle(prompt.title);
                }
            });
        });
    }
    
    togglePromptDisabled(promptTitle) {
        this.promptDisabled[promptTitle] = !this.promptDisabled[promptTitle];
        this.renderPreview();
        this.updateOutput();
    }
    
    removePromptByTitle(promptTitle) {
        const index = this.selectedPrompts.findIndex(p => p.title === promptTitle);
        if (index !== -1) {
            this.selectedPrompts.splice(index, 1);
            delete this.promptWeights[promptTitle];
            delete this.promptDisabled[promptTitle];
            
            this.updateFolderCounts();
            this.renderPromptList();
            this.renderPreview();
            this.updateOutput();
        }
    }
    
    removeAllPrompts() {
        if (this.selectedPrompts.length === 0) return;
        if (confirm('确定要移除所有已选词组吗？')) {
            this.selectedPrompts = [];
            this.promptWeights = {};
            this.promptDisabled = {};
            
            this.updateFolderCounts();
            this.renderPromptList();
            this.renderPreview();
            this.updateOutput();
        }
    }
    
    toggleAllPromptsDisabled(disabled) {
        for (const prompt of this.selectedPrompts) {
            this.promptDisabled[prompt.title] = disabled;
        }
        this.renderPreview();
        this.updateOutput();
    }
    
    reorderPrompts(fromIndex, toIndex) {
        if (fromIndex === toIndex) return;
        
        const item = this.selectedPrompts.splice(fromIndex, 1)[0];
        
        if (fromIndex < toIndex) {
            toIndex--;
        }
        
        this.selectedPrompts.splice(toIndex, 0, item);
        
        this.renderPreview();
        this.updateOutput();
    }
    
    updateOutput() {
        const parts = [];
        for (const p of this.selectedPrompts) {
            if (this.promptDisabled[p.title]) continue;
            
            const weight = this.promptWeights[p.title] || 1.0;
            if (weight !== 1.0) {
                parts.push(`(${p.content}:${weight.toFixed(2)})`);
            } else {
                parts.push(p.content);
            }
        }
        
        const output = parts.join(', ');
        this.outputText.textContent = output;
        
        if (this.node && this.node.widgets) {
            const widget = this.node.widgets.find(w => w.name === 'selected_prompts');
            if (widget) {
                widget.value = JSON.stringify({
                    prompts: this.selectedPrompts,
                    weights: this.promptWeights,
                    disabled: this.promptDisabled
                });
            }
        }
    }
    
    clearFolderSelection(folderPath) {
        const csvPaths = [];
        const collectCsvPaths = (node) => {
            if (node.type === 'csv' && node.path === folderPath) {
                csvPaths.push(node.path);
            } else if (node.type === 'csv' && node.path.startsWith(folderPath + '/') || node.path.startsWith(folderPath + '\\')) {
                csvPaths.push(node.path);
            }
            if (node.type === 'folder' && (node.path === folderPath || node.path.startsWith(folderPath + '/') || node.path.startsWith(folderPath + '\\'))) {
                if (node.children) {
                    node.children.forEach(collectCsvPaths);
                }
            }
            if (node.type === 'folder' && folderPath === '') {
                if (node.children) {
                    node.children.forEach(collectCsvPaths);
                }
            }
        };
        
        if (this.folderStructure && this.folderStructure.default) {
            this.folderStructure.default.children.forEach(collectCsvPaths);
        }
        
        const promptsToRemove = this.selectedPrompts.filter(p => {
            return csvPaths.includes(p.folder) || p.folder === folderPath;
        });
        
        if (promptsToRemove.length === 0) return;
        
        if (confirm(`确定要取消选择此文件夹中的 ${promptsToRemove.length} 个词组吗？`)) {
            this.selectedPrompts = this.selectedPrompts.filter(p => {
                return !csvPaths.includes(p.folder) && p.folder !== folderPath;
            });
            
            for (const prompt of promptsToRemove) {
                delete this.promptWeights[prompt.title];
                delete this.promptDisabled[prompt.title];
            }
            
            this.updateFolderCounts();
            this.renderPromptList();
            this.renderPreview();
            this.updateOutput();
        }
    }
    
    showAddFolderModal(parentPath = null) {
        const parent = parentPath || this.currentFolder || '';
        
        const modal = document.createElement('div');
        modal.className = 'hezl-modal';
        modal.innerHTML = `
            <div class="hezl-modal-content">
                <div class="hezl-modal-header">添加文件夹</div>
                <div class="hezl-form-group">
                    <label class="hezl-form-label">文件夹名称</label>
                    <input type="text" class="hezl-form-input" id="hezl-folder-name" placeholder="输入文件夹名称">
                </div>
                <div class="hezl-modal-actions">
                    <button class="hezl-btn" id="hezl-modal-cancel">取消</button>
                    <button class="hezl-btn success" id="hezl-modal-save">创建</button>
                </div>
            </div>
        `;
        
        document.body.appendChild(modal);
        
        modal.querySelector('#hezl-modal-cancel').addEventListener('click', () => {
            modal.remove();
        });
        
        modal.querySelector('#hezl-modal-save').addEventListener('click', async () => {
            const name = modal.querySelector('#hezl-folder-name').value.trim();
            
            if (!name) {
                alert('请输入文件夹名称');
                return;
            }
            
            try {
                const response = await fetch('/hezl_prompt/add_folder', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({
                        parent: parent,
                        name: name
                    })
                });
                
                const result = await response.json();
                
                if (result.success) {
                    modal.remove();
                    this.loadFolderStructure();
                } else {
                    alert('创建失败: ' + result.error);
                }
            } catch (error) {
                alert('创建失败: ' + error.message);
            }
        });
        
        modal.addEventListener('click', (e) => {
            if (e.target === modal) {
                modal.remove();
            }
        });
    }
    
    showRenameFolderModal(folderPath = null) {
        const path = folderPath || this.currentFolder;
        if (!path) {
            alert('请先选择一个文件夹');
            return;
        }
        
        const folderName = path.split(/[/\\]/).pop();
        
        const modal = document.createElement('div');
        modal.className = 'hezl-modal';
        modal.innerHTML = `
            <div class="hezl-modal-content">
                <div class="hezl-modal-header">重命名文件夹</div>
                <div class="hezl-form-group">
                    <label class="hezl-form-label">新名称</label>
                    <input type="text" class="hezl-form-input" id="hezl-new-name" value="${folderName}" placeholder="输入新名称">
                </div>
                <div class="hezl-modal-actions">
                    <button class="hezl-btn" id="hezl-modal-cancel">取消</button>
                    <button class="hezl-btn success" id="hezl-modal-save">保存</button>
                </div>
            </div>
        `;
        
        document.body.appendChild(modal);
        
        modal.querySelector('#hezl-modal-cancel').addEventListener('click', () => {
            modal.remove();
        });
        
        modal.querySelector('#hezl-modal-save').addEventListener('click', async () => {
            const newName = modal.querySelector('#hezl-new-name').value.trim();
            
            if (!newName) {
                alert('请输入新名称');
                return;
            }
            
            try {
                const response = await fetch('/hezl_prompt/rename_folder', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({
                        path: path,
                        new_name: newName
                    })
                });
                
                const result = await response.json();
                
                if (result.success) {
                    modal.remove();
                    this.loadFolderStructure();
                } else {
                    alert('重命名失败: ' + result.error);
                }
            } catch (error) {
                alert('重命名失败: ' + error.message);
            }
        });
        
        modal.addEventListener('click', (e) => {
            if (e.target === modal) {
                modal.remove();
            }
        });
    }
    
    deleteCurrentFolder() {
        if (!this.currentFolder) {
            alert('请先选择一个文件夹');
            return;
        }
        this.deleteFolder(this.currentFolder);
    }
    
    async deleteFolder(folderPath) {
        if (!folderPath) {
            alert('请先选择一个文件夹');
            return;
        }
        
        if (!confirm('确定要删除此文件夹吗？文件夹内的所有内容都将被删除。')) {
            return;
        }
        
        try {
            const response = await fetch('/hezl_prompt/delete_folder', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    path: folderPath
                })
            });
            
            const result = await response.json();
            
            if (result.success) {
                this.currentFolder = '';
                this.loadFolderStructure();
                this.promptList.innerHTML = '<div class="hezl-empty-state">请选择左侧分类查看词组</div>';
            } else {
                alert('删除失败: ' + result.error);
            }
        } catch (error) {
            alert('删除失败: ' + error.message);
        }
    }
    
    escapeHtml(text) {
        const div = document.createElement('div');
        div.textContent = text;
        return div.innerHTML;
    }
}

app.registerExtension({
    name: "hezl.prompt.manager",
    
    async beforeRegisterNodeDef(nodeType, nodeData, app) {
        if (nodeData.name === "HezlPrompt") {
            const onNodeCreated = nodeType.prototype.onNodeCreated;
            
            nodeType.prototype.onNodeCreated = function() {
                const result = onNodeCreated?.apply(this, arguments);
                
                const widget = this.widgets?.find(w => w.name === 'selected_prompts');
                if (widget) {
                    widget.hidden = true;
                }
                
                const hezlWidget = new HezlPromptWidget(this, 'selected_prompts', {}, app);
                
                this.addDOMWidget('hezl_prompt_ui', 'hezl_prompt', hezlWidget.container, {
                    getValue: () => {
                        return JSON.stringify({
                            prompts: hezlWidget.selectedPrompts,
                            weights: hezlWidget.promptWeights,
                            disabled: hezlWidget.promptDisabled
                        });
                    },
                    setValue: (value) => {
                        try {
                            const data = JSON.parse(value);
                            hezlWidget.selectedPrompts = data.prompts || [];
                            hezlWidget.promptWeights = data.weights || {};
                            hezlWidget.promptDisabled = data.disabled || {};
                            hezlWidget.renderPreview();
                            hezlWidget.updateOutput();
                        } catch (e) {}
                    }
                });
                
                return result;
            };
        }
    }
});
