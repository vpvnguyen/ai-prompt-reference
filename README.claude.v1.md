# Claude - VS Code Extension 1

- [NPM Anthropic Claude SDK](https://www.npmjs.com/package/@anthropic-ai/sdk)
- [Get started with Claude](https://docs.anthropic.com/en/docs/get-started#install-the-sdk)
- [Choosing a Claude Model](https://docs.anthropic.com/en/docs/about-claude/models/choosing-a-model#choose-the-best-model-to-start-with)

**Step-by-step: Build a simple VS Code extension for Claude 3**

### 1. Prerequisites

- Node.js installed
- VS Code installed
- VS Code Extension Manager (`yo code`) — if not installed, run:

  ```bash
  npm install -g yo generator-code
  ```

### 2. Scaffold a New Extension

Run:

```bash
yo code
```

Choose:

- **New Extension (TypeScript)**
- **Name:** `claude3-assistant`
- **Identifier:** `claude3-assistant`
- **Description:** VS Code extension to query Claude 3 AI assistant
- Other defaults as you like

This creates a new folder with starter extension code.

### 3. Add Dependencies for HTTP Requests

Navigate into the folder and install dependencies:

```bash
cd claude3-assistant
npm install axios dotenv
```

Create a `.env` file in the root (make sure it’s added to `.gitignore`):

```ini
CLAUDE_API_KEY=your_claude_3_api_key_here
```

### 4. Modify Extension Code

Open `src/extension.ts` and replace the default command handler with:

```ts
import * as vscode from "vscode";
import axios from "axios";
import * as dotenv from "dotenv";
dotenv.config();

export function activate(context: vscode.ExtensionContext) {
  let disposable = vscode.commands.registerCommand(
    "claude3-assistant.queryClaude",
    async () => {
      // Get the current selection or ask for input
      const editor = vscode.window.activeTextEditor;
      let prompt = "";
      if (editor && !editor.selection.isEmpty) {
        prompt = editor.document.getText(editor.selection);
      } else {
        prompt =
          (await vscode.window.showInputBox({
            prompt: "Enter your prompt for Claude 3",
            placeHolder: "Explain this code, generate a snippet, etc.",
          })) || "";
      }

      if (!prompt.trim()) {
        vscode.window.showWarningMessage("No prompt provided.");
        return;
      }

      const apiKey = process.env.CLAUDE_API_KEY;
      if (!apiKey) {
        vscode.window.showErrorMessage(
          "Claude API key not set in environment variables."
        );
        return;
      }

      vscode.window.withProgress(
        {
          location: vscode.ProgressLocation.Notification,
          title: "Querying Claude 3...",
          cancellable: false,
        },
        async (progress) => {
          try {
            const response = await axios.post(
              "https://api.anthropic.com/v1/complete",
              {
                model: "claude-3-opus",
                prompt: `\n\nHuman: ${prompt}\n\nAssistant:`,
                max_tokens_to_sample: 300,
                stop_sequences: ["\n\nHuman:"],
              },
              {
                headers: {
                  "x-api-key": apiKey,
                  "Content-Type": "application/json",
                },
              }
            );

            const completion = response.data.completion.trim();

            // Show result in a new readonly document
            const doc = await vscode.workspace.openTextDocument({
              content: completion,
              language: "markdown",
            });
            await vscode.window.showTextDocument(doc, { preview: false });
          } catch (error: any) {
            vscode.window.showErrorMessage(
              "Claude API error: " + (error.response?.data || error.message)
            );
          }
        }
      );
    }
  );

  context.subscriptions.push(disposable);
}

export function deactivate() {}
```

### 5. Update `package.json`

Add your command in `contributes.commands`:

```json
"contributes": {
  "commands": [
    {
      "command": "claude3-assistant.queryClaude",
      "title": "Query Claude 3 AI Assistant"
    }
  ]
}
```

Add a keyboard shortcut (optional):

```json
"contributes": {
  "keybindings": [
    {
      "command": "claude3-assistant.queryClaude",
      "key": "ctrl+alt+c",
      "when": "editorTextFocus"
    }
  ]
}
```

### 6. Run and Test Your Extension

- Press **F5** in VS Code to launch an Extension Development Host.
- Open a code file, select some text or nothing.
- Press **Ctrl + Alt + C** or run the command from the Command Palette (`Ctrl + Shift + P`) → Query Claude 3 AI Assistant.
- See Claude 3’s response open in a new tab.

### 7. Optional Improvements

- Cache recent queries/responses.
- Add configuration for model, max tokens.
- Support streaming responses (more advanced).
- Show responses inline or in a sidebar panel.
