# Experiment 01: Design a Registration Form using HTML5 and CSS3

## 📌 Student Details
- **Student Name:** Asmit Jogdand
- **Roll Number:** 25CE1051
- **Branch / Class:** B.Tech Computer Engineering (Sem VI)
- **Institution:** Ramrao Adik Institute of Technology (RAIT), D Y Patil Deemed to be University
- **Subject:** Skill Based Lab - Advanced Web Technology (SBL-AWT)

---

## 1. 🎯 Aim
To design and implement a modern, fully responsive, and accessible Patient Health Profile Registration Form using semantic HTML5 elements and advanced CSS3 styling based on a real-world healthcare portal problem statement.

---

## 2. 🏥 Problem Statement
**HealthPulse Digital Clinic System:**
Healthcare providers require an automated, error-free online enrollment portal where new patients can securely register their demographic details, contact information, emergency blood group, medical history, pre-existing chronic conditions, and insurance policy credentials while adhering to patient privacy guidelines. The portal must enforce strict client-side validation before submission.

---

## 3. 💻 Hardware & Software Requirements
- **Hardware:**
  - Standard Personal Computer (Intel Core i3/i5 or equivalent)
  - 4 GB RAM minimum
- **Software:**
  - Modern Web Browser (Google Chrome / Mozilla Firefox / Microsoft Edge)
  - Visual Studio Code or any modern text editor
  - Operating System: Linux / Windows / macOS

---

## 4. 📚 Theory & Core Concepts
### 4.1 Semantic HTML5 Elements
HTML5 introduces semantic tags that clearly describe their meaning to both the browser and the developer:
- `<form>`: Encapsulates user interactive controls for submitting information.
- `<fieldset>` and `<legend>`: Group related form fields logically (Personal, Clinical, Credentials) with accessible captions.
- `<input>` types:
  - `type="email"`: Enforces syntactic email structure (`user@domain.ext`).
  - `type="tel"`: Combined with `pattern="[6-9][0-9]{9}"` to enforce 10-digit Indian phone numbers.
  - `type="date"`: Built-in calendar picker with `max` constraint preventing future birthdates.
  - `type="password"`: Obfuscated input masked against shoulder-surfing.
  - `type="file"`: File upload restricted by `accept=".pdf,.png,.jpg,.jpeg"`.
- Attributes: `required`, `pattern`, `minlength`, `maxlength`, `placeholder`, `novalidate`.

### 4.2 Modern CSS3 Concepts
- **CSS3 Variables (`:root`):** Centralizes brand colors, typography, borders, and shadows for seamless theming.
- **CSS Grid & Flexbox:** Powers 2-column responsive layouts on desktop that automatically stack into 1-column on mobile viewports (`@media (max-width: 680px)`).
- **CSS3 Pseudo-classes:**
  - `:focus`: Emphasizes active inputs with glowing focus rings.
  - `:valid` and `:invalid`: Provides visual instant feedback on constraint satisfaction.
- **Glassmorphism & Depth:** Utilizes `backdrop-filter: blur()`, multi-layered box shadows, and smooth ease transitions (`transition: all 0.2s ease`).

---

## 5. ⚙️ Algorithm / Procedure
1. **Initialize Project:** Create `index.html`, `style.css`, and `script.js`.
2. **Structure Form:** Use semantic HTML5 layout with a header badge, three grouped fieldsets (`Personal Info`, `Medical History`, `Account Credentials`), and action buttons.
3. **Configure Validation Constraints:** Apply `required`, regular expressions (`pattern`), character length bounds, and file type filters to all mandatory fields.
4. **Style Components:** Apply CSS3 styling incorporating a deep blue clinical theme, responsive grid columns, card elevation, and validation pseudo-state indicators.
5. **Add Interactive Logic:** Implement client-side password matching verification and a dynamic modal popup summarizing patient submission data upon successful validation.
6. **Test Across Viewports:** Verify behavior on mobile, tablet, and desktop viewports.

---

## 6. 🧪 Test Cases & Validation Rules

| Field Name | Test Input | Expected Behavior | Status |
| :--- | :--- | :--- | :---: |
| Full Name | `1234` | Rejected: regex `^[a-zA-Z\s]+$` requires alphabets only | Passed |
| Date of Birth | `2030-01-01` | Rejected: `max="2026-01-01"` prevents future dates | Passed |
| Contact Phone | `98201` | Rejected: `pattern="[6-9][0-9]{9}"` enforces 10 digits starting 6-9 | Passed |
| Email Address | `asmit.care` | Rejected: browser standard email format missing `@` domain | Passed |
| Password | `password` | Rejected: regex requires 8+ chars, uppercase, digit, symbol | Passed |
| Confirm Password | Different value | Blocked with dynamic error: "Passwords do not match!" | Passed |
| Valid Data | Complete valid input | Displays Patient Enrollment Confirmation Modal | Passed |

---

## 7. 📸 How to Run
1. Navigate to the directory:
   ```bash
   cd /home/ubuntu/SBL-EXPT/Asmit_25CE1051/Expt-01-Registration-Form
   ```
2. Open `index.html` in any web browser:
   ```bash
   google-chrome index.html
   # Or using a simple server:
   npx serve .
   ```

---

## 8. 💡 Viva-Voce Questions & Answers

**Q1: What is the benefit of using semantic HTML5 elements like `<fieldset>` and `<legend>`?**  
*Answer:* Semantic elements enhance accessibility (a11y) for screen readers, provide natural grouping for assistive technologies, and give search engines clear structural meaning without depending on meaningless `<div>` tags.

**Q2: How does the HTML5 Constraint Validation API work?**  
*Answer:* HTML5 evaluates attributes such as `required`, `pattern`, `minlength`, `type="email"`, and `type="tel"`. The browser exposes properties like `element.checkValidity()` and `element.validity.valid` to query valid state and `reportValidity()` to trigger native tooltip error messages.

**Q3: Explain the difference between CSS Flexbox and CSS Grid.**  
*Answer:* Flexbox is primarily one-dimensional (row or column layout, ideal for navbars and input alignment), whereas CSS Grid is two-dimensional (simultaneous control of rows and columns, ideal for structured page cards and multi-field forms).

**Q4: How does `:valid` and `:invalid` pseudo-class styling improve UX?**  
*Answer:* They provide instant visual cues (green border for correct input, red for erroneous input) so users can rectify errors before submitting the form.

---

## 9. 🏁 Conclusion
A responsive Patient Health Profile Registration Form was designed and implemented using HTML5 and CSS3 for the **HealthPulse** portal. All validation rules, responsive layouts, and interactive feedback were verified successfully.
