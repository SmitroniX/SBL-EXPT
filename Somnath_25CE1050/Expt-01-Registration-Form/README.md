# Experiment 01: Design a Registration Form using HTML5 and CSS3

## 📌 Student Details
- **Student Name:** Somnath Jha
- **Roll Number:** 25CE1050
- **Branch / Class:** B.Tech Computer Engineering (Sem VI)
- **Institution:** Ramrao Adik Institute of Technology (RAIT), D Y Patil Deemed to be University
- **Subject:** Skill Based Lab - Advanced Web Technology (SBL-AWT)

---

## 1. 🎯 Aim
To design and build an enterprise-grade Developer & Corporate Hardware Procurement Registration Form using semantic HTML5 elements and modern CSS3 dark-mode styling based on the **TechVault** e-commerce problem statement.

---

## 2. ⚡ Problem Statement
**TechVault Developer Hardware Hub:**
TechVault requires an authenticated, client-validated portal where software engineers, studio architects, and university laboratories can register corporate profiles, declare technical tracks (AI, Web, Embedded, Cloud), select preferred hardware procurement categories (Workstations, GPU Accelerators, OLED Displays), provide optional Indian GSTIN tax identifiers, upload business accreditation documents, and configure master portal security credentials.

---

## 3. 💻 Hardware & Software Requirements
- **Hardware:** Standard PC with 4 GB RAM minimum.
- **Software:**
  - Modern Web Browser (Google Chrome / Brave / Firefox)
  - Visual Studio Code or text editor
  - Operating System: Linux / Windows / macOS

---

## 4. 📚 Theory & Core Concepts
### 4.1 HTML5 Semantic Elements & Attributes
- `<form>`: Interactive container executing client-side constraint checking.
- `<fieldset>` & `<legend>`: Partition forms into logical sections (Organization Identity, Hardware Preferences, Master Credentials) ensuring web accessibility (a11y).
- `<input>` types & constraints:
  - `type="email"`: RFC 5322 email syntax validation.
  - `type="tel"` + `pattern="[6-9][0-9]{9}"`: Enforces valid 10-digit Indian cellular format.
  - `type="text"` + `pattern="^[0-9]{2}[A-Z]{5}[0-9]{4}[A-Z]{1}[1-9A-Z]{1}Z[0-9A-Z]{1}$"`: Strict regex for Indian 15-character GSTIN tax validation.
  - `type="password"`: Masked input ensuring credential confidentiality.
  - `type="file"`: File upload restricted by `accept=".pdf,.png,.jpg,.jpeg"`.

### 4.2 CSS3 Dark Mode & Layout Concepts
- **CSS Custom Properties (`:root`):** Centralizes dark-mode color palettes (indigo, purple, deep slate).
- **CSS Grid (2-Column Responsive):** Aligns inputs symmetrically on desktop viewports and auto-reflows to single-column on mobile screens (`@media (max-width: 680px)`).
- **Pseudo-classes (`:valid`, `:invalid`, `:focus`):** Provide instantaneous visual indicators during keystrokes.

---

## 5. ⚙️ Algorithm / Procedure
1. Initialize `index.html`, `style.css`, and `script.js`.
2. Construct three semantic fieldsets with captions: Developer Demographics, Hardware Preferences, Account Security.
3. Apply HTML5 constraint validation attributes (`required`, `pattern`, `minlength`).
4. Design a dark-mode CSS3 theme with glowing focus states and glassmorphism.
5. In `script.js`, attach real-time password comparison and construct a dynamic registration summary modal upon successful form validation.
6. Verify layout responsiveness across desktop, tablet, and mobile displays.

---

## 6. 🧪 Test Cases & Validation Rules

| Field Name | Test Input | Expected Behavior | Status |
| :--- | :--- | :--- | :---: |
| Full Name | `1234` | Rejected: regex `^[a-zA-Z\s]+$` requires letters only | Passed |
| Mobile Phone | `912345` | Rejected: regex requires 10 digits starting with 6-9 | Passed |
| Email Address | `somnath.dev` | Rejected: missing `@` domain | Passed |
| GSTIN Format | `INVALID_GST` | Rejected: regex strictly enforces 15-character GST format | Passed |
| Passwords Mismatch| Non-matching inputs | Blocked: inline error "Passwords do not match!" | Passed |
| Valid Data | Complete valid profile | Displays Account Enrolled Modal Summary | Passed |

---

## 7. 📸 How to Run
```bash
cd /home/ubuntu/SBL-EXPT/Somnath_25CE1050/Expt-01-Registration-Form
google-chrome index.html
```

---

## 8. 💡 Viva-Voce Questions & Answers

**Q1: What is the benefit of HTML5 form validation over legacy JavaScript-only validation?**  
*Answer:* HTML5 form validation is built natively into browser rendering engines, executing faster, functioning even if scripts fail to load, and providing standard localized tooltips without custom scripting overhead.

**Q2: What is the significance of the `novalidate` attribute on a `<form>` tag?**  
*Answer:* It suppresses the browser's default validation balloon tooltips, allowing custom JavaScript validation logic (`form.checkValidity()`, `reportValidity()`) to control error handling and UI presentation.

**Q3: How does CSS `:not(:placeholder-shown)` improve UX?**  
*Answer:* It prevents empty, untouched form inputs from immediately turning red (invalid) before the user has even begun typing, only showing error states once the user interacts with the field.

---

## 9. 🏁 Conclusion
A responsive Developer Account & Hardware Procurement Registration Form was successfully constructed using HTML5 and CSS3 for **TechVault**. Semantic tags, strict regex validation, and interactive feedback were verified.
