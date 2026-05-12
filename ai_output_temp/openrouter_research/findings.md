# OpenRouter API Research - Free Models & Implementation (2026)

## 1. Free Model Names/IDs

All free models use `:free` suffix or are inherently free. Current list (May 2026):

### Coding/Agent Models
- `inclusionai/ring-2.6-1t:free` - 1T params, 63B active, 262K context
- `baidu/cobuddy:free` - Code generation, 131K context, tool support
- `poolside/laguna-xs.2:free` - Efficient coding agent, 131K context
- `poolside/laguna-m.1:free` - Flagship coding agent, 131K context
- `qwen/qwen3-coder:free` - Coding specialist

### General Purpose
- `google/gemma-4-26b-a4b-it:free` - 26B MoE, multimodal, 262K context
- `google/gemma-4-31b-it:free` - 31B dense, multimodal, 262K context
- `nvidia/nemotron-3-super-120b-a12b:free` - 120B hybrid MoE, 262K context
- `nvidia/nemotron-3-nano-30b-a3b:free` - 30B model
- `nvidia/nemotron-nano-9b-v2:free` - 9B efficient model
- `qwen/qwen3-next-80b-a3b-instruct:free` - 80B instruction model
- `z-ai/glm-4.5-air:free` - GLM model
- `minimax/minimax-m2.5:free` - MiniMax model

### Reasoning Models
- `arcee-ai/trinity-large-thinking:free` - Open-source reasoning, 262K context, 80K output
- `nvidia/nemotron-3-nano-omni-30b-a3b-reasoning:free` - Multimodal reasoning
- `liquid/lfm-2.5-1.2b-thinking:free` - Thinking model
- `liquid/lfm-2.5-1.2b-instruct:free` - Instruct model

### Specialized
- `baidu/qianfan-ocr-fast:free` - OCR specialist, 65K context
- `nvidia/nemotron-nano-12b-v2-vl:free` - Vision-language model
- `openai/gpt-oss-120b:free` - Open source GPT variant
- `openai/gpt-oss-20b:free` - Smaller OSS variant

### Meta Models
- `openrouter/auto` - Auto router (variable pricing based on selected model)
- `openrouter/owl-alpha` - 1M+ context, agentic workloads (FREE)
- `openrouter/free` - Free model router (FREE)

## 2. openrouter/auto Status

**YES, it exists**: `openrouter/auto` is a valid model ID.

**How it works**:
- Meta-model that routes to 38+ candidate models
- Automatically selects best model for your prompt
- Variable pricing (charges based on routed model)
- 2M token context window
- Released Nov 8, 2023

**For free routing**: Use `openrouter/free` instead - routes only to free models.

## 3. API Request Format

### Required Headers
```javascript
{
  "Authorization": "Bearer YOUR_API_KEY",
  "Content-Type": "application/json"
}
```

### Optional but Recommended Headers
```javascript
{
  "HTTP-Referer": "https://your-app-url.com",  // App identifier for rankings
  "X-Title": "Your App Name"                    // Display name in dashboard
}
```

### Basic Request
```javascript
const response = await fetch("https://openrouter.ai/api/v1/chat/completions", {
  method: "POST",
  headers: {
    "Authorization": `Bearer ${process.env.OPENROUTER_API_KEY}`,
    "Content-Type": "application/json",
    "HTTP-Referer": "https://your-site.com",
    "X-Title": "Your App"
  },
  body: JSON.stringify({
    model: "inclusionai/ring-2.6-1t:free",
    messages: [
      { role: "system", content: "You are a helpful assistant." },
      { role: "user", content: "Hello!" }
    ]
  })
});
```

## 4. Fallback Logic Implementation

### Method 1: Provider-Level Fallbacks (Built-in)
```javascript
{
  model: "inclusionai/ring-2.6-1t:free",
  messages: [...],
  provider: {
    allow_fallbacks: true  // Default: true
  }
}
```

**Behavior**:
- `true` (default): When primary provider unavailable, uses next best provider
- `false`: Only use primary provider, return error if unavailable

### Method 2: Model Array Fallbacks
```javascript
{
  models: [
    "inclusionai/ring-2.6-1t:free",
    "poolside/laguna-m.1:free",
    "google/gemma-4-31b-it:free"
  ],
  messages: [...]
}
```

Tries models in order until one succeeds.

### Method 3: Manual Retry Logic
```javascript
const FREE_MODELS = [
  "inclusionai/ring-2.6-1t:free",
  "poolside/laguna-m.1:free",
  "google/gemma-4-31b-it:free",
  "nvidia/nemotron-3-super-120b-a12b:free"
];

async function callWithFallback(messages) {
  for (const model of FREE_MODELS) {
    try {
      const response = await fetch("https://openrouter.ai/api/v1/chat/completions", {
        method: "POST",
        headers: {
          "Authorization": `Bearer ${process.env.OPENROUTER_API_KEY}`,
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ model, messages })
      });

      if (response.ok) {
        return await response.json();
      }

      // Log error and try next model
      const error = await response.json();
      console.warn(`Model ${model} failed:`, error);

    } catch (err) {
      console.warn(`Model ${model} error:`, err.message);
    }
  }

  throw new Error("All fallback models failed");
}
```

