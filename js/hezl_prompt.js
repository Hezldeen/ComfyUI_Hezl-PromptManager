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

.hezl-prompt-right {
    flex: 1 1 auto;
    min-width: 150px;
    display: flex;
    flex-direction: column;
    overflow: hidden;
}

.hezl-prompt-list {
    flex: 1 1 auto;
    min-height: 0;
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
    font-weight: 500;
    font-size: 11px;
    background: #3d3d3d;
    color: #e0e0e0;
    padding: 3px 10px;
    border-radius: 8px 0 0 8px;
    flex-shrink: 0;
    white-space: nowrap;
    letter-spacing: 0.3px;
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
    background: rgb(26, 26, 26);
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

.hezl-prompt-toolbar {
    display: flex;
    gap: 4px;
    padding: 4px 6px;
    background: #1a1a1a;
    border-bottom: 1px solid #333;
    flex-wrap: wrap;
    flex-shrink: 0;
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
    background: #2a2a2a;
    border-radius: 10px;
    margin: 1px;
    border: 1px solid #3a3a3a;
    overflow: hidden;
    transition: all 0.15s ease;
    cursor: grab;
}

.hezl-prompt-item-wrapper:hover {
    border-color: #555;
    background: #333;
    transform: translateY(-1px);
    box-shadow: 0 2px 6px rgba(0,0,0,0.3);
}

.hezl-prompt-item-wrapper.selected {
    border-color: #27ae60;
    background: #2d3a2d;
    box-shadow: 0 0 0 1px rgba(39, 174, 96, 0.3);
}

.hezl-prompt-item-wrapper.selected .hezl-prompt-title {
    background: #27ae60;
    color: #fff;
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
    gap: 6px;
    cursor: pointer;
}

.hezl-prompt-edit-btn {
    display: none;
}

.hezl-prompt-edit-btn:hover {
    background: #2980b9;
}

/* Multi-bar styles */
.hezl-bar-section {
    margin-bottom: 8px;
    border: 1px solid #333;
    border-radius: 6px;
    overflow: hidden;
}

.hezl-bar-header {
    display: flex;
    align-items: center;
    gap: 4px;
    padding: 4px 8px;
    background: #1a1a1a;
    border-bottom: 1px solid #333;
    font-size: 11px;
}

.hezl-bar-label {
    font-weight: bold;
    color: #ccc;
    margin-right: 2px;
    cursor: pointer;
    padding: 1px 3px;
    border-radius: 3px;
    transition: background 0.15s;
}

.hezl-bar-label:hover {
    background: #333;
    color: #fff;
}

/* Bar rename button */
.hezl-bar-rename-btn {
    background: #3498db;
    color: #fff;
    border: none;
    cursor: pointer;
    font-size: 10px;
    padding: 2px 6px;
    border-radius: 3px;
    transition: background 0.2s;
    line-height: 1;
    flex-shrink: 0;
}

.hezl-bar-rename-btn:hover {
    background: #2980b9;
}

.hezl-bar-actions {
    display: flex;
    gap: 4px;
}

.hezl-bar-drop-zone {
    min-height: 20px;
    padding: 4px;
    transition: background 0.2s;
}

.hezl-bar-drop-zone.drag-over-bar {
    background: rgba(39, 174, 96, 0.15);
    border: 1px dashed #27ae60;
    border-radius: 4px;
}

.hezl-add-bar-btn {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;
    padding: 8px;
    border: 1px dashed #555;
    border-radius: 6px;
    background: transparent;
    color: #888;
    cursor: pointer;
    font-size: 16px;
    transition: all 0.2s;
    margin-top: 4px;
}

.hezl-add-bar-btn:hover {
    border-color: #3498db;
    color: #3498db;
    background: rgba(52, 152, 219, 0.1);
}

/* Bar header layout */
.hezl-bar-actions-left {
    display: flex;
    align-items: center;
    gap: 4px;
    flex: 1;
}

.hezl-bar-actions-right {
    display: flex;
    align-items: center;
    gap: 4px;
}

/* Selected bar */
.hezl-bar-section.selected-bar {
    border: 2px solid #27ae60;
}

/* Prompt count badge (right side of phrase item — compact filled pill) */
.hezl-prompt-count-badge {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    min-width: 18px;
    height: 17px;
    border-radius: 9px;
    background: #c0392b;
    color: #fff;
    font-size: 10px;
    font-weight: 600;
    padding: 0 5px;
    line-height: 1;
    flex-shrink: 0;
    margin-right: 2px;
    box-shadow: 0 1px 2px rgba(0,0,0,0.25);
    letter-spacing: 0.3px;
}
`;

class HezlPromptWidget {
    constructor(node, inputName, inputData, app) {
        this.node = node;
        this.app = app;
        // Multi-bar data structure: each bar has its own prompts, weights, disabled
        this.bars = [
            {
                name: '',
                prompts: [],
                weights: {},
                disabled: {}
            }
        ];
        this.selectedBarIndex = 0;
        this._nextPromptId = 1;
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
                            <button class="hezl-btn small" id="hezl-expand-all" title="展开全部">⏬️</button>
                            <button class="hezl-btn small" id="hezl-collapse-all" title="收起全部">⏭️</button>
                            <button class="hezl-btn small" id="hezl-add-root-folder" title="在根目录csv文件夹下创建文件夹">+📁</button>
                            <button class="hezl-btn small" id="hezl-refresh" title="刷新">🔄</button>
                        </div>
                    </div>
                    <div class="hezl-folder-tree" id="hezl-folder-tree"></div>
                </div>
                <div class="hezl-splitter-vertical" id="hezl-splitter-vertical"></div>
                <div class="hezl-prompt-right" id="hezl-prompt-right">
                    <div class="hezl-prompt-toolbar" id="hezl-prompt-toolbar" style="display:none;"></div>
                    <div class="hezl-prompt-list" id="hezl-prompt-list">
                        <div class="hezl-empty-state">请选择左侧分类查看词组</div>
                    </div>
                </div>
            </div>
            <div class="hezl-splitter-horizontal" id="hezl-splitter-horizontal"></div>
            <div class="hezl-prompt-bottom" id="hezl-prompt-bottom">
                <div id="hezl-bars-container"></div>
                <button class="hezl-add-bar-btn" id="hezl-add-bar" title="添加词组栏">+</button>
            </div>
        `;
        
        this.folderTree = this.container.querySelector('#hezl-folder-tree');
        this.promptList = this.container.querySelector('#hezl-prompt-list');
        this.toolbar = this.container.querySelector('#hezl-prompt-toolbar');
        this.barsContainer = this.container.querySelector('#hezl-bars-container');
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
        
        // Feature 2: Expand all / Collapse all
        const expandAllBtn = this.container.querySelector('#hezl-expand-all');
        if (expandAllBtn) {
            expandAllBtn.addEventListener('click', () => {
                this.expandAllFolders();
            });
        }

        const collapseAllBtn = this.container.querySelector('#hezl-collapse-all');
        if (collapseAllBtn) {
            collapseAllBtn.addEventListener('click', () => {
                this.collapseAllFolders();
            });
        }

        // Feature 4: Add bar button
        const addBarBtn = this.container.querySelector('#hezl-add-bar');
        if (addBarBtn) {
            addBarBtn.addEventListener('click', () => {
                this.addBar();
            });
        }
        
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
            if (this.getTotalSelectedCount() > 0) {
                this.updateFolderCounts();
            }
        } catch (error) {
            console.error('Failed to load folder structure:', error);
        }
    }
    
    // ==================== Multi-bar management ====================

    addBar() {
        if (this.bars.length >= 10) {
            alert('最多支持10个词组栏');
            return;
        }
        this.bars.push({
            name: '',
            prompts: [],
            weights: {},
            disabled: {}
        });
        this.selectedBarIndex = this.bars.length - 1;
        this.renderBars();
        this.updateOutput();
        this.updateNodeOutputs();
    }

    removeBar(barIndex) {
        if (this.bars.length <= 1) {
            alert('至少需要保留一个词组栏');
            return;
        }
        if (confirm('确定要移除此词组栏吗？')) {
            this.bars.splice(barIndex, 1);
            // Adjust selectedBarIndex
            if (this.selectedBarIndex >= this.bars.length) {
                this.selectedBarIndex = this.bars.length - 1;
            } else if (this.selectedBarIndex > barIndex) {
                this.selectedBarIndex--;
            } else if (this.selectedBarIndex === barIndex) {
                this.selectedBarIndex = Math.min(barIndex, this.bars.length - 1);
            }
            this.renderBars();
            this.updateOutput();
            this.updateNodeOutputs();
            this.renderPromptList(); // Update count badges
        }
    }

    getBarLabel(index) {
        const bar = this.bars[index];
        if (bar && bar.name) {
            return bar.name;
        }
        return `词组栏${String(index + 1).padStart(2, '0')}`;
    }

    renameBar(barIndex, labelEl) {
        const bar = this.bars[barIndex];
        const currentName = bar.name || `词组栏${String(barIndex + 1).padStart(2, '0')}`;

        // Replace label with input
        const input = document.createElement('input');
        input.type = 'text';
        input.value = currentName;
        input.className = 'hezl-bar-rename-input';
        input.style.cssText = 'background: #1a1a1a; color: #fff; border: 1px solid #27ae60; border-radius: 4px; padding: 2px 6px; font-size: 12px; font-weight: bold; width: 120px; outline: none; box-shadow: 0 0 0 2px rgba(39, 174, 96, 0.2);';

        labelEl.style.display = 'none';
        labelEl.parentNode.insertBefore(input, labelEl);
        input.focus();
        input.select();

        const finishRename = () => {
            const newName = input.value.trim();
            bar.name = newName;
            input.remove();
            labelEl.style.display = '';
            labelEl.textContent = this.getBarLabel(barIndex);
            this.updateOutput();
            this.updateNodeOutputs();
        };

        input.addEventListener('blur', finishRename);
        input.addEventListener('keydown', (e) => {
            if (e.key === 'Enter') {
                e.preventDefault();
                input.blur();
            } else if (e.key === 'Escape') {
                input.value = currentName;
                input.blur();
            }
        });
    }

    // Legacy compatibility getters
    get selectedPrompts() {
        return this.bars.reduce((acc, bar) => acc.concat(bar.prompts), []);
    }

    get promptWeights() {
        const merged = {};
        this.bars.forEach(bar => Object.assign(merged, bar.weights));
        return merged;
    }

    get promptDisabled() {
        const merged = {};
        this.bars.forEach(bar => Object.assign(merged, bar.disabled));
        return merged;
    }

    getTotalSelectedCount() {
        return this.bars.reduce((acc, bar) => acc + bar.prompts.length, 0);
    }

    // ==================== Feature 4: Render bars ====================

    renderBars() {
        let html = '';
        this.bars.forEach((bar, barIndex) => {
            const label = this.getBarLabel(barIndex);
            const isSelected = this.selectedBarIndex === barIndex ? 'selected-bar' : '';
            html += `
                <div class="hezl-bar-section ${isSelected}" data-bar-index="${barIndex}">
                    <div class="hezl-bar-header">
                        <div class="hezl-bar-actions-left">
                            <span class="hezl-bar-label" data-bar="${barIndex}" title="双击重命名">${label}</span>
                            <button class="hezl-btn small hezl-bar-rename-btn" data-bar="${barIndex}" title="重命名词组栏">重命名</button>
                            <button class="hezl-btn small danger hezl-bar-remove-all" data-bar="${barIndex}">移除全部</button>
                            <button class="hezl-btn small warning hezl-bar-disable-all" data-bar="${barIndex}">全部禁用</button>
                            <button class="hezl-btn small success hezl-bar-enable-all" data-bar="${barIndex}">全部启用</button>
                        </div>
                        <div class="hezl-bar-actions-right">
                            <button class="hezl-btn small danger hezl-bar-delete" data-bar="${barIndex}" title="删除词组栏">✕</button>
                        </div>
                    </div>
                    <div class="hezl-bar-drop-zone" data-bar-index="${barIndex}">
                        <div class="hezl-preview-container" data-bar-index="${barIndex}">
            `;
            if (bar.prompts.length === 0) {
                html += '<div class="hezl-empty-state" style="width: 100%; padding: 10px;">点击上方词组添加到此处</div>';
            } else {
                bar.prompts.forEach((prompt, promptIndex) => {
                    const pid = prompt.id;
                    const weight = bar.weights[pid] || 1.0;
                    const isDisabled = bar.disabled[pid] || false;
                    html += `
                        <div class="hezl-preview-item ${isDisabled ? 'disabled' : ''}" data-bar-index="${barIndex}" data-prompt-index="${promptIndex}" data-prompt-id="${pid}" draggable="true">
                            <span class="hezl-preview-text" title="${this.escapeHtml(prompt.content)}">${this.escapeHtml(prompt.title)}</span>
                            <div class="hezl-weight-control">
                                <button class="hezl-weight-btn" data-action="decrease">-</button>
                                <span class="hezl-weight-value">${weight.toFixed(2)}</span>
                                <button class="hezl-weight-btn" data-action="increase">+</button>
                            </div>
                            <button class="hezl-remove-btn" data-bar-index="${barIndex}" data-prompt-index="${promptIndex}" data-prompt-id="${pid}">✕</button>
                        </div>
                    `;
                });
            }
            html += `
                        </div>
                    </div>
                </div>
            `;
        });

        this.barsContainer.innerHTML = html;
        this.bindBarEvents();
    }

    bindBarEvents() {
        // Bar action buttons
        this.barsContainer.querySelectorAll('.hezl-bar-remove-all').forEach(btn => {
            btn.addEventListener('click', (e) => {
                e.stopPropagation();
                const barIndex = parseInt(btn.dataset.bar);
                this.removeAllPromptsFromBar(barIndex);
            });
        });

        this.barsContainer.querySelectorAll('.hezl-bar-disable-all').forEach(btn => {
            btn.addEventListener('click', (e) => {
                e.stopPropagation();
                const barIndex = parseInt(btn.dataset.bar);
                this.toggleAllPromptsDisabledInBar(barIndex, true);
            });
        });

        this.barsContainer.querySelectorAll('.hezl-bar-enable-all').forEach(btn => {
            btn.addEventListener('click', (e) => {
                e.stopPropagation();
                const barIndex = parseInt(btn.dataset.bar);
                this.toggleAllPromptsDisabledInBar(barIndex, false);
            });
        });

        // Delete bar button
        this.barsContainer.querySelectorAll('.hezl-bar-delete').forEach(btn => {
            btn.addEventListener('click', (e) => {
                e.stopPropagation();
                const barIndex = parseInt(btn.dataset.bar);
                this.removeBar(barIndex);
            });
        });

        // Rename button click
        this.barsContainer.querySelectorAll('.hezl-bar-rename-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                e.stopPropagation();
                const barIndex = parseInt(btn.dataset.bar);
                const label = this.barsContainer.querySelector(`.hezl-bar-label[data-bar="${barIndex}"]`);
                if (label) {
                    this.renameBar(barIndex, label);
                }
            });
        });

        // Double-click on bar label to rename
        this.barsContainer.querySelectorAll('.hezl-bar-label').forEach(label => {
            label.addEventListener('dblclick', (e) => {
                e.stopPropagation();
                const barIndex = parseInt(label.dataset.bar);
                this.renameBar(barIndex, label);
            });
        });

        // Click on bar section to select it
        this.barsContainer.querySelectorAll('.hezl-bar-section').forEach(section => {
            section.addEventListener('click', (e) => {
                // Don't select if clicking on buttons or preview items
                if (e.target.closest('.hezl-bar-header') || e.target.closest('.hezl-preview-item') || e.target.closest('.hezl-remove-btn') || e.target.closest('.hezl-weight-btn')) return;
                const barIndex = parseInt(section.dataset.barIndex);
                this.selectedBarIndex = barIndex;
                this.renderBars();
            });
            // Click on bar header to select
            section.querySelector('.hezl-bar-header')?.addEventListener('click', (e) => {
                if (e.target.closest('button')) return;
                const barIndex = parseInt(section.dataset.barIndex);
                this.selectedBarIndex = barIndex;
                this.renderBars();
            });
        });

        // Preview item events
        this.barsContainer.querySelectorAll('.hezl-preview-item').forEach(item => {
            const barIndex = parseInt(item.dataset.barIndex);
            const promptIndex = parseInt(item.dataset.promptIndex);

            // Click to toggle disabled
            item.addEventListener('click', (e) => {
                if (!e.target.classList.contains('hezl-weight-btn') &&
                    !e.target.classList.contains('hezl-remove-btn')) {
                    const prompt = this.bars[barIndex].prompts[promptIndex];
                    if (prompt) {
                        const pid = prompt.id;
                        this.bars[barIndex].disabled[pid] = !this.bars[barIndex].disabled[pid];
                        this.renderBars();
                        this.updateOutput();
                    }
                }
            });

            // Feature 3: Right-click context menu on preview items
            item.addEventListener('contextmenu', (e) => {
                e.preventDefault();
                const prompt = this.bars[barIndex].prompts[promptIndex];
                if (prompt) {
                    this.showContextMenu(e, '', 'preview-item', {
                        title: prompt.title,
                        folder: prompt.folder,
                        barIndex: barIndex,
                        promptIndex: promptIndex,
                        promptId: prompt.id
                    });
                }
            });

            // Feature 6: Drag between bars
            item.addEventListener('dragstart', (e) => {
                item.classList.add('dragging');
                e.dataTransfer.effectAllowed = 'move';
                e.dataTransfer.setData('text/plain', JSON.stringify({
                    barIndex: barIndex,
                    promptIndex: promptIndex
                }));
            });

            item.addEventListener('dragend', () => {
                item.classList.remove('dragging');
                this.barsContainer.querySelectorAll('.hezl-preview-item').forEach(i => {
                    i.classList.remove('drag-over', 'insert-before', 'insert-after');
                });
                this.barsContainer.querySelectorAll('.hezl-bar-drop-zone').forEach(z => {
                    z.classList.remove('drag-over-bar');
                });
            });

            item.addEventListener('dragover', (e) => {
                e.preventDefault();
                e.dataTransfer.dropEffect = 'move';
                if (item.classList.contains('dragging')) return;

                this.barsContainer.querySelectorAll('.hezl-preview-item').forEach(i => {
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
                try {
                    const dragData = JSON.parse(e.dataTransfer.getData('text/plain'));
                    const fromBarIndex = dragData.barIndex;
                    const fromPromptIndex = dragData.promptIndex;
                    const toBarIndex = barIndex;

                    let toPromptIndex = promptIndex;
                    const rect = item.getBoundingClientRect();
                    const midX = rect.left + rect.width / 2;
                    if (e.clientX >= midX) {
                        toPromptIndex = promptIndex + 1;
                    }

                    this.movePromptBetweenBars(fromBarIndex, fromPromptIndex, toBarIndex, toPromptIndex);
                } catch (err) {}
            });
        });

        // Feature 6: Drop zone for bars (drop into empty area)
        this.barsContainer.querySelectorAll('.hezl-bar-drop-zone').forEach(zone => {
            const barIndex = parseInt(zone.dataset.barIndex);

            zone.addEventListener('dragover', (e) => {
                if (!e.target.closest('.hezl-preview-item')) {
                    e.preventDefault();
                    e.dataTransfer.dropEffect = 'move';
                    zone.classList.add('drag-over-bar');
                }
            });

            zone.addEventListener('dragleave', (e) => {
                if (!zone.contains(e.relatedTarget)) {
                    zone.classList.remove('drag-over-bar');
                }
            });

            zone.addEventListener('drop', (e) => {
                e.preventDefault();
                zone.classList.remove('drag-over-bar');
                if (e.target.closest('.hezl-preview-item')) return;

                try {
                    const dragData = JSON.parse(e.dataTransfer.getData('text/plain'));
                    const fromBarIndex = dragData.barIndex;
                    const fromPromptIndex = dragData.promptIndex;
                    const toBarIndex = barIndex;
                    const toPromptIndex = this.bars[toBarIndex].prompts.length;
                    this.movePromptBetweenBars(fromBarIndex, fromPromptIndex, toBarIndex, toPromptIndex);
                } catch (err) {}
            });
        });

        // Weight buttons
        this.barsContainer.querySelectorAll('.hezl-weight-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                e.stopPropagation();
                const item = btn.closest('.hezl-preview-item');
                const barIndex = parseInt(item.dataset.barIndex);
                const promptIndex = parseInt(item.dataset.promptIndex);
                const prompt = this.bars[barIndex].prompts[promptIndex];
                if (!prompt) return;

                const pid = prompt.id;
                const action = btn.dataset.action;
                let weight = this.bars[barIndex].weights[pid] || 1.0;
                if (action === 'increase') {
                    weight = Math.min(2.0, weight + 0.1);
                } else {
                    weight = Math.max(0.1, weight - 0.1);
                }
                this.bars[barIndex].weights[pid] = weight;
                this.renderBars();
                this.updateOutput();
            });
        });

        // Remove buttons
        this.barsContainer.querySelectorAll('.hezl-remove-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                e.stopPropagation();
                const barIndex = parseInt(btn.dataset.barIndex);
                const promptIndex = parseInt(btn.dataset.promptIndex);
                this.removePromptFromBarByIndex(barIndex, promptIndex);
            });
        });
    }

    // ==================== Feature 6: Move prompt between bars ====================

    movePromptBetweenBars(fromBarIndex, fromPromptIndex, toBarIndex, toPromptIndex) {
        if (fromBarIndex === toBarIndex && fromPromptIndex === toPromptIndex) return;

        const fromBar = this.bars[fromBarIndex];
        const toBar = this.bars[toBarIndex];
        const prompt = fromBar.prompts[fromPromptIndex];
        if (!prompt) return;

        const pid = prompt.id;
        const weight = fromBar.weights[pid] || 1.0;
        const isDisabled = fromBar.disabled[pid] || false;

        // Remove from source
        fromBar.prompts.splice(fromPromptIndex, 1);
        delete fromBar.weights[pid];
        delete fromBar.disabled[pid];

        // Adjust target index if same bar and after source
        if (fromBarIndex === toBarIndex && fromPromptIndex < toPromptIndex) {
            toPromptIndex--;
        }

        // Insert into target
        toBar.prompts.splice(toPromptIndex, 0, prompt);
        toBar.weights[pid] = weight;
        toBar.disabled[pid] = isDisabled;

        this.renderBars();
        this.updateFolderCounts();
        this.renderPromptList();
        this.updateOutput();
    }

    // ==================== Bar-level operations ====================

    removeAllPromptsFromBar(barIndex) {
        const bar = this.bars[barIndex];
        if (bar.prompts.length === 0) return;
        if (confirm('确定要移除此词组栏中的所有词组吗？')) {
            bar.prompts = [];
            bar.weights = {};
            bar.disabled = {};
            this.renderBars();
            this.updateFolderCounts();
            this.renderPromptList();
            this.updateOutput();
        }
    }

    toggleAllPromptsDisabledInBar(barIndex, disabled) {
        const bar = this.bars[barIndex];
        for (const prompt of bar.prompts) {
            bar.disabled[prompt.id] = disabled;
        }
        this.renderBars();
        this.updateOutput();
    }

    togglePromptDisabledInBar(barIndex, promptTitle) {
        const bar = this.bars[barIndex];
        // Toggle all prompts with this title in the bar
        for (const prompt of bar.prompts) {
            if (prompt.title === promptTitle) {
                bar.disabled[prompt.id] = !bar.disabled[prompt.id];
            }
        }
        this.renderBars();
        this.updateOutput();
    }

    removePromptFromBar(barIndex, promptTitle) {
        const bar = this.bars[barIndex];
        const index = bar.prompts.findIndex(p => p.title === promptTitle);
        if (index !== -1) {
            const pid = bar.prompts[index].id;
            bar.prompts.splice(index, 1);
            delete bar.weights[pid];
            delete bar.disabled[pid];
            this.renderBars();
            this.updateFolderCounts();
            this.renderPromptList();
            this.updateOutput();
        }
    }

    removePromptFromBarByIndex(barIndex, promptIndex) {
        const bar = this.bars[barIndex];
        if (promptIndex < 0 || promptIndex >= bar.prompts.length) return;
        const pid = bar.prompts[promptIndex].id;
        bar.prompts.splice(promptIndex, 1);
        delete bar.weights[pid];
        delete bar.disabled[pid];
        this.renderBars();
        this.updateFolderCounts();
        this.renderPromptList();
        this.updateOutput();
    }

    // ==================== Feature 3: Locate prompt folder ====================

    locatePromptFolder(promptFolder) {
        if (!promptFolder) return;
        // Normalize path separators - backend may use \ on Windows
        const normalizedPath = promptFolder.replace(/\\/g, '/');
        const parts = normalizedPath.split('/');

        // Expand all ancestor folders so the target item is visible
        // Try both / and \ separators since folder tree data-path may use either
        let currentPath = '';
        for (let i = 0; i < parts.length - 1; i++) {
            if (!parts[i]) continue;
            currentPath = currentPath ? currentPath + '/' + parts[i] : parts[i];
            this.expandedFolders.add(currentPath);
            // Also add backslash variant
            this.expandedFolders.add(currentPath.replace(/\//g, '\\'));
        }

        // Re-render tree with expanded folders, then select and scroll
        this.renderFolderTree();

        // Find the target item using both path formats
        const targetItem = this.folderTree.querySelector(`.hezl-folder-item[data-path="${CSS.escape(normalizedPath)}"]`) ||
                          this.folderTree.querySelector(`.hezl-folder-item[data-path="${CSS.escape(promptFolder)}"]`);

        if (targetItem) {
            // Manually select the item
            this.folderTree.querySelectorAll('.hezl-folder-item').forEach(item => {
                item.classList.remove('selected');
            });
            targetItem.classList.add('selected');
            this.currentFolder = targetItem.dataset.path;
            this.currentFolderType = targetItem.dataset.type;

            // Load prompts for this folder
            this.selectFolder(targetItem.dataset.path, targetItem.dataset.type);

            // Scroll into view
            requestAnimationFrame(() => {
                targetItem.scrollIntoView({ behavior: 'smooth', block: 'center' });
            });
        } else {
            // Fallback: try selectFolder with original path
            this.selectFolder(promptFolder, promptFolder.toLowerCase().endsWith('.csv') ? 'csv' : 'folder');
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

    // Feature 2: Expand all / Collapse all
    expandAllFolders() {
        this._collectAllFolderPaths(this.folderStructure);
        this.renderFolderTree();
    }

    collapseAllFolders() {
        this.expandedFolders.clear();
        this.renderFolderTree();
    }

    _collectAllFolderPaths(structure) {
        if (!structure) return;
        const traverse = (node) => {
            if (node.type === 'folder' && node.path) {
                this.expandedFolders.add(node.path);
            }
            if (node.children) {
                node.children.forEach(traverse);
            }
        };
        if (structure.default) {
            traverse(structure.default);
        }
    }

    expandFolderDescendants(folderPath) {
        // Recursively expand all subfolders under the given folder path
        const collectDescendants = (nodes) => {
            if (!nodes) return;
            for (const node of nodes) {
                if (node.type === 'folder') {
                    if (node.path) {
                        this.expandedFolders.add(node.path);
                    }
                    if (node.children) {
                        collectDescendants(node.children);
                    }
                }
            }
        };

        // Find the target folder node and collect its descendants
        const findAndCollect = (nodes, targetPath) => {
            if (!nodes) return false;
            for (const node of nodes) {
                if (node.path === targetPath) {
                    if (node.children) {
                        collectDescendants(node.children);
                    }
                    return true;
                }
                if (node.children && findAndCollect(node.children, targetPath)) {
                    return true;
                }
            }
            return false;
        };

        if (this.folderStructure && this.folderStructure.default && this.folderStructure.default.children) {
            findAndCollect(this.folderStructure.default.children, folderPath);
        }
        this.renderFolderTree();
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
                // Don't trigger folder selection when clicking count badge
                if (e.target.classList.contains('hezl-folder-count')) {
                    e.stopPropagation();
                    this.clearFolderSelection(item.dataset.path);
                    return;
                }
                if (this.currentFolder === item.dataset.path) {
                    this.deselectFolder();
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
    
    showContextMenu(e, path, type, extra = {}) {
        this.hideContextMenu();
        
        this.contextMenu = document.createElement('div');
        this.contextMenu.className = 'hezl-context-menu';
        
        let menuHtml = '';

        if (type === 'folder') {
            menuHtml = `
                <div class="hezl-context-menu-item" data-action="expand-children">展开子文件夹</div>
                <div class="hezl-context-menu-item" data-action="add-folder">添加子文件夹</div>
                <div class="hezl-context-menu-item" data-action="add-csv">新建CSV文件</div>
                <div class="hezl-context-menu-item" data-action="rename-folder">重命名</div>
                <div class="hezl-context-menu-item" data-action="delete-folder">删除</div>
            `;
        } else if (type === 'csv') {
            menuHtml = `
                <div class="hezl-context-menu-item" data-action="add-prompt">添加词组</div>
                <div class="hezl-context-menu-item" data-action="rename-csv">重命名</div>
                <div class="hezl-context-menu-item" data-action="delete-csv">删除</div>
            `;
        } else if (type === 'prompt') {
            // Feature 1: Add "在⬆位置添加新词组" and "在⬇位置添加新词组"
            menuHtml = `
                <div class="hezl-context-menu-item" data-action="add-prompt-above">在⬆位置添加新词组</div>
                <div class="hezl-context-menu-item" data-action="add-prompt-below">在⬇位置添加新词组</div>
                <div class="hezl-context-menu-item" data-action="edit-prompt">编辑</div>
                <div class="hezl-context-menu-item" data-action="delete-prompt">删除</div>
            `;
        } else if (type === 'preview-item') {
            // Feature 3: Right-click on bottom preview items
            menuHtml = `
                <div class="hezl-context-menu-item" data-action="locate-folder">定位到词组所在目录</div>
                <div class="hezl-context-menu-item" data-action="enable-prompt">启用</div>
                <div class="hezl-context-menu-item" data-action="disable-prompt">禁用</div>
                <div class="hezl-context-menu-item" data-action="delete-preview-prompt">删除</div>
            `;
        } else if (type === 'blank') {
            menuHtml = `
                <div class="hezl-context-menu-item" data-action="add-root-folder">根目录新建文件夹</div>
                <div class="hezl-context-menu-item" data-action="refresh">刷新</div>
            `;
        }

        this.contextMenu.innerHTML = menuHtml;
        document.body.appendChild(this.contextMenu);
        
        this.contextMenu.style.left = e.clientX + 'px';
        this.contextMenu.style.top = e.clientY + 'px';
        
        this.contextMenu.querySelectorAll('.hezl-context-menu-item').forEach(item => {
            item.addEventListener('click', () => {
                const action = item.dataset.action;
                if (action === 'expand-children') {
                    this.expandFolderDescendants(path);
                } else if (action === 'add-folder') {
                    this.showAddFolderModal(path);
                } else if (action === 'add-csv') {
                    this.showCreateCsvModal(path);
                } else if (action === 'rename-folder') {
                    this.showRenameFolderModal(path);
                } else if (action === 'delete-folder') {
                    if (confirm('确定删除此文件夹吗？')) {
                        this.deleteFolder(path);
                    }
                } else if (action === 'add-prompt') {
                    this.showAddPromptModal(path);
                } else if (action === 'add-prompt-above') {
                    this.showAddPromptAtPosition(extra.source || path, extra.index, 'above');
                } else if (action === 'add-prompt-below') {
                    this.showAddPromptAtPosition(extra.source || path, extra.index, 'below');
                } else if (action === 'rename-csv') {
                    this.showRenameCsvModal(path);
                } else if (action === 'delete-csv') {
                    if (confirm('确定删除此CSV文件吗？')) {
                        this.deleteCsvFile(path);
                    }
                } else if (action === 'edit-prompt') {
                    this.showEditPromptModal(extra.title, extra.source || path);
                } else if (action === 'delete-prompt') {
                    this.deletePrompt(extra.title, extra.source || path);
                } else if (action === 'locate-folder') {
                    this.locatePromptFolder(extra.folder);
                } else if (action === 'enable-prompt') {
                    this.bars[extra.barIndex].disabled[extra.promptId] = false;
                    this.renderBars();
                    this.updateOutput();
                } else if (action === 'disable-prompt') {
                    this.bars[extra.barIndex].disabled[extra.promptId] = true;
                    this.renderBars();
                    this.updateOutput();
                } else if (action === 'delete-preview-prompt') {
                    this.removePromptFromBarByIndex(extra.barIndex, extra.promptIndex);
                } else if (action === 'add-root-folder') {
                    this.showAddFolderModal('');
                } else if (action === 'refresh') {
                    this.loadFolderStructure();
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
        const isCsv = this.currentFolderType === 'csv';

        // Handle toolbar visibility
        if (this.toolbar) {
            if (isCsv) {
                this.toolbar.style.display = 'flex';
                this.toolbar.innerHTML = `
                    <button class="hezl-btn small" id="hezl-prompt-add" title="新建词组">🏷️新建词组</button>
                    <button class="hezl-btn small" id="hezl-prompt-batch-move" title="批量移动词组到其他CSV文件">🚅批量移动词组</button>
                    <button class="hezl-btn small danger" id="hezl-prompt-batch-delete" title="批量删除词组">🗑️批量删除词组</button>
                `;
                this.bindPromptToolbarEvents();
            } else {
                this.toolbar.style.display = 'none';
            }
        }

        if (!isCsv) {
            this.promptList.innerHTML = '<div class="hezl-empty-state">请选择左侧分类查看词组</div>';
            return;
        }

        if (this.promptsData.length === 0) {
            this.promptList.innerHTML = '<div class="hezl-empty-state">暂无词组</div>';
            return;
        }

        let html = '';
        for (let index = 0; index < this.promptsData.length; index++) {
            const prompt = this.promptsData[index];
            const count = this.getPromptCountInBars(prompt.title);
            const escapedTitle = this.escapeHtml(prompt.title);
            const escapedSource = this.escapeHtml(prompt.source || this.currentFolder);
            const countBadge = count > 0
                ? `<span class="hezl-prompt-count-badge" data-prompt-title="${escapedTitle}" data-prompt-source="${escapedSource}" data-count="${count}">${count}</span>`
                : '';
            html += `
                <div class="hezl-prompt-item-wrapper"
                     data-title="${escapedTitle}"
                     data-folder="${this.currentFolder}"
                     data-source="${escapedSource}"
                     data-index="${index}">
                    <div class="hezl-prompt-item-content">
                        <div class="hezl-prompt-title">${escapedTitle}</div>
                        ${countBadge}
                    </div>
                    <button class="hezl-prompt-edit-btn" data-title="${escapedTitle}">编辑</button>
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

            // Count badge hover/click behavior
            const countBadge = wrapper.querySelector('.hezl-prompt-count-badge');
            if (countBadge) {
                countBadge.addEventListener('mouseenter', () => {
                    countBadge.textContent = '-';
                    countBadge.style.background = '#555';
                });
                countBadge.addEventListener('mouseleave', () => {
                    countBadge.textContent = countBadge.dataset.count;
                    countBadge.style.background = '';
                });
                countBadge.addEventListener('click', (e) => {
                    e.stopPropagation();
                    const promptTitle = countBadge.dataset.promptTitle;
                    const promptSource = countBadge.dataset.promptSource;
                    // Remove one instance from bars: prefer selectedBarIndex, then fallback to first match
                    const bar = this.bars[this.selectedBarIndex];
                    let foundIndex = -1;
                    if (bar) {
                        foundIndex = bar.prompts.findIndex(p => p.title === promptTitle && p.folder === promptSource);
                    }
                    if (foundIndex === -1) {
                        // Search all bars
                        for (let bi = 0; bi < this.bars.length; bi++) {
                            foundIndex = this.bars[bi].prompts.findIndex(p => p.title === promptTitle && p.folder === promptSource);
                            if (foundIndex !== -1) {
                                this.removePromptFromBarByIndex(bi, foundIndex);
                                return;
                            }
                        }
                    } else {
                        this.removePromptFromBarByIndex(this.selectedBarIndex, foundIndex);
                    }
                });
            }

            // Feature 1: Right-click on prompt with index info
            wrapper.addEventListener('contextmenu', (e) => {
                e.preventDefault();
                this.showContextMenu(e, wrapper.dataset.source, 'prompt', {
                    title: wrapper.dataset.title,
                    source: wrapper.dataset.source,
                    index: parseInt(wrapper.dataset.index)
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
                    // Update in all bars
                    for (const bar of this.bars) {
                        for (const p of bar.prompts) {
                            if (p.title === promptTitle) {
                                p.title = newTitle;
                                p.content = newContent;
                            }
                        }
                    }
                    this.renderBars();
                    this.updateOutput();
                    
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

    // Feature 1: Add prompt at specific position (above/below)
    async showAddPromptAtPosition(csvPath, index, position) {
        if (!csvPath || csvPath.toLowerCase().endsWith('.csv') === false) {
            alert('请选中csv文件');
            return;
        }

        const folder = csvPath;

        const modal = document.createElement('div');
        modal.className = 'hezl-modal';
        modal.innerHTML = `
            <div class="hezl-modal-content">
                <div class="hezl-modal-header">${position === 'above' ? '在上方添加新词组' : '在下方添加新词组'}</div>
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
                const insertIndex = position === 'above' ? index : index + 1;
                const result = await this.safeFetchJson('/hezl_prompt/add_prompt_at', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({
                        folder: folder,
                        title: newTitle,
                        content: newContent,
                        index: insertIndex
                    })
                });

                if (result.success) {
                    modal.remove();
                    await this.selectFolder(folder, 'csv');
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

    // Feature 1: Batch move CSV phrases to other CSV files (not bars)
    showBatchMoveModal(csvPath) {
        if (!csvPath) return;

        // Get all prompts from this CSV
        const prompts = this.promptsData.filter(p => {
            const source = p.source || this.currentFolder;
            return source === csvPath;
        });

        if (prompts.length === 0) {
            alert('当前CSV文件中没有词组');
            return;
        }

        // Collect all CSV paths from folder structure, excluding current one
        const csvPaths = [];
        const collectCsvs = (node) => {
            if (node.type === 'csv' && node.path !== csvPath) {
                csvPaths.push(node.path);
            }
            if (node.children) {
                node.children.forEach(collectCsvs);
            }
        };
        if (this.folderStructure && this.folderStructure.default) {
            this.folderStructure.default.children.forEach(collectCsvs);
        }

        if (csvPaths.length === 0) {
            alert('没有找到其他CSV文件');
            return;
        }

        const modal = document.createElement('div');
        modal.className = 'hezl-modal';
        modal.innerHTML = `
            <div class="hezl-modal-content" style="max-width: 500px;">
                <div class="hezl-modal-header">批量移动词组到其他CSV文件</div>
                <div class="hezl-form-group">
                    <label class="hezl-form-label">选择目标CSV文件</label>
                    <select class="hezl-form-input" id="hezl-batch-target-csv">
                        ${csvPaths.map(p => `<option value="${this.escapeHtml(p)}">${this.escapeHtml(p)}</option>`).join('')}
                    </select>
                </div>
                <div class="hezl-form-group">
                    <label class="hezl-form-label">选择要移动的词组</label>
                    <div class="hezl-batch-list" id="hezl-batch-prompt-list" style="max-height: 300px; overflow-y: auto; border: 1px solid #444; border-radius: 4px; padding: 8px;">
                        <label style="display: flex; align-items: center; margin-bottom: 6px; cursor: pointer; color: #ccc;">
                            <input type="checkbox" id="hezl-batch-select-all" checked style="margin-right: 8px;"> 全选
                        </label>
                        ${prompts.map((p, i) => `
                            <label style="display: flex; align-items: center; margin-bottom: 4px; cursor: pointer; color: #ddd; font-size: 13px;">
                                <input type="checkbox" class="hezl-batch-prompt-cb" data-index="${i}" checked style="margin-right: 8px;">
                                ${this.escapeHtml(p.title)}
                            </label>
                        `).join('')}
                    </div>
                </div>
                <div class="hezl-modal-actions">
                    <button class="hezl-btn" id="hezl-modal-cancel">取消</button>
                    <button class="hezl-btn success" id="hezl-modal-move">移动</button>
                </div>
            </div>
        `;

        document.body.appendChild(modal);

        // Select all toggle
        const selectAllCb = modal.querySelector('#hezl-batch-select-all');
        const promptCbs = modal.querySelectorAll('.hezl-batch-prompt-cb');
        selectAllCb.addEventListener('change', () => {
            promptCbs.forEach(cb => { cb.checked = selectAllCb.checked; });
        });
        promptCbs.forEach(cb => {
            cb.addEventListener('change', () => {
                selectAllCb.checked = Array.from(promptCbs).every(c => c.checked);
            });
        });

        modal.querySelector('#hezl-modal-cancel').addEventListener('click', () => {
            modal.remove();
        });

        modal.querySelector('#hezl-modal-move').addEventListener('click', async () => {
            const targetCsv = modal.querySelector('#hezl-batch-target-csv').value;
            const selectedIndices = [];
            promptCbs.forEach(cb => {
                if (cb.checked) {
                    selectedIndices.push(parseInt(cb.dataset.index));
                }
            });

            if (selectedIndices.length === 0) {
                alert('请至少选择一个词组');
                return;
            }

            if (!confirm(`确定要将选中的 ${selectedIndices.length} 个词组移动到 ${targetCsv} 吗？`)) {
                return;
            }

            let errorCount = 0;
            for (const idx of selectedIndices) {
                const p = prompts[idx];
                try {
                    // Add to target CSV
                    const addResult = await this.safeFetchJson('/hezl_prompt/add_prompt', {
                        method: 'POST',
                        headers: { 'Content-Type': 'application/json' },
                        body: JSON.stringify({
                            folder: targetCsv,
                            title: p.title,
                            content: p.content
                        })
                    });
                    if (addResult.success) {
                        // Delete from source CSV
                        await this.safeFetchJson('/hezl_prompt/delete_prompt', {
                            method: 'POST',
                            headers: { 'Content-Type': 'application/json' },
                            body: JSON.stringify({
                                folder: csvPath,
                                title: p.title
                            })
                        });
                        // Remove from all bars
                        for (const bar of this.bars) {
                            for (let i = bar.prompts.length - 1; i >= 0; i--) {
                                if (bar.prompts[i].title === p.title && bar.prompts[i].folder === csvPath) {
                                    const pid = bar.prompts[i].id;
                                    bar.prompts.splice(i, 1);
                                    delete bar.weights[pid];
                                    delete bar.disabled[pid];
                                }
                            }
                        }
                    } else {
                        errorCount++;
                    }
                } catch (e) {
                    errorCount++;
                }
            }

            modal.remove();
            if (errorCount > 0) {
                alert(`移动完成，但有 ${errorCount} 个词组移动失败（可能目标CSV已存在同名词组）`);
            }
            this.updateFolderCounts();
            this.renderBars();
            this.renderPromptList();
            this.updateOutput();
            await this.selectFolder(csvPath, 'csv');
        });

        modal.addEventListener('mousedown', (e) => {
            if (!e.target.closest('.hezl-modal-content')) {
                modal.remove();
            }
        });
    }

    bindPromptToolbarEvents() {
        const addBtn = this.container.querySelector('#hezl-prompt-add');
        const batchMoveBtn = this.container.querySelector('#hezl-prompt-batch-move');
        const batchDeleteBtn = this.container.querySelector('#hezl-prompt-batch-delete');

        if (addBtn) {
            addBtn.addEventListener('click', () => {
                this.showAddPromptModal(this.currentFolder);
            });
        }
        if (batchMoveBtn) {
            batchMoveBtn.addEventListener('click', () => {
                this.showBatchMoveModal(this.currentFolder);
            });
        }
        if (batchDeleteBtn) {
            batchDeleteBtn.addEventListener('click', () => {
                this.showBatchDeleteModal(this.currentFolder);
            });
        }
    }

    showBatchDeleteModal(csvPath) {
        if (!csvPath) return;

        const prompts = this.promptsData.filter(p => {
            const source = p.source || this.currentFolder;
            return source === csvPath;
        });

        if (prompts.length === 0) {
            alert('当前CSV文件中没有词组');
            return;
        }

        const modal = document.createElement('div');
        modal.className = 'hezl-modal';
        modal.innerHTML = `
            <div class="hezl-modal-content" style="max-width: 500px;">
                <div class="hezl-modal-header">批量删除词组</div>
                <div class="hezl-form-group">
                    <label class="hezl-form-label">选择要删除的词组</label>
                    <div class="hezl-batch-list" id="hezl-batch-delete-list" style="max-height: 300px; overflow-y: auto; border: 1px solid #444; border-radius: 4px; padding: 8px;">
                        <label style="display: flex; align-items: center; margin-bottom: 6px; cursor: pointer; color: #ccc;">
                            <input type="checkbox" id="hezl-batch-delete-select-all" style="margin-right: 8px;"> 全选
                        </label>
                        ${prompts.map((p, i) => `
                            <label style="display: flex; align-items: center; margin-bottom: 4px; cursor: pointer; color: #ddd; font-size: 13px;">
                                <input type="checkbox" class="hezl-batch-delete-cb" data-index="${i}" style="margin-right: 8px;">
                                ${this.escapeHtml(p.title)}
                            </label>
                        `).join('')}
                    </div>
                </div>
                <div class="hezl-modal-actions">
                    <button class="hezl-btn" id="hezl-modal-cancel">取消</button>
                    <button class="hezl-btn danger" id="hezl-modal-delete">删除选中</button>
                </div>
            </div>
        `;

        document.body.appendChild(modal);

        const selectAllCb = modal.querySelector('#hezl-batch-delete-select-all');
        const promptCbs = modal.querySelectorAll('.hezl-batch-delete-cb');
        selectAllCb.addEventListener('change', () => {
            promptCbs.forEach(cb => { cb.checked = selectAllCb.checked; });
        });
        promptCbs.forEach(cb => {
            cb.addEventListener('change', () => {
                selectAllCb.checked = Array.from(promptCbs).every(c => c.checked);
            });
        });

        modal.querySelector('#hezl-modal-cancel').addEventListener('click', () => {
            modal.remove();
        });

        modal.querySelector('#hezl-modal-delete').addEventListener('click', async () => {
            const selectedIndices = [];
            promptCbs.forEach(cb => {
                if (cb.checked) {
                    selectedIndices.push(parseInt(cb.dataset.index));
                }
            });

            if (selectedIndices.length === 0) {
                alert('请至少选择一个词组');
                return;
            }

            if (!confirm(`确定要删除选中的 ${selectedIndices.length} 个词组吗？此操作不可撤销。`)) {
                return;
            }

            let errorCount = 0;
            for (const idx of selectedIndices) {
                const p = prompts[idx];
                try {
                    await this.safeFetchJson('/hezl_prompt/delete_prompt', {
                        method: 'POST',
                        headers: { 'Content-Type': 'application/json' },
                        body: JSON.stringify({
                            folder: csvPath,
                            title: p.title
                        })
                    });
                    // Remove from all bars
                    for (const bar of this.bars) {
                        for (let i = bar.prompts.length - 1; i >= 0; i--) {
                            if (bar.prompts[i].title === p.title && bar.prompts[i].folder === csvPath) {
                                const pid = bar.prompts[i].id;
                                bar.prompts.splice(i, 1);
                                delete bar.weights[pid];
                                delete bar.disabled[pid];
                            }
                        }
                    }
                } catch (e) {
                    errorCount++;
                }
            }

            modal.remove();
            if (errorCount > 0) {
                alert(`删除完成，但有 ${errorCount} 个词组删除失败`);
            }
            this.updateFolderCounts();
            this.renderBars();
            this.updateOutput();
            await this.selectFolder(csvPath, 'csv');
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
        const targetBarIndex = this.selectedBarIndex;

        // Always add to the selected bar (allow duplicates)
        const id = this._nextPromptId++;
        const newPrompt = {
            id: id,
            title: prompt.title,
            content: prompt.content,
            folder: source
        };
        this.bars[targetBarIndex].prompts.push(newPrompt);
        this.bars[targetBarIndex].weights[id] = 1.0;
        this.bars[targetBarIndex].disabled[id] = false;

        this.updateFolderCounts();
        this.renderPromptList();
        this.renderBars();
        this.updateOutput();
    }

    // Count how many times a prompt title appears across all bars
    getPromptCountInBars(promptTitle) {
        let count = 0;
        for (const bar of this.bars) {
            for (const p of bar.prompts) {
                if (p.title === promptTitle) count++;
            }
        }
        return count;
    }

    updateFolderCounts() {
        this.folderSelectedCounts = {};

        for (const bar of this.bars) {
            for (const prompt of bar.prompts) {
                const folder = prompt.folder || '';
                if (folder) {
                    this.folderSelectedCounts[folder] = (this.folderSelectedCounts[folder] || 0) + 1;
                }
            }
        }

        this.renderFolderTree();
    }
    
    syncSelectionState() {
        this.updateFolderCounts();
        this.renderBars();
        this.updateOutput();

        if (this.promptsData.length > 0) {
            this.renderPromptList();
        }
    }

    async deletePrompt(promptTitle, promptSource) {
        if (!promptTitle || !promptSource) return;
        if (!confirm('确定删除该词组吗?')) {
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

                // Remove from all bars
                for (const bar of this.bars) {
                    for (let i = bar.prompts.length - 1; i >= 0; i--) {
                        if (bar.prompts[i].title === promptTitle && bar.prompts[i].folder === promptSource) {
                            const pid = bar.prompts[i].id;
                            bar.prompts.splice(i, 1);
                            delete bar.weights[pid];
                            delete bar.disabled[pid];
                        }
                    }
                }

                this.updateFolderCounts();
                this.renderPromptList();
                this.renderBars();
                this.updateOutput();
            } else {
                alert('删除失败: ' + result.error);
            }
        } catch (error) {
            alert('删除失败: ' + error.message);
        }
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
                    bars: this.bars
                });
            }
        }
    }

    // Feature 5: Dynamic output slots
    updateNodeOutputs() {
        if (!this.node) return;
        const barCount = this.bars.length;
        // Total outputs: 1 (输出全部) + barCount (词组栏01, 02, ...)
        const outputCount = 1 + barCount;

        // Update node output types and names
        const returnTypes = [];
        const returnNames = [];
        returnTypes.push("STRING");
        returnNames.push("输出全部");
        for (let i = 0; i < barCount; i++) {
            returnTypes.push("STRING");
            returnNames.push(this.getBarLabel(i));
        }

        this.node.constructor.RETURN_TYPES = returnTypes;
        this.node.constructor.RETURN_NAMES = returnNames;

        // Update the node's outputs on the graph
        if (this.node.outputs) {
            // Remove extra outputs
            while (this.node.outputs.length > outputCount) {
                this.node.outputs.pop();
            }
            // Add missing outputs
            while (this.node.outputs.length < outputCount) {
                this.node.addOutput(returnNames[this.node.outputs.length], "STRING");
            }
            // Update names, labels, and types
            for (let i = 0; i < outputCount; i++) {
                this.node.outputs[i].name = returnNames[i];
                this.node.outputs[i].label = returnNames[i];
                this.node.outputs[i].type = "STRING";
            }
        }

        // Update the node definition for serialization
        const origNodeData = this.node.constructor.nodeData;
        if (origNodeData) {
            origNodeData.output = returnTypes;
            origNodeData.output_name = returnNames;
        }

        // Force re-render and recalculate node size after output changes
        if (this.node.setSize) {
            this.node.setSize(this.node.size);
        }
        if (this.node.graph) {
            this.node.graph.setDirtyCanvas(true, true);
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
        
        const promptsToRemove = [];
        for (const bar of this.bars) {
            for (const p of bar.prompts) {
                if (csvPaths.includes(p.folder) || p.folder === folderPath) {
                    promptsToRemove.push(p);
                }
            }
        }

        if (promptsToRemove.length === 0) return;

        if (confirm(`确定要取消选择此文件夹中的 ${promptsToRemove.length} 个词组吗？`)) {
            for (const bar of this.bars) {
                const idsToRemove = new Set();
                bar.prompts = bar.prompts.filter(p => {
                    if (csvPaths.includes(p.folder) || p.folder === folderPath) {
                        idsToRemove.add(p.id);
                        return false;
                    }
                    return true;
                });
                for (const pid of idsToRemove) {
                    delete bar.weights[pid];
                    delete bar.disabled[pid];
                }
            }

            this.updateFolderCounts();
            this.renderPromptList();
            this.renderBars();
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
                    for (const bar of this.bars) {
                        bar.prompts.forEach(p => {
                            if (p.folder === path) {
                                p.folder = newPath;
                            }
                        });
                    }
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
                for (const bar of this.bars) {
                    const idsToRemove = new Set();
                    bar.prompts = bar.prompts.filter(p => {
                        if (p.folder === csvPath) {
                            idsToRemove.add(p.id);
                            return false;
                        }
                        return true;
                    });
                    for (const pid of idsToRemove) {
                        delete bar.weights[pid];
                        delete bar.disabled[pid];
                    }
                }
                this.updateFolderCounts();
                this.renderBars();
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
                for (const bar of this.bars) {
                    const idsToRemove = new Set();
                    bar.prompts = bar.prompts.filter(p => {
                        if (p.folder === folderPath ||
                            p.folder.startsWith(folderPath + '/') ||
                            p.folder.startsWith(folderPath + '\\')) {
                            idsToRemove.add(p.id);
                            return false;
                        }
                        return true;
                    });
                    for (const pid of idsToRemove) {
                        delete bar.weights[pid];
                        delete bar.disabled[pid];
                    }
                }
                this.updateFolderCounts();
                this.renderBars();
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
                            bars: hezlWidget.bars
                        });
                    },
                    setValue: (value) => {
                        try {
                            const data = JSON.parse(value);
                            if (data.bars && Array.isArray(data.bars)) {
                                hezlWidget.bars = data.bars;
                            } else if (data.prompts) {
                                // Legacy format - convert to single bar
                                hezlWidget.bars = [{
                                    name: '',
                                    prompts: data.prompts || [],
                                    weights: data.weights || {},
                                    disabled: data.disabled || {}
                                }];
                            }
                            // Ensure all prompts have unique ids
                            for (const bar of hezlWidget.bars) {
                                if (!bar.name) bar.name = '';
                                for (const p of bar.prompts) {
                                    if (!p.id) {
                                        p.id = hezlWidget._nextPromptId++;
                                    }
                                }
                                // Convert title-based weights/disabled keys to id-based
                                const newWeights = {};
                                const newDisabled = {};
                                for (const p of bar.prompts) {
                                    const pid = p.id;
                                    newWeights[pid] = bar.weights[pid] !== undefined ? bar.weights[pid] : (bar.weights[p.title] !== undefined ? bar.weights[p.title] : 1.0);
                                    newDisabled[pid] = bar.disabled[pid] !== undefined ? bar.disabled[pid] : (bar.disabled[p.title] !== undefined ? bar.disabled[p.title] : false);
                                }
                                bar.weights = newWeights;
                                bar.disabled = newDisabled;
                            }
                            hezlWidget.syncSelectionState();
                            hezlWidget.updateNodeOutputs();
                        } catch (e) {}
                    }
                });
                
                return result;
            };
        }
    }
});
