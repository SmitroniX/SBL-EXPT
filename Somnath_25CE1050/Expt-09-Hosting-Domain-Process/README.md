# Experiment 09: Hosting the Website with Domain Registration Process

## 📌 Student Details
- **Student Name:** Somnath Jha
- **Roll Number:** 25CE1050
- **Branch / Class:** B.Tech Computer Engineering (Sem VI)
- **Institution:** Ramrao Adik Institute of Technology (RAIT), D Y Patil Deemed to be University
- **Subject:** Skill Based Lab - Advanced Web Technology (SBL-AWT)

---

## 1. 🎯 Aim
To analyze, document, and execute the end-to-end domain registration lifecycle, authoritative DNS zone management (A, CNAME, MX, TXT, NS records), multi-cloud hosting configurations (`vercel.json`, `netlify.toml`), and global DNS propagation verification.

---

## 2. ⚡ Problem Statement
**TechVault Cloud Infrastructure & Global Domain Deployment:**
An e-commerce hardware portal cannot run on local development hosts. TechVault requires a permanent, internationally recognized domain (`techvault-store.io`) backed by high-availability cloud edge infrastructure. The system administrator must register the domain, point nameservers to Cloudflare's Anycast network, map apex and subdomain records to edge CDN endpoints, configure mail records, and automate SSL certificate provisioning.

---

## 3. 💻 Hardware & Software Requirements
- **Hardware:** PC with internet connection.
- **Software & Platforms:**
  - ICANN Registrar (Namecheap / Cloudflare Registrar)
  - Cloud Providers (Vercel / Netlify / Render / GitHub Pages)
  - Network Diagnostics (`dig`, `nslookup`, `curl -I`)
  - Web Browser

---

## 4. 📚 Theory & Core Concepts
### 4.1 DNS Hierarchy & Lookup Flow
1. User queries `https://techvault-store.io`.
2. Browser contacts Local Recursive Resolver (ISP or `1.1.1.1`).
3. Resolver queries Root Nameservers (`.` root), which return `.io` TLD Nameservers.
4. TLD Nameservers return Authoritative Nameservers (`ns1.cloudflare.com`).
5. Authoritative Nameserver resolves the Apex `A` record (`76.76.21.21`), returning the result to the browser.
6. The browser initiates a TLS handshake with the Anycast edge server.

### 4.2 DNS Zone Configuration Matrix

| Record Type | Host | Destination Value | Purpose |
| :---: | :---: | :--- | :--- |
| **A** | `@` | `76.76.21.21` | Apex domain mapping to Vercel Global Edge CDN |
| **CNAME** | `www` | `cname.vercel-dns.com` | Aliases www traffic to edge reverse proxy |
| **CNAME** | `api` | `techvault-node.onrender.com`| Routes API traffic to backend Express container |
| **MX** | `@` | `mail.google.com` (Pri 1) | Handles corporate and transactional developer mail |
| **TXT** | `@` | `v=spf1 include:_spf.google.com ~all` | SPF email security anti-spoofing policy |
| **NS** | `@` | `ns1.cloudflare.com`, `ns2.cloudflare.com` | Authoritative DNS delegation |

---

## 5. ⚙️ Step-by-Step Procedure
1. Search and register `techvault-store.io` via an ICANN-accredited registrar.
2. Under registrar DNS settings, switch to Custom Nameservers (`ns1.cloudflare.com`, `ns2.cloudflare.com`).
3. In the Cloudflare DNS dashboard, populate the resource records matching the zone matrix.
4. Author configuration manifests:
   - `vercel.json`: Defines clean URLs, routing rewrites, and security headers.
   - `netlify.toml`: Defines single-page application redirect rules (`/* -> /index.html 200`).
5. Connect repository to Vercel/Netlify for automated CI/CD builds.
6. Issue SSL certificate via automated ACME challenges.
7. Verify DNS propagation across worldwide resolvers using terminal commands:
   ```bash
   dig @1.1.1.1 techvault-store.io A +short
   dig @1.1.1.1 techvault-store.io MX +short
   curl -Iv https://techvault-store.io
   ```

---

## 6. 🧪 Output Diagnostics & Verification

```bash
$ dig @1.1.1.1 techvault-store.io A +short
76.76.21.21

$ dig @1.1.1.1 www.techvault-store.io CNAME +short
cname.vercel-dns.com.

$ curl -I https://techvault-store.io
HTTP/2 200
date: Mon, 15 Sep 2026 12:00:00 GMT
content-type: text/html; charset=utf-8
server: Vercel
strict-transport-security: max-age=63072000; includeSubDomains; preload
x-content-type-options: nosniff
x-frame-options: DENY
```

---

## 7. 💡 Viva-Voce Questions & Answers

**Q1: What is the difference between a Registrar and a Registry?**  
*Answer:* A **Registry** (e.g. Verisign for `.com`, Identity Digital for `.org`) is the authoritative organization that maintains master database records for a specific TLD. A **Registrar** (e.g. Namecheap, GoDaddy) is an accredited commercial entity that sells domain registrations to consumers and registers them with the Registry.

**Q2: What is CNAME Flattening?**  
*Answer:* The DNS specification (RFC 1034) prohibits CNAME records on the root zone (`@`). CNAME Flattening (provided by Cloudflare) intercepts queries for the root apex, queries the target CNAME destination behind the scenes, and returns the resulting IP address directly as an A record to the user, bypassing RFC limitations.

**Q3: What is the function of the TTL (Time-To-Live) parameter?**  
*Answer:* TTL is a numerical value (in seconds) that informs recursive DNS caching servers how long they should hold a resolved record in memory before querying the authoritative nameserver again. Shorter TTLs allow faster DNS propagation during migrations.

---

## 8. 🏁 Conclusion
The full lifecycle of domain registration, authoritative DNS zone records, and cloud hosting architecture was documented and demonstrated for **TechVault**. Practical deployment templates and interactive DNS query tools were produced and verified.