### Method 4: Use Free Router
```javascript
{
  model: "openrouter/free",  // Automatically routes to best free model
  messages: [...]
}
```

## 5. Error Handling Patterns

### Response Structure
```javascript
const json = await response.json();

if (!response.ok) {
  // Error response
  console.error(json.error?.message || "Unknown error");
  throw new Error(json.error?.message);
}

// Success response
const content = json.choices[0].message.content;
```

### Common Error Codes
- 401: Invalid API key
- 429: Rate limited
- 500: Provider error (trigger fallback)
- 503: Service unavailable (trigger fallback)

### Robust Implementation
```javascript
async function callOpenRouter(model, messages, retries = 3) {
  for (let i = 0; i < retries; i++) {
    try {
      const response = await fetch("https://openrouter.ai/api/v1/chat/completions", {
        method: "POST",
        headers: {
          "Authorization": `Bearer ${process.env.OPENROUTER_API_KEY}`,
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ model, messages })
      });

      const json = await response.json();

      if (!response.ok) {
        // Check if retryable error
        if (response.status === 429 || response.status >= 500) {
          if (i < retries - 1) {
            await new Promise(r => setTimeout(r, 1000 * (i + 1))); // Exponential backoff
            continue;
          }
        }
        throw new Error(json.error?.message || "API request failed");
      }

      return json;

    } catch (err) {
      if (i === retries - 1) throw err;
      await new Promise(r => setTimeout(r, 1000 * (i + 1)));
    }
  }
}
```

## 6. Current Project Implementation

File: `C:\coding projects\uttc\uttc3\server\src\routes\ai.ts`

Currently uses:
- Model: `meta-llama/llama-3.2-3b-instruct:free`
- No fallback logic
- Basic error handling

### Recommended Improvements
1. Add fallback models array
2. Implement retry logic with exponential backoff
3. Add HTTP-Referer and X-Title headers
4. Consider using `openrouter/free` for automatic routing
5. Add provider preferences with `allow_fallbacks: true`

## 7. Best Practices for Free Tier

1. **Use model arrays for fallbacks**
   ```javascript
   models: ["inclusionai/ring-2.6-1t:free", "poolside/laguna-m.1:free"]
   ```

2. **Add optional headers for tracking**
   ```javascript
   "HTTP-Referer": process.env.APP_URL,
   "X-Title": "UTTC Analytics"
   ```

3. **Enable provider fallbacks**
   ```javascript
   provider: { allow_fallbacks: true }
   ```

4. **Implement exponential backoff for retries**

5. **Consider `openrouter/free` for simplicity**
   - Automatically routes to best available free model
   - No need to maintain model list

6. **Handle rate limits gracefully**
   - Catch 429 errors
   - Implement backoff strategy
   - Consider queueing requests

## 8. Example Production-Ready Implementation

```javascript
const FREE_MODELS = [
  "inclusionai/ring-2.6-1t:free",
  "poolside/laguna-m.1:free",
  "google/gemma-4-31b-it:free"
];

async function generateRecommendations(context) {
  const messages = [
    { role: "system", content: "You are a CRO expert..." },
    { role: "user", content: `Analyze: ${context}` }
  ];

  // Try with model array fallback first
  try {
    const response = await fetch("https://openrouter.ai/api/v1/chat/completions", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${process.env.OPENROUTER_API_KEY}`,
        "Content-Type": "application/json",
        "HTTP-Referer": process.env.APP_URL,
        "X-Title": "UTTC Analytics"
      },
      body: JSON.stringify({
        models: FREE_MODELS,  // Array fallback
        messages,
        provider: {
          allow_fallbacks: true  // Provider-level fallback
        }
      })
    });

    const json = await response.json();

    if (!response.ok) {
      throw new Error(json.error?.message || "API failed");
    }

    return json.choices[0].message.content;

  } catch (err) {
    console.error("OpenRouter error:", err);

    // Final fallback: use free router
    const response = await fetch("https://openrouter.ai/api/v1/chat/completions", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${process.env.OPENROUTER_API_KEY}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        model: "openrouter/free",
        messages
      })
    });

    const json = await response.json();
    if (!response.ok) throw new Error("All fallbacks failed");

    return json.choices[0].message.content;
  }
}
```

## Summary

- **25+ free models available** with `:free` suffix
- **`openrouter/auto` exists** but has variable pricing
- **`openrouter/free` recommended** for free-only routing
- **Three fallback methods**: provider preferences, model arrays, manual retry
- **Headers**: Authorization required, HTTP-Referer/X-Title optional
- **Best practice**: Use model arrays + provider fallbacks + retry logic
