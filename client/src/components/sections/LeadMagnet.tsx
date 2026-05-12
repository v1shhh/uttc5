import React from 'react';
import ScrollReveal from '../ui/ScrollReveal';
import BudgetCalculator from '../ui/BudgetCalculator';

export default function LeadMagnet() {
  return (
    <section id="discovery" style={{
      padding: 'var(--space-xxl) 0',
      background: 'linear-gradient(to bottom, var(--color-deep), var(--color-abyss))',
    }}>
      <div className="container">
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 300px), 1fr))', gap: 'var(--space-xl)', alignItems: 'center' }}>
          
          <ScrollReveal>
            <div style={{ maxWidth: '600px' }}>
              <div style={{ display: 'inline-flex', marginBottom: '1.5rem', color: 'var(--color-gold)' }}>
                <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M12 22a7 7 0 0 0 7-7c0-2-1-3.9-3-5.5s-3.5-4-4-6.5c-.5 2.5-2 4.9-4 6.5C6 11.1 5 13 5 15a7 7 0 0 0 7 7z"></path>
                </svg>
              </div>
              <span className="eyebrow" style={{ display: 'block', marginBottom: '1rem' }}>Instant Project Discovery</span>
              <h2 style={{ marginBottom: '1.5rem', fontSize: '48px', lineHeight: 1.1 }}>Plan Your Oasis in Minutes</h2>
              <p style={{ fontSize: '18px', color: 'var(--color-text)', marginBottom: '2.5rem', lineHeight: 1.6 }}>
                Curious about the investment required for your project? Use our engineering-based estimator to get a rough bracket in seconds.
                <br/><br/>
                For a precise bill of quantities and a firm site quote, our senior consultants are available for a <strong>free, no-obligation site survey</strong> anywhere in the UAE.
              </p>
              
              <div style={{ display: 'flex', flexDirection: 'column', gap: '1.2rem' }}>
                {[
                  { title: "50+ Years of Pricing Data", desc: "Estimates based on 5+ decades of UAE construction costs." },
                  { title: "No Obligation Commitment", desc: "Explore possibilities without any sales pressure." },
                  { title: "Senior Consultant Review", desc: "Every lead magnet estimate is reviewed by our technical desk." }
                ].map((item, i) => (
                  <div key={i} style={{ display: 'flex', gap: '1rem', alignItems: 'flex-start' }}>
                    <div style={{ color: 'var(--color-aqua)', fontSize: '20px' }}>✓</div>
                    <div>
                      <div style={{ fontWeight: 600, color: 'var(--color-foam)', fontSize: '16px' }}>{item.title}</div>
                      <div style={{ fontSize: '14px', color: 'var(--color-text-dim)' }}>{item.desc}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </ScrollReveal>

          <ScrollReveal delay={0.2}>
            <BudgetCalculator />
          </ScrollReveal>

        </div>
      </div>
    </section>
  );
}
