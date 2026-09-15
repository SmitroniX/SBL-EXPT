/**
 * Experiment 06: Design a Web Page using Node.js (Pure Core Modules)
 * Student: Asmit Jogdand (25CE1051) | RAIT Computer Engineering
 * Domain: HealthPulse Telehealth Core Web Server
 * 
 * NOTE: Built strictly using native Node.js core modules ('http', 'url', 'fs', 'path', 'os')
 * without external web frameworks, fulfilling native Node.js HTTP server evaluation.
 */

const http = require('http');
const url = require('url');
const os = require('os');

const PORT = process.env.PORT || 3000;

// Master HTML Page Generator Function
function renderLayout(title, content) {
    return `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>${title} - HealthPulse Node.js Server</title>
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800&display=swap" rel="stylesheet">
    <style>
        :root {
            --primary: #0284c7;
            --primary-dark: #0369a1;
            --bg: #f8fafc;
            --card: #ffffff;
            --text: #0f172a;
            --text-muted: #64748b;
            --border: #e2e8f0;
            --radius: 12px;
        }
        * { box-sizing: border-box; margin: 0; padding: 0; font-family: 'Plus Jakarta Sans', sans-serif; }
        body { background: var(--bg); color: var(--text); line-height: 1.6; }
        
        .student-bar {
            background: #0f172a; color: #94a3b8; padding: 8px 24px; font-size: 0.8rem;
            display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; gap: 8px;
        }
        .student-bar strong { color: #38bdf8; }

        header {
            background: #ffffff; border-bottom: 1px solid var(--border); padding: 16px 36px;
            display: flex; justify-content: space-between; align-items: center;
        }
        .logo { font-size: 1.4rem; font-weight: 800; color: var(--primary); text-decoration: none; display: flex; align-items: center; gap: 8px; }
        nav { display: flex; gap: 18px; }
        nav a { text-decoration: none; color: #475569; font-weight: 600; font-size: 0.9rem; }
        nav a:hover { color: var(--primary); }

        .hero {
            background: linear-gradient(135deg, #0c4a6e 0%, #0284c7 100%);
            color: #ffffff; padding: 48px 24px; text-align: center;
        }
        .hero h1 { font-size: 2.2rem; font-weight: 800; margin-bottom: 8px; }
        .hero p { color: #e0f2fe; max-width: 600px; margin: 0 auto; font-size: 1rem; }

        .container { max-width: 1000px; margin: 36px auto; padding: 0 20px; }
        .card { background: var(--card); border-radius: var(--radius); padding: 28px; border: 1px solid var(--border); box-shadow: 0 4px 15px rgba(0,0,0,0.03); margin-bottom: 24px; }
        .card h2 { font-size: 1.3rem; margin-bottom: 14px; color: #0f172a; }

        .stats-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 16px; margin-top: 14px; }
        .stat-box { background: #f1f5f9; padding: 14px; border-radius: 8px; text-align: center; }
        .stat-box span { font-size: 0.78rem; color: #64748b; text-transform: uppercase; font-weight: 700; }
        .stat-box strong { display: block; font-size: 1.1rem; color: #0f172a; margin-top: 4px; }

        .form-row { margin-bottom: 14px; }
        .form-row label { display: block; font-size: 0.85rem; font-weight: 600; margin-bottom: 4px; color: #334155; }
        .form-row input, .form-row select, .form-row textarea {
            width: 100%; padding: 10px; border: 1.5px solid var(--border); border-radius: 8px; font-size: 0.9rem;
        }
        .btn-submit {
            background: var(--primary); color: #ffffff; border: none; padding: 12px 24px;
            font-size: 0.95rem; font-weight: 700; border-radius: 8px; cursor: pointer;
        }
        .btn-submit:hover { background: var(--primary-dark); }

        footer { text-align: center; padding: 24px; color: #64748b; font-size: 0.8rem; border-top: 1px solid var(--border); margin-top: 40px; }
    </style>
</head>
<body>
    <div class="student-bar">
        <span>SBL-AWT Expt 06 | <strong>Design a Web Page using Node.js</strong></span>
        <span>Student: <strong>Asmit Jogdand (25CE1051)</strong> | RAIT Computer Engineering</span>
    </div>

    <header>
        <a href="/" class="logo"><span>➕</span> HealthPulse Node.js Portal</a>
        <nav>
            <a href="/">Home</a>
            <a href="/about">About Clinic</a>
            <a href="/api/status">Server Metrics (JSON)</a>
        </nav>
    </header>

    ${content}

    <footer>
        <p>&copy; 2026 HealthPulse Clinical Suite | Skill Based Lab - Advanced Web Technology | Pure Node.js Server</p>
    </footer>
</body>
</html>`;
}

