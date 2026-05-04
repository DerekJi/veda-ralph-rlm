import * as vscode from 'vscode';
import { execa } from 'execa';

export type LLMProvider = 'github-copilot' | 'ollama';

export interface LLMConfig {
  provider: LLMProvider;
  model: string;
}

export interface AvailableModels {
  provider: LLMProvider;
  models: string[];
}

/**
 * Configuration Manager for Ralph RLM
 * Handles LLM provider detection, model discovery, and configuration persistence
 */
export class ConfigManager {
  private static readonly CONFIG_KEY = 'veda-ralph-rlm.config';
  private static readonly GITHUB_COPILOT_MODELS = ['gpt-4.1', 'gpt-4o'];

  constructor(private context: vscode.ExtensionContext) {}

  /**
   * Get current LLM configuration
   */
  async getCurrentConfig(): Promise<LLMConfig> {
    const config = vscode.workspace.getConfiguration('veda-ralph-rlm');
    const provider = (config.get('llmProvider') || 'github-copilot') as LLMProvider;
    const model = config.get('llmModel') as string | undefined;

    // If no model is set, use default based on provider
    let defaultModel = model;
    if (!defaultModel) {
      if (provider === 'github-copilot') {
        defaultModel = 'gpt-4o';
      } else {
        // Try to get first available Ollama model
        const ollamas = await this.getOllamaModels();
        defaultModel = ollamas.length > 0 ? ollamas[0] : 'llama2';
      }
    }

    return { provider, model: defaultModel };
  }

  /**
   * Update LLM configuration
   */
  async setConfig(provider: LLMProvider, model: string): Promise<void> {
    const config = vscode.workspace.getConfiguration('veda-ralph-rlm');
    await config.update('llmProvider', provider, vscode.ConfigurationTarget.Global);
    await config.update('llmModel', model, vscode.ConfigurationTarget.Global);
  }

  /**
   * Check if Ollama is available
   */
  async isOllamaAvailable(): Promise<boolean> {
    try {
      const result = await execa('ollama', ['--version'], { timeout: 5000 });
      return result.exitCode === 0;
    } catch {
      return false;
    }
  }

  /**
   * Get available Ollama models
   */
  async getOllamaModels(): Promise<string[]> {
    try {
      const result = await execa('ollama', ['list'], { timeout: 10000 });
      const lines = result.stdout.split('\n');
      
      // Skip header line and parse model names
      const models = lines
        .slice(1)
        .filter((line) => line.trim())
        .map((line) => {
          // Extract model name (first column)
          const parts = line.split(/\s+/);
          return parts[0];
        })
        .filter((name) => name && name.length > 0);

      return models;
    } catch {
      return [];
    }
  }

  /**
   * Get GitHub Copilot available models
   */
  getGitHubCopilotModels(): string[] {
    return ConfigManager.GITHUB_COPILOT_MODELS;
  }

  /**
   * Get available models for a provider
   */
  async getAvailableModels(provider: LLMProvider): Promise<string[]> {
    if (provider === 'github-copilot') {
      return this.getGitHubCopilotModels();
    } else if (provider === 'ollama') {
      return this.getOllamaModels();
    }
    return [];
  }

  /**
   * Get available providers
   */
  async getAvailableProviders(): Promise<LLMProvider[]> {
    const providers: LLMProvider[] = ['github-copilot'];

    if (await this.isOllamaAvailable()) {
      providers.push('ollama');
    }

    return providers;
  }
}
