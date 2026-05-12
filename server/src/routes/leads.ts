import { Router } from 'express';
import db from '../db/client.js';
import { requireAuth } from '../middleware/auth.js';
import { calculateLeadScore } from '../services/leadScoring.js';
import { sendLeadNotification, sendLeadConfirmation } from '../services/emailService.js';

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


router.post('/', async (req, res) => {
  try {
    const { name, company, email, phone, service_type, project_type, budget_range, timeline, message, source_page } = req.body;

    // Validate required fields
    if (!name || !email) {
      return res.status(400).json({ success: false, error: 'Name and email are required' });
    }

    // Calculate lead score
    const lead_score = calculateLeadScore({
      budget_range,
      timeline,
      service_type,
      project_type,
      company,
      phone,
      message
    });
    console.log('[Lead Scoring] Calculated score:', lead_score, 'for lead:', name);

    const result = db.prepare(`
      INSERT INTO leads (name, company, email, phone, service_type, project_type, budget_range, timeline, message, source_page, status, lead_score)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `).run(name, company, email, phone, service_type, project_type, budget_range, timeline, message, source_page, 'new', lead_score);

    const leadId = result.lastInsertRowid;
    const leadData = {
      id: leadId,
      name,
      company,
      email,
      phone,
      service_type,
      project_type,
      budget_range,
      timeline,
      message,
      source_page,
      lead_score,
      created_at: new Date()
    };

    // Send emails asynchronously (non-blocking)
    Promise.all([
      sendLeadNotification(leadData).catch(err => console.error('[Email] Admin notification failed:', err.error)),
      sendLeadConfirmation(leadData).catch(err => console.error('[Email] Confirmation failed:', err.error))
    ]);

    res.json({ success: true, data: { id: leadId, lead_score } });
  } catch (err) {
    console.error('Lead creation error:', err);
    res.status(500).json({ success: false, error: 'Database error' });
  }
});

export default router;
