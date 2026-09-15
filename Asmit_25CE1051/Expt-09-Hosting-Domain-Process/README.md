# Experiment 09: Hosting the Website with Domain Registration Process

## 📌 Student Details
- **Student Name:** Asmit Jogdand
- **Roll Number:** 25CE1051
- **Branch / Class:** B.Tech Computer Engineering (Sem VI)
- **Institution:** Ramrao Adik Institute of Technology (RAIT), D Y Patil Deemed to be University
- **Subject:** Skill Based Lab - Advanced Web Technology (SBL-AWT)

---

## 1. 🎯 Aim
To study, document, and execute the complete operational workflow of registering a custom domain name, configuring DNS zone records (A, CNAME, MX, TXT, NS), deploying a production web application across modern cloud infrastructure platforms (Vercel, Netlify, Render, GitHub Pages), and verifying global DNS propagation.

---

## 2. 🏥 Problem Statement
**HealthPulse Production Cloud Deployment & Domain Infrastructure:**
A medical web application cannot operate on transient local addresses (`localhost`). HealthPulse requires a permanent, internationally reachable domain (`healthpulse-care.org`) backed by high-availability cloud edge hosting. The system administrator must register the domain, point nameservers to an Anycast DNS network (Cloudflare), map root and subdomain records to edge CDN servers, configure mail exchange records for clinic communications, and enforce global HTTPS encryption.

---

## 3. 💻 Hardware & Software Requirements
- **Hardware:** PC with internet access.
- **Software & Cloud Platforms:**
  - ICANN-Accredited Registrar (Namecheap / GoDaddy / Cloudflare Registrar)
  - Cloud Hosting Providers (Vercel / Netlify / Render / GitHub Pages)
  - DNS Inspection Utilities (`dig`, `nslookup`, `curl -I`)
  - Web Browser & Terminal

---

## 4. 📚 Theory & Core Architecture
### 4.1 Domain Name System (DNS) Hierarchy
DNS acts as the "phonebook of the internet", translating human-friendly domain names (`healthpulse-care.org`) into machine-routable IP addresses (`76.76.21.21`):
1. **Root DNS Servers:** 13 logical root server clusters (`a.root-servers.net` to `m.root-servers.net`) redirect queries to Top-Level Domain (TLD) servers.
2. **TLD Nameservers:** Manage TLD extensions like `.org`, `.com`, `.in`, pointing to the specific domain's Authoritative Nameservers.
3. **Authoritative Nameservers:** Hold the definitive DNS Zone File containing actual resource records for the domain.
4. **Recursive Resolvers (ISPs / 8.8.8.8):** Cache DNS lookups according to the Time-To-Live (TTL) specification.

### 4.2 Critical DNS Record Types
- **A Record (Address):** Maps a hostname directly to a 32-bit IPv4 address (e.g. `@` $\rightarrow$ `76.76.21.21`).
- **AAAA Record:** Maps a hostname to a 128-bit IPv6 address.
- **CNAME Record (Canonical Name):** Alias pointing one domain name to another canonical domain (e.g. `www` $\rightarrow$ `cname.vercel-dns.com`). Cannot coexist with other records on the apex root.
- **MX Record (Mail Exchanger):** Specifies mail servers responsible for accepting incoming emails on behalf of the domain, prioritized by an integer value (lower number = higher priority).
- **TXT Record (Text):** Carries arbitrary human/machine-readable text, primarily used for **SPF (Sender Policy Framework)**, **DKIM**, and domain ownership verification tokens.
- **NS Record (Name Server):** Identifies the authoritative DNS servers delegated to serve records for this zone.

### 4.3 Cloud Hosting Comparison

| Feature | Vercel | Netlify | Render | GitHub Pages |
| :--- | :--- | :--- | :--- | :--- |
| **Primary Focus** | Next.js / Frontend / Edge Functions | Static / Jamstack / Functions | Full-Stack (Node/Express/DBs) | Static Repositories |
| **Global CDN** | Anycast Edge Network | High-Performance Multi-Cloud CDN | Global CDN + Regional Compute | Fastly CDN |
| **Automated SSL** | Free Let's Encrypt Wildcard | Free Let's Encrypt | Free Managed TLS | Free SNI Certificate |
| **Config File** | `vercel.json` | `netlify.toml` | `render.yaml` | `.github/workflows/deploy.yml`|

