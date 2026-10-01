# Experiment 01: Input & Output Manual
## Design a Registration Form using HTML5 and CSS3

---

### 👨‍🎓 Student & Laboratory Credentials
- **Student Name:** Asmit Jogdand
- **Roll Number:** `25CE1051`
- **Class / Division:** B.Tech Computer Engineering (Sem VI)
- **Academic Year:** 2026 – 2027
- **Course:** Skill Based Lab - Advanced Web Technology (SBL-AWT)
- **Institution:** Ramrao Adik Institute of Technology (RAIT), D Y Patil Deemed to be University, Nerul, Navi Mumbai
- **Problem Statement Domain:** **HealthPulse — Digital Healthcare & Clinical Management Portal**
- **Experiment Title:** Design a Registration Form using HTML5 and CSS3 on Selected Problem Statement

---

## 1. 🎯 Experiment Aim
To design, implement, and validate a responsive, accessible, and secure Patient Health Profile & HIPAA Insurance Registration Form using semantic HTML5 elements and modern CSS3 styling with real-time client-side constraint validation.

---

## 2. 📥 Input Specification

### 2.1 File System Input
The following source files constitute the application input:

| File Name | Language / Format | Role & Implementation Responsibility |
| :--- | :--- | :--- |
| `index.html` | HTML5 | Semantic structure (`<form>`, `<fieldset>`, `<legend>`, `<input>`, `<select>`, `<button>`) with validation attributes (`required`, `pattern`, `minlength`, `maxlength`). |
| `style.css` | CSS3 | Responsive CSS Grid & Flexbox, clinical blue color variables (`:root`), `:focus` glow states, and `:valid`/`:invalid` pseudo-class indicators. |
| `script.js` | JavaScript (ES6) | Client-side password matching logic, submission interception, and dynamic patient summary confirmation modal rendering. |

### 2.2 Execution Command Input
To launch and test the application, execute any of the following commands:

```bash
# Navigate to the experiment directory
cd /home/ubuntu/SBL-EXPT/Asmit_25CE1051/Expt-01-Registration-Form

# Option A: Open directly in Google Chrome / Chromium browser
chromium-browser index.html

# Option B: Run via lightweight HTTP server
npx serve .
# Or via Python standard library:
python3 -m http.server 8080
```

### 2.3 Form Fields & Constraint Validation Rules

```
+-------------------------------------------------------------------------------------------------------+
| FIELD NAME         | INPUT TYPE    | VALIDATION CONSTRAINT / REGEX PATTERN     | ERROR BEHAVIOR        |
+-------------------------------------------------------------------------------------------------------+
| Full Name          | text          | pattern="^[a-zA-Z\s]+$", minlength="3"    | Blocks numbers/symbols|
| Date of Birth      | date          | required, max="2026-01-01"                | Prevents future dates |
| Gender             | radio         | required (Male / Female / Other)          | Selection mandatory   |
| Blood Group        | select        | required (A+, A-, B+, B-, O+, O-, AB+, AB-) Must choose from list |
| Phone Number       | tel           | pattern="[6-9][0-9]{9}", maxlength="10"   | Enforces 10 digits 6-9|
| Email Address      | email         | required, standard RFC 5322 syntax        | Requires '@' & domain |
| Address            | textarea      | required, minlength="10"                  | Minimum description   |
| Chronic Illnesses  | checkbox      | optional (Diabetes, Hypertension, etc.)   | Multiple selection    |
| Insurance Number   | text          | pattern="^[A-Z0-9\-]{6,16}$"              | Alphanumeric & dashes |
| Account Password   | password      | (?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[\W]).{8,} Complex pass rule  |
| Confirm Password   | password      | Value must strictly match Password field  | Triggers inline alert |
| Medical ID Document| file          | accept=".pdf,.png,.jpg,.jpeg"             | Restricts file format |
| Terms & HIPAA Consent| checkbox    | required (boolean true)                   | Blocks submit if false|
+-------------------------------------------------------------------------------------------------------+
```

### 2.4 Sample Input Test Vectors

#### Test Case A: Valid Full Enrollment Submission
```json
{
  "fullName": "Asmit Jogdand",
  "dob": "2004-08-15",
  "gender": "Male",
  "bloodGroup": "O+",
  "phone": "9876543210",
  "email": "asmit.jogdand@healthpulse.org",
  "emergencyContact": "9820112233",
  "address": "Flat 402, Seawoods Grand Central, Sector 40, Nerul, Navi Mumbai - 400706",
  "chronicConditions": ["Hypertension", "Asthma"],
  "allergies": "Penicillin",
  "insuranceProvider": "Star Health Allied Insurance",
  "insurancePolicyNo": "POL-992144-HP",
  "accountPassword": "HealthPulse@2026!",
  "confirmPassword": "HealthPulse@2026!",
  "documentAttachment": "asmit_aadhaar_card.pdf",
  "hipaaConsent": true
}
```

#### Test Case B: Boundary & Erroneous Input Vector (Validation Testing)
```json
{
  "fullName": "Asmit123",                // Invalid: Contains numeric digits
  "dob": "2030-05-20",                    // Invalid: Future date exceeding max bound
  "phone": "555123",                      // Invalid: Only 6 digits and doesn't start with 6-9
  "email": "asmitjogdand.healthpulse",    // Invalid: Missing '@' symbol and TLD domain
  "accountPassword": "pass",             // Invalid: Less than 8 characters, lacks uppercase/symbol
  "confirmPassword": "mismatchPassword", // Invalid: Mismatched password
  "hipaaConsent": false                  // Invalid: Checkbox unchecked
}
```

---

## 3. 📤 Output Specification

### 3.1 Graphical User Interface Output Representation

