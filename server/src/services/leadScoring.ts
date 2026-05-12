interface LeadData {
  budget_range?: string;
  timeline?: string;
  service_type?: string;
  project_type?: string;
  company?: string;
  phone?: string;
  message?: string;
}

export function calculateLeadScore(lead: LeadData): number {
  let score = 0;

  // Budget Score (0-30 points) - 30% weight
  const budgetScore = getBudgetScore(lead.budget_range);
  score += budgetScore;

  // Timeline Score (0-25 points) - 25% weight
  const timelineScore = getTimelineScore(lead.timeline);
  score += timelineScore;

  // Project Type Score (0-20 points) - 20% weight
  const projectScore = getProjectTypeScore(lead.project_type, lead.service_type);
  score += projectScore;

  // Decision-Maker Score (0-15 points) - 15% weight
  const decisionMakerScore = getDecisionMakerScore(lead.company);
  score += decisionMakerScore;

  // Engagement Score (0-10 points) - 10% weight
  const engagementScore = getEngagementScore(lead);
  score += engagementScore;

  return Math.min(100, Math.round(score));
}

function getBudgetScore(budget?: string): number {
  if (!budget) return 10;

  const b = budget.toLowerCase();
  if (b.includes('500k+') || b.includes('500,000+')) return 30;
  if (b.includes('200k-500k') || b.includes('200,000')) return 25;
  if (b.includes('50k-200k') || b.includes('50,000')) return 20;
  if (b.includes('<50k') || b.includes('below')) return 5;
  if (b.includes('prefer not')) return 15; // Could be high value

  return 10;
}

function getTimelineScore(timeline?: string): number {
  if (!timeline) return 10;

  const t = timeline.toLowerCase();
  if (t.includes('urgent') || t.includes('weeks')) return 25;
  if (t.includes('1-3') || t.includes('1–3')) return 20;
  if (t.includes('3-6') || t.includes('3–6')) return 15;
  if (t.includes('planning')) return 5;

  return 10;
}

function getProjectTypeScore(projectType?: string, serviceType?: string): number {
  let score = 12; // Base score

  if (projectType) {
    const pt = projectType.toLowerCase();
    if (pt.includes('hospitality') || pt.includes('hotel') || pt.includes('resort')) {
      score = 20; // High-value commercial
    } else if (pt.includes('commercial') || pt.includes('retail')) {
      score = 18;
    } else if (pt.includes('government') || pt.includes('municipal')) {
      score = 16;
    } else if (pt.includes('residential')) {
      score = 14;
    }
  }

  // Bonus for complex services
  if (serviceType) {
    const st = serviceType.toLowerCase();
    if (st.includes('pool') || st.includes('water feature') || st.includes('fountain')) {
      score += 3; // Core business
    }
    if (st.includes('landscaping')) {
      score += 2; // Additional services
    }
  }

  return Math.min(20, score);
}

function getDecisionMakerScore(company?: string): number {
  if (!company) return 8; // Individual, might be homeowner

  const c = company.toLowerCase();

  // High-value indicators
  if (c.includes('hotel') || c.includes('resort') || c.includes('group') ||
      c.includes('properties') || c.includes('development')) {
    return 15; // Corporate/developer
  }

  if (c.includes('contractor') || c.includes('builder') || c.includes('construction')) {
    return 12; // B2B repeat potential
  }

  if (c.includes('private') || c.includes('personal')) {
    return 10; // Private client
  }

  return 13; // Has company = more serious
}

function getEngagementScore(lead: LeadData): number {
  let score = 5; // Base score for form submission

  // Detailed message indicates serious interest
  if (lead.message && lead.message.length > 100) {
    score += 3;
  }

  // Phone provided = higher intent
  if (lead.phone && lead.phone.length > 5) {
    score += 2;
  }

  return Math.min(10, score);
}
