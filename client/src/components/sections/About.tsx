import React from 'react';
import ScrollReveal from '../ui/ScrollReveal';

export default function About() {
  return (
    <section id="about" style={{ padding: 'var(--space-xxl) 0', background: 'linear-gradient(to bottom, var(--color-abyss), var(--color-deep))' }}>
      <div className="container">
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 350px), 1fr))', gap: 'var(--space-xl)', alignItems: 'center' }}>
          
          <ScrollReveal>
            <div>
              <span className="eyebrow" style={{ display: 'block', marginBottom: '1rem' }}>The UTTC Story</span>
              <h2 style={{ fontFamily: 'var(--font-display)', fontWeight: 300, marginBottom: '2rem' }}>5+ Decades. One Standard.</h2>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem', fontSize: '17px', color: 'var(--color-text)' }}>
                <p>
                  United Technology & Trading Co. was founded in 1976 by Mr. Navin Asarpota — making it the oldest swimming pool company in the UAE. While others have come and gone, UTTC has built the fountains at Emirates Palace, the iconic Diving Men at Dubai Mall, and hundreds of private villas, hotels, and government facilities in between.
                </p>
                <p>
                  Mr. Asarpota remains personally involved in daily operations — bringing 50+ years of hands-on expertise to every project quote, every site visit, and every client relationship.
                </p>
                <p>
                  UTTC operates through three specialist entities: United Technology & Trading Co., United Pools Contracting LLC, and United Technology & Trading Co. LLC — giving clients the right legal and operational structure for any project type.
                </p>
              </div>
            </div>
          </ScrollReveal>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            <ScrollReveal delay={0.2}>
              <div className="glass-card" style={{ borderLeft: '3px solid var(--color-gold)' }}>
                <div style={{ fontFamily: 'var(--font-impact)', fontSize: '48px', color: 'var(--color-aqua)', lineHeight: 1, marginBottom: '0.5rem' }}>1976</div>
                <div style={{ color: 'var(--color-text-dim)', fontSize: '14px' }}>Year of founding — older than most UAE companies.</div>
              </div>
            </ScrollReveal>
            <ScrollReveal delay={0.3}>
              <div className="glass-card" style={{ borderLeft: '3px solid var(--color-gold)' }}>
                <div style={{ fontFamily: 'var(--font-impact)', fontSize: '48px', color: 'var(--color-aqua)', lineHeight: 1, marginBottom: '0.5rem' }}>#1</div>
                <div style={{ color: 'var(--color-text-dim)', fontSize: '14px' }}>The only UAE pool firm with projects at Emirates Palace, Dubai Mall, and Zabeel Saray.</div>
              </div>
            </ScrollReveal>
            <ScrollReveal delay={0.4}>
              <div className="glass-card" style={{ borderLeft: '3px solid var(--color-gold)' }}>
                <div style={{ fontFamily: 'var(--font-impact)', fontSize: '48px', color: 'var(--color-aqua)', lineHeight: 1, marginBottom: '0.5rem' }}>100%</div>
                <div style={{ color: 'var(--color-text-dim)', fontSize: '14px' }}>In-house team — no subcontracting your most important investment.</div>
              </div>
            </ScrollReveal>
          </div>

        </div>
      </div>
    </section>
  );
}