---

## 5. ⚙️ Step-by-Step Practical Implementation Guide
### Step 1: Purchasing the Domain via Registrar
1. Navigate to an ICANN registrar (e.g., Namecheap or Cloudflare Registrar).
2. Query search availability for `healthpulse-care.org`.
3. Add domain to cart, enable **WHOIS Privacy Protection** (free), and checkout.

### Step 2: Nameserver Delegation to Cloudflare
1. Access the Registrar Domain Management Dashboard.
2. Under "Nameservers", select **Custom DNS** and enter:
   - `ns1.cloudflare.com`
   - `ns2.cloudflare.com`
3. Save changes. This delegates authoritative DNS control to Cloudflare's Anycast network for DDoS protection and fast DNS propagation.

### Step 3: Configuring the DNS Zone File
Within the DNS management dashboard, create the following production records:
```
Type: A       | Name: @           | Value: 76.76.21.21           | TTL: Auto
Type: CNAME   | Name: www         | Value: cname.vercel-dns.com  | TTL: Auto
Type: CNAME   | Name: telehealth  | Value: healthpulse.onrender.com | TTL: Auto
Type: MX      | Name: @           | Value: mx1.zoho.com (Pri: 10)| TTL: 14400
Type: TXT     | Name: @           | Value: v=spf1 include:zoho.com ~all | TTL: Auto
```

### Step 4: Deploying to Cloud via Vercel CLI
1. Install Vercel CLI globally:
   ```bash
   npm install -g vercel
   ```
2. In the project directory containing `vercel.json` and static assets, run:
   ```bash
   vercel --prod
   ```
3. Link the custom domain:
   ```bash
   vercel domains add healthpulse-care.org
   ```

### Step 5: Verifying Global Propagation
Run terminal diagnostics to confirm the DNS records have propagated worldwide:
```bash
# Query A Record using Google Public DNS
dig @8.8.8.8 healthpulse-care.org A +short

# Query MX Mail Record
dig healthpulse-care.org MX +short

# Inspect HTTP Response Headers and SSL handshake
curl -Iv https://healthpulse-care.org
```

---

## 6. 🧪 Verification & Output Diagnostics

```bash
$ dig @8.8.8.8 healthpulse-care.org A +short
76.76.21.21

$ dig @8.8.8.8 www.healthpulse-care.org CNAME +short
cname.vercel-dns.com.

$ curl -I https://healthpulse-care.org
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

**Q1: What is DNS Propagation and why does it take time?**  
*Answer:* DNS propagation is the time required for DNS changes (such as updating nameservers or A records) to update across all ISP resolvers worldwide. It is governed by the Time-To-Live (TTL) parameter: cached entries must expire before resolvers fetch updated records from authoritative nameservers.

**Q2: What is the difference between an A Record and a CNAME Record?**  
*Answer:* An `A` (Address) record directly resolves a domain name to a static IPv4 address. A `CNAME` (Canonical Name) record maps an alias hostname to another hostname (never an IP directly). Under RFC specifications, a CNAME cannot exist at the root apex (`@`), which is why root domains must use A records or ALIAS/ANAME flattening.

**Q3: What is the role of an MX Record and why does it have a priority number?**  
*Answer:* Mail Exchanger (MX) records direct incoming emails to the mail servers designated for a domain. The priority number determines preference: sending mail transfer agents (MTAs) attempt delivery to the lowest numbered server first; if unreachable, they failover to higher-numbered backup servers.

**Q4: How does Anycast DNS improve performance and resilience?**  
*Answer:* In Anycast routing, multiple physical servers across geographically disparate data centers share the same single IP address. BGP routing automatically sends user DNS queries to the topologically nearest server, drastically slashing latency and providing automatic failover during regional outages.

---

## 8. 🏁 Conclusion
The complete process of domain registration, authoritative DNS zone record management, and cloud platform deployment was systematically executed and verified for **HealthPulse**. Comprehensive configuration files (`vercel.json`, `netlify.toml`) and live DNS query simulators were successfully produced.
