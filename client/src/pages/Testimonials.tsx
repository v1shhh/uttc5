import React from 'react';
import Navbar from '../components/layout/Navbar';
import Footer from '../components/layout/Footer';
import SocialProof from '../components/sections/SocialProof';
import ScrollReveal from '../components/ui/ScrollReveal';
import { SEO } from '../components/ui/SEO';

export default function Testimonials() {
  const reviewSchema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "name": "UTTC",
    "aggregateRating": {
      "@type": "AggregateRating",
      "ratingValue": "4.9",
      "reviewCount": "120"
    }
  };

  return (
    <div className="site-wrapper">
      <SEO 
        title="Client Testimonials & Reviews"
        description="Read what leading developers and private clients say about UTTC's water engineering and pool construction services."
        canonicalUrl="https://uttc.ae/testimonials"
        structuredData={reviewSchema}
      />
      <Navbar />
      <main style={{ paddingTop: '80px' }}>
        <section style={{ padding: 'var(--space-xl) 0 var(--space-md)', backgroundColor: 'var(--color-abyss)' }}>
          <div className="container" style={{ textAlign: 'center' }}>
            <ScrollReveal>
              <span className="eyebrow" style={{ display: 'block', marginBottom: '1rem' }}>REPUTATION EARNED SINCE 1976</span>
              <h1 style={{ marginBottom: '1.5rem', fontSize: 'clamp(36px, 8vw, 84px)' }}>What Our Clients Say</h1>
              <p style={{ maxWidth: '700px', margin: '0 auto', color: 'var(--color-text)', fontSize: '18px' }}>
                We don't just build water features; we build long-term relationships based on technical precision and unmatched reliability.
              </p>
            </ScrollReveal>
          </div>
        </section>

        <SocialProof />

        <section style={{ padding: 'var(--space-xl) 0', backgroundColor: 'var(--color-deep)' }}>
          <div className="container" style={{ textAlign: 'center', maxWidth: '800px' }}>
            <ScrollReveal>
              <h2 style={{ marginBottom: '1.5rem' }}>Experience the UTTC Standard</h2>
              <p style={{ color: 'var(--color-text)', marginBottom: '2.5rem' }}>
                Whether it's a private villa or a major hospitality development, we bring the same level of expertise that handles UAE's most iconic landmarks.
              </p>
              <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
                <a href="/contact" className="btn-primary">Start Your Project</a>
                <a href="/projects" className="btn-secondary">View Portfolio</a>
              </div>
            </ScrollReveal>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
