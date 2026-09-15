# Experiment 07: Design a Form Using Express.js in Node.js

## 📌 Student Details
- **Student Name:** Somnath Jha
- **Roll Number:** 25CE1050
- **Branch / Class:** B.Tech Computer Engineering (Sem VI)
- **Institution:** Ramrao Adik Institute of Technology (RAIT), D Y Patil Deemed to be University
- **Subject:** Skill Based Lab - Advanced Web Technology (SBL-AWT)

---

## 1. 🎯 Aim
To develop an interactive, server-side validated web application using **Express.js** in **Node.js**, demonstrating request body parsing (`express.urlencoded`), custom middleware logging, server-side validation against erroneous submissions, input state preservation, and dynamic purchase invoice generation upon POST processing.

---

## 2. ⚡ Problem Statement
**TechVault Custom PC Rig Configurator & Order Form:**
Build an Express.js web service where developers can customize high-performance developer workstations (CPUs, GPUs, RAM, Cooling). The application must handle `GET` requests to display the configurator, handle `POST` submissions with strict server-side validation (phone regex, email format, component validation), re-render the form preserving previous inputs upon failure, dynamically calculate component pricing, and generate an official Hardware Build Specification Sheet.

---

## 3. 💻 Hardware & Software Requirements
- **Hardware:** PC with 4 GB RAM minimum.
- **Software:**
  - Node.js (v18+)
  - Express.js (`^4.19.2`)
  - Web Browser & Terminal

---

## 4. 📚 Theory & Core Concepts
### 4.1 Express Request Processing Pipeline
```
[ Incoming HTTP POST /order ]
              v
[ Middleware: express.urlencoded({ extended: true }) ] -> Populates req.body
              v
[ Middleware: Custom Console Logger ]
              v
[ Route Controller: Validation Logic ]
           /         \
  (Validation Fails)   (Validation Passes)
         v                     v
[ Re-render Form (400) ]  [ Calculate Pricing & Render Invoice (200) ]
```

### 4.2 Dynamic Pricing Algorithm
Total price is calculated on the server by inspecting components selected in `req.body`:
$$\text{Total} = \text{Price}(\text{CPU}) + \text{Price}(\text{GPU}) + \text{Price}(\text{RAM}) + \text{Price}(\text{Cooling}) + \text{Base Chassis/PSU}$$

---

## 5. ⚙️ Algorithm / Procedure
1. Initialize Express instance and mount URL-encoded body parser.
2. Register custom request logging middleware (`req.method`, `req.url`, timestamp).
3. Set up `GET /` displaying form fields with clean defaults.
4. Set up `POST /order` executing validation checks:
   - Developer name $\ge 3$ characters.
   - 10-digit Indian cellular number matching `^[6-9]\d{9}$`.
   - Valid email syntax.
   - Mandatory selection of CPU and GPU components.
5. If invalid, emit `HTTP 400 Bad Request` and re-render form highlighting faulty fields while preserving entered data.
6. If valid, compute final pricing, generate order reference ID (`TV-RIG-XXXXXX`), and output a styled build specification receipt.
7. Provide `GET /api/builds` for JSON inspection.

---

## 6. 🧪 Test Cases & Results

| Test Scenario | Submitted Data | Expected Outcome | Status |
| :--- | :--- | :--- | :---: |
| Empty Form | All fields blank | Re-renders form displaying 5 distinct error alerts | Passed |
| Invalid Phone | Phone = `12345` | Error: "Enter a valid 10-digit Indian mobile number" | Passed |
| Missing GPU | GPU unselected | Error: "Please select a dedicated GPU" | Passed |
| Valid Build | Ryzen 9 7950X + RTX 4090 + 64GB RAM | Generates official Rig Specification Sheet with calculated price | Passed |
| JSON API | `GET /api/builds` | Returns structured JSON array of submitted orders | Passed |

---

## 7. 📸 How to Run
```bash
cd /home/ubuntu/SBL-EXPT/Somnath_25CE1050/Expt-07-ExpressJS-Form
npm install
node server.js
# Access in browser: http://localhost:4001
```

---

## 8. 💡 Viva-Voce Questions & Answers

**Q1: What is the benefit of computing prices server-side rather than on the client?**  
*Answer:* Security. If prices were calculated solely on the client, an attacker could tamper with hidden form fields or JavaScript variables to submit an order with a price of ₹1. Computing prices on the server guarantees financial integrity.

**Q2: What is the purpose of middleware in Express.js?**  
*Answer:* Middleware functions execute during the request-response lifecycle. They can inspect and modify request/response objects, execute custom logic (authentication, logging, compression), or terminate the cycle prematurely if unauthorized.

**Q3: How does `app.use()` differ from `app.get()` or `app.post()`?**  
*Answer:* `app.use()` applies middleware globally across all HTTP methods and path prefixes. `app.get()` and `app.post()` bind handlers specifically to matching HTTP verbs and exact route paths.

---

## 9. 🏁 Conclusion
A custom PC build ordering and specification application was built and validated using **Express.js** in **Node.js** for **TechVault**. Middleware pipelines, server-side data validation, dynamic price computation, and invoice rendering were executed and verified.
