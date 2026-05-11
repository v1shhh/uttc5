import { Router } from 'express';
import db from '../db/client.js';
import { requireAuth } from '../middleware/auth.js';

const router = Router();

router.get('/', (req, res) => {
  try {
    const content = db.prepare('SELECT key, value FROM content').all();
    res.json({ success: true, data: content });
  } catch (err) {
    res.status(500).json({ success: false, error: 'Database error' });
  }
});

router.put('/:key', requireAuth, (req, res) => {
  try {
    const { value } = req.body;
    db.prepare(`
      INSERT INTO content (key, value) VALUES (?, ?)
      ON CONFLICT(key) DO UPDATE SET value = excluded.value, updated_at = datetime('now')
    `).run(req.params.key, value);
    res.json({ success: true });
  } catch (err) {
    res.status(500).json({ success: false, error: 'Database error' });
  }
});

export default router;
