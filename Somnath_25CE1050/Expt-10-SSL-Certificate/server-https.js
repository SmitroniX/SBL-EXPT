/**
 * Experiment 10: Integration of SSL Certificate in Web Application
 * Student: Somnath Jha (25CE1050) | RAIT Computer Engineering
 * Domain: TechVault HTTPS Encrypted Web Server
 */

const https = require('https');
const http = require('http');
const fs = require('fs');
const path = require('path');
const express = require('express');

const app = express();
const HTTPS_PORT = process.env.HTTPS_PORT || 9443;
const HTTP_PORT = process.env.HTTP_PORT || 9090;

const keyPath = path.join(__dirname, 'server-key.pem');
const certPath = path.join(__dirname, 'server-cert.pem');

if (!fs.existsSync(keyPath) || !fs.existsSync(certPath)) {
    console.error('ERROR: SSL certificates not found! Run ./generate-ssl.sh first.');
    process.exit(1);
}

const sslOptions = {
    key: fs.readFileSync(keyPath),
    cert: fs.readFileSync(certPath),
    minVersion: 'TLSv1.2'
};

// Security Headers Middleware
app.use((req, res, next) => {
    res.setHeader('Strict-Transport-Security', 'max-age=31536000; includeSubDomains; preload');
    res.setHeader('X-Content-Type-Options', 'nosniff');
    res.setHeader('X-Frame-Options', 'SAMEORIGIN');
    res.setHeader('X-XSS-Protection', '1; mode=block');
    next();
});

app.get('/', (req, res) => {
    const isEncrypted = req.connection.encrypted;
    const cipher = req.socket.getCipher ? req.socket.getCipher() : { name: 'TLS_AES_256_GCM_SHA384', version: 'TLSv1.3' };

    const html = `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>TechVault - SSL/TLS Cryptographic Security Hub</title>
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@400;500;600;700;800&display=swap" rel="stylesheet">
    <style>
        :root {
            --primary: #6366f1;
            --primary-dark: #4f46e5;
            --success: #10b981;
            --bg: #090d16;
            --card: #111827;
            --text: #f9fafb;
            --text-muted: #9ca3af;
            --border: #1f2937;
            --radius: 12px;
        }
        * { box-sizing: border-box; margin: 0; padding: 0; font-family: 'Space Grotesk', sans-serif; }
        body { background: var(--bg); color: var(--text); min-height: 100vh; padding: 32px 20px; line-height: 1.6; }
        .container { max-width: 960px; margin: 0 auto; }

        .student-strip {
            background: rgba(255,255,255,0.08); border: 1px solid var(--border); padding: 8px 18px; border-radius: 8px; font-size: 0.82rem;
            display: flex; justify-content: space-between; align-items: center; margin-bottom: 24px; flex-wrap: wrap; gap: 8px; color: #c7d2fe;
        }
        .student-strip strong { color: #818cf8; }

        .hero-banner {
            background: linear-gradient(135deg, #1e1b4b 0%, #312e81 50%, #4338ca 100%);
            border-radius: var(--radius); padding: 32px; text-align: center; margin-bottom: 28px;
            box-shadow: 0 10px 30px rgba(99, 102, 241, 0.3); border: 1px solid var(--border);
        }
        .lock-badge { font-size: 3rem; margin-bottom: 8px; }
        .hero-banner h1 { font-size: 2.2rem; font-weight: 800; color: #ffffff; }
        .hero-banner p { color: #c7d2fe; font-size: 1.05rem; margin-top: 6px; }

        .card { background: var(--card); border-radius: var(--radius); padding: 26px; border: 1px solid var(--border); margin-bottom: 24px; }
        .card h2 { font-size: 1.25rem; font-weight: 700; color: #818cf8; margin-bottom: 16px; display: flex; align-items: center; gap: 8px; }

        .specs-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(220px, 1fr)); gap: 16px; }
        .spec-box { background: #1f2937; border: 1px solid var(--border); padding: 14px; border-radius: 8px; }
        .spec-label { font-size: 0.75rem; color: var(--text-muted); text-transform: uppercase; font-weight: 700; }
        .spec-value { font-family: monospace; font-size: 0.95rem; color: #34d399; font-weight: 700; margin-top: 4px; word-break: break-all; }

        .cert-details {
            background: #090d16; border-radius: 8px; padding: 16px; font-family: monospace; font-size: 0.82rem; color: #cbd5e1; margin-top: 14px;
            border-left: 4px solid var(--primary);
        }

        .alert-box {
            background: rgba(99, 102, 241, 0.15); border: 1px solid var(--primary); padding: 14px 18px; border-radius: 8px; font-size: 0.88rem; color: #c7d2fe; margin-top: 16px;
        }
    </style>
</head>
<body>
    <div class="container">
        <div class="student-strip">
            <span>SBL-AWT Expt 10 | <strong>Integration of SSL Certificate in Web Application</strong></span>
            <span>Student: <strong>Somnath Jha (25CE1050)</strong> | RAIT Computer Engineering</span>
        </div>

        <div class="hero-banner">
            <div class="lock-badge">🔒</div>
            <h1>Secure HTTPS Connection Active</h1>
            <p>Cryptographic TLS Socket Verification via OpenSSL X.509 RSA Certificate</p>
        </div>

        <div class="card">
            <h2><span>🛡️</span> Active TLS Handshake Telemetry</h2>
            <div class="specs-grid">
                <div class="spec-box">
                    <div class="spec-label">Transport Protocol</div>
                    <div class="spec-value">${cipher ? cipher.version : 'TLSv1.3'}</div>
                </div>
                <div class="spec-box">
                    <div class="spec-label">Negotiated Cipher</div>
                    <div class="spec-value">${cipher ? cipher.name : 'TLS_AES_256_GCM_SHA384'}</div>
                </div>
                <div class="spec-box">
                    <div class="spec-label">Key Exchange / Curve</div>
                    <div class="spec-value">RSA 2048-bit (SHA-256)</div>
                </div>
                <div class="spec-box">
                    <div class="spec-label">Socket State</div>
                    <div class="spec-value">${isEncrypted ? 'ENCRYPTED (TLS Socket)' : 'ACTIVE'}</div>
                </div>
            </div>

            <div class="cert-details">
                <strong>X.509 Certificate Metadata:</strong><br/>
                - <strong>Common Name (CN):</strong> localhost<br/>
                - <strong>Organization (O):</strong> TechVault Hardware Hub<br/>
                - <strong>Organizational Unit (OU):</strong> Computer Engineering Dept, RAIT<br/>
                - <strong>Subject Alternative Names (SAN):</strong> DNS:localhost, DNS:techvault-store.local, IP:127.0.0.1<br/>
                - <strong>Validity Period:</strong> 365 Days (Active)<br/>
                - <strong>Signature Digest:</strong> SHA256withRSA
            </div>
        </div>

        <div class="card">
            <h2><span>⚙️</span> Enterprise Cryptographic Protocols Active</h2>
            <ul style="list-style: none; display: flex; flex-direction: column; gap: 10px; font-size: 0.9rem; color: #cbd5e1;">
                <li>✓ <strong>HTTP Strict Transport Security (HSTS):</strong> Enforces modern browsers to connect only via HTTPS for 1 year (<code>max-age=31536000</code>).</li>
                <li>✓ <strong>Automated HTTP &rarr; HTTPS 301 Redirection:</strong> Port ${HTTP_PORT} permanently upgrades traffic to HTTPS Port ${HTTPS_PORT}.</li>
                <li>✓ <strong>MIME Sniffing Mitigation:</strong> <code>X-Content-Type-Options: nosniff</code> protects against MIME spoofing attacks.</li>
                <li>✓ <strong>Clickjacking Mitigation:</strong> <code>X-Frame-Options: SAMEORIGIN</code> prevents unauthorized framing.</li>
            </ul>

            <div class="alert-box">
                ℹ️ <strong>Examiner CLI Test:</strong> Verify the encrypted handshake from terminal: <br/>
                <code>curl -kv https://localhost:${HTTPS_PORT}/api/ssl-info</code>
            </div>
        </div>
    </div>
</body>
</html>`;

    res.send(html);
});

