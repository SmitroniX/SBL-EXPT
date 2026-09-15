# Experiment 08: Integration of Third-Party Services in Web Application (SMS Gateway, Payment Gateway, Email)

## 📌 Student Details
- **Student Name:** Somnath Jha
- **Roll Number:** 25CE1050
- **Branch / Class:** B.Tech Computer Engineering (Sem VI)
- **Institution:** Ramrao Adik Institute of Technology (RAIT), D Y Patil Deemed to be University
- **Subject:** Skill Based Lab - Advanced Web Technology (SBL-AWT)

---

## 1. 🎯 Aim
To configure, integrate, and test external cloud microservices in a web application:
1. **Email Gateway:** Automated dispatch of HTML invoices & hardware warranty certificates via **Nodemailer** over SMTP.
2. **SMS Gateway:** Transmission of delivery dispatch verification OTPs and logistics alerts conforming to **Twilio Telecom API Protocols**.
3. **Payment Gateway:** Multi-tier checkout order generation and cryptographic payment verification modeled on **Razorpay / Stripe**.

---

## 2. ⚡ Problem Statement
**TechVault E-Commerce Checkout Gateways:**
Hardware procurement platforms require tight integrations with external services:
- **Email:** Customers must receive formal PDF/HTML tax invoices detailing serial numbers and 3-year warranty assurances.
- **SMS:** Delivery agents require 6-digit one-time passwords (OTP) to confirm handover of high-value hardware items like GPUs and 49" OLED monitors.
- **Payment:** Immediate, tamper-proof payment processing supporting credit cards, UPI, and net-banking with signature validation.

---

## 3. 💻 Hardware & Software Requirements
- **Hardware:** PC with active internet connection.
- **Software:**
  - Node.js (v18+)
  - Express.js (`^4.19.2`)
  - Nodemailer (`^6.9.13`)
  - Ethereal SMTP Provider
  - Twilio Telecom REST API
  - Razorpay / Stripe SDKs
  - Web Browser

---

## 4. 📚 Theory & Architecture
```
                               [ TechVault Web Client ]
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
             - HTML Invoice         - 6-digit OTP    - Signature verification
             - Clickable Webview    - Delivery SID   - Automated Receipt
```

---

## 5. ⚙️ Algorithm / Procedure
1. Create Express server listening on `PORT 8001`.
2. Configure **Nodemailer** with Ethereal test SMTP credentials.
3. Expose `POST /api/service/email`:
   - Assemble HTML invoice with warranty terms.
   - Dispatch message and generate inspection URL (`nodemailer.getTestMessageUrl(info)`).
4. Expose `POST /api/service/sms`:
   - Generate random 6-digit delivery verification OTP.
   - Format SMS message body and return Twilio Message SID (`SMxxxxxxxx`).
5. Expose `POST /api/service/payment/order` and `POST /api/service/payment/verify`:
   - Generate order token with currency INR.
   - Verify transaction payment ID and emit payment receipt.
6. Record outgoing activities in centralized transaction logger (`/api/service/logs`).
7. Serve dark-mode testing dashboard enabling evaluators to test all three services simultaneously.

---

## 6. 🧪 Test Cases & Results

| Gateway | Input Data | Expected Response | Status |
| :--- | :--- | :--- | :---: |
| **Email Gateway** | `somnath.dev@techvault.io`, Item: "Titan-X 49 OLED" | `HTTP 200 OK`, MessageID created, Ethereal preview link returned | Passed |
| **SMS Gateway** | Phone: `+91 9876543210`, Tracking: "TV-BLUEDART-88219" | `HTTP 200 OK`, Twilio SID, 6-digit OTP generated | Passed |
| **Payment Order** | Amount: `₹1,15,000`, Model: "Titan-X 49 OLED" | `HTTP 200 OK`, Order ID generated, Key ID emitted | Passed |
| **Payment Verify**| Valid `order_id` & `payment_id` | `HTTP 200 OK`, Verified signature, Status = "PAID" | Passed |
| **Activity Console** | Trigger transactions | Console automatically updates with timestamped payloads | Passed |

---

## 7. 📸 How to Run
```bash
cd /home/ubuntu/SBL-EXPT/Somnath_25CE1050/Expt-08-ThirdParty-Services
npm install
node server.js
# Access in browser: http://localhost:8001
```

---

## 8. 💡 Viva-Voce Questions & Answers

**Q1: What is the difference between synchronous and asynchronous notification delivery?**  
*Answer:* Synchronous delivery blocks the client until the external gateway responds (which can take several seconds for cellular networks). Asynchronous delivery offloads notification jobs to message queues (e.g. BullMQ, RabbitMQ) and returns an immediate response to the user, executing the external dispatch in the background.

**Q2: What is an Ethereal SMTP account and why is it useful in development?**  
*Answer:* Ethereal is a fake SMTP service provided by Nodemailer. It accepts real SMTP connections without actually sending emails to real users, providing a generated URL to visually inspect the rendered HTML in a web browser.

**Q3: How do payment gateways notify merchants if the user closes their browser before returning to the website?**  
*Answer:* Via Webhooks. The payment gateway sends an independent, asynchronous HTTP POST request directly to the merchant's server endpoint (e.g. `/api/webhooks/payment-captured`), ensuring payment status is updated in the database even if the user disconnected.

---

## 9. 🏁 Conclusion
Third-party microservices for **Nodemailer Email**, **Twilio SMS Gateway**, and **Razorpay/Stripe Payment Gateway** were implemented and verified for **TechVault**. Live delivery OTPs, HTML email previews, and transaction logging were successfully demonstrated.
