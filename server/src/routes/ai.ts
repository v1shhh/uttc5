import { Router } from 'express';
import { requireAuth } from '../middleware/auth.js';
import db from '../db/client.js';

const router = Router();

router.get('/test-env', (req, res) => {
  res.json({ keyLength: process.env.OPENROUTER_API_KEY ? process.env.OPENROUTER_API_KEY.length : 0, keyPreview: process.env.OPENROUTER_API_KEY ? process.env.OPENROUTER_API_KEY.substring(0, 5) : 'none' });
});

router.get('/recommendations', requireAuth, async (req, res) => {
  try {
    // 1. Gather Data Context
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

    // 2. Call OpenRouter
    let text = "[]";
    try {
      const response = await fetch("https://openrouter.ai/api/v1/chat/completions", {
        method: "POST",
        headers: {
          "Authorization": `Bearer ${process.env.OPENROUTER_API_KEY}`,
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          model: "openrouter/free",
          response_format: { type: "json_object" },
          messages: [
            { role: "system", content: `You must return ONLY a JSON response in the following format: { "recommendations": [ { "title": "string", "problem_observed": "string", "evidence": "string", "recommended_change": "string", "expected_impact": "string", "confidence_level": "High|Medium|Low", "priority": "High|Medium|Low", "target_page_or_element": "string" } ] }` },
            { role: "user", content: `You are an expert conversion rate optimization (CRO) consultant. Analyze the following analytics data from our website and output 3 high-impact recommendations to improve conversions and reduce friction.\n\nData Context: ${context}` }
          ]
        })
      });
      const json = await response.json();
      if (!response.ok) {
        throw new Error(json.error?.message || "Failed to fetch from OpenRouter");
      }
      text = json.choices[0].message.content || '{"recommendations":[]}';
    } catch (apiError: any) {
      console.error("OpenRouter API Error:", apiError);
      return res.status(500).json({ error: 'Failed to access AI recommendations. Please check API key configuration.', details: apiError.message });
    }

    try {
      const parsed = JSON.parse(text);
      const recommendations = parsed.recommendations || [];
      res.json({ success: true, recommendations });
    } catch (parseError) {
      console.error("Failed to parse OpenRouter output:", parseError, "\\nOriginal text:", text);
      res.status(500).json({ error: 'Failed to generate valid recommendations schema' });
    }

  } catch (err: any) {
    console.error('Recommendations error:', err);
    res.status(500).json({ error: 'Internal server error while generating recommendations', details: err.message });
  }
});

export default router;
