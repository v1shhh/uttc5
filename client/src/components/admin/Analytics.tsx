import React, { useEffect, useState } from 'react';
import { useOutletContext } from 'react-router-dom';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from 'recharts';

export default function Analytics() {
  const { token } = useOutletContext<{ token: string }>();
  const [data, setData] = useState<any>(null);

  useEffect(() => {
    fetch('/api/analytics/summary', { headers: { Authorization: `Bearer ${token}` } })
      .then(r => r.json())
      .then(d => { if(d.success) setData(d.data); });
  }, [token]);

  if (!data) return <div style={{ color: 'var(--color-text)' }}>Loading analytics...</div>;

  const COLORS = ['#00b4d8', '#c9a84c', '#e8f4f8', '#7ba0b4', '#ef4444'];

  return (
    <div>
      <h1 style={{ fontSize: '32px', marginBottom: '2rem' }}>Web Analytics</h1>
      
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 350px), 1fr))', gap: '2rem', marginBottom: '2rem' }}>
        
        <div className="glass-card" style={{ padding: '1.5rem' }}>
          <h3 style={{ marginBottom: '1.5rem', fontFamily: 'var(--font-body)' }}>Page View Distribution</h3>
          <div style={{ height: '300px' }}>
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={data.pageViews} layout="vertical">
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" horizontal={false} />
                <XAxis type="number" stroke="var(--color-text-dim)" fontSize={12} />
                <YAxis dataKey="name" type="category" stroke="var(--color-text-dim)" fontSize={12} width={100} />
                <Tooltip cursor={{ fill: 'rgba(255,255,255,0.05)' }} contentStyle={{ backgroundColor: 'var(--color-deep)', border: 'none', color: '#fff' }} />
                <Bar dataKey="value" fill="var(--color-aqua)" radius={[0, 4, 4, 0]}>
                  {data.pageViews.map((entry: any, index: number) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="glass-card" style={{ padding: '1.5rem' }}>
          <h3 style={{ marginBottom: '1.5rem', fontFamily: 'var(--font-body)' }}>Top Performing CTAs</h3>
          <div style={{ height: '300px' }}>
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={data.ctaClicks}>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" vertical={false} />
                <XAxis dataKey="name" stroke="var(--color-text-dim)" fontSize={11} tickFormatter={(val) => val.length > 10 ? val.substring(0, 10) + '...' : val} />
                <YAxis stroke="var(--color-text-dim)" fontSize={12} />
                <Tooltip contentStyle={{ backgroundColor: 'var(--color-deep)', border: 'none', color: '#fff' }} />
                <Bar dataKey="value" fill="var(--color-gold)" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 350px), 1fr))', gap: '2rem' }}>
        
        <div className="glass-card">
          <h3 style={{ padding: '1.5rem', borderBottom: '1px solid var(--color-glass-border)' }}>Page View Details</h3>
          <table style={{ width: '100%', fontSize: '14px', borderCollapse: 'collapse' }}>
            <thead>
              <tr style={{ color: 'var(--color-text-dim)', borderBottom: '1px solid var(--color-glass-border)' }}>
                <th style={{ textAlign: 'left', padding: '12px 1.5rem' }}>Path</th>
                <th style={{ textAlign: 'right', padding: '12px 1.5rem' }}>Views</th>
              </tr>
            </thead>
            <tbody>
              {data.pageViews?.map((item: any) => (
                <tr key={item.name} style={{ borderBottom: '1px solid var(--color-glass-border)' }}>
                  <td style={{ padding: '12px 1.5rem', color: 'var(--color-foam)' }}>{item.name}</td>
                  <td style={{ textAlign: 'right', padding: '12px 1.5rem' }}>{item.value}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="glass-card">
          <h3 style={{ padding: '1.5rem', borderBottom: '1px solid var(--color-glass-border)' }}>CTA Click Details</h3>
          <table style={{ width: '100%', fontSize: '14px', borderCollapse: 'collapse' }}>
            <thead>
              <tr style={{ color: 'var(--color-text-dim)', borderBottom: '1px solid var(--color-glass-border)' }}>
                <th style={{ textAlign: 'left', padding: '12px 1.5rem' }}>Button / Source</th>
                <th style={{ textAlign: 'right', padding: '12px 1.5rem' }}>Clicks</th>
              </tr>
            </thead>
            <tbody>
              {data.ctaClicks?.map((item: any) => (
                <tr key={item.name} style={{ borderBottom: '1px solid var(--color-glass-border)' }}>
                  <td style={{ padding: '12px 1.5rem', color: 'var(--color-aqua)' }}>{item.name}</td>
                  <td style={{ textAlign: 'right', padding: '12px 1.5rem' }}>{item.value}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

      </div>
    </div>
  );
}
