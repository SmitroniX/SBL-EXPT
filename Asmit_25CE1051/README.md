# Skill Based Lab - Advanced Web Technology (SBL-AWT)
## Laboratory Journal & Complete Execution Manual

### 👨‍🎓 Student Profile
- **Student Name:** Asmit Jogdand
- **Roll Number:** `25CE1051`
- **Class / Division:** B.Tech Computer Engineering (Sem VI)
- **Academic Year:** 2026 – 2027
- **Institution:** Ramrao Adik Institute of Technology (RAIT), D Y Patil Deemed to be University, Nerul, Navi Mumbai
- **Problem Statement Domain:** **HealthPulse — Digital Healthcare & Clinical Management Portal**

---

> 📘 **Master Lab Practical Journal:** [**View Markdown Manual**](./INPUT_OUTPUT.md) &nbsp;|&nbsp; [**Download Printable PDF Journal (12 Pages)**](./INPUT_OUTPUT.pdf)

## 📑 Syllabus & Experiment Mapping Index

| Expt. No. | Official Syllabus Title | HealthPulse Implementation | Directory Link | Execution Mode | Input / Output Documentation |
| :---: | :--- | :--- | :--- | :---: | :---: |
| **01** | Design a Registration Form using HTML5 and CSS3 | Patient Health Profile & Insurance Registration | [`Expt-01-Registration-Form`](./Expt-01-Registration-Form) | Browser Standalone | [**MD**](./Expt-01-Registration-Form/INPUT_OUTPUT.md) &nbsp;\|&nbsp; [**PDF**](./Expt-01-Registration-Form/INPUT_OUTPUT.pdf) |
| **02** | Build a Password Strength Indicator & Star Rating System using jQuery | Staff Credential Entropy Analyzer & Doctor Consultation 5-Star Rating | [`Expt-02-Password-Rating-jQuery`](./Expt-02-Password-Rating-jQuery) | Browser Standalone | [**MD**](./Expt-02-Password-Rating-jQuery/INPUT_OUTPUT.md) &nbsp;\|&nbsp; [**PDF**](./Expt-02-Password-Rating-jQuery/INPUT_OUTPUT.pdf) |
| **03** | Design a Homepage using React.js | Multi-Specialty Clinical Homepage with Live Department Filtering | [`Expt-03-React-Homepage`](./Expt-03-React-Homepage) | React 18 / Browser | [**MD**](./Expt-03-React-Homepage/INPUT_OUTPUT.md) &nbsp;\|&nbsp; [**PDF**](./Expt-03-React-Homepage/INPUT_OUTPUT.pdf) |
| **04** | Create a Simple Login Form using React.js | Multi-Role Patient & Doctor Authentication Portal with Session Dashboard | [`Expt-04-React-Login-Form`](./Expt-04-React-Login-Form) | React 18 / Browser | [**MD**](./Expt-04-React-Login-Form/INPUT_OUTPUT.md) &nbsp;\|&nbsp; [**PDF**](./Expt-04-React-Login-Form/INPUT_OUTPUT.pdf) |
| **05** | Connecting Your React.js Project with MongoDB | Full-Stack MERN Patient Appointment Hub with Live MongoDB Sync | [`Expt-05-React-MongoDB-Connect`](./Expt-05-React-MongoDB-Connect) | Node API + React UI | [**MD**](./Expt-05-React-MongoDB-Connect/INPUT_OUTPUT.md) &nbsp;\|&nbsp; [**PDF**](./Expt-05-React-MongoDB-Connect/INPUT_OUTPUT.pdf) |
| **06** | Design a Web Page using Node.js | Pure Node.js Web Server with Native Stream Buffer Parsing & Diagnostics | [`Expt-06-NodeJS-WebPage`](./Expt-06-NodeJS-WebPage) | Pure Node Server | [**MD**](./Expt-06-NodeJS-WebPage/INPUT_OUTPUT.md) &nbsp;\|&nbsp; [**PDF**](./Expt-06-NodeJS-WebPage/INPUT_OUTPUT.pdf) |
| **07** | Design a Form Using Express.js in Node.js | Specialist Doctor Consultation Form with Server-side Validation & Receipt | [`Expt-07-ExpressJS-Form`](./Expt-07-ExpressJS-Form) | Express.js Web Server | [**MD**](./Expt-07-ExpressJS-Form/INPUT_OUTPUT.md) &nbsp;\|&nbsp; [**PDF**](./Expt-07-ExpressJS-Form/INPUT_OUTPUT.pdf) |
| **08** | Integration of Third-Party Services (SMS, Payment, Email) | Clinical Prescriptions (Nodemailer), SMS OTP (Twilio), Fees (Razorpay) | [`Expt-08-ThirdParty-Services`](./Expt-08-ThirdParty-Services) | Express Microservices | [**MD**](./Expt-08-ThirdParty-Services/INPUT_OUTPUT.md) &nbsp;\|&nbsp; [**PDF**](./Expt-08-ThirdParty-Services/INPUT_OUTPUT.pdf) |
| **09** | Hosting Website with Domain Registration Process | Production Cloud Hosting Guide, DNS Zone Records (`healthpulse-care.org`) | [`Expt-09-Hosting-Domain-Process`](./Expt-09-Hosting-Domain-Process) | Vercel / Netlify / Static | [**MD**](./Expt-09-Hosting-Domain-Process/INPUT_OUTPUT.md) &nbsp;\|&nbsp; [**PDF**](./Expt-09-Hosting-Domain-Process/INPUT_OUTPUT.pdf) |
| **10** | Integration of SSL Certificate in Web Application | HTTPS Server, OpenSSL X.509 Keys, HTTP 301 Redirection, Nginx Reverse Proxy | [`Expt-10-SSL-Certificate`](./Expt-10-SSL-Certificate) | Node HTTPS Server | [**MD**](./Expt-10-SSL-Certificate/INPUT_OUTPUT.md) &nbsp;\|&nbsp; [**PDF**](./Expt-10-SSL-Certificate/INPUT_OUTPUT.pdf) |

