# Experiment 10: Integration of SSL Certificate in Web Application

## 📌 Student Details
- **Student Name:** Somnath Jha
- **Roll Number:** 25CE1050
- **Branch / Class:** B.Tech Computer Engineering (Sem VI)
- **Institution:** Ramrao Adik Institute of Technology (RAIT), D Y Patil Deemed to be University
- **Subject:** Skill Based Lab - Advanced Web Technology (SBL-AWT)

---

## 1. 🎯 Aim
To examine the cryptographic foundations of Public Key Infrastructure (PKI), generate 2048-bit RSA X.509 digital certificates with Subject Alternative Names using **OpenSSL**, implement a secure **HTTPS server** in **Node.js**, configure automated HTTP-to-HTTPS (Port 80 $\rightarrow$ 443) 301 redirection, apply HSTS headers, and author a production **Nginx Reverse Proxy SSL configuration**.

---

## 2. ⚡ Problem Statement
**TechVault E-Commerce Financial Data & Credential Protection:**
Hardware procurement stores process substantial financial transactions and confidential developer credentials. Transmitting these payloads over unencrypted HTTP (Port 80) exposes sensitive payment credentials and authentication tokens to packet interception, packet sniffing, and Man-in-the-Middle (MitM) exploits. TechVault must enforce end-to-end transport layer encryption (TLS 1.2 / TLS 1.3), terminate SSL on secure ports (9443 / 443), and force all insecure requests to redirect permanently to encrypted endpoints.

---

## 3. 💻 Hardware & Software Requirements
- **Hardware:** PC with 4 GB RAM minimum.
- **Software:**
  - OpenSSL (v3.0+)
  - Node.js (v18+) & Express.js
  - Web Browser & `curl` CLI
  - Nginx (Optional for production proxy demonstration)

---

## 4. 📚 Theory & Cryptographic Architecture
### 4.1 Transport Layer Security (TLS 1.3) Handshake
1. **ClientHello:** User transmits supported TLS versions and cipher suites (`TLS_AES_256_GCM_SHA384`) with Diffie-Hellman public key shares.
2. **ServerHello & Certificate Verification:** Server responds with `server-cert.pem` and its key share.
3. **Session Secret Derivation:** Both parties independently calculate the symmetric key without ever transmitting it over the wire.
4. **Symmetric Encryption:** Full application communication proceeds under high-speed AES-256-GCM encryption.

### 4.2 Security Headers Implemented
- `Strict-Transport-Security: max-age=31536000; includeSubDomains; preload` (HSTS)
- `X-Content-Type-Options: nosniff`
- `X-Frame-Options: SAMEORIGIN`

---

## 5. ⚙️ Algorithm / Procedure
1. Create `san.cnf` containing Subject Alternative Names (`DNS:localhost`, `DNS:techvault-store.local`, `IP:127.0.0.1`).
2. Run OpenSSL to generate 2048-bit RSA key and self-signed certificate:
   ```bash
   openssl req -x509 -nodes -days 365 -newkey rsa:2048 -keyout server-key.pem -out server-cert.pem -config san.cnf
   ```
3. Load certificates into Node.js HTTPS server:
   ```javascript
   const sslOptions = {
       key: fs.readFileSync('server-key.pem'),
       cert: fs.readFileSync('server-cert.pem'),
       minVersion: 'TLSv1.2'
   };
   https.createServer(sslOptions, app).listen(9443);
   ```
4. Create HTTP server on Port 9090 returning `HTTP 301 Moved Permanently` redirecting to `https://localhost:9443/`.
5. Author `nginx-ssl.conf` demonstrating SSL termination, cipher restriction, and reverse proxying.
6. Validate TLS handshake parameters using `curl -kv`.

---

## 6. 🧪 Test Cases & Results

| Test Scenario | Action / Command | Expected Output | Status |
| :--- | :--- | :--- | :---: |
| Key Generation | `bash generate-ssl.sh` | Emits `server-key.pem` and `server-cert.pem` | Passed |
| Insecure HTTP Access | `curl -I http://localhost:9090/` | `HTTP/1.1 301 Moved Permanently` $\rightarrow$ `https://...:9443` | Passed |
| Secure HTTPS Access | `curl -k https://localhost:9443/` | `HTTP/1.1 200 OK` over TLS socket | Passed |
| HSTS Header Check | Inspect response headers | `Strict-Transport-Security: max-age=31536000` verified | Passed |
| Cipher Telemetry | Inspect `/api/ssl-info` | Verified `TLSv1.3` / `TLS_AES_256_GCM_SHA384` | Passed |

---

## 7. 📸 How to Run
```bash
cd /home/ubuntu/SBL-EXPT/Somnath_25CE1050/Expt-10-SSL-Certificate
bash generate-ssl.sh
npm install
node server-https.js
# Access in browser: https://localhost:9443
# Test terminal: curl -kv https://localhost:9443/api/ssl-info
```

---

## 8. 💡 Viva-Voce Questions & Answers

**Q1: What is the vulnerability associated with HTTP traffic in e-commerce?**  
*Answer:* HTTP transmits data in cleartext. Any intermediary along the network route (e.g. public Wi-Fi routers, malicious ISPs) can capture credit card numbers, passwords, and session cookies via packet sniffing tools (e.g. Wireshark).

**Q2: What is Perfect Forward Secrecy (PFS)?**  
*Answer:* PFS ensures that even if a server's long-term private key is compromised in the future, past recorded encrypted communications cannot be decrypted, because ephemeral Diffie-Hellman keys generated for individual sessions are immediately discarded after the session terminates.

**Q3: What is the purpose of OCSP Stapling?**  
*Answer:* In standard certificate revocation checking, the client queries the Certificate Authority's OCSP server, causing connection delay and privacy concerns. With OCSP Stapling, the web server periodically queries the OCSP server itself and "staples" the time-stamped digital proof to the SSL handshake, reducing client latency.

---

## 9. 🏁 Conclusion
An enterprise SSL/TLS certificate integration was completed for **TechVault**. X.509 RSA certificates with SAN extensions were generated, a secure Node.js HTTPS server with HSTS and TLS 1.3 was deployed, automated HTTP-to-HTTPS 301 redirection was verified, and an Nginx reverse proxy configuration was produced.
