import React from 'react';
import ScrollReveal from '../ui/ScrollReveal';

export default function SocialProof() {
  const testimonials = [
    {
      quote: "When we open a new 5-star property, the pool is the centerpiece. UTTC is the only contractor we trust to deliver on time without compromising the architectural vision.",
      name: "Marcus T.",
      role: "Hotel Procurement Director"
    },
    {
      quote: "We had a persistent leak in our development's master lake that three other companies couldn't fix. UTTC found it in a day and permanently resolved it.",
      name: "Sarah A.",
      role: "Luxury Villa Developer"
    },
    {
      quote: "The complexity of the musical fountain required precise engineering. Navin and his team executed flawlessly. It has run perfectly since day one.",
      name: "Ahmed M.",
      role: "Facility Manager, Commercial"
    }
  ];

  return (
    <section style={{ backgroundColor: 'var(--color-mid)', padding: 'var(--space-xxl) 0', position: 'relative', overflow: 'hidden' }}>
      
      {/* Noise overlay */}
      <div style={{
        position: 'absolute', inset: 0, opacity: 0.05,
        backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
        pointerEvents: 'none'
      }}></div>

      <div className="container" style={{ position: 'relative', zIndex: 1 }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 300px), 1fr))', gap: 'var(--space-md)' }}>
          {testimonials.map((t, i) => (
            <ScrollReveal key={i} delay={i * 0.15}>
              <div className="glass-card" style={{ position: 'relative', height: '100%', display: 'flex', flexDirection: 'column' }}>
                <span style={{ position: 'absolute', top: '-20px', left: '20px', fontFamily: 'var(--font-display)', fontSize: '120px', color: 'var(--color-gold)', opacity: 0.2, lineHeight: 1 }}>"</span>
                <p style={{ fontFamily: 'var(--font-display)', fontStyle: 'italic', fontSize: '20px', color: 'var(--color-foam)', marginBottom: '1.5rem', flex: 1, position: 'relative', zIndex: 1 }}>
                  {t.quote}
                </p>
                <div>
                  <div style={{ fontFamily: 'var(--font-body)', fontWeight: 600, fontSize: '14px', color: 'var(--color-text)' }}>{t.name}</div>
                  <div style={{ fontSize: '12px', color: 'var(--color-text-dim)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>{t.role}</div>
                </div>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>

      <div style={{ marginTop: 'var(--space-xl)', overflow: 'hidden', whiteSpace: 'nowrap', borderTop: '1px solid var(--color-glass-border)', padding: '20px 0' }}>
        <div className="logos-marquee">
          <span style={{ fontFamily: 'var(--font-impact)', fontSize: '32px', color: 'rgba(255,255,255,0.15)', letterSpacing: '4px', marginRight: '50px' }}>
            EMIRATES PALACE · DUBAI MALL · ZABEEL SARAY · FESTIVAL CITY · MALL OF THE EMIRATES · VARIOUS VILLA DEVELOPERS · EMIRATES PALACE · DUBAI MALL · ZABEEL SARAY · FESTIVAL CITY · EMIRATES PALACE · DUBAI MALL · ZABEEL SARAY · FESTIVAL CITY · MALL OF THE EMIRATES · VARIOUS VILLA DEVELOPERS · EMIRATES PALACE · DUBAI MALL · ZABEEL SARAY · FESTIVAL CITY ·
          </span>
        </div>
      </div>

      <style>{`
        .logos-marquee {
          display: inline-block;
          animation: logo-scroll 40s linear infinite;
        }
        @keyframes logo-scroll {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
      `}</style>
    </section>
  );
}
