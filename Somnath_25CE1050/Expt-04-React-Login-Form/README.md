# Experiment 04: Create a Simple Login Form using React.js

## 📌 Student Details
- **Student Name:** Somnath Jha
- **Roll Number:** 25CE1050
- **Branch / Class:** B.Tech Computer Engineering (Sem VI)
- **Institution:** Ramrao Adik Institute of Technology (RAIT), D Y Patil Deemed to be University
- **Subject:** Skill Based Lab - Advanced Web Technology (SBL-AWT)

---

## 1. 🎯 Aim
To develop an authenticated, client-validated Single Sign-On (SSO) login portal using **React.js**, employing controlled inputs (`useState`), error state mapping, password visibility toggling, multi-role profile switching, asynchronous network simulation, and conditional dashboard rendering.

---

## 2. ⚡ Problem Statement
**TechVault Developer Command Authentication:**
Hardware engineers, enterprise buyers, and store administrators require a unified authentication interface to access procurement histories, equipment warranty certificates, and custom PC configuration builds. The portal must prevent empty or malformed inputs, provide real-time field-level error messages, show/hide passwords, simulate authentication latency, and transition into an active Developer Dashboard upon validation.

---

## 3. 💻 Hardware & Software Requirements
- **Hardware:** Standard PC with 4 GB RAM minimum.
- **Software:**
  - Modern Web Browser (Google Chrome / Brave / Firefox)
  - React 18 & Babel Standalone CDN
  - Text Editor (VS Code)

---

## 4. 📚 Theory & Core Concepts
### 4.1 Controlled Inputs Architecture
In React, form inputs do not maintain their own DOM value; their value is bound directly to React state:
```jsx
<input
    value={identifier}
    onChange={(e) => setIdentifier(e.target.value)}
    className={errors.identifier ? 'has-error' : ''}
/>
```
This enables synchronous validation and ensures that React acts as the single source of truth.

### 4.2 State Machine Representation
```
[ Unauthenticated Login Form ]
         |
    (Submit Action)
         v
  [ Validating Inputs ]
      /          \
  (Errors)     (Valid)
    v             v
[ Inline Alert ] [ Authenticating Spinner ]
                       v
            [ Authenticated Dashboard ]
                       v
                (Sign Out Action)
                       v
           [ Unauthenticated Login Form ]
```

---

## 5. ⚙️ Algorithm / Procedure
1. Create state hooks for `role`, `identifier`, `password`, `rememberMe`, `showPassword`, `errors`, `isLoading`, and `loggedInUser`.
2. Construct dark-mode login card with persona tabs (Developer, Enterprise Buyer, Admin).
3. Bind inputs to state variables with `onChange`.
4. Validate inputs on submit:
   - Check if `identifier` matches standard email format (`/^[^\s@]+@[^\s@]+\.[^\s@]+$/`) or 10-digit phone regex (`/^[6-9][0-9]{9}$/`).
   - Check if `password.length >= 6`.
5. On error, populate `errors` dictionary and render warning messages.
6. On success, toggle `isLoading = true`, simulate network handshake (`setTimeout`), and populate `loggedInUser`.
7. Conditionally render the Developer Command Center view.
8. Implement `handleLogout` to reset session back to unauthenticated login.

---

## 6. 🧪 Test Cases & Results

| Test Scenario | Input Data | Expected Result | Status |
| :--- | :--- | :--- | :---: |
| Blank Submission | No inputs | Displays: "Work Email or Developer ID is required" & "Password is required" | Passed |
| Invalid Email | `somnath.tech` | Displays: "Enter a valid Email format or 10-digit Phone" | Passed |
| Short Password | `pass` | Displays: "Password must contain at least 6 characters" | Passed |
| Toggle Password | Click 👁️ icon | Toggles input type between `password` and `text` | Passed |
| Valid Credentials| `somnath.dev@techvault.io` | Displays loading spinner then renders Developer Dashboard | Passed |
| Terminate Session| Click "Terminate Session" | Resets state and returns to login form | Passed |

---

## 7. 📸 How to Run
```bash
cd /home/ubuntu/SBL-EXPT/Somnath_25CE1050/Expt-04-React-Login-Form
google-chrome index.html
```

---

## 8. 💡 Viva-Voce Questions & Answers

**Q1: What is the significance of the `key` attribute in lists?**  
*Answer:* The `key` attribute helps React identify which items have changed, been added, or been removed, allowing optimal DOM updates during Virtual DOM reconciliation.

**Q2: What is the benefit of simulating async loading with `setTimeout`?**  
*Answer:* In real-world applications, API requests take time to resolve. Simulating latency allows frontend developers to test loading states, disable buttons to prevent duplicate submissions, and verify spinner transitions before integrating with backend APIs.

**Q3: How does React handle Cross-Site Scripting (XSS) in inputs?**  
*Answer:* React automatically escapes strings before rendering them in JSX. Unless explicitly bypassed using `dangerouslySetInnerHTML`, all content is treated as literal strings, neutralizing injected HTML and script tags.

---

## 9. 🏁 Conclusion
A validated Developer & Corporate Login Portal was developed using **React.js** for **TechVault**. Controlled component inputs, synthetic events, error feedback, and conditional view transitions were successfully validated.
