import React, { useState, useEffect } from 'react';
import { submitLead } from '../../lib/api';
import { trackEvent } from '../../hooks/useAnalytics';

export default function QuoteForm() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    trackEvent('form_view', 'quote_form');
  }, []);

  const handleFocus = (fieldName: string) => {
    if (!window.sessionStorage.getItem(`form_focused_${fieldName}`)) {
      window.sessionStorage.setItem(`form_focused_${fieldName}`, '1');
      trackEvent('form_field_focus', 'quote_form', { field: fieldName });
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    trackEvent('form_submit_attempt', 'quote_form');

    const formData = new FormData(e.currentTarget);
    const data = Object.fromEntries(formData.entries());

    try {
      if (!data.name || !data.email || !data.service_type) {
        trackEvent('form_validation_error', 'quote_form', { reason: 'missing_fields' });
        throw new Error('Please fill in all required fields.');
      }

      const res = await submitLead({
        name: data.name as string,
        company: data.company as string,
        email: data.email as string,
        phone: data.phone as string,
        service_type: data.service_type as string,
        project_type: data.project_type as string,
        budget_range: data.budget_range as string,
        timeline: data.timeline as string,
        message: data.message as string,
        source_page: window.location.pathname
      });

      if (!res.success) {
        throw new Error(res.error || 'Failed to submit request');
      }

      trackEvent('form_submit_success', 'quote_form', { source: window.location.pathname });
      window.location.href = `/thank-you?lead=${res.data?.id}`;
    } catch (err: any) {
      trackEvent('form_submit_error', 'quote_form', { message: err.message });
      setError(err.message || 'An error occurred. Please try again.');
      setLoading(false);
    }
  };

  const inputStyle = {
    width: '100%',
    background: 'var(--color-abyss)',
    border: '1px solid var(--color-glass-border)',
    color: 'var(--color-foam)',
    padding: '12px 16px',
    borderRadius: 'var(--radius-card)',
    fontFamily: 'var(--font-body)',
    fontSize: '15px',
    outline: 'none',
    transition: 'var(--transition)',
    marginBottom: '1rem',
    minHeight: '44px' // Touch target size
  };

  const labelStyle = {
    display: 'block',
    fontFamily: 'var(--font-body)',
    fontWeight: 500,
    fontSize: '11px',
    textTransform: 'uppercase' as const,
    letterSpacing: '0.15em',
    color: 'var(--color-text-dim)',
    marginBottom: '0.5rem'
  };

  return (
    <form onSubmit={handleSubmit} className="glass-card" style={{ padding: 'var(--space-md)' }}>
      {error && <div style={{ background: 'rgba(239, 68, 68, 0.1)', color: '#ef4444', padding: '1rem', borderRadius: 'var(--radius-card)', marginBottom: '1.5rem', fontSize: '14px' }}>{error}</div>}
      
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0 1rem' }} className="form-grid">
        <div>
          <label style={labelStyle}>Full Name *</label>
          <input type="text" name="name" required style={inputStyle} onFocus={() => handleFocus('name')} />
        </div>
        <div>
          <label style={labelStyle}>Company / Organisation</label>
          <input type="text" name="company" placeholder="Developer, hotel, or private?" style={inputStyle} onFocus={() => handleFocus('company')} />
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0 1rem' }} className="form-grid">
        <div>
          <label style={labelStyle}>Email Address *</label>
          <input type="email" name="email" required style={inputStyle} onFocus={() => handleFocus('email')} />
        </div>
        <div>
          <label style={labelStyle}>Phone Number (Optional)</label>
          <input type="tel" name="phone" placeholder="+971 ..." style={inputStyle} onFocus={() => handleFocus('phone')} />
        </div>
      </div>

      <div>
        <label style={labelStyle}>Service Required *</label>
        <select name="service_type" required style={inputStyle} onFocus={() => handleFocus('service_type')}>
          <option value="">Select a service...</option>
          <option value="pool">Swimming Pool Construction</option>
          <option value="water_feature">Water Feature / Fountain</option>
          <option value="landscaping">Hard & Soft Landscaping</option>
          <option value="maintenance">Pool / Feature Maintenance</option>
          <option value="refurbishment">Refurbishment & Leak Repair</option>
          <option value="trading">Product Trading & Supply</option>
          <option value="other">Not Sure — Need Advice</option>
        </select>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0 1rem' }} className="form-grid">
        <div>
          <label style={labelStyle}>Project Type</label>
          <select name="project_type" style={inputStyle} onFocus={() => handleFocus('project_type')}>
            <option value="">Select...</option>
            <option value="residential">Luxury Residential</option>
            <option value="commercial">Commercial / Retail</option>
            <option value="hospitality">Hospitality (Hotel / Resort)</option>
            <option value="government">Government / Municipal</option>
            <option value="other">Other</option>
          </select>
        </div>
        <div>
          <label style={labelStyle}>Estimated Budget</label>
          <select name="budget_range" style={inputStyle} onFocus={() => handleFocus('budget_range')}>
            <option value="">Select...</option>
            <option value="<50k">Below AED 50,000</option>
            <option value="50k-200k">AED 50,000 – 200,000</option>
            <option value="200k-500k">AED 200,000 – 500,000</option>
            <option value="500k+">AED 500,000+</option>
            <option value="other">Prefer not to say</option>
          </select>
        </div>
      </div>

      <div>
        <label style={labelStyle}>Timeline</label>
        <select name="timeline" style={inputStyle} onFocus={() => handleFocus('timeline')}>
          <option value="">Select...</option>
          <option value="urgent">Urgent — needed within weeks</option>
          <option value="1-3months">1–3 months</option>
          <option value="3-6months">3–6 months</option>
          <option value="planning">Early planning stage</option>
        </select>
      </div>

      <div>
        <label style={labelStyle}>Tell us about your project</label>
        <textarea name="message" rows={4} placeholder="e.g. Rooftop pool for a 50-villa development in Dubai Hills..." style={{ ...inputStyle, resize: 'vertical' }} onFocus={() => handleFocus('message')}></textarea>
      </div>

      <button type="submit" className="btn-primary" disabled={loading} style={{ width: '100%', marginTop: '1rem' }} data-analytics="submit_quote_form">
        {loading ? 'Sending...' : 'Send My Project Brief — Get a Response in 4 Hours'}
      </button>

      <p style={{ textAlign: 'center', marginTop: '1rem', fontSize: '12px', color: 'var(--color-text-dim)' }}>
        🔒 Your details are never shared. No spam, ever. We respond within 4 business hours.
      </p>

      <style>{`
        @media (max-width: 640px) {
          .form-grid { grid-template-columns: 1fr !important; }
        }
        select { appearance: none; background-image: url('data:image/svg+xml;charset=US-ASCII,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%22292.4%22%20height%3D%22292.4%22%3E%3Cpath%20fill%3D%22%23c8dde8%22%20d%3D%22M287%2069.4a17.6%2017.6%200%200%200-13-5.4H18.4c-5%200-9.3%201.8-12.9%205.4A17.6%2017.6%200%200%200%200%2082.2c0%205%201.8%209.3%205.4%2012.9l128%20127.9c3.6%203.6%207.8%205.4%2012.8%205.4s9.2-1.8%2012.8-5.4L287%2095c3.5-3.5%205.4-7.8%205.4-12.8%200-5-1.9-9.2-5.5-12.8z%22%2F%3E%3C%2Fsvg%3E'); background-repeat: no-repeat; background-position: right 1rem top 50%; background-size: 0.65rem auto; }
        input:focus, select:focus, textarea:focus { border-color: var(--color-aqua) !important; box-shadow: 0 0 0 1px var(--color-aqua) !important; }
      `}</style>
    </form>
  );
}
