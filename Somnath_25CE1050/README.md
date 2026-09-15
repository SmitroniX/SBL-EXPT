# Skill Based Lab - Advanced Web Technology (SBL-AWT)
## Laboratory Journal & Complete Execution Manual

### 👨‍🎓 Student Profile
- **Student Name:** Somnath Jha
- **Roll Number:** `25CE1050`
- **Class / Division:** B.Tech Computer Engineering (Sem VI)
- **Academic Year:** 2026 – 2027
- **Institution:** Ramrao Adik Institute of Technology (RAIT), D Y Patil Deemed to be University, Nerul, Navi Mumbai
- **Problem Statement Domain:** **TechVault — Developer Hardware & Smart Electronics E-Commerce Hub**

---

## 📑 Syllabus & Experiment Mapping Index

| Expt. No. | Official Syllabus Title | TechVault Implementation | Directory Link | Execution Mode |
| :---: | :--- | :--- | :--- | :---: |
| **01** | Design a Registration Form using HTML5 and CSS3 | Developer & Corporate Hardware Procurement Account Registration | [`Expt-01-Registration-Form`](./Expt-01-Registration-Form) | Browser Standalone |
| **02** | Build a Password Strength Indicator & Star Rating System using jQuery | Master Developer Password Analyzer & 5-Star Hardware Review System | [`Expt-02-Password-Rating-jQuery`](./Expt-02-Password-Rating-jQuery) | Browser Standalone |
| **03** | Design a Homepage using React.js | Developer Hardware Storefront with Dynamic Category Tabs & Cart State | [`Expt-03-React-Homepage`](./Expt-03-React-Homepage) | React 18 / Browser |
| **04** | Create a Simple Login Form using React.js | Multi-Role Developer Single-Sign-On (SSO) Portal & Command Center | [`Expt-04-React-Login-Form`](./Expt-04-React-Login-Form) | React 18 / Browser |
| **05** | Connecting Your React.js Project with MongoDB | Full-Stack MERN Hardware Inventory & Order Dispatch Sync Hub | [`Expt-05-React-MongoDB-Connect`](./Expt-05-React-MongoDB-Connect) | Node API + React UI |
| **06** | Design a Web Page using Node.js | Pure Node.js Hardware Catalog Server with Post Buffer Streaming & Telemetry | [`Expt-06-NodeJS-WebPage`](./Expt-06-NodeJS-WebPage) | Pure Node Server |
| **07** | Design a Form Using Express.js in Node.js | Custom PC Rig Configurator with Server-Side Validation & Pricing Invoice | [`Expt-07-ExpressJS-Form`](./Expt-07-ExpressJS-Form) | Express.js Web Server |
| **08** | Integration of Third-Party Services (SMS, Payment, Email) | Order Invoices (Nodemailer), Delivery OTP (Twilio), Hardware Checkout (Razorpay) | [`Expt-08-ThirdParty-Services`](./Expt-08-ThirdParty-Services) | Express Microservices |
| **09** | Hosting Website with Domain Registration Process | Production Cloud Hosting Guide, DNS Zone Records (`techvault-store.io`) | [`Expt-09-Hosting-Domain-Process`](./Expt-09-Hosting-Domain-Process) | Vercel / Netlify / Static |
| **10** | Integration of SSL Certificate in Web Application | HTTPS Server, OpenSSL X.509 Keys, HTTP 301 Redirection, Nginx Reverse Proxy | [`Expt-10-SSL-Certificate`](./Expt-10-SSL-Certificate) | Node HTTPS Server |

---

## 🛠️ Global Prerequisites
Before running backend experiments, make sure the following are installed:
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

