/**
 * Experiment 07: Design a Form Using Express.js in Node.js
 * Student: Asmit Jogdand (25CE1051) | RAIT Computer Engineering
 * Domain: HealthPulse Specialist Doctor Consultation Form
 */

const express = require('express');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 4000;

// Application Middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Custom Logger Middleware
app.use((req, res, next) => {
    console.log(`[${new Date().toISOString()}] ${req.method} ${req.url}`);
    next();
});

// In-Memory Storage for Submitted Appointments
const bookedConsultations = [];

// Helper function to render HTML wrapper
function renderPage(title, content) {
    return `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>${title} - HealthPulse Express</title>
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
            --border: #cbd5e1;
            --radius: 12px;
            --error: #ef4444;
            --success: #10b981;
        }
        * { box-sizing: border-box; margin: 0; padding: 0; font-family: 'Plus Jakarta Sans', sans-serif; }
        body { background: linear-gradient(135deg, #0f172a 0%, #1e293b 100%); color: var(--text); min-height: 100vh; padding: 32px 20px; }
        
        .container { max-width: 800px; margin: 0 auto; }
        
        .student-header {
            background: rgba(255,255,255,0.1); backdrop-filter: blur(8px); border: 1px solid rgba(255,255,255,0.2);
            color: #e2e8f0; padding: 10px 20px; border-radius: 10px; margin-bottom: 24px;
            display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; gap: 8px; font-size: 0.82rem;
        }
        .student-header strong { color: #38bdf8; }

        .card { background: var(--card); border-radius: var(--radius); padding: 32px; box-shadow: 0 10px 30px rgba(0,0,0,0.2); }
        .card-header { border-bottom: 1.5px solid #f1f5f9; padding-bottom: 16px; margin-bottom: 24px; text-align: center; }
        .card-header h1 { font-size: 1.8rem; color: #0f172a; font-weight: 800; }
        .card-header p { color: var(--text-muted); font-size: 0.9rem; margin-top: 4px; }

        .grid-2 { display: grid; grid-template-columns: 1fr 1fr; gap: 16px; }
        .form-group { margin-bottom: 16px; }
        .form-group label { display: block; font-size: 0.85rem; font-weight: 600; color: #334155; margin-bottom: 6px; }
        .form-group input, .form-group select, .form-group textarea {
            width: 100%; padding: 10px 14px; border: 1.5px solid var(--border); border-radius: 8px; font-size: 0.92rem; outline: none; background: #f8fafc;
        }
        .form-group input:focus, .form-group select:focus, .form-group textarea:focus {
            border-color: var(--primary); background: #ffffff; box-shadow: 0 0 0 3px rgba(2, 132, 199, 0.15);
        }
        .form-group input.field-error, .form-group select.field-error {
            border-color: var(--error); background: #fff5f5;
        }
        .error-msg { color: var(--error); font-size: 0.78rem; margin-top: 4px; font-weight: 500; }

        .error-summary {
            background: #fef2f2; border: 1.5px solid #fecaca; color: #991b1b; padding: 14px 18px; border-radius: 8px; margin-bottom: 20px; font-size: 0.85rem;
        }
        .error-summary ul { margin-left: 20px; margin-top: 6px; }

        .btn { padding: 12px 24px; border-radius: 8px; font-size: 0.95rem; font-weight: 700; cursor: pointer; border: none; transition: all 0.2s; }
        .btn-primary { background: linear-gradient(135deg, var(--primary) 0%, var(--primary-dark) 100%); color: #ffffff; width: 100%; margin-top: 12px; }
        .btn-primary:hover { transform: translateY(-1px); box-shadow: 0 4px 12px rgba(2, 132, 199, 0.3); }

        /* Confirmation Receipt */
        .receipt { border: 2px dashed #bae6fd; background: #f0fdf4; border-radius: 12px; padding: 24px; margin-top: 20px; }
        .receipt-header { display: flex; justify-content: space-between; align-items: center; border-bottom: 1.5px solid #bbf7d0; padding-bottom: 12px; margin-bottom: 16px; }
        .receipt-id { font-family: monospace; font-size: 1.1rem; color: #166534; font-weight: 700; background: #dcfce7; padding: 4px 10px; border-radius: 6px; }
        .receipt-row { display: flex; justify-content: space-between; padding: 8px 0; border-bottom: 1px dotted #cbd5e1; font-size: 0.9rem; }
        .receipt-row strong { color: #0f172a; }

        @media (max-width: 600px) { .grid-2 { grid-template-columns: 1fr; } }
    </style>
</head>
<body>
    <div class="container">
        <div class="student-header">
            <span>SBL-AWT Expt 07 | <strong>Express.js Form Processing</strong></span>
            <span>Student: <strong>Asmit Jogdand (25CE1051)</strong> | RAIT Computer Engineering</span>
        </div>
        ${content}
    </div>
</body>
</html>`;
}

