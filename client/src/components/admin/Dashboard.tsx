import React, { useEffect, useState } from 'react';
import { useOutletContext, Link } from 'react-router-dom';

export default function Dashboard() {
  const { token } = useOutletContext<{ token: string }>();
  const [data, setData] = useState<any>(null);

  useEffect(() => {
    fetch('/api/analytics/summary', { headers: { Authorization: `Bearer ${token}` } })
      .then(r => r.json())
      .then(d => { if (d.success) setData(d.data); })
      .catch(e => console.error(e));
  }, [token]);

  if (!data) return <div style={{ color: 'var(--color-text)' }}>Loading dashboard...</div>;

  return (
    <div>
      <h1 style={{ fontSize: '32px', marginBottom: '2rem' }}>Dashboard Overview</h1>
      
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1.5rem', marginBottom: '2.5rem' }}>
        <div className="glass-card" style={{ padding: '1.5rem', textAlign: 'center' }}>
          <div style={{ fontSize: '14px', color: 'var(--color-text-dim)', marginBottom: '0.5rem', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Total Leads</div>
          <div style={{ fontSize: '36px', fontWeight: 'bold', color: 'var(--color-foam)' }}>{data.totalLeads}</div>
        </div>
        <div className="glass-card" style={{ padding: '1.5rem', textAlign: 'center' }}>
          <div style={{ fontSize: '14px', color: 'var(--color-text-dim)', marginBottom: '0.5rem', textTransform: 'uppercase', letterSpacing: '0.05em' }}>New Leads (7d)</div>
          <div style={{ fontSize: '36px', fontWeight: 'bold', color: 'var(--color-aqua)' }}>{data.newLeads}</div>
        </div>
        <div className="glass-card" style={{ padding: '1.5rem', textAlign: 'center' }}>
          <div style={{ fontSize: '14px', color: 'var(--color-text-dim)', marginBottom: '0.5rem', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Hot Leads</div>
          <div style={{ fontSize: '36px', fontWeight: 'bold', color: '#ef4444' }}>{data.hotLeads}</div>
        </div>
        <div className="glass-card" style={{ padding: '1.5rem', textAlign: 'center' }}>
          <div style={{ fontSize: '14px', color: 'var(--color-text-dim)', marginBottom: '0.5rem', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Conversion Rate</div>
          <div style={{ fontSize: '36px', fontWeight: 'bold', color: 'var(--color-gold)' }}>{data.conversionRate}%</div>
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))', gap: '2rem' }}>
        <div className="glass-card" style={{ padding: '1.5rem' }}>
          <h3 style={{ marginBottom: '1rem', paddingBottom: '0.5rem', borderBottom: '1px solid var(--color-glass-border)' }}>Quick Links</h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
            <Link to="/admin/leads" style={{ color: 'var(--color-aqua)', textDecoration: 'none', padding: '0.5rem 0' }}>→ View Leads Pipeline</Link>
            <Link to="/admin/analytics" style={{ color: 'var(--color-aqua)', textDecoration: 'none', padding: '0.5rem 0' }}>→ Detailed Web Analytics</Link>
            <Link to="/admin/recommendations" style={{ color: 'var(--color-aqua)', textDecoration: 'none', padding: '0.5rem 0' }}>→ View AI CRO Recommendations</Link>
            <Link to="/admin/content" style={{ color: 'var(--color-aqua)', textDecoration: 'none', padding: '0.5rem 0' }}>→ Edit Site Content</Link>
          </div>
        </div>

        <div className="glass-card" style={{ padding: '1.5rem' }}>
          <h3 style={{ marginBottom: '1rem', paddingBottom: '0.5rem', borderBottom: '1px solid var(--color-glass-border)' }}>Leads by Service</h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
            {data.leadsByService?.map((s: any) => (
              <div key={s.name} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span style={{ color: 'var(--color-foam)' }}>{s.name || 'Unknown'}</span>
                <span style={{ background: 'var(--color-deep)', padding: '4px 12px', borderRadius: '12px', fontSize: '12px', color: 'var(--color-aqua)' }}>{s.value}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

