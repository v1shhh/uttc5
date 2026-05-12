import { Router } from 'express';
import db from '../db/client.js';
import { requireAuth } from '../middleware/auth.js';
import { analyticsRateLimiter } from '../middleware/rateLimit.js';

const router = Router();

router.post('/', analyticsRateLimiter, (req, res) => {
  try {
    const { session_id, user_id, event_type, event_label, page, scroll_pct, referrer, metadata, experiments } = req.body;
    const user_agent = req.headers['user-agent']?.substring(0, 255);
    const country = req.headers['cf-ipcountry'] as string || null;

    if (!session_id || !event_type || !page) {
      return res.status(400).json({ error: 'Missing required fields' });
    }

    db.prepare(`
      INSERT INTO analytics_events (session_id, user_id, event_type, event_label, page, scroll_pct, referrer, user_agent, country, metadata, experiments)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `).run(
      session_id,
      user_id || null,
      event_type,
      event_label || null,
      page,
      scroll_pct || null,
      referrer || null,
      user_agent || null,
      country,
      metadata ? JSON.stringify(metadata) : null,
      experiments ? JSON.stringify(experiments) : null
    );

    res.json({ ok: true });
  } catch (err) {
    console.error('Analytics error:', err);
    res.status(500).json({ error: 'Internal server error' });
  }
});

router.post('/batch', analyticsRateLimiter, (req, res) => {
  try {
    const { events } = req.body;

    if (!Array.isArray(events) || events.length === 0) {
      return res.status(400).json({ error: 'Invalid batch format' });
    }

    if (events.length > 100) {
      return res.status(400).json({ error: 'Batch too large' });
    }

    const user_agent = req.headers['user-agent']?.substring(0, 255);
    const country = req.headers['cf-ipcountry'] as string || null;

    const insert = db.prepare(`
      INSERT INTO analytics_events (session_id, user_id, event_type, event_label, page, scroll_pct, referrer, user_agent, country, metadata, experiments)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `);

    const insertMany = db.transaction((events: any[]) => {
      for (const event of events) {
        if (!event.session_id || !event.event_type || !event.page) continue;

        insert.run(
          event.session_id,
          event.user_id || null,
          event.event_type,
          event.event_label || null,
          event.page,
          event.scroll_pct || null,
          event.referrer || null,
          user_agent || null,
          country,
          event.metadata ? JSON.stringify(event.metadata) : null,
          event.experiments ? JSON.stringify(event.experiments) : null
        );
      }
    });

    insertMany(events);

    res.json({ ok: true, inserted: events.length });
  } catch (err) {
    console.error('Batch analytics error:', err);
    res.status(500).json({ error: 'Internal server error' });
  }
});

router.get('/summary', requireAuth, (req, res) => {
  try {
    const totalLeads = db.prepare("SELECT COUNT(*) as count FROM leads WHERE status != 'deleted'").get() as {count: number};
    const newLeads = db.prepare("SELECT COUNT(*) as count FROM leads WHERE created_at >= datetime('now', '-7 days') AND status != 'deleted'").get() as {count: number};
    const hotLeads = db.prepare("SELECT COUNT(*) as count FROM leads WHERE lead_score >= 70 AND status != 'deleted'").get() as {count: number};
    
    const leadsByDay = db.prepare(`
      SELECT date(created_at) as date, COUNT(*) as count 
      FROM leads WHERE created_at >= datetime('now', '-30 days') AND status != 'deleted'
      GROUP BY date(created_at) ORDER BY date ASC
    `).all();

    const leadsByService = db.prepare("SELECT service_type as name, COUNT(*) as value FROM leads WHERE status != 'deleted' GROUP BY service_type").all();
    const leadsByStatus = db.prepare("SELECT status, COUNT(*) as count FROM leads WHERE status != 'deleted' GROUP BY status").all();
    
    const pageViews = db.prepare("SELECT page as name, COUNT(*) as value FROM analytics_events WHERE event_type = 'page_view' GROUP BY page ORDER BY value DESC LIMIT 10").all();
    const ctaClicks = db.prepare("SELECT event_label as name, COUNT(*) as value FROM analytics_events WHERE event_type = 'cta_click' GROUP BY event_label ORDER BY value DESC LIMIT 10").all();
    
    const uniqueSessionsPV = (db.prepare("SELECT COUNT(DISTINCT session_id) as count FROM analytics_events WHERE event_type = 'page_view'").get() as any).count;
    const formSubmits = (db.prepare("SELECT COUNT(*) as count FROM analytics_events WHERE event_type = 'form_submit'").get() as any).count;
    const conversionRate = uniqueSessionsPV > 0 ? ((formSubmits / uniqueSessionsPV) * 100).toFixed(2) : 0;

    res.json({
      success: true,
      data: {
        totalLeads: totalLeads.count,
        newLeads: newLeads.count,
        hotLeads: hotLeads.count,
        conversionRate,
        leadsByDay,
        leadsByService,
        leadsByStatus,
        pageViews,
        ctaClicks
      }
    });
  } catch (err) {
    console.error('summary err', err);
    res.status(500).json({ error: 'Internal server error' });
  }
});

export default router;
