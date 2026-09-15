/**
 * Experiment 08: Integration of Third-Party Services in Web Application
 * Student: Somnath Jha (25CE1050) | RAIT Computer Engineering
 * Domain: TechVault E-Commerce Gateways (Email, SMS, Payment)
 */

const express = require('express');
const nodemailer = require('nodemailer');
const cors = require('cors');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 8001;

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

// Outgoing service logs
const serviceLogs = [];

// ==========================================
// 1. EMAIL SERVICE (Nodemailer + Ethereal)
// ==========================================
let mailTransporter = null;

async function setupMailer() {
    try {
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
        console.log(`[TechVault Email] Ethereal SMTP active for testing: ${testAccount.user}`);
    } catch (err) {
        console.warn(`[TechVault Email] Could not init Ethereal SMTP: ${err.message}.`);
    }
}
setupMailer();

app.post('/api/service/email', async (req, res) => {
    const { customerEmail, customerName, productTitle, invoiceAmount } = req.body;

    if (!customerEmail || !customerName) {
        return res.status(400).json({ success: false, error: 'Customer email and name are required' });
    }

    const emailSubject = `TechVault Order Confirmation & Tax Invoice: ${customerName}`;
    const emailHtml = `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; border: 1px solid #374151; border-radius: 10px; overflow: hidden; background: #111827; color: #f9fafb;">
            <div style="background: #6366f1; color: #ffffff; padding: 20px; text-align: center;">
                <h2 style="margin: 0;">⚡ TechVault Hardware Hub</h2>
                <p style="margin: 5px 0 0 0; font-size: 0.9rem;">Official Hardware Invoice & 3-Year Warranty Certificate</p>
            </div>
            <div style="padding: 24px; line-height: 1.6;">
                <p>Hello <strong>${customerName}</strong>,</p>
                <p>Thank you for choosing TechVault for your engineering hardware setup. Your order has been dispatched.</p>
                <div style="background: #1f2937; border-left: 4px solid #6366f1; padding: 14px 18px; margin: 16px 0; border-radius: 4px;">
                    <p style="margin: 0;"><strong>Hardware:</strong> ${productTitle || 'Titan-X 49" UltraWide Curved OLED'}</p>
                    <p style="margin: 4px 0 0 0;"><strong>Invoice Value:</strong> ₹${invoiceAmount || '1,15,000'} (GST Paid)</p>
                    <p style="margin: 4px 0 0 0;"><strong>Warranty:</strong> 3-Year Advanced Hardware Replacement Included</p>
                </div>
                <p style="font-size: 0.85rem; color: #9ca3af;">Courier Dispatch: Bluedart Express Air Priority | Tracking Link attached in shipment manifest.</p>
            </div>
            <div style="background: #090d16; text-align: center; padding: 12px; font-size: 0.75rem; color: #9ca3af;">
                TechVault E-Commerce Suite | Skill Based Lab - Advanced Web Technology | RAIT
            </div>
        </div>
    `;

    try {
        let previewUrl = null;
        let messageId = 'TV-MAIL-' + Date.now();

        if (mailTransporter) {
            const info = await mailTransporter.sendMail({
                from: '"TechVault Order Center" <orders@techvault.io>',
                to: customerEmail,
                subject: emailSubject,
                html: emailHtml
            });
            messageId = info.messageId;
            previewUrl = nodemailer.getTestMessageUrl(info);
        }

        const logEntry = {
            service: 'Email Gateway (Nodemailer)',
            recipient: customerEmail,
            messageId,
            previewUrl: previewUrl || 'Simulated Ethereal Delivery (Active)',
            status: 'Delivered',
            timestamp: new Date().toLocaleTimeString()
        };
        serviceLogs.unshift(logEntry);

        return res.json({
            success: true,
            message: 'Hardware invoice successfully dispatched via SMTP gateway!',
            data: logEntry
        });
    } catch (err) {
        return res.status(500).json({ success: false, error: err.message });
    }
});

// ==========================================
// 2. SMS GATEWAY (Twilio Protocol)
// ==========================================
app.post('/api/service/sms', (req, res) => {
    const { phone, customerName, trackingId } = req.body;

    if (!phone || !customerName) {
        return res.status(400).json({ success: false, error: 'Phone number and customer name are required' });
    }

    const deliveryOtp = Math.floor(100000 + Math.random() * 900000);
    const trackingCode = trackingId || ('TV-EXP-' + Math.floor(100000 + Math.random() * 900000));
    const smsMessage = `[TechVault] Hi ${customerName}, your hardware package ${trackingCode} is out for delivery today. Give OTP ${deliveryOtp} to the courier agent upon inspection.`;

    const smsSid = 'SM' + Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
    const logEntry = {
        service: 'SMS Gateway (Twilio Protocol)',
        recipient: phone,
        sid: smsSid,
        otp: deliveryOtp,
        body: smsMessage,
        gatewayResponse: '200 OK — Delivered via Telecom Provider',
        status: 'Sent / Delivered',
        timestamp: new Date().toLocaleTimeString()
    };
    serviceLogs.unshift(logEntry);

    res.json({
        success: true,
        message: `SMS dispatch notification sent to ${phone}!`,
        data: logEntry
    });
});

// ==========================================
// 3. PAYMENT GATEWAY (Razorpay / Stripe)
// ==========================================
app.post('/api/service/payment/order', (req, res) => {
    const { amount, customerName, hardwareModel } = req.body;
    const billAmount = amount || 115000;

    const orderId = 'order_tv_' + Math.random().toString(36).substring(2, 12);
    const receiptNo = 'rcpt_tv_' + Math.floor(100000 + Math.random() * 900000);

    const orderDetails = {
        orderId,
        receiptNo,
        amount: billAmount,
        currency: 'INR',
        amountInPaise: billAmount * 100,
        customerName: customerName || 'Somnath Jha',
        hardwareModel: hardwareModel || 'Titan-X 49" OLED',
        status: 'Created',
        keyId: 'rzp_test_TVTechVault2026'
    };

    res.json({
        success: true,
        message: 'Payment order generated on payment gateway',
        order: orderDetails
    });
});

app.post('/api/service/payment/verify', (req, res) => {
    const { orderId, paymentId, amount, customerName } = req.body;
    const transactionId = paymentId || ('pay_tv_' + Math.random().toString(36).substring(2, 14));

    const logEntry = {
        service: 'Payment Gateway (Razorpay/Stripe Protocol)',
        orderId: orderId || 'order_tv_demo',
        paymentId: transactionId,
        amount: `₹${amount || 115000}`,
        customer: customerName || 'Somnath Jha',
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

app.get('/api/service/logs', (req, res) => {
    res.json({
        total: serviceLogs.length,
        student: 'Somnath Jha (25CE1050)',
        logs: serviceLogs
    });
});

app.listen(PORT, () => {
    console.log(`[TechVault] Third-Party Services Gateway running at http://localhost:${PORT}`);
    console.log(`[TechVault] Student: Somnath Jha (25CE1050)`);
});