// Route 1: Render Consultation Form (GET /)
app.get('/', (req, res) => {
    res.send(renderForm({}));
});

function renderForm({ values = {}, errors = {} }) {
    const errorKeys = Object.keys(errors);
    const hasErrors = errorKeys.length > 0;

    const errorHtml = hasErrors ? `
        <div class="error-summary">
            <strong>⚠️ Please correct the following form validation errors:</strong>
            <ul>
                ${errorKeys.map(k => `<li>${errors[k]}</li>`).join('')}
            </ul>
        </div>
    ` : '';

    const content = `
        <div class="card">
            <div class="card-header">
                <h1>HealthPulse Specialist Consultation</h1>
                <p>Express.js Server-Side Form Validation & Booking Pipeline</p>
            </div>

            ${errorHtml}

            <form action="/book" method="POST">
                <div class="grid-2">
                    <div class="form-group">
                        <label for="patientName">Patient Full Name *</label>
                        <input type="text" id="patientName" name="patientName" value="${values.patientName || ''}" class="${errors.patientName ? 'field-error' : ''}" placeholder="e.g. Asmit Jogdand">
                        ${errors.patientName ? `<div class="error-msg">${errors.patientName}</div>` : ''}
                    </div>
                    <div class="form-group">
                        <label for="phone">Mobile Phone (10 Digits) *</label>
                        <input type="tel" id="phone" name="phone" value="${values.phone || ''}" class="${errors.phone ? 'field-error' : ''}" placeholder="9876543210">
                        ${errors.phone ? `<div class="error-msg">${errors.phone}</div>` : ''}
                    </div>
                </div>

                <div class="grid-2">
                    <div class="form-group">
                        <label for="email">Email Address *</label>
                        <input type="email" id="email" name="email" value="${values.email || ''}" class="${errors.email ? 'field-error' : ''}" placeholder="patient@healthpulse.com">
                        ${errors.email ? `<div class="error-msg">${errors.email}</div>` : ''}
                    </div>
                    <div class="form-group">
                        <label for="doctor">Specialist Doctor *</label>
                        <select id="doctor" name="doctor" class="${errors.doctor ? 'field-error' : ''}">
                            <option value="">-- Select Specialist --</option>
                            <option value="Dr. Amarsinh V. Vidhate (Cardiology)" ${values.doctor === 'Dr. Amarsinh V. Vidhate (Cardiology)' ? 'selected' : ''}>Dr. Amarsinh V. Vidhate (Cardiology)</option>
                            <option value="Dr. Radhika Sen (Neurology)" ${values.doctor === 'Dr. Radhika Sen (Neurology)' ? 'selected' : ''}>Dr. Radhika Sen (Neurology)</option>
                            <option value="Dr. Vikram Malhotra (Orthopedics)" ${values.doctor === 'Dr. Vikram Malhotra (Orthopedics)' ? 'selected' : ''}>Dr. Vikram Malhotra (Orthopedics)</option>
                            <option value="Dr. Neha Kulkarni (Pediatrics)" ${values.doctor === 'Dr. Neha Kulkarni (Pediatrics)' ? 'selected' : ''}>Dr. Neha Kulkarni (Pediatrics)</option>
                        </select>
                        ${errors.doctor ? `<div class="error-msg">${errors.doctor}</div>` : ''}
                    </div>
                </div>

                <div class="grid-2">
                    <div class="form-group">
                        <label for="consultationType">Consultation Type *</label>
                        <select id="consultationType" name="consultationType">
                            <option value="In-Person OPD" ${values.consultationType === 'In-Person OPD' ? 'selected' : ''}>In-Person OPD Visit (₹800)</option>
                            <option value="Video Telehealth" ${values.consultationType === 'Video Telehealth' ? 'selected' : ''}>Online Video Consultation (₹500)</option>
                            <option value="Home Visit" ${values.consultationType === 'Home Visit' ? 'selected' : ''}>Doctor Home Visit (₹1,500)</option>
                        </select>
                    </div>
                    <div class="form-group">
                        <label for="date">Preferred Date *</label>
                        <input type="date" id="date" name="date" value="${values.date || '2026-09-22'}" class="${errors.date ? 'field-error' : ''}">
                        ${errors.date ? `<div class="error-msg">${errors.date}</div>` : ''}
                    </div>
                </div>

                <div class="form-group">
                    <label for="notes">Clinical Concerns & Symptoms (Optional)</label>
                    <textarea id="notes" name="notes" rows="3" placeholder="Briefly specify medical symptoms, allergy history, or previous prescriptions...">${values.notes || ''}</textarea>
                </div>

                <button type="submit" class="btn btn-primary">
                    Confirm Consultation Booking (Express.js POST) &rarr;
                </button>
            </form>
        </div>
    `;

    return renderPage('Book Consultation', content);
}