---

## 🛠️ Global Prerequisites
Before running the backend experiments, ensure you have:
1. **Node.js** (v18.0 or higher recommended). Check with:
   ```bash
   node -v
   ```
2. **npm** (bundled with Node.js). Check with:
   ```bash
   npm -v
   ```
3. Modern Web Browser (Google Chrome, Brave, Mozilla Firefox, Microsoft Edge).

---

## 📖 In-Depth Experiment Details & Step-by-Step Execution Guide

---

### 🔹 Experiment 01: HTML5 & CSS3 Patient Registration Form
- **Directory:** [`Expt-01-Registration-Form`](./Expt-01-Registration-Form)
- **Domain Focus:** HealthPulse Patient Medical Registration & HIPAA Consent Form.
- **Detailed Features:**
  - Semantic HTML5 elements (`<form>`, `<fieldset>`, `<legend>`, `<input>`, `<select>`, `<button>`).
  - Strict input validation constraints:
    - Name: `pattern="^[a-zA-Z\s]+$"` (Alphabets only, minimum 3 chars).
    - Contact: `pattern="[6-9][0-9]{9}"` (10-digit Indian cellular number).
    - Email: `type="email"` (RFC standard email formatting).
    - Password: `(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[@#$%^&+=!]).{8,}` (Min 8 chars, uppercase, digit, symbol).
    - Document Attachment: `accept=".pdf,.png,.jpg,.jpeg"`.
  - Responsive CSS3 layout utilizing CSS Grid and Flexbox with clinical blue theme.
  - Interactive modal summary rendered upon successful validation.
- **How to Execute:**
  ```bash
  cd Expt-01-Registration-Form
  # Option A: Open directly in Chrome
  google-chrome index.html
  # Option B: Run with python local server
  python3 -m http.server 8080
  # Open http://localhost:8080 in your browser
  ```
- **Testing & Verification:**
  1. Try submitting empty form: browser constraint tooltips will immediately block submission.
  2. Enter mismatched passwords: an inline warning appears: `"Passwords do not match!"`.
  3. Enter valid patient data and submit: a confirmation modal displays the complete patient summary.

---

### 🔹 Experiment 02: jQuery Password Strength Indicator & Star Rating System
- **Directory:** [`Expt-02-Password-Rating-jQuery`](./Expt-02-Password-Rating-jQuery)
- **Domain Focus:** HealthPulse Staff Password Security & Doctor Consultation Feedback.
- **Detailed Features:**
  - **Module 1 (Password Analyzer):**
    - jQuery event listeners on `input keyup`.
    - Live regex evaluation against 5 rules (length $\ge 8$, lowercase, uppercase, number, special symbol).
    - Dynamic color transitions (0-20% Red, 40% Orange, 60% Yellow, 80% Light Green, 100% Emerald).
    - Interactive checkmark `✓` and cross `✕` toggles.
    - Password visibility unmasking toggle (`👁️` $\leftrightarrow$ `🔒`).
  - **Module 2 (Star Rating):**
    - 5-star rating widget for Dr. Amarsinh V. Vidhate (Chief Medical Director).
    - Hover states with amber glow and real-time rating labels.
    - Click lock functionality with review comments box.
    - jQuery animated `.fadeIn()` submission banner.
