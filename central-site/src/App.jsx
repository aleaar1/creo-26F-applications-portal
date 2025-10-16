import { useMemo, useState } from 'react'

function Card({ title, description, linkHref, badge, manualState, downloadHref, flexBasis = 320 }) {
  const [manual, setManual] = manualState

  const cardStyle = {
    background: 'linear-gradient(135deg, rgba(255,255,255,0.85), rgba(255,255,255,0.75))',
    borderRadius: 18,
    padding: 24,
    boxShadow: '0 20px 35px rgba(0,0,0,0.1)',
    minHeight: 240,
    display: 'flex',
    flexDirection: 'column',
    gap: 12,
    flex: `1 1 ${flexBasis}px`,
    maxWidth: '100%',
  }

  const badgeStyle = {
    alignSelf: 'flex-start',
    background: '#eef2ff',
    color: '#4f46e5',
    borderRadius: 9999,
    padding: '6px 12px',
    fontSize: 12,
    fontWeight: 700,
    letterSpacing: 0.4,
    textTransform: 'uppercase',
  }

  const titleStyle = { margin: 0, fontSize: 22, color: '#111827' }
  const descStyle = { margin: 0, color: '#4b5563', lineHeight: 1.5 }

  const buttonBarStyle = { display: 'flex', gap: 12, marginTop: 12 }
  const buttonStyle = {
    background: 'linear-gradient(135deg, #6366f1, #8b5cf6)',
    color: 'white',
    border: 'none',
    borderRadius: 10,
    padding: '10px 14px',
    cursor: 'pointer',
    fontWeight: 600,
  }
  const secondaryButtonStyle = {
    background: 'white',
    color: '#4338ca',
    border: '1px solid rgba(99,102,241,0.4)',
    borderRadius: 10,
    padding: '10px 14px',
    cursor: 'pointer',
    fontWeight: 600,
  }

  const detailsStyle = {
    background: 'rgba(99,102,241,0.06)',
    border: '1px solid rgba(99,102,241,0.2)',
    borderRadius: 12,
    padding: 12,
  }

  const preStyle = {
    width: '100%',
    maxHeight: 240,
    overflow: 'auto',
    borderRadius: 8,
    border: '1px solid #e5e7eb',
    padding: 12,
    background: 'white',
    color: '#111827',
    whiteSpace: 'pre-wrap',
    wordBreak: 'break-word',
    fontFamily: 'ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, "Liberation Mono", "Courier New", monospace',
    margin: 0
  }

  return (
    <div style={cardStyle}>
      {badge ? <span style={badgeStyle}>{badge}</span> : null}
      <h3 style={titleStyle}>{title}</h3>
      <p style={descStyle}>{description}</p>
      <div style={buttonBarStyle}>
        {linkHref ? (
          <a href={linkHref} target="_blank" rel="noreferrer" style={{ textDecoration: 'none' }}>
            <button style={buttonStyle}>Open App</button>
          </a>
        ) : null}
        {downloadHref ? (
          <a href={downloadHref} download target="_blank" rel="noreferrer" style={{ textDecoration: 'none' }}>
            <button style={secondaryButtonStyle}>Download APK</button>
          </a>
        ) : null}
      </div>
      <details style={detailsStyle}>
        <summary style={{ cursor: 'pointer', fontWeight: 700, color: '#4338ca' }}>Users' Manual (Markdown)</summary>
        <div style={{ marginTop: 10, display: 'flex', flexDirection: 'column', gap: 8 }}>
          <label style={{ fontSize: 12, color: '#374151' }}>Loaded from file:</label>
          <pre style={preStyle}>{manual || 'No manual found. Add a .md file in src/manuals.'}</pre>
        </div>
      </details>
    </div>
  )
}

function App() {
  // Auto-load markdown files from src/manuals at build/dev time
  const loadedManuals = useMemo(() => {
    const files = import.meta.glob('./manuals/*.md', { as: 'raw', eager: true })
    const map = {}
    Object.entries(files).forEach(([path, content]) => {
      const base = path.split('/').pop().replace(/\.md$/i, '').toLowerCase()
      map[base] = content
    })
    return map
  }, [])

  const [empManual, setEmpManual] = useState(loadedManuals['employee-monitoring-board-system'] || '')
  const [bmiManual, setBmiManual] = useState(loadedManuals['bmi-calculator'] || '')
  const [prcManual, setPrcManual] = useState(loadedManuals['payroll-calculator-prc'] || '')

  const pageStyle = {
    minHeight: '100vh',
    width: '100%',
    background: '#111827',
    display: 'flex',
    flexDirection: 'column',
  }

  const shellStyle = {
    maxWidth: 1600,
    width: '100%',
    margin: '0 auto',
    padding: '32px 24px 24px 24px',
    boxSizing: 'border-box',
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
  }

  const headerStyle = {
    background: 'linear-gradient(135deg, #f8fafc, #eef2ff)',
    borderRadius: 24,
    boxShadow: '0 30px 60px rgba(0,0,0,0.25)',
    padding: 28,
    display: 'flex',
    flexDirection: 'column',
    flex: 1,
    minHeight: 0,
  }

  const titleRow = { display: 'flex', alignItems: 'center', gap: 12 }
  const titleStyle = { fontSize: 36, margin: 0, color: '#1f2937' }
  const subtitleStyle = { marginTop: 8, color: '#6b7280' }

  const cardsWrapStyle = {
    marginTop: 24,
    display: 'flex',
    flexWrap: 'wrap',
    gap: 20,
    alignItems: 'stretch',
  }

  const footerStyle = {
    marginTop: 24,
    textAlign: 'center',
    color: '#6b7280',
    opacity: 0.9,
    paddingTop: 8,
  }

  return (
    <div style={pageStyle}>
      <div style={shellStyle}>
        <div style={headerStyle}>
          <div style={titleRow}>
            <div style={{
              width: 42,
              height: 42,
              borderRadius: 10,
              background: 'linear-gradient(135deg, #34d399, #60a5fa)',
              display: 'grid',
              placeItems: 'center',
              color: 'white',
              fontWeight: 900
            }}>∑</div>
            <h1 style={titleStyle}>EMS Application Portal</h1>
          </div>
          <p style={subtitleStyle}>Quick access to the IT Department's built tools and their documentation.</p>
          <div style={{ ...cardsWrapStyle, flex: 1 }}>
            <Card
              title="Employee Monitoring Board System"
              description="Track employee activity and board-wide status in real time."
              linkHref="https://creotec-embs.vercel.app"
              badge="Available"
              manualState={[empManual, setEmpManual]}
            />
            <Card
              title="BMI Calculator"
              description="Calculate Body Mass Index with healthy range guidance."
              badge="Available"
              manualState={[bmiManual, setBmiManual]}
              downloadHref="/BMICalculator.apk"
            />
            <Card
              title="Payroll Calculator (PRC)"
              description="Compute salaries, taxes, and deductions efficiently."
              linkHref="https://creotec-prc.vercel.app"
              badge="Available"
              manualState={[prcManual, setPrcManual]}
            />
          </div>
          <div style={footerStyle}>© {new Date().getFullYear()} Central Site</div>
        </div>
      </div>
    </div>
  )
}

export default App
