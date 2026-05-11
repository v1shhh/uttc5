import React, { useEffect, useState } from 'react';
import { useOutletContext } from 'react-router-dom';
import { Lead } from '@shared/types';
import LeadDetail from './LeadDetail';

export default function LeadsTable() {
  const { token } = useOutletContext<{ token: string }>();
  const [leads, setLeads] = useState<Lead[]>([]);
  const [selectedLead, setSelectedLead] = useState<Lead | null>(null);
  const [filter, setFilter] = useState('all');

  const fetchLeads = (signal?: AbortSignal) => {
    let url = '/api/leads';
    if (filter !== 'all') url += `?status=${filter}`;
    
    fetch(url, { headers: { Authorization: `Bearer ${token}` }, signal })
      .then(r => r.json())
      .then(d => { if(d.success) setLeads(d.data); })
      .catch(e => { if (e.name !== 'AbortError') console.error(e); });
  };

  useEffect(() => {
    const controller = new AbortController();
    fetchLeads(controller.signal);
    return () => controller.abort();
  }, [token, filter]);

  const scoreBadge = (score: number = 0) => {
    if (score >= 70) return <span style={{ background: '#ef4444', color: 'white', padding: '2px 8px', borderRadius: '12px', fontSize: '11px', fontWeight: 'bold' }}>HOT {score}</span>;
    if (score >= 40) return <span style={{ background: '#f59e0b', color: 'white', padding: '2px 8px', borderRadius: '12px', fontSize: '11px', fontWeight: 'bold' }}>WARM {score}</span>;
    return <span style={{ background: '#3b82f6', color: 'white', padding: '2px 8px', borderRadius: '12px', fontSize: '11px', fontWeight: 'bold' }}>COOL {score}</span>;
  };

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
        <h1 style={{ fontSize: '32px' }}>Leads Pipeline</h1>
        <select value={filter} onChange={e => setFilter(e.target.value)} style={{ padding: '8px 16px', background: 'var(--color-deep)', border: '1px solid var(--color-glass-border)', color: 'white', borderRadius: '4px' }}>
          <option value="all">All Statuses</option>
          <option value="new">New</option>
          <option value="contacted">Contacted</option>
          <option value="qualified">Qualified</option>
          <option value="won">Won</option>
          <option value="lost">Lost</option>
        </select>
      </div>

      <div className="glass-card" style={{ padding: 0, overflowX: 'auto' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
          <thead>
            <tr style={{ borderBottom: '1px solid var(--color-glass-border)', background: 'rgba(0,0,0,0.2)' }}>
              <th style={{ padding: '16px', fontSize: '12px', color: 'var(--color-text-dim)', textTransform: 'uppercase' }}>Score</th>
              <th style={{ padding: '16px', fontSize: '12px', color: 'var(--color-text-dim)', textTransform: 'uppercase' }}>Name</th>
              <th style={{ padding: '16px', fontSize: '12px', color: 'var(--color-text-dim)', textTransform: 'uppercase' }}>Service</th>
              <th style={{ padding: '16px', fontSize: '12px', color: 'var(--color-text-dim)', textTransform: 'uppercase' }}>Status</th>
              <th style={{ padding: '16px', fontSize: '12px', color: 'var(--color-text-dim)', textTransform: 'uppercase' }}>Date</th>
            </tr>
          </thead>
          <tbody>
            {leads.map(lead => (
              <tr key={lead.id} onClick={() => setSelectedLead(lead)} style={{ borderBottom: '1px solid var(--color-glass-border)', cursor: 'pointer', transition: 'background 0.2s' }} className="table-row">
                <td style={{ padding: '16px' }}>{scoreBadge(lead.lead_score)}</td>
                <td style={{ padding: '16px' }}>
                  <div style={{ color: 'var(--color-foam)', fontWeight: 500 }}>{lead.name}</div>
                  <div style={{ fontSize: '12px', color: 'var(--color-text-dim)' }}>{lead.company || lead.email}</div>
                </td>
                <td style={{ padding: '16px', fontSize: '14px', color: 'var(--color-text)' }}>{lead.service_type}</td>
                <td style={{ padding: '16px' }}>
                  <span style={{ padding: '4px 8px', background: 'rgba(255,255,255,0.05)', borderRadius: '4px', fontSize: '12px', textTransform: 'uppercase' }}>{lead.status}</span>
                </td>
                <td style={{ padding: '16px', fontSize: '14px', color: 'var(--color-text-dim)' }}>{new Date(lead.created_at || '').toLocaleDateString()}</td>
              </tr>
            ))}
            {leads.length === 0 && (
              <tr><td colSpan={5} style={{ padding: '2rem', textAlign: 'center', color: 'var(--color-text-dim)' }}>No leads found.</td></tr>
            )}
          </tbody>
        </table>
      </div>

      <style>{`
        .table-row:hover { background: rgba(0, 180, 216, 0.05); }
      `}</style>

      {selectedLead && (
        <LeadDetail 
          leadId={selectedLead.id!} 
          onClose={() => { setSelectedLead(null); fetchLeads(); }} 
        />
      )}
    </div>
  );
}
