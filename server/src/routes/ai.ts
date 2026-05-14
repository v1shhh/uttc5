import { Router } from 'express';
import { requireAuth } from '../middleware/auth.js';
import db from '../db/client.js';
import { config } from '../config.js';

const router = Router();

router.get('/test-env', (req, res) => {
  res.json({ keyLength: config.OPENROUTER_API_KEY ? config.OPENROUTER_API_KEY.length : 0, keyPreview: config.OPENROUTER_API_KEY ? config.OPENROUTER_API_KEY.substring(0, 5) : 'none' });
});

router.get('/recommendations', requireAuth, async (req, res) => {
  const requestStart = Date.now();
  console.log('[DEBUG] Recommendations request received');

  try {
    // 1. Gather Data Context
    const dbStart = Date.now();
    const summaryData = db.prepare(`
      SELECT event_type, COUNT(*) as count
      FROM analytics_events
      GROUP BY event_type
    `).all();

    const ctaData = db.prepare(`
      SELECT event_label, COUNT(*) as count
      FROM analytics_events
      WHERE event_type = 'cta_click'
      GROUP BY event_label
    `).all();

    const scrollData = db.prepare(`
      SELECT page, AVG(scroll_pct) as avg_scroll
      FROM analytics_events
      WHERE event_type = 'scroll_depth'
      GROUP BY page
    `).all();

    const recentErrors = db.prepare(`
      SELECT * FROM analytics_events
      WHERE event_type IN ('rage_click', 'dead_click')
      ORDER BY created_at DESC LIMIT 50
    `).all();

    const context = JSON.stringify({ summaryData, ctaData, scrollData, recentErrors });
    console.log('[DEBUG] DB queries took', Date.now() - dbStart, 'ms');
    console.log('[DEBUG] Analytics data:', {
      events: summaryData.length,
      ctas: ctaData.length,
      pages: scrollData.length,
      errors: recentErrors.length
    });

    // 2. Call OpenRouter with fallback models
    const FREE_MODELS = [
      "openrouter/free",
      "inclusionai/ring-2.6-1t:free",
      "google/gemma-4-31b-it:free",
      "nvidia/nemotron-3-super-120b-a12b:free"
    ];

    const messages = [
      { role: "system", content: `You must return ONLY a JSON response in the following format: { "recommendations": [ { "title": "string", "problem_observed": "string", "evidence": "string", "recommended_change": "string", "expected_impact": "string", "confidence_level": "High|Medium|Low", "priority": "High|Medium|Low", "target_page_or_element": "string" } ] }` },
      { role: "user", content: `You are an expert conversion rate optimization (CRO) consultant. Analyze the following analytics data from our website and output 3 high-impact recommendations to improve conversions and reduce friction.\n\nData Context: ${context}` }
    ];

    let text = "[]";
    let lastError: any = null;

    console.log('[DEBUG] Starting AI model fallback chain with', FREE_MODELS.length, 'models');

    for (let i = 0; i < FREE_MODELS.length; i++) {
      const model = FREE_MODELS[i];
      const modelStart = Date.now();
      console.log(`[DEBUG] Trying model ${i + 1}/${FREE_MODELS.length}: ${model}`);

      try {
        const response = await fetch("https://openrouter.ai/api/v1/chat/completions", {
          method: "POST",
          headers: {
            "Authorization": `Bearer ${config.OPENROUTER_API_KEY}`,
            "Content-Type": "application/json"
          },
          body: JSON.stringify({ model, messages })
        });

        const json = await response.json();
        const modelTime = Date.now() - modelStart;

        if (response.ok && json.choices?.[0]?.message?.content) {
          text = json.choices[0].message.content;
          console.log(`[DEBUG] ✓ Model ${model} succeeded in ${modelTime}ms`);
          console.log(`[DEBUG] Response length: ${text.length} chars`);
          break;
        }

        lastError = json.error?.message || `Model ${model} failed`;
        console.log(`[DEBUG] ✗ Model ${model} failed after ${modelTime}ms:`, lastError);
      } catch (err: any) {
        const modelTime = Date.now() - modelStart;
        lastError = err.message;
        console.log(`[DEBUG] ✗ Model ${model} error after ${modelTime}ms:`, err.message);
      }
    }

    if (text === "[]") {
      const totalTime = Date.now() - requestStart;
      console.error("[DEBUG] ✗ All models failed after", totalTime, "ms. Last error:", lastError);
      return res.status(500).json({ error: 'Failed to access AI recommendations. All models failed.', details: lastError });
    }

    try {
      const parseStart = Date.now();
      // Strip markdown code blocks if present
      let cleanText = text.trim();
      if (cleanText.startsWith('```')) {
        console.log('[DEBUG] Stripping markdown wrapper from response');
        cleanText = cleanText.replace(/^```(?:json)?\n?/, '').replace(/\n?```$/, '').trim();
      }

      const parsed = JSON.parse(cleanText);
      const recommendations = parsed.recommendations || [];
      console.log('[DEBUG] JSON parse took', Date.now() - parseStart, 'ms');
      console.log('[DEBUG] Generated', recommendations.length, 'recommendations');

      const totalTime = Date.now() - requestStart;
      console.log('[DEBUG] ✓ Total request completed in', totalTime, 'ms');

      res.json({ success: true, recommendations });
    } catch (parseError) {
      const totalTime = Date.now() - requestStart;
      console.error("[DEBUG] ✗ JSON parse failed after", totalTime, "ms:", parseError);
      console.error("[DEBUG] Original text:", text.substring(0, 200) + '...');
      res.status(500).json({ error: 'Failed to generate valid recommendations schema' });
    }

  } catch (err: any) {
    const totalTime = Date.now() - requestStart;
    console.error('[DEBUG] ✗ Fatal error after', totalTime, 'ms:', err);
    res.status(500).json({ error: 'Internal server error while generating recommendations', details: err.message });
  }
});

export default router;
