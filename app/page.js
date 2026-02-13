'use client';

import { useState } from 'react';

export default function Home() {
    const [html, setHtml] = useState(
        '<html>\n<body style="font-family: Arial; padding: 40px; background: #fff;">\n  <h1 style="color: #333;">Hello from ScreenshotDONE!</h1>\n  <p style="color: #666; font-size: 18px;">This is a test email body rendered as a screenshot.</p>\n  <table style="border-collapse: collapse; margin-top: 20px; width: 100%;">\n    <tr style="background: #7c3aed; color: white;">\n      <th style="padding: 12px;">Name</th>\n      <th style="padding: 12px;">Status</th>\n    </tr>\n    <tr>\n      <td style="padding: 12px; border: 1px solid #ddd;">Project Alpha</td>\n      <td style="padding: 12px; border: 1px solid #ddd;">✅ Complete</td>\n    </tr>\n  </table>\n</body>\n</html>'
    );
    const [width, setWidth] = useState('1280');
    const [quality, setQuality] = useState('80');
    const [loading, setLoading] = useState(false);
    const [result, setResult] = useState(null);
    const [error, setError] = useState(null);

    const handleSubmit = async () => {
        setLoading(true);
        setResult(null);
        setError(null);

        try {
            const res = await fetch('/api/screenshot', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    html,
                    width: parseInt(width) || 1280,
                    quality: parseInt(quality) || 80,
                }),
            });

            if (!res.ok) {
                const errData = await res.json();
                throw new Error(errData.error || 'Unknown error');
            }

            const blob = await res.blob();
            const url = URL.createObjectURL(blob);
            setResult(url);
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    const copyToClipboard = (text) => {
        navigator.clipboard.writeText(text);
    };

    const curlExample = `curl -X POST https://your-domain.vercel.app/api/screenshot \\
  -H "Content-Type: application/json" \\
  -d '{"html": "<html><body><h1>Hello</h1></body></html>"}' \\
  --output screenshot.webp`;

    const pythonExample = `import requests

html_content = "<html><body><h1>Hello</h1></body></html>"
response = requests.post(
    "https://your-domain.vercel.app/api/screenshot",
    json={"html": html_content}
)
with open("screenshot.webp", "wb") as f:
    f.write(response.content)`;

    const jsExample = `const response = await fetch(
  "https://your-domain.vercel.app/api/screenshot",
  {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      html: "<html><body><h1>Hello</h1></body></html>"
    })
  }
);
const blob = await response.blob();`;

    return (
        <>
            {/* ── HERO ── */}
            <section className="hero">
                <div className="hero-badge">
                    <span className="dot"></span>
                    API Online
                </div>
                <h1>
                    Screenshot<span className="gradient">DONE</span>
                </h1>
                <p>
                    Send HTML via API. Get pixel-perfect, full-body WebP screenshots back
                    instantly. No blank spaces, no headaches.
                </p>
            </section>

            <div className="container">
                {/* ── ENDPOINT ── */}
                <section className="section">
                    <h2 className="section-title">
                        <span className="icon">⚡</span> API Endpoint
                    </h2>

                    <div className="api-card">
                        <div className="api-card-header">
                            <span className="method-badge post">POST</span>
                            <span className="endpoint-url">/api/screenshot</span>
                        </div>
                        <div className="api-card-body">
                            <table className="params-table">
                                <thead>
                                    <tr>
                                        <th>Parameter</th>
                                        <th>Type</th>
                                        <th>Description</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td>
                                            <span className="param-name">html</span>{' '}
                                            <span className="badge required">required</span>
                                        </td>
                                        <td>
                                            <span className="param-type">string</span>
                                        </td>
                                        <td>Full HTML string to render and screenshot</td>
                                    </tr>
                                    <tr>
                                        <td>
                                            <span className="param-name">width</span>{' '}
                                            <span className="badge optional">optional</span>
                                        </td>
                                        <td>
                                            <span className="param-type">number</span>
                                        </td>
                                        <td>Viewport width in pixels (default: 1280, range: 320–3840)</td>
                                    </tr>
                                    <tr>
                                        <td>
                                            <span className="param-name">quality</span>{' '}
                                            <span className="badge optional">optional</span>
                                        </td>
                                        <td>
                                            <span className="param-type">number</span>
                                        </td>
                                        <td>WebP quality 1–100 (default: 80)</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>

                    <div style={{ marginTop: '16px' }}>
                        <h3 className="section-title" style={{ fontSize: '1rem' }}>
                            <span className="icon">📦</span> Response
                        </h3>
                        <div className="response-info">
                            <div className="response-chip">200 OK</div>
                            <div className="response-chip">Content-Type: image/webp</div>
                            <div className="response-chip">Binary WebP data</div>
                        </div>
                    </div>
                </section>

                {/* ── CODE EXAMPLES ── */}
                <section className="section">
                    <h2 className="section-title">
                        <span className="icon">📝</span> Usage Examples
                    </h2>

                    {/* cURL */}
                    <div className="code-block">
                        <div className="code-header">
                            <span className="code-lang">cURL</span>
                            <button
                                className="copy-btn"
                                onClick={() => copyToClipboard(curlExample)}
                            >
                                Copy
                            </button>
                        </div>
                        <div className="code-content">
                            <pre>
                                <span className="variable">curl</span> -X POST
                                https://your-domain.vercel.app/api/screenshot \{'\n'}  -H{' '}
                                <span className="string">
                                    &quot;Content-Type: application/json&quot;
                                </span>{' '}
                                \{'\n'}  -d{' '}
                                <span className="string">
                                    {
                                        '\'{"html": "<html><body><h1>Hello</h1></body></html>"}\''
                                    }
                                </span>{' '}
                                \{'\n'}  --output screenshot.webp
                            </pre>
                        </div>
                    </div>

                    {/* Python */}
                    <div className="code-block">
                        <div className="code-header">
                            <span className="code-lang">Python</span>
                            <button
                                className="copy-btn"
                                onClick={() => copyToClipboard(pythonExample)}
                            >
                                Copy
                            </button>
                        </div>
                        <div className="code-content">
                            <pre>
                                <span className="keyword">import</span>{' '}
                                <span className="variable">requests</span>
                                {'\n\n'}
                                <span className="variable">html_content</span> ={' '}
                                <span className="string">
                                    &quot;&lt;html&gt;&lt;body&gt;&lt;h1&gt;Hello&lt;/h1&gt;&lt;/body&gt;&lt;/html&gt;&quot;
                                </span>
                                {'\n'}
                                <span className="variable">response</span> ={' '}
                                <span className="variable">requests</span>.
                                <span className="function">post</span>(
                                {'\n'}
                                {'    '}
                                <span className="string">
                                    &quot;https://your-domain.vercel.app/api/screenshot&quot;
                                </span>
                                ,{'\n'}
                                {'    '}
                                <span className="property">json</span>={'{'}
                                <span className="string">&quot;html&quot;</span>:{' '}
                                <span className="variable">html_content</span>
                                {'}'}
                                {'\n'})
                                {'\n'}
                                <span className="keyword">with</span>{' '}
                                <span className="function">open</span>(
                                <span className="string">&quot;screenshot.webp&quot;</span>,{' '}
                                <span className="string">&quot;wb&quot;</span>) as{' '}
                                <span className="variable">f</span>:{'\n'}
                                {'    '}
                                <span className="variable">f</span>.
                                <span className="function">write</span>(
                                <span className="variable">response</span>.
                                <span className="property">content</span>)
                            </pre>
                        </div>
                    </div>

                    {/* JavaScript */}
                    <div className="code-block">
                        <div className="code-header">
                            <span className="code-lang">JavaScript</span>
                            <button
                                className="copy-btn"
                                onClick={() => copyToClipboard(jsExample)}
                            >
                                Copy
                            </button>
                        </div>
                        <div className="code-content">
                            <pre>
                                <span className="keyword">const</span>{' '}
                                <span className="variable">response</span> ={' '}
                                <span className="keyword">await</span>{' '}
                                <span className="function">fetch</span>(
                                {'\n'}
                                {'  '}
                                <span className="string">
                                    &quot;https://your-domain.vercel.app/api/screenshot&quot;
                                </span>
                                ,
                                {'\n'}
                                {'  '}
                                {'{'}
                                {'\n'}
                                {'    '}
                                <span className="property">method</span>:{' '}
                                <span className="string">&quot;POST&quot;</span>,{'\n'}
                                {'    '}
                                <span className="property">headers</span>: {'{'}{' '}
                                <span className="string">
                                    &quot;Content-Type&quot;
                                </span>
                                :{' '}
                                <span className="string">
                                    &quot;application/json&quot;
                                </span>{' '}
                                {'}'},
                                {'\n'}
                                {'    '}
                                <span className="property">body</span>: JSON.
                                <span className="function">stringify</span>({'{'}
                                {'\n'}
                                {'      '}
                                <span className="property">html</span>:{' '}
                                <span className="string">
                                    &quot;&lt;html&gt;&lt;body&gt;...&lt;/body&gt;&lt;/html&gt;&quot;
                                </span>
                                {'\n'}
                                {'    '}
                                {'}'})
                                {'\n'}
                                {'  '}
                                {'}'}
                                {'\n'});{'\n'}
                                <span className="keyword">const</span>{' '}
                                <span className="variable">blob</span> ={' '}
                                <span className="keyword">await</span>{' '}
                                <span className="variable">response</span>.
                                <span className="function">blob</span>();
                            </pre>
                        </div>
                    </div>
                </section>

                {/* ── TRY IT ── */}
                <section className="section">
                    <h2 className="section-title">
                        <span className="icon">🚀</span> Try It Live
                    </h2>

                    <div className="try-card">
                        <div className="input-group">
                            <label>HTML Content</label>
                            <textarea
                                className="textarea"
                                value={html}
                                onChange={(e) => setHtml(e.target.value)}
                                placeholder="Paste your HTML here..."
                            />
                        </div>

                        <div className="input-row" style={{ marginBottom: '20px' }}>
                            <div className="input-group">
                                <label>Width (px)</label>
                                <input
                                    className="input-field"
                                    type="number"
                                    value={width}
                                    onChange={(e) => setWidth(e.target.value)}
                                    min="320"
                                    max="3840"
                                />
                            </div>
                            <div className="input-group">
                                <label>Quality (1–100)</label>
                                <input
                                    className="input-field"
                                    type="number"
                                    value={quality}
                                    onChange={(e) => setQuality(e.target.value)}
                                    min="1"
                                    max="100"
                                />
                            </div>
                        </div>

                        <button
                            className="submit-btn"
                            onClick={handleSubmit}
                            disabled={loading || !html.trim()}
                        >
                            {loading ? (
                                <>
                                    <span className="loading-spinner"></span>
                                    Generating...
                                </>
                            ) : (
                                <>📸 Take Screenshot</>
                            )}
                        </button>

                        {(result || error || loading) && (
                            <div className="result-area">
                                {loading && !result && (
                                    <span className="result-placeholder">
                                        Rendering your HTML... this may take a few seconds.
                                    </span>
                                )}
                                {error && <span className="error-text">❌ {error}</span>}
                                {result && (
                                    <div>
                                        <img src={result} alt="Screenshot result" />
                                        <div style={{ marginTop: '12px' }}>
                                            <a
                                                href={result}
                                                download="screenshot.webp"
                                                className="submit-btn"
                                                style={{
                                                    textDecoration: 'none',
                                                    display: 'inline-flex',
                                                    fontSize: '0.8rem',
                                                    padding: '8px 20px',
                                                }}
                                            >
                                                ⬇ Download WebP
                                            </a>
                                        </div>
                                    </div>
                                )}
                            </div>
                        )}
                    </div>
                </section>
            </div>

            <footer className="footer">
                ScreenshotDONE &mdash; HTML to WebP Screenshot API
            </footer>
        </>
    );
}