app.get('/api/ssl-info', (req, res) => {
    const cipher = req.socket.getCipher ? req.socket.getCipher() : {};
    res.json({
        httpsEnabled: true,
        tlsProtocol: cipher.version || 'TLSv1.3',
        cipherSuite: cipher.name || 'TLS_AES_256_GCM_SHA384',
        hstsActive: true,
        keyLength: '2048 bits',
        subject: {
            commonName: 'localhost',
            organization: 'TechVault Hardware Hub',
            department: 'Computer Engineering Dept, RAIT',
            location: 'Navi Mumbai, Maharashtra, India'
        },
        student: 'Somnath Jha (25CE1050)',
        timestamp: new Date().toISOString()
    });
});

const httpsServer = https.createServer(sslOptions, app);
httpsServer.listen(HTTPS_PORT, () => {
    console.log(`[TechVault HTTPS] Secure server active on https://localhost:${HTTPS_PORT}`);
});

const redirectApp = express();
redirectApp.use((req, res) => {
    const hostWithoutPort = req.headers.host.split(':')[0];
    const secureUrl = `https://${hostWithoutPort}:${HTTPS_PORT}${req.url}`;
    console.log(`[HTTP Redirect] 301 Redirecting ${req.url} -> ${secureUrl}`);
    res.redirect(301, secureUrl);
});

const httpServer = http.createServer(redirectApp);
httpServer.listen(HTTP_PORT, () => {
    console.log(`[TechVault HTTP Redirect] Port ${HTTP_PORT} redirecting to HTTPS Port ${HTTPS_PORT}`);
});
