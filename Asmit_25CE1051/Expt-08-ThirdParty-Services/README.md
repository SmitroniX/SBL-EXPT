# Experiment 08: Integration of Third-Party Services in Web Application (SMS Gateway, Payment Gateway, Email)

## 📌 Student Details
- **Student Name:** Asmit Jogdand
- **Roll Number:** 25CE1051
- **Branch / Class:** B.Tech Computer Engineering (Sem VI)
- **Institution:** Ramrao Adik Institute of Technology (RAIT), D Y Patil Deemed to be University
- **Subject:** Skill Based Lab - Advanced Web Technology (SBL-AWT)

---

## 1. 🎯 Aim
To integrate, configure, and orchestrate external third-party communication and financial microservices in a web application:
1. **Email Gateway:** Automated transactional medical prescriptions via **Nodemailer** over SMTP.
2. **SMS Gateway:** Two-factor OTP and appointment reminders adhering to **Twilio Telecom API Protocols**.
3. **Payment Gateway:** Patient consultation fee checkout, digital order generation, and signature verification modeled on **Razorpay / Stripe**.

---

## 2. 🏥 Problem Statement
**HealthPulse Omni-Channel Clinical Integration:**
Modern telemedicine solutions must communicate seamlessly with external services:
- **Email:** Patients must receive an official digital medical prescription and discharge advice directly in their inbox.
- **SMS:** Immediate mobile dispatch of 6-digit one-time passwords (OTP) to confirm patient identity and send critical OPD alerts.
- **Payment:** Secure online payment processing for consultation charges prior to doctor video scheduling, including order generation, status verification, and receipt logging.

---

## 3. 💻 Hardware & Software Requirements
- **Hardware:** Standard PC (4 GB RAM minimum) with active internet connectivity.
- **Software:**
  - Node.js (v18+)
  - Express.js (`^4.19.2`)
  - Nodemailer (`^6.9.13`)
  - Ethereal SMTP / Mailtrap / Gmail API
  - Twilio Telecom REST API
  - Razorpay / Stripe Checkout SDK
  - Web Browser (Chrome / Firefox)

---

## 4. 📚 Theory & Core Architecture
```
                         [ HealthPulse Web Client ]
                                     |
                                 (REST API)
                                     v
                        [ Node.js / Express Server ]
                        /            |            \
                       /             |             \
            (SMTP / MIME)       (HTTP POST)      (HTTPS Webhook)
                     v               v                  v
          [ Nodemailer Service ] [ Twilio SMS ]  [ Razorpay / Stripe ]
          - Ethereal SMTP        - Shortcode SMS  - Order ID generation
          - HTML Prescription    - 6-digit OTP    - Signature verification
          - Clickable Webview    - Delivery SID   - Automated Receipt
```

### 4.1 Email Service Architecture (Nodemailer)
Nodemailer abstracts low-level SMTP socket handshakes. It formats RFC 2822-compliant MIME messages supporting embedded HTML styles. For evaluation without paid credentials, it dynamically spins up an Ethereal cloud test account (`nodemailer.createTestAccount()`) which generates an authenticated, live web inspection link (`nodemailer.getTestMessageUrl(info)`) for instant examiner verification.

### 4.2 SMS Gateway Architecture (Twilio REST API)
SMS gateways bridge IP networks with Global System for Mobile Communications (GSM) networks. Requests are transmitted via authenticated HTTPS POST endpoints containing recipient E.164 phone numbers, sender SID, and message body. The gateway assigns a unique Message SID (`SMxxxxxxxx`) and coordinates carrier routing.

### 4.3 Payment Gateway Architecture (Razorpay / Stripe)
Financial transactions require a two-legged verification flow:
1. **Order Creation:** Client sends intent with amount in smallest currency unit (paise/cents). Server contacts payment processor to generate an immutable `order_id`.
2. **Client Checkout Modal:** User enters card, UPI, or NetBanking details.
3. **Payment Capture & Signature Verification:** Gateway emits `razorpay_payment_id` and cryptographic HMAC-SHA256 signature (`HMAC_SHA256(order_id + "|" + payment_id, secret)`). The server verifies the signature to confirm the transaction is legitimate and has not been tampered with.

