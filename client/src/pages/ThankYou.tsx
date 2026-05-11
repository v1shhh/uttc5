import React, { useEffect } from 'react';
import { motion } from 'motion/react';
import { trackEvent } from '../hooks/useAnalytics';
import { SEO } from '../components/ui/SEO';

export default function ThankYou() {
  useEffect(() => {
    trackEvent('form_submit_confirmed', 'thank_you_page');
  }, []);

  return (
    <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', textAlign: 'center', padding: 'var(--space-md)' }}>
      <SEO 
        title="Thank You | UTTC"
        description="Thank you for contacting UTTC. Our senior consultant will reach out shortly."
      />
      <motion.div 
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
      >
        <div style={{ fontSize: '64px', color: 'var(--color-aqua)', marginBottom: 'var(--space-md)' }}>
          ✓
        </div>
        <h1 style={{ marginBottom: 'var(--space-sm)' }}>Your Brief Is With Our Team</h1>
        <p style={{ maxWidth: '600px', margin: '0 auto', marginBottom: 'var(--space-lg)' }}>
          We'll review your project details and have a senior consultant reach out within 4 business hours. In the meantime, explore some of our most ambitious completed projects.
        </p>
        <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
          <a href="/projects" className="btn-primary" data-analytics="ty_explore">Explore Projects</a>
          <a href="tel:800-POOLS" className="btn-secondary" data-analytics="ty_call">Call Us Now: 800-POOLS</a>
        </div>
      </motion.div>
    </div>
  );
}
