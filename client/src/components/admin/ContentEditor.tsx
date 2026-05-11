import React, { useEffect, useState } from 'react';
import { useOutletContext } from 'react-router-dom';

export default function ContentEditor() {
  const { token } = useOutletContext<{ token: string }>();
  const [contentItems, setContentItems] = useState<{ key: string, value: string }[]>([]);
  const [loading, setLoading] = useState(true);
  const [savingKey, setSavingKey] = useState<string | null>(null);

  useEffect(() => {
    fetch('/api/content', { headers: { Authorization: `Bearer ${token}` } })
      .then(r => r.json())
      .then(d => {
        if (d.success) setContentItems(d.data);
        setLoading(false);
      });
  }, [token]);

  const handleSave = async (key: string, value: string) => {
    setSavingKey(key);
    try {
      await fetch(`/api/content/${key}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
        body: JSON.stringify({ value })
      });
      // Optionally show a toast here
    } catch(err) {
      console.error(err);
    } finally {
      setSavingKey(null);
    }
  };

  const handleContentChange = (key: string, newValue: string) => {
    setContentItems(items => items.map(item => item.key === key ? { ...item, value: newValue } : item));
  };

  if (loading) return <div style={{ color: 'var(--color-text)' }}>Loading content...</div>;

  return (
    <div>
      <h1 style={{ fontSize: '32px', marginBottom: '2rem' }}>Content Editor</h1>
      <p style={{ color: 'var(--color-text-dim)', marginBottom: '2rem' }}>Edit the text content values used across the site. Changes are reflected immediately upon save.</p>
      
      <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
        {contentItems.map(item => (
          <div key={item.key} className="glass-card" style={{ padding: '1.5rem' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '1rem' }}>
              <span style={{ fontSize: '14px', color: 'var(--color-gold)', fontFamily: 'var(--font-mono)' }}>{item.key}</span>
              <button 
                onClick={() => handleSave(item.key, item.value)}
                disabled={savingKey === item.key}
                style={{
                  background: savingKey === item.key ? 'var(--color-deep)' : 'var(--color-aqua)',
                  color: savingKey === item.key ? 'var(--color-text-dim)' : 'var(--color-abyss)',
                  border: 'none',
                  padding: '6px 16px',
                  borderRadius: '4px',
                  fontWeight: 500,
                  cursor: savingKey === item.key ? 'not-allowed' : 'pointer'
                }}
              >
                {savingKey === item.key ? 'Saving...' : 'Save'}
              </button>
            </div>
            {item.value.length > 100 || item.key.includes('subline') ? (
              <textarea 
                value={item.value} 
                onChange={(e) => handleContentChange(item.key, e.target.value)}
                style={{ width: '100%', minHeight: '100px', padding: '12px', background: 'var(--color-deep)', border: '1px solid var(--color-glass-border)', color: 'white', borderRadius: '4px', resize: 'vertical' }}
              />
            ) : (
              <input 
                type="text" 
                value={item.value} 
                onChange={(e) => handleContentChange(item.key, e.target.value)}
                style={{ width: '100%', padding: '12px', background: 'var(--color-deep)', border: '1px solid var(--color-glass-border)', color: 'white', borderRadius: '4px' }}
              />
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