- **How to Execute:**
  ```bash
  cd Expt-02-Password-Rating-jQuery
  google-chrome index.html
  ```
- **Testing & Verification:**
  1. Type `health` $\rightarrow$ Evaluated as Very Weak (20%), only lowercase rule ticks.
  2. Type `Health@2026!` $\rightarrow$ Evaluated as Very Strong (100%), progress bar fills green.
  3. Hover on 5th star $\rightarrow$ all stars light up with text: *"Exceptional (5 Stars)"*. Click to lock and submit review.

---

### 🔹 Experiment 03: React.js Clinical Homepage
- **Directory:** [`Expt-03-React-Homepage`](./Expt-03-React-Homepage)
- **Domain Focus:** HealthPulse Multi-Specialty Clinical Storefront & Emergency Directory.
- **Detailed Features:**
  - React 18 functional components: `StudentHeader`, `Navbar`, `HeroSection`, `StatsBar`, `ServicesSection`, `SpecialistSection`, `EmergencyBanner`, `Footer`.
  - Stateful category tabs (`useState`) filtering clinical specialties (`All`, `Critical Care`, `Outpatient`, `Diagnostics`) dynamically without page reload.
  - Interactive appointment booking trigger passing callback props from `App` to child components.
  - Standalone browser bundle (using Babel Standalone) for zero-setup execution.
- **How to Execute:**
  ```bash
  cd Expt-03-React-Homepage
  # Open in browser directly
  google-chrome index.html
  ```
- **Testing & Verification:**
  1. Click category filter `"Critical Care"` $\rightarrow$ instantly filters cards to Cardiology & Neurology.
  2. Click `"📅 Book Appointment"` $\rightarrow$ prompts for patient name and generates an appointment token.

---

### 🔹 Experiment 04: React.js Multi-Role Login Form
- **Directory:** [`Expt-04-React-Login-Form`](./Expt-04-React-Login-Form)
- **Domain Focus:** HealthPulse Secure Patient & Staff Authentication Portal.
- **Detailed Features:**
  - Controlled inputs (`value` bound to `useState`).
  - Real-time client-side validation for email/10-digit phone and 6+ character password.
  - Interactive role switcher tabs: `👤 Patient`, `👨‍⚕️ Doctor`, `🛡️ Admin`.
  - Password visibility toggle.
  - Asynchronous authentication latency simulation (spinner state).
  - Conditional rendering: transitions seamlessly from login form to authenticated Clinical Dashboard upon success, with session logout button.
  - Quick test profile buttons for 1-click test credential population.
- **How to Execute:**
  ```bash
  cd Expt-04-React-Login-Form
  google-chrome index.html
  ```
- **Testing & Verification:**
  1. Click `"Fill Patient"` $\rightarrow$ auto-populates demo credentials.
  2. Click `"Sign In to Patient Portal"` $\rightarrow$ displays *"Authenticating Session..."* then loads Patient Dashboard.
  3. Click `"Sign Out of Session"` $\rightarrow$ resets state back to clean login form.

---

### 🔹 Experiment 05: Connecting React.js Project with MongoDB
- **Directory:** [`Expt-05-React-MongoDB-Connect`](./Expt-05-React-MongoDB-Connect)
- **Domain Focus:** HealthPulse Patient Appointment Hub with MongoDB Synchronization.
- **Detailed Features:**
  - Express.js backend with Mongoose ODM schema for patient appointments (`server.js`).
  - Resilient design: auto-connects to MongoDB (`mongodb://127.0.0.1:27017/healthpulse_db`), and seamlessly provides an In-Memory fallback store if local MongoDB is not running, with live engine indicator.
  - Full REST API:
    - `GET /api/status`: Health check & active DB engine.
    - `GET /api/appointments`: List appointments.
    - `POST /api/appointments`: Insert new appointment.
    - `DELETE /api/appointments/:id`: Cancel appointment.
  - React.js frontend (`public/index.html`) communicating asynchronously via `fetch()`.
- **How to Execute:**
  ```bash
  cd Expt-05-React-MongoDB-Connect
  # Step 1: Install dependencies
  npm install
  # Step 2: Start the server (default port 5000)
  node server.js
  # Or with custom port:
  PORT=5000 node server.js
  ```
- **Testing & Verification:**
  1. Open `http://localhost:5000` in your browser.
  2. Observe the Database Status Pill: `🟢 Engine: MongoDB` or `🟡 Engine: In-Memory Resilient Store`.
  3. Fill out the "Book OPD Appointment" form and click Submit $\rightarrow$ the live table immediately updates with the new record.
  4. Click `"Cancel"` on any row $\rightarrow$ record is deleted from database and removed from UI.

