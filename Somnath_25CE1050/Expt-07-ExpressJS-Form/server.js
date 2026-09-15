/**
 * Experiment 07: Design a Form Using Express.js in Node.js
 * Student: Somnath Jha (25CE1050) | RAIT Computer Engineering
 * Domain: TechVault Custom PC Build & Rig Ordering Form
 */

const express = require('express');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 4001;

// Middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Custom Logger Middleware
app.use((req, res, next) => {
    console.log(`[${new Date().toISOString()}] ${req.method} ${req.url}`);
    next();
});

// Storage for custom builds
const customBuilds = [];

function renderPage(title, content) {
    return `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>${title} - TechVault Express</title>
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
            --border: #374151;
            --radius: 12px;
            --error: #ef4444;
            --success: #10b981;
        }
        * { box-sizing: border-box; margin: 0; padding: 0; font-family: 'Space Grotesk', sans-serif; }
        body { background: linear-gradient(135deg, #090d16 0%, #111827 50%, #1e1b4b 100%); color: var(--text); min-height: 100vh; padding: 32px 20px; }
        .container { max-width: 820px; margin: 0 auto; }
        
        .student-header {
            background: rgba(255,255,255,0.08); border: 1px solid var(--border); color: #c7d2fe;
            padding: 10px 20px; border-radius: 10px; margin-bottom: 24px;
            display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; gap: 8px; font-size: 0.82rem;
        }
        .student-header strong { color: #818cf8; }

        .card { background: var(--card); border-radius: var(--radius); padding: 32px; border: 1px solid var(--border); box-shadow: 0 10px 30px rgba(0,0,0,0.5); }
        .card-header { border-bottom: 1.5px solid var(--border); padding-bottom: 16px; margin-bottom: 24px; text-align: center; }
        .card-header h1 { font-size: 1.8rem; color: #ffffff; font-weight: 800; }
        .card-header p { color: var(--text-muted); font-size: 0.9rem; margin-top: 4px; }

        .grid-2 { display: grid; grid-template-columns: 1fr 1fr; gap: 16px; }
        .form-group { margin-bottom: 16px; }
        .form-group label { display: block; font-size: 0.85rem; font-weight: 600; color: #e5e7eb; margin-bottom: 6px; }
        .form-group input, .form-group select, .form-group textarea {
            width: 100%; padding: 10px 14px; border: 1.5px solid var(--border); border-radius: 8px; font-size: 0.92rem;
            outline: none; background: #1f2937; color: #ffffff;
        }
        .form-group input:focus, .form-group select:focus, .form-group textarea:focus {
            border-color: var(--primary); box-shadow: 0 0 0 3px rgba(99, 102, 241, 0.25);
        }
        .form-group input.field-error, .form-group select.field-error { border-color: var(--error); background: #2a1515; }
        .error-msg { color: #f87171; font-size: 0.78rem; margin-top: 4px; font-weight: 500; }

        .error-summary {
            background: rgba(239, 68, 68, 0.15); border: 1.5px solid #ef4444; color: #fca5a5;
            padding: 14px 18px; border-radius: 8px; margin-bottom: 20px; font-size: 0.85rem;
        }
        .error-summary ul { margin-left: 20px; margin-top: 6px; }

        .btn { padding: 12px 24px; border-radius: 8px; font-size: 0.95rem; font-weight: 700; cursor: pointer; border: none; transition: all 0.2s; }
        .btn-primary { background: linear-gradient(135deg, var(--primary) 0%, var(--primary-dark) 100%); color: #ffffff; width: 100%; margin-top: 12px; }
        .btn-primary:hover { transform: translateY(-1px); box-shadow: 0 4px 12px rgba(99, 102, 241, 0.4); }

        .receipt { border: 2px dashed #6366f1; background: rgba(99, 102, 241, 0.1); border-radius: 12px; padding: 24px; margin-top: 20px; }
        .receipt-header { display: flex; justify-content: space-between; align-items: center; border-bottom: 1.5px solid var(--border); padding-bottom: 12px; margin-bottom: 16px; }
        .receipt-id { font-family: monospace; font-size: 1.1rem; color: #818cf8; font-weight: 700; background: #1f2937; padding: 4px 10px; border-radius: 6px; }
        .receipt-row { display: flex; justify-content: space-between; padding: 8px 0; border-bottom: 1px dotted var(--border); font-size: 0.9rem; }
        .receipt-row strong { color: #ffffff; }

        @media (max-width: 600px) { .grid-2 { grid-template-columns: 1fr; } }
    </style>
</head>
<body>
    <div class="container">
        <div class="student-header">
            <span>SBL-AWT Expt 07 | <strong>Express.js Form Processing</strong></span>
            <span>Student: <strong>Somnath Jha (25CE1050)</strong> | RAIT Computer Engineering</span>
        </div>
        ${content}
    </div>
</body>
</html>`;
}

