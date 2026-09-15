# Experiment 05: Connecting Your React.js Project with MongoDB

## 📌 Student Details
- **Student Name:** Asmit Jogdand
- **Roll Number:** 25CE1051
- **Branch / Class:** B.Tech Computer Engineering (Sem VI)
- **Institution:** Ramrao Adik Institute of Technology (RAIT), D Y Patil Deemed to be University
- **Subject:** Skill Based Lab - Advanced Web Technology (SBL-AWT)

---

## 1. 🎯 Aim
To connect a **React.js** front-end application with a **MongoDB** NoSQL database through an intermediate **Node.js + Express.js** RESTful API using **Mongoose ODM**, enabling full CRUD (Create, Read, Delete) operations.

---

## 2. 🏥 Problem Statement
**HealthPulse Patient Appointment & Medical Record Synchronizer:**
Develop a full-stack MERN application where patients and clinic administrators can schedule, review, and cancel doctor consultations. The React interface must communicate asynchronously with the Express server via REST API endpoints, persisting patient data into MongoDB collections using structured Mongoose schemas.

---

## 3. 💻 Hardware & Software Requirements
- **Hardware:** Standard PC with 4 GB RAM minimum.
- **Software:**
  - Node.js (v18+) & npm
  - Express.js (`^4.19.2`)
  - MongoDB Server (Local `mongod` daemon or MongoDB Atlas cloud cluster)
  - Mongoose ODM (`^8.4.0`)
  - React 18 & Modern Web Browser

---

## 4. 📚 Theory & Core Concepts
### 4.1 MERN Architecture
1. **React.js (Frontend Layer):** Renders reactive user interfaces, handles user inputs via controlled forms, and communicates over HTTP using `fetch()` or `axios`.
2. **Node.js & Express.js (Application / API Layer):** Listens for incoming HTTP requests, executes routing logic, performs data validation, and enforces CORS security headers.
3. **Mongoose ODM (Object Data Modeling):** Manages relationships between data, provides schema validation, and translates JavaScript objects into BSON documents for MongoDB.
4. **MongoDB (Database Layer):** Document-oriented NoSQL database that stores data in JSON-like BSON format, providing high write throughput and schema flexibility.

### 4.2 Mongoose Schema Definition
```javascript
const appointmentSchema = new mongoose.Schema({
    patientName: { type: String, required: true, trim: true },
    doctorName: { type: String, required: true },
    department: { type: String, required: true },
    appointmentDate: { type: String, required: true },
    timeSlot: { type: String, required: true },
    priority: { type: String, enum: ['Regular', 'Urgent'], default: 'Regular' },
    status: { type: String, default: 'Confirmed' },
    createdAt: { type: Date, default: Date.now }
});
```

### 4.3 RESTful API Contract
- `GET /api/status`: Returns server health and active database engine.
- `GET /api/appointments`: Retrieves all scheduled patient appointments sorted by creation timestamp.
- `POST /api/appointments`: Receives JSON payload and inserts a new document into MongoDB.
- `DELETE /api/appointments/:id`: Finds document by `_id` and permanently removes it.

---

## 5. ⚙️ Algorithm / Procedure
1. Initialize a Node.js application (`package.json`) and install `express`, `mongoose`, and `cors`.
2. Configure Express middleware for JSON parsing (`express.json()`) and static asset delivery.
3. Define Mongoose connection logic with `mongoose.connect(MONGODB_URI)`.
4. Establish RESTful API routes (`GET`, `POST`, `DELETE`).
5. Build the React.js client interface featuring an appointment booking form and live appointment roster.
6. Use React's `useEffect` hook to fetch data on component mount:
   ```javascript
   useEffect(() => {
       fetchData();
   }, []);
   ```
7. Dispatch asynchronous `POST` requests to save new patient appointments and trigger state refetch.
8. Dispatch `DELETE` requests using document `_id` to remove cancelled appointments.

---

## 6. 🧪 Test Cases & Execution

| Method | Endpoint | Request Body / Param | Expected Response | Status |
| :--- | :--- | :--- | :--- | :---: |
| `GET` | `/api/status` | - | `{ mongoConnected: true, storageEngine: "MongoDB..." }` | Passed |
| `GET` | `/api/appointments` | - | `{ success: true, count: N, data: [...] }` | Passed |
| `POST` | `/api/appointments` | `{ patientName: "Asmit", ... }` | `HTTP 201 Created` with created document | Passed |
| `POST` | `/api/appointments` | `{ patientName: "" }` (Incomplete) | `HTTP 400 Bad Request: "All fields are required"` | Passed |
| `DELETE` | `/api/appointments/:id`| Valid `_id` | `HTTP 200 OK: "Record removed"` | Passed |

---

## 7. 📸 How to Run
1. Navigate to the directory:
   ```bash
   cd /home/ubuntu/SBL-EXPT/Asmit_25CE1051/Expt-05-React-MongoDB-Connect
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Start the server:
   ```bash
   node server.js
   ```
4. Open your browser and navigate to:
   ```
   http://localhost:5000
   ```

---

## 8. 💡 Viva-Voce Questions & Answers

**Q1: Why can't React connect directly to MongoDB without Node.js/Express?**  
*Answer:* Security and architectural isolation. MongoDB requires database credentials (username/password/connection URI) and raw TCP socket connections. If React connected directly from the client browser, anyone could view database credentials in developer tools and execute unauthorized database queries. Node.js acts as a secure, authenticated intermediary.

**Q2: What is Mongoose and what advantages does it offer over native MongoDB driver?**  
*Answer:* Mongoose is an Object Data Modeling (ODM) library for MongoDB. It provides strict schema validation, type casting, pre/post middleware hooks, and query helper methods that enforce data integrity within application code.

**Q3: Explain the role of `CORS` in full-stack web development.**  
*Answer:* Cross-Origin Resource Sharing (CORS) is a browser security mechanism that blocks web pages from making requests to a different domain, port, or protocol than the one serving the web page, unless the server explicitly sends `Access-Control-Allow-Origin` headers.

**Q4: How does MongoDB handle document identification?**  
*Answer:* MongoDB automatically generates a unique 12-byte identifier field named `_id` (an `ObjectId`) consisting of a 4-byte timestamp, 5-byte random value, and 3-byte incrementing counter, ensuring global uniqueness across distributed systems.

---

## 9. 🏁 Conclusion
A full-stack web application connecting **React.js** with **MongoDB** via an Express REST API was successfully implemented for **HealthPulse**. Real-time CRUD capabilities, schema validation, and database status monitoring were comprehensively validated.