When loaded in the browser, the application displays a modern healthcare registration interface:

```
+---------------------------------------------------------------------------------------------------+
|  [HealthPulse Portal]  Skill Based Lab - Advanced Web Technology (Sem VI)    Student: Asmit (25CE1051)|
+---------------------------------------------------------------------------------------------------+
|                                                                                                   |
|                                    🏥 HEALTHPULSE DIGITAL CLINIC                                  |
|                             New Patient Medical Profile & Enrollment Portal                       |
|                                                                                                   |
|  +-- 1. Patient Demographics ------------------------------------------------------------------+  |
|  | Full Legal Name: [ Asmit Jogdand                       ]  Date of Birth: [ 15/08/2004    ]  |  |
|  | Gender: (o) Male   ( ) Female   ( ) Other                 Blood Group:   [ O+           v]  |  |
|  | Primary Cellular: [ +91 9876543210                     ]  Email Address: [ asmit@hp.org  ]  |  |
|  | Residential Address: [ Flat 402, Seawoods Grand Central, Nerul, Navi Mumbai              ]  |  |
|  +---------------------------------------------------------------------------------------------+  |
|                                                                                                   |
|  +-- 2. Medical History & Insurance Credentials -----------------------------------------------+  |
|  | Pre-Existing Chronic Conditions:                                                            |  |
|  | [X] Hypertension   [ ] Diabetes Mellitus   [X] Asthma / Respiratory   [ ] None Known        |  |
|  | Known Allergies: [ Penicillin, Sulfa Drugs                                               ]  |  |
|  | Insurance Provider: [ Star Health Allied Insurance    ]  Policy ID: [ POL-992144-HP      ]  |  |
|  | Upload ID Proof (PDF/JPG): [ Choose File ] asmit_aadhaar_card.pdf                           |  |
|  +---------------------------------------------------------------------------------------------+  |
|                                                                                                   |
|  +-- 3. Security Credentials & Consent --------------------------------------------------------+  |
|  | Create Password:  [ •••••••••••••••••• ] [👁️ Show]  (Password Entropy: Strong ✓)            |  |
|  | Confirm Password: [ •••••••••••••••••• ]              (Passwords Match ✓)                   |  |
|  | [X] I declare that all medical info is accurate and accept HIPAA data policies.            |  |
|  +---------------------------------------------------------------------------------------------+  |
|                                                                                                   |
|                          [  ↺ Reset Form  ]      [  🚀 Submit Patient Registration  ]             |
+---------------------------------------------------------------------------------------------------+
```

### 3.2 Submission Success Modal Dialog Output

Upon clicking **"Submit Patient Registration"** with valid input data, `script.js` intercepts the submit event, validates all constraints, builds a modal card, and displays the confirmation summary:

```
+------------------------------------------------------------------------------------+
|                          ✅ PATIENT ENROLLMENT CONFIRMED                           |
+------------------------------------------------------------------------------------+
|  HealthPulse Record Identifier: HP-2026-992144                                     |
|  Registration Status:           ACTIVE / VERIFIED                                  |
|  Timestamp:                     2026-10-01 10:15:30 IST                            |
|                                                                                    |
|  Patient Summary:                                                                  |
|  ----------------                                                                  |
|  • Full Legal Name:    Asmit Jogdand                                               |
|  • Date of Birth:      15 August 2004 (Age: 22)                                    |
|  • Blood Group:        O Positive (O+)                                             |
|  • Contact:            +91-9876543210 | asmit.jogdand@healthpulse.org              |
|  • Insurance Policy:   Star Health Allied Insurance (POL-992144-HP)                |
|  • Medical Alerts:     Hypertension, Asthma | Allergy: Penicillin                  |
|  • Document Attached:  asmit_aadhaar_card.pdf (Verified)                           |
|                                                                                    |
|  [ Close & Download Patient Summary Slip ]                                         |
+------------------------------------------------------------------------------------+
```

### 3.3 Test Case Execution Results

| Test Scenario | Test Input Injected | Expected System Behavior | Actual Observed Output | Status |
| :--- | :--- | :--- | :--- | :---: |
| **Empty Submission** | All fields blank | Browser Constraint API blocks submission | Native HTML5 tooltip: *"Please fill out this field"* appears on Name | **PASS** |
| **Numeric Name** | `12345` | Reject input matching pattern `^[a-zA-Z\s]+$` | Input border turns red, tooltip: *"Please match the requested format"* | **PASS** |
| **Future DOB** | `2030-01-01` | Reject date exceeding `max="2026-01-01"` | Date picker disallows selection beyond maximum allowed date | **PASS** |
| **Invalid Cellular** | `98201` (5 digits) | Reject length less than 10 digits | Browser blocks submit: *"Please match requested pattern"* | **PASS** |
| **Malformed Email** | `asmit.healthpulse` | Enforce RFC email format | Native tooltip: *"Please include an '@' in the email address"* | **PASS** |
| **Weak Password** | `password123` | Reject missing uppercase and symbol | Tooltip flags pattern requirement | **PASS** |
| **Password Mismatch** | `Health@2026!` vs `Health@2026?` | Client JS checks `val1 === val2` | Inline red alert text: *"Passwords do not match!"* | **PASS** |
| **Valid Full Data** | Asmit Jogdand complete profile | Form passes validation and triggers modal | Confirmation modal pops up with complete patient record | **PASS** |

---

## 4. 🏁 Conclusion & Verification
Experiment 01 was executed successfully. Semantic HTML5 elements ensured accessible document structure, CSS3 responsive grid rules adapted fluidly across display viewports, and both HTML5 Constraint Validation API and JavaScript DOM listeners verified all patient registration parameters before submission.
