/**
 * Experiment 06: Design a Web Page using Node.js (Pure Core Modules)
 * Student: Somnath Jha (25CE1050) | RAIT Computer Engineering
 * Domain: TechVault Core Hardware Web Server
 * 
 * NOTE: Built strictly with native Node.js core modules ('http', 'url', 'os', 'path')
 * without third-party frameworks to demonstrate core HTTP web server concepts.
 */

const http = require('http');
const url = require('url');
const os = require('os');

const PORT = process.env.PORT || 3001;

function renderLayout(title, content) {
    return `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>${title} - TechVault Node.js Core Server</title>
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@400;500;600;700;800&display=swap" rel="stylesheet">
    <style>
        :root {
            --primary: #6366f1;
            --primary-dark: #4f46e5;
            --bg: #090d16;
            --card: #111827;
            --text: #f9fafb;
            --text-muted: #9ca3af;
            --border: #1f2937;
            --radius: 12px;
        }
        * { box-sizing: border-box; margin: 0; padding: 0; font-family: 'Space Grotesk', sans-serif; }
        body { background: var(--bg); color: var(--text); line-height: 1.6; }
        
        .student-bar {
            background: #05080f; color: #9ca3af; padding: 8px 24px; font-size: 0.8rem;
            display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; gap: 8px;
            border-bottom: 1px solid var(--border);
        }
        .student-bar strong { color: #818cf8; }

        header {
            background: rgba(17, 24, 39, 0.95); border-bottom: 1px solid var(--border); padding: 16px 36px;
            display: flex; justify-content: space-between; align-items: center;
        }
        .logo { font-size: 1.4rem; font-weight: 800; color: var(--primary); text-decoration: none; display: flex; align-items: center; gap: 8px; }
        nav { display: flex; gap: 18px; }
        nav a { text-decoration: none; color: #d1d5db; font-weight: 600; font-size: 0.9rem; }
        nav a:hover { color: #818cf8; }

        .hero {
            background: linear-gradient(135deg, #1e1b4b 0%, #0f172a 100%);
            color: #ffffff; padding: 48px 24px; text-align: center; border-bottom: 1px solid var(--border);
        }
        .hero h1 { font-size: 2.2rem; font-weight: 800; margin-bottom: 8px; }
        .hero p { color: #c7d2fe; max-width: 600px; margin: 0 auto; font-size: 1rem; }

        .container { max-width: 1000px; margin: 36px auto; padding: 0 20px; }
        .card { background: var(--card); border-radius: var(--radius); padding: 28px; border: 1px solid var(--border); box-shadow: 0 4px 15px rgba(0,0,0,0.3); margin-bottom: 24px; }
        .card h2 { font-size: 1.3rem; margin-bottom: 14px; color: #ffffff; }

        .stats-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 16px; margin-top: 14px; }
        .stat-box { background: #1f2937; padding: 14px; border-radius: 8px; text-align: center; border: 1px solid var(--border); }
        .stat-box span { font-size: 0.78rem; color: #9ca3af; text-transform: uppercase; font-weight: 700; }
        .stat-box strong { display: block; font-size: 1.1rem; color: #818cf8; margin-top: 4px; }

        .form-row { margin-bottom: 14px; }
        .form-row label { display: block; font-size: 0.85rem; font-weight: 600; margin-bottom: 4px; color: #e5e7eb; }
        .form-row input, .form-row select, .form-row textarea {
            width: 100%; padding: 10px; border: 1.5px solid var(--border); border-radius: 8px; font-size: 0.9rem;
            background: #1f2937; color: #ffffff;
        }
        .btn-submit {
            background: var(--primary); color: #ffffff; border: none; padding: 12px 24px;
            font-size: 0.95rem; font-weight: 700; border-radius: 8px; cursor: pointer;
        }
        .btn-submit:hover { background: var(--primary-dark); }

        footer { text-align: center; padding: 24px; color: #6b7280; font-size: 0.8rem; border-top: 1px solid var(--border); margin-top: 40px; }
    </style>
</head>
<body>
    <div class="student-bar">
        <span>SBL-AWT Expt 06 | <strong>Design a Web Page using Node.js</strong></span>
        <span>Student: <strong>Somnath Jha (25CE1050)</strong> | RAIT Computer Engineering</span>
    </div>

    <header>
        <a href="/" class="logo"><span>⚡</span> TechVault Node.js Portal</a>
        <nav>
            <a href="/">Home</a>
            <a href="/about">About Hub</a>
            <a href="/api/status">Server Diagnostics (JSON)</a>
        </nav>
    </header>

    ${content}

    <footer>
        <p>&copy; 2026 TechVault E-Commerce Suite | Skill Based Lab - Advanced Web Technology | Pure Node.js Server</p>
    </footer>
</body>
</html>`;
}

