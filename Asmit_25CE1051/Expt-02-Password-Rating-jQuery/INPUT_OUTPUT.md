# Experiment 02: Input & Output Manual
## Password Strength Indicator and Star Rating System using jQuery

---

### 👨‍🎓 Student & Laboratory Credentials
- **Student Name:** Asmit Jogdand
- **Roll Number:** `25CE1051`
- **Class / Division:** B.Tech Computer Engineering (Sem VI)
- **Academic Year:** 2026 – 2027
- **Course:** Skill Based Lab - Advanced Web Technology (SBL-AWT)
- **Institution:** Ramrao Adik Institute of Technology (RAIT), D Y Patil Deemed to be University, Nerul, Navi Mumbai
- **Problem Statement Domain:** **HealthPulse — Digital Healthcare & Clinical Management Portal**
- **Experiment Title:** Write a Program to Create and Build a Password Strength Indicator and Star Rating System using jQuery

---

## 1. 🎯 Experiment Aim
To design and build an interactive, client-side web application implementing:
1. A real-time **Password Entropy & Strength Analyzer** with visual checklist feedback for healthcare staff credentials.
2. A dynamic **5-Star Doctor Consultation Rating System** with hover preview, score locking, and animated submission confirmation using the jQuery library.

---

## 2. 📥 Input Specification

### 2.1 File System Input

| File Name | Format | Role & Implementation Responsibility |
| :--- | :--- | :--- |
| `index.html` | HTML5 | Two-column layout containing Password Strength card (input, checklist, meter) and Doctor Rating card (stars, feedback textarea). |
| `style.css` | CSS3 | Interactive progress bar styling, star transitions, amber glow animations, and responsive flex container rules. |
| `script.js` | jQuery (v3.7.1) | Event listeners on `input keyup`, `mouseenter`, `mouseleave`, `click`, regex scoring, DOM class swapping, and `.fadeIn()` animations. |

### 2.2 Execution Command Input

```bash
# Navigate to the experiment directory
cd /home/ubuntu/SBL-EXPT/Asmit_25CE1051/Expt-02-Password-Rating-jQuery

# Launch in browser directly
chromium-browser index.html

# Or run via local server
python3 -m http.server 8081
```

### 2.3 Password Evaluation Rules & Scoring Input Matrix

The jQuery analyzer evaluates password input across 5 independent criteria:

```
+---------------------------------------------------------------------------------------------------------+
| RULE # | CRITERIA DESCRIPTION         | REGEX PATTERN / JQUERY CONDITION            | WEIGHT / SCORE    |
+---------------------------------------------------------------------------------------------------------+
| Rule 1 | Minimum 8 Characters Length  | val.length >= 8                             | +1 Point (20%)    |
| Rule 2 | Lowercase Alphabet (a-z)     | /[a-z]/.test(val)                           | +1 Point (20%)    |
| Rule 3 | Uppercase Alphabet (A-Z)     | /[A-Z]/.test(val)                           | +1 Point (20%)    |
| Rule 4 | Numeric Digit (0-9)          | /[0-9]/.test(val)                           | +1 Point (20%)    |
| Rule 5 | Special Symbol               | /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/     | +1 Point (20%)    |
+---------------------------------------------------------------------------------------------------------+
```

### 2.4 Doctor Consultation Rating Input Scale

```
+---------------------------------------------------------------------------------------------------------+
| STAR LEVEL | RATING SCORE | DISPLAY LABEL TEXT     | COLOR CODE       | CLINICAL FEEDBACK CONTEXT       |
+---------------------------------------------------------------------------------------------------------+
| ★☆☆☆☆     | 1 Star       | Poor Experience        | #ef4444 (Red)    | Long wait time, inadequate care |
| ★★☆☆☆     | 2 Stars      | Fair / Average         | #f97316 (Orange) | Basic treatment, delayed tests  |
| ★★★☆☆     | 3 Stars      | Good                   | #eab308 (Yellow) | Satisfactory consultation       |
| ★★★★☆     | 4 Stars      | Very Good              | #84cc16 (Lime)   | Attentive doctor, clear advice  |
| ★★★★★     | 5 Stars      | Exceptional Experience | #10b981 (Emerald)| Exemplary clinical excellence   |
+---------------------------------------------------------------------------------------------------------+
```

### 2.5 Sample Test Input Vectors

#### Password Strength Test Data:
- Input 1: `adm` (Length < 8, lowercase only)
- Input 2: `healthpulse` (Length >= 8, lowercase only)
- Input 3: `HealthPulse` (Length >= 8, lowercase + uppercase)
- Input 4: `HealthPulse2026` (Length >= 8, lowercase + uppercase + number)
- Input 5: `HealthPulse@2026!` (Length >= 8, lowercase + uppercase + number + symbol)

#### Star Rating Test Data:
- Action: Hover on 4th Star $\rightarrow$ Click on 5th Star
- Reviewer Name: `Asmit Jogdand (Patient ID: HP-2026-9921)`
- Doctor Selected: `Dr. Amarsinh V. Vidhate (Chief Medical Director - Cardiology)`
- Written Review: `"Dr. Vidhate provided prompt and thorough cardiac diagnostics. The clinical staff demonstrated highest standards of professionalism."`

