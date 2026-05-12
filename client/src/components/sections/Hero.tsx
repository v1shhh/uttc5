import React, { useEffect, useState } from 'react';
import { motion, useAnimation, AnimatePresence } from 'motion/react';
import { useContent } from '../../hooks/useContent';
import WaveDivider from '../ui/WaveDivider';
import { ExperimentView, useExperiment } from '../../hooks/useExperiment';
import { GlowingContactLink } from '../ui/GlowingContactLink';

export default function Hero() {
  const content = useContent();
  const controls = useAnimation();
  const { getVariant } = useExperiment();
  const [showScrollIndicator, setShowScrollIndicator] = useState(true);

  const ctaVariant = getVariant('hero_cta_test', ['control', 'action_oriented']);

  useEffect(() => {
    controls.start('visible');
  }, [controls]);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 0) {
        setShowScrollIndicator(false);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const staggerChildren = {
    hidden: { opacity: 0, y: 30 },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: { delay: i * 0.15, duration: 0.8, ease: [0.4, 0, 0.2, 1] }
    })
  };

  return (
    <section style={{
      position: 'relative',
      minHeight: '100vh',
      display: 'flex',
      flexDirection: 'column',
      paddingTop: '100px',
      paddingBottom: 'var(--space-xxl)',
      backgroundColor: 'var(--color-abyss)',
      overflow: 'hidden'
    }}>
      {/* Background Layer */}
      <div className="hero-bg" style={{ position: 'absolute', inset: 0, zIndex: 0 }}>
        {/* CSS Caustics / light rays */}
        <div className="caustic caustic-1"></div>
        <div className="caustic caustic-2"></div>
        <div className="caustic caustic-3"></div>
      </div>

      <div className="container" style={{ position: 'relative', zIndex: 10, maxWidth: '1100px', flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center', paddingBottom: '40px' }}>
        <motion.div custom={0} initial="hidden" animate={controls} variants={staggerChildren} style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: 'var(--space-md)' }}>
          <div style={{ width: '40px', height: '1px', background: 'var(--color-gold)' }}></div>
          <span className="eyebrow">{content.hero_eyebrow || "UAE'S WATER WORKS AUTHORITY SINCE 1976"}</span>
        </motion.div>

        <motion.h1 custom={1} initial="hidden" animate={controls} variants={staggerChildren} style={{ marginBottom: 'var(--space-md)', maxWidth: '900px', fontSize: 'clamp(28px, 7vw, 64px)', lineHeight: '1.1' }}>
          <ExperimentView
            experimentId="hero_headline_test"
            variants={{
              control: (
                <>
                  {content.hero_headline_1 || "We Build the Water Features"} <br/>
                  <span style={{ fontWeight: 400 }}>{content.hero_headline_2 || "That Define UAE's Greatest Landmarks"}</span>
                </>
              ),
              direct_benefit: (
                <>
                  <span style={{ display: 'block', whiteSpace: 'nowrap' }}>Transform Your Property with</span>
                  <span style={{ fontWeight: 400, display: 'block', whiteSpace: 'nowrap' }}>World-Class Water Features</span>
                </>
              )
            }}
          />
        </motion.h1>

        <motion.p custom={2} initial="hidden" animate={controls} variants={staggerChildren} style={{ fontSize: '18px', maxWidth: '620px', marginBottom: 'var(--space-lg)' }}>
          <ExperimentView 
             experimentId="hero_subline_test"
             variants={{
               control: <>{content.hero_subline || "From the fountains of Emirates Palace to the iconic Diving Men of Dubai Mall — UTTC has been the trusted name behind UAE's most ambitious pools, water features, spas, and landscapes for 5+ decades."}</>,
               persuasive: <>Used by Emirates Palace & Dubai Mall. We design, build, and maintain high-end pools & water features that increase property value and deliver pristine experiences, with 50+ years of proven UAE expertise.</>
             }}
          />
        </motion.p>

        <motion.div custom={3} initial="hidden" animate={controls} variants={staggerChildren} style={{ display: 'flex', flexWrap: 'wrap', gap: '1rem', alignItems: 'center' }}>
          <a href="/contact" className="btn-primary" data-analytics={`hero_cta_primary_${ctaVariant}`} style={{ whiteSpace: 'nowrap', fontSize: 'clamp(10px, 4vw, 14px)', paddingLeft: 'clamp(16px, 4vw, 36px)', paddingRight: 'clamp(16px, 4vw, 36px)' }}>
            {ctaVariant === 'control' ? 'Book a Free Site Visit' : 'Get a Free Site Quote Now'}
          </a>
          <a href="/projects" className="btn-secondary" data-analytics="hero_cta_secondary">Explore Our Projects →</a>
        </motion.div>
        
        <motion.div custom={4} initial="hidden" animate={controls} variants={staggerChildren} style={{ marginTop: '1rem', width: '100%', containerType: 'inline-size' }}>
          <p style={{ 
            fontSize: 'clamp(9px, min(3.8cqi, 3.8vw), 14px)', 
            color: 'var(--color-text-dim)', 
            letterSpacing: '0.04em',
            whiteSpace: 'nowrap'
          }}>
            No obligation · Response within 4 hours · <GlowingContactLink href={`tel:${content.phone_main || '800-POOLS'}`}>{content.phone_main || '800-POOLS'}</GlowingContactLink>
          </p>
        </motion.div>
      </div>

      <div style={{ width: '100%', overflow: 'hidden', whiteSpace: 'nowrap', zIndex: 1, borderTop: '1px solid var(--color-glass-border)', borderBottom: '1px solid var(--color-glass-border)', padding: '10px 0', marginBottom: '40px' }}>
        <div className="marquee">
          <span style={{ fontFamily: 'var(--font-display)', fontStyle: 'italic', fontSize: '24px', color: 'rgba(201, 168, 76, 0.4)', marginRight: '50px' }}>
            Emirates Palace Hotel · Dubai Mall · Jumeirah Zabeel Saray · Dubai Festival City · Mall of the Emirates · Emirates Palace Hotel · Dubai Mall · Jumeirah Zabeel Saray · Dubai Festival City · Mall of the Emirates · Emirates Palace Hotel · Dubai Mall · Jumeirah Zabeel Saray · Dubai Festival City · Mall of the Emirates · Emirates Palace Hotel · Dubai Mall · Jumeirah Zabeel Saray · Dubai Festival City · Mall of the Emirates ·
          </span>
        </div>
      </div>

      <div style={{ position: 'absolute', bottom: 0, width: '100%', zIndex: 2 }}>
        <WaveDivider color="var(--color-deep)" />
      </div>

      {/* Scroll Indicator */}
      <AnimatePresence>
        {showScrollIndicator && (
          <motion.div
            initial={{ opacity: 0, scale: 0, y: -20 }}
            animate={{ 
              opacity: 1, 
              scale: 1, 
              y: 0,
              transition: {
                type: "spring",
                stiffness: 200,
                damping: 15,
                delay: 1.5
              }
            }}
            exit={{ 
              opacity: 0, 
              scale: 0.5, 
              y: 20,
              transition: { duration: 0.15 }
            }}
            style={{
              position: 'absolute',
              bottom: '150px',
              left: '50%',
              transform: 'translateX(-50%)',
              zIndex: 20,
              cursor: 'pointer'
            }}
            onClick={() => window.scrollTo({ top: window.innerHeight, behavior: 'smooth' })}
          >
            <motion.div
              animate={{ y: [0, 10, 0] }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: "easeInOut"
              }}
              style={{
                width: '50px',
                height: '50px',
                borderRadius: '50%',
                backgroundColor: 'rgba(255, 255, 255, 0.9)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                boxShadow: '0 4px 20px rgba(255, 255, 255, 0.3)'
              }}
            >
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
                style={{ color: '#030d1a' }}
              >
                <polyline points="6 9 12 15 18 9" />
              </svg>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <style>{`
        .hero-bg {
          background: radial-gradient(circle at 50% 50%, #0a3055 0%, #030d1a 100%);
          background-size: 400% 400%;
          animation: water-move 20s ease infinite alternate;
        }
        @keyframes water-move {
          0% { background-position: 0% 50%; }
          100% { background-position: 100% 50%; }
        }
        .caustic {
          position: absolute;
          width: 600px;
          height: 150px;
          border-radius: 50%;
          background: radial-gradient(ellipse at center, rgba(0, 180, 216, 0.05) 0%, transparent 70%);
          filter: blur(20px);
        }
        .caustic-1 { top: 20%; left: -10%; animation: float 12s ease-in-out infinite alternate; }
        .caustic-2 { bottom: 30%; right: -20%; animation: float-reverse 15s ease-in-out infinite alternate; }
        .caustic-3 { top: 60%; left: 40%; animation: float 10s ease-in-out infinite alternate; }
        @keyframes float {
          0% { transform: translateY(0) rotate(0deg) scale(1); }
          100% { transform: translateY(-50px) rotate(10deg) scale(1.1); }
        }
        @keyframes float-reverse {
          0% { transform: translateY(0) rotate(0deg) scale(1.1); }
          100% { transform: translateY(50px) rotate(-10deg) scale(1); }
        }
        .marquee {
          display: inline-block;
          animation: marquee-scroll 30s linear infinite;
        }
        @keyframes marquee-scroll {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
      `}</style>
    </section>
  );
}
