import db from './client.js';
import bcrypt from 'bcryptjs';

const runMigrations = () => {
  db.exec(`
    CREATE TABLE IF NOT EXISTS leads (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      created_at TEXT DEFAULT (datetime('now')),
      name TEXT NOT NULL,
      company TEXT,
      email TEXT NOT NULL,
      phone TEXT,
      service_type TEXT,
      project_type TEXT,
      budget_range TEXT,
      timeline TEXT,
      message TEXT,
      source_page TEXT,
      source_utm TEXT,
      lead_score INTEGER DEFAULT 0,
      status TEXT DEFAULT 'new',
      notes TEXT
    );

    DROP TABLE IF EXISTS analytics_events;

    CREATE TABLE IF NOT EXISTS analytics_events (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      created_at TEXT DEFAULT (datetime('now')),
      session_id TEXT,
      user_id TEXT,
      event_type TEXT,
      event_label TEXT,
      page TEXT,
      scroll_pct INTEGER,
      referrer TEXT,
      user_agent TEXT,
      country TEXT,
      metadata TEXT,
      experiments TEXT
    );

    CREATE TABLE IF NOT EXISTS content (
      key TEXT PRIMARY KEY,
      value TEXT NOT NULL,
      updated_at TEXT DEFAULT (datetime('now'))
    );

    CREATE TABLE IF NOT EXISTS admin_users (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      username TEXT UNIQUE NOT NULL,
      password_hash TEXT NOT NULL,
      created_at TEXT DEFAULT (datetime('now'))
    );

    CREATE INDEX IF NOT EXISTS idx_leads_status ON leads(status);
    CREATE INDEX IF NOT EXISTS idx_leads_created_at ON leads(created_at);
    CREATE INDEX IF NOT EXISTS idx_analytics_event_type ON analytics_events(event_type);
    CREATE INDEX IF NOT EXISTS idx_analytics_created_at ON analytics_events(created_at);
    CREATE INDEX IF NOT EXISTS idx_analytics_page ON analytics_events(page);
  `);

  // Seed default admin
  const adminCheck = db.prepare('SELECT id FROM admin_users WHERE username = ?').get('admin');
  if (!adminCheck) {
    const passwordHash = bcrypt.hashSync('uttc2024', 10);
    db.prepare('INSERT INTO admin_users (username, password_hash) VALUES (?, ?)').run('admin', passwordHash);
  }

  // Seed default content
  const defaultContent = [
    { key: 'hero_eyebrow', value: "UAE'S WATER WORKS AUTHORITY SINCE 1976" },
    { key: 'hero_headline_1', value: 'We Build the Water Features' },
    { key: 'hero_headline_2', value: "That Define UAE'S Greatest Landmarks" },
    { key: 'hero_subline', value: "From the fountains of Emirates Palace to the iconic Diving Men of Dubai Mall — UTTC has been the trusted name behind UAE's most ambitious pools, water features, spas, and landscapes for nearly five decades." },
    { key: 'phone_main', value: '800-POOLS' },
    { key: 'email_main', value: 'poolsuae@poolsuae.com' },
    { key: 'address_dubai_office', value: 'Bay Square Building 3, Business Bay, Dubai' },
    { key: 'address_dubai_showroom', value: 'Kuwait Street, opp. Oman Insurance Bldg., Dubai' },
    { key: 'address_abudhabi', value: 'P.O. Box 41957, Abu Dhabi, UAE' }
  ];

  const insertContent = db.prepare('INSERT OR IGNORE INTO content (key, value) VALUES (?, ?)');

  db.transaction(() => {
    for (const item of defaultContent) {
      insertContent.run(item.key, item.value);
    }
  })();

  // No dummy leads seed
};

export default runMigrations;
