import React, { useEffect, useState } from 'react';
import { useOutletContext } from 'react-router-dom';

interface Recommendation {
  title: string;
  problem_observed: string;
  evidence: string;
  recommended_change: string;
  expected_impact: string;
  confidence_level: 'High' | 'Medium' | 'Low';
  priority: 'High' | 'Medium' | 'Low';
  target_page_or_element: string;
}

export default function Recommendations() {
  const { token } = useOutletContext<{ token: string }>();
  const [recommendations, setRecommendations] = useState<Recommendation[] | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchRecommendations = async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch('/api/ai/recommendations', {
        headers: { Authorization: `Bearer ${token}` }
      });
      const data = await res.json();
      if (data.success) {
        setRecommendations(data.recommendations);
      } else {
        setError(data.error || 'Failed to fetch recommendations');
      }
    } catch (err) {
      setError('Network error');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchRecommendations();
  }, [token]);

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
        <h1 style={{ fontSize: '32px' }}>AI CRO Recommendations</h1>
        <button onClick={fetchRecommendations} disabled={loading} className="btn-primary">
          {loading ? 'Analyzing Data...' : 'Refresh AI Analysis'}
        </button>
      </div>

      {error && (
        <div style={{ padding: '1rem', background: 'rgba(239, 68, 68, 0.1)', color: '#ef4444', border: '1px solid #ef4444', borderRadius: '4px', marginBottom: '2rem' }}>
          {error}
        </div>
      )}

      {loading && !recommendations && (
        <div style={{ color: 'var(--color-text)' }}>Generating AI insights based on latest funnel data...</div>
      )}

      {!loading && recommendations?.length === 0 && (
        <div style={{ color: 'var(--color-text)' }}>No recommendations generated. Not enough data yet.</div>
      )}

      <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
        {recommendations?.map((rec, i) => (
          <div key={i} className="glass-card" style={{ padding: '1.5rem', borderLeft: `4px solid ${rec.priority === 'High' ? '#ef4444' : rec.priority === 'Medium' ? '#f59e0b' : '#3b82f6'}` }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '1rem' }}>
              <h3 style={{ fontSize: '20px', color: 'var(--color-foam)', margin: 0 }}>{rec.title}</h3>
              <div style={{ display: 'flex', gap: '0.5rem' }}>
                <span style={{ fontSize: '12px', padding: '4px 8px', background: 'var(--color-deep)', borderRadius: '4px', color: 'var(--color-aqua)' }}>
                  Conf: {rec.confidence_level}
                </span>
                <span style={{ fontSize: '12px', padding: '4px 8px', background: 'var(--color-deep)', borderRadius: '4px', color: 'var(--color-gold)' }}>
                  Target: {rec.target_page_or_element}
                </span>
              </div>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '1.5rem' }}>
              <div>
                <strong style={{ display: 'block', color: 'var(--color-text-dim)', marginBottom: '0.25rem' }}>Problem Observed</strong>
                <p style={{ color: 'var(--color-text)', fontSize: '14px' }}>{rec.problem_observed}</p>
              </div>
              
              <div>
                <strong style={{ display: 'block', color: 'var(--color-text-dim)', marginBottom: '0.25rem' }}>Evidence</strong>
                <p style={{ color: 'var(--color-text)', fontSize: '14px' }}>{rec.evidence}</p>
              </div>
            </div>

            <div style={{ marginTop: '1.5rem', padding: '1rem', background: 'var(--color-deep)', borderRadius: '4px' }}>
              <strong style={{ display: 'block', color: 'var(--color-foam)', marginBottom: '0.25rem' }}>Recommended Change</strong>
              <p style={{ color: 'var(--color-text)', fontSize: '15px' }}>{rec.recommended_change}</p>
            </div>
            
            <div style={{ marginTop: '1rem' }}>
              <strong style={{ color: 'var(--color-gold)' }}>Expected Impact:</strong> <span style={{ color: 'var(--color-text)', fontSize: '14px' }}>{rec.expected_impact}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
