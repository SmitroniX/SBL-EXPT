# Experiment 02: Password Strength Indicator and Star Rating System using jQuery

## 📌 Student Details
- **Student Name:** Somnath Jha
- **Roll Number:** 25CE1050
- **Branch / Class:** B.Tech Computer Engineering (Sem VI)
- **Institution:** Ramrao Adik Institute of Technology (RAIT), D Y Patil Deemed to be University
- **Subject:** Skill Based Lab - Advanced Web Technology (SBL-AWT)

---

## 1. 🎯 Aim
To develop a responsive, real-time client-side application featuring:
1. An animated **Developer Password Strength Indicator** with live security rule checklist evaluation.
2. An interactive 5-star **Hardware Product Review Rating System** with hover preview and submission persistence using jQuery.

---

## 2. ⚡ Problem Statement
**TechVault Developer Credential Security & Customer Product Reviews:**
Hardware procurement portals contain sensitive business billing info and high-value orders. Developer master accounts must enforce strict entropy rules to defeat dictionary and brute-force attacks. Concurrently, customers who purchase developer equipment (like 49" UltraWide monitors and custom rigs) require an intuitive, interactive 5-star rating widget to evaluate hardware build quality and ergonomic performance.

---

## 3. 💻 Hardware & Software Requirements
- **Hardware:** PC with 4 GB RAM minimum.
- **Software:**
  - Modern Web Browser (Chrome, Firefox, Safari, Edge)
  - Text Editor (VS Code)
  - jQuery 3.7.1 CDN

---

## 4. 📚 Theory & Core Concepts
### 4.1 jQuery Selectors & Event Loop
jQuery wraps browser DOM queries with concise syntax. By caching references (e.g. `const $pwdInput = $('#passwordInput')`), DOM lookups are minimized, guaranteeing 60fps animations.
- `$(document).ready(handler)`: Guarantees execution only after full DOM parsing.
- `on('input keyup', handler)`: Real-time listener executing on every single keystroke.
- `on('mouseenter mouseleave', handler)`: Powers hover interactions for the 5-star rating widget.

### 4.2 Security Checklist Logic
```javascript
const hasLength = val.length >= 8;
const hasLower = /[a-z]/.test(val);
const hasUpper = /[A-Z]/.test(val);
const hasNumber = /[0-9]/.test(val);
const hasSpecial = /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/.test(val);
```

| Score | Rating Category | Color Code | Fill Percentage |
| :---: | :--- | :--- | :---: |
| 0 | None | `#6b7280` (Gray) | 0% |
| 1 | Very Weak | `#ef4444` (Red) | 20% |
| 2 | Weak | `#f97316` (Orange) | 40% |
| 3 | Medium | `#eab308` (Yellow) | 60% |
| 4 | Strong | `#84cc16` (Lime) | 80% |
| 5 | Very Strong (Military Grade) | `#10b981` (Emerald) | 100% |

---

## 5. ⚙️ Algorithm / Procedure
1. Initialize HTML5 layout with dark-mode styling.
2. Module 1: Password Analyzer:
   - Capture `input keyup` events.
   - Run regular expression matches against length, upper, lower, digits, and special characters.
   - Dynamically update checklist states (`valid`/`invalid`) and swap checkmark/cross symbols.
   - Calculate score and adjust progress bar fill width and color.
   - Implement eye icon toggle to alternate input between `password` and `text`.
3. Module 2: Star Rating System:
   - Render five star spans with `data-value` attributes 1 through 5.
   - On `mouseenter`, highlight all stars $\le$ hovered value with `.hovered` class and display descriptive feedback.
   - On `mouseleave`, restore previously selected star states.
   - On `click`, lock active rating.
   - On `submit`, format verified purchase review and trigger jQuery `.fadeIn()` banner.
   - On `reset`, clear all states.

---

## 6. 🧪 Test Cases & Results

| Test Scenario | Input Data | Expected Result | Status |
| :--- | :--- | :--- | :---: |
| Short password | `tech` | 20% (Very Weak), only lowercase rule satisfied | Passed |
| Strong password | `TechVault2026` | 80% (Strong), 4 criteria satisfied | Passed |
| Complex password | `TechVault@2026!` | 100% (Military Grade), all 5 criteria satisfied | Passed |
| Star Hover | Hover 5th star | All 5 stars light up with "Exceptional (5 Stars)" text | Passed |
| Star Click | Click 4th star | Locks 4 stars with "Very Good (4 Stars)" | Passed |
| Review Submission | Click Submit | Publishes verified hardware review card via animation | Passed |

---

## 7. 📸 How to Run
```bash
cd /home/ubuntu/SBL-EXPT/Somnath_25CE1050/Expt-02-Password-Rating-jQuery
google-chrome index.html
```

---

## 8. 💡 Viva-Voce Questions & Answers

**Q1: What is the advantage of event-driven programming in jQuery?**  
*Answer:* Event-driven programming decouples UI triggers (like keystrokes or mouse clicks) from execution logic. jQuery provides a unified cross-browser event normalization model, eliminating cross-browser incompatibilities.

**Q2: How does `.data()` work in jQuery?**  
*Answer:* `$(el).data('value')` retrieves custom `data-value` HTML5 attributes from DOM elements, automatically parsing numbers and JSON objects without requiring manual `getAttribute()` calls.

**Q3: Why is jQuery preferred for quick animations over raw CSS transitions in dynamic workflows?**  
*Answer:* jQuery animation methods like `.fadeIn()`, `.slideDown()`, and `.animate()` provide convenient completion callbacks, queue management, and step hooks that integrate cleanly with conditional JavaScript logic.

---

## 9. 🏁 Conclusion
A real-time Developer Password Strength Indicator and Hardware 5-Star Review Rating System was successfully constructed using jQuery for **TechVault**. Dynamic progress animation, entropy rules, and rating persistence were verified.
