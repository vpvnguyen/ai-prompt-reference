# Claude - VS Code Extension 2

- [NPM Anthropic Claude SDK](https://www.npmjs.com/package/@anthropic-ai/sdk)
- [Get started with Claude](https://docs.anthropic.com/en/docs/get-started#install-the-sdk)

### File Structure

claude3-assistant/
├── .vscode/
│ ├── launch.json
├── node_modules/
├── src/
│ └── extension.ts
├── .gitignore
├── .env
├── package.json
├── package-lock.json
├── README.md
├── tsconfig.json

`.vscode/launch.json`

- This config lets you run the extension in a VS Code Extension Development Host:

```json
{
  "version": "0.2.0",
  "configurations": [
    {
      "name": "Run Extension",
      "type": "extensionHost",
      "request": "launch",
      "runtimeExecutable": "${execPath}",
      "args": ["--extensionDevelopmentPath=${workspaceFolder}"],
      "outFiles": ["${workspaceFolder}/out/**/*.js"],
      "preLaunchTask": "tsc: build - tsconfig.json"
    }
  ]
}
```

`src/extension.ts`

- The main extension code:

```ts
import * as vscode from "vscode";
import axios from "axios";
import * as dotenv from "dotenv";
dotenv.config();

export function activate(context: vscode.ExtensionContext) {
  let disposable = vscode.commands.registerCommand(
    "claude3-assistant.queryClaude",
    async () => {
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
        async () => {
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

`package.json`

- Basic package manifest with your command and keybinding:

```json
{
  "name": "claude3-assistant",
  "displayName": "Claude 3 Assistant",
  "description": "VS Code extension to query Claude 3 AI assistant",
  "version": "0.0.1",
  "engines": {
    "vscode": "^1.70.0"
  },
  "categories": ["Other"],
  "activationEvents": ["onCommand:claude3-assistant.queryClaude"],
  "main": "./out/extension.js",
  "contributes": {
    "commands": [
      {
        "command": "claude3-assistant.queryClaude",
        "title": "Query Claude 3 AI Assistant"
      }
    ],
    "keybindings": [
      {
        "command": "claude3-assistant.queryClaude",
        "key": "ctrl+alt+c",
        "when": "editorTextFocus"
      }
    ]
  },
  "scripts": {
    "vscode:prepublish": "npm run compile",
    "compile": "tsc -p ./",
    "watch": "tsc -watch -p ./",
    "pretest": "npm run compile",
    "test": "node ./out/test/runTest.js"
  },
  "devDependencies": {
    "@types/node": "^18.11.9",
    "@types/vscode": "^1.70.0",
    "typescript": "^4.8.4",
    "vscode-test": "^1.6.2"
  },
  "dependencies": {
    "axios": "^1.3.4",
    "dotenv": "^16.0.3"
  }
}
```

`tsconfig.json`

```json
{
  "compilerOptions": {
    "module": "commonjs",
    "target": "es2020",
    "outDir": "out",
    "lib": ["es2020"],
    "sourceMap": true,
    "rootDir": "src",
    "strict": true,
    "noImplicitReturns": true,
    "noUnusedLocals": true,
    "moduleResolution": "node",
    "esModuleInterop": true
  },
  "exclude": ["node_modules", ".vscode-test"]
}
```

`.env`

```sh
CLAUDE_API_KEY=your_actual_claude_3_api_key_here
```

# Claude 3 Assistant VS Code Extension

Query Claude 3 AI assistant directly from VS Code.

## Usage

- Select some text or run command with no selection.
- Run command `Query Claude 3 AI Assistant` from Command Palette (`Ctrl+Shift+P`) or press `Ctrl+Alt+C`.
- The AI response will open in a new tab.

## Setup

1. Get your Claude 3 API key from Anthropic.
2. Create a `.env` file in the extension root: `CLAUDE_API_KEY=your_api_key_here`
3. Run and debug the extension with `F5` in VS Code.

## How to build & run

Install dependencies:

```sh
npm install
```

Compile TypeScript:

```sh
npm run compile
```

Run the extension in Extension Development Host: Press `F5` in VS Code.