### 🔹 Experiment 01: HTML5 & CSS3 Developer Registration Form
- **Directory:** [`Expt-01-Registration-Form`](./Expt-01-Registration-Form)
- **Domain Focus:** TechVault Developer Account & Corporate Hardware Procurement Registration.
- **Detailed Features:**
  - Semantic HTML5 structure with fieldsets: *Developer & Organization Identity*, *Hardware Procurement Preferences*, and *Account Security*.
  - Strict input validation constraints:
    - Name: `pattern="^[a-zA-Z\s]+$"` (Letters only, minimum 3 chars).
    - Mobile: `pattern="[6-9][0-9]{9}"` (10-digit Indian cellular number).
    - Email: `type="email"` (Corporate email syntax).
    - GSTIN Tax ID: `pattern="^[0-9]{2}[A-Z]{5}[0-9]{4}[A-Z]{1}[1-9A-Z]{1}Z[0-9A-Z]{1}$"` (Strict 15-character Indian GST format).
    - File upload: `accept=".pdf,.png,.jpg,.jpeg"`.
  - Modern dark-mode styling with purple/indigo accents, glowing focus rings, and responsive CSS Grid.
  - Interactive modal summary summarizing submitted developer profile.
- **How to Execute:**
  ```bash
  cd Expt-01-Registration-Form
  google-chrome index.html
  ```
- **Testing & Verification:**
  1. Try submitting blank form: browser constraint validation highlights required inputs.
  2. Enter invalid GSTIN (e.g. `TEST123`): browser rejects input until valid 15-character format is entered.
  3. Enter mismatched passwords: inline red warning `"Passwords do not match!"` blocks submission.
  4. Fill valid developer data and submit: confirmation modal displays enrolled account data.

---

### 🔹 Experiment 02: jQuery Password Strength Indicator & Star Rating System
- **Directory:** [`Expt-02-Password-Rating-jQuery`](./Expt-02-Password-Rating-jQuery)
- **Domain Focus:** Developer Account Password Security & Hardware Product 5-Star Review Rating.
- **Detailed Features:**
  - **Module 1 (Password Analyzer):**
    - jQuery event handlers listening to real-time `input keyup`.
    - Live regex checks for length $\ge 8$, lowercase, uppercase, digits, and special characters.
    - Animated progress bar with dynamic color transitions: None $\rightarrow$ Very Weak (20%) $\rightarrow$ Weak (40%) $\rightarrow$ Medium (60%) $\rightarrow$ Strong (80%) $\rightarrow$ Very Strong / Military Grade (100%).
    - Interactive checkmark `✓` and cross `✕` toggles.
    - Password visibility toggle (`👁️` $\leftrightarrow$ `🔒`).
  - **Module 2 (Star Rating):**
    - 5-star rating widget for flagship *Titan-X 49" UltraWide Curved OLED Display*.
    - Star hover states with gold glow and real-time rating status feedback.
    - Click lock functionality with technical review textarea.
    - Verified purchase review card rendered via jQuery `.fadeIn()` animation.
- **How to Execute:**
  ```bash
  cd Expt-02-Password-Rating-jQuery
  google-chrome index.html
  ```
- **Testing & Verification:**
  1. Type `tech` $\rightarrow$ evaluated as Very Weak (20%), only lowercase rule satisfies.
  2. Type `TechVault@2026!` $\rightarrow$ evaluated as Military Grade (100%), progress bar fills green.
  3. Hover on 5th star $\rightarrow$ all stars light up with text: *"Exceptional (5 Stars) — Ultimate developer battle-station dream!"*. Click to lock and submit review.

---

### 🔹 Experiment 03: React.js Developer Hardware Storefront Homepage
- **Directory:** [`Expt-03-React-Homepage`](./Expt-03-React-Homepage)
- **Domain Focus:** TechVault Hardware Storefront & Developer Equipment Showcase.
- **Detailed Features:**
  - React 18 functional components: `StudentBanner`, `Navbar`, `HeroSection`, `StatsBar`, `ProductCatalog`, `Footer`.
  - Stateful category tabs (`useState`) filtering products (`All`, `Workstations`, `Monitors`, `Keyboards`, `AI Accelerators`) dynamically.
  - Interactive shopping cart counter in `Navbar` that dynamically increments when clicking `"Add to Cart 🛒"`.
  - Zero-setup standalone bundle (Babel Standalone + React 18 CDN).
- **How to Execute:**
  ```bash
  cd Expt-03-React-Homepage
  google-chrome index.html
  ```
