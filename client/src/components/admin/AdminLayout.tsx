import React, { useEffect, useState } from 'react';
import { Outlet, useNavigate, Link, useLocation } from 'react-router-dom';

export default function AdminLayout() {
  const [token, setToken] = useState<string | null>(localStorage.getItem('admin_token'));
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [debugLogs, setDebugLogs] = useState<string[]>([]);
  const navigate = useNavigate();
  const location = useLocation();

  const addLog = (msg: string) => {
    setDebugLogs(prev => [...prev, `${new Date().toLocaleTimeString()} - ${msg}`]);
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);
    addLog(`Attempting login for: ${username}`);
    try {
      const controller = new AbortController();
      const timeoutId = setTimeout(() => {
        addLog('Request timed out after 10s');
        controller.abort();
      }, 10000);

      const body = new URLSearchParams();
      body.append('username', username.trim());
      body.append('password', password.trim());

      addLog(`Sending fetch request to /api/admin/login...`);
      const res = await fetch('/api/admin/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        signal: controller.signal,
        body: body.toString()
      });
      addLog(`Fetch response received. Status: ${res.status}`);
      clearTimeout(timeoutId);
      
      let data;
      try {
        addLog(`Parsing JSON response...`);
        data = await res.json();
        addLog(`JSON parsed successfully. Success: ${data.success}`);
      } catch (parseErr: any) {
        addLog(`JSON parse error: ${parseErr.message}`);
        throw new Error('Invalid JSON response from server');
      }

      if (data.success) {
        addLog('Login successful. Saving token.');
        localStorage.setItem('admin_token', data.token);
        setToken(data.token);
        setError('');
      } else {
        addLog(`Login failed: ${data.error}`);
        setError(data.error || 'Login failed');
      }
    } catch (err: any) {
      addLog(`Catch block error: ${err.name} - ${err.message}`);
      console.error(err);
      if (err.name === 'AbortError') {
        setError('Error: Request timed out. Server might be down or busy.');
      } else {
        setError('Error: ' + (err.message || 'Server unreachable'));
      }
    } finally {
      setIsLoading(false);
      addLog(`Loading state set to false`);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('admin_token');
    setToken(null);
    navigate('/admin');
  };

  if (!token) {
    return (
      <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'var(--color-abyss)' }}>
        <form onSubmit={handleLogin} className="glass-card" style={{ width: '100%', maxWidth: '400px', padding: '2rem' }}>
          <h2 style={{ marginBottom: '1.5rem', textAlign: 'center' }}>Admin Login</h2>
          {error && <div style={{ color: '#ef4444', marginBottom: '1rem', textAlign: 'center' }}>{error}</div>}
          <div style={{ marginBottom: '1rem' }}>
            <input type="text" placeholder="Username" value={username} onChange={e => setUsername(e.target.value)} style={{ width: '100%', padding: '12px', background: 'var(--color-deep)', border: '1px solid var(--color-glass-border)', color: 'white' }} required />
          </div>
          <div style={{ marginBottom: '1.5rem' }}>
            <input type="password" placeholder="Password" value={password} onChange={e => setPassword(e.target.value)} style={{ width: '100%', padding: '12px', background: 'var(--color-deep)', border: '1px solid var(--color-glass-border)', color: 'white' }} required />
          </div>
          <button type="submit" className="btn-primary" style={{ width: '100%', opacity: isLoading ? 0.7 : 1 }} disabled={isLoading}>
            {isLoading ? 'Logging in...' : 'Login'}
          </button>
          
          {debugLogs.length > 0 && (
            <div style={{ marginTop: '2rem', padding: '1rem', background: 'rgba(0,0,0,0.5)', borderRadius: '4px', fontSize: '12px', color: '#0f0', fontFamily: 'monospace', maxHeight: '200px', overflowY: 'auto' }}>
              <div style={{ marginBottom: '4px', color: '#fff' }}>Debug Logs:</div>
              {debugLogs.map((log, i) => (
                <div key={i} style={{ wordBreak: 'break-all' }}>{log}</div>
              ))}
            </div>
          )}
        </form>
      </div>
    );
  }

  const activeStyle = { background: 'var(--color-aqua)', color: 'var(--color-abyss)' };
  const getLinkStyle = (path: string) => (location.pathname === path ? activeStyle : {});

  return (
    <div style={{ display: 'flex', minHeight: '100vh', background: 'var(--color-abyss)' }}>
      {/* Sidebar */}
      <aside style={{ width: '240px', background: 'var(--color-deep)', borderRight: '1px solid var(--color-glass-border)', display: 'flex', flexDirection: 'column' }}>
        <div style={{ padding: '2rem', borderBottom: '1px solid var(--color-glass-border)' }}>
          <span style={{ fontFamily: 'var(--font-display)', fontSize: '24px', color: 'var(--color-gold)' }}>UTTC Admin</span>
        </div>
        <nav style={{ flex: 1, padding: '1rem', display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
          <Link to="/admin" className="admin-nav-link" style={getLinkStyle('/admin')}>Dashboard</Link>
          <Link to="/admin/leads" className="admin-nav-link" style={getLinkStyle('/admin/leads')}>Leads Pipeline</Link>
          <Link to="/admin/analytics" className="admin-nav-link" style={getLinkStyle('/admin/analytics')}>Web Analytics</Link>
          <Link to="/admin/recommendations" className="admin-nav-link" style={getLinkStyle('/admin/recommendations')}>AI Recommendations</Link>
          <Link to="/admin/content" className="admin-nav-link" style={getLinkStyle('/admin/content')}>Content Editor</Link>
        </nav>
        <div style={{ padding: '1rem', borderTop: '1px solid var(--color-glass-border)' }}>
          <button onClick={handleLogout} style={{ background: 'none', border: 'none', color: 'var(--color-text-dim)', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            ← Logout
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main style={{ flex: 1, padding: '2rem', overflowY: 'auto', background: 'var(--color-abyss)' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
          <Outlet context={{ token }} />
        </div>
      </main>

      <style>{`
        .admin-nav-link {
          display: block;
          padding: 10px 16px;
          color: var(--color-foam);
          border-radius: 4px;
          font-weight: 500;
          transition: var(--transition);
        }
        .admin-nav-link:hover {
          background: rgba(255,255,255,0.05);
        }
      `}</style>
    </div>
  );
}
