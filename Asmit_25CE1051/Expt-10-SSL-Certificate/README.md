# Experiment 10: Integration of SSL Certificate in Web Application

## 📌 Student Details
- **Student Name:** Asmit Jogdand
- **Roll Number:** 25CE1051
- **Branch / Class:** B.Tech Computer Engineering (Sem VI)
- **Institution:** Ramrao Adik Institute of Technology (RAIT), D Y Patil Deemed to be University
- **Subject:** Skill Based Lab - Advanced Web Technology (SBL-AWT)

---

## 1. 🎯 Aim
To study the cryptographic principles of Public Key Infrastructure (PKI), generate a 2048-bit RSA X.509 SSL/TLS digital certificate using **OpenSSL**, implement an encrypted **HTTPS server** in **Node.js**, configure automated HTTP-to-HTTPS (Port 80 $\rightarrow$ 443) 301 redirection, apply HSTS security headers, and author an enterprise **Nginx Reverse Proxy SSL configuration**.

---

## 2. 🏥 Problem Statement
**HealthPulse HIPAA-Compliant Data In-Transit Encryption:**
Under healthcare regulations (HIPAA / GDPR), transmitting unencrypted Electronic Health Records (EHR) over plain HTTP (Port 80) exposes sensitive patient vitals, diagnosis notes, and authentication tokens to packet sniffing, Man-in-the-Middle (MitM) attacks, and eavesdropping. HealthPulse must enforce end-to-end transport layer security (TLS 1.2 / TLS 1.3), terminate SSL on dedicated secure ports (8443 / 443), and force all insecure requests to redirect permanently to encrypted endpoints.

---

## 3. 💻 Hardware & Software Requirements
- **Hardware:** PC with 4 GB RAM minimum.
- **Software:**
  - OpenSSL (v3.0+)
  - Node.js (v18+) & Express.js
  - Web Browser & `curl` CLI
  - Nginx (Optional for production proxy demonstration)

---

## 4. 📚 Theory & Core Architecture
### 4.1 Public Key Infrastructure (PKI) & Asymmetric Cryptography
Transport Layer Security (TLS) combines asymmetric cryptography (for authentication and session key exchange) with symmetric cryptography (for fast high-throughput data transmission):
1. **Private Key (`server-key.pem`):** Kept strictly secret on the server; decrypts data and signs certificates.
2. **Public Certificate (`server-cert.pem`):** Shared openly with connecting clients; contains public key, domain identity (Common Name & SANs), issuing Certificate Authority (CA) signature, and validity dates.

### 4.2 TLS 1.3 Handshake Mechanism
1. **ClientHello:** Client transmits supported TLS versions (TLS 1.3), cipher suites, and a client random value with key-share parameters.
2. **ServerHello & Certificate:** Server selects cipher suite, transmits its digital certificate (`server-cert.pem`), and completes Diffie-Hellman key exchange.
3. **Session Key Derivation:** Both parties independently compute identical symmetric encryption keys.
4. **Encrypted Communication:** All subsequent application HTTP data is encrypted using high-performance symmetric algorithms like AES-GCM or ChaCha20-Poly1305.

```
Client                                                  Server
  |                                                       |
  | -------- ClientHello (TLS 1.3, Cipher Suites) ------> |
  | <------- ServerHello + Certificate + Key Exchange --- |
  |                                                       |
  | [ Both derive symmetric session key: AES-256-GCM ]     |
  |                                                       |
  | <====== Bidirectional Encrypted HTTPS Traffic ======> |
```

### 4.3 Security Headers Configured
- **HSTS (`Strict-Transport-Security`):** Tells browsers never to connect over insecure HTTP for the specified duration (`max-age=31536000`), blocking SSL-stripping attacks.
- **`X-Content-Type-Options: nosniff`**: Prevents browsers from MIME-sniffing away from the declared content-type.
- **`X-Frame-Options: SAMEORIGIN`**: Prevents clickjacking by prohibiting unauthorized cross-origin framing.

---

## 5. ⚙️ Algorithm / Procedure
1. Create OpenSSL configuration file (`san.cnf`) specifying Subject Alternative Names (`DNS:localhost`, `DNS:healthpulse-care.local`, `IP:127.0.0.1`).
2. Run OpenSSL to generate 2048-bit RSA private key and self-signed X.509 certificate:
   ```bash
   openssl req -x509 -nodes -days 365 -newkey rsa:2048 -keyout server-key.pem -out server-cert.pem -config san.cnf
   ```
