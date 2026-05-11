import { Router } from 'express';
import db from '../db/client.js';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { requireAuth } from '../middleware/auth.js';

const router = Router();
const JWT_SECRET = process.env.JWT_SECRET || 'fallback-secret';

router.post('/login', (req, res) => {
  console.log('[DEBUG] Login attempt received', req.body.username);
  try {
    const { username, password } = req.body;
    
    if (!username || !password) {
      console.log('[DEBUG] Missing username or password');
      return res.status(400).json({ success: false, error: 'Username and password required' });
    }

    const start = Date.now();
    const user = db.prepare('SELECT * FROM admin_users WHERE username = ?').get(username) as any;
    console.log('[DEBUG] DB query took', Date.now() - start, 'ms');
    
    if (!user) {
      console.log('[DEBUG] User not found:', username);
      return res.status(401).json({ success: false, error: 'Invalid credentials' });
    }

    const bcryptStart = Date.now();
    const isValid = bcrypt.compareSync(password, user.password_hash);
    console.log('[DEBUG] bcrypt took', Date.now() - bcryptStart, 'ms. Valid:', isValid);

    if (!isValid) {
      return res.status(401).json({ success: false, error: 'Invalid credentials' });
    }
    
    const token = jwt.sign({ id: user.id, username: user.username }, JWT_SECRET, { expiresIn: '24h' });
    console.log('[DEBUG] Login successful for', username);
    res.json({ success: true, token });
  } catch (err) {
    console.error('[DEBUG] Login Error:', err);
    res.status(500).json({ success: false, error: 'Database error or internal error' });
  }
});

export default router;
