# Experiment 08: Input & Output Manual
## Integration of Third-Party Services in Web Application (Email, SMS, Payment)

---

### 👨‍🎓 Student & Laboratory Credentials
- **Student Name:** Asmit Jogdand
- **Roll Number:** `25CE1051`
- **Class / Division:** B.Tech Computer Engineering (Sem VI)
- **Academic Year:** 2026 – 2027
- **Course:** Skill Based Lab - Advanced Web Technology (SBL-AWT)
- **Institution:** Ramrao Adik Institute of Technology (RAIT), D Y Patil Deemed to be University, Nerul, Navi Mumbai
- **Problem Statement Domain:** **HealthPulse — Digital Healthcare & Clinical Management Portal**
- **Experiment Title:** Integration of Third-Party Services in Web Application (SMS Gateway, Payment Gateway, Email)

---

## 1. 🎯 Experiment Aim
To design, implement, and integrate essential third-party cloud microservices into a healthcare web portal:
1. **Email Gateway (Nodemailer):** Automated medical prescription dispatch with live cloud SMTP preview generation.
2. **SMS Gateway (Twilio Protocol):** Two-factor authentication (2FA) one-time password (OTP) and clinical alert dispatch.
3. **Payment Gateway (Razorpay/Stripe Protocol):** End-to-end checkout order creation, transaction verification, and receipt capturing.

---

## 2. 📥 Input Specification

### 2.1 File System Input

| File Name | Format | Role & Implementation Responsibility |
| :--- | :--- | :--- |
| `server.js` | Express.js / Node.js | Microservices hub configuring Nodemailer Ethereal SMTP transport, Twilio SMS protocol handler, Razorpay/Stripe checkout API, and real-time transaction event logger. |
| `package.json` | JSON | Dependencies declaration (`express`, `nodemailer`, `cors`) and execution scripts. |
| `public/index.html`| HTML5 / CSS3 / JS | Unified laboratory testing dashboard with trigger panels for Email, SMS, and Payment, connected to an active JSON transaction logs terminal. |

### 2.2 Execution Command Input

```bash
# Navigate to the experiment directory
cd /home/ubuntu/SBL-EXPT/Asmit_25CE1051/Expt-08-ThirdParty-Services

# Step 1: Install dependencies
npm install

# Step 2: Start microservices server (Default Port: 8000)
node server.js

# Or with custom port:
PORT=8000 node server.js
```

### 2.3 Microservices API Input Schema

```
+----------------------------------------------------------------------------------------------------+
| SERVICE / API ROUTE               | HTTP | INPUT PARAMETERS (JSON PAYLOAD)         | OUTPUT ACTION |
+----------------------------------------------------------------------------------------------------+
| /api/service/email                | POST | { patientEmail, patientName,            | Sends SMTP e-mail &
|                                   |      |   doctorName, prescriptionNotes }       | returns preview URL
|                                   |      |                                         |
| /api/service/sms                  | POST | { phone, patientName, appointmentTime } | Generates 6-digit OTP
|                                   |      |                                         | & Twilio Message SID
|                                   |      |                                         |
| /api/service/payment/order        | POST | { amount, patientName, consultationType}| Creates Razorpay order
|                                   |      |                                         | in paise with Order ID
|                                   |      |                                         |
| /api/service/payment/verify       | POST | { orderId, paymentId, amount, patient } | Verifies signature &
|                                   |      |                                         | issues digital receipt
+----------------------------------------------------------------------------------------------------+
```

### 2.4 Sample Input Test Payloads

#### Test Vector 1: Email Prescription Dispatch
```bash
curl -X POST http://localhost:8000/api/service/email \
  -H "Content-Type: application/json" \
  -d '{
    "patientEmail": "asmit.jogdand@healthpulse.org",
    "patientName": "Asmit Jogdand",
    "doctorName": "Dr. Amarsinh V. Vidhate",
    "appointmentDate": "2026-10-05",
    "prescriptionNotes": "Tab Paracetamol 500mg TDS x 3 days, Tab Cetirizine 10mg OD x 5 days"
  }'
```

