import * as vscode from 'vscode';
import { RalphSidebarProvider } from './sidebar/ralphSidebarProvider';

/**
 * Ralph RLM Extension - Main Entry Point
 *
 * This extension integrates a Recursive Language Model (RLM) directly into VS Code
 * through a dedicated sidebar panel, enabling multi-turn AI-powered code analysis and generation.
 */

// Global reference to Ralph sidebar provider
let ralphSidebarProvider: RalphSidebarProvider | undefined;

/**
 * Extension activation handler
 *
 * Called when the extension is activated. Registers the Ralph sidebar panel
 * with VS Code and initializes the handler.
 */
export async function activate(context: vscode.ExtensionContext): Promise<void> {
  console.log('🚀 Veda-Ralph-RLM Extension activating...');

  // Register the sidebar provider
  ralphSidebarProvider = new RalphSidebarProvider(context);

  const sidebarProvider = vscode.window.registerWebviewViewProvider(
    'ralph-sidebar',
    ralphSidebarProvider,
    {
      webviewOptions: {
        retainContextWhenHidden: true,
      },
    }
  );

  context.subscriptions.push(sidebarProvider);

  console.log('✅ Ralph Sidebar registered successfully');

  // Inform user that extension is ready
  vscode.window.showInformationMessage(
    'Ralph RLM Extension activated! Look in the sidebar for the Ralph panel.'
  );
}

/**
 * Extension deactivation handler
 *
 * Called when the extension is deactivated. Cleanup happens automatically
 * through VS Code's disposal mechanism.
 */
export function deactivate(): void {
  console.log('Ralph RLM Extension deactivated');
}
