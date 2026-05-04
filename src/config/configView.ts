import * as vscode from 'vscode';
import * as fs from 'fs';
import * as path from 'path';
import { ConfigManager, LLMProvider } from './configManager';

/**
 * Configuration WebView Provider for Ralph RLM
 * Manages the settings UI for LLM provider and model selection
 */
export class ConfigViewProvider implements vscode.WebviewViewProvider {
  public static readonly viewType = 'ralph-config';

  private view?: vscode.WebviewView;
  private configManager: ConfigManager;
  private htmlContent?: string;

  constructor(private context: vscode.ExtensionContext) {
    this.configManager = new ConfigManager(context);
    this.loadHtmlContent();
  }

  private loadHtmlContent(): void {
    try {
      const htmlPath = path.join(
        this.context.extensionPath,
        'src',
        'views',
        'configView.html'
      );
      this.htmlContent = fs.readFileSync(htmlPath, 'utf-8');
    } catch (error) {
      console.error('Failed to load configView.html:', error);
      this.htmlContent = this.getFallbackHtml();
    }
  }

  public resolveWebviewView(
    webviewView: vscode.WebviewView,
    _context: vscode.WebviewViewResolveContext,
    _token: vscode.CancellationToken
  ): void | Thenable<void> {
    this.view = webviewView;

    webviewView.webview.options = {
      enableScripts: true,
      localResourceRoots: [],
    };

    // Set initial HTML content
    this.updateWebviewContent();

    // Handle messages from the webview
    webviewView.webview.onDidReceiveMessage(async (data) => {
      switch (data.type) {
        case 'ready':
          await this.sendConfigData();
          break;
        case 'provider-changed':
          await this.handleProviderChange(data.provider);
          break;
        case 'model-changed':
          await this.handleModelChange(data.provider, data.model);
          break;
        case 'refresh-models':
          await this.sendConfigData();
          break;
      }
    });
  }

  private async sendConfigData(): Promise<void> {
    if (!this.view) return;

    const currentConfig = await this.configManager.getCurrentConfig();
    const availableProviders = await this.configManager.getAvailableProviders();
    const availableModels = await this.configManager.getAvailableModels(
      currentConfig.provider
    );

    this.view.webview.postMessage({
      type: 'config-data',
      currentProvider: currentConfig.provider,
      currentModel: currentConfig.model,
      availableProviders,
      availableModels,
    });
  }

  private async handleProviderChange(provider: LLMProvider): Promise<void> {
    if (!this.view) return;

    const availableModels = await this.configManager.getAvailableModels(provider);
    const defaultModel = availableModels.length > 0 ? availableModels[0] : 'llama2';

    await this.configManager.setConfig(provider, defaultModel);

    this.view.webview.postMessage({
      type: 'models-updated',
      provider,
      models: availableModels,
      selectedModel: defaultModel,
    });
  }

  private async handleModelChange(provider: LLMProvider, model: string): Promise<void> {
    await this.configManager.setConfig(provider, model);
  }

  private updateWebviewContent(): void {
    if (!this.view || !this.htmlContent) return;

    this.view.webview.html = this.htmlContent;
  }

  private getFallbackHtml(): string {
    return `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Ralph RLM Configuration</title>
    <style>
        body {
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
            background-color: var(--vscode-editor-background);
            color: var(--vscode-editor-foreground);
            padding: 20px;
        }
        .error {
            color: var(--vscode-errorForeground);
            padding: 16px;
            border: 1px solid var(--vscode-errorForeground);
            border-radius: 4px;
        }
    </style>
</head>
<body>
    <div class="error">
        <h2>Failed to load configuration view</h2>
        <p>Please ensure configView.html exists in the src/views directory.</p>
    </div>
</body>
</html>`;
  }
}
