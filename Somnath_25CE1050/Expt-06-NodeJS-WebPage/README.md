# Experiment 06: Design a Web Page using Node.js

## 📌 Student Details
- **Student Name:** Somnath Jha
- **Roll Number:** 25CE1050
- **Branch / Class:** B.Tech Computer Engineering (Sem VI)
- **Institution:** Ramrao Adik Institute of Technology (RAIT), D Y Patil Deemed to be University
- **Subject:** Skill Based Lab - Advanced Web Technology (SBL-AWT)

---

## 1. 🎯 Aim
To design, program, and serve dynamic web pages using **native Node.js core modules** (`http`, `url`, `os`, `path`) without external third-party packages, handling stream buffer parsing for incoming POST requests, MIME content-type dispatching, and system metric reporting.

---

## 2. ⚡ Problem Statement
**TechVault Core Hardware Web Server:**
Deploy an ultra-lightweight, zero-dependency Node.js HTTP server for the **TechVault Developer Hardware Catalog**. The server must handle multiple routes (`/`, `/about`, `/quote`, `/api/status`), process incoming hardware quote requests via binary chunk streaming, dynamically inject server diagnostic metrics (uptime, memory, OS platform), and emit appropriate HTTP status codes (200, 404).

---

## 3. 💻 Hardware & Software Requirements
- **Hardware:** PC with 2 GB RAM minimum.
- **Software:**
  - Node.js runtime (v18+)
  - Web Browser (Chrome / Edge / Firefox)
  - Text Editor (VS Code)

---

## 4. 📚 Theory & Core Architecture
### 4.1 Native Node.js HTTP Lifecycle
When an HTTP request hits Node.js, `http.createServer((req, res) => ...)` executes:
1. `req`: An instance of `http.IncomingMessage` implemented as a `ReadableStream`.
2. `res`: An instance of `http.ServerResponse` implemented as a `WritableStream`.

### 4.2 Stream Chunk Concatenation
POST request bodies are received in sequential memory buffers:
```javascript
let body = '';
req.on('data', chunk => {
    body += chunk.toString();
});
req.on('end', () => {
    const parsed = new URLSearchParams(body);
    // Parse fields: parsed.get('devName')
});
```

---

## 5. ⚙️ Algorithm / Procedure
1. Import Node.js built-in modules: `http`, `url`, `os`.
2. Define master template helper `renderLayout(title, content)`.
3. Instantiate HTTP server using `http.createServer(callback)`.
4. Route requests by matching `url.parse(req.url, true).pathname`:
   - `GET /`: Renders Hardware Catalog and dynamic server diagnostics.
   - `GET /about`: Displays TechVault engineering mission.
   - `POST /quote`: Assembles chunk buffers, calculates total estimate, and generates an official procurement sheet.
   - `GET /api/status`: Returns JSON diagnostics.
   - Default: Returns `HTTP 404 Not Found`.
5. Bind server to port (`PORT 3001`).

---

## 6. 🧪 Test Cases & Routing Verification

| Method | Route | Expected Code | Content-Type | Result Description |
| :--- | :--- | :---: | :--- | :--- |
| `GET` | `/` | 200 OK | `text/html` | Catalog home with memory & uptime metrics |
| `GET` | `/about` | 200 OK | `text/html` | About TechVault specifications & standards |
| `GET` | `/api/status` | 200 OK | `application/json` | JSON object containing OS and Node telemetry |
| `POST`| `/quote` | 200 OK | `text/html` | Form parsed; computes itemized quote with reference ID |
| `GET` | `/missing` | 404 Not Found | `text/html` | Dark-mode 404 error page |

---

## 7. 📸 How to Run
```bash
cd /home/ubuntu/SBL-EXPT/Somnath_25CE1050/Expt-06-NodeJS-WebPage
node server.js
# Access in browser: http://localhost:3001
```

---

## 8. 💡 Viva-Voce Questions & Answers

**Q1: What is the Event Loop in Node.js?**  
*Answer:* The Event Loop is the core coordination mechanism in Node.js. It continuously checks for pending asynchronous events, offloads blocking operations to the kernel or `libuv` thread pool, and queues callbacks to execute on the main JavaScript thread when results are ready.

**Q2: What is the significance of the `os` and `process` modules in Node.js?**  
*Answer:* `os` exposes operating system-level telemetry such as total memory, free memory, CPU architecture, and host platform. `process` provides control and state for the active Node.js instance, such as `process.uptime()`, `process.version`, and environment variables (`process.env`).

**Q3: How does native Node.js routing differ from framework-based routing?**  
*Answer:* Native Node.js requires explicit parsing of the request URL string using `url.parse(req.url)` and conditional if-else or switch statements. Frameworks like Express provide declarative helper methods (`app.get()`, `app.post()`) with built-in regex matching and middleware pipelines.

---

## 9. 🏁 Conclusion
A standalone web page server was engineered using **pure Node.js core modules** without external libraries for **TechVault**. URL routing, binary stream parsing, and live telemetry reporting were successfully executed.
