import React from 'react';
import ScrollReveal from '../ui/ScrollReveal';

export default function Specialisms() {
  const items = [
    "Musical Fountains", "Misting & Fogging Systems", "Underwater Lighting",
    "Sauna & Steam Rooms", "Water Playgrounds", "Infinity Edge Pools",
    "Koi Pond Management", "Fire & Water Features", "Underwater Speakers",
    "Leak Detection", "Lazy Rivers & Parks", "Spa & Vitality Pools"
  ];

  return (
    <section style={{ padding: 'var(--space-xxl) 0', backgroundColor: 'var(--color-abyss)' }}>
      <div className="container">
        <ScrollReveal>
          <div style={{ marginBottom: 'var(--space-lg)', textAlign: 'center' }}>
            <span className="eyebrow" style={{ display: 'block', marginBottom: '1rem' }}>Not Just Pools</span>
            <h2>Our Full Spectrum of Water & Landscape Expertise</h2>
          </div>
        </ScrollReveal>

        <div className="specialisms-grid">
          {items.map((item, i) => {
            return (
              <ScrollReveal key={i} delay={i * 0.05} threshold={0.1}>
                <div className="spec-pill">
                  <span style={{ color: 'var(--color-aqua)', marginRight: '8px', fontSize: '18px' }}>✦</span>
                  {item}
                </div>
              </ScrollReveal>
            )
          })}
        </div>
      </div>

      <style>{`
        .specialisms-grid {
          display: grid;
          grid-template-columns: repeat(1, 1fr);
          gap: 1.5rem;
          max-width: 1100px;
          margin: 0 auto;
        }
        @media (min-width: 640px) {
          .specialisms-grid { grid-template-columns: repeat(2, 1fr); }
        }
        @media (min-width: 1024px) {
          .specialisms-grid { grid-template-columns: repeat(4, 1fr); }
        }
        .spec-pill {
          background: var(--color-glass);
          border: 1px solid var(--color-glass-border);
          padding: 24px;
          border-radius: 4px;
          font-family: var(--font-body);
          font-size: 15px;
          color: var(--color-text);
          text-align: left;
          transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
          display: flex;
          align-items: center;
          height: 100%;
        }
        .spec-pill:hover {
          border-color: var(--color-aqua);
          color: var(--color-foam);
          background: rgba(0, 180, 216, 0.08);
          transform: translateY(-5px);
          box-shadow: 0 10px 30px -10px rgba(0, 0, 0, 0.5), 0 0 15px rgba(0, 180, 216, 0.2);
        }
      `}</style>
    </section>
  );
}
