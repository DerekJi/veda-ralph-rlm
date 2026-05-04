import * as vscode from 'vscode';

/**
 * Sidebar provider for Ralph RLM
 *
 * Manages the WebView panel for Ralph's chat interface in the VS Code sidebar
 */
export class RalphSidebarProvider implements vscode.WebviewViewProvider {
  public static readonly viewType = 'ralph-sidebar';

  private view?: vscode.WebviewView;

  constructor(private context: vscode.ExtensionContext) {}

  public resolveWebviewView(
    webviewView: vscode.WebviewView,
    _context: vscode.WebviewViewResolveContext,
    _token: vscode.CancellationToken
  ): void | Thenable<void> {
    this.view = webviewView;

    webviewView.webview.options = {
      enableScripts: true,
      localResourceRoots: [this.context.extensionUri],
    };

    webviewView.webview.html = this.getHtmlContent(webviewView.webview);

    // Handle messages from the webview
    webviewView.webview.onDidReceiveMessage((data) => {
      switch (data.type) {
        case 'send':
          this.handleUserMessage(data.message);
          break;
        case 'clear':
          this.clearChat();
          break;
      }
    });
  }

  private handleUserMessage(message: string): void {
    console.log('Ralph received message:', message);

    // Send the message back with a response
    if (this.view) {
      const response = `Ralph received: "${message}". This is a test response.`;
      this.view.webview.postMessage({
        type: 'response',
        message: response,
      });
    }
  }

  private clearChat(): void {
    if (this.view) {
      this.view.webview.postMessage({
        type: 'clear',
      });
    }
  }

