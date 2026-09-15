# Experiment 02: Password Strength Indicator and Star Rating System using jQuery

## 📌 Student Details
- **Student Name:** Asmit Jogdand
- **Roll Number:** 25CE1051
- **Branch / Class:** B.Tech Computer Engineering (Sem VI)
- **Institution:** Ramrao Adik Institute of Technology (RAIT), D Y Patil Deemed to be University
- **Subject:** Skill Based Lab - Advanced Web Technology (SBL-AWT)

---

## 1. 🎯 Aim
To build an interactive, client-side web application implementing:
1. A real-time **Password Strength Indicator** with security rule checklist verification.
2. A dynamic 5-star **Doctor Consultation Rating System** with hover preview and score persistence using jQuery.

---

## 2. 🏥 Problem Statement
**HealthPulse Staff Credential Security & Patient Care Feedback:**
Clinical administrative staff require strong, entropy-compliant passwords to protect electronic health records (EHR) under HIPAA guidelines. Concurrently, patients require an intuitive star-rating widget to submit feedback on medical consultations, doctor bedside manner, and clinical service quality.

---

## 3. 💻 Hardware & Software Requirements
- **Hardware:** PC with 4 GB RAM, dual-core processor or higher.
- **Software:**
  - Modern Web Browser (Chrome, Firefox, Safari, Edge)
  - Text Editor (VS Code)
  - jQuery Library (v3.7.1 CDN with DOM event handlers)

---

## 4. 📚 Theory & Core Concepts
### 4.1 What is jQuery?
jQuery is a fast, small, and feature-rich JavaScript library. It makes things like HTML document traversal and manipulation, event handling, animation, and Ajax much simpler with an easy-to-use API that works across a multitude of browsers.

### 4.2 Key jQuery Concepts Used
- **DOM Ready Handler:** `$(document).ready(function() { ... })` ensures code executes only after the DOM is fully constructed.
- **Event Listeners:**
  - `on('input keyup', handler)`: Listens to real-time text input in the password field.
  - `on('mouseenter mouseleave', handler)`: Implements fluid star hover previews.
  - `on('click', handler)`: Locks the chosen rating and toggles password visibility.
- **DOM Manipulation & CSS Class Toggling:**
  - `addClass()` and `removeClass()` dynamically update checklist states (`valid` vs `invalid`).
  - `css({ width: '...', backgroundColor: '...' })` updates progress bar metrics smoothly.
- **Animation:** `fadeIn(400)` and `fadeOut(200)` provide smooth visual transitions upon submission.

### 4.3 Password Entropy & Scoring Algorithm
The password scoring algorithm tests five distinct conditions:
1. **Length:** Minimum 8 characters (`val.length >= 8`)
2. **Lowercase:** `/[a-z]/.test(val)`
3. **Uppercase:** `/[A-Z]/.test(val)`
4. **Numeric Digit:** `/[0-9]/.test(val)`
5. **Special Character:** `/[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/.test(val)`

| Score | Rating Category | Color Code | Fill Percentage |
| :---: | :--- | :--- | :---: |
| 0 | None | `#64748b` (Gray) | 0% |
| 1 | Very Weak | `#ef4444` (Red) | 20% |
| 2 | Weak | `#f97316` (Orange) | 40% |
| 3 | Medium | `#eab308` (Yellow) | 60% |
| 4 | Strong | `#84cc16` (Lime) | 80% |
| 5 | Very Strong (Secure) | `#10b981` (Emerald) | 100% |

---

## 5. ⚙️ Algorithm / Procedure
### Part A: Password Strength Analyzer
1. Attach `input keyup` event listener to `#passwordInput`.
2. Retrieve current value and test against the 5 regex criteria.
3. For each rule, dynamically toggle `.valid` or `.invalid` class and swap `✓` / `✕` icons.
4. Calculate aggregate score ($0 \le score \le 5$).
5. Dynamically animate progress bar width and update background color and descriptive label.
6. Toggle password mask (`type="password"` $\leftrightarrow$ `type="text"`) via `#togglePasswordBtn`.

### Part B: Star Rating System
1. Render five star spans with `data-value="1"` to `data-value="5"`.
2. On `mouseenter` of a star, highlight all stars $\le$ hovered star value with class `.hovered` and display descriptive preview text.
3. On `mouseleave` of the container, remove `.hovered` and restore the permanently selected score (or default prompt).
4. On `click`, persist `selectedRating = data-value` and mark stars with class `.active`.
5. On clicking `Submit Doctor Review`, validate that a rating was chosen, format review details, and display the result banner using jQuery `.fadeIn()`.
6. On clicking `Reset`, clear all selections and hide banners.

---

## 6. 🧪 Test Cases & Results

| Test Scenario | Input Data | Expected Output | Status |
| :--- | :--- | :--- | :---: |
| Short lowercase | `health` | 20% (Very Weak), only Lowercase rule checked | Passed |
| Medium Complexity | `Health12` | 80% (Strong), 4 rules checked | Passed |
| Full Complexity | `Health@2026!` | 100% (Very Strong), all 5 rules checked | Passed |
| Toggle Visibility | Click eye icon | Password characters unmasked | Passed |
| Hover on Star 4 | Hover 4th star | First 4 stars light up in amber, label shows "Very Good" | Passed |
| Click Star 5 | Click 5th star | All 5 stars locked active, score shows "Exceptional (5 Stars)" | Passed |
| Submit without rating | No stars clicked | Alert prompt requesting rating selection | Passed |

---

## 7. 📸 How to Run
1. Navigate to the experiment directory:
   ```bash
   cd /home/ubuntu/SBL-EXPT/Asmit_25CE1051/Expt-02-Password-Rating-jQuery
   ```
2. Open `index.html` in your web browser:
   ```bash
   google-chrome index.html
   ```

---

## 8. 💡 Viva-Voce Questions & Answers

**Q1: What is the advantage of jQuery over vanilla JavaScript for DOM manipulation?**  
*Answer:* jQuery simplifies cross-browser compatibility, provides concise syntax for selecting elements (e.g. `$('#id')`), chains multiple actions, and offers built-in animation methods (`fadeIn`, `slideDown`) with fewer lines of code.

**Q2: How does event delegation work in jQuery?**  
*Answer:* Event delegation allows an event handler to be attached to a parent element, listening for events bubbling up from child elements (e.g. `$(parent).on('click', '.child', handler)`). This is especially useful for dynamically added elements.

**Q3: Why is password strength indicated in real-time on `input` rather than on `change`?**  
*Answer:* The `change` event only fires after the input loses focus (blur), whereas `input` and `keyup` fire on every keystroke, providing instantaneous feedback to guide the user as they type.

**Q4: How does the star rating hover preview separate from the locked selection?**  
*Answer:* Two CSS classes are used: `.hovered` during temporary mouse movement, and `.active` for the permanently selected rating. On `mouseleave`, all `.hovered` classes are stripped and only `.active` stars remain highlighted.

---

## 9. 🏁 Conclusion
An interactive Password Strength Indicator and Doctor Star Rating System was successfully constructed using jQuery for the **HealthPulse** portal, fulfilling all real-time visual feedback and event handling requirements.