---

## 5. ⚙️ Algorithm / Procedure
1. Create Express server with CORS and JSON body-parsing middleware.
2. Configure **Nodemailer SMTP Transporter** with host, port (587), and credentials.
3. Expose `POST /api/service/email`:
   - Assemble HTML medical prescription template.
   - Send email via transporter and extract live test preview URL.
4. Expose `POST /api/service/sms`:
   - Generate secure 6-digit numeric OTP (`Math.floor(100000 + Math.random() * 900000)`).
   - Format SMS text and return unique Message SID with delivery confirmation.
5. Expose `POST /api/service/payment/order` and `POST /api/service/payment/verify`:
   - Create checkout order with currency, amount, and receipt token.
   - Verify transaction capture and generate authenticated payment receipt.
6. Record all outgoing events in a centralized transaction logger (`/api/service/logs`).
7. Build responsive front-end dashboard allowing evaluators to trigger all 3 gateways and view logs in real time.

---

## 6. 🧪 Test Cases & Gateway Verification

| Service | Test Input | Expected Response | Verification Status |
| :--- | :--- | :--- | :---: |
| **Email Gateway** | `asmit.patient@healthpulse.com`, Prescription: "Azithromycin 500mg" | `HTTP 200 OK`, MessageID generated, Clickable Ethereal URL | Passed |
| **SMS Gateway** | Phone: `+91 9820123456`, Name: "Asmit" | `HTTP 200 OK`, Unique Twilio SID, 6-digit OTP displayed | Passed |
| **Payment Order** | Amount: `₹800`, Type: "Cardiology OPD" | `HTTP 200 OK`, `order_id` created, Key ID returned | Passed |
| **Payment Verify**| Valid `order_id` & `payment_id` | `HTTP 200 OK`, Signature Verified, Status = "PAID" | Passed |
| **Logs Terminal** | Trigger all 3 services | Console updates dynamically with timestamped payload entries | Passed |

---

## 7. 📸 How to Run
1. Navigate to the directory:
   ```bash
   cd /home/ubuntu/SBL-EXPT/Asmit_25CE1051/Expt-08-ThirdParty-Services
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Start the server:
   ```bash
   node server.js
   ```
4. Open `http://localhost:8000` in your web browser and test all three service modules.

---

## 8. 💡 Viva-Voce Questions & Answers

**Q1: What is a Webhook and how does it differ from a polling API?**  
*Answer:* Polling requires the client to repeatedly request the server at fixed intervals to check for updates. A Webhook is an automated HTTP callback: when an event occurs (e.g. payment success), the third-party gateway immediately sends an HTTP POST payload to our server, saving bandwidth and delivering real-time notifications.

**Q2: Why must financial amounts be transmitted in paise or cents rather than floating point numbers?**  
*Answer:* Floating-point arithmetic in computers can introduce rounding errors (e.g. `0.1 + 0.2 = 0.30000000000000004`). In financial transactions, amounts are expressed in the smallest indivisible integer currency unit (e.g. 80000 paise for ₹800) to eliminate decimal precision loss.

**Q3: How does HMAC signature verification protect against payment fraud?**  
*Answer:* The payment gateway hashes the order ID and payment ID using a shared merchant secret known only to the merchant server and the gateway. When the client returns the payment signature, the merchant server recalculates the hash. If an attacker tampers with the payment ID or amount, the hashes will not match, blocking unauthorized order fulfillment.

**Q4: What is the purpose of using SMTP Port 587 with STARTTLS?**  
*Answer:* Port 25 is traditionally blocked by consumer ISPs due to spam abuse. Port 587 is the designated standard for email submission. It begins with a plaintext handshake and then upgrades to encrypted TLS via the `STARTTLS` command, ensuring sensitive emails cannot be intercepted.

---

## 9. 🏁 Conclusion
External integrations for **Nodemailer Email**, **Twilio SMS Gateway**, and **Razorpay/Stripe Payment Gateway** were implemented and verified for **HealthPulse**. Real-time transaction logging, digital receipts, and email previews were demonstrated successfully.
