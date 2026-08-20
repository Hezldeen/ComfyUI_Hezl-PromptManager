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
    min-height: 0;
    box-sizing: border-box;
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

/* 词组单词选取按钮 "." */
.hezl-word-select-btn {
    width: 14px;
    height: 14px;
    border: none;
    border-radius: 2px;
    background: rgba(255, 255, 255, 0.12);
    color: #ddd;
    cursor: pointer;
    font-size: 12px;
    font-weight: bold;
    line-height: 1;
    margin: 0 4px;
    order: 1;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 0;
    transition: background 0.15s, transform 0.1s;
}

.hezl-word-select-btn:hover {
    background: rgba(255, 255, 255, 0.28);
}

.hezl-word-select-btn:active {
    transform: scale(0.9);
}

/* 有禁用单词时按钮变黄提示 */
.hezl-word-select-btn.has-disabled-words {
    background: #f1c40f;
    color: #1a1a1a;
}

.hezl-word-select-btn.has-disabled-words:hover {
    background: #d4ac0d;
}

/* 单词列表项 */
.hezl-word-list {
    max-height: 50vh;
    overflow-y: auto;
    margin-bottom: 12px;
    border: 1px solid #444;
    border-radius: 4px;
    padding: 6px;
    background: #1a1a1a;
}

.hezl-word-item {
    display: flex;
    align-items: center;
    gap: 8px;
    padding: 4px 6px;
    border-radius: 3px;
    cursor: pointer;
    font-size: 13px;
}

.hezl-word-item:hover {
    background: #333;
}

.hezl-word-item input[type="checkbox"] {
    cursor: pointer;
}

.hezl-word-text {
    flex: 1;
    min-width: 0;
    word-break: break-all;
}

.hezl-word-copy-btn {
    flex-shrink: 0;
    background: none;
    border: 1px solid #555;
    color: #aaa;
    cursor: pointer;
    font-size: 12px;
    line-height: 1;
    padding: 2px 4px;
    border-radius: 3px;
}

.hezl-word-copy-btn:hover {
    color: #fff;
    border-color: #27ae60;
}

.hezl-word-copy-btn.copied {
    color: #27ae60;
    border-color: #27ae60;
}

