import React, { useEffect } from 'react';
import { motion } from 'motion/react';
import Navbar from '../components/layout/Navbar';
import { SEO } from '../components/ui/SEO';
import { GlowingContactLink } from '../components/ui/GlowingContactLink';
import { useContent } from '../hooks/useContent';

export default function Location() {
  const content = useContent();
  const phone = content.phone_main || '800-POOLS';

  useEffect(() => {
    // Ensure we scroll to top on mount
    window.scrollTo(0, 0);
  }, []);

  return (
    <>
      <SEO 
        title={`Premium Locations | ${content.company_name}`}
        description="Book a private viewing at our exclusive showrooms."
      />
      
      {/* We keep Navbar but completely omit the Footer on this page for a focused interstitial experience. */}
      <Navbar />

      <main 
        className="flex items-center justify-center w-full relative overflow-hidden min-h-[100dvh]" 
        style={{ 
          paddingTop: '80px', // Space for fixed navbar
          paddingBottom: '40px',
        }}
      >
        {/* Subtle ambient glow in the background */}
        <div 
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[80vw] h-[80vw] max-w-[600px] max-h-[600px] rounded-full blur-[100px] pointer-events-none" 
          style={{ background: 'rgba(0, 180, 216, 0.05)' }} 
        />
        
        <div className="container relative z-10 px-4 w-full flex items-center justify-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            style={{
              background: 'rgba(10, 15, 25, 0.7)',
              border: '1px solid var(--color-glass-border)',
              borderRadius: '24px',
              padding: 'clamp(32px, 8vw, 48px)',
              textAlign: 'center',
              backdropFilter: 'blur(16px)',
              WebkitBackdropFilter: 'blur(16px)',
              boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.5), inset 0 1px 0 rgba(255, 255, 255, 0.1)',
              width: '100%',
              maxWidth: '560px'
            }}
          >
            {/* Lock/Security Icon */}
            <div 
              style={{ 
                display: 'inline-flex', 
                alignItems: 'center', 
                justifyContent: 'center', 
                width: '64px', 
                height: '64px', 
                borderRadius: '50%', 
                background: 'rgba(0, 180, 216, 0.1)', 
                color: 'var(--color-aqua)', 
                marginBottom: '1.5rem',
                border: '1px solid rgba(0, 180, 216, 0.2)'
              }}
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <rect width="18" height="11" x="3" y="11" rx="2" ry="2" />
                <path d="M7 11V7a5 5 0 0 1 10 0v4" />
              </svg>
            </div>
            
            <h1 style={{ 
              fontFamily: 'var(--font-display)', 
              fontSize: 'clamp(28px, 6vw, 40px)', 
              marginBottom: '1rem', 
              color: 'var(--color-text)', 
              lineHeight: 1.1,
              letterSpacing: '-0.02em'
            }}>
              Private <span style={{ color: 'var(--color-gold)' }}>Showroom</span>
            </h1>
            
            <p style={{ 
              fontSize: '16px', 
              color: 'var(--color-text-dim)', 
              marginBottom: '2rem', 
              lineHeight: 1.6 
            }}>
              To guarantee the highest level of privacy and a dedicated consultation for our VIP clients, our showroom and Abu Dhabi locations operate strictly by appointment.
            </p>
            
            <div style={{ 
              paddingTop: '2rem',
              paddingBottom: '2rem',
              paddingLeft: '1.5rem',
              paddingRight: '1.5rem', 
              background: 'rgba(0, 0, 0, 0.3)', 
              borderRadius: '16px', 
              border: '1px solid rgba(255, 255, 255, 0.05)', 
              marginBottom: '2rem' 
            }}>
              <p style={{ 
                fontSize: '12px', 
                textTransform: 'uppercase', 
                letterSpacing: '0.15em', 
                color: 'var(--color-text-dim)', 
                marginBottom: '1rem', 
                fontWeight: 600,
                lineHeight: 1
              }}>
                Call To Schedule
              </p>
              <div style={{ 
                fontSize: 'clamp(32px, 8vw, 44px)', 
                fontWeight: 'bold',
                lineHeight: 1,
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center'
              }}>
                <GlowingContactLink href={`tel:${phone}`}>{phone}</GlowingContactLink>
              </div>
            </div>

            <p style={{ 
              fontSize: '14px', 
              color: 'var(--color-text-dim)', 
              marginBottom: '2.5rem', 
              lineHeight: 1.6 
            }}>
              Alternatively, you may walk-in to our <GlowingContactLink href="https://maps.app.goo.gl/zfDgSPBRYbBgRJux7" target="_blank" rel="noopener noreferrer">Dubai HQ</GlowingContactLink>.
            </p>
            
            <div>
              <a href="/" className="btn-secondary" style={{ 
                width: '100%', 
                fontSize: '13px', 
                letterSpacing: '0.1em',
                padding: '16px 24px' 
              }}>
                &larr; RETURN TO WEBSITE
              </a>
            </div>
          </motion.div>
        </div>
      </main>
    </>
  );
}