#### Test Vector 2: SMS OTP Verification Alert
```bash
curl -X POST http://localhost:8000/api/service/sms \
  -H "Content-Type: application/json" \
  -d '{
    "phone": "9876543210",
    "patientName": "Asmit Jogdand",
    "appointmentTime": "10:30 AM"
  }'
```

#### Test Vector 3: Payment Order Generation
```bash
curl -X POST http://localhost:8000/api/service/payment/order \
  -H "Content-Type: application/json" \
  -d '{
    "amount": 800,
    "patientName": "Asmit Jogdand",
    "consultationType": "Cardiology Super-Specialty OPD"
  }'
```

---

## 3. 📤 Output Specification

### 3.1 Terminal Execution & Gateway Startup Logs

```
$ PORT=8000 node server.js
[HealthPulse] Third-Party Services Gateway running at http://localhost:8000
[HealthPulse] Student: Asmit Jogdand (25CE1051)
[HealthPulse Email] Ethereal SMTP Initialized. Test User: vmvnfbuhd4tlcgth@ethereal.email
[HealthPulse Gateway] Nodemailer Ethereal Cloud connection verified.
```

### 3.2 Microservice 1 Output: Email Dispatch Response

```json
HTTP/1.1 200 OK
Content-Type: application/json; charset=utf-8

{
  "success": true,
  "message": "Clinical email successfully dispatched via SMTP gateway!",
  "data": {
    "service": "Email Gateway (Nodemailer)",
    "recipient": "asmit.jogdand@healthpulse.org",
    "messageId": "<5f7cb53a-26e4-9c4a-986f-0a540585d997@healthpulse.com>",
    "previewUrl": "https://ethereal.email/message/ar4ogQLEqXPhQbfqar4ohcAYPlgYhv4sAAAAAe2NjK1QAuOxuebsZSfheeA",
    "status": "Delivered",
    "timestamp": "9:31:49 AM"
  }
}
```
*(Opening the generated `previewUrl` in any browser displays the full medical HTML prescription with clinical header, patient demographics, and doctor notes).*

### 3.3 Microservice 2 Output: SMS Gateway Alert Response

```json
HTTP/1.1 200 OK
Content-Type: application/json; charset=utf-8

{
  "success": true,
  "message": "SMS alert dispatched to 9876543210 successfully!",
  "data": {
    "service": "SMS Gateway (Twilio Integration Protocol)",
    "recipient": "9876543210",
    "sid": "SMrrismdhypn7k1267pp923",
    "otp": 334340,
    "body": "[HealthPulse] Hello Asmit Jogdand, your OTP for consultation verification is 334340. Appointment confirmed for 10:30 AM. Do not share this OTP.",
    "gatewayResponse": "200 OK — Delivered via Telecom Provider",
    "status": "Sent / Delivered",
    "timestamp": "9:32:06 AM"
  }
}
```

### 3.4 Microservice 3 Output: Payment Gateway Order & Capture Responses

#### A. Order Creation Response:
```json
HTTP/1.1 200 OK
Content-Type: application/json; charset=utf-8

{
  "success": true,
  "message": "Payment order generated on payment gateway",
  "order": {
    "orderId": "order_hp_gdzhwhyxeh",
    "receiptNo": "rcpt_444012",
    "amount": 800,
    "currency": "INR",
    "amountInPaise": 80000,
    "patientName": "Asmit Jogdand",
    "consultationType": "Cardiology Super-Specialty OPD",
    "status": "Created",
    "keyId": "rzp_test_HPHealthPulse2026"
  }
}
```

#### B. Verification & Capture Response (`POST /api/service/payment/verify`):
```json
HTTP/1.1 200 OK
Content-Type: application/json; charset=utf-8

{
  "success": true,
  "message": "Payment verified and captured successfully!",
  "receipt": {
    "service": "Payment Gateway (Razorpay/Stripe Protocol)",
    "orderId": "order_hp_gdzhwhyxeh",
    "paymentId": "pay_test_99214488",
    "amount": "₹800",
    "patient": "Asmit Jogdand",
    "verificationStatus": "SIGNATURE_VERIFIED_SUCCESSFUL",
    "status": "Payment Captured (PAID)",
    "timestamp": "9:32:06 AM"
  }
}
```