---

## 3. 📤 Output Specification

### 3.1 Graphical User Interface Output Representation

```
+----------------------------------------------------------------------------------------------------+
|  [HealthPulse Portal]  SBL - Advanced Web Technology (Sem VI)          Student: Asmit (25CE1051)   |
+----------------------------------------------------------------------------------------------------+
|                                                                                                    |
|  +-- MODULE 1: Credential Security Analyzer --+  +-- MODULE 2: Doctor Consultation Rating -------+ |
|  | Enter Staff Password:                      |  | Physician: Dr. Amarsinh V. Vidhate (Cardiology)| |
|  | [ HealthPulse@2026!                 ] [👁️] |  | Overall Patient Satisfaction Rating:          | |
|  |                                            |  |                                                | |
|  | Password Strength Meter:                   |  |      [ ★ ]   [ ★ ]   [ ★ ]   [ ★ ]   [ ★ ]    | |
|  | [==============================] 100%     |  |       (Glowing Amber Gold ★★★★★)               | |
|  | Status: Very Strong (HIPAA Compliant)      |  | Selected Rating: 5 / 5 — Exceptional           | |
|  |                                            |  |                                                | |
|  | Security Rule Checklist:                   |  | Patient Comments & Suggestions:                | |
|  |   [✓] Minimum 8 characters in length       |  | [ Dr. Vidhate provided prompt and thorough   ] | |
|  |   [✓] At least one lowercase letter (a-z)  |  | [ cardiac diagnostics. Highly recommended.   ] | |
|  |   [✓] At least one uppercase letter (A-Z)  |  |                                                | |
|  |   [✓] At least one numeric digit (0-9)     |  | [ Submit Review ]     [ ↺ Reset ]              | |
|  |   [✓] At least one special symbol (@#$!%)  |  |                                                | |
|  +--------------------------------------------+  +------------------------------------------------+ |
+----------------------------------------------------------------------------------------------------+
```

### 3.2 Submission Confirmation Banner Output (jQuery Animated)

Upon clicking **"Submit Review"**, jQuery fires `.fadeIn(400)` to render the persistent review receipt:

```
+-----------------------------------------------------------------------------------+
|  🌟 DOCTOR CONSULTATION REVIEW SUBMITTED SUCCESSFULLY                             |
+-----------------------------------------------------------------------------------+
|  Review ID:              REV-HP-2026-88192                                        |
|  Consulting Specialist:  Dr. Amarsinh V. Vidhate (Chief Medical Director)         |
|  Awarded Rating:         ★★★★★ 5.0 / 5.0 (Exceptional Experience)                 |
|  Patient Feedback:       "Dr. Vidhate provided prompt and thorough cardiac        |
|                          diagnostics. Highly recommended."                        |
|  Verified Timestamp:     2026-10-01 10:20:45 IST                                  |
|  Status:                 Published to Clinical Quality Board                      |
+-----------------------------------------------------------------------------------+
```

### 3.3 Test Case Execution Results

| Test Scenario | Input Given | jQuery DOM Execution & Calculation | Output Result Observed | Status |
| :--- | :--- | :--- | :--- | :---: |
| **Empty Input** | `""` | All regex tests evaluate `false` | Score 0%, Gray Bar (`#64748b`), All 5 rules show `[✕]` | **PASS** |
| **Short Lowercase** | `adm` | Length < 8, Lowercase `true` | Score 20%, Red Bar (`#ef4444`), Label: *"Very Weak"* | **PASS** |
| **Length Only** | `healthpulse` | Length `true`, Lowercase `true` | Score 40%, Orange Bar (`#f97316`), Label: *"Weak"* | **PASS** |
| **Alpha Mixed** | `HealthPulse` | Length, Lower, Upper `true` | Score 60%, Yellow Bar (`#eab308`), Label: *"Medium"* | **PASS** |
| **Alphanumeric** | `HealthPulse2026` | 4 conditions `true` | Score 80%, Lime Bar (`#84cc16`), Label: *"Strong"* | **PASS** |
| **Full Entropy** | `HealthPulse@2026!` | All 5 conditions `true` | Score 100%, Emerald Bar (`#10b981`), Label: *"Very Strong"* | **PASS** |
| **Password Unmask** | Click eye icon `👁️` | `type` toggled `password` $\leftrightarrow$ `text` | Obfuscated dots reveal plain text characters | **PASS** |
| **Star Hover** | Hover 4th star | `mouseenter` fires, adds `.hovered` to 1..4 | 4 stars glow amber, label reads *"Very Good (4 Stars)"* | **PASS** |
| **Star Click Lock** | Click 5th star | `click` locks `selectedRating = 5` | All 5 stars locked `.active`, persistent amber fill | **PASS** |
| **Empty Review Submit** | No stars selected | Validation guard blocks empty submission | Browser warning alert: *"Please select a star rating first!"* | **PASS** |

---

## 4. 🏁 Conclusion & Verification
Experiment 02 was successfully verified. The jQuery event pipeline (`input keyup`, `mouseenter`, `mouseleave`, `click`) delivered real-time, responsive feedback. The password entropy calculator accurately enforced hospital staff credential security, and the star rating widget enabled smooth review submissions.
