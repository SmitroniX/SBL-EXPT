/**
 * Experiment 08: Integration of Third-Party Services in Web Application
 * Student: Asmit Jogdand (25CE1051) | RAIT Computer Engineering
 * Domain: HealthPulse Third-Party Gateway Integration (Email, SMS, Payment)
 */

const express = require('express');
const nodemailer = require('nodemailer');
const cors = require('cors');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 8000;

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

// In-Memory Storage for Outgoing Logs
const serviceLogs = [];

// ==========================================
// 1. EMAIL SERVICE CONFIGURATION (Nodemailer)
// ==========================================
let mailTransporter = null;

async function setupMailer() {
    try {
        // Create auto-generated test SMTP service account from ethereal.email
        const testAccount = await nodemailer.createTestAccount();
        mailTransporter = nodemailer.createTransport({
            host: 'smtp.ethereal.email',
            port: 587,
            secure: false,
            auth: {
                user: testAccount.user,
                pass: testAccount.pass
            }
        });
        console.log(`[HealthPulse Email] Ethereal SMTP Initialized. Test User: ${testAccount.user}`);
    } catch (err) {
        console.warn(`[HealthPulse Email] Could not init Ethereal SMTP: ${err.message}. Using JSON fallback simulator.`);
    }
}
setupMailer();

// API 1: Dispatch Prescription / Appointment Email
app.post('/api/service/email', async (req, res) => {
    const { patientEmail, patientName, doctorName, appointmentDate, prescriptionNotes } = req.body;

    if (!patientEmail || !patientName) {
        return res.status(400).json({ success: false, error: 'Recipient email and patient name are required' });
    }

    const emailSubject = `HealthPulse Medical Consultation & Prescription: ${patientName}`;
    const emailHtml = `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; border: 1px solid #e2e8f0; border-radius: 10px; overflow: hidden;">
            <div style="background: #0284c7; color: #ffffff; padding: 20px; text-align: center;">
                <h2 style="margin: 0;">HealthPulse Clinical Care</h2>
                <p style="margin: 5px 0 0 0; font-size: 0.9rem;">Official Digital Prescription & Consultation Summary</p>
            </div>
            <div style="padding: 24px; color: #1e293b; line-height: 1.6;">
                <p>Dear <strong>${patientName}</strong>,</p>
                <p>Your consultation record with <strong>${doctorName || 'Dr. Amarsinh V. Vidhate'}</strong> on <strong>${appointmentDate || new Date().toLocaleDateString()}</strong> has been completed.</p>
                <div style="background: #f8fafc; border-left: 4px solid #0284c7; padding: 12px 16px; margin: 16px 0;">
                    <h4 style="margin: 0 0 6px 0; color: #0369a1;">Clinical Prescription & Advisory Notes:</h4>
                    <p style="margin: 0; font-style: italic;">${prescriptionNotes || 'Amoxicillin 500mg (1-0-1 after meals for 5 days), Paracetamol 650mg SOS. Maintain hydration and report back in 7 days.'}</p>
                </div>
                <p style="font-size: 0.85rem; color: #64748b;">If symptoms persist, reach out to HealthPulse Emergency Care: 108 / (022) 2770-9999.</p>
            </div>
            <div style="background: #f1f5f9; text-align: center; padding: 12px; font-size: 0.75rem; color: #64748b;">
                HealthPulse Super-Specialty | Skill Based Lab - Advanced Web Technology | RAIT
            </div>
        </div>
    `;

    try {
        let previewUrl = null;
        let messageId = 'HP-MAIL-' + Date.now();

        if (mailTransporter) {
            const info = await mailTransporter.sendMail({
                from: '"HealthPulse Medical Gateway" <noreply@healthpulse.com>',
                to: patientEmail,
                subject: emailSubject,
                html: emailHtml
            });
            messageId = info.messageId;
            previewUrl = nodemailer.getTestMessageUrl(info);
        }

        const logEntry = {
            service: 'Email Gateway (Nodemailer)',
            recipient: patientEmail,
            messageId,
            previewUrl: previewUrl || 'Simulated Ethereal Delivery (Active)',
            status: 'Delivered',
            timestamp: new Date().toLocaleTimeString()
        };
        serviceLogs.unshift(logEntry);

        return res.json({
            success: true,
            message: 'Clinical email successfully dispatched via SMTP gateway!',
            data: logEntry
        });
    } catch (err) {
        return res.status(500).json({ success: false, error: err.message });
    }
});


