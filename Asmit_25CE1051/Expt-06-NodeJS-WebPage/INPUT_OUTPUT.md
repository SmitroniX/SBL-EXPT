# Experiment 06: Input & Output Manual
## Design a Web Page using Node.js (Pure Core Modules)

---

### 👨‍🎓 Student & Laboratory Credentials
- **Student Name:** Asmit Jogdand
- **Roll Number:** `25CE1051`
- **Class / Division:** B.Tech Computer Engineering (Sem VI)
- **Academic Year:** 2026 – 2027
- **Course:** Skill Based Lab - Advanced Web Technology (SBL-AWT)
- **Institution:** Ramrao Adik Institute of Technology (RAIT), D Y Patil Deemed to be University, Nerul, Navi Mumbai
- **Problem Statement Domain:** **HealthPulse — Digital Healthcare & Clinical Management Portal**
- **Experiment Title:** Design a Web Page using Node.js

---

## 1. 🎯 Experiment Aim
To develop a high-performance, lightweight HTTP web server using native **Node.js core modules** (`http`, `url`, `os`, `path`, `fs`) with zero external framework dependencies, demonstrating low-level request routing, streaming chunk aggregation, server diagnostics, and dynamic HTML templating.

---

## 2. 📥 Input Specification

### 2.1 File System Input

| File Name | Format | Role & Implementation Responsibility |
| :--- | :--- | :--- |
| `server.js` | Pure Node.js (CommonJS) | Uses `http.createServer()`, custom router, `req.on('data')`/`req.on('end')` binary buffer aggregator, OS telemetry injection (`os.freemem`, `os.totalmem`), and dynamic HTML view generator. |
| `package.json` | JSON | Project metadata and start script (`node server.js`). Has zero dependencies (`dependencies: {}`). |

### 2.2 Execution Command Input

```bash
# Navigate to the experiment directory
cd /home/ubuntu/SBL-EXPT/Asmit_25CE1051/Expt-06-NodeJS-WebPage

# Launch web server using pure Node.js (Default Port: 3000)
node server.js

# Or specify a custom port:
PORT=3555 node server.js
```

### 2.3 HTTP Route Dispatcher Input Mapping

```
+----------------------------------------------------------------------------------------------------+
| HTTP VERB | PATHNAME            | CONTENT-TYPE RETURNED       | LOGICAL RESPONSIBILITY             |
+----------------------------------------------------------------------------------------------------+
| GET       | /                   | text/html; charset=utf-8    | HealthPulse Portal Home + Metrics  |
| GET       | /about              | text/html; charset=utf-8    | Clinical specialties & hospital info|
| GET       | /consultation       | text/html; charset=utf-8    | Interactive consultation intake form|
| POST      | /consultation       | text/html; charset=utf-8    | Stream chunk parser & ticket output|
| GET       | /api/status         | application/json            | System diagnostics & memory usage  |
| ANY       | (Unmatched paths)   | text/html; charset=utf-8    | Custom HTTP 404 Error page         |
+----------------------------------------------------------------------------------------------------+
```

### 2.4 Sample Input Payloads & Test Requests

#### Request 1: Server Diagnostics Query (`GET /api/status`)
```bash
curl -i http://localhost:3555/api/status
```

#### Request 2: Consultation Booking via Stream Body (`POST /consultation`)
```bash
curl -X POST http://localhost:3555/consultation \
  -H "Content-Type: application/x-www-form-urlencoded" \
  -d "fullName=Asmit+Jogdand&email=asmit.jogdand%40healthpulse.org&phone=9876543210&department=Cardiology&symptoms=Routine+EHR+Cardiac+Screening"
```

---

## 3. 📤 Output Specification

### 3.1 Terminal & Server Execution Logs

```
$ PORT=3555 node server.js
[HealthPulse] Native Node.js server is running at http://localhost:3555
[HealthPulse] Student: Asmit Jogdand (25CE1051)
[9:30:43 AM] HTTP GET request to: /api/status
[9:30:43 AM] HTTP POST request to: /consultation
[Stream Parser] Received 142 bytes of chunked payload. Parsing URL-encoded parameters.
[HealthPulse] Generated Clinical Consultation Ticket: HP-253968 for patient Asmit Jogdand.
```

### 3.2 HTTP REST API Diagnostics Output (`GET /api/status`)

```json
HTTP/1.1 200 OK
Content-Type: application/json
Date: Thu, 01 Oct 2026 09:30:43 GMT
Connection: close

{
  "status": "ONLINE",
  "application": "HealthPulse Node Server",
  "developer": "Asmit Jogdand (25CE1051)",
  "college": "RAIT, D Y Patil Deemed to be University",
  "nodeVersion": "v24.20.0",
  "memory": {
    "free": "4504.99 MB",
    "total": "11927.42 MB"
  },
  "uptimeSeconds": 42,
  "timestamp": "2026-10-01T09:30:43.868Z"
}
```