- **Testing & Verification:**
  1. Click category tab `"Monitors"` $\rightarrow$ instantly filters grid to display 49" OLED and 32" UltraSharp displays.
  2. Click `"Add to Cart 🛒"` on any product $\rightarrow$ cart count in Navbar increments from 2 to 3, and an alert confirms item addition.

---

### 🔹 Experiment 04: React.js Multi-Role Developer Login Form
- **Directory:** [`Expt-04-React-Login-Form`](./Expt-04-React-Login-Form)
- **Domain Focus:** TechVault Developer Single Sign-On (SSO) & Account Authentication.
- **Detailed Features:**
  - Controlled inputs (`value` bound to `useState`).
  - Client-side validation: verifies work email format and minimum 6-character password.
  - Role switcher tabs: `💻 Developer`, `🏢 Enterprise Buyer`, `🛡️ Admin`.
  - Password reveal toggle button.
  - Asynchronous authentication latency simulation (spinner state).
  - Conditional rendering: transitions from login card to Developer Command Center dashboard with active order status, API keys, and session termination button.
  - Quick test profile buttons for 1-click test credential population.
- **How to Execute:**
  ```bash
  cd Expt-04-React-Login-Form
  google-chrome index.html
  ```
- **Testing & Verification:**
  1. Click `"Dev"` test profile button $\rightarrow$ populates demo credentials (`somnath.dev@techvault.io`).
  2. Click `"Authorize & Sign In"` $\rightarrow$ shows *"Verifying RSA Credentials..."* then opens Developer Command Center.
  3. Click `"Terminate Session"` $\rightarrow$ resets state back to login form.

---

### 🔹 Experiment 05: Connecting React.js Project with MongoDB
- **Directory:** [`Expt-05-React-MongoDB-Connect`](./Expt-05-React-MongoDB-Connect)
- **Domain Focus:** TechVault Hardware Inventory & Order Dispatch Synchronization.
- **Detailed Features:**
  - Express.js backend with Mongoose ODM schema for hardware orders (`server.js`).
  - Resilient design: auto-connects to MongoDB (`mongodb://127.0.0.1:27017/techvault_db`), with an automatic In-Memory fallback store if local MongoDB is offline, including live status indicator.
  - Full REST API:
    - `GET /api/status`: Health check & active storage engine.
    - `GET /api/orders`: Query orders list.
    - `POST /api/orders`: Create new hardware dispatch order.
    - `DELETE /api/orders/:id`: Cancel order by MongoDB ID.
  - React.js frontend (`public/index.html`) communicating via `fetch()`.
- **How to Execute:**
  ```bash
  cd Expt-05-React-MongoDB-Connect
  npm install
  node server.js
  # Or with custom port:
  PORT=5001 node server.js
  ```
- **Testing & Verification:**
  1. Open `http://localhost:5001` in your browser.
  2. Check the Database Status Pill: `🟢 Engine: MongoDB` or `🟡 Engine: In-Memory Resilient Store`.
  3. Enter customer name, select hardware, set quantity, and submit $\rightarrow$ order instantly appears in active dispatches table.
  4. Click `"Cancel"` on any row $\rightarrow$ order is deleted from database and removed from UI.

---

### 🔹 Experiment 06: Design a Web Page using Node.js (Pure Core Modules)
- **Directory:** [`Expt-06-NodeJS-WebPage`](./Expt-06-NodeJS-WebPage)
- **Domain Focus:** TechVault Core Hardware Web Server.
- **Detailed Features:**
  - Built strictly using native Node.js core modules: `http`, `url`, `os`, `path`, with zero external npm dependencies.
  - Native HTTP request routing: `/`, `/about`, `/quote`, `/api/status`.
  - Stream chunk parsing for POST body: `req.on('data')`, `req.on('end')`.
  - Dynamic server diagnostics injected via `os.freemem()`, `os.totalmem()`, `process.uptime()`.
  - Custom 404 Not Found error page.
- **How to Execute:**
  ```bash
  cd Expt-06-NodeJS-WebPage
  node server.js
  # If port 3001 is occupied, specify custom port:
  PORT=3556 node server.js
  ```
