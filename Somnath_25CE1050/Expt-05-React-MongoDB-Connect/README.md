# Experiment 05: Connecting Your React.js Project with MongoDB

## 📌 Student Details
- **Student Name:** Somnath Jha
- **Roll Number:** 25CE1050
- **Branch / Class:** B.Tech Computer Engineering (Sem VI)
- **Institution:** Ramrao Adik Institute of Technology (RAIT), D Y Patil Deemed to be University
- **Subject:** Skill Based Lab - Advanced Web Technology (SBL-AWT)

---

## 1. 🎯 Aim
To connect a **React.js** front-end user interface with a **MongoDB** NoSQL database via an intermediate **Node.js & Express.js** REST API using **Mongoose ODM**, implementing end-to-end CRUD operations for e-commerce hardware orders.

---

## 2. ⚡ Problem Statement
**TechVault Hardware Inventory & Order Dispatch Synchronization:**
Create a full-stack MERN application where developers and enterprise buyers can order equipment (displays, GPUs, workstations) and track dispatch status. The React client must send asynchronous HTTP requests to Express endpoints, storing structured orders in MongoDB via Mongoose schemas while maintaining live connection state telemetry.

---

## 3. 💻 Hardware & Software Requirements
- **Hardware:** PC with 4 GB RAM minimum.
- **Software:**
  - Node.js (v18+)
  - Express.js (`^4.19.2`), Mongoose (`^8.4.0`), CORS
  - MongoDB (local instance or MongoDB Atlas)
  - Modern Web Browser

---

## 4. 📚 Theory & Architecture
```
[ React Client UI ] <==== HTTP / JSON ====> [ Express Server ] <==== TCP / BSON ====> [ MongoDB ]
  (Port 5001)                                 (REST API)                                (techvault_db)
```

### 4.1 Schema Modeling
```javascript
const orderSchema = new mongoose.Schema({
    customerName: { type: String, required: true, trim: true },
    productTitle: { type: String, required: true },
    category: { type: String, required: true },
    unitPrice: { type: Number, required: true },
    quantity: { type: Number, default: 1 },
    shippingCity: { type: String, required: true },
    dispatchStatus: { type: String, default: 'Confirmed' },
    createdAt: { type: Date, default: Date.now }
});
```

---

## 5. ⚙️ Algorithm / Procedure
1. Create Express server listening on designated port (`PORT 5001`).
2. Establish Mongoose connection with timeout fallback.
3. Expose REST endpoints:
   - `GET /api/status`: Connection state.
   - `GET /api/orders`: Query orders list.
   - `POST /api/orders`: Insert order into MongoDB.
   - `DELETE /api/orders/:id`: Remove document by ID.
4. Build React client featuring order creation form and dynamic orders table.
5. Trigger `fetchData()` in `useEffect` on component mount and following mutations.
6. Verify live synchronization between front-end actions and database persistence.

---

## 6. 🧪 Test Cases & Results

| HTTP Method | Route | Payload | Expected Outcome | Status |
| :--- | :--- | :--- | :--- | :---: |
| `GET` | `/api/status` | None | `{ mongoConnected: true, storageEngine: "MongoDB..." }` | Passed |
| `GET` | `/api/orders` | None | `HTTP 200` with JSON array of active dispatches | Passed |
| `POST` | `/api/orders` | Valid hardware data | `HTTP 201 Created` with generated MongoDB `_id` | Passed |
| `DELETE` | `/api/orders/:id` | Valid document ID | `HTTP 200 OK: "Order removed"` | Passed |

---

## 7. 📸 How to Run
```bash
cd /home/ubuntu/SBL-EXPT/Somnath_25CE1050/Expt-05-React-MongoDB-Connect
npm install
node server.js
# Access in browser: http://localhost:5001
```

---

## 8. 💡 Viva-Voce Questions & Answers

**Q1: What is the purpose of Object Data Modeling (ODM) in MongoDB?**  
*Answer:* MongoDB is schema-less by nature. An ODM like Mongoose enforces strict application-level schemas, validates data types, defines hooks/middleware, and provides type-casting, ensuring consistency across documents.

**Q2: What is the difference between SQL tables and MongoDB collections?**  
*Answer:* SQL tables store structured rows conforming to rigid relational schemas with foreign keys. MongoDB collections store flexible, semi-structured BSON (Binary JSON) documents that can have varied attributes and nested sub-documents without migrations.

**Q3: How does React's `useEffect` hook manage asynchronous API data loading?**  
*Answer:* `useEffect` runs side effects after the component renders. Passing an empty dependency array (`[]`) guarantees the fetch executes exactly once upon mount, preventing infinite re-render loops.

---

## 9. 🏁 Conclusion
A full-stack web application connecting **React.js** with **MongoDB** via Express was engineered for **TechVault**. Order creation, database synchronization, and deletion actions were successfully executed.
