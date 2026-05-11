import React from 'react';
import { useContent } from '../../hooks/useContent';
import { GlowingContactLink } from '../ui/GlowingContactLink';

export default function Footer() {
  const content = useContent();

  return (
    <footer style={{ background: 'var(--color-abyss)', borderTop: '1px solid var(--color-glass-border)', padding: 'var(--space-lg) 0 var(--space-md) 0' }}>
      <div className="container" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 250px), 1fr))', gap: 'var(--space-md)', marginBottom: 'var(--space-lg)' }}>
        
        <div>
          <a href="/" style={{ display: 'inline-flex', flexDirection: 'column', gap: '2px', marginBottom: 'var(--space-sm)' }}>
            <span style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontStyle: 'italic', color: 'var(--color-gold)', fontSize: '32px', lineHeight: 1 }}>UTTC</span>
            <span style={{ fontFamily: 'var(--font-body)', fontWeight: 400, textTransform: 'uppercase', color: 'var(--color-text-dim)', fontSize: '10px', letterSpacing: '0.1em' }}>Est. 1976</span>
          </a>
          <p style={{ color: 'var(--color-text-dim)', fontSize: '14px', maxWidth: '300px' }}>
            The oldest swimming pool company in the UAE. We build the features that define landmarks.
          </p>
        </div>

        <div>
          <h4 style={{ fontFamily: 'var(--font-display)', fontSize: '20px', marginBottom: '1rem' }}>Contact</h4>
          <ul style={{ listStyle: 'none', padding: 0, margin: 0, color: 'var(--color-text)', fontSize: '14px', display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
            <li>📞 <GlowingContactLink href={`tel:${content.phone_main || '800-POOLS'}`}>{content.phone_main || '800-POOLS'}</GlowingContactLink></li>
            <li>✉️ <GlowingContactLink href={`mailto:${content.email_main || 'poolsuae@poolsuae.com'}`}>{content.email_main || 'poolsuae@poolsuae.com'}</GlowingContactLink></li>
          </ul>
        </div>

        <div>
          <h4 style={{ fontFamily: 'var(--font-display)', fontSize: '20px', marginBottom: '1rem' }}>Offices</h4>
          <ul style={{ listStyle: 'none', padding: 0, margin: 0, color: 'var(--color-text)', fontSize: '14px', display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
            <li><strong>Dubai HQ:</strong> <GlowingContactLink href={`https://maps.app.goo.gl/zfDgSPBRYbBgRJux7`} target="_blank" rel="noopener noreferrer">{content.address_dubai_office || 'Bay Square Building 3, Business Bay'}</GlowingContactLink></li>
            <li><strong>Showroom:</strong> <GlowingContactLink href={`/location-announcement`}>{content.address_dubai_showroom || 'Kuwait Street, Dubai'}</GlowingContactLink></li>
            <li><strong>Abu Dhabi:</strong> <GlowingContactLink href={`/location-announcement`}>{content.address_abudhabi || 'P.O. Box 41957, Abu Dhabi'}</GlowingContactLink></li>
          </ul>
        </div>

      </div>
      
      <div className="container" style={{ borderTop: '1px solid var(--color-glass-border)', paddingTop: 'var(--space-md)', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem', color: 'var(--color-text-dim)', fontSize: '12px' }}>
        <p>&copy; {new Date().getFullYear()} United Technology & Trading Co. LLC. All rights reserved.</p>
        <div style={{ display: 'flex', gap: '1rem' }}>
          <a href="/admin" style={{ opacity: 0.5, transition: 'var(--transition)' }}>Admin Portal</a>
        </div>
      </div>
    </footer>
  );
}