// Route 2: Process Form Submission (POST /book)
app.post('/book', (req, res) => {
    const { patientName, phone, email, doctor, consultationType, date, notes } = req.body;
    const errors = {};

    // Server-side validation
    if (!patientName || patientName.trim().length < 3) {
        errors.patientName = 'Patient Name must be at least 3 characters long.';
    }

    if (!phone || !/^[6-9]\d{9}$/.test(phone.trim())) {
        errors.phone = 'Enter a valid 10-digit Indian phone number starting with 6-9.';
    }

    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) {
        errors.email = 'Enter a valid email address.';
    }

    if (!doctor) {
        errors.doctor = 'Please select a specialist doctor.';
    }

    if (!date) {
        errors.date = 'Appointment date is required.';
    }

    // If validation errors exist, re-render form with errors
    if (Object.keys(errors).length > 0) {
        return res.status(400).send(renderForm({ values: req.body, errors }));
    }

    // Determine Consultation Fee
    let fee = '₹800';
    if (consultationType === 'Video Telehealth') fee = '₹500';
    if (consultationType === 'Home Visit') fee = '₹1,500';

    const bookingId = 'HP-EXP-' + Math.floor(100000 + Math.random() * 900000);
    const newRecord = {
        bookingId,
        patientName: patientName.trim(),
        phone: phone.trim(),
        email: email.trim(),
        doctor,
        consultationType,
        date,
        notes: notes ? notes.trim() : 'None',
        fee,
        bookingTimestamp: new Date().toLocaleString()
    };

    bookedConsultations.push(newRecord);

    // Render Success Receipt
    const receiptContent = `
        <div class="card">
            <div class="card-header">
                <span style="display:inline-block; background:#dcfce7; color:#166534; font-size:0.75rem; font-weight:700; padding:4px 12px; border-radius:999px; margin-bottom:8px;">
                    EXPRESS.JS POST SUCCESSFUL
                </span>
                <h1>Appointment Confirmed!</h1>
                <p>Your specialist consultation has been recorded on the Express.js server.</p>
            </div>

            <div class="receipt">
                <div class="receipt-header">
                    <div>
                        <h3 style="color:#166534;">Official Consultation Receipt</h3>
                        <span style="font-size:0.8rem; color:#15803d;">HealthPulse Super-Specialty Clinic</span>
                    </div>
                    <span class="receipt-id">${bookingId}</span>
                </div>

                <div class="receipt-row"><span>Patient Name:</span> <strong>${newRecord.patientName}</strong></div>
                <div class="receipt-row"><span>Contact Details:</span> <strong>${newRecord.phone} | ${newRecord.email}</strong></div>
                <div class="receipt-row"><span>Specialist Doctor:</span> <strong>${newRecord.doctor}</strong></div>
                <div class="receipt-row"><span>Consultation Mode:</span> <strong>${newRecord.consultationType}</strong></div>
                <div class="receipt-row"><span>Scheduled Date:</span> <strong>${newRecord.date}</strong></div>
                <div class="receipt-row"><span>Consultation Fee:</span> <strong>${newRecord.fee}</strong></div>
                <div class="receipt-row"><span>Symptoms / Remarks:</span> <em>${newRecord.notes}</em></div>
                <div class="receipt-row" style="border:none;"><span>Timestamp:</span> <small>${newRecord.bookingTimestamp}</small></div>
            </div>

            <div style="margin-top:24px; display:flex; gap:12px;">
                <a href="/" class="btn btn-primary" style="text-decoration:none; text-align:center;">Book Another Consultation</a>
                <a href="/api/appointments" class="btn" style="background:#e2e8f0; color:#334155; text-decoration:none; text-align:center; padding:12px 20px;">View Raw JSON List</a>
            </div>
        </div>
    `;

    res.send(renderPage('Consultation Confirmed', receiptContent));
});

// Route 3: JSON Endpoint (GET /api/appointments)
app.get('/api/appointments', (req, res) => {
    res.json({
        total: bookedConsultations.length,
        student: 'Asmit Jogdand (25CE1051)',
        data: bookedConsultations
    });
});

app.listen(PORT, () => {
    console.log(`[HealthPulse] Express.js Form Server running at http://localhost:${PORT}`);
    console.log(`[HealthPulse] Author: Asmit Jogdand (25CE1051)`);
});