// HTTP Server Logic
const server = http.createServer((req, res) => {
    const parsedUrl = url.parse(req.url, true);
    const pathname = parsedUrl.pathname;
    const method = req.method;

    console.log(`[${new Date().toLocaleTimeString()}] HTTP ${method} request to: ${pathname}`);

    // Route 1: Home Page (GET /)
    if ((pathname === '/' || pathname === '/home') && method === 'GET') {
        const uptimeMin = (process.uptime() / 60).toFixed(2);
        const freeMemMB = (os.freemem() / (1024 * 1024)).toFixed(0);
        const totalMemMB = (os.totalmem() / (1024 * 1024)).toFixed(0);

        const homeContent = `
            <div class="hero">
                <h1>Virtual Telemedicine & Medical Portal</h1>
                <p>Delivered directly via Node.js native HTTP web server without external frameworks.</p>
            </div>

            <div class="container">
                <!-- Server Diagnostics Card -->
                <div class="card">
                    <h2>🖥️ Real-Time Node.js Server Diagnostics</h2>
                    <p style="color: #64748b; font-size: 0.88rem;">Live execution metrics fetched via Node core <code>process</code> and <code>os</code> modules:</p>
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

                <!-- Instant Consultation Booking Form -->
                <div class="card">
                    <h2>🩺 Book Fast Telemedicine Consultation</h2>
                    <form action="/consultation" method="POST">
                        <div class="form-row">
                            <label>Patient Full Name</label>
                            <input type="text" name="patientName" placeholder="e.g. Asmit Jogdand" required>
                        </div>
                        <div class="form-row">
                            <label>Contact Phone Number</label>
                            <input type="tel" name="phone" placeholder="9876543210" required>
                        </div>
                        <div class="form-row">
                            <label>Select Clinical Department</label>
                            <select name="department">
                                <option value="Cardiology">Cardiology (Heart Care)</option>
                                <option value="Neurology">Neurology & Brain Sciences</option>
                                <option value="Pediatrics">Pediatrics & Child Wellness</option>
                                <option value="General Medicine">General OPD Consultation</option>
                            </select>
                        </div>
                        <div class="form-row">
                            <label>Brief Symptoms / Medical Concern</label>
                            <textarea name="symptoms" rows="3" placeholder="Describe symptoms briefly..." required></textarea>
                        </div>
                        <button type="submit" class="btn-submit">Submit Consultation to Node Server &rarr;</button>
                    </form>
                </div>
            </div>
        `;

        res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' });
        res.end(renderLayout('Home', homeContent));
    }

    // Route 2: About Page (GET /about)
    else if (pathname === '/about' && method === 'GET') {
        const aboutContent = `
            <div class="hero">
                <h1>About HealthPulse Multi-Specialty</h1>
                <p>Excellence in Healthcare Delivery & Academic Clinical Research</p>
            </div>
            <div class="container">
                <div class="card">
                    <h2>Accreditation & Standards</h2>
                    <p style="margin-bottom: 12px;">HealthPulse operates under strict clinical protocols adhering to National Accreditation Board for Hospitals & Healthcare Providers (NABH) guidelines.</p>
                    <p>Designed and hosted using pure Node.js as part of the Skill Based Lab - Advanced Web Technology curriculum at Ramrao Adik Institute of Technology (RAIT), Nerul, Navi Mumbai.</p>
                    <div style="margin-top: 20px;">
                        <a href="/" style="color: #0284c7; font-weight: 700; text-decoration: none;">&larr; Return to Home Page</a>
                    </div>
                </div>
            </div>
        `;
        res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' });
        res.end(renderLayout('About Us', aboutContent));
    }

    // Route 3: Form Processing (POST /consultation)
    else if (pathname === '/consultation' && method === 'POST') {
        let body = '';
        req.on('data', chunk => {
            body += chunk.toString();
        });

        req.on('end', () => {
            const parsedData = new URLSearchParams(body);
            const patientName = parsedData.get('patientName') || 'Guest Patient';
            const phone = parsedData.get('phone') || 'N/A';
            const department = parsedData.get('department') || 'General';
            const symptoms = parsedData.get('symptoms') || 'None recorded';
            const tokenNumber = 'HP-' + Math.floor(100000 + Math.random() * 900000);

            const resultHtml = `
                <div class="hero" style="background: linear-gradient(135deg, #065f46 0%, #10b981 100%);">
                    <h1>✓ Consultation Request Confirmed!</h1>
                    <p>Processed entirely through Native Node.js request streaming and buffer parsing.</p>
                </div>
                <div class="container">
                    <div class="card" style="border-top: 4px solid #10b981;">
                        <h2>Consultation Summary Ticket</h2>
                        <div style="background: #f0fdf4; border: 1px solid #bbf7d0; padding: 18px; border-radius: 8px; margin-bottom: 20px;">
                            <p><strong>Appointment Token:</strong> <span style="font-family: monospace; font-size: 1.1rem; color: #166534;">${tokenNumber}</span></p>
                            <p><strong>Patient Name:</strong> ${escapeHtml(patientName)}</p>
                            <p><strong>Contact Phone:</strong> ${escapeHtml(phone)}</p>
                            <p><strong>Department:</strong> ${escapeHtml(department)}</p>
                            <p><strong>Reported Symptoms:</strong> ${escapeHtml(symptoms)}</p>
                            <p><strong>Server Process Timestamp:</strong> ${new Date().toLocaleString()}</p>
                        </div>
                        <a href="/" class="btn-submit" style="text-decoration: none; display: inline-block;">Return to Portal Home</a>
                    </div>
                </div>
            `;

            res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' });
            res.end(renderLayout('Consultation Confirmed', resultHtml));
        });
    }

    // Route 4: JSON Metrics API (GET /api/status)
    else if (pathname === '/api/status' && method === 'GET') {
        const payload = {
            status: 'ONLINE',
            application: 'HealthPulse Node Server',
            developer: 'Asmit Jogdand (25CE1051)',
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

    // Route 5: 404 Not Found
    else {
        const notFoundContent = `
            <div class="hero" style="background: #ef4444;">
                <h1>404 — Page Not Found</h1>
                <p>The requested endpoint does not exist on this Node.js server.</p>
            </div>
            <div class="container">
                <div class="card" style="text-align: center;">
                    <h2>Resource Not Located</h2>
                    <p style="color: #64748b; margin-bottom: 20px;">Requested route: <code>${escapeHtml(pathname)}</code></p>
                    <a href="/" class="btn-submit" style="text-decoration: none;">Back to Safety</a>
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
    console.log(`[HealthPulse] Native Node.js server is running at http://localhost:${PORT}`);
    console.log(`[HealthPulse] Student: Asmit Jogdand (25CE1051)`);
});
