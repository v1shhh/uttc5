import { Router } from 'express';
import db from '../db/client.js';
import { requireAuth } from '../middleware/auth.js';

const router = Router();

router.get('/', requireAuth, (req, res) => {
  try {
    const status = req.query.status as string;
    let leads;
    if (status && status !== 'all') {
      leads = db.prepare('SELECT * FROM leads WHERE status = ? ORDER BY created_at DESC').all(status);
    } else {
      leads = db.prepare('SELECT * FROM leads ORDER BY created_at DESC').all();
    }
    res.json({ success: true, data: leads });
  } catch (err) {
    res.status(500).json({ success: false, error: 'Database error' });
  }
});

router.get('/:id', requireAuth, (req, res) => {
  try {
    const lead = db.prepare('SELECT * FROM leads WHERE id = ?').get(req.params.id);
    if (!lead) return res.status(404).json({ success: false, error: 'Not found' });
    res.json({ success: true, data: lead });
  } catch (err) {
    res.status(500).json({ success: false, error: 'Database error' });
  }
});

router.put('/:id/status', requireAuth, (req, res) => {
  try {
    const { status } = req.body;
    db.prepare('UPDATE leads SET status = ? WHERE id = ?').run(status, req.params.id);
    res.json({ success: true });
  } catch (err) {
    res.status(500).json({ success: false, error: 'Database error' });
  }
});

router.put('/:id/notes', requireAuth, (req, res) => {
  try {
    const { notes } = req.body;
    db.prepare('UPDATE leads SET notes = ? WHERE id = ?').run(notes, req.params.id);
    res.json({ success: true });
  } catch (err) {
    res.status(500).json({ success: false, error: 'Database error' });
  }
});


router.post('/', (req, res) => {
  try {
    const { name, company, email, phone, service_type, project_type, budget_range, timeline, message, source_page } = req.body;
    db.prepare(`
      INSERT INTO leads (name, company, email, phone, service_type, project_type, budget_range, timeline, message, source_page, status)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `).run(name, company, email, phone, service_type, project_type, budget_range, timeline, message, source_page, 'new');
    res.json({ success: true });
  } catch (err) {
    res.status(500).json({ success: false, error: 'Database error' });
  }
});

export default router;
