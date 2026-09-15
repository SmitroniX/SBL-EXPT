# Experiment 06: Design a Web Page using Node.js

## 📌 Student Details
- **Student Name:** Asmit Jogdand
- **Roll Number:** 25CE1051
- **Branch / Class:** B.Tech Computer Engineering (Sem VI)
- **Institution:** Ramrao Adik Institute of Technology (RAIT), D Y Patil Deemed to be University
- **Subject:** Skill Based Lab - Advanced Web Technology (SBL-AWT)

---

## 1. 🎯 Aim
To design, build, and serve dynamic web pages using **pure Node.js core modules** (`http`, `url`, `os`, `path`) without external third-party frameworks, implementing custom routing, MIME type dispatching, stream buffer parsing for POST data, and real-time system performance monitoring.

---

## 2. 🏥 Problem Statement
**HealthPulse Core Telemedicine Server:**
Deploy an ultra-lightweight, zero-dependency Node.js HTTP server for the **HealthPulse Telehealth Portal**. The server must handle multiple routes (`/`, `/about`, `/consultation`, `/api/status`), extract query parameters and URL paths, collect and parse incoming patient consultation form streams, dynamically inject server diagnostic metrics (uptime, memory, OS platform), and return appropriate HTTP status codes (200, 404).

---

## 3. 💻 Hardware & Software Requirements
- **Hardware:** Standard PC with 2 GB RAM minimum.
- **Software:**
  - Node.js runtime (v18+)
  - Web Browser (Chrome / Edge / Firefox)
  - Text Editor (VS Code)

---

## 4. 📚 Theory & Core Concepts
### 4.1 Node.js Architecture
Node.js is an open-source, cross-platform JavaScript runtime environment executing code outside a web browser. It operates on the V8 engine and features a single-threaded, non-blocking, event-driven I/O model backed by `libuv`.

### 4.2 Core Modules Used
- **`http` Module:** Provides `http.createServer((req, res) => { ... })` to listen on incoming TCP connections and format HTTP response headers and bodies.
- **`url` Module:** Parses the request URL into `pathname` and query parameters.
- **`os` Module:** Queries host operating system properties: `freemem()`, `totalmem()`, `type()`, `arch()`.
- **`process` Global Object:** Provides runtime process statistics like `process.uptime()` and `process.version`.

### 4.3 Native Request Streaming & Buffer Assembly
Unlike frameworks that provide automated body parsers, native Node.js receives HTTP request payloads in binary chunks:
```javascript
let body = '';
req.on('data', chunk => {
    body += chunk.toString();
});
req.on('end', () => {
    const parsedData = new URLSearchParams(body);
    // Access form fields: parsedData.get('patientName')
});
```

---

## 5. ⚙️ Algorithm / Procedure
1. Import Node.js built-in modules: `http`, `url`, `os`.
2. Define helper function `renderLayout(title, content)` to assemble consistent HTML markup, responsive CSS, and student metadata.
3. Instantiate the server via `http.createServer(callback)`.
4. Inside the request callback:
   - Parse URL via `url.parse(req.url, true)`.
   - Log timestamp, HTTP method, and requested endpoint.
5. Implement routing switch:
   - `GET /` or `/home`: Computes server metrics and renders the Telemedicine Consultation Booking page.
   - `GET /about`: Serves clinic history and accreditation details.
   - `POST /consultation`: Assembles incoming chunk buffers, generates a unique patient token (`HP-XXXXXX`), and renders a dynamic confirmation ticket.
   - `GET /api/status`: Emits `application/json` diagnostics containing memory and uptime statistics.
   - Default: Returns `HTTP 404 Not Found` with a customized error page.
6. Bind server to target port (`server.listen(PORT)`).

---

## 6. 🧪 Test Cases & Routing Verification

| Method | Requested Route | Expected HTTP Code | Content-Type | Output Verification |
| :--- | :--- | :---: | :--- | :--- |
| `GET` | `/` | 200 OK | `text/html` | Telemedicine Home with server diagnostics & booking form |
| `GET` | `/about` | 200 OK | `text/html` | About NABH accreditation & clinic history |
| `GET` | `/api/status` | 200 OK | `application/json` | JSON object with uptime, memory, and Node version |
| `POST`| `/consultation` | 200 OK | `text/html` | Form parsed, generates appointment token `HP-XXXXXX` |
| `GET` | `/invalid-path` | 404 Not Found | `text/html` | Styled 404 error page with link to home |

---

## 7. 📸 How to Run
1. Navigate to the directory:
   ```bash
   cd /home/ubuntu/SBL-EXPT/Asmit_25CE1051/Expt-06-NodeJS-WebPage
   ```
2. Start the server (no `npm install` needed!):
   ```bash
   node server.js
   ```
3. Open `http://localhost:3000` in your browser.

---

## 8. 💡 Viva-Voce Questions & Answers

**Q1: Why is Node.js called single-threaded yet capable of handling high concurrency?**  
*Answer:* Node.js executes JavaScript on a single thread via the Event Loop. When asynchronous I/O operations (file system, network calls) occur, Node offloads them to background worker threads in the C++ `libuv` thread pool or OS kernel, freeing the main thread to immediately handle other incoming requests.

**Q2: What is the purpose of `res.writeHead()` and `res.end()`?**  
*Answer:* `res.writeHead(statusCode, headers)` sends the HTTP status code and response headers (like `Content-Type: text/html`) to the client. `res.end([data])` signals to the server that all response headers and body have been sent, concluding the HTTP transaction.

**Q3: How does native Node.js receive POST request payloads?**  
*Answer:* The request object `req` is a `ReadableStream`. Data arrives in asynchronous chunks via the `'data'` event. When the entire stream has finished transmitting, the `'end'` event fires, signaling that buffer concatenation is complete.

**Q4: How does pure Node.js differ from using the Express.js framework?**  
*Answer:* Pure Node requires manual implementation of routing, stream assembly, MIME type headers, and error middleware. Express.js is a routing and middleware framework built on top of Node.js that abstracts these low-level details into convenient APIs like `app.use()`, `app.get()`, and `res.json()`.

---

## 9. 🏁 Conclusion
A dynamic web page server was engineered using **pure Node.js core modules** without third-party frameworks for **HealthPulse**. Request streaming, custom URL routing, and real-time server health monitoring were verified successfully.
