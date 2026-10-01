# Experiment 04: Input & Output Manual
## Create a Simple Login Form using React.js

---

### 👨‍🎓 Student & Laboratory Credentials
- **Student Name:** Asmit Jogdand
- **Roll Number:** `25CE1051`
- **Class / Division:** B.Tech Computer Engineering (Sem VI)
- **Academic Year:** 2026 – 2027
- **Course:** Skill Based Lab - Advanced Web Technology (SBL-AWT)
- **Institution:** Ramrao Adik Institute of Technology (RAIT), D Y Patil Deemed to be University, Nerul, Navi Mumbai
- **Problem Statement Domain:** **HealthPulse — Digital Healthcare & Clinical Management Portal**
- **Experiment Title:** Create a Simple Login Form using React.js

---

## 1. 🎯 Experiment Aim
To develop a secure, multi-role authentication portal using **React.js** (React 18), utilizing controlled form components, real-time client-side validation, role state transitions, simulated asynchronous authentication latency, and conditional rendering to a protected Clinical Session Dashboard.

---

## 2. 📥 Input Specification

### 2.1 File System Input

| File Name | Format | Role & Implementation Responsibility |
| :--- | :--- | :--- |
| `index.html` | React 18 (Babel Standalone) | Single Page Application containing controlled form inputs, multi-role state machine, simulated JWT session generator, and responsive CSS3 theme. |
| `package.json` | JSON | Project descriptors, author details, and run configurations. |

### 2.2 Execution Command Input

```bash
# Navigate to experiment directory
cd /home/ubuntu/SBL-EXPT/Asmit_25CE1051/Expt-04-React-Login-Form

# Open in browser directly
chromium-browser index.html

# Or serve via local server
npx serve .
```

### 2.3 Controlled State Machine Input Variables

```
+----------------------------------------------------------------------------------------------------+
| STATE VARIABLE      | TYPE    | INITIAL VALUE | DESCRIPTION / REACT HOOK ROLE                      |
+----------------------------------------------------------------------------------------------------+
| activeRole          | string  | 'Patient'     | Active tab: 'Patient' | 'Doctor' | 'Admin'          |
| identifier          | string  | ''            | Controlled input for Patient Email or 10-digit Phone|
| password            | string  | ''            | Controlled input for Account Secret Key / Password |
| showPassword        | boolean | false         | Toggles input type ('password' <-> 'text')          |
| isLoading           | boolean | false         | Latency simulation flag triggering loading spinner |
| errorMessage        | string  | ''            | Stores client-side validation error message banner |
| isAuthenticated     | boolean | false         | Gates conditional rendering of authenticated screen|
| currentUser         | object  | null          | Persists user identity and session security token  |
+----------------------------------------------------------------------------------------------------+
```

### 2.4 User Roles & Default Test Profiles (Input Data)

| Role Name | Test Username / Identifier | Test Password | Access Scope Granted |
| :--- | :--- | :--- | :--- |
| **👤 Patient** | `patient@healthpulse.org` | `Patient@1234` | Health Records, OPD Prescriptions, Appointments |
| **👨‍⚕️ Doctor** | `dr.vidhate@healthpulse.org` | `Doctor@5678` | Patient Consultations Queue, E-Prescriptions |
| **🛡️ Admin** | `admin@healthpulse.org` | `Admin@9999` | Server Diagnostics, User Management, Audit Logs |

### 2.5 Validation Input Constraints
- **Identifier:** Must be a valid email (`/^[^\s@]+@[^\s@]+\.[^\s@]+$/`) OR a valid 10-digit phone number (`/^[6-9]\d{9}$/`).
- **Password:** Must be at least 6 characters in length (`password.length >= 6`).

---

## 3. 📤 Output Specification

### 3.1 Graphical User Interface Output Representation (Login State)