### 3.3 Dynamic Consultation Confirmation Receipt Output (`POST /consultation`)

Upon receiving and parsing the streamed chunks, the server returns an HTML response containing the dynamic confirmation ticket:

```
+------------------------------------------------------------------------------------+
|                     🎫 HEALTHPULSE TELEHEALTH CONSULTATION TICKET                  |
+------------------------------------------------------------------------------------+
|  Booking Reference Token:  HP-253968                                               |
|  Server Timestamp:         2026-10-01 09:30:43 IST                                 |
|                                                                                    |
|  Patient Details:                                                                  |
|  • Full Legal Name:        Asmit Jogdand                                           |
|  • Communication Email:    asmit.jogdand@healthpulse.org                           |
|  • Cellular Contact:       +91 9876543210                                          |
|  • Clinical Specialty:     Cardiology & CathLab                                    |
|  • Chief Symptoms:         Routine EHR Cardiac Screening                           |
|                                                                                    |
|  Telemetry Diagnostics:                                                            |
|  • Served by Node.js Core: v24.20.0                                                |
|  • Memory Consumption:     Active RSS 34.2 MB                                      |
|                                                                                    |
|  [ Print Consultation Pass ]    [ Return to Portal Home ]                          |
+------------------------------------------------------------------------------------+
```

### 3.4 Graphical User Interface Output Representation (`GET /`)

```
+----------------------------------------------------------------------------------------------------+
|  [HealthPulse Portal]  SBL - Advanced Web Technology (Sem VI)          Student: Asmit (25CE1051)   |
+----------------------------------------------------------------------------------------------------+
|  (❤️ HealthPulse Telehealth)      Home       About Clinical Services       Book Consultation        |
+----------------------------------------------------------------------------------------------------+
|                                                                                                    |
|                            🏥 HEALTHPULSE TELEHEALTH NODE CORE ENGINE                              |
|                    High-Speed Native HTTP Server Built Using Pure Node.js Modules                  |
|                                                                                                    |
|  +-- Real-Time Server Performance & OS Diagnostics ---------------------------------------------+  |
|  | Node Engine: v24.20.0     | Server Architecture: x64 Linux     | Process Uptime: 42s         |  |
|  | Available RAM: 4,504.99 MB / 11,927.42 MB Total Memory         | Host OS: Linux Ubuntu       |  |
|  +----------------------------------------------------------------------------------------------+  |
|                                                                                                    |
|  +-- Instant Consultation Request --------------------------------------------------------------+  |
|  | Full Name: [ Asmit Jogdand               ]  Email Address: [ asmit@healthpulse.org       ]   |  |
|  | Phone No:  [ 9876543210                  ]  Specialty:     [ Cardiology & CathLab       v]   |  |
|  | Symptoms:  [ Routine cardiac assessment and blood pressure evaluation                     ]   |  |
|  |                                                                                              |  |
|  |                         [ 🚀 Dispatch Consultation Request (POST) ]                          |  |
|  +----------------------------------------------------------------------------------------------+  |
+----------------------------------------------------------------------------------------------------+
```

### 3.5 Test Case Execution Results

| Test Scenario | Injected Request | Native Node.js Execution Handling | Observed Response Output | Status |
| :--- | :--- | :--- | :--- | :---: |
| **Home Page Route** | `GET /` | Matches `/` in routing switch | HTTP 200; renders HTML with live OS memory metrics | **PASS** |
| **About Page Route**| `GET /about` | Matches `/about` | HTTP 200; renders hospital department overview | **PASS** |
| **Metrics Endpoint**| `GET /api/status` | Sets `Content-Type: application/json` | HTTP 200; JSON payload with free/total memory and uptime | **PASS** |
| **Stream Chunk POST**| `POST /consultation` | Gathers `chunk` buffers, parses form body | HTTP 200; dynamic confirmation pass with ticket `HP-253968` | **PASS** |
| **404 Invalid Path**| `GET /nonexistent` | Hits default fallback case | HTTP 404 Not Found; displays customized error page | **PASS** |
| **Zero Dependencies**| Clean environment check | Checks `package.json` dependencies | Runs purely on standard Node.js library (`http`, `os`, `url`) | **PASS** |

---

## 4. 🏁 Conclusion & Verification
Experiment 06 successfully demonstrated native Node.js HTTP server architecture. The server handled routing, chunked data streams, process telemetry, and dynamic HTML rendering without relying on third-party frameworks like Express, confirming fundamental mastery of the Node.js event-driven runtime.