.hezl-word-item.disabled-word {
    color: #e74c3c;
    text-decoration: line-through;
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

/* "单独输出" button active state: yellow (matches the solo border color) */
.hezl-btn.solo-btn-on {
    background: #f1c40f;
    color: #1a1a1a;
}

.hezl-btn.solo-btn-on:hover {
    background: #d4ac0d;
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

/* 轻量下拉小弹窗(锚定到触发元素) */
.hezl-popover {
    position: fixed;
    background: #2a2a2a;
    border: 1px solid #555;
    border-radius: 6px;
    padding: 10px;
    z-index: 10001;
    box-shadow: 0 6px 20px rgba(0,0,0,0.6);
    min-width: 200px;
    max-width: 340px;
    max-height: 70vh;
    overflow-y: auto;
    color: #ddd;
    font-size: 13px;
}

/* 编辑/新建词组 表单弹窗: 更大默认尺寸 + 可拖拽边界调整大小 + 文本框跟随窗口 */
.hezl-popover.hezl-popover-form {
    width: 480px;
    height: 420px;
    min-width: 320px;
    min-height: 240px;
    max-width: calc(100vw - 24px);
    max-height: calc(100vh - 24px);
    display: flex;
    flex-direction: column;
    box-sizing: border-box;
    padding: 12px;
    overflow: visible;
}
.hezl-popover-form > .hezl-popover-header {
    flex: none;
}
.hezl-popover-form > .hezl-form-group {
    flex: none;
    margin-bottom: 10px;
}
.hezl-popover-form > .hezl-form-group.hezl-form-group-content {
    flex: 1 1 auto;
    min-height: 0;
    display: flex;
    flex-direction: column;
}
.hezl-popover-form > .hezl-form-group.hezl-form-group-content .hezl-form-textarea {
    flex: 1 1 auto;
    min-height: 0;
    width: 100%;
    box-sizing: border-box;
    resize: none;
    font-family: inherit;
}
.hezl-popover-form > .hezl-popover-actions {
    flex: none;
    padding-top: 6px;
}
/* 调整大小的拖拽手柄(右边缘/下边缘/右下角) */
.hezl-popover-resize-e,
.hezl-popover-resize-s,
.hezl-popover-resize-se {
    position: absolute;
    z-index: 20;
}
.hezl-popover-resize-e {
    top: 0;
    right: -3px;
    bottom: 0;
    width: 8px;
    cursor: ew-resize;
}
.hezl-popover-resize-s {
    left: 0;
    right: 0;
    bottom: -3px;
    height: 8px;
    cursor: ns-resize;
}
.hezl-popover-resize-se {
    right: -4px;
    bottom: -4px;
    width: 16px;
    height: 16px;
    cursor: nwse-resize;
    background: linear-gradient(135deg, transparent 55%, #888 55%);
    border-radius: 0 0 6px 0;
}

.hezl-popover-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 8px;
    font-weight: bold;
    color: #eee;
}

.hezl-popover-close {
    background: none;
    border: none;
    color: #aaa;
    cursor: pointer;
    font-size: 16px;
    line-height: 1;
    padding: 0 4px;
}

.hezl-popover-close:hover {
    color: #fff;
}

.hezl-popover-toolbar {
    display: flex;
    gap: 6px;
    margin-bottom: 8px;
}

.hezl-popover-actions {
    display: flex;
    gap: 6px;
    margin-top: 10px;
    justify-content: flex-end;
}

.hezl-popover .hezl-form-input,
.hezl-popover .hezl-form-textarea {
    box-sizing: border-box;
}

.hezl-popover .hezl-form-textarea {
    width: 100%;
    min-height: 64px;
    resize: vertical;
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
    flex-direction: column;
    gap: 4px;
    position: sticky;
    top: 0;
    background: #1a1a1a;
    z-index: 2;
}

.hezl-sidebar-row {
    display: flex;
    align-items: center;
    gap: 2px;
}

.hezl-sidebar-actions {
    display: flex;
    gap: 2px;
}

.hezl-section-title::after {
    content: '';
    display: block;
    height: 1px;
    background: #333;
    margin: 4px -6px 0;
}

.hezl-search-input {
    width: 100%;
    min-width: 0;
    padding: 3px 6px;
    font-size: 11px;
    border: 1px solid #444;
    border-radius: 3px;
    background: #111;
    color: #ddd;
    outline: none;
}

.hezl-search-input:focus {
    border-color: #27ae60;
}

.hezl-search-input::placeholder {
    color: #666;
}

.hezl-sidebar-actions .hezl-btn {
    padding: 2px 5px;
    font-size: 10px;
    background: rgb(26, 26, 26);
}

/* Search highlight in filtered folder tree */
.hezl-folder-item.search-match > .hezl-folder-name {
    color: #f1c40f;
    font-weight: 600;
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
    border-color: rgb(39, 174, 96);
    background: rgb(39, 174, 96);
    box-shadow: 0 0 0 1px rgba(39, 174, 96, 0.6);
}

.hezl-prompt-item-wrapper.selected .hezl-prompt-title {
    background: rgb(39, 174, 96);
    color: #fff;
}

.hezl-prompt-item-wrapper.search-match {
    border: 1px solid #f1c40f;
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

/* Bar rename button: 继承 .hezl-btn.small 的尺寸,仅保留独有样式 */
.hezl-bar-rename-btn {
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

/* 头部按钮组:用细竖线分割不同功能组(名称+编辑 | 预设 | 启停开关) */
.hezl-bar-sep {
    width: 1px;
    height: 16px;
    background: #444;
    margin: 0 4px;
    flex-shrink: 0;
}

/* 图标按钮:正方形小按钮,容纳单个 emoji 图标 */
.hezl-icon-btn {
    flex-shrink: 0;
    min-width: 22px;
    height: 22px;
    padding: 2px 5px;
    line-height: 1;
    font-size: 12px;
    border-radius: 3px;
    border: none;
    cursor: pointer;
    color: #fff;
    background: #3498db;
    transition: background 0.15s, filter 0.15s;
}
.hezl-icon-btn:hover { background: #2980b9; }
.hezl-icon-btn.danger { background: #e74c3c; }
.hezl-icon-btn.danger:hover { background: #c0392b; }
.hezl-icon-btn.success { background: #27ae60; }
.hezl-icon-btn.success:hover { background: #219a52; }
.hezl-icon-btn.warning { background: #f39c12; }
.hezl-icon-btn.warning:hover { background: #d68910; }
.hezl-icon-btn.solo-btn-on { background: #f1c40f; color: #1a1a1a; }
.hezl-icon-btn.solo-btn-on:hover { background: #d4ac0d; }

/* 预设下拉 <select> */
.hezl-preset-select {
    height: 22px;
    width: 140px;
    font-size: 10px;
    background: #1a1a1a;
    color: #ddd;
    border: 1px solid #3a3a3a;
    border-radius: 3px;
    padding: 0 4px;
    cursor: pointer;
    box-sizing: border-box;
    outline: none;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
}
.hezl-preset-select:hover { border-color: #3498db; }
.hezl-preset-select:focus { border-color: #3498db; }

/* Selected bar: 绿色,始终 2px */
.hezl-bar-section.selected-bar {
    border: 2px solid #27ae60;
}

/* Bar drag-to-reorder */
.hezl-bar-section.dragging {
    opacity: 0.5;
}

.hezl-bar-section.insert-before {
    border-top: 3px solid #27ae60;
}

.hezl-bar-section.insert-after {
    border-bottom: 3px solid #27ae60;
}

.hezl-bar-header[draggable="true"] {
    cursor: grab;
}

.hezl-bar-header[draggable="true"]:active {
    cursor: grabbing;
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

/* 单独输出 (solo): yellow border. 默认 1px,选中状态(selected-bar)时 2px.
   CSS 顺序: selected-bar(绿) < solo-active(黄) < disabled-active(红). */
.hezl-bar-section.solo-active {
    border: 1px solid #f1c40f;
}
.hezl-bar-section.solo-active.selected-bar {
    border: 2px solid #f1c40f;
}

/* 禁用 (disabled): red border. 优先级最高,覆盖绿色(选中)和黄色(单独输出).
   默认 1px,选中状态(selected-bar)时 2px. */
.hezl-bar-section.disabled-active {
    border: 1px solid #e74c3c;
}
.hezl-bar-section.disabled-active.selected-bar {
    border: 2px solid #e74c3c;
}

/* Two add buttons row at the bottom (文本框 / 词组栏) */
.hezl-add-bar-row {
    display: flex;
    gap: 6px;
    margin-top: 4px;
}

.hezl-add-bar-row .hezl-add-bar-btn {
    flex: 1;
    margin-top: 0;
}

/* Textbox item: full-width textarea */
.hezl-textbox-zone {
    padding: 6px;
    background: #1a1a1a;
}

.hezl-textbox-input {
    width: 100%;
    min-height: 48px;
    box-sizing: border-box;
    background: #222;
    color: #e6ffe6;
    border: 1px solid #3a3a3a;
    border-radius: 4px;
    padding: 6px 8px;
    font-size: 12px;
    font-family: Arial, sans-serif;
    resize: vertical;
    outline: none;
}

.hezl-textbox-input:focus {
    border-color: #3498db;
}

/* 同名输入接口已连接(接收外部字符): 仅 textarea 边框变红, 整个文本框 bar 不变红.
   整个文本框 bar 变红仅在该文本框被手动禁用时(由 .disabled-active 控制). */
.hezl-textbox-input.connected-input {
    border-color: #e74c3c;
    background: #2a1a1a;
}
`;

class HezlPromptWidget {
    constructor(node, inputName, inputData, app) {
        this.node = node;
        this.app = app;
        // Unified ordered list of items. Each item has a `type`:
        //   - 'bar'     : 词组栏 (prompts / weights / disabled / separators)
        //   - 'textbox' : 文本框 (manually typed `text`, optional STRING input)
        // Every item also carries `solo` (单独输出 switch) and a `name`.
        this.items = [
            this._makeBar()
        ];
        this._barCounter = 1;   // used to generate default bar names
        this._boxCounter = 0;   // used to generate default textbox names
        this.selectedItemIndex = 0;
        this._nextPromptId = 1;
        this.folderStructure = null;
        this.currentFolder = "";
        this.promptsData = [];
        this.folderSelectedCounts = {};
        this.expandedFolders = new Set();
        this.hoverPreview = null;
        this.contextMenu = null;
        this.searchKeyword = "";
        this.searchMatches = null; // Set of matching CSV relative paths, null means no active search
        // 预设列表缓存: renderBars 同步阶段直接用此缓存渲染下拉选项, 避免每次渲染都异步
        // 拉 /list_presets 导致下拉框在 toggle/开关单词等操作时闪烁回占位项.
        // 仅在 init / 保存 / 重命名 / 删除预设时通过 refreshAllPresetDropdowns 刷新.
        this._cachedPresets = [];

        this.injectStyles();
        this.createWidget();
        // Render the default item(s) so they are visible on first launch
        this.renderItems();
        // Sync the node's output slots (only solo items get dedicated outputs)
        this.updateNodeOutputs();
        // Sync the node's input slots ("输入全部替换" + textbox inputs)
        this.updateNodeInputs();
        this.loadFolderStructure();
        // 初始化时拉取一次预设列表填充缓存(异步), 之后的 renderBars 同步渲染选项.
        this.refreshAllPresetDropdowns();
    }

    // ---------- item factory helpers ----------
    _makeBar(name) {
        this._barCounter += 0;
        return {
            type: 'bar',
            name: name || `词组栏${String(this._barCounter).padStart(2, '0')}`,
            prompts: [],
            weights: {},
            disabled: {},
            disabledWords: {}, // {promptId: [被禁用的单词,...]} 默认空(全开启)
            prompt_separator: ', ',
            bar_separator: ', ',
            solo: false,
            appliedPreset: '' // 当前已加载的预设名(仅用于下拉显示);空字符串表示未加载
        };
    }

    _makeTextbox(name) {
        this._boxCounter += 1;
        return {
            type: 'textbox',
            name: name || `文本框${String(this._boxCounter).padStart(2, '0')}`,
            text: '',
            bar_separator: ', ',
            solo: false,
            disabled: false
        };
    }

    // Backwards-compatible alias: treat the flat items list as "bars" for the
    // many helper methods that iterate this.bars. Exposing it as a getter keeps
    // those methods working while the real source of truth is this.items.
    get bars() {
        return this.items;
    }
    set bars(v) {
        this.items = v;
    }
    get selectedBarIndex() {
        return this.selectedItemIndex;
    }
    set selectedBarIndex(v) {
        this.selectedItemIndex = v;
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
                        <div class="hezl-sidebar-row">
                            <input type="text" class="hezl-search-input" id="hezl-search-input" placeholder="搜索词组..." title="输入关键词实时筛选(匹配标题或内容)">
                        </div>
                        <div class="hezl-sidebar-row">
                            <div class="hezl-sidebar-actions">
                                <button class="hezl-btn small" id="hezl-refresh" title="刷新">🔄</button>
                                <button class="hezl-btn small" id="hezl-expand-all" title="展开全部">⏬️</button>
                                <button class="hezl-btn small" id="hezl-collapse-all" title="收起全部">⏏️</button>
                                <button class="hezl-btn small" id="hezl-add-root-folder" title="在根目录csv文件夹下创建文件夹">+📁</button>
                            </div>
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
                <div class="hezl-add-bar-row">
                    <button class="hezl-add-bar-btn" id="hezl-add-textbox" title="添加文本框">＋ 文本框</button>
                    <button class="hezl-add-bar-btn" id="hezl-add-bar" title="添加词组栏">＋ 词组栏</button>
                </div>
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

        // 搜索输入栏: 输入即实时筛选词组(匹配标题或内容),清空则恢复全部
        const searchInput = this.container.querySelector('#hezl-search-input');
        if (searchInput) {
            let searchTimer = null;
            searchInput.addEventListener('input', () => {
                clearTimeout(searchTimer);
                const val = searchInput.value;
                searchTimer = setTimeout(() => {
                    this._applySearch(val);
                }, 300);
            });
            searchInput.addEventListener('keydown', (e) => {
                if (e.key === 'Escape') {
                    searchInput.value = '';
                    this._applySearch('');
                    searchInput.blur();
                }
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

        // Feature 4: Add bar / add textbox buttons
        const addBarBtn = this.container.querySelector('#hezl-add-bar');
        if (addBarBtn) {
            addBarBtn.addEventListener('click', () => {
                this.addBar();
            });
        }
        const addTextboxBtn = this.container.querySelector('#hezl-add-textbox');
        if (addTextboxBtn) {
            addTextboxBtn.addEventListener('click', () => {
                this.addTextbox();
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
                // 同水平分隔条: 用 offsetWidth (CSS 像素) 并按画布缩放系数换算鼠标位移,
                // 避免 ComfyUI 画布缩放导致分隔条偏移/无法跟随鼠标.
                const startWidth = this.sidebar.offsetWidth;
                const splitterWidth = this.verticalSplitter.offsetWidth;
                const containerW = this.container.offsetWidth;
                const rect = this.container.getBoundingClientRect();
                const scale = (rect.width > 0 && containerW > 0) ? (rect.width / containerW) : 1;
                const maxWidth = containerW - minRight - splitterWidth;
            const onMove = (moveEvent) => {
                const deltaCss = (moveEvent.clientX - startX) / scale;
                let newWidth = startWidth + deltaCss;
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
            // 不设最低高度限制,允许水平分隔条拖动到任意位置.
            const minBottom = 0;
            const minTop = 0;
            this.horizontalSplitter.addEventListener('mousedown', (e) => {
                e.preventDefault();
                const startY = e.clientY;
                // 关键: ComfyUI 画布有缩放, 节点 DOM 被 CSS transform 缩放.
                // getBoundingClientRect() 返回视口坐标(含缩放), 而 flex-basis 是 CSS 未缩放像素.
                // 必须用 offsetHeight (CSS 像素) 并把鼠标视口位移除以缩放系数, 否则会出现
                // 抓取瞬间跳变 + 移动速率与缩放成正比的偏移(非 100% 缩放时分隔条无法跟随鼠标).
                const startBottom = this.bottomPanel.offsetHeight;          // CSS 像素
                const splitterHeight = this.horizontalSplitter.offsetHeight; // CSS 像素
                const containerH = this.container.offsetHeight;             // CSS 像素
                const rect = this.container.getBoundingClientRect();
                const scale = (rect.height > 0 && containerH > 0) ? (rect.height / containerH) : 1;
                const maxBottom = containerH - minTop - splitterHeight;
            const onMove = (moveEvent) => {
                const deltaCss = (moveEvent.clientY - startY) / scale; // 视口位移 → CSS 位移
                let newBottom = startBottom - deltaCss;
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

    // 将弹窗内容定位到当前节点所在区域的中心(而非整个屏幕中心).
    // 在 document.body.appendChild(modal) 之后调用.
    _positionModalOverNode(modal) {
        const apply = () => {
            if (!modal || !modal.isConnected || !this.container) return;
            const rect = this.container.getBoundingClientRect();
            // 节点不可见时,保持默认的屏幕居中(由 flex 实现)
            if (!rect.width || !rect.height) return;
            const content = modal.querySelector('.hezl-modal-content');
            if (!content) return;
            let cx = rect.left + rect.width / 2;
            let cy = rect.top + rect.height / 2;
            const cw = content.offsetWidth || 440;
            const ch = content.offsetHeight || 240;
            // 钳制到视口范围内,避免弹窗超出屏幕
            cx = Math.max(cw / 2 + 8, Math.min(cx, window.innerWidth - cw / 2 - 8));
            cy = Math.max(ch / 2 + 8, Math.min(cy, window.innerHeight - ch / 2 - 8));
            // 用 fixed 定位: 始终相对视口,不受祖先 transform 影响
            content.style.position = 'fixed';
            content.style.left = cx + 'px';
            content.style.top = cy + 'px';
            content.style.transform = 'translate(-50%, -50%)';
            content.style.margin = '0';
        };
        apply();
        // 布局完成后再校正一次,避免初始测量不准
        requestAnimationFrame(apply);
    }

    // 在锚点元素(或坐标 [x,y])附近弹出轻量下拉小窗口,返回该 popover 元素.
    // extraClass: 附加样式类,传 'hezl-popover-form' 可使表单弹窗支持拖拽边界调整大小.
    _showPopover(anchor, innerHTML, extraClass = '') {
        this._closePopover();
        const popover = document.createElement('div');
        popover.className = 'hezl-popover' + (extraClass ? ' ' + extraClass : '');
        popover.innerHTML = innerHTML;
        document.body.appendChild(popover);

        // 计算锚点位置
        let rect;
        if (anchor && typeof anchor.getBoundingClientRect === 'function') {
            rect = anchor.getBoundingClientRect();
        } else if (Array.isArray(anchor)) {
            rect = { left: anchor[0], top: anchor[1], width: 0, height: 0, right: anchor[0], bottom: anchor[1] };
        } else {
            rect = { left: window.innerWidth / 2, top: window.innerHeight / 2, width: 0, height: 0, right: 0, bottom: 0 };
        }
        const place = () => {
            const pr = popover.getBoundingClientRect();
            let left = rect.left;
            let top = rect.bottom + 4;
            if (left + pr.width > window.innerWidth - 8) left = window.innerWidth - pr.width - 8;
            if (left < 8) left = 8;
            if (top + pr.height > window.innerHeight - 8) {
                const above = rect.top - pr.height - 4;
                top = above > 8 ? above : Math.max(8, window.innerHeight - pr.height - 8);
            }
            popover.style.left = left + 'px';
            popover.style.top = top + 'px';
        };
        place();
        requestAnimationFrame(place);

        this._activePopover = popover;
        // 点击外部关闭(下一帧绑定,避免触发本次点击)
        setTimeout(() => {
            this._popoverOutsideHandler = (e) => {
                if (this._activePopover && !this._activePopover.contains(e.target)) {
                    this._closePopover();
                }
            };
            document.addEventListener('mousedown', this._popoverOutsideHandler, true);
        }, 0);

        // 顶部可拖拽移动整个小弹窗
        const header = popover.querySelector('.hezl-popover-header');
        if (header) {
            header.style.cursor = 'move';
            header.addEventListener('mousedown', (e) => {
                if (e.button !== 0) return;
                if (e.target.closest('.hezl-popover-close')) return; // 关闭按钮不触发拖拽
                e.preventDefault();
                const startX = e.clientX;
                const startY = e.clientY;
                const pr = popover.getBoundingClientRect();
                const origLeft = pr.left;
                const origTop = pr.top;
                popover.style.userSelect = 'none';
                const onMove = (ev) => {
                    let nl = origLeft + (ev.clientX - startX);
                    let nt = origTop + (ev.clientY - startY);
                    nl = Math.max(0, Math.min(nl, window.innerWidth - popover.offsetWidth));
                    nt = Math.max(0, Math.min(nt, window.innerHeight - popover.offsetHeight));
                    popover.style.left = nl + 'px';
                    popover.style.top = nt + 'px';
                };
                const onUp = () => {
                    popover.style.userSelect = '';
                    document.removeEventListener('mousemove', onMove);
                    document.removeEventListener('mouseup', onUp);
                };
                document.addEventListener('mousemove', onMove);
                document.addEventListener('mouseup', onUp);
            });
        }

        // 表单弹窗: 支持拖拽边界(右边缘/下边缘/右下角)调整大小
        if (extraClass && extraClass.includes('hezl-popover-form')) {
            const MIN_W = 320;
            const MIN_H = 240;
            const mkHandle = (cls, dir) => {
                const h = document.createElement('div');
                h.className = cls;
                h.dataset.dir = dir;
                popover.appendChild(h);
                h.addEventListener('mousedown', (e) => {
                    if (e.button !== 0) return;
                    e.preventDefault();
                    e.stopPropagation();
                    const startX = e.clientX;
                    const startY = e.clientY;
                    const pr = popover.getBoundingClientRect();
                    const origW = pr.width;
                    const origH = pr.height;
                    popover.style.userSelect = 'none';
                    const onMove = (ev) => {
                        const mode = h.dataset.dir;
                        const maxW = Math.max(MIN_W, window.innerWidth - popover.offsetLeft - 8);
                        const maxH = Math.max(MIN_H, window.innerHeight - popover.offsetTop - 8);
                        if (mode === 'e' || mode === 'se') {
                            popover.style.width = Math.max(MIN_W, Math.min(origW + (ev.clientX - startX), maxW)) + 'px';
                        }
                        if (mode === 's' || mode === 'se') {
                            popover.style.height = Math.max(MIN_H, Math.min(origH + (ev.clientY - startY), maxH)) + 'px';
                        }
                    };
                    const onUp = () => {
                        popover.style.userSelect = '';
                        document.removeEventListener('mousemove', onMove);
                        document.removeEventListener('mouseup', onUp);
                    };
                    document.addEventListener('mousemove', onMove);
                    document.addEventListener('mouseup', onUp);
                });
            };
            mkHandle('hezl-popover-resize-e', 'e');
            mkHandle('hezl-popover-resize-s', 's');
            mkHandle('hezl-popover-resize-se', 'se');
        }
        return popover;
    }

    _closePopover() {
        if (this._popoverOutsideHandler) {
            document.removeEventListener('mousedown', this._popoverOutsideHandler, true);
            this._popoverOutsideHandler = null;
        }
        if (this._activePopover) {
            this._activePopover.remove();
            this._activePopover = null;
        }
    }

    async loadFolderStructure() {
        try {
            this.folderStructure = await this.safeFetchJson('/hezl_prompt/get_structure');
            // Re-apply active search after refreshing structure
            if (this.searchKeyword) {
                await this._applySearch(this.searchKeyword);
            } else {
                this.searchMatches = null;
                this.renderFolderTree();
            }
            if (this.getTotalSelectedCount() > 0) {
                this.updateFolderCounts();
            }
        } catch (error) {
            console.error('Failed to load folder structure:', error);
        }
    }

    async _applySearch(keyword) {
        const trimmed = keyword.trim();
        if (!trimmed) {
            this.searchKeyword = "";
            this.searchMatches = null;
            this.renderFolderTree();
            return;
        }
        try {
            const result = await this.safeFetchJson(`/hezl_prompt/search_prompts?keyword=${encodeURIComponent(trimmed)}`);
            this.searchKeyword = trimmed;
            // Normalize paths to forward slashes so they match the tree paths on Windows
            this.searchMatches = new Set((result.matches || []).map(p => p.replace(/\\/g, '/')));
            // Auto-expand all folders when filtering so matches are visible
            this._expandAllFromStructure();
            this.renderFolderTree();
        } catch (error) {
            console.error('Failed to search prompts:', error);
            alert('搜索失败: ' + error.message);
        }
    }

    _expandAllFromStructure() {
        const walk = (nodes) => {
            for (const node of nodes || []) {
                if (node.type === 'folder') {
                    this.expandedFolders.add(node.path);
                    walk(node.children);
                }
            }
        };
        if (this.folderStructure && this.folderStructure.default) {
            walk(this.folderStructure.default.children);
        }
    }
    
    // ==================== Multi-item management ====================

    addBar() {
        if (this.items.length >= 20) {
            alert('最多支持20个条目');
            return;
        }
        this._barCounter = Math.max(this._barCounter, this._countType('bar'));
        this._barCounter += 1;
        const item = this._makeBar();
        const newIndex = this.items.length;
        this.items.push(item);
        this.selectedBarIndex = newIndex;
        this.renderItems();
        this.updateOutput();
        this.updateNodeOutputs();
    }

    addTextbox() {
        if (this.items.length >= 20) {
            alert('最多支持20个条目');
            return;
        }
        this._boxCounter = Math.max(this._boxCounter, this._countType('textbox'));
        const item = this._makeTextbox();
        const newIndex = this.items.length;
        this.items.push(item);
        this.selectedBarIndex = newIndex;
        this.renderItems();
        this.updateOutput();
        this.updateNodeInputs();
    }

    _countType(type) {
        let n = 0;
        for (const it of this.items) if (it.type === type) n++;
        return n;
    }

    removeBar(barIndex) {
        if (this.items.length <= 1) {
            alert('至少需要保留一个条目');
            return;
        }
        if (confirm('确定要移除此条目吗？')) {
            const removed = this.items[barIndex];
            this.items.splice(barIndex, 1);
            // Adjust selectedBarIndex
            if (this.selectedBarIndex >= this.items.length) {
                this.selectedBarIndex = this.items.length - 1;
            } else if (this.selectedBarIndex > barIndex) {
                this.selectedBarIndex--;
            } else if (this.selectedBarIndex === barIndex) {
                this.selectedBarIndex = Math.min(barIndex, this.items.length - 1);
            }
            this.renderItems();
            this.updateOutput();
            this.updateNodeOutputs();
            this.updateNodeInputs();
            this.renderPromptList(); // Update count badges
        }
    }

    moveBar(fromIndex, toIndex) {
        if (fromIndex === toIndex) return;
        const bar = this.items.splice(fromIndex, 1)[0];
        this.items.splice(toIndex, 0, bar);
        // Update selectedBarIndex to follow the moved bar
        this.selectedBarIndex = toIndex;
        this.renderItems();
        this.updateOutput();
        this.updateNodeOutputs();
        this.updateNodeInputs();
    }

    // Toggle the "单独输出" (solo) switch on an item.
    toggleSolo(itemIndex) {
        const item = this.items[itemIndex];
        if (!item) return;
        item.solo = !item.solo;
        this.renderItems();
        this.updateOutput();
        this.updateNodeOutputs();
    }

    getBarLabel(index) {
        const bar = this.items[index];
        if (bar && bar.name) {
            return bar.name;
        }
        return `条目${String(index + 1).padStart(2, '0')}`;
    }

    renameBar(barIndex, labelEl) {
        const bar = this.items[barIndex];
        if (!bar) return;
        const currentName = bar.name || `条目${String(barIndex + 1).padStart(2, '0')}`;

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
            const newName = (input.value || '').trim() || currentName;
            bar.name = newName;
            input.remove();
            labelEl.style.display = '';
            labelEl.textContent = this.getBarLabel(barIndex);
            this.updateOutput();
            this.updateNodeOutputs();
            // For textbox items, rebuilding inputs preserves the existing
            // connection onto the renamed slot (updateNodeInputs reconnects).
            this.updateNodeInputs();
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

    // ==================== 词组栏预设 (SavePreset) ====================

    // 拉取预设列表并填充所有词组栏的预设下拉框(异步,不阻塞渲染).
    // 同步构建预设下拉选项 HTML (使用 _cachedPresets).
    // appliedPreset 对应的 option 标记 selected, 使 renderBars 重建 select 后立即显示
    // 当前已加载的预设, 无需等待异步请求, 避免 toggle/开关单词等操作时下拉框闪烁回占位项.
    _presetOptionsHTML(appliedPreset) {
        const list = Array.isArray(this._cachedPresets) ? this._cachedPresets : [];
        let opts = '<option value="">预设...</option>';
        for (const name of list) {
            const v = this.escapeHtml(name);
            const sel = (name === appliedPreset) ? ' selected' : '';
            opts += `<option value="${v}"${sel}>${this.escapeHtml(name)}</option>`;
        }
        return opts;
    }

    async refreshAllPresetDropdowns() {
        let presets = [];
        try {
            const res = await this.safeFetchJson('/hezl_prompt/list_presets');
            presets = Array.isArray(res.presets) ? res.presets : [];
        } catch (e) {
            presets = [];
        }
        // 更新缓存. 之后的 renderBars 会同步用缓存渲染; 此处再刷新已有 select 的选项,
        // 以便保存/重命名/删除预设后立即反映新列表(同时保留各栏的 appliedPreset 选中态).
        this._cachedPresets = presets;
        this.barsContainer.querySelectorAll('.hezl-bar-preset-select').forEach(sel => {
            const barIndex = parseInt(sel.dataset.bar);
            const bar = this.items[barIndex];
            const current = (bar && bar.appliedPreset) ? bar.appliedPreset : '';
            sel.innerHTML = this._presetOptionsHTML(current);
        });
    }

    // 应用预设到指定词组栏: 替换其 prompts/weights/disabled/disabledWords/separators,
    // 并为每个词组重新生成 id,避免与现有词组 id 冲突.
    async applyPreset(barIndex, name) {
        const bar = this.items[barIndex];
        if (!bar || bar.type !== 'bar') return;
        try {
            const res = await this.safeFetchJson(`/hezl_prompt/get_preset?name=${encodeURIComponent(name)}`);
            if (!res.success) {
                alert('加载预设失败: ' + (res.error || '未知错误'));
                return;
            }
            const data = res.data || {};
            const newPrompts = Array.isArray(data.prompts) ? data.prompts : [];
            const newWeights = {};
            const newDisabled = {};
            const newDisabledWords = {};
            // 重新生成 id,建立新键映射
            newPrompts.forEach(p => {
                const oldId = p.id;
                const newId = String(this._nextPromptId++);
                p.id = newId;
                newWeights[newId] = (data.weights && data.weights[oldId] != null) ? data.weights[oldId] : 1.0;
                newDisabled[newId] = !!(data.disabled && data.disabled[oldId]);
                newDisabledWords[newId] = (data.disabledWords && Array.isArray(data.disabledWords[oldId]))
                    ? data.disabledWords[oldId].slice() : [];
            });
            bar.prompts = newPrompts;
            bar.weights = newWeights;
            bar.disabled = newDisabled;
            bar.disabledWords = newDisabledWords;
            if (typeof data.prompt_separator === 'string') bar.prompt_separator = data.prompt_separator;
            if (typeof data.bar_separator === 'string') bar.bar_separator = data.bar_separator;
            // 记录当前已加载的预设名,供下拉框显示当前选中项.
            bar.appliedPreset = name;
            this.renderBars();
            this.updateFolderCounts();
            this.renderPromptList();
            this.updateOutput();
        } catch (e) {
            alert('加载预设失败: ' + e.message);
        }
    }

    // 保存预设: 弹出名称输入小窗,将当前词组栏内容快照存为 JSON.
    savePresetAs(barIndex, anchor) {
        const bar = this.items[barIndex];
        if (!bar || bar.type !== 'bar') return;
        // 允许空词组栏保存预设: 快照 prompts 为 [] 是合法的, 应用时会清空目标词组栏
        // (可用于保存"空预设"以快速清空其他词组栏, 或保存间隔符号配置).
        const popover = this._showPopover(anchor, `
            <div class="hezl-popover-header">
                <span>保存预设</span>
                <button class="hezl-popover-close" id="hezl-preset-save-close">✕</button>
            </div>
            <div class="hezl-form-group">
                <label class="hezl-form-label">预设名称</label>
                <input type="text" class="hezl-form-input" id="hezl-preset-save-name" placeholder="输入预设名称">
            </div>
            <div class="hezl-popover-actions">
                <button class="hezl-btn" id="hezl-preset-save-cancel">取消</button>
                <button class="hezl-btn success" id="hezl-preset-save-ok">保存</button>
            </div>
        `);
        const nameInput = popover.querySelector('#hezl-preset-save-name');
        setTimeout(() => nameInput && nameInput.focus(), 0);
        popover.querySelector('#hezl-preset-save-close').addEventListener('click', () => this._closePopover());
        popover.querySelector('#hezl-preset-save-cancel').addEventListener('click', () => this._closePopover());
        const doSave = async () => {
            const name = (nameInput.value || '').trim();
            if (!name) { alert('请输入预设名称'); return; }
            // 构建快照(使用当前 id 作为键)
            const snapshot = {
                prompts: (bar.prompts || []).map(p => ({ id: p.id, title: p.title, content: p.content, folder: p.folder, source: p.source })),
                weights: Object.assign({}, bar.weights || {}),
                disabled: Object.assign({}, bar.disabled || {}),
                disabledWords: Object.assign({}, bar.disabledWords || {}),
                prompt_separator: bar.prompt_separator || ', ',
                bar_separator: bar.bar_separator || ', '
            };
            try {
                const res = await this.safeFetchJson('/hezl_prompt/save_preset', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ name: name, data: snapshot })
                });
                if (res.success) {
                    this._closePopover();
                    await this.refreshAllPresetDropdowns();
                } else {
                    alert('保存失败: ' + (res.error || '未知错误'));
                }
            } catch (e) {
                alert('保存失败: ' + e.message);
            }
        };
        popover.querySelector('#hezl-preset-save-ok').addEventListener('click', doSave);
        nameInput.addEventListener('keydown', (e) => {
            if (e.key === 'Enter') { e.preventDefault(); doSave(); }
            else if (e.key === 'Escape') { this._closePopover(); }
        });
    }

    // 重命名预设: 需先在下拉中选择一个预设,再输入新名.
    renamePreset(selectEl, anchor) {
        if (!selectEl) return;
        const oldName = selectEl.value;
        if (!oldName) {
            alert('请先在下拉菜单中选择要重命名的预设');
            return;
        }
        const popover = this._showPopover(anchor, `
            <div class="hezl-popover-header">
                <span>重命名预设</span>
                <button class="hezl-popover-close" id="hezl-preset-rename-close">✕</button>
            </div>
            <div class="hezl-form-group">
                <label class="hezl-form-label">新名称</label>
                <input type="text" class="hezl-form-input" id="hezl-preset-rename-name" value="${this.escapeHtml(oldName)}">
            </div>
            <div class="hezl-popover-actions">
                <button class="hezl-btn" id="hezl-preset-rename-cancel">取消</button>
                <button class="hezl-btn success" id="hezl-preset-rename-ok">确定</button>
            </div>
        `);
        const nameInput = popover.querySelector('#hezl-preset-rename-name');
        setTimeout(() => { nameInput && nameInput.focus(); nameInput && nameInput.select(); }, 0);
        popover.querySelector('#hezl-preset-rename-close').addEventListener('click', () => this._closePopover());
        popover.querySelector('#hezl-preset-rename-cancel').addEventListener('click', () => this._closePopover());
        const doRename = async () => {
            const newName = (nameInput.value || '').trim();
            if (!newName) { alert('请输入新名称'); return; }
            if (newName === oldName) { this._closePopover(); return; }
            try {
                const res = await this.safeFetchJson('/hezl_prompt/rename_preset', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ old_name: oldName, new_name: newName })
                });
                if (res.success) {
                    this._closePopover();
                    await this.refreshAllPresetDropdowns();
                } else {
                    alert('重命名失败: ' + (res.error || '未知错误'));
                }
            } catch (e) {
                alert('重命名失败: ' + e.message);
            }
        };
        popover.querySelector('#hezl-preset-rename-ok').addEventListener('click', doRename);
        nameInput.addEventListener('keydown', (e) => {
            if (e.key === 'Enter') { e.preventDefault(); doRename(); }
            else if (e.key === 'Escape') { this._closePopover(); }
        });
    }

    // 删除预设: 需先在下拉中选择一个预设.
    async deletePreset(selectEl, anchor) {
        if (!selectEl) return;
        const name = selectEl.value;
        if (!name) {
            alert('请先在下拉菜单中选择要删除的预设');
            return;
        }
        if (!confirm(`确定删除预设 "${name}" 吗?`)) return;
        try {
            const res = await this.safeFetchJson('/hezl_prompt/delete_preset', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ name: name })
            });
            if (res.success) {
                await this.refreshAllPresetDropdowns();
            } else {
                alert('删除失败: ' + (res.error || '未知错误'));
            }
        } catch (e) {
            alert('删除失败: ' + e.message);
        }
    }

    showSeparatorModal(barIndex) {
        const bar = this.bars[barIndex];
        if (!bar) return;
        const isTextbox = bar.type === 'textbox';
        const currentSep = bar.prompt_separator || ', ';
        const currentBarSep = bar.bar_separator || ', ';

        // For textbox items, the prompt_separator field doesn't apply (no
        // prompts inside a textbox), so we hide it and only show bar_separator.
        const promptSepGroup = isTextbox ? '' : `
            <div class="hezl-form-group">
                <label class="hezl-form-label">词组间间隔符号</label>
                <input type="text" class="hezl-form-input" id="hezl-sep-prompt" value="${this.escapeHtml(currentSep)}" placeholder="默认: , ">
            </div>
        `;

        const modal = document.createElement('div');
        modal.className = 'hezl-modal';
        modal.innerHTML = `
            <div class="hezl-modal-content">
                <div class="hezl-modal-header">间隔符号设置</div>
                ${promptSepGroup}
                <div class="hezl-form-group">
                    <label class="hezl-form-label">与下一个词组栏间隔符号</label>
                    <input type="text" class="hezl-form-input" id="hezl-sep-bar" value="${this.escapeHtml(currentBarSep)}" placeholder="默认: , ">
                </div>
                <div class="hezl-modal-actions">
                    <button class="hezl-btn" id="hezl-modal-cancel">取消</button>
                    <button class="hezl-btn success" id="hezl-modal-save">确定</button>
                </div>
            </div>
        `;

        document.body.appendChild(modal); this._positionModalOverNode(modal);

        modal.querySelector('#hezl-modal-cancel').addEventListener('click', () => {
            modal.remove();
        });

        modal.querySelector('#hezl-modal-save').addEventListener('click', () => {
            const promptSepInput = modal.querySelector('#hezl-sep-prompt');
            if (promptSepInput) {
                bar.prompt_separator = promptSepInput.value;
            }
            bar.bar_separator = modal.querySelector('#hezl-sep-bar').value;
            this.updateOutput();
            modal.remove();
        });

        modal.addEventListener('mousedown', (e) => {
            if (!e.target.closest('.hezl-modal-content')) {
                modal.remove();
            }
        });
    }

    // Legacy compatibility getters
    get selectedPrompts() {
        return this.items.reduce((acc, bar) => acc.concat(bar.type === 'bar' ? (bar.prompts || []) : []), []);
    }

    get promptWeights() {
        const merged = {};
        this.items.forEach(bar => { if (bar.type === 'bar') Object.assign(merged, bar.weights || {}); });
        return merged;
    }

    get promptDisabled() {
        const merged = {};
        this.items.forEach(bar => { if (bar.type === 'bar') Object.assign(merged, bar.disabled || {}); });
        return merged;
    }

    getTotalSelectedCount() {
        return this.items.reduce((acc, bar) => acc + (bar.type === 'bar' ? (bar.prompts || []).length : 0), 0);
    }

    // ==================== Feature 4: Render items (bars + textboxes) ====================

    renderBars() {
        let html = '';
        const replaceAllConnected = this._isReplaceAllConnected();
        this.items.forEach((item, barIndex) => {
            const label = this.getBarLabel(barIndex);
            const soloBtnClass = item.solo ? 'solo-btn-on' : '';

            // 计算禁用状态(红色边框). 优先级: 红 > 黄 > 绿.
            let isDisabled = false;
            if (replaceAllConnected) {
                // 需求4:"输入全部替换"连接时,所有条目都红色
                isDisabled = true;
            } else if (item.type === 'textbox') {
                // 文本框: 整个 bar 变红仅当手动禁用 (replaceAll 已在上方处理).
                // 同名输入已连接时改为仅 textarea 变红(见下方 connected-input), 整个 bar 不变红.
                isDisabled = !!item.disabled;
            } else {
                // 需求5:词组栏所有词组都禁用时红色(空栏不红)
                const prompts = item.prompts || [];
                isDisabled = prompts.length > 0 && prompts.every(p => item.disabled[p.id]);
            }

            // 优先级: 红(disabled-active) > 黄(solo-active) > 绿(selected-bar)
            // 黄/红默认 1px,选中状态叠加 selected-bar 时变为 2px
            let borderClass = '';
            if (isDisabled) {
                borderClass = 'disabled-active';
            } else if (item.solo) {
                borderClass = 'solo-active';
            }
            if (this.selectedBarIndex === barIndex) {
                borderClass = (borderClass ? borderClass + ' ' : '') + 'selected-bar';
            }

            // Common header (draggable for reorder). Per-type action buttons
            // are injected into .hezl-bar-actions-left / .hezl-bar-actions-right.
            let leftActions = '';
            let rightActions = '';
            let bodyHtml = '';

            if (item.type === 'textbox') {
                // 文本框:名称+✏️ | 启停开关(单个切换) | ⁉️间隔+🟡单独输出+❌️删除
                // 启用时显示🔴(点击禁用);禁用时显示🟢(点击启用)
                const isTbDisabled = !!item.disabled;
                const tbToggleClass = isTbDisabled ? 'success' : 'danger';
                const tbToggleIcon = isTbDisabled ? '🟢' : '🔴';
                const tbToggleTitle = isTbDisabled ? '启用文本框' : '禁用文本框,禁用后文本不输出';
                leftActions = `
                    <span class="hezl-bar-label" data-bar="${barIndex}" title="双击重命名">${label}</span>
                    <button class="hezl-icon-btn hezl-bar-rename-btn" data-bar="${barIndex}" title="重命名">✏️</button>
                    <span class="hezl-bar-sep"></span>
                    <button class="hezl-icon-btn ${tbToggleClass} hezl-bar-toggle-disable" data-bar="${barIndex}" title="${tbToggleTitle}">${tbToggleIcon}</button>
                `;
                rightActions = `
                    <button class="hezl-icon-btn hezl-bar-separator-btn" data-bar="${barIndex}" title="间隔符号设置">⁉️</button>
                    <button class="hezl-icon-btn ${soloBtnClass} hezl-bar-solo-btn" data-bar="${barIndex}" title="开启后此文本框单独输出,不参与输出全部">🟡</button>
                    <button class="hezl-icon-btn danger hezl-bar-delete" data-bar="${barIndex}" title="删除文本框">❌️</button>
                `;
                // 同名输入已连接(且未被禁用/非 replaceAll)时, 仅 textarea 变红表示"接收外部字符"
                const tbConnected = !isDisabled && this._isTextboxConnected(item);
                bodyHtml = `
                    <div class="hezl-textbox-zone" data-bar-index="${barIndex}">
                        <textarea class="hezl-textbox-input${tbConnected ? ' connected-input' : ''}" data-bar="${barIndex}" placeholder="输入文本,或连接字符串到同名输入接口">${this.escapeHtml(item.text || '')}</textarea>
                    </div>
                `;
            } else {
                // 词组栏:名称+✏️ | 预设下拉+📥️+✏️+🗑️ | 🟢/🔴启停开关 | ⁉️间隔+🟡单独输出+❌️删除
                const prompts = item.prompts || [];
                // 全部启用时显示🔴(点击全部禁用);存在禁用时显示🟢(点击全部启用)
                const hasDisabledPrompt = prompts.some(p => item.disabled[p.id]);
                const toggleClass = hasDisabledPrompt ? 'success' : 'danger';
                const toggleIcon = hasDisabledPrompt ? '🟢' : '🔴';
                const toggleTitle = hasDisabledPrompt ? '全部启用' : '全部禁用';
                leftActions = `
                    <span class="hezl-bar-label" data-bar="${barIndex}" title="双击重命名">${label}</span>
                    <button class="hezl-icon-btn hezl-bar-rename-btn" data-bar="${barIndex}" title="重命名词组栏">✏️</button>
                    <span class="hezl-bar-sep"></span>
                    <select class="hezl-preset-select hezl-bar-preset-select" data-bar="${barIndex}" title="预设下拉菜单">${this._presetOptionsHTML(item.appliedPreset || '')}</select>
                    <button class="hezl-icon-btn success hezl-bar-preset-save" data-bar="${barIndex}" title="保存预设(将当前词组栏内容存为预设)">📥️</button>
                    <button class="hezl-icon-btn hezl-bar-preset-rename" data-bar="${barIndex}" title="重命名预设">✏️</button>
                    <button class="hezl-icon-btn danger hezl-bar-preset-delete" data-bar="${barIndex}" title="删除预设">🗑️</button>
                    <span class="hezl-bar-sep"></span>
                    <button class="hezl-icon-btn ${toggleClass} hezl-bar-toggle-all" data-bar="${barIndex}" title="${toggleTitle}">${toggleIcon}</button>
                `;
                rightActions = `
                    <button class="hezl-icon-btn hezl-bar-separator-btn" data-bar="${barIndex}" title="间隔符号设置">⁉️</button>
                    <button class="hezl-icon-btn ${soloBtnClass} hezl-bar-solo-btn" data-bar="${barIndex}" title="开启后此词组栏单独输出,不参与输出全部">🟡</button>
                    <button class="hezl-icon-btn danger hezl-bar-delete" data-bar="${barIndex}" title="删除词组栏">❌️</button>
                `;
                if (prompts.length === 0) {
                    bodyHtml = `<div class="hezl-bar-drop-zone" data-bar-index="${barIndex}">
                        <div class="hezl-preview-container" data-bar-index="${barIndex}">
                            <div class="hezl-empty-state" style="width: 100%; padding: 10px;">点击上方词组添加到此处</div>
                        </div>
                    </div>`;
                } else {
                    let itemsHtml = '';
                    prompts.forEach((prompt, promptIndex) => {
                        const pid = prompt.id;
                        const weight = item.weights[pid] || 1.0;
                        const isDisabled = item.disabled[pid] || false;
                        const dw = item.disabledWords[pid] || [];
                        const hasDisabledWords = Array.isArray(dw) && dw.length > 0;
                        const wordBtnClass = hasDisabledWords ? 'has-disabled-words' : '';
                        const wordBtnTitle = hasDisabledWords ? `已禁用 ${dw.length} 个单词,点击管理` : '选取单词(按","拆分,可禁用不输出的单词)';
                        itemsHtml += `
                            <div class="hezl-preview-item ${isDisabled ? 'disabled' : ''}" data-bar-index="${barIndex}" data-prompt-index="${promptIndex}" data-prompt-id="${pid}" draggable="true">
                                <span class="hezl-preview-text" title="${this.escapeHtml(prompt.content)}">${this.escapeHtml(prompt.title)}</span>
                                <div class="hezl-weight-control">
                                    <button class="hezl-weight-btn" data-action="decrease">-</button>
                                    <span class="hezl-weight-value">${weight.toFixed(2)}</span>
                                    <button class="hezl-weight-btn" data-action="increase">+</button>
                                </div>
                                <button class="hezl-word-select-btn ${wordBtnClass}" data-bar-index="${barIndex}" data-prompt-index="${promptIndex}" data-prompt-id="${pid}" title="${wordBtnTitle}">.</button>
                                <button class="hezl-remove-btn" data-bar-index="${barIndex}" data-prompt-index="${promptIndex}" data-prompt-id="${pid}">✕</button>
                            </div>
                        `;
                    });
                    bodyHtml = `
                        <div class="hezl-bar-drop-zone" data-bar-index="${barIndex}">
                            <div class="hezl-preview-container" data-bar-index="${barIndex}">${itemsHtml}</div>
                        </div>
                    `;
                }
            }

            html += `
                <div class="hezl-bar-section ${borderClass}" data-bar-index="${barIndex}">
                    <div class="hezl-bar-header" draggable="true" data-bar-index="${barIndex}">
                        <div class="hezl-bar-actions-left">${leftActions}</div>
                        <div class="hezl-bar-actions-right">${rightActions}</div>
                    </div>
                    ${bodyHtml}
                </div>
            `;
        });

        this.barsContainer.innerHTML = html;
        this.bindBarEvents();
        // 不再在此调用异步 refreshAllPresetDropdowns(): 下拉选项已在上面通过 _cachedPresets
        // 同步渲染(含 appliedPreset 的 selected), 避免每次渲染都异步拉取导致下拉框闪烁.
        // 预设列表仅在 init / 保存 / 重命名 / 删除预设时由 refreshAllPresetDropdowns 刷新缓存.
    }

    // Alias used in some call sites.
    renderItems() { this.renderBars(); }

    bindBarEvents() {
        // 词组栏 启停切换按钮: 全启用显🔴(点击全部禁用);存在禁用显🟢(点击全部启用)
        this.barsContainer.querySelectorAll('.hezl-bar-toggle-all').forEach(btn => {
            btn.addEventListener('click', (e) => {
                e.stopPropagation();
                const barIndex = parseInt(btn.dataset.bar);
                const bar = this.items[barIndex];
                if (!bar || bar.type !== 'bar') return;
                const prompts = bar.prompts || [];
                const hasDisabled = prompts.some(p => bar.disabled[p.id]);
                this.toggleAllPromptsDisabledInBar(barIndex, !hasDisabled);
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

        // Separator button
        this.barsContainer.querySelectorAll('.hezl-bar-separator-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                e.stopPropagation();
                const barIndex = parseInt(btn.dataset.bar);
                this.showSeparatorModal(barIndex);
            });
        });

        // Solo (单独输出) toggle button
        this.barsContainer.querySelectorAll('.hezl-bar-solo-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                e.stopPropagation();
                const barIndex = parseInt(btn.dataset.bar);
                this.toggleSolo(barIndex);
            });
        });

        // 文本框 启停切换按钮: 启用显🔴(点击禁用);禁用显🟢(点击启用)
        this.barsContainer.querySelectorAll('.hezl-bar-toggle-disable').forEach(btn => {
            btn.addEventListener('click', (e) => {
                e.stopPropagation();
                const barIndex = parseInt(btn.dataset.bar);
                const item = this.items[barIndex];
                if (item && item.type === 'textbox') {
                    item.disabled = !item.disabled;
                    this.renderBars();
                    this.updateOutput();
                }
            });
        });

        // 词组栏 预设下拉: 选择即应用到当前词组栏(替换内容).
        // 选中后由 applyPreset 设置 bar.appliedPreset,renderBars 重建 select 后
        // 由 refreshAllPresetDropdowns 恢复显示当前选中预设(此处不再手动重置 value).
        this.barsContainer.querySelectorAll('.hezl-bar-preset-select').forEach(sel => {
            sel.addEventListener('change', (e) => {
                e.stopPropagation();
                const barIndex = parseInt(sel.dataset.bar);
                const name = sel.value;
                if (name) {
                    this.applyPreset(barIndex, name);
                }
            });
            // 阻止 select 交互冒泡触发 header 选中/拖拽
            sel.addEventListener('mousedown', (e) => e.stopPropagation());
            sel.addEventListener('click', (e) => e.stopPropagation());
        });
        // 预设: 保存 / 重命名 / 删除
        this.barsContainer.querySelectorAll('.hezl-bar-preset-save').forEach(btn => {
            btn.addEventListener('click', (e) => {
                e.stopPropagation();
                const barIndex = parseInt(btn.dataset.bar);
                this.savePresetAs(barIndex, btn);
            });
        });
        this.barsContainer.querySelectorAll('.hezl-bar-preset-rename').forEach(btn => {
            btn.addEventListener('click', (e) => {
                e.stopPropagation();
                const barIndex = parseInt(btn.dataset.bar);
                const sel = this.barsContainer.querySelector(`.hezl-bar-preset-select[data-bar="${barIndex}"]`);
                this.renamePreset(sel, btn);
            });
        });
        this.barsContainer.querySelectorAll('.hezl-bar-preset-delete').forEach(btn => {
            btn.addEventListener('click', (e) => {
                e.stopPropagation();
                const barIndex = parseInt(btn.dataset.bar);
                const sel = this.barsContainer.querySelector(`.hezl-bar-preset-select[data-bar="${barIndex}"]`);
                this.deletePreset(sel, btn);
            });
        });

        // Textbox textarea input -> persist typed text
        this.barsContainer.querySelectorAll('.hezl-textbox-input').forEach(ta => {
            ta.addEventListener('input', (e) => {
                const barIndex = parseInt(ta.dataset.bar);
                const item = this.items[barIndex];
                if (item && item.type === 'textbox') {
                    item.text = ta.value;
                    this.updateOutput();
                }
            });
            // Prevent header drag/click selection when interacting with the textarea
            ta.addEventListener('mousedown', (e) => e.stopPropagation());
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
                // Don't select if clicking on buttons, preview items, or the textbox
                if (e.target.closest('.hezl-bar-header') || e.target.closest('.hezl-preview-item') || e.target.closest('.hezl-remove-btn') || e.target.closest('.hezl-weight-btn') || e.target.closest('.hezl-textbox-input')) return;
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

        // Bar drag-to-reorder events
        this.barsContainer.querySelectorAll('.hezl-bar-header[draggable="true"]').forEach(header => {
            const barIndex = parseInt(header.dataset.barIndex);

            header.addEventListener('dragstart', (e) => {
                // Only start bar drag if not clicking on a button
                if (e.target.closest('button')) {
                    e.preventDefault();
                    return;
                }
                const section = header.closest('.hezl-bar-section');
                section.classList.add('dragging');
                e.dataTransfer.effectAllowed = 'move';
                e.dataTransfer.setData('text/plain', JSON.stringify({
                    type: 'bar-reorder',
                    barIndex: barIndex
                }));
            });

            header.addEventListener('dragend', () => {
                const section = header.closest('.hezl-bar-section');
                section.classList.remove('dragging');
                this.barsContainer.querySelectorAll('.hezl-bar-section').forEach(s => {
                    s.classList.remove('insert-before', 'insert-after');
                });
            });
        });

        // Bar section as drop target for bar reordering
        this.barsContainer.querySelectorAll('.hezl-bar-section').forEach(section => {
            section.addEventListener('dragover', (e) => {
                e.preventDefault();
                e.dataTransfer.dropEffect = 'move';
                // Only show indicators for bar-reorder drags
                // We check by trying to access dataTransfer types (can't read data during dragover)
                const sectionDragging = this.barsContainer.querySelector('.hezl-bar-section.dragging');
                if (!sectionDragging) return;
                if (section === sectionDragging) return;

                // Clear indicators on other sections
                this.barsContainer.querySelectorAll('.hezl-bar-section').forEach(s => {
                    if (s !== section) {
                        s.classList.remove('insert-before', 'insert-after');
                    }
                });

                const rect = section.getBoundingClientRect();
                const midY = rect.top + rect.height / 2;
                if (e.clientY < midY) {
                    section.classList.remove('insert-after');
                    section.classList.add('insert-before');
                } else {
                    section.classList.remove('insert-before');
                    section.classList.add('insert-after');
                }
            });

            section.addEventListener('dragleave', (e) => {
                const rect = section.getBoundingClientRect();
                if (e.clientX < rect.left || e.clientX > rect.right ||
                    e.clientY < rect.top || e.clientY > rect.bottom) {
                    section.classList.remove('insert-before', 'insert-after');
                }
            });

            section.addEventListener('drop', (e) => {
                e.preventDefault();
                section.classList.remove('insert-before', 'insert-after');
                // Check if this is a bar-reorder drag
                try {
                    const dragData = JSON.parse(e.dataTransfer.getData('text/plain'));
                    if (dragData.type !== 'bar-reorder') return; // Not a bar drag, let prompt drag handle it

                    const fromIndex = dragData.barIndex;
                    const toIndex = parseInt(section.dataset.barIndex);
                    if (fromIndex === toIndex) return;

                    // Determine insert position based on mouse position
                    const rect = section.getBoundingClientRect();
                    const midY = rect.top + rect.height / 2;
                    let insertIndex = toIndex;
                    if (e.clientY >= midY) {
                        insertIndex = toIndex + 1;
                    }
                    // Adjust for removal of source
                    if (fromIndex < insertIndex) {
                        insertIndex--;
                    }

                    this.moveBar(fromIndex, insertIndex);
                } catch (err) {}
            });
        });

        // Preview item events
        this.barsContainer.querySelectorAll('.hezl-preview-item').forEach(item => {
            const barIndex = parseInt(item.dataset.barIndex);
            const promptIndex = parseInt(item.dataset.promptIndex);

            // Click to toggle disabled
            item.addEventListener('click', (e) => {
                if (!e.target.classList.contains('hezl-weight-btn') &&
                    !e.target.classList.contains('hezl-remove-btn') &&
                    !e.target.classList.contains('hezl-word-select-btn')) {
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
                        promptId: prompt.id,
                        prompt: prompt
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

        // 词组单词选取按钮 "."
        this.barsContainer.querySelectorAll('.hezl-word-select-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                e.stopPropagation();
                const barIndex = parseInt(btn.dataset.barIndex);
                const promptIndex = parseInt(btn.dataset.promptIndex);
                this.showWordSelector(btn, barIndex, promptIndex);
            });
        });
    }

    // 单词选取下拉: 在"."按钮位置弹出,实时开关单词(取消勾选则不输出).
    showWordSelector(anchorBtn, barIndex, promptIndex) {
        const bar = this.bars[barIndex];
        if (!bar) return;
        const prompt = bar.prompts[promptIndex];
        if (!prompt) return;
        const pid = prompt.id;
        const content = prompt.content || '';

        // 按 "," 拆分并去重,保留出现顺序
        const seen = new Set();
        const words = [];
        for (const raw of String(content).split(',')) {
            const w = raw.trim();
            if (!w || seen.has(w)) continue;
            seen.add(w);
            words.push(w);
        }

        if (words.length === 0) {
            alert('此词组内容为空或没有可拆分的单词');
            return;
        }

        const listHtml = words.map(w => {
            const enabled = !(bar.disabledWords[pid] || []).includes(w);
            return `<div class="hezl-word-item ${enabled ? '' : 'disabled-word'}" data-word="${this.escapeHtml(w)}">
                <input type="checkbox" ${enabled ? 'checked' : ''}>
                <span class="hezl-word-text">${this.escapeHtml(w)}</span>
                <button class="hezl-word-copy-btn" title="复制">⧉</button>
            </div>`;
        }).join('');

        const popover = this._showPopover(anchorBtn, `
            <div class="hezl-popover-header">
                <span>选取单词</span>
                <button class="hezl-popover-close" id="hezl-word-close">✕</button>
            </div>
            <div class="hezl-form-label">勾选输出,取消则不输出</div>
            <div class="hezl-popover-toolbar">
                <button class="hezl-btn small" id="hezl-word-all-on">全选</button>
                <button class="hezl-btn small warning" id="hezl-word-all-off">全不选</button>
            </div>
            <div class="hezl-word-list">${listHtml}</div>
        `);

        popover.querySelector('#hezl-word-close').addEventListener('click', () => this._closePopover());

        // 切换单个单词(实时写回). batch=true 时不立即重绘,由调用方统一刷新.
        const toggleWord = (itemEl, forceState, batch) => {
            const cb = itemEl.querySelector('input[type="checkbox"]');
            if (forceState !== undefined) cb.checked = forceState;
            const word = itemEl.dataset.word;
            const arr = bar.disabledWords[pid] || [];
            const idx = arr.indexOf(word);
            if (cb.checked) {
                itemEl.classList.remove('disabled-word');
                if (idx !== -1) arr.splice(idx, 1);
            } else {
                itemEl.classList.add('disabled-word');
                if (idx === -1) arr.push(word);
            }
            bar.disabledWords[pid] = arr;
            if (!batch) {
                this.renderBars();
                this.updateOutput();
            }
        };

        popover.querySelectorAll('.hezl-word-item').forEach(itemEl => {
            const cb = itemEl.querySelector('input[type="checkbox"]');
            itemEl.addEventListener('click', (e) => {
                if (e.target.tagName === 'INPUT') return; // checkbox 自身会触发下面那个监听
                if (e.target.closest('.hezl-word-copy-btn')) return; // 复制按钮单独处理
                cb.checked = !cb.checked; // 点击行时手动翻转复选框
                toggleWord(itemEl);
            });
            cb.addEventListener('click', () => toggleWord(itemEl));

            // 复制按钮: 复制该单词到剪贴板
            const copyBtn = itemEl.querySelector('.hezl-word-copy-btn');
            if (copyBtn) {
                copyBtn.addEventListener('click', async (e) => {
                    e.stopPropagation();
                    const word = itemEl.dataset.word;
                    try {
                        await navigator.clipboard.writeText(word);
                    } catch {
                        // 回退方案: 临时 textarea
                        const ta = document.createElement('textarea');
                        ta.value = word;
                        document.body.appendChild(ta);
                        ta.select();
                        try { document.execCommand('copy'); } catch {}
                        ta.remove();
                    }
                    const orig = copyBtn.textContent;
                    copyBtn.textContent = '✓';
                    copyBtn.classList.add('copied');
                    setTimeout(() => {
                        copyBtn.textContent = orig;
                        copyBtn.classList.remove('copied');
                    }, 1200);
                });
            }
        });

        popover.querySelector('#hezl-word-all-on').addEventListener('click', () => {
            popover.querySelectorAll('.hezl-word-item').forEach(el => toggleWord(el, true, true));
            this.renderBars();
            this.updateOutput();
        });
        popover.querySelector('#hezl-word-all-off').addEventListener('click', () => {
            popover.querySelectorAll('.hezl-word-item').forEach(el => toggleWord(el, false, true));
            this.renderBars();
            this.updateOutput();
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
        const disabledWords = fromBar.disabledWords[pid] ? fromBar.disabledWords[pid].slice() : [];

        // Remove from source
        fromBar.prompts.splice(fromPromptIndex, 1);
        delete fromBar.weights[pid];
        delete fromBar.disabled[pid];
        delete fromBar.disabledWords[pid];

        // Adjust target index if same bar and after source
        if (fromBarIndex === toBarIndex && fromPromptIndex < toPromptIndex) {
            toPromptIndex--;
        }

        // Insert into target
        toBar.prompts.splice(toPromptIndex, 0, prompt);
        toBar.weights[pid] = weight;
        toBar.disabled[pid] = isDisabled;
        toBar.disabledWords[pid] = disabledWords;

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
            bar.disabledWords = {};
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
            delete bar.disabledWords[pid];
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
        delete bar.disabledWords[pid];
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
        // Expand the target folder itself plus all its descendant subfolders
        if (folderPath) {
            this.expandedFolders.add(folderPath);
        }

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

    collapseFolderDescendants(folderPath) {
        // Collapse the target folder itself and all of its descendant subfolders
        if (!folderPath) return;

        // Collect the target folder and all its descendant folder paths
        const pathsToCollapse = [folderPath];
        const collectDescendants = (nodes) => {
            if (!nodes) return;
            for (const node of nodes) {
                if (node.type === 'folder') {
                    if (node.path) {
                        pathsToCollapse.push(node.path);
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

        for (const p of pathsToCollapse) {
            this.expandedFolders.delete(p);
        }
        this.renderFolderTree();
    }

    renderFolderTree() {
        if (!this.folderStructure) return;

        // When a search is active, filter the tree to show only folders/csv files
        // that contain at least one matching prompt.
        const matches = this.searchMatches;
        const isSearchActive = matches !== null;

        const renderNode = (node, indent = 0) => {
            let html = '';

            if (node.type === 'folder') {
                const isExpanded = this.expandedFolders.has(node.path);
                const totalCount = this.calculateFolderCounts(node);
                const countBadge = totalCount > 0 ? `<span class="hezl-folder-count" data-path="${node.path}" title="点击取消选择">${totalCount}</span>` : '';
                const isSelected = this.currentFolder === node.path ? 'selected' : '';

                // Filter children first so we know whether this folder has visible descendants
                let childrenHtml = '';
                let visibleChildCount = 0;
                if (node.children && node.children.length > 0) {
                    for (const child of node.children) {
                        const childHtml = renderNode(child, indent + 1);
                        if (childHtml) {
                            childrenHtml += childHtml;
                            visibleChildCount++;
                        }
                    }
                }

                // In search mode, hide folders that have no matching CSV under them
                if (isSearchActive && visibleChildCount === 0) {
                    return '';
                }

                const hasVisibleChildren = visibleChildCount > 0;
                const toggleIcon = hasVisibleChildren ? (isExpanded ? '▼' : '▶') : '';

                html += `<div class="hezl-folder-item ${isSelected}" data-path="${node.path}" data-type="folder" style="padding-left: ${indent * 12 + 4}px">
                    <span class="hezl-tree-toggle" data-path="${node.path}">${toggleIcon}</span>
                    <span class="hezl-folder-icon">${hasVisibleChildren ? (isExpanded ? '📂' : '📁') : '📁'}</span>
                    <span class="hezl-folder-name">${node.name}</span>
                    ${countBadge}
                </div>`;

                if (hasVisibleChildren) {
                    const collapsedClass = isExpanded ? '' : 'collapsed';
                    html += `<div class="hezl-folder-children ${collapsedClass}" data-parent="${node.path}">${childrenHtml}</div>`;
                }
            } else if (node.type === 'csv') {
                const normalizedPath = (node.path || '').replace(/\\/g, '/');
                if (isSearchActive && !matches.has(normalizedPath)) {
                    return '';
                }
                const count = this.folderSelectedCounts[node.path] || 0;
                const countBadge = count > 0 ? `<span class="hezl-folder-count" data-path="${node.path}" title="点击取消选择">${count}</span>` : '';
                const isSelected = this.currentFolder === node.path ? 'selected' : '';
                const matchClass = isSearchActive ? 'search-match' : '';

                html += `<div class="hezl-folder-item ${isSelected} ${matchClass}" data-path="${node.path}" data-type="csv" style="padding-left: ${indent * 12 + 4}px">
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
    
    // 复制文本到剪贴板(优先 navigator.clipboard, 不可用时回退 execCommand).
    async _copyText(text) {
        const s = String(text == null ? '' : text);
        try {
            await navigator.clipboard.writeText(s);
            return true;
        } catch {
            const ta = document.createElement('textarea');
            ta.value = s;
            ta.style.position = 'fixed';
            ta.style.opacity = '0';
            document.body.appendChild(ta);
            ta.select();
            let ok = false;
            try { ok = document.execCommand('copy'); } catch {}
            ta.remove();
            return ok;
        }
    }

    showContextMenu(e, path, type, extra = {}) {
        this.hideContextMenu();
        
        this.contextMenu = document.createElement('div');
        this.contextMenu.className = 'hezl-context-menu';
        
        let menuHtml = '';

        if (type === 'folder') {
            menuHtml = `
                <div class="hezl-context-menu-item" data-action="expand-children">展开子文件夹</div>
                <div class="hezl-context-menu-item" data-action="collapse-children">收起子文件夹</div>
                <div class="hezl-context-menu-item" data-action="add-folder">添加子文件夹</div>
                <div class="hezl-context-menu-item" data-action="add-csv">新建CSV文件</div>
                <div class="hezl-context-menu-item" data-action="rename-folder">重命名</div>
                <div class="hezl-context-menu-item" data-action="delete-folder">删除</div>
            `;
        } else if (type === 'csv') {
            menuHtml = `
                <div class="hezl-context-menu-item" data-action="add-prompt">添加词组</div>
                <div class="hezl-context-menu-item" data-action="move-csv">移动到其他文件夹</div>
                <div class="hezl-context-menu-item" data-action="rename-csv">重命名</div>
                <div class="hezl-context-menu-item" data-action="delete-csv">删除</div>
            `;
        } else if (type === 'prompt') {
            // Feature 1: Add "在⬅添词组" and "在➡添词组"
            menuHtml = `
                <div class="hezl-context-menu-item" data-action="copy-prompt">复制</div>
                <div class="hezl-context-menu-item" data-action="add-prompt-above">在⬅添词组</div>
                <div class="hezl-context-menu-item" data-action="add-prompt-below">在➡添词组</div>
                <div class="hezl-context-menu-item" data-action="edit-prompt">编辑</div>
                <div class="hezl-context-menu-item" data-action="delete-prompt">删除</div>
            `;
        } else if (type === 'preview-item') {
            // Feature 3: Right-click on bottom preview items
            menuHtml = `
                <div class="hezl-context-menu-item" data-action="copy-preview-prompt">复制</div>
                <div class="hezl-context-menu-item" data-action="edit-preview-prompt">编辑</div>
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
                } else if (action === 'collapse-children') {
                    this.collapseFolderDescendants(path);
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
                    this.showAddPromptModal(path, [e.clientX, e.clientY]);
                } else if (action === 'add-prompt-above') {
                    this.showAddPromptAtPosition(extra.source || path, extra.index, 'above', [e.clientX, e.clientY]);
                } else if (action === 'add-prompt-below') {
                    this.showAddPromptAtPosition(extra.source || path, extra.index, 'below', [e.clientX, e.clientY]);
                } else if (action === 'rename-csv') {
                    this.showRenameCsvModal(path);
                } else if (action === 'move-csv') {
                    this.showMoveCsvModal(path);
                } else if (action === 'delete-csv') {
                    if (confirm('确定删除此CSV文件吗？')) {
                        this.deleteCsvFile(path);
                    }
                } else if (action === 'edit-prompt') {
                    this.showEditPromptPopover(extra.title, extra.source || path, [e.clientX, e.clientY]);
                } else if (action === 'delete-prompt') {
                    this.deletePrompt(extra.title, extra.source || path);
                } else if (action === 'copy-prompt') {
                    // 复制右侧词组列表中该词组的内容到剪贴板
                    const p = this.promptsData[extra.index];
                    this._copyText(p ? (p.content || '') : '');
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
                } else if (action === 'copy-preview-prompt') {
                    // 复制词组栏中该词组的内容到剪贴板
                    const bar = this.bars[extra.barIndex];
                    const p = bar && bar.prompts[extra.promptIndex];
                    this._copyText(p ? (p.content || '') : '');
                } else if (action === 'edit-preview-prompt') {
                    // 编辑词组栏中的词组(与右侧词组列表的"编辑"功能一致: 改标题/内容并写回 CSV)
                    // 传入完整词组对象,避免因词组不在当前文件夹列表中而无法打开编辑窗口
                    this.showEditPromptPopover(extra.title, extra.folder, [e.clientX, e.clientY], extra.prompt);
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
        const isFolder = this.currentFolderType === 'folder';

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

        if (!isCsv && !isFolder) {
            this.promptList.innerHTML = '<div class="hezl-empty-state">请选择左侧分类查看词组</div>';
            return;
        }

        if (this.promptsData.length === 0) {
            this.promptList.innerHTML = '<div class="hezl-empty-state">暂无词组</div>';
            return;
        }

        let html = '';
        const searchKeyword = (this.searchKeyword || '').toLowerCase();
        for (let index = 0; index < this.promptsData.length; index++) {
            const prompt = this.promptsData[index];
            const count = this.getPromptCountInBars(prompt.title);
            const escapedTitle = this.escapeHtml(prompt.title);
            const escapedSource = this.escapeHtml(prompt.source || this.currentFolder);
            const isSelected = count > 0 ? 'selected' : '';
            const isSearchMatch = searchKeyword && (
                (prompt.title || '').toLowerCase().includes(searchKeyword) ||
                (prompt.content || '').toLowerCase().includes(searchKeyword)
            ) ? 'search-match' : '';
            const countBadge = count > 0
                ? `<span class="hezl-prompt-count-badge" data-prompt-title="${escapedTitle}" data-prompt-source="${escapedSource}" data-count="${count}">${count}</span>`
                : '';
            html += `
                <div class="hezl-prompt-item-wrapper ${isSelected} ${isSearchMatch}"
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

            // 编辑按钮: 在按钮位置下拉出编辑小窗
            const editBtn = wrapper.querySelector('.hezl-prompt-edit-btn');
            if (editBtn) {
                editBtn.addEventListener('click', (e) => {
                    e.stopPropagation();
                    this.showEditPromptPopover(wrapper.dataset.title, wrapper.dataset.source, editBtn);
                });
            }

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
    
    async showEditPromptPopover(promptTitle, promptSource = null, anchor = null, promptObj = null) {
        // promptObj 直接传入词组数据(用于词组栏里的词组),避免因不在当前文件夹列表中而找不到
        const prompt = promptObj || this.promptsData.find(p => {
            const source = p.source || this.currentFolder;
            const targetSource = promptSource || this.currentFolder;
            return p.title === promptTitle && source === targetSource;
        });
        if (!prompt) return;

        const folder = promptSource || prompt.folder || this.currentFolder;

        const popover = this._showPopover(anchor, `
            <div class="hezl-popover-header">
                <span>编辑词组</span>
                <button class="hezl-popover-close" id="hezl-edit-close">✕</button>
            </div>
            <div class="hezl-form-group">
                <label class="hezl-form-label">标题</label>
                <input type="text" class="hezl-form-input" id="hezl-edit-title" value="${this.escapeHtml(prompt.title)}">
            </div>
            <div class="hezl-form-group hezl-form-group-content">
                <label class="hezl-form-label">内容</label>
                <textarea class="hezl-form-textarea" id="hezl-edit-content">${this.escapeHtml(prompt.content)}</textarea>
            </div>
            <div class="hezl-popover-actions">
                <button class="hezl-btn" id="hezl-edit-cancel">取消</button>
                <button class="hezl-btn success" id="hezl-edit-save">保存</button>
            </div>
        `, 'hezl-popover-form');

        const titleInput = popover.querySelector('#hezl-edit-title');
        const contentInput = popover.querySelector('#hezl-edit-content');
        setTimeout(() => titleInput && titleInput.focus(), 0);

        popover.querySelector('#hezl-edit-close').addEventListener('click', () => this._closePopover());
        popover.querySelector('#hezl-edit-cancel').addEventListener('click', () => this._closePopover());

        popover.querySelector('#hezl-edit-save').addEventListener('click', async () => {
            const newTitle = titleInput.value.trim();
            const newContent = contentInput.value.trim();

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
                    for (const bar of this.items) {
                        if (bar.type !== 'bar') continue;
                        for (const p of (bar.prompts || [])) {
                            if (p.title === promptTitle) {
                                p.title = newTitle;
                                p.content = newContent;
                            }
                        }
                    }
                    this.renderBars();
                    this.updateOutput();

                    this._closePopover();
                    const nextType = folder && folder.toLowerCase().endsWith('.csv') ? 'csv' : this.currentFolderType;
                    await this.selectFolder(folder, nextType);
                } else {
                    alert('保存失败: ' + result.error);
                }
            } catch (error) {
                alert('保存失败: ' + error.message);
            }
        });
    }
    
    async showAddPromptModal(csvPath = null, anchor = null) {
        if (csvPath) {
            this.currentFolder = csvPath;
            this.currentFolderType = 'csv';
        }
        if (!this.currentFolder || this.currentFolderType !== 'csv') {
            alert('请选中csv文件');
            return;
        }

        const folder = this.currentFolder;

        const popover = this._showPopover(anchor, `
            <div class="hezl-popover-header">
                <span>添加词组</span>
                <button class="hezl-popover-close" id="hezl-add-close">✕</button>
            </div>
            <div class="hezl-form-group">
                <label class="hezl-form-label">标题</label>
                <input type="text" class="hezl-form-input" id="hezl-add-title" placeholder="输入标题">
            </div>
            <div class="hezl-form-group hezl-form-group-content">
                <label class="hezl-form-label">内容</label>
                <textarea class="hezl-form-textarea" id="hezl-add-content" placeholder="输入内容"></textarea>
            </div>
            <div class="hezl-popover-actions">
                <button class="hezl-btn" id="hezl-add-cancel">取消</button>
                <button class="hezl-btn success" id="hezl-add-save">保存</button>
            </div>
        `, 'hezl-popover-form');

        const titleInput = popover.querySelector('#hezl-add-title');
        const contentInput = popover.querySelector('#hezl-add-content');
        setTimeout(() => titleInput && titleInput.focus(), 0);

        popover.querySelector('#hezl-add-close').addEventListener('click', () => this._closePopover());
        popover.querySelector('#hezl-add-cancel').addEventListener('click', () => this._closePopover());

        popover.querySelector('#hezl-add-save').addEventListener('click', async () => {
            const newTitle = titleInput.value.trim();
            const newContent = contentInput.value.trim();

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
                    this._closePopover();
                    await this.selectFolder(folder, this.currentFolderType);
                } else {
                    alert('保存失败: ' + result.error);
                }
            } catch (error) {
                alert('保存失败: ' + error.message);
            }
        });
    }

    // Feature 1: Add prompt at specific position (above/below)
    async showAddPromptAtPosition(csvPath, index, position, anchor = null) {
        if (!csvPath || csvPath.toLowerCase().endsWith('.csv') === false) {
            alert('请选中csv文件');
            return;
        }

        const folder = csvPath;
        const headerText = position === 'above' ? '在⬅添词组' : '在➡添词组';

        const popover = this._showPopover(anchor, `
            <div class="hezl-popover-header">
                <span>${headerText}</span>
                <button class="hezl-popover-close" id="hezl-add-close">✕</button>
            </div>
            <div class="hezl-form-group">
                <label class="hezl-form-label">标题</label>
                <input type="text" class="hezl-form-input" id="hezl-add-title" placeholder="输入标题">
            </div>
            <div class="hezl-form-group hezl-form-group-content">
                <label class="hezl-form-label">内容</label>
                <textarea class="hezl-form-textarea" id="hezl-add-content" placeholder="输入内容"></textarea>
            </div>
            <div class="hezl-popover-actions">
                <button class="hezl-btn" id="hezl-add-cancel">取消</button>
                <button class="hezl-btn success" id="hezl-add-save">保存</button>
            </div>
        `, 'hezl-popover-form');

        const titleInput = popover.querySelector('#hezl-add-title');
        const contentInput = popover.querySelector('#hezl-add-content');
        setTimeout(() => titleInput && titleInput.focus(), 0);

        popover.querySelector('#hezl-add-close').addEventListener('click', () => this._closePopover());
        popover.querySelector('#hezl-add-cancel').addEventListener('click', () => this._closePopover());

        popover.querySelector('#hezl-add-save').addEventListener('click', async () => {
            const newTitle = titleInput.value.trim();
            const newContent = contentInput.value.trim();

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
                    this._closePopover();
                    await this.selectFolder(folder, 'csv');
                } else {
                    alert('保存失败: ' + result.error);
                }
            } catch (error) {
                alert('保存失败: ' + error.message);
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
                    <input type="text" class="hezl-form-input" id="hezl-batch-csv-search" placeholder="🔍 输入关键词过滤CSV文件..." autocomplete="off" style="margin-bottom: 6px;">
                    <select class="hezl-form-input" id="hezl-batch-target-csv">
                        ${csvPaths.map(p => `<option value="${this.escapeHtml(p)}">${this.escapeHtml(p)}</option>`).join('')}
                    </select>
                    <div id="hezl-batch-csv-count" style="font-size: 12px; color: #999; margin-top: 4px;"></div>
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

        document.body.appendChild(modal); this._positionModalOverNode(modal);

        // ---- 目标CSV搜索过滤: 输入关键词实时隐藏不匹配的选项 ----
        const searchInput = modal.querySelector('#hezl-batch-csv-search');
        const targetSelect = modal.querySelector('#hezl-batch-target-csv');
        const countInfo = modal.querySelector('#hezl-batch-csv-count');
        const allOptions = Array.from(targetSelect.querySelectorAll('option'));
        // 路径分隔符归一化: 用户输入 / 或 \ 都能匹配
        const normalizeCsvPath = (s) => (s || '').toLowerCase().replace(/\\/g, '/');

        const applyCsvFilter = () => {
            const normKw = normalizeCsvPath(searchInput.value.trim());
            let visibleCount = 0;
            let firstVisible = null;
            allOptions.forEach(opt => {
                const match = !normKw || normalizeCsvPath(opt.value).includes(normKw);
                opt.hidden = !match;
                if (match) {
                    visibleCount++;
                    if (!firstVisible) firstVisible = opt;
                }
            });
            // 当前选中项被过滤掉时, 自动切换到第一个可见项, 避免误选隐藏路径
            const selectedOpt = targetSelect.options[targetSelect.selectedIndex];
            if (firstVisible && (!selectedOpt || selectedOpt.hidden)) {
                targetSelect.value = firstVisible.value;
            }
            countInfo.textContent = normKw
                ? `匹配 ${visibleCount} / ${allOptions.length} 个CSV文件`
                : `共 ${allOptions.length} 个CSV文件`;
            countInfo.style.color = visibleCount === 0 ? '#e57373' : '#999';
        };
        searchInput.addEventListener('input', applyCsvFilter);
        applyCsvFilter();
        // 打开弹窗即聚焦搜索框, 方便直接输入
        searchInput.focus();

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
            const targetCsv = targetSelect.value;
            // 防护: 当前选中项已被搜索过滤隐藏时阻止误操作
            const curOpt = targetSelect.options[targetSelect.selectedIndex];
            if (!curOpt || curOpt.hidden) {
                alert('没有匹配的目标CSV文件，请修改搜索关键词');
                return;
            }
            const selectedTitles = [];
            promptCbs.forEach(cb => {
                if (cb.checked) {
                    selectedTitles.push(prompts[parseInt(cb.dataset.index)].title);
                }
            });

            if (selectedTitles.length === 0) {
                alert('请至少选择一个词组');
                return;
            }

            if (!confirm(`确定要将选中的 ${selectedTitles.length} 个词组移动到 ${targetCsv} 吗？`)) {
                return;
            }

            // 单次请求原子完成"写入目标CSV + 从源CSV移除", 避免逐条请求在
            // 中途失败时出现"词组被复制而非移动"或误报失败的中间态.
            let result;
            try {
                result = await this.safeFetchJson('/hezl_prompt/batch_move_prompts', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({
                        source: csvPath,
                        target: targetCsv,
                        titles: selectedTitles
                    })
                });
            } catch (e) {
                alert('移动失败: ' + e.message);
                return;
            }

            const moved = new Set(result.moved || []);
            const failed = result.failed || [];

            if (moved.size > 0) {
                // 词组只是换了文件仍然存在: 词组栏中的引用保持有效,
                // 仅更新其来源路径到目标CSV(与"移动CSV文件"功能的处理一致).
                for (const item of this.items) {
                    if (item.type !== 'bar') continue;
                    for (const p of (item.prompts || [])) {
                        if (p.folder === csvPath && moved.has(p.title)) {
                            p.folder = targetCsv;
                        }
                    }
                }
                // 从当前列表移除已移动的词组
                this.promptsData = this.promptsData.filter(p => {
                    const source = p.source || this.currentFolder;
                    return !(source === csvPath && moved.has(p.title));
                });
            }

            modal.remove();

            const failedDetail = failed.map(f => `· ${f.title}: ${f.error}`).join('\n');
            if (!result.success && moved.size === 0) {
                alert('移动失败: ' + (result.error || '未知错误') + (failedDetail ? '\n' + failedDetail : ''));
            } else if (failed.length > 0) {
                alert(`成功移动 ${moved.size} 个词组, ${failed.length} 个失败:\n${failedDetail}`);
            } else {
                alert(`成功移动 ${moved.size} 个词组到 ${targetCsv}`);
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
                this.showAddPromptModal(this.currentFolder, addBtn);
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

        document.body.appendChild(modal); this._positionModalOverNode(modal);

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
                    const result = await this.safeFetchJson('/hezl_prompt/delete_prompt', {
                        method: 'POST',
                        headers: { 'Content-Type': 'application/json' },
                        body: JSON.stringify({
                            folder: csvPath,
                            title: p.title
                        })
                    });
                    if (!result || !result.success) {
                        errorCount++;
                        continue;
                    }
                    // Remove from all bars (skip textboxes which have no prompts)
                    for (const bar of this.items) {
                        if (bar.type !== 'bar') continue;
                        for (let i = (bar.prompts || []).length - 1; i >= 0; i--) {
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
        // If the currently selected item is a textbox, find the nearest bar
        // to add the prompt into instead (prompts can only live in bar items).
        let targetBarIndex = this.selectedBarIndex;
        const target = this.items[targetBarIndex];
        if (!target || target.type !== 'bar') {
            // Scan backward, then forward, for the first bar
            for (let d = -1; d < this.items.length; d++) {
                const idx = targetBarIndex + d;
                if (idx >= 0 && idx < this.items.length && this.items[idx].type === 'bar') {
                    targetBarIndex = idx;
                    break;
                }
            }
        }
        const bar = this.items[targetBarIndex];
        if (!bar || bar.type !== 'bar') return;

        // Always add to the target bar (allow duplicates)
        const id = this._nextPromptId++;
        const newPrompt = {
            id: id,
            title: prompt.title,
            content: prompt.content,
            folder: source
        };
        bar.prompts.push(newPrompt);
        bar.weights[id] = 1.0;
        bar.disabled[id] = false;
        bar.disabledWords[id] = []; // 默认全部单词开启

        this.updateFolderCounts();
        this.renderPromptList();
        this.renderBars();
        this.updateOutput();
    }

    // Count how many times a prompt title appears across all bars
    getPromptCountInBars(promptTitle) {
        let count = 0;
        for (const bar of this.items) {
            if (bar.type !== 'bar') continue;
            for (const p of (bar.prompts || [])) {
                if (p.title === promptTitle) count++;
            }
        }
        return count;
    }

    updateFolderCounts() {
        this.folderSelectedCounts = {};

        for (const bar of this.items) {
            if (bar.type !== 'bar') continue;
            for (const prompt of (bar.prompts || [])) {
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
        if (promptTitle == null || !promptSource) return;
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

                // Remove from all bars (skip textboxes which have no prompts)
                for (const bar of this.items) {
                    if (bar.type !== 'bar') continue;
                    for (let i = (bar.prompts || []).length - 1; i >= 0; i--) {
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
                // BUG2 fix: Use 'items' key (not 'bars') so the backend's
                // _migrate_to_items() preserves each item's 'type' field.
                // The 'bars' key branch forces type='bar', which makes
                // textboxes lose their type and their text never outputs.
                widget.value = JSON.stringify({
                    items: this.items
                });
            }
        }
    }

    // Feature 5: Dynamic output slots
    // Rule: slot 0 is always "输出全部". After that, one dedicated output per
    // item whose "单独输出" (solo) switch is ON, in display order.
    updateNodeOutputs() {
        if (!this.node) return;

        const soloNames = [];
        for (const item of this.items) {
            if (item.solo) soloNames.push(this._uniqueOutputName(item.name, soloNames));
        }
        const outputCount = 1 + soloNames.length;

        const returnTypes = ["STRING", ...soloNames.map(() => "STRING")];
        const returnNames = ["输出全部", ...soloNames];

        this.node.constructor.RETURN_TYPES = returnTypes;
        this.node.constructor.RETURN_NAMES = returnNames;

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

    // Disambiguate an output name against an already-collected list so two
    // solo items never share the same output slot name.
    _uniqueOutputName(baseName, existing) {
        if (!existing.includes(baseName)) return baseName;
        let n = 2;
        while (existing.includes(`${baseName}${n}`)) n++;
        return `${baseName}${n}`;
    }

    // 检测"输入全部替换"输入接口是否已连接 (需求4)
    _isReplaceAllConnected() {
        if (!this.node || !this.node.inputs) return false;
        for (const inp of this.node.inputs) {
            if (inp && inp.name === '输入全部替换' && inp.link != null) {
                return true;
            }
        }
        return false;
    }

    // 检测指定文本框的同名输入接口是否已连接 (需求3)
    _isTextboxConnected(item) {
        if (!this.node || !this.node.inputs || !item || item.type !== 'textbox') return false;
        for (const inp of this.node.inputs) {
            if (inp && inp.type === 'STRING' && inp.name === item.name && inp.link != null) {
                return true;
            }
        }
        return false;
    }

    // Dynamic INPUT slots.
    // Slot 0 is always "输入全部替换": when an external STRING connects here,
    // the "输出全部" output returns ONLY the external string (replacing all).
    // Subsequent slots are one STRING input per textbox item, named after the
    // item, in display order. We do a full rebuild while preserving existing
    // connections: before removing we record (origin node, origin slot) for
    // each connected input, then after rebuilding we reconnect them onto the
    // matching new slot (matched by the OLD name).
    updateNodeInputs() {
        if (!this.node || !this.node.inputs) return;

        const REPLACE_ALL_NAME = '输入全部替换';
        const textboxItems = this.items.filter(it => it.type === 'textbox');
        // Map: old input name -> {originNode, originSlot} for connected slots.
        const connections = {};
        for (const inp of this.node.inputs) {
            if (inp && inp.type === 'STRING' && inp.name !== 'selected_prompts' && inp.link != null) {
                const linkId = inp.link;
                const link = this.node.graph && this.node.graph.links ? this.node.graph.links[linkId] : null;
                if (link) {
                    const originNode = this.node.graph.getNodeById(link.origin_id);
                    if (originNode) {
                        connections[inp.name] = { originNode, originSlot: link.origin_slot };
                    }
                }
            }
        }

        // Remove all STRING inputs (keep the selected_prompts widget if any).
        for (let i = this.node.inputs.length - 1; i >= 0; i--) {
            const inp = this.node.inputs[i];
            if (inp && inp.type === 'STRING' && inp.name !== 'selected_prompts') {
                this.node.removeInput(i);
            }
        }

        // Always add "输入全部替换" as the first input slot.
        this.node.addInput(REPLACE_ALL_NAME, 'STRING');
        const replaceConn = connections[REPLACE_ALL_NAME];
        if (replaceConn) {
            try {
                replaceConn.originNode.connect(replaceConn.originSlot, this.node, this.node.inputs.length - 1);
            } catch (e) {
                // best-effort reconnect; ignore failures
            }
        }

        // Re-add textbox inputs in display order and reconnect if we had a connection for that name.
        for (const item of textboxItems) {
            this.node.addInput(item.name, 'STRING');
            const conn = connections[item.name];
            if (conn) {
                try {
                    // target slot is the last input we just added
                    const targetIdx = this.node.inputs.length - 1;
                    conn.originNode.connect(conn.originSlot, this.node, targetIdx);
                } catch (e) {
                    // best-effort reconnect; ignore failures
                }
            }
        }

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
        for (const bar of this.items) {
            if (bar.type !== 'bar') continue;
            for (const p of (bar.prompts || [])) {
                if (csvPaths.includes(p.folder) || p.folder === folderPath) {
                    promptsToRemove.push(p);
                }
            }
        }

        if (promptsToRemove.length === 0) return;

        if (confirm(`确定要取消选择此文件夹中的 ${promptsToRemove.length} 个词组吗？`)) {
            for (const bar of this.items) {
                if (bar.type !== 'bar') continue;
                const idsToRemove = new Set();
                bar.prompts = (bar.prompts || []).filter(p => {
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
        // Use the given parent path; null/empty => create at the csv root directory
        const parent = (parentPath === null || parentPath === '') ? '' : parentPath;

        // Pre-select the target folder in the modal title
        const targetDisplay = parent ? parent : '根目录';

        const modal = document.createElement('div');
        modal.className = 'hezl-modal';
        modal.innerHTML = `
            <div class="hezl-modal-content">
                <div class="hezl-modal-header">在「${this.escapeHtml(targetDisplay)}」下创建子文件夹</div>
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
        
        document.body.appendChild(modal); this._positionModalOverNode(modal);
        
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
                    // Expand the parent folder (when applicable) so the new child is visible
                    if (parent) {
                        this.expandedFolders.add(parent);
                    }
                    await this.loadFolderStructure();
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
        
        document.body.appendChild(modal); this._positionModalOverNode(modal);
        
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
        
        document.body.appendChild(modal); this._positionModalOverNode(modal);
        
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

    showMoveCsvModal(csvPath = null) {
        const path = csvPath || this.currentFolder;
        if (!path) {
            alert('请先选择CSV文件');
            return;
        }
        if (!path.toLowerCase().endsWith('.csv')) {
            alert('请选择CSV文件');
            return;
        }

        // Collect all folder paths (except the source folder itself and its descendants)
        const sepRegex = /[/\\]/;
        const sourceDir = path.split(sepRegex).slice(0, -1).join('/');
        const fileName = path.split(sepRegex).pop();

        const folderOptions = [];
        folderOptions.push({ value: '', label: '根目录' });

        const collectFolders = (nodes) => {
            if (!nodes) return;
            for (const node of nodes) {
                if (node.type === 'folder' && node.path) {
                    // Don't allow moving into the same folder or any descendant
                    if (node.path === sourceDir || sourceDir.startsWith(node.path + '/') || sourceDir.startsWith(node.path + '\\')) {
                        // Skip, but still recurse? Skip descendants entirely to be safe
                        continue;
                    }
                    folderOptions.push({ value: node.path, label: node.path });
                    if (node.children) {
                        collectFolders(node.children);
                    }
                }
            }
        };

        if (this.folderStructure && this.folderStructure.default) {
            collectFolders(this.folderStructure.default.children);
        }

        if (folderOptions.length === 1) {
            alert('没有可用的目标文件夹');
            return;
        }

        const modal = document.createElement('div');
        modal.className = 'hezl-modal';
        modal.innerHTML = `
            <div class="hezl-modal-content">
                <div class="hezl-modal-header">移动CSV到其他文件夹</div>
                <div class="hezl-form-group">
                    <label class="hezl-form-label">当前文件：${this.escapeHtml(fileName)}</label>
                </div>
                <div class="hezl-form-group">
                    <label class="hezl-form-label">目标文件夹</label>
                    <select class="hezl-form-input" id="hezl-move-target-folder">
                        ${folderOptions.map(o => `<option value="${this.escapeHtml(o.value)}">${this.escapeHtml(o.label)}</option>`).join('')}
                    </select>
                </div>
                <div class="hezl-modal-actions">
                    <button class="hezl-btn" id="hezl-modal-cancel">取消</button>
                    <button class="hezl-btn success" id="hezl-modal-save">移动</button>
                </div>
            </div>
        `;

        document.body.appendChild(modal); this._positionModalOverNode(modal);

        modal.querySelector('#hezl-modal-cancel').addEventListener('click', () => {
            modal.remove();
        });

        modal.querySelector('#hezl-modal-save').addEventListener('click', async () => {
            const targetFolder = modal.querySelector('#hezl-move-target-folder').value;

            if (!confirm(`确定要将「${fileName}」移动到「${targetFolder || '根目录'}」吗？`)) {
                return;
            }

            try {
                const result = await this.safeFetchJson('/hezl_prompt/move_csv_file', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({
                        path: path,
                        target_folder: targetFolder
                    })
                });

                if (result.success) {
                    const newPath = result.path || path;
                    // Update any selected bar entries that reference the old csv path
                    for (const bar of this.bars) {
                        // 跳过文本框等非词组栏条目(它们没有 prompts 数组)
                        if (!bar || bar.type !== 'bar' || !Array.isArray(bar.prompts)) continue;
                        for (const p of bar.prompts) {
                            if (p.folder === path) {
                                p.folder = newPath;
                            }
                        }
                    }
                    // Update loaded prompts in current folder view
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
                    // Expand the target folder so the moved file is visible
                    if (targetFolder) {
                        this.expandedFolders.add(targetFolder);
                    }
                    await this.loadFolderStructure();
                    if (this.currentFolder === newPath) {
                        await this.selectFolder(newPath, 'csv');
                    }
                } else {
                    alert('移动失败: ' + result.error);
                }
            } catch (error) {
                alert('移动失败: ' + error.message);
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

        document.body.appendChild(modal); this._positionModalOverNode(modal);

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
                        // 跳过文本框等非词组栏条目(它们没有 prompts 数组)
                        if (!bar || bar.type !== 'bar' || !Array.isArray(bar.prompts)) continue;
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
                    // 跳过文本框等非词组栏条目(它们没有 prompts 数组)
                    if (!bar || bar.type !== 'bar' || !Array.isArray(bar.prompts)) continue;
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
                    // 跳过文本框等非词组栏条目(它们没有 prompts 数组)
                    if (!bar || bar.type !== 'bar' || !Array.isArray(bar.prompts)) continue;
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

                // BUG1 fix: Remove the selected_prompts input slot so it doesn't
                // block the dynamic textbox input slots. The widget remains for
                // state persistence; its value is still passed to the backend.
                for (let i = this.inputs.length - 1; i >= 0; i--) {
                    if (this.inputs[i] && this.inputs[i].name === 'selected_prompts') {
                        this.removeInput(i);
                        break;
                    }
                }
                
                const hezlWidget = new HezlPromptWidget(this, 'selected_prompts', {}, app);
                this.hezlWidget = hezlWidget; // 供 onConnectionsChange 访问
                
                this.addDOMWidget('hezl_prompt_ui', 'hezl_prompt', hezlWidget.container, {
                    getValue: () => {
                        return JSON.stringify({
                            items: hezlWidget.items
                        });
                    },
                    setValue: (value) => {
                        try {
                            const data = JSON.parse(value);

                            // ---- Migrate any format into the unified items model ----
                            if (data.items && Array.isArray(data.items)) {
                                hezlWidget.items = data.items;
                            } else if (data.bars && Array.isArray(data.bars)) {
                                // Legacy bars format → items
                                hezlWidget.items = data.bars.map(bar => {
                                    const item = Object.assign({}, bar);
                                    item.type = item.type || 'bar';
                                    return item;
                                });
                            } else if (data.prompts) {
                                // Oldest legacy format → single bar item
                                hezlWidget.items = [{
                                    type: 'bar',
                                    name: '词组栏01',
                                    prompts: data.prompts || [],
                                    weights: data.weights || {},
                                    disabled: data.disabled || {},
                                    prompt_separator: ', ',
                                    bar_separator: ', ',
                                    solo: false,
                                    appliedPreset: ''
                                }];
                            }

                            // ---- Normalize every item ----
                            let nextPromptId = 1;
                            let barCount = 0;
                            let boxCount = 0;
                            for (let ii = 0; ii < hezlWidget.items.length; ii++) {
                                const item = hezlWidget.items[ii];

                                // Ensure type / name / solo defaults
                                if (item.type !== 'textbox') item.type = 'bar';
                                if (!item.name) item.name = item.type === 'textbox'
                                    ? `文本框${String(++boxCount).padStart(2, '0')}`
                                    : `词组栏${String(++barCount).padStart(2, '0')}`;
                                if (item.solo === undefined) item.solo = false;
                                if (item.bar_separator === undefined) item.bar_separator = ', ';

                                // For bar items: fix prompt id uniqueness (same as before)
                                if (item.type === 'bar') {
                                    if (!item.prompts) item.prompts = [];
                                    if (!item.weights) item.weights = {};
                                    if (!item.disabled) item.disabled = {};
                                    if (!item.disabledWords) item.disabledWords = {};
                                    if (item.prompt_separator === undefined) item.prompt_separator = ', ';
                                    if (item.appliedPreset === undefined) item.appliedPreset = '';
                                    const newWeights = {};
                                    const newDisabled = {};
                                    const newDisabledWords = {};
                                    for (const p of item.prompts) {
                                        const oldKey = (p.id !== undefined && p.id !== null) ? p.id : p.title;
                                        const oldWeight = item.weights[oldKey] !== undefined ? item.weights[oldKey]
                                                        : (item.weights[p.title] !== undefined ? item.weights[p.title] : 1.0);
                                        const oldDisabled = item.disabled[oldKey] !== undefined ? item.disabled[oldKey]
                                                          : (item.disabled[p.title] !== undefined ? item.disabled[p.title] : false);
                                        const oldDisabledWords = (item.disabledWords[oldKey] !== undefined ? item.disabledWords[oldKey]
                                                          : (item.disabledWords[p.title] !== undefined ? item.disabledWords[p.title] : null));
                                        const newId = nextPromptId++;
                                        p.id = newId;
                                        newWeights[newId] = oldWeight;
                                        newDisabled[newId] = oldDisabled;
                                        newDisabledWords[newId] = Array.isArray(oldDisabledWords) ? oldDisabledWords.slice() : [];
                                    }
                                    item.weights = newWeights;
                                    item.disabled = newDisabled;
                                    item.disabledWords = newDisabledWords;
                                } else {
                                    // textbox
                                    if (item.text === undefined) item.text = '';
                                    if (item.disabled === undefined) item.disabled = false;
                                }
                            }

                            // Derive counters for future addBar / addTextbox
                            for (const it of hezlWidget.items) {
                                if (it.type === 'bar') barCount++;
                                else boxCount++;
                            }
                            hezlWidget._barCounter = barCount;
                            hezlWidget._boxCounter = boxCount;

                            // Keep the prompt-id counter past every loaded id
                            hezlWidget._nextPromptId = nextPromptId;

                            hezlWidget.syncSelectionState();
                            hezlWidget.updateNodeOutputs();
                            hezlWidget.updateNodeInputs();
                        } catch (e) {}
                    }
                });
                
                return result;
            };

            // 检测输入连接变化,更新边框颜色 (需求3+4)
            const origOnConnectionsChange = nodeType.prototype.onConnectionsChange;
            nodeType.prototype.onConnectionsChange = function(type, index, connected, link_info, ioSlot) {
                const result = origOnConnectionsChange?.apply(this, arguments);
                // type === 1 表示输入侧 (LiteGraph.INPUT)
                if (type === 1 && this.hezlWidget) {
                    this.hezlWidget.renderBars();
                }
                return result;
            };
        }
    }
});