```
+----------------------------------------------------------------------------------------------------+
|  [HealthPulse Portal]  SBL - Advanced Web Technology (Sem VI)          Student: Asmit (25CE1051)   |
+----------------------------------------------------------------------------------------------------+
|                                                                                                    |
|                                    🔐 HEALTHPULSE CLINICAL ACCESS                                  |
|                            Secure Electronic Health Records (EHR) Authentication                   |
|                                                                                                    |
|          +------------------------------------------------------------------------------+          |
|          | Switch Role:   [ (•) 👤 Patient ]    [ 👨‍⚕️ Doctor ]    [ 🛡️ Clinical Admin ]     |          |
|          +------------------------------------------------------------------------------+          |
|                                                                                                    |
|          Patient Email or Registered 10-Digit Mobile:                                              |
|          [ patient@healthpulse.org                                                    ]            |
|                                                                                                    |
|          Account Password:                                                                         |
|          [ ••••••••••••••••                                            ] [👁️ Show]                |
|                                                                                                    |
|          [ Fill Patient Demo ]    [ Fill Doctor Demo ]    [ Fill Admin Demo ]                      |
|                                                                                                    |
|          +------------------------------------------------------------------------------+          |
|          |                     [ 🚀 Sign In to Patient Portal ]                         |          |
|          +------------------------------------------------------------------------------+          |
+----------------------------------------------------------------------------------------------------+
```

### 3.2 Authenticated Dashboard Output Representation (Conditional Rendering)

Upon successful credential validation and simulated 600ms latency, `isAuthenticated` toggles to `true`. React unmounts the login card and dynamically mounts the **Protected Clinical Session Dashboard**:

```
+----------------------------------------------------------------------------------------------------+
|  ✅ HEALTHPULSE CLINICAL SESSION DASHBOARD                           Session ID: hp_jwt_77a91bf2    |
+----------------------------------------------------------------------------------------------------+
|  Welcome back, Asmit Jogdand!               Role: [ 👤 PATIENT PORTAL ACCESS ]                     |
|  Active Medical ID: HP-2026-9921            Authenticated At: 2026-10-01 10:25:00 IST             |
+----------------------------------------------------------------------------------------------------+
|                                                                                                    |
|  +-- Quick Clinical Actions --------------------------------------------------------------------+  |
|  |  [ 📄 View Lab Reports ]     [ 💊 Active Prescriptions ]     [ 📅 Upcoming Consultations ]  |  |
|  +----------------------------------------------------------------------------------------------+  |
|                                                                                                    |
|  +-- Session Security Telemetry ----------------------------------------------------------------+  |
|  |  • Protocol:          Encrypted Session (SHA-256 HMAC Token)                                 |  |
|  |  • Client IP:         127.0.0.1 (Local Verified Interface)                                   |  |
|  |  • Session Timeout:   Valid for 30 minutes                                                   |  |
|  +----------------------------------------------------------------------------------------------+  |
|                                                                                                    |
|                                 [ 🔒 Sign Out of Clinical Session ]                                |
+----------------------------------------------------------------------------------------------------+
```

### 3.3 Test Case Execution Results

| Test Scenario | Injected Input State | React Component & Validation Logic | Rendered UI Output Observed | Status |
| :--- | :--- | :--- | :--- | :---: |
| **Empty Inputs** | Identifier: `""`, Pass: `""` | Intercepted in `handleSubmit()` | Red alert: *"Please enter your email or phone number"* | **PASS** |
| **Malformed Phone**| Identifier: `9820` | Regex fails email & 10-digit phone | Red alert: *"Please enter a valid email or 10-digit number"* | **PASS** |
| **Short Password** | Pass: `abc` (3 chars) | Evaluates `password.length < 6` | Red alert: *"Password must be at least 6 characters"* | **PASS** |
| **Password Unmask**| Click `[👁️ Show]` | State `showPassword` toggled `true` | Input type changes to `text`; characters visible | **PASS** |
| **Role Switching** | Click `[👨‍⚕️ Doctor]` | Updates `activeRole = 'Doctor'` | Active tab pill highlights blue, login button updates text | **PASS** |
| **1-Click Profile**| Click `"Fill Patient Demo"` | Auto-populates credentials in state | Identifier and password inputs instantly populate | **PASS** |
| **Loading State**  | Submit valid credentials | Sets `isLoading = true` | Button displays spinner: *"Authenticating Session..."* | **PASS** |
| **Auth Transition**| Latency completes (600ms)| Sets `isAuthenticated = true` | Login form unmounts; Clinical Dashboard renders | **PASS** |
| **Session Logout** | Click `"Sign Out"` | Resets `isAuthenticated = false` | State cleared; returns cleanly to pristine Login Form | **PASS** |

---

## 4. 🏁 Conclusion & Verification
Experiment 04 was completed successfully. React controlled inputs synchronized DOM values directly with state hooks, client validation prevented erroneous payloads, and conditional rendering provided a secure, seamless transition between unauthenticated and protected healthcare portal views.
