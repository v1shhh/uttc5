# AI Search Optimization Plan (GEO/LLM SEO)

With the rise of Perplexity, SearchGPT, Gemini, and Claude, "AI Search" or "Generative Engine Optimization" (GEO) requires different structuring than traditional Google search.

## 1. LLM Context Files
LLMs look for easily digestible context files in the root of the domain.
- **`/robots.txt`**: Guide standard and AI bots. Must explicitly allow AI bot crawling if beneficial, while managing crawl budgets.
- **`/llms.txt`**: Provide a concise markdown-based summary of the website for LLM consumption. (Standardizing per llmstxt.org proposal).
- **`/llms-full.txt`**: Provide an exhaustive markdown representation of the site's content and structure.

## 2. AI-Friendly Semantic Structuring
LLMs summarize information by chunking. If the chunks are noisy or disconnected, precision drops.
- **Clear Information Density**: Remove fluff; present raw, factual density.
- **Lists and Tables**: LLMs love extracting bullet points, numbered lists, and `<table>` structures.
- **Direct Answers**: Provide clear `<p>` tags immediately following an `H2` or `H3` question (e.g., for FAQs).
- **Explicit Relationships**: Ensure that services, features, and benefits are explicitly linked in text.

## 3. Brand Entity Establishment
- Reinforce who you are, what you do, and who you serve in a highly concise format.
- Ensure the terminology (e.g., "sales funnel optimization", "admin intelligence layer") is exceptionally consistent so the LLM vectorizes them heavily grouped alongside the brand.

## Execution Steps
1. Build `/robots.txt` explicitly referencing the sitemap and allowing AI agent crawlers (like `CCBot`, `GPTBot`, `Anthropic-ai`, `Google-Extended`).
2. Construct `/llms.txt` with a markdown summary of the business, its core pitch, and its specific service offerings.
3. Ensure the React app's `index.html` has a `<meta name="title">` and semantic structure that a headless browser or simple scraper can ingest easily.
4. Ensure express backend serves `robots.txt` and `llms.txt` statically from the root path.
