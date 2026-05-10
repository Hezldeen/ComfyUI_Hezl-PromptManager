import { app } from "../../../scripts/app.js";
import { ComfyWidgets } from "../../../scripts/widgets.js";

const HEZL_PROMPT_CSS = `
.hezl-prompt-container {
    display: flex;
    flex-direction: column;
    width: 100%;
    height: 100%;
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
    flex: 0 0 auto;
    min-height: 80px;
    max-height: 50%;
    padding: 8px;
    overflow-y: auto;
    background: #252525;
    display: flex;
    flex-direction: column;
}

.hezl-prompt-sidebar {
    flex: 0 0 auto;
    width: 200px;
    min-width: 140px;
    border-right: 1px solid #444;
    overflow-y: auto;
    background: #1a1a1a;
    display: flex;
    flex-direction: column;
}

.hezl-prompt-list {
    flex: 1 1 auto;
    min-width: 150px;
    overflow-y: auto;
    padding: 6px;
    background: #222;
    display: flex;
    flex-wrap: wrap;
    align-content: flex-start;
    gap: 6px;
}

.hezl-splitter-vertical {
    width: 4px;
    cursor: col-resize;
    background: #333;
    flex: 0 0 4px;
    display: flex;
    align-items: center;
}

.hezl-splitter-vertical:hover {
    background: #3d3d3d;
}

.hezl-splitter-vertical::after {
    content: "";
    display: block;
    width: 2px;
    height: 24px;
    background-image: radial-gradient(#777 1px, transparent 1px);
    background-size: 2px 4px;
    background-position: center;
}

.hezl-splitter-horizontal {
    height: 4px;
    cursor: row-resize;
    background: #333;
    flex: 0 0 4px;
    display: flex;
    justify-content: center;
    align-items: center;
}

.hezl-splitter-horizontal:hover {
    background: #3d3d3d;
}

.hezl-splitter-horizontal::after {
    content: "";
    display: block;
    width: 24px;
    height: 2px;
    background-image: radial-gradient(#777 1px, transparent 1px);
    background-size: 4px 2px;
    background-position: center;
}

.hezl-folder-tree {
    padding: 4px;
    flex: 1 1 auto;
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
    font-weight: normal;
    font-size: 11px;
    background: #666666;
    color: #e6ffe6;
    padding: 4px 10px;
    flex-shrink: 0;
    white-space: nowrap;
}

.hezl-prompt-capsule {
    display: flex;
    align-items: stretch;
    border-radius: 12px;
    overflow: hidden;
    margin: 4px 0;
    border: 1px solid #333;
    cursor: pointer;
    transition: background 0.2s, border-color 0.2s, transform 0.15s;
    font-size: 11px;
}

.hezl-prompt-capsule:hover {
    border-color: #3d3d3d;
    background: #262626;
}

.hezl-prompt-capsule.selected {
    border-color: #27ae60;
    box-shadow: inset 0 0 0 1px rgba(39, 174, 96, 0.3);
}

.hezl-capsule-title {
    background: #3a3a3a;
    color: #ddd;
    padding: 4px 8px;
    min-width: 60px;
    max-width: 120px;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    font-weight: bold;
}

.hezl-capsule-content {
    flex: 1;
    background: #1f6f3d;
    color: #e6ffe6;
    padding: 4px 8px;
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
    background: #4a4a4a;
    border-radius: 12px;
    border: 1px solid #555;
    cursor: grab;
    display: flex;
    align-items: center;
    gap: 0;
    overflow: hidden;
    transition: transform 0.15s ease, box-shadow 0.15s ease, background 0.2s;
    font-size: 11px;
    user-select: none;
    position: relative;
    height: 24px;
}

.hezl-preview-item:hover {
    border-color: #666;
    background: #5a5a5a;
}

.hezl-preview-item.dragging {
    opacity: 0.6;
    cursor: grabbing;
    transform: scale(1.02);
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.4);
    z-index: 100;
    background: #4a4a4a;
}

.hezl-preview-item.drag-over {
    border: 1px dashed #fff;
    transform: scale(1.02);
}

.hezl-preview-item.insert-before {
    border-left: 2px solid #27ae60;
    padding-left: 6px;
}

.hezl-preview-item.insert-after {
    border-right: 2px solid #27ae60;
    padding-right: 6px;
}

.hezl-preview-item.disabled {
    opacity: 0.6;
}

.hezl-preview-item.disabled:hover {
    border-color: #555;
}

.hezl-preview-title {
    display: flex;
    align-items: center;
    gap: 4px;
    background: #3a3a3a;
    color: #ddd;
    padding: 4px 6px;
    min-width: 60px;
    max-width: 140px;
}

.hezl-preview-weight {
    display: flex;
    align-items: center;
    gap: 3px;
    background: #2a5298;
    color: #fff;
    padding: 4px 6px;
}

.hezl-preview-item.disabled .hezl-preview-weight {
    background: #555;
    color: #bbb;
}

.hezl-preview-text {
    order: 1;
    padding: 0 6px;
    color: #ddd;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    text-align: center;
    white-space: nowrap;
}

.hezl-weight-control {
    display: flex;
    align-items: center;
    gap: 3px;
    background: #2a5298;
    color: #fff;
    padding: 0 6px;
    order: 2;
    height: 100%;
}

.hezl-preview-item.disabled .hezl-weight-control {
    background: #555;
    color: #bbb;
}

.hezl-weight-btn {
    width: 14px;
    height: 14px;
    border: none;
    border-radius: 2px;
    background: rgba(255, 255, 255, 0.15);
    color: #fff;
    cursor: pointer;
    font-size: 10px;
    font-weight: bold;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 0;
    transition: background 0.15s, transform 0.1s;
}

.hezl-weight-btn:hover {
    background: rgba(255, 255, 255, 0.3);
}

.hezl-weight-btn:active {
    transform: scale(0.9);
}

.hezl-weight-value {
    font-size: 9px;
    min-width: 24px;
    text-align: center;
    color: #fff;
}

.hezl-remove-btn {
    width: 12px;
    height: 12px;
    border: none;
    border-radius: 50%;
    background: rgba(231, 76, 60, 0.7);
    color: #fff;
    cursor: pointer;
    font-size: 8px;
    margin: 0 4px 0 6px;
    order: 0;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 0;
    transition: background 0.15s, transform 0.1s;
    opacity: 0.7;
}

.hezl-remove-btn:hover {
    background: #e74c3c;
    opacity: 1;
}

.hezl-remove-btn:active {
    transform: scale(0.85);
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

.hezl-section-title {
    font-size: 11px;
    font-weight: bold;
    margin-bottom: 4px;
    color: #aaa;
    padding: 4px 6px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    position: sticky;
    top: 0;
    background: #1a1a1a;
    z-index: 2;
}

.hezl-sidebar-actions {
    display: flex;
    gap: 2px;
    margin-left: auto;
}

.hezl-sidebar-actions .hezl-btn {
    padding: 2px 5px;
    font-size: 10px;
}

.hezl-sidebar-actions {
    display: flex;
}

#hezl-add-prompt,
#hezl-add-csv,
#hezl-add-folder,
#hezl-delete-folder,
#hezl-rename-folder {
    display: none;
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
    display: inline-flex;
    align-items: center;
    background: #222;
    border-radius: 12px;
    margin: 0;
    border: 1px solid #333;
    overflow: hidden;
    transition: all 0.2s;
    cursor: grab;
}

.hezl-prompt-item-wrapper:hover {
    border-color: #3d3d3d;
}

.hezl-prompt-item-wrapper.selected {
    border-color: #555;
    box-shadow: none;
    background: #4a4a4a;
}

.hezl-prompt-item-wrapper.selected .hezl-prompt-title {
    background: #27ae60;
    color: #ffffffff;
}

.hezl-prompt-item-wrapper.dragging {
    opacity: 0.5;
    transform: scale(0.98);
}

.hezl-prompt-item-wrapper.drag-over {
    border-color: #27ae60;
}

.hezl-prompt-item-wrapper.insert-before {
    box-shadow: inset 2px 0 0 #27ae60;
}

.hezl-prompt-item-wrapper.insert-after {
    box-shadow: inset -2px 0 0 #27ae60;
}

.hezl-prompt-item-content {
    display: inline-flex;
    align-items: center;
    cursor: pointer;
}

.hezl-prompt-edit-btn {
    display: none;
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
            <div class="hezl-prompt-top" id="hezl-prompt-top">
                <div class="hezl-prompt-sidebar" id="hezl-prompt-sidebar">
                    <div class="hezl-section-title">
                        <span>分类目录</span>
                        <div class="hezl-sidebar-actions">
                            <button class="hezl-btn small" id="hezl-add-root-folder" title="在根目录csv文件夹下创建文件夹">+文件夹</button>
                            <button class="hezl-btn small" id="hezl-refresh" title="刷新">↻</button>
                        </div>
                    </div>
                    <div class="hezl-folder-tree" id="hezl-folder-tree"></div>
                </div>
                <div class="hezl-splitter-vertical" id="hezl-splitter-vertical"></div>
                <div class="hezl-prompt-list" id="hezl-prompt-list">
                    <div class="hezl-empty-state">请选择左侧分类查看词组</div>
                </div>
            </div>
            <div class="hezl-splitter-horizontal" id="hezl-splitter-horizontal"></div>
            <div class="hezl-prompt-bottom" id="hezl-prompt-bottom">
                <div class="hezl-preview-actions">
                    <button class="hezl-btn small danger" id="hezl-remove-all">移除全部</button>
                    <button class="hezl-btn small warning" id="hezl-disable-all">禁用全部</button>
                    <button class="hezl-btn small success" id="hezl-enable-all">启用全部</button>
                </div>
                <div class="hezl-preview-container" id="hezl-preview-container"></div>
            </div>
        `;
        
        this.folderTree = this.container.querySelector('#hezl-folder-tree');
        this.promptList = this.container.querySelector('#hezl-prompt-list');
        this.previewContainer = this.container.querySelector('#hezl-preview-container');
        this.sidebar = this.container.querySelector('#hezl-prompt-sidebar');
        this.topPanel = this.container.querySelector('#hezl-prompt-top');
        this.bottomPanel = this.container.querySelector('#hezl-prompt-bottom');
        this.verticalSplitter = this.container.querySelector('#hezl-splitter-vertical');
        this.horizontalSplitter = this.container.querySelector('#hezl-splitter-horizontal');
        
        this.setupEventListeners();
    }
    
    setupEventListeners() {
        this.setupSplitters();
        
        const refreshBtn = this.container.querySelector('#hezl-refresh');
        if (refreshBtn) {
            refreshBtn.addEventListener('click', () => {
                this.loadFolderStructure();
            });
        }
        
        const addRootBtn = this.container.querySelector('#hezl-add-root-folder');
        if (addRootBtn) {
            addRootBtn.addEventListener('click', () => {
                this.showAddFolderModal('');
            });
        }
        
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
                    const rect = dropTarget.getBoundingClientRect();
                    const midX = rect.left + rect.width / 2;
                    let targetIndex = dropIndex;
                    if (e.clientX >= midX) {
                        targetIndex = dropIndex + 1;
                    }
                    if (dragIndex !== targetIndex) {
                        this.reorderPrompts(dragIndex, targetIndex);
                    }
                } else {
                    const lastIndex = this.selectedPrompts.length - 1;
                    if (dragIndex !== lastIndex) {
                        this.reorderPrompts(dragIndex, lastIndex);
                    }
                }
            }
        });
        
        document.addEventListener('click', (e) => {
            if (this.contextMenu && !this.contextMenu.contains(e.target)) {
                this.hideContextMenu();
            }
        });
        
        this.folderTree.addEventListener('contextmenu', (e) => {
            if (e.target.closest('.hezl-folder-item')) return;
            e.preventDefault();
            this.showContextMenu(e, '', 'blank');
        });
    }

    setupSplitters() {
        if (this.verticalSplitter && this.sidebar) {
            const minSidebar = 140;
            const minRight = 150;
            this.verticalSplitter.addEventListener('mousedown', (e) => {
                e.preventDefault();
                const startX = e.clientX;
                const startWidth = this.sidebar.getBoundingClientRect().width;
            const onMove = (moveEvent) => {
                const containerRect = this.container.getBoundingClientRect();
                const splitterWidth = this.verticalSplitter.getBoundingClientRect().width;
                const maxWidth = containerRect.width - minRight - splitterWidth;
                let newWidth = startWidth + (moveEvent.clientX - startX);
                newWidth = Math.max(minSidebar, Math.min(maxWidth, newWidth));
                if (this._splitterRaf) cancelAnimationFrame(this._splitterRaf);
                this._splitterRaf = requestAnimationFrame(() => {
                    this.sidebar.style.width = `${newWidth}px`;
                });
            };
            const onUp = () => {
                if (this._splitterRaf) {
                    cancelAnimationFrame(this._splitterRaf);
                    this._splitterRaf = null;
                }
                document.removeEventListener('mousemove', onMove);
                document.removeEventListener('mouseup', onUp);
            };
                document.addEventListener('mousemove', onMove);
                document.addEventListener('mouseup', onUp);
            });
        }

        if (this.horizontalSplitter && this.bottomPanel) {
            const minBottom = 60;
            const minTop = 120;
            this.horizontalSplitter.addEventListener('mousedown', (e) => {
                e.preventDefault();
                const startY = e.clientY;
                const startBottom = this.bottomPanel.getBoundingClientRect().height;
            const onMove = (moveEvent) => {
                const containerRect = this.container.getBoundingClientRect();
                const splitterHeight = this.horizontalSplitter.getBoundingClientRect().height;
                const maxBottom = containerRect.height - minTop - splitterHeight;
                let newBottom = startBottom - (moveEvent.clientY - startY);
                newBottom = Math.max(minBottom, Math.min(maxBottom, newBottom));
                if (this._splitterRaf2) cancelAnimationFrame(this._splitterRaf2);
                this._splitterRaf2 = requestAnimationFrame(() => {
                    this.bottomPanel.style.flexBasis = `${newBottom}px`;
                });
            };
            const onUp = () => {
                if (this._splitterRaf2) {
                    cancelAnimationFrame(this._splitterRaf2);
                    this._splitterRaf2 = null;
                }
                document.removeEventListener('mousemove', onMove);
                document.removeEventListener('mouseup', onUp);
            };
                document.addEventListener('mousemove', onMove);
                document.addEventListener('mouseup', onUp);
            });
        }
    }
    
    async safeFetchJson(url, options = {}) {
        const response = await fetch(url, options);
        if (!response.ok) {
            const text = await response.text();
            throw new Error(`HTTP ${response.status}: ${text}`);
        }
        const text = await response.text();
        try {
            return JSON.parse(text);
        } catch (e) {
            throw new Error(`JSON parse error: ${e.message}. Response: ${text.substring(0, 200)}`);
        }
    }

    async loadFolderStructure() {
        try {
            this.folderStructure = await this.safeFetchJson('/hezl_prompt/get_structure');
            this.renderFolderTree();
            if (this.selectedPrompts.length > 0) {
                this.updateFolderCounts();
            }
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
                    if (this.currentFolder === item.dataset.path) {
                        this.deselectFolder();
                    } else {
                        this.selectFolder(item.dataset.path, item.dataset.type);
                    }
                }
            });
            
            item.addEventListener('contextmenu', (e) => {
                e.preventDefault();
                this.showContextMenu(e, item.dataset.path, item.dataset.type);
            });
        });
    }
    
    showContextMenu(e, path, type, extra = {}) {
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
        
        if (type === 'folder') {
            menuHtml = `
                <div class="hezl-context-menu-item" data-action="add-folder">\u6dfb\u52a0\u5b50\u6587\u4ef6\u5939</div>
                <div class="hezl-context-menu-item" data-action="add-csv">\u65b0\u5efaCSV\u6587\u4ef6</div>
                <div class="hezl-context-menu-item" data-action="rename-folder">\u91cd\u547d\u540d</div>
                <div class="hezl-context-menu-item" data-action="delete-folder">\u5220\u9664</div>
            `;
        } else if (type === 'csv') {
            menuHtml = `
                <div class="hezl-context-menu-item" data-action="add-prompt">\u6dfb\u52a0\u8bcd\u7ec4</div>
                <div class="hezl-context-menu-item" data-action="rename-csv">\u91cd\u547d\u540d</div>
                <div class="hezl-context-menu-item" data-action="delete-csv">\u5220\u9664</div>
            `;
        } else if (type === 'prompt') {
            menuHtml = `
                <div class="hezl-context-menu-item" data-action="edit-prompt">\u7f16\u8f91</div>
                <div class="hezl-context-menu-item" data-action="delete-prompt">\u5220\u9664</div>
            `;
        } else if (type === 'blank') {
            menuHtml = `
                <div class="hezl-context-menu-item" data-action="refresh">\u5237\u65b0</div>
            `;
        }

        this.contextMenu.innerHTML = menuHtml;
        document.body.appendChild(this.contextMenu);
        
        this.contextMenu.style.left = e.clientX + 'px';
        this.contextMenu.style.top = e.clientY + 'px';
        
        this.contextMenu.querySelectorAll('.hezl-context-menu-item').forEach(item => {
            item.addEventListener('click', () => {
                const action = item.dataset.action;
                if (action === 'add-folder') {
                    this.showAddFolderModal(path);
                } else if (action === 'add-csv') {
                    this.showCreateCsvModal(path);
                } else if (action === 'rename-folder') {
                    this.showRenameFolderModal(path);
                } else if (action === 'delete-folder') {
                    if (confirm('\u786e\u5b9a\u5220\u9664\u6b64\u6587\u4ef6\u5939\u5417\uff1f')) {
                        this.deleteFolder(path);
                    }
                } else if (action === 'add-prompt') {
                    this.showAddPromptModal(path);
                } else if (action === 'rename-csv') {
                    this.showRenameCsvModal(path);
                } else if (action === 'delete-csv') {
                    if (confirm('\u786e\u5b9a\u5220\u9664\u6b64CSV\u6587\u4ef6\u5417\uff1f')) {
                        this.deleteCsvFile(path);
                    }
                } else if (action === 'edit-prompt') {
                    this.showEditPromptModal(extra.title, extra.source || path);
                } else if (action === 'delete-prompt') {
                    this.deletePrompt(extra.title, extra.source || path);
                } else if (action === 'refresh') {
                    this.loadFolderStructure();
                } else if (action === 'add') {
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
            this.promptsData = await this.safeFetchJson(`/hezl_prompt/get_prompts?folder=${encodeURIComponent(path)}`);
            this.renderPromptList();
        } catch (error) {
            console.error('Failed to load prompts:', error);
            this.promptList.innerHTML = '<div class="hezl-empty-state">加载失败</div>';
        }
    }
    
    deselectFolder() {
        this.currentFolder = '';
        this.currentFolderType = '';
        this.promptsData = [];
        
        this.folderTree.querySelectorAll('.hezl-folder-item').forEach(item => {
            item.classList.remove('selected');
        });
        
        this.promptList.innerHTML = '<div class="hezl-empty-state">请选择左侧分类查看词组</div>';
    }
    
    renderPromptList() {
        if (this.promptsData.length === 0) {
            this.promptList.innerHTML = '<div class="hezl-empty-state">暂无词组</div>';
            return;
        }
        
        let html = '';
        for (let index = 0; index < this.promptsData.length; index++) {
            const prompt = this.promptsData[index];
            const isSelected = this.selectedPrompts.some(p => p.title === prompt.title);
            html += `
                <div class="hezl-prompt-item-wrapper ${isSelected ? 'selected' : ''}" 
                     data-title="${this.escapeHtml(prompt.title)}" 
                     data-folder="${this.currentFolder}"
                     data-source="${this.escapeHtml(prompt.source || this.currentFolder)}"
                     data-index="${index}">
                    <div class="hezl-prompt-item-content">
                        <div class="hezl-prompt-title">${this.escapeHtml(prompt.title)}</div>
                    </div>
                    <button class="hezl-prompt-edit-btn" data-title="${this.escapeHtml(prompt.title)}">编辑</button>
                </div>
            `;
        }
        
        this.promptList.innerHTML = html;
        
        const canReorder = this.currentFolderType === 'csv';
        this.promptList.querySelectorAll('.hezl-prompt-item-wrapper').forEach(wrapper => {
            const content = wrapper.querySelector('.hezl-prompt-item-content');
            if (!content) return;
            
            content.addEventListener('click', () => {
                this.togglePromptSelection(wrapper.dataset.title);
            });
            
            wrapper.addEventListener('contextmenu', (e) => {
                e.preventDefault();
                this.showContextMenu(e, wrapper.dataset.source, 'prompt', {
                    title: wrapper.dataset.title,
                    source: wrapper.dataset.source
                });
            });
            
            content.addEventListener('mouseenter', (e) => {
                const promptTitle = wrapper.dataset.title;
                const promptSource = wrapper.dataset.source;
                const prompt = this.promptsData.find(p => {
                    const source = p.source || this.currentFolder;
                    return p.title === promptTitle && source === promptSource;
                });
                if (prompt) {
                    this.showHoverPreview(e, prompt);
                }
            });
            
            content.addEventListener('mouseleave', () => {
                this.hideHoverPreview();
            });

            wrapper.draggable = canReorder;
            
            wrapper.addEventListener('dragstart', (e) => {
                if (!canReorder) {
                    e.preventDefault();
                    return;
                }
                wrapper.classList.add('dragging');
                e.dataTransfer.effectAllowed = 'move';
                e.dataTransfer.setData('text/plain', wrapper.dataset.index);
            });
            
            wrapper.addEventListener('dragend', () => {
                wrapper.classList.remove('dragging');
                this.promptList.querySelectorAll('.hezl-prompt-item-wrapper').forEach(i => {
                    i.classList.remove('drag-over', 'insert-before', 'insert-after');
                });
            });
            
            wrapper.addEventListener('dragover', (e) => {
                if (!canReorder) return;
                e.preventDefault();
                e.dataTransfer.dropEffect = 'move';
                
                if (wrapper.classList.contains('dragging')) return;
                
                this.promptList.querySelectorAll('.hezl-prompt-item-wrapper').forEach(i => {
                    if (i !== wrapper) {
                        i.classList.remove('insert-before', 'insert-after');
                    }
                });
                
                const rect = wrapper.getBoundingClientRect();
                const midX = rect.left + rect.width / 2;
                
                if (e.clientX < midX) {
                    wrapper.classList.remove('insert-after');
                    wrapper.classList.add('insert-before');
                } else {
                    wrapper.classList.remove('insert-before');
                    wrapper.classList.add('insert-after');
                }
            });
            
            wrapper.addEventListener('dragenter', (e) => {
                if (!canReorder) return;
                e.preventDefault();
                if (!wrapper.classList.contains('dragging')) {
                    wrapper.classList.add('drag-over');
                }
            });
            
            wrapper.addEventListener('dragleave', (e) => {
                if (!canReorder) return;
                const rect = wrapper.getBoundingClientRect();
                if (e.clientX < rect.left || e.clientX > rect.right ||
                    e.clientY < rect.top || e.clientY > rect.bottom) {
                    wrapper.classList.remove('drag-over', 'insert-before', 'insert-after');
                }
            });
            
            wrapper.addEventListener('drop', (e) => {
                if (!canReorder) return;
                e.preventDefault();
                wrapper.classList.remove('drag-over', 'insert-before', 'insert-after');
                const dragIndex = parseInt(e.dataTransfer.getData('text/plain'));
                let dropIndex = parseInt(wrapper.dataset.index);
                
                const rect = wrapper.getBoundingClientRect();
                const midX = rect.left + rect.width / 2;
                
                if (e.clientX >= midX) {
                    dropIndex = dropIndex + 1;
                }
                
                if (!isNaN(dragIndex) && !isNaN(dropIndex) && dragIndex !== dropIndex) {
                    this.reorderPromptList(dragIndex, dropIndex);
                }
            });
        });
        
    }
    
    async showEditPromptModal(promptTitle, promptSource = null) {
        const prompt = this.promptsData.find(p => {
            const source = p.source || this.currentFolder;
            const targetSource = promptSource || this.currentFolder;
            return p.title === promptTitle && source === targetSource;
        });
        if (!prompt) return;
        
        const folder = promptSource || this.currentFolder;
        
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
                const result = await this.safeFetchJson('/hezl_prompt/update_prompt', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({
                        folder: folder,
                        old_title: prompt.title,
                        new_title: newTitle,
                        new_content: newContent
                    })
                });
                
                if (result.success) {
                    const selectedIndex = this.selectedPrompts.findIndex(p => p.title === promptTitle);
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
                    const nextType = folder && folder.toLowerCase().endsWith('.csv') ? 'csv' : this.currentFolderType;
                    await this.selectFolder(folder, nextType);
                } else {
                    alert('保存失败: ' + result.error);
                }
            } catch (error) {
                alert('保存失败: ' + error.message);
            }
        });
        
        modal.addEventListener('mousedown', (e) => {
            if (!e.target.closest('.hezl-modal-content')) {
                modal.remove();
            }
        });
    }
    
    async showAddPromptModal(csvPath = null) {
        if (csvPath) {
            this.currentFolder = csvPath;
            this.currentFolderType = 'csv';
        }
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
                const result = await this.safeFetchJson('/hezl_prompt/add_prompt', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({
                        folder: folder,
                        title: newTitle,
                        content: newContent
                    })
                });
                
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
        
        modal.addEventListener('mousedown', (e) => {
            if (!e.target.closest('.hezl-modal-content')) {
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
        
        const source = prompt.source || this.currentFolder;
        const existingIndex = this.selectedPrompts.findIndex(p => p.title === promptTitle);
        
        if (existingIndex === -1) {
            const newPrompt = {
                title: prompt.title,
                content: prompt.content,
                folder: source
            };
            this.selectedPrompts.push(newPrompt);
            this.promptWeights[promptTitle] = 1.0;
            this.promptDisabled[promptTitle] = false;
        } else {
            this.selectedPrompts.splice(existingIndex, 1);
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
    
    syncSelectionState() {
        this.updateFolderCounts();
        this.renderPreview();
        this.updateOutput();
        
        if (this.promptsData.length > 0) {
            this.renderPromptList();
        }
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
                e.dataTransfer.effectAllowed = 'move';
            });
            
            item.addEventListener('dragend', () => {
                item.classList.remove('dragging');
                this.previewContainer.querySelectorAll('.hezl-preview-item').forEach(i => {
                    i.classList.remove('drag-over', 'insert-before', 'insert-after');
                });
            });
            
            item.addEventListener('dragover', (e) => {
                e.preventDefault();
                e.dataTransfer.dropEffect = 'move';
                
                if (item.classList.contains('dragging')) return;
                
                this.previewContainer.querySelectorAll('.hezl-preview-item').forEach(i => {
                    if (i !== item) {
                        i.classList.remove('insert-before', 'insert-after');
                    }
                });
                
                const rect = item.getBoundingClientRect();
                const midX = rect.left + rect.width / 2;
                
                if (e.clientX < midX) {
                    item.classList.remove('insert-after');
                    item.classList.add('insert-before');
                } else {
                    item.classList.remove('insert-before');
                    item.classList.add('insert-after');
                }
            });
            
            item.addEventListener('dragenter', (e) => {
                e.preventDefault();
                if (!item.classList.contains('dragging')) {
                    item.classList.add('drag-over');
                }
            });
            
            item.addEventListener('dragleave', (e) => {
                const rect = item.getBoundingClientRect();
                if (e.clientX < rect.left || e.clientX > rect.right || 
                    e.clientY < rect.top || e.clientY > rect.bottom) {
                    item.classList.remove('drag-over', 'insert-before', 'insert-after');
                }
            });
            
            item.addEventListener('drop', (e) => {
                e.preventDefault();
                item.classList.remove('drag-over', 'insert-before', 'insert-after');
                const dragIndex = parseInt(e.dataTransfer.getData('text/plain'));
                let dropIndex = parseInt(item.dataset.index);
                
                const rect = item.getBoundingClientRect();
                const midX = rect.left + rect.width / 2;
                
                if (e.clientX >= midX) {
                    dropIndex = dropIndex + 1;
                }
                
                if (!isNaN(dragIndex) && !isNaN(dropIndex) && dragIndex !== dropIndex) {
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
    
    async deletePrompt(promptTitle, promptSource) {
        if (!promptTitle || !promptSource) return;
        if (!confirm('\u786e\u5b9a\u5220\u9664\u8be5\u8bcd\u7ec4\u5417?')) {
            return;
        }

        try {
            const result = await this.safeFetchJson('/hezl_prompt/delete_prompt', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    folder: promptSource,
                    title: promptTitle
                })
            });

            if (result.success) {
                this.promptsData = this.promptsData.filter(p => {
                    const source = p.source || this.currentFolder;
                    return !(p.title === promptTitle && source === promptSource);
                });

                const selectedIndex = this.selectedPrompts.findIndex(p => p.title === promptTitle && p.folder === promptSource);
                if (selectedIndex !== -1) {
                    this.selectedPrompts.splice(selectedIndex, 1);
                    delete this.promptWeights[promptTitle];
                    delete this.promptDisabled[promptTitle];
                }

                this.updateFolderCounts();
                this.renderPromptList();
                this.renderPreview();
                this.updateOutput();
            } else {
                alert('\u5220\u9664\u5931\u8d25: ' + result.error);
            }
        } catch (error) {
            alert('\u5220\u9664\u5931\u8d25: ' + error.message);
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

    async reorderPromptList(fromIndex, toIndex) {
        if (this.currentFolderType !== 'csv') return;
        if (fromIndex === toIndex) return;
        
        const item = this.promptsData.splice(fromIndex, 1)[0];
        
        if (fromIndex < toIndex) {
            toIndex--;
        }
        
        this.promptsData.splice(toIndex, 0, item);
        
        await this.persistPromptOrder();
        this.renderPromptList();
    }

    async persistPromptOrder() {
        if (this.currentFolderType !== 'csv') return;
        
        try {
            const result = await this.safeFetchJson('/hezl_prompt/reorder_prompts', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    folder: this.currentFolder,
                    prompts: this.promptsData.map(p => ({
                        title: p.title,
                        content: p.content
                    }))
                })
            });
            if (!result.success) {
                alert('æŽ’åºä¿å­˜å¤±è´¥: ' + result.error);
            }
        } catch (error) {
            alert('æŽ’åºä¿å­˜å¤±è´¥: ' + error.message);
        }
    }
    
    updateOutput() {
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
        const parent = ''; // 强制在根目录下创建
        
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
                const result = await this.safeFetchJson('/hezl_prompt/add_folder', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({
                        parent: parent,
                        name: name
                    })
                });
                
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
        
        modal.addEventListener('mousedown', (e) => {
            if (!e.target.closest('.hezl-modal-content')) {
                modal.remove();
            }
        });
    }
    
    showCreateCsvModal(folderPath = null) {
        if (folderPath) {
            this.currentFolder = folderPath;
            this.currentFolderType = 'folder';
        }
        if (!this.currentFolder || this.currentFolderType !== 'folder') {
            alert('请选择文件夹');
            return;
        }
        
        const modal = document.createElement('div');
        modal.className = 'hezl-modal';
        modal.innerHTML = `
            <div class="hezl-modal-content">
                <div class="hezl-modal-header">新建CSV文件</div>
                <div class="hezl-form-group">
                    <label class="hezl-form-label">文件名称</label>
                    <input type="text" class="hezl-form-input" id="hezl-csv-name" placeholder="输入文件名称（不需要.csv后缀）">
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
            const name = modal.querySelector('#hezl-csv-name').value.trim();
            
            if (!name) {
                alert('请输入文件名称');
                return;
            }
            
            try {
                const result = await this.safeFetchJson('/hezl_prompt/create_csv_file', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({
                        folder: this.currentFolder,
                        name: name
                    })
                });
                
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
        
        modal.addEventListener('mousedown', (e) => {
            if (!e.target.closest('.hezl-modal-content')) {
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
                const result = await this.safeFetchJson('/hezl_prompt/rename_folder', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({
                        path: path,
                        new_name: newName
                    })
                });
                
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
        
        modal.addEventListener('mousedown', (e) => {
            if (!e.target.closest('.hezl-modal-content')) {
                modal.remove();
            }
        });
    }
    
    showRenameCsvModal(csvPath = null) {
        const path = csvPath || this.currentFolder;
        if (!path) {
            alert('\u8bf7\u5148\u9009\u62e9CSV\u6587\u4ef6');
            return;
        }

        const fileName = path.split(/[/\\]/).pop();
        const baseName = fileName.replace(/\.csv$/i, '');

        const modal = document.createElement('div');
        modal.className = 'hezl-modal';
        modal.innerHTML = `
            <div class="hezl-modal-content">
                <div class="hezl-modal-header">\u91cd\u547d\u540dCSV\u6587\u4ef6</div>
                <div class="hezl-form-group">
                    <label class="hezl-form-label">\u65b0\u540d\u79f0</label>
                    <input type="text" class="hezl-form-input" id="hezl-new-csv-name" value="${this.escapeHtml(baseName)}" placeholder="\u8f93\u5165\u65b0\u540d\u79f0">
                </div>
                <div class="hezl-modal-actions">
                    <button class="hezl-btn" id="hezl-modal-cancel">\u53d6\u6d88</button>
                    <button class="hezl-btn success" id="hezl-modal-save">\u4fdd\u5b58</button>
                </div>
            </div>
        `;

        document.body.appendChild(modal);

        modal.querySelector('#hezl-modal-cancel').addEventListener('click', () => {
            modal.remove();
        });

        modal.querySelector('#hezl-modal-save').addEventListener('click', async () => {
            const newName = modal.querySelector('#hezl-new-csv-name').value.trim();
            if (!newName) {
                alert('\u8bf7\u8f93\u5165\u65b0\u540d\u79f0');
                return;
            }

            try {
                const result = await this.safeFetchJson('/hezl_prompt/rename_csv_file', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({
                        path: path,
                        new_name: newName
                    })
                });

                if (result.success) {
                    const newPath = result.path || path;
                    this.selectedPrompts.forEach(p => {
                        if (p.folder === path) {
                            p.folder = newPath;
                        }
                    });
                    this.promptsData.forEach(p => {
                        const source = p.source || this.currentFolder;
                        if (source === path) {
                            p.source = newPath;
                        }
                    });
                    if (this.currentFolder === path) {
                        this.currentFolder = newPath;
                        this.currentFolderType = 'csv';
                    }
                    modal.remove();
                    this.loadFolderStructure();
                    if (this.currentFolder === newPath) {
                        await this.selectFolder(newPath, 'csv');
                    }
                } else {
                    alert('\u91cd\u547d\u540d\u5931\u8d25: ' + result.error);
                }
            } catch (error) {
                alert('\u91cd\u547d\u540d\u5931\u8d25: ' + error.message);
            }
        });

        modal.addEventListener('mousedown', (e) => {
            if (!e.target.closest('.hezl-modal-content')) {
                modal.remove();
            }
        });
    }

    deleteCurrentFolder() {
        if (!this.currentFolder) {
            alert('请先选择要删除的项目');
            return;
        }
        
        if (this.currentFolderType === 'csv') {
            if (!confirm('是否删除此CSV文件？')) {
                return;
            }
            this.deleteCsvFile(this.currentFolder);
        } else {
            if (!confirm('是否删除此文件夹？文件夹内的所有内容都将被删除。')) {
                return;
            }
            this.deleteFolder(this.currentFolder);
        }
    }
    
    async deleteCsvFile(csvPath) {
        if (!csvPath) {
            alert('请先选择CSV文件');
            return;
        }
        
        try {
            const result = await this.safeFetchJson('/hezl_prompt/delete_csv_file', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    path: csvPath
                })
            });
            
            if (result.success) {
                this.selectedPrompts = this.selectedPrompts.filter(p => p.folder !== csvPath);
                this.updateFolderCounts();
                this.renderPreview();
                this.updateOutput();
                this.currentFolder = '';
                this.currentFolderType = '';
                this.loadFolderStructure();
                this.promptList.innerHTML = '<div class="hezl-empty-state">请选择左侧分类查看词组</div>';
            } else {
                alert('删除失败: ' + result.error);
            }
        } catch (error) {
            alert('删除失败: ' + error.message);
        }
    }
    
    async deleteFolder(folderPath) {
        if (!folderPath) {
            alert('请先选择一个文件夹');
            return;
        }
        
        try {
            const result = await this.safeFetchJson('/hezl_prompt/delete_folder', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    path: folderPath
                })
            });
            
            if (result.success) {
                this.selectedPrompts = this.selectedPrompts.filter(p => {
                    return p.folder !== folderPath && 
                           !p.folder.startsWith(folderPath + '/') && 
                           !p.folder.startsWith(folderPath + '\\');
                });
                this.updateFolderCounts();
                this.renderPreview();
                this.updateOutput();
                this.currentFolder = '';
                this.currentFolderType = '';
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
                
                this.size = [800, 600];
                
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
                            hezlWidget.syncSelectionState();
                        } catch (e) {}
                    }
                });
                
                return result;
            };
        }
    }
});