// Route 1: GET Form
app.get('/', (req, res) => {
    res.send(renderForm({}));
});

function renderForm({ values = {}, errors = {} }) {
    const errorKeys = Object.keys(errors);
    const hasErrors = errorKeys.length > 0;

    const errorHtml = hasErrors ? `
        <div class="error-summary">
            <strong>⚠️ Please resolve the following configuration errors:</strong>
            <ul>
                ${errorKeys.map(k => `<li>${errors[k]}</li>`).join('')}
            </ul>
        </div>
    ` : '';

    const content = `
        <div class="card">
            <div class="card-header">
                <h1>TechVault Custom PC Rig Configurator</h1>
                <p>Express.js Server-Side Form Validation &amp; Order Pipeline</p>
            </div>

            ${errorHtml}

            <form action="/order" method="POST">
                <div class="grid-2">
                    <div class="form-group">
                        <label for="devName">Developer / Client Name *</label>
                        <input type="text" id="devName" name="devName" value="${values.devName || ''}" class="${errors.devName ? 'field-error' : ''}" placeholder="e.g. Somnath Jha">
                        ${errors.devName ? `<div class="error-msg">${errors.devName}</div>` : ''}
                    </div>
                    <div class="form-group">
                        <label for="phone">Contact Mobile (10 Digits) *</label>
                        <input type="tel" id="phone" name="phone" value="${values.phone || ''}" class="${errors.phone ? 'field-error' : ''}" placeholder="9876543210">
                        ${errors.phone ? `<div class="error-msg">${errors.phone}</div>` : ''}
                    </div>
                </div>

                <div class="grid-2">
                    <div class="form-group">
                        <label for="email">Work Email *</label>
                        <input type="email" id="email" name="email" value="${values.email || ''}" class="${errors.email ? 'field-error' : ''}" placeholder="dev@techvault.io">
                        ${errors.email ? `<div class="error-msg">${errors.email}</div>` : ''}
                    </div>
                    <div class="form-group">
                        <label for="shippingCity">Shipping City *</label>
                        <input type="text" id="shippingCity" name="shippingCity" value="${values.shippingCity || ''}" class="${errors.shippingCity ? 'field-error' : ''}" placeholder="e.g. Navi Mumbai / Pune">
                        ${errors.shippingCity ? `<div class="error-msg">${errors.shippingCity}</div>` : ''}
                    </div>
                </div>

                <div class="grid-2">
                    <div class="form-group">
                        <label for="cpu">Processor (CPU) *</label>
                        <select id="cpu" name="cpu" class="${errors.cpu ? 'field-error' : ''}">
                            <option value="">-- Select CPU --</option>
                            <option value="AMD Ryzen 9 7950X (16C/32T)" ${values.cpu === 'AMD Ryzen 9 7950X (16C/32T)' ? 'selected' : ''}>AMD Ryzen 9 7950X (16C/32T) — ₹54,000</option>
                            <option value="Intel Core i9-14900K (24C/32T)" ${values.cpu === 'Intel Core i9-14900K (24C/32T)' ? 'selected' : ''}>Intel Core i9-14900K (24C/32T) — ₹58,000</option>
                            <option value="Apple M2 Ultra (Custom Rackmount)" ${values.cpu === 'Apple M2 Ultra (Custom Rackmount)' ? 'selected' : ''}>Apple M2 Ultra (Custom Rackmount) — ₹1,20,000</option>
                        </select>
                        ${errors.cpu ? `<div class="error-msg">${errors.cpu}</div>` : ''}
                    </div>
                    <div class="form-group">
                        <label for="gpu">Dedicated GPU *</label>
                        <select id="gpu" name="gpu" class="${errors.gpu ? 'field-error' : ''}">
                            <option value="">-- Select GPU --</option>
                            <option value="NVIDIA RTX 4090 24GB GDDR6X" ${values.gpu === 'NVIDIA RTX 4090 24GB GDDR6X' ? 'selected' : ''}>NVIDIA RTX 4090 24GB GDDR6X — ₹1,72,000</option>
                            <option value="NVIDIA RTX 4080 Super 16GB" ${values.gpu === 'NVIDIA RTX 4080 Super 16GB' ? 'selected' : ''}>NVIDIA RTX 4080 Super 16GB — ₹98,000</option>
                            <option value="Integrated AI Tensor Unit" ${values.gpu === 'Integrated AI Tensor Unit' ? 'selected' : ''}>Integrated AI Tensor Unit — ₹18,000</option>
                        </select>
                        ${errors.gpu ? `<div class="error-msg">${errors.gpu}</div>` : ''}
                    </div>
                </div>

                <div class="grid-2">
                    <div class="form-group">
                        <label for="ram">System Memory (RAM) *</label>
                        <select id="ram" name="ram">
                            <option value="64GB DDR5-6000MHz" ${values.ram === '64GB DDR5-6000MHz' ? 'selected' : ''}>64GB DDR5-6000MHz (₹18,000)</option>
                            <option value="128GB DDR5-5600MHz" ${values.ram === '128GB DDR5-5600MHz' ? 'selected' : ''}>128GB DDR5-5600MHz (₹36,000)</option>
                            <option value="32GB DDR5-6000MHz" ${values.ram === '32GB DDR5-6000MHz' ? 'selected' : ''}>32GB DDR5-6000MHz (₹9,500)</option>
                        </select>
                    </div>
                    <div class="form-group">
                        <label for="cooling">Thermal Cooling Solution *</label>
                        <select id="cooling" name="cooling">
                            <option value="360mm AIO Liquid Cooler" ${values.cooling === '360mm AIO Liquid Cooler' ? 'selected' : ''}>360mm AIO Liquid Cooler (₹12,000)</option>
                            <option value="Custom Dual-Loop Liquid Rig" ${values.cooling === 'Custom Dual-Loop Liquid Rig' ? 'selected' : ''}>Custom Dual-Loop Liquid Rig (₹28,000)</option>
                            <option value="High-Performance Air Cooler" ${values.cooling === 'High-Performance Air Cooler' ? 'selected' : ''}>High-Performance Air Cooler (₹6,000)</option>
                        </select>
                    </div>
                </div>

                <div class="form-group">
                    <label for="notes">Special Assembly Directives (Optional)</label>
                    <textarea id="notes" name="notes" rows="3" placeholder="Specify OS preference (Ubuntu 24.04 LTS / Dual-boot Windows), RAID configuration...">${values.notes || ''}</textarea>
                </div>

                <button type="submit" class="btn btn-primary">
                    Submit Custom PC Order (Express.js POST) &rarr;
                </button>
            </form>
        </div>
    `;

    return renderPage('Configure Rig', content);
}

