# IDE Extensions for AI Prompts

## VS Code Extension Snippet to Load Primer at AI Chat Start

```js
// extension.ts (simplified example)

import * as vscode from "vscode";

const primerText = `# Project Primer

- Stack: React (TypeScript), Node.js (Express)
- Testing: Vitest, Playwright
- CI/CD: GitHub Actions, Docker
- Code style: Functional components with hooks
- Notes: Use absolute imports, avoid 'any' types
`;

export function activate(context: vscode.ExtensionContext) {
  vscode.commands.registerCommand("primerAI.startSession", async () => {
    // Replace this with your AI chat API/send message function
    const sendMessageToAIChat = async (message: string) => {
      // Example placeholder: implement your own integration here
      vscode.window.showInformationMessage("Sending primer to AI chat...");
      console.log("Primer sent to AI:", message);
    };

    await sendMessageToAIChat(primerText);
  });

  // Optional: auto-run on extension activation or AI chat start
  // activate automatically or bind to a keybinding/command palette
}
```

This snippet demonstrates how to automatically inject your project primer into an AI chat session in VS Code. It assumes you have an AI chat panel that can receive programmatic messages (such as with Continue.dev or a custom integration).

To use this, install the extension or add the command to your existing AI plugin. When the command is triggered, your primer is sent to the chat automatically.

Replace the `sendMessageToAIChat` function with your actual API call or the appropriate VS Code AI integration command.
