import React, { useState, useEffect } from 'react';
import { useOutletContext } from 'react-router-dom';
import { Lead } from '@shared/types';

export default function LeadDetail({ leadId, onClose }: { leadId: number, onClose: () => void }) {
  const { token } = useOutletContext<{ token: string }>();
  const [lead, setLead] = useState<Lead | null>(null);
  const [savingStatus, setSavingStatus] = useState(false);
  const [savingNotes, setSavingNotes] = useState(false);
  const [notesInput, setNotesInput] = useState('');

  useEffect(() => {
    fetch(`/api/leads/${leadId}`, { headers: { Authorization: `Bearer ${token}` } })
      .then(r => r.json())
      .then(d => {
        if (d.success) {
          setLead(d.data);
          setNotesInput(d.data.notes || '');
        }
      });
  }, [leadId, token]);

  const updateStatus = async (status: string) => {
    setSavingStatus(true);
    await fetch(`/api/leads/${leadId}/status`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
      body: JSON.stringify({ status })
    });
    setLead(l => l ? { ...l, status: status as any } : l);
    setSavingStatus(false);
  };

  const updateNotes = async () => {
    setSavingNotes(true);
    await fetch(`/api/leads/${leadId}/notes`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
      body: JSON.stringify({ notes: notesInput })
    });
    setLead(l => l ? { ...l, notes: notesInput } : l);
    setSavingNotes(false);
  };

  if (!lead) return (
    <div style={{ position: 'fixed', top: 0, right: 0, bottom: 0, width: '500px', background: 'var(--color-deep)', borderLeft: '1px solid var(--color-glass-border)', padding: '2rem', zIndex: 100 }}>
      Loading...
    </div>
  );

  return (
    <div style={{ 
      position: 'fixed', top: 0, right: 0, bottom: 0, width: '500px', 
      background: 'rgba(5, 15, 25, 0.95)', backdropFilter: 'blur(10px)', 
      borderLeft: '1px solid var(--color-glass-border)', padding: '2rem', 
      zIndex: 100, display: 'flex', flexDirection: 'column', overflowY: 'auto'
    }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
        <h2 style={{ fontSize: '24px', margin: 0 }}>Lead Details</h2>
        <button onClick={onClose} style={{ background: 'none', border: 'none', color: 'var(--color-text-dim)', cursor: 'pointer', fontSize: '24px' }}>&times;</button>
      </div>

      <div style={{ display: 'flex', gap: '1rem', marginBottom: '2rem' }}>
        <select 
          value={lead.status} 
          disabled={savingStatus}
          onChange={(e) => updateStatus(e.target.value)}
          style={{ padding: '8px 16px', background: 'var(--color-deep)', border: '1px solid var(--color-glass-border)', color: 'white', borderRadius: '4px', flex: 1 }}
        >
          <option value="new">New</option>
          <option value="contacted">Contacted</option>
          <option value="qualified">Qualified</option>
          <option value="won">Won</option>
          <option value="lost">Lost</option>
          <option value="deleted">Deleted</option>
        </select>
        <div style={{ padding: '8px 16px', background: 'var(--color-deep)', border: '1px solid var(--color-glass-border)', borderRadius: '4px', color: 'var(--color-gold)' }}>
          Score: {lead.lead_score}
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '1.5rem', marginBottom: '2rem' }}>
        <div>
          <label style={{ display: 'block', fontSize: '12px', color: 'var(--color-text-dim)', marginBottom: '4px' }}>Name</label>
          <div style={{ fontSize: '16px', color: 'var(--color-foam)' }}>{lead.name}</div>
        </div>
        <div>
          <label style={{ display: 'block', fontSize: '12px', color: 'var(--color-text-dim)', marginBottom: '4px' }}>Email</label>
          <div style={{ fontSize: '16px', color: 'var(--color-foam)' }}>
            <a href={`mailto:${lead.email}`} style={{ color: 'var(--color-aqua)', textDecoration: 'none' }}>{lead.email}</a>
          </div>
        </div>
        {lead.phone && (
          <div>
            <label style={{ display: 'block', fontSize: '12px', color: 'var(--color-text-dim)', marginBottom: '4px' }}>Phone</label>
            <div style={{ fontSize: '16px', color: 'var(--color-foam)' }}>
              <a href={`tel:${lead.phone}`} style={{ color: 'var(--color-aqua)', textDecoration: 'none' }}>{lead.phone}</a>
            </div>
          </div>
        )}
        {lead.company && (
          <div>
            <label style={{ display: 'block', fontSize: '12px', color: 'var(--color-text-dim)', marginBottom: '4px' }}>Company</label>
            <div style={{ fontSize: '16px', color: 'var(--color-foam)' }}>{lead.company}</div>
          </div>
        )}
      </div>

      <div style={{ padding: '1.5rem', background: 'var(--color-deep)', borderRadius: '4px', marginBottom: '2rem', border: '1px solid rgba(0, 180, 216, 0.1)' }}>
        <h4 style={{ margin: '0 0 1rem 0', color: 'var(--color-aqua)', fontSize: '14px', textTransform: 'uppercase' }}>Project Details</h4>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginBottom: '1rem' }}>
          <div>
            <label style={{ display: 'block', fontSize: '12px', color: 'var(--color-text-dim)' }}>Service</label>
            <div style={{ fontSize: '14px', color: 'white' }}>{lead.service_type || '-'}</div>
          </div>
          <div>
            <label style={{ display: 'block', fontSize: '12px', color: 'var(--color-text-dim)' }}>Type</label>
            <div style={{ fontSize: '14px', color: 'white' }}>{lead.project_type || '-'}</div>
          </div>
          <div>
            <label style={{ display: 'block', fontSize: '12px', color: 'var(--color-text-dim)' }}>Budget</label>
            <div style={{ fontSize: '14px', color: 'white' }}>{lead.budget_range || '-'}</div>
          </div>
          <div>
            <label style={{ display: 'block', fontSize: '12px', color: 'var(--color-text-dim)' }}>Timeline</label>
            <div style={{ fontSize: '14px', color: 'white' }}>{lead.timeline || '-'}</div>
          </div>
        </div>
        <div>
          <label style={{ display: 'block', fontSize: '12px', color: 'var(--color-text-dim)' }}>Message</label>
          <p style={{ margin: 0, fontSize: '14px', color: 'var(--color-text)', whiteSpace: 'pre-wrap' }}>{lead.message || 'No message provided.'}</p>
        </div>
      </div>

      <div style={{ marginBottom: '2rem' }}>
        <label style={{ display: 'block', fontSize: '12px', color: 'var(--color-text-dim)', marginBottom: '8px' }}>Admin Notes</label>
        <textarea 
          value={notesInput} 
          onChange={e => setNotesInput(e.target.value)}
          placeholder="Add internal notes about this lead..."
          style={{ width: '100%', minHeight: '100px', padding: '12px', background: 'var(--color-deep)', border: '1px solid var(--color-glass-border)', color: 'white', borderRadius: '4px', resize: 'vertical', marginBottom: '8px' }}
        />
        <button 
          onClick={updateNotes} 
          disabled={savingNotes}
          className="btn-primary" 
          style={{ padding: '6px 16px', fontSize: '14px' }}
        >
          {savingNotes ? 'Saving...' : 'Save Notes'}
        </button>
      </div>
      
      <div style={{ fontSize: '12px', color: 'var(--color-text-dim)' }}>
        Source: {lead.source_page || 'Direct'} {lead.source_utm && `(${lead.source_utm})`}<br />
        Created: {new Date(lead.created_at || '').toLocaleString()}
      </div>
    </div>
  );
}