// Route 2: POST Order
app.post('/order', (req, res) => {
    const { devName, phone, email, shippingCity, cpu, gpu, ram, cooling, notes } = req.body;
    const errors = {};

    if (!devName || devName.trim().length < 3) {
        errors.devName = 'Developer Name must be at least 3 characters.';
    }
    if (!phone || !/^[6-9]\d{9}$/.test(phone.trim())) {
        errors.phone = 'Enter a valid 10-digit Indian mobile number.';
    }
    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) {
        errors.email = 'Enter a valid email address.';
    }
    if (!shippingCity || shippingCity.trim().length < 2) {
        errors.shippingCity = 'Valid destination shipping city is required.';
    }
    if (!cpu) errors.cpu = 'Please select a CPU processor.';
    if (!gpu) errors.gpu = 'Please select a dedicated GPU.';

    if (Object.keys(errors).length > 0) {
        return res.status(400).send(renderForm({ values: req.body, errors }));
    }

    // Dynamic price calculation
    let total = 0;
    if (cpu.includes('7950X')) total += 54000;
    else if (cpu.includes('14900K')) total += 58000;
    else total += 120000;

    if (gpu.includes('4090')) total += 172000;
    else if (gpu.includes('4080')) total += 98000;
    else total += 18000;

    if (ram.includes('128GB')) total += 36000;
    else if (ram.includes('64GB')) total += 18000;
    else total += 9500;

    if (cooling.includes('Dual-Loop')) total += 28000;
    else if (cooling.includes('360mm')) total += 12000;
    else total += 6000;

    const baseCabinetMoboPsu = 45000;
    total += baseCabinetMoboPsu;

    const orderId = 'TV-RIG-' + Math.floor(100000 + Math.random() * 900000);
    const newRecord = {
        orderId,
        devName: devName.trim(),
        phone: phone.trim(),
        email: email.trim(),
        shippingCity: shippingCity.trim(),
        cpu,
        gpu,
        ram,
        cooling,
        notes: notes ? notes.trim() : 'Standard Build',
        totalPrice: `₹${total.toLocaleString()}`,
        timestamp: new Date().toLocaleString()
    };

    customBuilds.push(newRecord);

    const receiptContent = `
        <div class="card">
            <div class="card-header">
                <span style="display:inline-block; background:rgba(99,102,241,0.2); color:#a5b4fc; font-size:0.75rem; font-weight:700; padding:4px 12px; border-radius:999px; margin-bottom:8px;">
                    EXPRESS.JS POST SUCCESSFUL
                </span>
                <h1>Custom Rig Order Placed!</h1>
                <p>Your hardware build specification has been validated and queued for assembly.</p>
            </div>

            <div class="receipt">
                <div class="receipt-header">
                    <div>
                        <h3 style="color:#818cf8;">TechVault Build Specification Sheet</h3>
                        <span style="font-size:0.8rem; color:#9ca3af;">High-Performance Engineering Station</span>
                    </div>
                    <span class="receipt-id">${orderId}</span>
                </div>

                <div class="receipt-row"><span>Developer Name:</span> <strong>${newRecord.devName}</strong></div>
                <div class="receipt-row"><span>Contact:</span> <strong>${newRecord.phone} | ${newRecord.email}</strong></div>
                <div class="receipt-row"><span>Destination:</span> <strong>${newRecord.shippingCity}</strong></div>
                <div class="receipt-row"><span>Processor:</span> <strong>${newRecord.cpu}</strong></div>
                <div class="receipt-row"><span>Graphics GPU:</span> <strong>${newRecord.gpu}</strong></div>
                <div class="receipt-row"><span>System RAM:</span> <strong>${newRecord.ram}</strong></div>
                <div class="receipt-row"><span>Cooling Solution:</span> <strong>${newRecord.cooling}</strong></div>
                <div class="receipt-row"><span>Assembly Directives:</span> <em>${newRecord.notes}</em></div>
                <div class="receipt-row" style="font-size:1.1rem; color:#34d399;"><span>Total Rig Estimate:</span> <strong>${newRecord.totalPrice} (Incl. GST)</strong></div>
                <div class="receipt-row" style="border:none;"><span>Timestamp:</span> <small>${newRecord.timestamp}</small></div>
            </div>

            <div style="margin-top:24px; display:flex; gap:12px;">
                <a href="/" class="btn btn-primary" style="text-decoration:none; text-align:center;">Configure Another Rig</a>
                <a href="/api/builds" class="btn" style="background:#374151; color:#d1d5db; text-decoration:none; text-align:center; padding:12px 20px;">View Raw JSON List</a>
            </div>
        </div>
    `;

    res.send(renderPage('Build Confirmed', receiptContent));
});

// Route 3: JSON
app.get('/api/builds', (req, res) => {
    res.json({
        total: customBuilds.length,
        student: 'Somnath Jha (25CE1050)',
        data: customBuilds
    });
});

app.listen(PORT, () => {
    console.log(`[TechVault] Express.js Form Server running at http://localhost:${PORT}`);
    console.log(`[TechVault] Author: Somnath Jha (25CE1050)`);
});