3. In Node.js, load certificates using `fs.readFileSync()`.
4. Define SSL options:
   ```javascript
   const sslOptions = {
       key: fs.readFileSync('server-key.pem'),
       cert: fs.readFileSync('server-cert.pem'),
       minVersion: 'TLSv1.2'
   };
   ```
5. Create HTTPS server via `https.createServer(sslOptions, app)`.
6. Create auxiliary HTTP server listening on Port 8080 that returns `HTTP 301 Moved Permanently` redirecting all requests to `https://localhost:8443/`.
7. Author production Nginx reverse proxy configuration (`nginx-ssl.conf`) demonstrating SSL termination, OCSP stapling, and backend proxying.
8. Validate TLS handshake parameters and cipher negotiation using `curl` and OpenSSL `s_client`.

---

## 6. 🧪 Test Cases & Cryptographic Verification

| Test Scenario | Command / Action | Expected Result | Status |
| :--- | :--- | :--- | :---: |
| Certificate Generation | `bash generate-ssl.sh` | Generates valid `server-key.pem` and `server-cert.pem` | Passed |
| Insecure HTTP Access | `curl -I http://localhost:8080/` | `HTTP/1.1 301 Moved Permanently` $\rightarrow$ `https://...:8443` | Passed |
| HTTPS Handshake | `curl -k https://localhost:8443/` | `HTTP/1.1 200 OK` over TLS encrypted socket | Passed |
| HSTS Header Check | Inspect response headers | `Strict-Transport-Security: max-age=31536000; ...` present | Passed |
| Cipher Negotiation | Inspect `/api/ssl-info` | Verified `TLSv1.3` / `TLS_AES_256_GCM_SHA384` | Passed |

---

## 7. 📸 How to Run
1. Navigate to the directory:
   ```bash
   cd /home/ubuntu/SBL-EXPT/Asmit_25CE1051/Expt-10-SSL-Certificate
   ```
2. Generate SSL certificates:
   ```bash
   bash generate-ssl.sh
   ```
3. Install dependencies:
   ```bash
   npm install
   ```
4. Start the dual HTTPS + HTTP redirect server:
   ```bash
   node server-https.js
   ```
5. Open your browser to:
   ```
   https://localhost:8443
   ```
   *(Note: For self-signed certificates, click "Advanced" $\rightarrow$ "Proceed to localhost (unsafe)" to view the secure dashboard).*

6. Test from terminal:
   ```bash
   curl -kv https://localhost:8443/api/ssl-info
   ```

---

## 8. 💡 Viva-Voce Questions & Answers

**Q1: What is the difference between Symmetric and Asymmetric Encryption?**  
*Answer:* Symmetric encryption uses the single identical shared secret key for both encryption and decryption (e.g. AES), making it very fast. Asymmetric encryption uses a mathematically linked key pair: a public key for encryption and a private key for decryption (e.g. RSA, ECC), primarily used during the initial TLS handshake to securely negotiate the symmetric session key.

**Q2: What is the purpose of Subject Alternative Name (SAN) in modern SSL certificates?**  
*Answer:* Common Name (CN) is deprecated in modern browsers. The Subject Alternative Name (SAN) extension allows a single certificate to secure multiple domain names, subdomains, and IP addresses (e.g. `localhost`, `healthpulse-care.org`, `127.0.0.1`), ensuring modern browsers do not flag domain mismatch errors.

**Q3: How does Let's Encrypt / Certbot automate certificate issuance?**  
*Answer:* Let's Encrypt utilizes the **ACME (Automated Certificate Management Environment)** protocol. The Certbot client automatically proves domain control by solving an `HTTP-01` challenge (placing a cryptographic token at `/.well-known/acme-challenge/`) or `DNS-01` challenge (adding a TXT record), retrieves the signed certificate from the CA, and reloads Nginx/Apache automatically without manual intervention.

**Q4: What is SSL Stripping and how does HSTS protect against it?**  
*Answer:* In SSL stripping, an attacker intercepting unencrypted HTTP traffic downgrades secure HTTPS links to plain HTTP before forwarding to the user. HTTP Strict Transport Security (HSTS) prevents this by instructing the user's browser to refuse all unencrypted HTTP connections to the domain, converting all `http://` URLs into `https://` internally before sending any network request.

---

## 9. 🏁 Conclusion
An enterprise-grade SSL/TLS certificate integration was established for **HealthPulse**. Self-signed X.509 certificates with SAN extensions were generated using OpenSSL, an HTTPS server with TLS 1.3 cipher negotiation and HSTS headers was deployed in Node.js, automated HTTP-to-HTTPS 301 redirection was verified, and an Nginx reverse proxy configuration was produced.