---

### 🔹 Experiment 06: Design a Web Page using Node.js (Pure Core Modules)
- **Directory:** [`Expt-06-NodeJS-WebPage`](./Expt-06-NodeJS-WebPage)
- **Domain Focus:** HealthPulse Telehealth Core Web Server.
- **Detailed Features:**
  - Built strictly using native Node.js core modules: `http`, `url`, `os`, `path`, with zero external npm dependencies.
  - Low-level HTTP request routing: `/`, `/about`, `/consultation`, `/api/status`.
  - Stream chunk parsing for POST body: `req.on('data')`, `req.on('end')`.
  - Dynamic server diagnostics injected via `os.freemem()`, `os.totalmem()`, `process.uptime()`.
  - Custom 404 Not Found error page.
- **How to Execute:**
  ```bash
  cd Expt-06-NodeJS-WebPage
  # No npm install needed! Run directly:
  node server.js
  # If port 3000 is occupied, run with custom port:
  PORT=3555 node server.js
  ```
- **Testing & Verification:**
  1. Open `http://localhost:3555` in your browser.
  2. Inspect the Real-Time Server Diagnostics card (runtime version, uptime, memory).
  3. Submit the Consultation Request form $\rightarrow$ Node receives the binary stream chunks, parses parameters, and renders a dynamic confirmation ticket (`HP-XXXXXX`).
  4. Test JSON metrics endpoint via terminal:
     ```bash
     curl -s http://localhost:3555/api/status
     ```

---

### 🔹 Experiment 07: Design a Form Using Express.js in Node.js
- **Directory:** [`Expt-07-ExpressJS-Form`](./Expt-07-ExpressJS-Form)
- **Domain Focus:** Specialist Doctor Consultation Booking with Server-Side Validation.
- **Detailed Features:**
  - Express.js middleware: `express.urlencoded({ extended: true })`, `express.json()`.
  - Custom request logger middleware.
  - Server-side validation against empty names, invalid 10-digit mobile numbers (`/^[6-9]\d{9}$/`), invalid emails, and unselected doctors.
  - Form re-rendering upon validation failure: highlights invalid fields with red borders and preserves previously entered input values.
  - Dynamic consultation fee calculation based on visit type (OPD: ₹800, Telehealth: ₹500, Home Visit: ₹1,500).
  - Official Consultation Confirmation Receipt generation with unique booking reference.
- **How to Execute:**
  ```bash
  cd Expt-07-ExpressJS-Form
  npm install
  node server.js
  # Or with custom port:
  PORT=4000 node server.js
  ```
- **Testing & Verification:**
  1. Open `http://localhost:4000` in your browser.
  2. Leave fields blank and submit $\rightarrow$ page returns `HTTP 400` with an itemized error summary banner.
  3. Enter valid phone `9820123456`, email `patient@healthpulse.com`, choose specialist $\rightarrow$ page returns `HTTP 200` with an official Medical Receipt.
  4. View JSON data in browser at `http://localhost:4000/api/appointments`.

---

### 🔹 Experiment 08: Integration of Third-Party Services (Email, SMS, Payment)
- **Directory:** [`Expt-08-ThirdParty-Services`](./Expt-08-ThirdParty-Services)
- **Domain Focus:** HealthPulse Clinical Communication & Billing Gateways.
- **Detailed Features:**
  - **Email Service (Nodemailer):** Auto-configures an Ethereal cloud SMTP test account. When triggered, it dispatches an HTML medical prescription and returns a live, clickable preview URL (`nodemailer.getTestMessageUrl(info)`)!
  - **SMS Gateway (Twilio Protocol):** Simulates two-factor identity verification OTP generation (6 digits) and sends simulated cellular dispatch payloads with message SIDs.
  - **Payment Gateway (Razorpay/Stripe):** Creates structured payment orders (`amountInPaise`), validates transactions, and generates signed digital payment receipts.
  - Unified testing dashboard in `public/index.html` with real-time JSON transaction logging terminal.
- **How to Execute:**
  ```bash
  cd Expt-08-ThirdParty-Services
  npm install
  node server.js
  # Or with custom port:
  PORT=8000 node server.js
  ```
- **Testing & Verification:**
  1. Open `http://localhost:8000` in your browser.
  2. Click `"Dispatch Medical Email"` $\rightarrow$ wait 1 second $\rightarrow$ click the generated preview link to view the fully rendered HTML prescription in Ethereal's web viewer.
  3. Click `"Dispatch SMS & OTP Alert"` $\rightarrow$ view generated OTP and message SID in real time.
  4. Click `"Execute Payment Checkout"` $\rightarrow$ initiates order and verifies transaction.
  5. Check the Real-Time Gateway Transaction Logs terminal at the bottom of the dashboard.