- **Testing & Verification:**
  1. Open `http://localhost:3556` in your browser.
  2. View Real-Time Server Diagnostics card (Node runtime, memory, uptime).
  3. Submit the Instant Hardware Quote form $\rightarrow$ Node processes the stream chunks, calculates total estimate, and renders an official procurement sheet (`TV-QUOTE-XXXXXX`).
  4. Test JSON metrics endpoint via terminal:
     ```bash
     curl -s http://localhost:3556/api/status
     ```

---

### 🔹 Experiment 07: Design a Form Using Express.js in Node.js
- **Directory:** [`Expt-07-ExpressJS-Form`](./Expt-07-ExpressJS-Form)
- **Domain Focus:** TechVault Custom PC Build & Rig Configurator with Server-Side Validation.
- **Detailed Features:**
  - Express.js middleware: `express.urlencoded({ extended: true })`, `express.json()`.
  - Custom request logger middleware.
  - Server-side validation: verifies developer name, 10-digit mobile number (`/^[6-9]\d{9}$/`), email format, shipping city, and mandatory CPU/GPU selection.
  - Dynamic pricing engine calculating total rig price based on selected CPU, GPU, RAM, cooling, and chassis.
  - Form re-rendering on validation error: highlights invalid fields with red borders and preserves previously entered data.
  - Official TechVault Build Specification Sheet generation with unique order reference (`TV-RIG-XXXXXX`).
- **How to Execute:**
  ```bash
  cd Expt-07-ExpressJS-Form
  npm install
  node server.js
  # Or with custom port:
  PORT=4001 node server.js
  ```
- **Testing & Verification:**
  1. Open `http://localhost:4001` in your browser.
  2. Leave fields blank and submit $\rightarrow$ page returns `HTTP 400` with an itemized error summary banner.
  3. Enter valid developer info, choose Ryzen 9 7950X + RTX 4090 $\rightarrow$ page returns `HTTP 200` with an official Rig Specification Sheet with calculated price.
  4. View JSON order log at `http://localhost:4001/api/builds`.

---

### 🔹 Experiment 08: Integration of Third-Party Services (Email, SMS, Payment)
- **Directory:** [`Expt-08-ThirdParty-Services`](./Expt-08-ThirdParty-Services)
- **Domain Focus:** TechVault E-Commerce Checkout Gateways.
- **Detailed Features:**
  - **Email Service (Nodemailer):** Auto-configures an Ethereal cloud SMTP test account. Dispatches an official HTML hardware invoice & 3-year warranty certificate with a live clickable preview URL (`nodemailer.getTestMessageUrl(info)`)!
  - **SMS Gateway (Twilio Protocol):** Simulates two-factor courier delivery OTP generation (6 digits) and sends cellular dispatch notifications with tracking codes and message SIDs.
  - **Payment Gateway (Razorpay/Stripe):** Creates checkout orders, validates transactions, and generates signed digital payment receipts.
  - Unified testing dashboard in `public/index.html` with real-time JSON transaction logging terminal.
- **How to Execute:**
  ```bash
  cd Expt-08-ThirdParty-Services
  npm install
  node server.js
  # Or with custom port:
  PORT=8001 node server.js
  ```
- **Testing & Verification:**
  1. Open `http://localhost:8001` in your browser.
  2. Click `"Dispatch Hardware Invoice"` $\rightarrow$ wait 1 second $\rightarrow$ click the generated preview link to view the rendered HTML invoice in Ethereal's web viewer.
  3. Click `"Dispatch Delivery OTP Alert"` $\rightarrow$ view generated OTP and message SID in real time.
  4. Click `"Execute Payment Checkout"` $\rightarrow$ creates order and captures payment.
  5. Check the Real-Time Gateway Transaction Logs terminal at the bottom of the dashboard.

---

