# CLI AI Prompts

## CLI Script to Auto-Feed Primer to GPT-4o / Claude API

```js
// autoFeedPrimer.js

import fetch from "node-fetch"; // npm i node-fetch@2
import dotenv from "dotenv";
dotenv.config();

const PRIMER = `
Project Primer:
- Stack: React (TypeScript), Node.js (Express)
- Testing: Vitest, Playwright
- CI/CD: GitHub Actions, Docker
- Code style: Functional components with hooks
- Notes: Use absolute imports, avoid 'any' types
`;

async function callGPT() {
  const apiKey = process.env.OPENAI_API_KEY;
  if (!apiKey) {
    console.error("Please set OPENAI_API_KEY in your environment");
    return;
  }

  const messages = [
    { role: "system", content: PRIMER },
    { role: "user", content: "Explain how to add a new React component." },
  ];

  const response = await fetch("https://api.openai.com/v1/chat/completions", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      model: "gpt-4o-mini",
      messages,
      max_tokens: 500,
    }),
  });

  const data = await response.json();
  console.log("AI response:", data.choices[0].message.content);
}

callGPT();
```

## How to Run

1. **Save the script:**  
  Save the code above as `autoFeedPrimer.js`.

2. **Set your API key:**  
  Create a `.env` file in the same directory and add your OpenAI API key:
  ```
  OPENAI_API_KEY=your_api_key_here
  ```

3. **Run the script:**  
  ```
  node autoFeedPrimer.js
  ```

> **Note:**  
> To use Claude 3 Opus, update the fetch URL and payload to match Anthropic’s API format. The approach remains the same: send your primer as the system prompt.