### 3.5 Unified Testing Dashboard Output Representation (`GET /`)

```
+----------------------------------------------------------------------------------------------------+
|  [HealthPulse Portal]  SBL - Advanced Web Technology (Sem VI)          Student: Asmit (25CE1051)   |
+----------------------------------------------------------------------------------------------------+
|                                                                                                    |
|                             🌐 THIRD-PARTY MICROSERVICES TESTING DASHBOARD                         |
|                    Integration Hub for Nodemailer (Email), Twilio (SMS), & Razorpay                |
|                                                                                                    |
|  +-- 1. Nodemailer Email Gateway --+  +-- 2. Twilio SMS OTP Gateway -+  +-- 3. Razorpay Checkout -+ |
|  | Patient: [ Asmit Jogdand       ]|  | Phone: [ +91 9876543210      ]|  | Consultation Fee: ₹800  | |
|  | Email:   [ asmit@hp.org        ]|  | Time:  [ 10:30 AM            ]|  | Patient: Asmit Jogdand | |
|  | Notes:   [ Tab Paracetamol TDS ]|  | Purpose: 2FA Verification OTP |  | Mode: Super-Specialty  | |
|  |                                 |  |                               |  |                        | |
|  | [ ✉️ Dispatch Prescription ]     |  | [ 📱 Dispatch SMS & OTP ]     |  | [ 💳 Execute Checkout] | |
|  +---------------------------------+  +-------------------------------+  +------------------------+ |
|                                                                                                    |
|  +-- Real-Time Gateway Transaction Logs Terminal -----------------------------------------------+  |
|  | [09:31:49 AM] [EMAIL] Status: Delivered | MessageID: <5f7cb53a...> | Preview: ethereal.email/.. |
|  | [09:32:06 AM] [SMS]   Status: Delivered | SID: SMrrismdh... | Generated OTP: 334340            |
|  | [09:32:06 AM] [PAY]   Status: Captured  | Order: order_hp_gdzh... | Amount: ₹800.00 PAID       |
|  +----------------------------------------------------------------------------------------------+  |
+----------------------------------------------------------------------------------------------------+
```

### 3.6 Test Case Execution Results

| Test Scenario | Microservice Triggered | Backend Validation & Gateway Logic | Observed Output Result | Status |
| :--- | :--- | :--- | :--- | :---: |
| **Email Missing Recipient** | `POST /api/service/email` (no email) | Rejects payload missing mandatory email | HTTP 400: *"Recipient email is required"* | **PASS** |
| **Valid Email Dispatch** | Complete email payload | Connects to SMTP; returns messageId | HTTP 200; Live Ethereal preview link returned | **PASS** |
| **SMS Missing Phone** | `POST /api/service/sms` (no phone) | Rejects payload missing cellular number | HTTP 400: *"Phone number is required"* | **PASS** |
| **Valid SMS OTP Alert** | Injects phone `9876543210` | Generates 6-digit random OTP + Twilio SID | HTTP 200; SMS dispatched with unique SID | **PASS** |
| **Payment Order Creation** | Injects amount ₹800 | Computes amount in paise (`80000`) | HTTP 200; Generates order `order_hp_...` | **PASS** |
| **Payment Signature Verify**| Injects Order & Payment IDs | Verifies signature integrity | HTTP 200; Returns digital receipt with PAID status | **PASS** |

---

## 4. 🏁 Conclusion & Verification
Experiment 08 demonstrated professional third-party API integration. By orchestrating Nodemailer for clinical prescriptions, simulating Twilio telecom protocols for OTP two-factor verification, and structuring Razorpay/Stripe transaction pipelines, the application verified end-to-end cloud microservice communication.
