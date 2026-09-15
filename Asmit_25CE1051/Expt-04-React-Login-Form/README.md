# Experiment 04: Create a Simple Login Form using React.js

## 📌 Student Details
- **Student Name:** Asmit Jogdand
- **Roll Number:** 25CE1051
- **Branch / Class:** B.Tech Computer Engineering (Sem VI)
- **Institution:** Ramrao Adik Institute of Technology (RAIT), D Y Patil Deemed to be University
- **Subject:** Skill Based Lab - Advanced Web Technology (SBL-AWT)

---

## 1. 🎯 Aim
To build a secure, validated, and interactive authentication login portal using **React.js**, employing controlled form components, `useState` hooks, synthetic event handling, client-side validation logic, and conditional view rendering.

---

## 2. 🏥 Problem Statement
**HealthPulse Secure Clinical Authentication:**
HealthPulse requires a unified login interface catering to multiple roles (Patients, Doctors, and Hospital Administrators). The form must prevent invalid submissions with real-time error messages, allow password visibility toggling, provide "Remember Me" credential persistence simulation, display loading states during authentication, and transition into an active user session dashboard upon successful verification.

---

## 3. 💻 Hardware & Software Requirements
- **Hardware:** Standard PC (4 GB RAM minimum).
- **Software:**
  - Modern Web Browser (Google Chrome / Brave / Firefox)
  - Text Editor (VS Code)
  - React 18, ReactDOM 18, Babel Standalone

---

## 4. 📚 Theory & Core Concepts
### 4.1 Controlled Components in React
In HTML, form elements like `<input>` maintain their own state. In React, mutable state is kept in the component's state property and updated exclusively via `setState` (or `useState`). An input element whose value is controlled by React in this way is called a **Controlled Component**:
```jsx
<input
    value={identifier}
    onChange={(e) => setIdentifier(e.target.value)}
/>
```
Benefits of controlled inputs include instant field validation, dynamic format masking, and conditional button enablement.

### 4.2 Synthetic Events in React
React normalizes browser events across all platforms into cross-browser `SyntheticEvent` wrappers. `e.preventDefault()` prevents native browser page reloads during form submission, delegating handling to React state.

### 4.3 Key State Variables Implemented
- `role`: Tracks the active user persona (`Patient` | `Doctor` | `Admin`).
- `identifier`: Controlled state for Email address or 10-digit phone.
- `password`: Controlled state for user credential string.
- `showPassword`: Boolean state toggling masked password characters.
- `errors`: Object containing field-specific validation fault messages.
- `isLoading`: Boolean flag triggering an asynchronous loading indicator.
- `loggedInUser`: Object storing the authenticated user session (null when logged out).

---

## 5. ⚙️ Algorithm / Procedure
1. Initialize controlled states for `role`, `identifier`, `password`, `rememberMe`, `showPassword`, `errors`, `isLoading`, and `loggedInUser`.
2. Construct UI layout containing role tabs, identifier input, password input with eye icon, and submit button.
3. On user input change, update respective state via `onChange`.
4. On `onSubmit`, invoke `validate()`:
   - Check if `identifier` matches standard email format (`/^[^\s@]+@[^\s@]+\.[^\s@]+$/`) or Indian 10-digit phone regex (`/^[6-9][0-9]{9}$/`).
   - Verify that `password` length $\ge$ 6 characters.
5. If validation errors exist, populate `errors` state to display inline warning banners.
6. If valid, set `isLoading = true` and simulate an asynchronous network delay (`setTimeout`).
7. Transition UI conditionally from the Login Form into the Patient / Clinical Session Dashboard.
8. Implement `handleLogout` to reset session state back to unauthenticated login.

---

## 6. 🧪 Validation & Test Cases

| Test Case | Entered Identifier | Entered Password | Expected Outcome | Status |
| :--- | :--- | :--- | :--- | :---: |
| Empty Submission | *Empty* | *Empty* | Error: "Email or Mobile Number is required" & "Password is required" | Passed |
| Invalid Email Format | `asmit.health` | `secret123` | Error: "Enter a valid Email or 10-digit Phone" | Passed |
| Short Password | `patient@healthpulse.com` | `123` | Error: "Password must be at least 6 characters" | Passed |
| Password Visibility | Valid Input | Click 👁️ icon | Toggles input type between `password` and `text` | Passed |
| Role Switch | Click 'Doctor' tab | Active state changes | Role updates to Doctor with custom placeholder | Passed |
| Valid Submission | `asmit.patient@healthpulse.com` | `HealthPass@123` | Shows loading spinner then transitions to Authenticated Dashboard | Passed |
| Sign Out Action | Click "Sign Out of Session" | - | Clears session and returns to login form | Passed |

---

## 7. 📸 How to Run
1. Navigate to the directory:
   ```bash
   cd /home/ubuntu/SBL-EXPT/Asmit_25CE1051/Expt-04-React-Login-Form
   ```
2. Open `index.html` in your browser:
   ```bash
   google-chrome index.html
   ```

---

## 8. 💡 Viva-Voce Questions & Answers

**Q1: What is the primary difference between Controlled and Uncontrolled components?**  
*Answer:* In Controlled components, form data is handled by React state (`useState`), giving React single-source-of-truth control over the values. In Uncontrolled components, form data is handled directly by the DOM itself and accessed using React refs (`useRef()`).

**Q2: Why is `e.preventDefault()` essential during form submission in React?**  
*Answer:* In standard HTML forms, submitting triggers a page refresh and sends an HTTP POST/GET request. `e.preventDefault()` stops this default behavior, allowing client-side React code to validate inputs and transmit data asynchronously via Fetch/Axios.

**Q3: How is conditional rendering implemented in this experiment?**  
*Answer:* Using a ternary JavaScript expression inside JSX (`{!loggedInUser ? <LoginForm /> : <DashboardView />}`). When `loggedInUser` is null, the login card is rendered; once populated, the Dashboard view is displayed.

**Q4: How can client-side passwords be securely transmitted in production?**  
*Answer:* Passwords must always be transmitted over HTTPS (TLS/SSL encryption) so they cannot be intercepted in transit. On the server, passwords must never be stored in plain text, but hashed using salted cryptographic algorithms like `bcrypt` or `argon2`.

---

## 9. 🏁 Conclusion
A validated, multi-role Patient & Practitioner Login Portal was successfully developed using **React.js** for the **HealthPulse** platform. Controlled inputs, synthetic events, error handling, and session state toggles were comprehensively implemented.
