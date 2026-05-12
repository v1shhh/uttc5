import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import ScrollReveal from '../ui/ScrollReveal';

const faqs = [
  {
    q: "How long does a standard pool project take from start to finish?",
    a: "Every project is unique, but a standard residential pool typically takes 8 to 12 weeks from the moment municipal permits are approved. For large-scale hospitality or commercial projects like the ones we performed at Burj Al Arab districts, the timeline is determined by the master construction schedule."
  },
  {
    q: "Do you handle municipal and civil defense approvals?",
    a: "Yes. Our team handles the entire 'end-to-end' process, including NOCs from Dubai Municipality, Trakhees, and Abu Dhabi City Municipality. We ensure your project is 100% compliant with UAE safety and civil defense standards."
  },
  {
    q: "What kind of warranty do you provide on waterproofing?",
    a: "UTTC provides a 10-year warranty on all structural waterproofing. Our reputation for zero-leak construction is why we've been trusted by hotel groups like Jumeirah and Emaar for 5+ decades."
  },
  {
    q: "Do you build pools outside of Dubai and Abu Dhabi?",
    a: "We operate across the entire UAE and have a dedicated trading arm that exports specialist water works equipment and chemical systems throughout the GCC region, including Saudi Arabia and Oman."
  },
  {
    q: "Can you refurbish an existing pool built by another contractor?",
    a: "Frequently. We specialize in infinity-edge conversions, leak detection on old tiles, and modernizing chemistry systems to energy-efficient 'Green Pool' standards."
  }
];

export default function Faq() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": faqs.map(faq => ({
      "@type": "Question",
      "name": faq.q,
      "acceptedAnswer": {
        "@type": "Answer",
        "text": faq.a
      }
    }))
  };

  return (
    <section id="faq" style={{ padding: 'var(--space-xxl) 0', background: 'linear-gradient(to bottom, var(--color-abyss), var(--color-deep))' }}>
      <script type="application/ld+json">
        {JSON.stringify(faqSchema)}
      </script>
      <div className="container" style={{ maxWidth: '800px' }}>
        
        <ScrollReveal>
          <div style={{ textAlign: 'center', marginBottom: 'var(--space-lg)' }}>
            <span className="eyebrow" style={{ display: 'block', marginBottom: '1rem' }}>UNMATCHED TRANSPARENCY</span>
            <h2>Frequently Asked Questions</h2>
          </div>
        </ScrollReveal>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          {faqs.map((faq, i) => (
            <ScrollReveal key={i} delay={i * 0.05}>
              <div 
                style={{ 
                  borderBottom: '1px solid var(--color-glass-border)', 
                  paddingBottom: '1rem' 
                }}
              >
                <button 
                  onClick={() => setOpenIndex(openIndex === i ? null : i)}
                  style={{ 
                    width: '100%', 
                    display: 'flex', 
                    justifyContent: 'space-between', 
                    alignItems: 'center',
                    background: 'none',
                    border: 'none',
                    color: 'var(--color-foam)',
                    textAlign: 'left',
                    padding: '1.5rem 0',
                    cursor: 'pointer',
                    fontSize: '18px',
                    fontFamily: 'var(--font-body)',
                    fontWeight: 500
                  }}
                >
                  <span>{faq.q}</span>
                  <motion.span 
                    animate={{ rotate: openIndex === i ? 45 : 0 }}
                    style={{ color: 'var(--color-aqua)', fontSize: '24px' }}
                  >
                    +
                  </motion.span>
                </button>
                
                <AnimatePresence>
                  {openIndex === i && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3, ease: 'easeInOut' }}
                      style={{ overflow: 'hidden' }}
                    >
                      <p style={{ 
                        color: 'var(--color-text)', 
                        paddingBottom: '1.5rem', 
                        lineHeight: 1.7,
                        fontSize: '15px'
                      }}>
                        {faq.a}
                      </p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </ScrollReveal>
          ))}
        </div>

      </div>
    </section>
  );
}