  private getHtmlContent(webview: vscode.Webview): string {
    const nonce = getNonce();

    return `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="Content-Security-Policy" content="default-src 'none'; style-src ${webview.cspSource}; script-src 'nonce-${nonce}';">
    <title>Ralph RLM</title>
    <style>
        * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
        }

        html, body {
            height: 100%;
            width: 100%;
        }

        body {
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
            background-color: var(--vscode-editor-background);
            color: var(--vscode-editor-foreground);
            display: flex;
            flex-direction: column;
            overflow: hidden;
        }

        .header {
            padding: 12px 16px;
            border-bottom: 1px solid var(--vscode-divider-background);
            background-color: var(--vscode-sideBar-background);
            flex-shrink: 0;
        }

        .header h2 {
            font-size: 14px;
            font-weight: 600;
            display: flex;
            align-items: center;
            gap: 8px;
        }

        .chat-container {
            flex: 1;
            display: flex;
            flex-direction: column;
            min-height: 0;
            overflow: hidden;
        }

        .messages {
            flex: 1;
            overflow-y: auto;
            overflow-x: hidden;
            padding: 16px;
            display: flex;
            flex-direction: column;
            gap: 12px;
            min-height: 0;
            word-break: break-word;
        }

        /* Scrollbar styling */
        .messages::-webkit-scrollbar {
            width: 8px;
        }

        .messages::-webkit-scrollbar-track {
            background: transparent;
        }

        .messages::-webkit-scrollbar-thumb {
            background-color: var(--vscode-scrollbarSlider-background);
            border-radius: 4px;
        }

        .messages::-webkit-scrollbar-thumb:hover {
            background-color: var(--vscode-scrollbarSlider-hoverBackground);
        }

        .message {
            display: flex;
            animation: slideIn 0.2s ease-out;
        }

        @keyframes slideIn {
            from {
                opacity: 0;
                transform: translateY(8px);
            }
            to {
                opacity: 1;
                transform: translateY(0);
            }
        }

        .message.user {
            justify-content: flex-end;
        }

        .message.assistant {
            justify-content: flex-start;
        }

        .message-content {
            max-width: 85%;
            padding: 10px 14px;
            border-radius: 8px;
            line-height: 1.5;
            font-size: 13px;
            word-wrap: break-word;
            overflow-wrap: break-word;
            white-space: pre-wrap;
        }

        .user .message-content {
            background-color: var(--vscode-button-background);
            color: var(--vscode-button-foreground);
            border-radius: 12px;
        }

        .assistant .message-content {
            background-color: var(--vscode-editor-lineHighlightBackground);
            color: var(--vscode-editor-foreground);
            border: 1px solid var(--vscode-divider-background);
            border-radius: 8px;
        }

        /* Input area fixed at bottom */
        .input-container {
            padding: 12px 16px 16px 16px;
            border-top: 1px solid var(--vscode-divider-background);
            background-color: var(--vscode-sideBar-background);
            display: flex;
            gap: 8px;
            flex-shrink: 0;
            flex-wrap: wrap;
            align-items: flex-end;
        }

        .input-wrapper {
            flex: 1;
            display: flex;
            gap: 8px;
            min-width: 0;
            align-items: flex-end;
        }

        textarea {
            flex: 1;
            padding: 8px 12px;
            border: 1px solid var(--vscode-input-border);
            border-radius: 6px;
            background-color: var(--vscode-input-background);
            color: var(--vscode-input-foreground);
            font-size: 13px;
            font-family: 'Monaco', 'Menlo', 'Ubuntu Mono', monospace;
            resize: none;
            max-height: 80px;
            line-height: 1.4;
            min-height: 34px;
        }

        textarea:focus {
            outline: none;
            border-color: var(--vscode-focusBorder);
            box-shadow: 0 0 0 1px var(--vscode-focusBorder);
        }

        textarea::placeholder {
            color: var(--vscode-input-placeholderForeground);
        }

        button {
            padding: 6px 14px;
            border: 1px solid var(--vscode-button-border);
            background-color: var(--vscode-button-background);
            color: var(--vscode-button-foreground);
            border-radius: 4px;
            cursor: pointer;
            font-size: 12px;
            font-weight: 500;
            transition: all 0.15s ease;
            flex-shrink: 0;
            height: 34px;
            display: flex;
            align-items: center;
            justify-content: center;
        }

        button:hover {
            background-color: var(--vscode-button-hoverBackground);
        }

        button:active {
            transform: scale(0.98);
        }

        button:disabled {
            opacity: 0.5;
            cursor: not-allowed;
        }

        .empty-state {
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
            height: 100%;
            color: var(--vscode-descriptionForeground);
            text-align: center;
            gap: 12px;
            padding: 20px;
        }

        .emoji {
            font-size: 48px;
            opacity: 0.8;
        }

        .empty-state-title {
            font-size: 14px;
            font-weight: 500;
            color: var(--vscode-editor-foreground);
        }

        .empty-state-hint {
            font-size: 12px;
            color: var(--vscode-descriptionForeground);
        }
    </style>
</head>
<body>
    <div class="header">
        <h2>🤖 Ralph RLM</h2>
    </div>

    <div class="chat-container">
        <div class="messages" id="messages">
            <div class="empty-state">
                <div class="emoji">🤖</div>
                <div class="empty-state-title">Ralph RLM</div>
                <div class="empty-state-hint">Ask me anything to get started</div>
            </div>
        </div>

        <div class="input-container">
            <div class="input-wrapper">
                <textarea id="input" placeholder="Ask Ralph..." rows="1"></textarea>
                <button id="send" title="Send message (Ctrl+Enter)">Send</button>
            </div>
            <button id="clear" title="Clear chat history">Clear</button>
        </div>
    </div>

    <script nonce="${nonce}">
        const vscode = acquireVsCodeApi();
        const messagesDiv = document.getElementById('messages');
        const inputEl = document.getElementById('input');
        const sendBtn = document.getElementById('send');
        const clearBtn = document.getElementById('clear');

        let hasMessages = false;

        // Auto-resize textarea
        function autoResizeTextarea() {
            inputEl.style.height = 'auto';
            const newHeight = Math.min(inputEl.scrollHeight, 80);
            inputEl.style.height = newHeight + 'px';
        }

        inputEl.addEventListener('input', autoResizeTextarea);
        inputEl.addEventListener('keydown', (e) => {
            if (e.key === 'Enter') {
                if (e.ctrlKey || e.metaKey) {
                    // Ctrl+Enter or Cmd+Enter: insert newline
                    return;
                } else if (!e.shiftKey) {
                    // Enter alone: send message
                    e.preventDefault();
                    sendMessage();
                }
            }
        });

        function clearEmptyState() {
            if (!hasMessages) {
                messagesDiv.innerHTML = '';
                hasMessages = true;
            }
        }

        function addMessage(text, isUser) {
            clearEmptyState();
            const messageEl = document.createElement('div');
            messageEl.className = \`message \${isUser ? 'user' : 'assistant'}\`;
            messageEl.innerHTML = \`<div class="message-content">\${escapeHtml(text)}</div>\`;
            messagesDiv.appendChild(messageEl);
            
            // Auto scroll to bottom - ensure it scrolls to the very end
            requestAnimationFrame(() => {
                messagesDiv.scrollTop = messagesDiv.scrollHeight;
            });
        }

        function escapeHtml(text) {
            const div = document.createElement('div');
            div.textContent = text;
            return div.innerHTML;
        }

        function sendMessage() {
            const message = inputEl.value.trim();
            if (message) {
                addMessage(message, true);
                vscode.postMessage({ type: 'send', message });
                inputEl.value = '';
                inputEl.style.height = 'auto';
                inputEl.focus();
            }
        }

        sendBtn.addEventListener('click', sendMessage);

        clearBtn.addEventListener('click', () => {
            messagesDiv.innerHTML = \`
                <div class="empty-state">
                    <div class="emoji">🤖</div>
                    <div class="empty-state-title">Ralph RLM</div>
                    <div class="empty-state-hint">Ask me anything to get started</div>
                </div>
            \`;
            hasMessages = false;
            inputEl.value = '';
            inputEl.style.height = 'auto';
            vscode.postMessage({ type: 'clear' });
        });

        // Handle messages from the extension
        window.addEventListener('message', (event) => {
            const message = event.data;
            if (message.type === 'response') {
                addMessage(message.message, false);
            }
        });

        // Focus input on load
        inputEl.focus();
    </script>
</body>
</html>`;
  }
}

function getNonce(): string {
  let text = '';
  const possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  for (let i = 0; i < 32; i++) {
    text += possible.charAt(Math.floor(Math.random() * possible.length));
  }
  return text;
}
