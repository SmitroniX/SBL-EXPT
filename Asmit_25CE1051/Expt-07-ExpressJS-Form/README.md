# Experiment 07: Design a Form Using Express.js in Node.js

## 📌 Student Details
- **Student Name:** Asmit Jogdand
- **Roll Number:** 25CE1051
- **Branch / Class:** B.Tech Computer Engineering (Sem VI)
- **Institution:** Ramrao Adik Institute of Technology (RAIT), D Y Patil Deemed to be University
- **Subject:** Skill Based Lab - Advanced Web Technology (SBL-AWT)

---

## 1. 🎯 Aim
To build an interactive, server-side validated web application using **Express.js** running on **Node.js**, demonstrating HTTP request body parsing (`express.urlencoded`), custom logging middleware, server-side constraint validation, error feedback preservation, and dynamic receipt generation upon POST submission.

---

## 2. 🏥 Problem Statement
**HealthPulse Specialist Doctor Consultation Form:**
Develop an Express.js web service enabling patients to book consultations across clinical specialties. The application must process HTTP `GET` requests to display the registration form, handle `POST` submissions with server-side validation against malformed inputs (invalid phone format, missing doctor, empty names), re-populate entered values on failure with descriptive error messages, and output an official Consultation Confirmation Receipt with fee calculations upon valid submission.

---

## 3. 💻 Hardware & Software Requirements
- **Hardware:** PC with 4 GB RAM minimum.
- **Software:**
  - Node.js (v18+)
  - Express.js (`^4.19.2`)
  - Web Browser (Chrome / Edge / Firefox)

---

## 4. 📚 Theory & Core Concepts
### 4.1 What is Express.js?
Express.js is the de facto standard web framework for Node.js. It provides a robust suite of routing utilities, HTTP helper methods, and middleware chaining capabilities that dramatically streamline backend application development compared to pure Node.js HTTP servers.

### 4.2 Middleware Architecture
In Express, middleware functions have access to the request object (`req`), response object (`res`), and the `next` middleware in the request-response cycle:
- **`express.urlencoded({ extended: true })`**: Extracts payload from `application/x-www-form-urlencoded` POST bodies and binds it to `req.body`.
- **`express.json()`**: Parses incoming JSON payloads.
- **Custom Logging Middleware**: Logs incoming HTTP verb, requested path, and timestamp.

### 4.3 Server-Side Validation vs Client-Side Validation
Client-side validation (HTML5 / JavaScript) can be bypassed by malicious actors or disabled in the browser. Server-side validation is mandatory to ensure application security, sanitizing inputs and rejecting corrupt or malicious payloads before any business logic or database writes occur.

---

## 5. ⚙️ Algorithm / Procedure
1. Initialize Express application via `const app = express()`.
2. Register body parser middleware: `app.use(express.urlencoded({ extended: true }))`.
3. Configure `app.get('/', (req, res) => ...)` to render the HTML form with clean initial values.
4. Configure `app.post('/book', (req, res) => ...)` to handle form submissions:
   - Extract `patientName`, `phone`, `email`, `doctor`, `consultationType`, `date`, `notes` from `req.body`.
   - Validate field lengths and regular expressions (`/^[6-9]\d{9}$/` for phone, `/^[^\s@]+@[^\s@]+\.[^\s@]+$/` for email).
   - If any validation rule fails, return `HTTP 400 Bad Request` and re-render the form preserving previous inputs alongside specific error tags.
   - If validation succeeds, generate unique appointment ID (`HP-EXP-XXXXXX`), calculate consultation fee based on chosen mode, append to in-memory store, and render an official Consultation Confirmation Receipt.
5. Provide `GET /api/appointments` returning all submissions as structured JSON.
6. Start listening on designated port (`PORT 4000`).

---

## 6. 🧪 Test Cases & Validation Results

| Test Case | Inputs | Expected Output | Status |
| :--- | :--- | :--- | :---: |
| Blank Submission | All fields blank | Re-renders form displaying 5 distinct error alerts | Passed |
| Invalid Phone | Phone = `12345` | Displays: "Enter a valid 10-digit Indian phone number" | Passed |
| Invalid Email | Email = `asmit` | Displays: "Enter a valid email address" | Passed |
| Missing Doctor | Doctor unselected | Displays: "Please select a specialist doctor" | Passed |
| Valid Submission | Valid Name, Phone, Email, Doctor | Returns `HTTP 200` with formatted Medical Receipt | Passed |
| JSON Inspection | Access `/api/appointments` | Emits JSON array of all booked appointments | Passed |

---

## 7. 📸 How to Run
1. Navigate to the directory:
   ```bash
   cd /home/ubuntu/SBL-EXPT/Asmit_25CE1051/Expt-07-ExpressJS-Form
   ```
2. Install Express:
   ```bash
   npm install
   ```
3. Run the server:
   ```bash
   node server.js
   ```
4. Access `http://localhost:4000` in your browser.

---

## 8. 💡 Viva-Voce Questions & Answers

**Q1: What is the role of `express.urlencoded({ extended: true })`?**  
*Answer:* It parses incoming URL-encoded form submissions from POST requests and populates the `req.body` object. The `extended: true` option uses the `qs` library, allowing rich objects and arrays to be encoded into the URL-encoded format.

**Q2: What is the significance of the `next()` function in Express middleware?**  
*Answer:* `next()` passes control to the next middleware function in the execution stack. If a middleware neither ends the request-response cycle (e.g. by calling `res.send()`) nor calls `next()`, the request is left hanging.

**Q3: Why is server-side validation indispensable even when HTML5 validation is in place?**  
*Answer:* Client-side checks can easily be disabled, bypassed using developer tools, or circumvented by transmitting direct HTTP POST requests via `curl` or Postman. Server-side validation guarantees data integrity regardless of the client client implementation.

**Q4: How does routing in Express differ from pure Node.js HTTP routing?**  
*Answer:* In pure Node.js, developers must manually parse `req.url` with if-else/switch blocks. Express provides dedicated methods (`app.get()`, `app.post()`, `app.put()`, `app.delete()`) with support for route parameters (`:id`), regex patterns, and middleware cascades.

---

## 9. 🏁 Conclusion
A validated specialist doctor consultation booking form application was developed and tested using **Express.js** in **Node.js** for **HealthPulse**. Middleware routing, server-side data sanitization, and dynamic HTML receipt generation were successfully demonstrated.
