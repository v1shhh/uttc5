import db from './db/client.js';
import { calculateLeadScore } from './services/leadScoring.js';

// Update all existing leads with calculated scores
const leads = db.prepare('SELECT * FROM leads WHERE lead_score = 0 OR lead_score IS NULL').all();

console.log(`Found ${leads.length} leads to update`);

for (const lead of leads) {
  const score = calculateLeadScore({
    budget_range: lead.budget_range,
    timeline: lead.timeline,
    service_type: lead.service_type,
    project_type: lead.project_type,
    company: lead.company,
    phone: lead.phone,
    message: lead.message
  });

  db.prepare('UPDATE leads SET lead_score = ? WHERE id = ?').run(score, lead.id);
  console.log(`Updated lead ${lead.id} (${lead.name}): score = ${score}`);
}

console.log('Done updating lead scores');