---

### 🔹 Experiment 09: Hosting Website with Domain Registration Process
- **Directory:** [`Expt-09-Hosting-Domain-Process`](./Expt-09-Hosting-Domain-Process)
- **Domain Focus:** HealthPulse Production Cloud Deployment & DNS Architecture (`healthpulse-care.org`).
- **Detailed Features:**
  - Complete authoritative DNS zone table: A, CNAME, MX, TXT (SPF), NS records.
  - Production cloud deployment configurations:
    - `vercel.json`: Clean URLs, route rewrites, security headers.
    - `netlify.toml`: Build command and SPA redirect rules.
  - 5-step detailed domain registration and cloud edge deployment manual.
  - Interactive DNS propagation query simulator in `public/index.html` (simulates `dig` and `nslookup` output).
- **How to Execute:**
  ```bash
  cd Expt-09-Hosting-Domain-Process
  # Option A: Open public/index.html directly
  google-chrome public/index.html
  # Option B: Run lightweight server
  npx serve public
  ```
- **Testing & Verification:**
  1. Select record type (e.g. `A Record`, `MX Record`, `TXT Record`) and click `"Run DNS Query"`.
  2. Inspect the simulated `dig` output displaying Anycast IP `76.76.21.21` and SPF records.

---

### 🔹 Experiment 10: Integration of SSL Certificate in Web Application
- **Directory:** [`Expt-10-SSL-Certificate`](./Expt-10-SSL-Certificate)
- **Domain Focus:** End-to-End Cryptographic Encryption via HTTPS Server & Nginx Reverse Proxy.
- **Detailed Features:**
  - Automated OpenSSL script (`generate-ssl.sh`): Generates 2048-bit RSA private key (`server-key.pem`) and X.509 certificate (`server-cert.pem`) with Subject Alternative Names (`localhost`, `healthpulse-care.local`, `127.0.0.1`).
  - Node.js HTTPS server (`server-https.js`) listening on Port 8443 enforcing TLS 1.2+ and TLS 1.3 ciphers.
  - Automated HTTP-to-HTTPS 301 redirection server listening on Port 8080.
  - Enterprise security headers: HSTS (`max-age=31536000`), `X-Content-Type-Options: nosniff`, `X-Frame-Options: SAMEORIGIN`.
  - Production `nginx-ssl.conf` reverse proxy configuration template.
- **How to Execute:**
  ```bash
  cd Expt-10-SSL-Certificate
  # Step 1: Generate certificates (already generated, or re-run):
  bash generate-ssl.sh
  # Step 2: Install Express
  npm install
  # Step 3: Launch HTTPS server & HTTP redirector
  node server-https.js
  ```
- **Testing & Verification:**
  1. Open browser to `https://localhost:8443` (click Advanced $\rightarrow$ Proceed to localhost to accept self-signed dev certificate).
  2. Inspect the live TLS handshake telemetry box (negotiated cipher: `TLS_AES_256_GCM_SHA384`, RSA 2048-bit).
  3. Test HTTP to HTTPS 301 redirection in terminal:
     ```bash
     curl -I http://localhost:8080/
     # Returns: HTTP/1.1 301 Moved Permanently -> Location: https://localhost:8443/
     ```
  4. Test encrypted HTTPS endpoint via `curl`:
     ```bash
     curl -kv https://localhost:8443/api/ssl-info
     ```

---

## 💡 Troubleshooting & FAQs

- **Port Conflict (`EADDRINUSE`)**:
  If a port is already taken by another process on your machine, simply pass an environment variable when starting the server:
  ```bash
  PORT=6001 node server.js
  ```
- **Self-Signed Certificate Warning in Chrome**:
  Since the SSL certificate in Experiment 10 is self-signed for laboratory testing, Chrome displays a warning. Click **"Advanced"** and then **"Proceed to localhost (unsafe)"**.
- **MongoDB Connection Offline**:
  In Experiment 5, if your computer does not have a local MongoDB daemon running, the application gracefully activates its built-in in-memory fallback store so all CRUD operations continue to function without crashing.

---

## 🏫 Academic Credentials
- **Course:** Skill Based Lab - Advanced Web Technology (SBL - AWT)
- **Student:** Asmit Jogdand (Roll No: `25CE1051`)
- **Institution:** Ramrao Adik Institute of Technology (RAIT), D Y Patil Deemed to be University
- **Academic Year:** 2026 – 2027
