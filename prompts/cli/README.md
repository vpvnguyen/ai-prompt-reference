# CLI AI Prompts

## CLI Script to Auto-Feed Primer to GPT-4o / Claude API
To run:

Save as autoFeedPrimer.js

Add your OpenAI API key to .env file: OPENAI_API_KEY=your_api_key_here

Run with node autoFeedPrimer.js

For Claude 3 Opus, you’d switch the fetch URL and payload to Anthropic’s API format but keep the same idea: send the primer as your system prompt.