const server = http.createServer((req, res) => {
    const parsedUrl = url.parse(req.url, true);
    const pathname = parsedUrl.pathname;
    const method = req.method;

    console.log(`[${new Date().toLocaleTimeString()}] ${method} request to: ${pathname}`);

    if ((pathname === '/' || pathname === '/home') && method === 'GET') {
        const uptimeMin = (process.uptime() / 60).toFixed(2);
        const freeMemMB = (os.freemem() / (1024 * 1024)).toFixed(0);
        const totalMemMB = (os.totalmem() / (1024 * 1024)).toFixed(0);

        const homeContent = `
            <div class="hero">
                <h1>Developer Equipment &amp; Rig Catalog</h1>
                <p>Served directly via Node.js native HTTP server with zero third-party dependencies.</p>
            </div>

            <div class="container">
                <!-- System Diagnostics -->
                <div class="card">
                    <h2>🖥️ Real-Time Node.js Server Diagnostics</h2>
                    <p style="color: #9ca3af; font-size: 0.88rem;">Live system metrics gathered via Node core <code>process</code> and <code>os</code> modules:</p>
                    <div class="stats-grid">
                        <div class="stat-box">
                            <span>Node Runtime</span>
                            <strong>${process.version}</strong>
                        </div>
                        <div class="stat-box">
                            <span>Server Uptime</span>
                            <strong>${uptimeMin} Minutes</strong>
                        </div>
                        <div class="stat-box">
                            <span>Memory (Free / Total)</span>
                            <strong>${freeMemMB}MB / ${totalMemMB}MB</strong>
                        </div>
                        <div class="stat-box">
                            <span>OS Platform</span>
                            <strong>${os.type()} (${os.arch()})</strong>
                        </div>
                    </div>
                </div>

                <!-- Instant Hardware Quote Form -->
                <div class="card">
                    <h2>⚡ Generate Instant Procurement Quote</h2>
                    <form action="/quote" method="POST">
                        <div class="form-row">
                            <label>Developer / Company Name</label>
                            <input type="text" name="devName" placeholder="e.g. Somnath Jha" required>
                        </div>
                        <div class="form-row">
                            <label>Corporate Contact Email</label>
                            <input type="email" name="email" placeholder="dev@techvault.io" required>
                        </div>
                        <div class="form-row">
                            <label>Select Target Hardware Category</label>
                            <select name="hardware">
                                <option value="Titan-X 49\" Curved OLED Display">Titan-X 49" Curved OLED Display (₹1,15,000)</option>
                                <option value="Apex-Pro Developer Workstation (64GB DDR5)">Apex-Pro Developer Workstation (₹1,85,000)</option>
                                <option value="NVIDIA RTX 4090 24GB AI Station">NVIDIA RTX 4090 24GB AI Station (₹1,72,000)</option>
                                <option value="Keychron Q1 Pro Mechanical Keyboard">Keychron Q1 Pro Mechanical Keyboard (₹16,500)</option>
                            </select>
                        </div>
                        <div class="form-row">
                            <label>Required Deployment Units</label>
                            <input type="number" name="quantity" value="1" min="1" max="25" required>
                        </div>
                        <button type="submit" class="btn-submit">Compute Hardware Quote via Node Stream &rarr;</button>
                    </form>
                </div>
            </div>
        `;

        res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' });
        res.end(renderLayout('Home', homeContent));
    }

    else if (pathname === '/about' && method === 'GET') {
        const aboutContent = `
            <div class="hero">
                <h1>About TechVault Hardware Engineering</h1>
                <p>Enterprise Computing Peripherals &amp; AI Accelerators for Developers</p>
            </div>
            <div class="container">
                <div class="card">
                    <h2>Our Mission</h2>
                    <p style="margin-bottom: 12px;">TechVault supplies enterprise hardware infrastructure for software developers, research institutes, and AI laboratories.</p>
                    <p>Designed and served via pure Node.js as part of the Skill Based Lab - Advanced Web Technology curriculum at Ramrao Adik Institute of Technology (RAIT), Nerul, Navi Mumbai.</p>
                    <div style="margin-top: 20px;">
                        <a href="/" style="color: #818cf8; font-weight: 700; text-decoration: none;">&larr; Return to Home Page</a>
                    </div>
                </div>
            </div>
        `;
        res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' });
        res.end(renderLayout('About Us', aboutContent));
    }

    else if (pathname === '/quote' && method === 'POST') {
        let body = '';
        req.on('data', chunk => { body += chunk.toString(); });
        req.on('end', () => {
            const parsed = new URLSearchParams(body);
            const devName = parsed.get('devName') || 'Guest Developer';
            const email = parsed.get('email') || 'N/A';
            const hardware = parsed.get('hardware') || 'General Hardware';
            const quantity = parseInt(parsed.get('quantity') || '1', 10);
            const quoteRef = 'TV-QUOTE-' + Math.floor(100000 + Math.random() * 900000);

            let unitCost = 115000;
            if (hardware.includes('Apex-Pro')) unitCost = 185000;
            if (hardware.includes('RTX 4090')) unitCost = 172000;
            if (hardware.includes('Keychron')) unitCost = 16500;

            const total = unitCost * quantity;

            const resultHtml = `
                <div class="hero" style="background: linear-gradient(135deg, #065f46 0%, #047857 100%);">
                    <h1>✓ Official Hardware Quote Generated!</h1>
                    <p>Processed completely via Native Node.js stream accumulation and buffer parsing.</p>
                </div>
                <div class="container">
                    <div class="card" style="border-top: 4px solid #10b981;">
                        <h2>Procurement Estimate Sheet</h2>
                        <div style="background: #1f2937; border: 1px solid #374151; padding: 18px; border-radius: 8px; margin-bottom: 20px;">
                            <p><strong>Quote Reference:</strong> <span style="font-family: monospace; font-size: 1.1rem; color: #34d399;">${quoteRef}</span></p>
                            <p><strong>Developer / Client:</strong> ${escapeHtml(devName)} (${escapeHtml(email)})</p>
                            <p><strong>Hardware Model:</strong> ${escapeHtml(hardware)}</p>
                            <p><strong>Units:</strong> ${quantity}</p>
                            <p><strong>Total Estimate:</strong> <span style="font-size:1.2rem; color:#fbbf24; font-weight:bold;">₹${total.toLocaleString()}</span> (Incl. GST)</p>
                            <p><strong>Server Processing Time:</strong> ${new Date().toLocaleString()}</p>
                        </div>
                        <a href="/" class="btn-submit" style="text-decoration: none; display: inline-block;">Return to Portal Home</a>
                    </div>
                </div>
            `;

            res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' });
            res.end(renderLayout('Quote Generated', resultHtml));
        });
    }

    else if (pathname === '/api/status' && method === 'GET') {
        const payload = {
            status: 'ONLINE',
            application: 'TechVault Pure Node Server',
            developer: 'Somnath Jha (25CE1050)',
            college: 'RAIT, D Y Patil Deemed to be University',
            nodeVersion: process.version,
            memory: {
                free: `${(os.freemem() / (1024 * 1024)).toFixed(2)} MB`,
                total: `${(os.totalmem() / (1024 * 1024)).toFixed(2)} MB`
            },
            uptimeSeconds: Math.floor(process.uptime()),
            timestamp: new Date().toISOString()
        };

        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify(payload, null, 2));
    }

    else {
        const notFoundContent = `
            <div class="hero" style="background: #ef4444;">
                <h1>404 — Endpoint Not Found</h1>
                <p>The requested route does not exist on this Node server.</p>
            </div>
            <div class="container">
                <div class="card" style="text-align: center;">
                    <h2>Resource Missing</h2>
                    <p style="color: #9ca3af; margin-bottom: 20px;">Requested route: <code>${escapeHtml(pathname)}</code></p>
                    <a href="/" class="btn-submit" style="text-decoration: none;">Return to Safety</a>
                </div>
            </div>
        `;
        res.writeHead(404, { 'Content-Type': 'text/html; charset=utf-8' });
        res.end(renderLayout('404 Not Found', notFoundContent));
    }
});

function escapeHtml(str) {
    return str.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
}

server.listen(PORT, () => {
    console.log(`[TechVault] Pure Node.js server running on http://localhost:${PORT}`);
    console.log(`[TechVault] Author: Somnath Jha (25CE1050)`);
});
