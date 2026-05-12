import React, { useEffect, Suspense, lazy } from 'react';
import { motion, useAnimation } from 'motion/react';
import { useContent } from '../hooks/useContent';
import { GlowingContactLink } from '../components/ui/GlowingContactLink';
import Navbar from '../components/layout/Navbar';
import WaveDivider from '../components/ui/WaveDivider';
import { SEO } from '../components/ui/SEO';

const Footer = lazy(() => import('../components/layout/Footer'));

export default function Contact() {
  const content = useContent();
  const controls = useAnimation();

  useEffect(() => {
    controls.start('visible');
  }, [controls]);

  const staggerChildren = {
    hidden: { opacity: 0, y: 30 },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: { delay: i * 0.15, duration: 0.8, ease: [0.4, 0, 0.2, 1] }
    })
  };

  return (
    <>
      <SEO
        title="Contact Us - UTTC"
        description="Get in touch with UAE's premier water works authority. Contact UTTC for swimming pools, water features, and water treatment solutions."
        canonicalUrl="https://uttc.ae/contact"
      />
      <Navbar />

      <section style={{
        position: 'relative',
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        paddingTop: '120px',
        paddingBottom: 'var(--space-xxl)',
        backgroundColor: 'var(--color-abyss)',
        overflow: 'hidden'
      }}>
        {/* Background Layer */}
        <div className="hero-bg" style={{ position: 'absolute', inset: 0, zIndex: 0 }}>
          <div className="caustic caustic-1"></div>
          <div className="caustic caustic-2"></div>
          <div className="caustic caustic-3"></div>
        </div>

        <div className="container" style={{ position: 'relative', zIndex: 10, maxWidth: '1100px', flex: 1 }}>
          <motion.div custom={0} initial="hidden" animate={controls} variants={staggerChildren} style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: 'var(--space-sm)' }}>
            <div style={{ width: '40px', height: '1px', background: 'var(--color-gold)' }}></div>
            <span className="eyebrow">GET IN TOUCH</span>
          </motion.div>

          <motion.h1 custom={1} initial="hidden" animate={controls} variants={staggerChildren} style={{ marginBottom: 'var(--space-md)', maxWidth: '900px', fontSize: 'clamp(32px, 7vw, 64px)', lineHeight: '1.1' }}>
            Let's Build Something <br/>
            <span style={{ fontWeight: 400 }}>Extraordinary Together</span>
          </motion.h1>

          <motion.p custom={2} initial="hidden" animate={controls} variants={staggerChildren} style={{ fontSize: '18px', maxWidth: '620px', marginBottom: 'var(--space-md)', color: 'var(--color-text-dim)' }}>
            Whether you're planning a commercial landmark or a residential oasis, our team is ready to bring your vision to life.
          </motion.p>

          {/* Contact Cards Grid */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 320px), 1fr))', gap: 'var(--space-md)', marginBottom: 'var(--space-lg)' }}>

            {/* Phone Card */}
            <motion.div custom={3} initial="hidden" animate={controls} variants={staggerChildren} style={{
              background: 'var(--color-glass)',
              border: '1px solid var(--color-glass-border)',
              borderRadius: '12px',
              padding: 'var(--space-lg)',
              backdropFilter: 'blur(10px)'
            }}>
              <div style={{ fontSize: '40px', marginBottom: 'var(--space-sm)' }}>📞</div>
              <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '24px', marginBottom: 'var(--space-sm)' }}>Call Us</h3>
              <p style={{ color: 'var(--color-text-dim)', fontSize: '14px', marginBottom: 'var(--space-md)' }}>
                Speak directly with our team. Available 24/7 for emergencies.
              </p>
              <div style={{
                background: 'rgba(0, 180, 216, 0.1)',
                border: '2px solid rgba(0, 180, 216, 0.3)',
                borderRadius: '8px',
                padding: '16px',
                textAlign: 'center',
                transition: 'all 0.3s ease'
              }}>
                <GlowingContactLink href={`tel:${content.phone_main || '800-POOLS'}`} style={{ fontSize: '20px', fontWeight: 'bold' }}>
                  {content.phone_main || '800-POOLS'}
                </GlowingContactLink>
              </div>
            </motion.div>

            {/* Email Card */}
            <motion.div custom={4} initial="hidden" animate={controls} variants={staggerChildren} style={{
              background: 'var(--color-glass)',
              border: '1px solid var(--color-glass-border)',
              borderRadius: '12px',
              padding: 'var(--space-lg)',
              backdropFilter: 'blur(10px)'
            }}>
              <div style={{ fontSize: '40px', marginBottom: 'var(--space-sm)' }}>✉️</div>
              <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '24px', marginBottom: 'var(--space-sm)' }}>Email Us</h3>
              <p style={{ color: 'var(--color-text-dim)', fontSize: '14px', marginBottom: 'var(--space-md)' }}>
                Send us your project details. We respond within 4 hours.
              </p>
              <div style={{
                background: 'rgba(0, 180, 216, 0.1)',
                border: '2px solid rgba(0, 180, 216, 0.3)',
                borderRadius: '8px',
                padding: '16px',
                textAlign: 'center',
                transition: 'all 0.3s ease',
                wordBreak: 'break-word'
              }}>
                <GlowingContactLink href={`mailto:${content.email_main || 'poolsuae@poolsuae.com'}`} style={{ fontSize: '18px', fontWeight: 'bold' }}>
                  {content.email_main || 'poolsuae@poolsuae.com'}
                </GlowingContactLink>
              </div>
            </motion.div>
          </div>

          {/* Offices Section */}
          <motion.div custom={5} initial="hidden" animate={controls} variants={staggerChildren}>
            <h2 style={{ fontFamily: 'var(--font-display)', fontSize: '36px', marginBottom: 'var(--space-md)', textAlign: 'center' }}>
              Our <span style={{ color: 'var(--color-gold)' }}>Locations</span>
            </h2>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 300px), 1fr))', gap: 'var(--space-sm)' }}>

              {/* Dubai HQ */}
              <div style={{
                background: 'var(--color-glass)',
                border: '1px solid var(--color-glass-border)',
                borderRadius: '12px',
                padding: 'var(--space-lg)',
                backdropFilter: 'blur(10px)'
              }}>
                <h4 style={{ fontFamily: 'var(--font-display)', fontSize: '20px', marginBottom: 'var(--space-sm)', color: 'var(--color-gold)' }}>
                  Dubai Headquarters
                </h4>
                <p style={{ color: 'var(--color-text)', fontSize: '14px', marginBottom: 'var(--space-md)', lineHeight: 1.6 }}>
                  {content.address_dubai_office || 'Bay Square Building 3, Business Bay'}
                </p>
                <GlowingContactLink
                  href="https://maps.app.goo.gl/zfDgSPBRYbBgRJux7"
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{ fontSize: '14px' }}
                >
                  View on Map →
                </GlowingContactLink>
              </div>

              {/* Showroom */}
              <div style={{
                background: 'var(--color-glass)',
                border: '1px solid var(--color-glass-border)',
                borderRadius: '12px',
                padding: 'var(--space-lg)',
                backdropFilter: 'blur(10px)'
              }}>
                <h4 style={{ fontFamily: 'var(--font-display)', fontSize: '20px', marginBottom: 'var(--space-sm)', color: 'var(--color-gold)' }}>
                  Dubai Showroom
                </h4>
                <p style={{ color: 'var(--color-text)', fontSize: '14px', marginBottom: 'var(--space-md)', lineHeight: 1.6 }}>
                  {content.address_dubai_showroom || 'Kuwait Street, Dubai'}
                </p>
                <GlowingContactLink
                  href="/location-announcement"
                  style={{ fontSize: '14px' }}
                >
                  Learn More →
                </GlowingContactLink>
              </div>

              {/* Abu Dhabi */}
              <div style={{
                background: 'var(--color-glass)',
                border: '1px solid var(--color-glass-border)',
                borderRadius: '12px',
                padding: 'var(--space-lg)',
                backdropFilter: 'blur(10px)'
              }}>
                <h4 style={{ fontFamily: 'var(--font-display)', fontSize: '20px', marginBottom: 'var(--space-sm)', color: 'var(--color-gold)' }}>
                  Abu Dhabi Office
                </h4>
                <p style={{ color: 'var(--color-text)', fontSize: '14px', marginBottom: 'var(--space-md)', lineHeight: 1.6 }}>
                  {content.address_abudhabi || 'P.O. Box 41957, Abu Dhabi'}
                </p>
                <GlowingContactLink
                  href="/location-announcement"
                  style={{ fontSize: '14px' }}
                >
                  Learn More →
                </GlowingContactLink>
              </div>
            </div>
          </motion.div>
        </div>

        <div style={{ position: 'absolute', bottom: 0, width: '100%', zIndex: 2 }}>
          <WaveDivider color="var(--color-deep)" />
        </div>

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
        `}</style>
      </section>

      <Suspense fallback={null}>
        <Footer />
      </Suspense>
    </>
  );
}
