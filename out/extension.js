"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.activate = activate;
exports.deactivate = deactivate;
const vscode = __importStar(require("vscode"));
const ralphSidebarProvider_1 = require("./sidebar/ralphSidebarProvider");
/**
 * Ralph RLM Extension - Main Entry Point
 *
 * This extension integrates a Recursive Language Model (RLM) directly into VS Code
 * through a dedicated sidebar panel, enabling multi-turn AI-powered code analysis and generation.
 */
// Global reference to Ralph sidebar provider
let ralphSidebarProvider;
/**
 * Extension activation handler
 *
 * Called when the extension is activated. Registers the Ralph sidebar panel
 * with VS Code and initializes the handler.
 */
async function activate(context) {
    console.log('🚀 Veda-Ralph-RLM Extension activating...');
    // Register the sidebar provider
    ralphSidebarProvider = new ralphSidebarProvider_1.RalphSidebarProvider(context);
    const sidebarProvider = vscode.window.registerWebviewViewProvider('ralph-sidebar', ralphSidebarProvider, {
        webviewOptions: {
            retainContextWhenHidden: true,
        },
    });
    context.subscriptions.push(sidebarProvider);
    console.log('✅ Ralph Sidebar registered successfully');
    // Inform user that extension is ready
    vscode.window.showInformationMessage('Ralph RLM Extension activated! Look in the sidebar for the Ralph panel.');
}
/**
 * Extension deactivation handler
 *
 * Called when the extension is deactivated. Cleanup happens automatically
 * through VS Code's disposal mechanism.
 */
function deactivate() {
    console.log('Ralph RLM Extension deactivated');
}
//# sourceMappingURL=extension.js.map