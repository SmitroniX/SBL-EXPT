# Experiment 09: Input & Output Manual
## Hosting the Website with Domain Registration Process

---

### 👨‍🎓 Student & Laboratory Credentials
- **Student Name:** Asmit Jogdand
- **Roll Number:** `25CE1051`
- **Class / Division:** B.Tech Computer Engineering (Sem VI)
- **Academic Year:** 2026 – 2027
- **Course:** Skill Based Lab - Advanced Web Technology (SBL-AWT)
- **Institution:** Ramrao Adik Institute of Technology (RAIT), D Y Patil Deemed to be University, Nerul, Navi Mumbai
- **Problem Statement Domain:** **HealthPulse — Digital Healthcare & Clinical Management Portal**
- **Experiment Title:** Hosting the Website with Domain Registration Process

---

## 1. 🎯 Experiment Aim
To analyze, document, and simulate the complete engineering workflow of procuring a custom Top-Level Domain (TLD) (`healthpulse-care.org`), delegating authoritative nameservers, structuring DNS resource records (A, CNAME, MX, TXT/SPF), and deploying production web applications across global edge cloud infrastructure (Vercel and Netlify).

---

## 2. 📥 Input Specification

### 2.1 File System Input

| File Name | Format | Role & Implementation Responsibility |
| :--- | :--- | :--- |
| `vercel.json` | JSON | Vercel production edge deployment configuration: specifies clean URLs, security headers (`X-Frame-Options`, HSTS), and SPA rewrites. |
| `netlify.toml` | TOML | Netlify build pipeline configuration: declares build directory (`public`), redirect rules (`/* -> /index.html 200`), and static asset caching. |
| `package.json` | JSON | Project metadata and deployment scripts (`npm run deploy:vercel`, `npm run deploy:netlify`). |
| `public/index.html`| HTML5 / CSS3 / JS | Interactive DNS Zone Record Inspector and Propagation Terminal simulating CLI `dig` and `nslookup` queries. |

### 2.2 Execution Command Input

```bash
# Navigate to the experiment directory
cd /home/ubuntu/SBL-EXPT/Asmit_25CE1051/Expt-09-Hosting-Domain-Process

# Option A: Open interactive DNS inspector directly in browser
chromium-browser public/index.html

# Option B: Run local preview server
npx serve public
```

### 2.3 Domain Registration & Nameserver Delegation Parameters

```
+----------------------------------------------------------------------------------------------------+
| PARAMETER NAME         | VALUE ASSIGNED                          | TECHNICAL PURPOSE               |
+----------------------------------------------------------------------------------------------------+
| Domain Name            | healthpulse-care.org                    | Fully Qualified Domain (FQDN)   |
| Top-Level Domain (TLD) | .org (Public Interest Registry - PIR)   | Healthcare & Clinical Portal    |
| Accredited Registrar   | Cloudflare Registrar / Namecheap        | ICANN-accredited domain registry|
| Primary Nameserver     | ns1.vercel-dns.com                      | Authoritative Anycast DNS Node 1|
| Secondary Nameserver   | ns2.vercel-dns.com                      | Authoritative Anycast DNS Node 2|
| DNS Propagation TTL    | 3600 seconds (1 hour standard)          | Local resolver cache expiry     |
+----------------------------------------------------------------------------------------------------+
```

### 2.4 Authoritative DNS Zone Resource Records Input Table

```
+----------------------------------------------------------------------------------------------------+
| RECORD TYPE | HOST / NAME | TTL  | DESTINATION / TARGET VALUE          | OPERATIONAL FUNCTION      |
+----------------------------------------------------------------------------------------------------+
| A Record    | @ (Apex)    | 3600 | 76.76.21.21                         | Points apex to Vercel Edge|
| CNAME       | www         | 3600 | cname.vercel-dns.com                | Canonical alias for www   |
| MX Record   | @ (Apex)    | 3600 | 10 mail.healthpulse-care.org        | Priority 10 mail routing  |
| TXT Record  | @ (Apex)    | 3600 | v=spf1 include:_spf.google.com ~all | Anti-spoofing SPF policy  |
| TXT Record  | _dmarc      | 3600 | v=DMARC1; p=reject; rua=mailto:...  | DMARC email authentication|
| NS Record   | @ (Apex)    | 86400| ns1.vercel-dns.com                  | Authoritative NS delegate |
+----------------------------------------------------------------------------------------------------+
```

### 2.5 Cloud Deployment Configuration Input Files

#### `vercel.json`:
```json
{
  "version": 2,
  "cleanUrls": true,
  "trailingSlash": false,
  "headers": [
    {
      "source": "/(.*)",
      "headers": [
        { "key": "X-Content-Type-Options", "value": "nosniff" },
        { "key": "X-Frame-Options", "value": "SAMEORIGIN" },
        { "key": "Strict-Transport-Security", "value": "max-age=31536000; includeSubDomains" }
      ]
    }
  ],
  "rewrites": [
    { "source": "/(.*)", "destination": "/index.html" }
  ]
}
```

#### `netlify.toml`:
```toml
[build]
  publish = "public"
  command = "echo 'Building HealthPulse production assets...'"

[[redirects]]
  from = "/*"
  to = "/index.html"
  status = 200

[[headers]]
  for = "/*"
  [headers.values]
    X-Frame-Options = "SAMEORIGIN"
    X-Content-Type-Options = "nosniff"
```

---

## 3. 📤 Output Specification

### 3.1 Simulated DNS Resolution & Terminal Query Output (`dig` / `nslookup`)