### 🔹 Experiment 09: Hosting Website with Domain Registration Process
- **Directory:** [`Expt-09-Hosting-Domain-Process`](./Expt-09-Hosting-Domain-Process)
- **Domain Focus:** TechVault Production Cloud Deployment & DNS Architecture (`techvault-store.io`).
- **Detailed Features:**
  - Authoritative DNS zone table: A, CNAME, MX, TXT (SPF), NS records.
  - Production cloud deployment manifests:
    - `vercel.json`: Clean URLs, route rewrites, security headers.
    - `netlify.toml`: Build command and SPA redirect rules.
  - 5-step comprehensive domain registration and cloud edge deployment manual.
  - Interactive DNS propagation query simulator in `public/index.html` (simulates `dig` and `nslookup` output).
- **How to Execute:**
  ```bash
  cd Expt-09-Hosting-Domain-Process
  google-chrome public/index.html
  # Or run lightweight server:
  npx serve public
  ```
- **Testing & Verification:**
  1. Select record type (e.g. `A Record`, `CNAME Record`, `MX Record`) and click `"Run DNS Query"`.
  2. Inspect the simulated `dig` output displaying Anycast IP `76.76.21.21` and DNS propagation confirmation.

---

### 🔹 Experiment 10: Integration of SSL Certificate in Web Application
- **Directory:** [`Expt-10-SSL-Certificate`](./Expt-10-SSL-Certificate)
- **Domain Focus:** Cryptographic Security via Node.js HTTPS Server & Nginx Reverse Proxy.
- **Detailed Features:**
  - Automated OpenSSL script (`generate-ssl.sh`): Generates 2048-bit RSA private key (`server-key.pem`) and X.509 certificate (`server-cert.pem`) with Subject Alternative Names (`localhost`, `techvault-store.local`, `127.0.0.1`).
  - Node.js HTTPS server (`server-https.js`) listening on Port 9443 enforcing TLS 1.2+ and TLS 1.3 ciphers.
  - Automated HTTP-to-HTTPS 301 redirection server listening on Port 9090.
  - Enterprise security headers: HSTS (`max-age=31536000`), `X-Content-Type-Options: nosniff`, `X-Frame-Options: SAMEORIGIN`.
  - Production `nginx-ssl.conf` reverse proxy configuration template.
- **How to Execute:**
  ```bash
  cd Expt-10-SSL-Certificate
  # Step 1: Generate certificates (already generated, or re-run):
  bash generate-ssl.sh
  # Step 2: Install Express
  npm install
  # Step 3: Start HTTPS server & HTTP redirector
  node server-https.js
  ```
- **Testing & Verification:**
  1. Open browser to `https://localhost:9443` (click Advanced $\rightarrow$ Proceed to localhost to accept self-signed dev certificate).
  2. Inspect the live TLS handshake telemetry box (negotiated cipher: `TLS_AES_256_GCM_SHA384`, RSA 2048-bit).
  3. Test HTTP to HTTPS 301 redirection in terminal:
     ```bash
     curl -I http://localhost:9090/
     # Returns: HTTP/1.1 301 Moved Permanently -> Location: https://localhost:9443/
     ```
  4. Test encrypted HTTPS endpoint via `curl`:
     ```bash
     curl -kv https://localhost:9443/api/ssl-info
     ```

---

## 💡 Troubleshooting & FAQs

- **Port Conflict (`EADDRINUSE`)**:
  If a port is already taken by another process on your machine, simply pass an environment variable when starting the server:
  ```bash
  PORT=6002 node server.js
  ```
- **Self-Signed Certificate Warning in Chrome**:
  Since the SSL certificate in Experiment 10 is self-signed for laboratory testing, Chrome displays a warning. Click **"Advanced"** and then **"Proceed to localhost (unsafe)"**.
- **MongoDB Connection Offline**:
  In Experiment 5, if your computer does not have a local MongoDB daemon running, the application gracefully activates its built-in in-memory fallback store so all CRUD operations continue to function without crashing.

---

## 🏫 Academic Credentials
- **Course:** Skill Based Lab - Advanced Web Technology (SBL - AWT)
- **Student:** Somnath Jha (Roll No: `25CE1050`)
- **Institution:** Ramrao Adik Institute of Technology (RAIT), D Y Patil Deemed to be University
- **Academic Year:** 2026 – 2027
