import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { GlowingContactLink } from '../ui/GlowingContactLink';

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenu, setMobileMenu] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 80);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'About', href: '/#about' },
    { name: 'Services', href: '/#services' },
    { name: 'Projects', href: '/projects' },
    { name: 'Testimonials', href: '/testimonials' },
    { name: 'Contact', href: '/#contact' },
  ];

  return (
    <>
      <header
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: '100%',
          zIndex: 100,
          transition: 'all 0.3s ease',
          background: scrolled ? 'rgba(7, 30, 56, 0.95)' : 'transparent',
          backdropFilter: scrolled ? 'blur(20px)' : 'none',
          borderBottom: scrolled ? '1px solid var(--color-glass-border)' : '1px solid transparent',
        }}
      >
        <div className="container" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', height: '80px' }}>
          
          <a href="/" style={{ display: 'flex', flexDirection: 'column', gap: '2px' }}>
            <span style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontStyle: 'italic', color: 'var(--color-gold)', fontSize: '28px', lineHeight: 1 }}>UTTC</span>
            <span style={{ fontFamily: 'var(--font-body)', fontWeight: 400, textTransform: 'uppercase', color: 'var(--color-text-dim)', fontSize: '9px', letterSpacing: '0.1em' }}>Est. 1976</span>
          </a>

          {/* Desktop Nav */}
          <nav style={{ display: 'none', gap: '2rem' }} className="desktop-nav">
            {navLinks.map((link) => (
              <a key={link.name} href={link.href} style={{
                fontFamily: 'var(--font-body)',
                fontWeight: 500,
                textTransform: 'uppercase',
                fontSize: '11px',
                letterSpacing: '0.18em',
                color: 'var(--color-text)'
              }} className="nav-link-hover">
                {link.name}
              </a>
            ))}
          </nav>

          <div style={{ display: 'none', alignItems: 'center', gap: '1.5rem' }} className="desktop-nav">
            <GlowingContactLink href="tel:800-POOLS" data-analytics="navbar_phone" style={{ fontFamily: 'var(--font-impact)', fontSize: '20px' }}>
              800-POOLS
            </GlowingContactLink>
            <a href="/#contact" data-analytics="navbar_quote" style={{
              border: '2px solid var(--color-gold)',
              color: 'var(--color-gold)',
              padding: '8px 16px',
              borderRadius: '2px',
              textTransform: 'uppercase',
              fontSize: '11px',
              letterSpacing: '0.1em',
              fontWeight: 600,
              transition: 'var(--transition)'
            }}
            onMouseOver={(e) => { e.currentTarget.style.background = 'var(--color-gold)'; e.currentTarget.style.color = 'var(--color-abyss)'; }}
            onMouseOut={(e) => { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.color = 'var(--color-gold)'; }}
            >
              Get a Quote
            </a>
          </div>

          <button onClick={() => setMobileMenu(true)} className="mobile-only" style={{ background: 'none', border: 'none', color: 'var(--color-foam)', fontSize: '24px', cursor: 'pointer' }}>
            ☰
          </button>
        </div>
      </header>
      
      <style>{`
        @media (min-width: 768px) {
          .desktop-nav { display: flex !important; }
          .mobile-only { display: none !important; }
        }
        .nav-link-hover:hover {
          color: var(--color-aqua) !important;
          text-decoration: underline;
          text-underline-offset: 4px;
        }
      `}</style>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileMenu && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            style={{
              position: 'fixed',
              top: 0, left: 0, width: '100%', height: '100vh',
              background: 'var(--color-abyss)',
              zIndex: 1000,
              padding: 'var(--space-md)',
              display: 'flex', flexDirection: 'column'
            }}
          >
            <div style={{ display: 'flex', justifyContent: 'flex-end', marginBottom: 'var(--space-md)' }}>
              <button onClick={() => setMobileMenu(false)} style={{ background: 'none', border: 'none', color: 'var(--color-foam)', fontSize: '24px' }}>✕</button>
            </div>
            <nav style={{ display: 'flex', flexDirection: 'column', gap: '2rem', flex: 1 }}>
              {navLinks.map((link) => (
                <a key={link.name} href={link.href} onClick={() => setMobileMenu(false)} style={{ fontFamily: 'var(--font-display)', fontSize: '32px', color: 'var(--color-foam)' }}>
                  {link.name}
                </a>
              ))}
            </nav>
            <div style={{ paddingBottom: 'var(--space-md)' }}>
              <a href="tel:800-POOLS" data-analytics="mobile_menu_phone" className="btn-primary" style={{ width: '100%', marginBottom: '1rem' }}>Call 800-POOLS</a>
              <a href="/#contact" onClick={() => setMobileMenu(false)} className="btn-secondary" style={{ width: '100%' }}>Get a Quote</a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