```bash
# Query A Record (IPv4 Address Resolution)
$ dig +noall +answer healthpulse-care.org A
healthpulse-care.org.    3600    IN    A    76.76.21.21

# Query CNAME Record (Subdomain Canonical Alias)
$ dig +noall +answer www.healthpulse-care.org CNAME
www.healthpulse-care.org. 3600   IN    CNAME    cname.vercel-dns.com.

# Query MX Records (Mail Exchange Server Priority)
$ dig +noall +answer healthpulse-care.org MX
healthpulse-care.org.    3600    IN    MX    10 mail.healthpulse-care.org.

# Query TXT Record (SPF & Domain Ownership Verification)
$ dig +noall +answer healthpulse-care.org TXT
healthpulse-care.org.    3600    IN    TXT    "v=spf1 include:_spf.google.com ~all"
healthpulse-care.org.    3600    IN    TXT    "google-site-verification=HP-992144-VERIFIED"
```

### 3.2 Graphical User Interface Output Representation (`public/index.html`)

```
+----------------------------------------------------------------------------------------------------+
|  [HealthPulse Portal]  SBL - Advanced Web Technology (Sem VI)          Student: Asmit (25CE1051)   |
+----------------------------------------------------------------------------------------------------+
|                                                                                                    |
|                       🌐 PRODUCTION CLOUD HOSTING & DOMAIN INFRASTRUCTURE                          |
|             Domain: healthpulse-care.org  |  Status: [ 🟢 ACTIVE / PROPAGATED ]                    |
|                                                                                                    |
|  +-- 1. Authoritative DNS Resource Table -------------------------------------------------------+  |
|  | TYPE    | NAME / HOST | VALUE / DESTINATION                 | TTL    | STATUS / HEALTH          |  |
|  |---------+-------------+-------------------------------------+--------+--------------------------|  |
|  | [ A ]   | @           | 76.76.21.21 (Vercel Anycast Edge)   | 3600s  | 🟢 Active & Propagated   |  |
|  | [CNAME] | www         | cname.vercel-dns.com                | 3600s  | 🟢 Active & Propagated   |  |
|  | [ MX ]  | @           | 10 mail.healthpulse-care.org        | 3600s  | 🟢 Priority 10 Active    |  |
|  | [ TXT ] | @           | v=spf1 include:_spf.google.com ~all | 3600s  | 🟢 SPF Pass Enforced     |  |
|  +----------------------------------------------------------------------------------------------+  |
|                                                                                                    |
|  +-- 2. Interactive DNS Query Console (Live dig Simulator) -------------------------------------+  |
|  | Select Record: [ A Record (IPv4 Address) v ]               [ 🔍 Execute DNS Query ]           |  |
|  |                                                                                              |  |
|  | Query Output:                                                                                |  |
|  | ;; ANSWER SECTION:                                                                           |  |
|  | healthpulse-care.org.    3600    IN    A    76.76.21.21                                      |  |
|  | ;; SERVER: 1.1.1.1#53(Cloudflare Anycast Resolver)                                          |  |
|  | ;; WHEN: Thu Oct 01 10:35:12 IST 2026                                                        |  |
|  +----------------------------------------------------------------------------------------------+  |
|                                                                                                    |
|  +-- 3. Production Deployment Stepper ----------------------------------------------------------+  |
|  | [1] ICANN Domain Procurement (healthpulse-care.org via Cloudflare Registrar)                |  |
|  | [2] Git Repository Connection (github.com/SmitroniX/SBL-EXPT)                                |  |
|  | [3] CI/CD Edge Deployment Triggered (Vercel Build Serverless Pipeline)                       |  |
|  | [4] Nameserver Delegation (ns1.vercel-dns.com / ns2.vercel-dns.com)                          |  |
|  | [5] Automatic SSL/TLS Certificate Provisioning (Let's Encrypt X.509 Wildcard)               |  |
|  +----------------------------------------------------------------------------------------------+  |
+----------------------------------------------------------------------------------------------------+
```

### 3.3 Test Case Execution Results

| Test Scenario | Action / Record Inspected | DNS Resolver Behavior | Observed Output Result | Status |
| :--- | :--- | :--- | :--- | :---: |
| **Apex Resolution** | Query `healthpulse-care.org` (A) | Matches Anycast IP | Resolves to `76.76.21.21` with TTL 3600s | **PASS** |
| **Subdomain Alias** | Query `www.healthpulse-care.org` | Follows CNAME pointer | Canonical name resolves to `cname.vercel-dns.com` | **PASS** |
| **Mail Routing** | Query `healthpulse-care.org` (MX) | Evaluates preference order | Returns `10 mail.healthpulse-care.org` | **PASS** |
| **SPF Protection** | Query TXT records | Verifies anti-spoof policy | Returns SPF record with Google Mail authorization | **PASS** |
| **Edge Redirection**| Inspect `netlify.toml` rules | Evaluates SPA catch-all | `/*` redirects seamlessly to `/index.html` with status 200 | **PASS** |
| **Security Headers**| Inspect `vercel.json` headers | Evaluates HTTP headers | HSTS and `X-Frame-Options: SAMEORIGIN` applied | **PASS** |

---

## 4. 🏁 Conclusion & Verification
Experiment 09 provided a complete technical roadmap for cloud hosting. Through DNS record configuration, nameserver delegation, automated continuous integration, and Anycast content delivery network (CDN) routing, `healthpulse-care.org` demonstrated enterprise cloud readiness.
