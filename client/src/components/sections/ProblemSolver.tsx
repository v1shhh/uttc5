import React from 'react';
import ScrollReveal from '../ui/ScrollReveal';

export default function ProblemSolver() {
  const painPoints = [
    "Contractors who disappear after handover",
    "Pools that leak within the first year",
    "Water turning green within weeks of completion",
    "Designs that look nothing like the original proposal",
    "Maintenance teams who don't understand water chemistry",
    "No recourse when things go wrong"
  ];

  return (
    <section id="why-us" style={{ padding: 'var(--space-xxl) 0', background: 'linear-gradient(to bottom, var(--color-deep), var(--color-abyss))' }}>
      <div className="container">
        
        <ScrollReveal>
          <div style={{ marginBottom: 'var(--space-lg)' }}>
            <span className="eyebrow" style={{ display: 'block', marginBottom: '1rem' }}>Does this sound familiar?</span>
            <h2 style={{ maxWidth: '800px' }}>Most Pool Projects in the UAE End in Regret — Here's Why</h2>
          </div>
        </ScrollReveal>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 350px), 1fr))', gap: 'var(--space-xl)', alignItems: 'center' }}>
          
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
            {painPoints.map((point, i) => (
              <ScrollReveal key={i} delay={i * 0.1}>
                <div style={{ display: 'flex', gap: '1rem', alignItems: 'flex-start' }}>
                  <span style={{ fontFamily: 'var(--font-display)', fontSize: '24px', color: 'var(--color-gold)', lineHeight: 1 }}>{(i+1).toString().padStart(2, '0')}.</span>
                  <p style={{ fontFamily: 'var(--font-display)', fontSize: '22px', color: 'var(--color-foam)' }}>{point}</p>
                </div>
              </ScrollReveal>
            ))}
          </div>

          <ScrollReveal delay={0.3}>
            <div className="glass-card" style={{ padding: 'var(--space-lg)', position: 'relative', overflow: 'hidden' }}>
              <div style={{ position: 'absolute', top: 0, left: 0, width: '4px', height: '100%', background: 'var(--color-aqua)' }}></div>
              <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '32px', marginBottom: '1.5rem', textTransform: 'none', letterSpacing: 0 }}>50+ Years Without a Single Unanswered Call</h3>
              <p style={{ color: 'var(--color-text)', marginBottom: '1.5rem', fontSize: '17px' }}>
                We've fixed hundreds of pools that other contractors built and abandoned. We know every failure mode because we've corrected them all.
              </p>
              <p style={{ color: 'var(--color-text)', marginBottom: '2rem', fontSize: '17px' }}>
                When you work with UTTC, you're getting the company that UAE's most demanding hotel groups call when things have gone wrong elsewhere. The company that does it right the first time.
              </p>
              <a href="#services" className="btn-secondary" style={{ border: 'none', padding: 0, color: 'var(--color-gold)' }} data-analytics="problem_solver_cta">
                See How We're Different →
              </a>
            </div>
          </ScrollReveal>

        </div>
      </div>
    </section>
  );
}