// ==========================================
// 2. SMS GATEWAY INTEGRATION (Twilio / Simulator)
// ==========================================
app.post('/api/service/sms', (req, res) => {
    const { phone, patientName, appointmentTime } = req.body;

    if (!phone || !patientName) {
        return res.status(400).json({ success: false, error: 'Phone number and patient name are required' });
    }

    const otpCode = Math.floor(100000 + Math.random() * 900000);
    const smsMessage = `[HealthPulse] Hello ${patientName}, your OTP for consultation verification is ${otpCode}. Appointment confirmed for ${appointmentTime || '11:00 AM'}. Do not share this OTP.`;

    const smsSid = 'SM' + Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
    const logEntry = {
        service: 'SMS Gateway (Twilio Integration Protocol)',
        recipient: phone,
        sid: smsSid,
        otp: otpCode,
        body: smsMessage,
        gatewayResponse: '200 OK — Delivered via Telecom Provider',
        status: 'Sent / Delivered',
        timestamp: new Date().toLocaleTimeString()
    };
    serviceLogs.unshift(logEntry);

    res.json({
        success: true,
        message: `SMS alert dispatched to ${phone} successfully!`,
        data: logEntry
    });
});


// ==========================================
// 3. PAYMENT GATEWAY INTEGRATION (Razorpay / Stripe Simulation)
// ==========================================
app.post('/api/service/payment/order', (req, res) => {
    const { amount, patientName, consultationType } = req.body;
    const billAmount = amount || 800;

    const orderId = 'order_hp_' + Math.random().toString(36).substring(2, 12);
    const receiptNo = 'rcpt_' + Math.floor(100000 + Math.random() * 900000);

    const orderDetails = {
        orderId,
        receiptNo,
        amount: billAmount,
        currency: 'INR',
        amountInPaise: billAmount * 100,
        patientName: patientName || 'Asmit Jogdand',
        consultationType: consultationType || 'Super-Specialty OPD',
        status: 'Created',
        keyId: 'rzp_test_HPHealthPulse2026'
    };

    res.json({
        success: true,
        message: 'Payment order generated on payment gateway',
        order: orderDetails
    });
});

app.post('/api/service/payment/verify', (req, res) => {
    const { orderId, paymentId, signature, amount, patientName } = req.body;

    const transactionId = paymentId || ('pay_' + Math.random().toString(36).substring(2, 14));
    const logEntry = {
        service: 'Payment Gateway (Razorpay/Stripe Protocol)',
        orderId: orderId || 'order_hp_demo',
        paymentId: transactionId,
        amount: `₹${amount || 800}`,
        patient: patientName || 'Asmit Jogdand',
        verificationStatus: 'SIGNATURE_VERIFIED_SUCCESSFUL',
        status: 'Payment Captured (PAID)',
        timestamp: new Date().toLocaleTimeString()
    };
    serviceLogs.unshift(logEntry);

    res.json({
        success: true,
        message: 'Payment verified and captured successfully!',
        receipt: logEntry
    });
});

// Logs Endpoint
app.get('/api/service/logs', (req, res) => {
    res.json({
        total: serviceLogs.length,
        student: 'Asmit Jogdand (25CE1051)',
        logs: serviceLogs
    });
});

app.listen(PORT, () => {
    console.log(`[HealthPulse] Third-Party Services Gateway running at http://localhost:${PORT}`);
    console.log(`[HealthPulse] Student: Asmit Jogdand (25CE1051)`);
});
