# Experiment 03: Input & Output Manual
## Design a Homepage using React.js

---

### 👨‍🎓 Student & Laboratory Credentials
- **Student Name:** Asmit Jogdand
- **Roll Number:** `25CE1051`
- **Class / Division:** B.Tech Computer Engineering (Sem VI)
- **Academic Year:** 2026 – 2027
- **Course:** Skill Based Lab - Advanced Web Technology (SBL-AWT)
- **Institution:** Ramrao Adik Institute of Technology (RAIT), D Y Patil Deemed to be University, Nerul, Navi Mumbai
- **Problem Statement Domain:** **HealthPulse — Digital Healthcare & Clinical Management Portal**
- **Experiment Title:** Design a Homepage using React.js

---

## 1. 🎯 Experiment Aim
To design, implement, and test a component-driven, responsive clinical healthcare portal homepage using **React.js** (React 18), leveraging functional components, props, state management (`useState`), JSX, and dynamic category filtering.

---

## 2. 📥 Input Specification

### 2.1 File System Input

| File Name | Format | Role & Implementation Responsibility |
| :--- | :--- | :--- |
| `index.html` | React 18 (Babel Standalone) | Zero-setup Single Page Application root containing React component hierarchy, medical datasets, dynamic state hooks, and inline CSS3 styling. |
| `package.json` | JSON | Project metadata, build scripts, and dependencies configuration. |

### 2.2 Execution Command Input

```bash
# Navigate to the experiment directory
cd /home/ubuntu/SBL-EXPT/Asmit_25CE1051/Expt-03-React-Homepage

# Option A: Open directly in Google Chrome / Chromium browser
chromium-browser index.html

# Option B: Run via lightweight local web server
npx serve .
# Or via Python standard library:
python3 -m http.server 3003
```

### 2.3 Component Architecture & Props Input Structure

```
+---------------------------------------------------------------------------------------------------+
| COMPONENT NAME      | STATE HOOKS USED         | PROPS RECEIVED         | FUNCTIONALITY           |
+---------------------------------------------------------------------------------------------------+
| App                 | appointmentModalVisible  | None (Root Component)  | Manages booking triggers|
| StudentHeader       | None (Pure Functional)   | None                   | Renders academic banner |
| Navbar              | mobileMenuOpen           | onBookClick: function  | Brand nav & sticky CTA  |
| HeroSection         | None (Pure Functional)   | onBookClick: function  | Headline & stats anchor |
| StatsBar            | None (Pure Functional)   | stats: Array           | Clinical impact metrics |
| ServicesSection     | selectedCategory (State) | None                   | Department category tabs|
| ServiceCard         | None (Pure Functional)   | service: Object        | Individual specialty UI |
| SpecialistSection   | None (Pure Functional)   | doctors: Array         | Physician credentials   |
| EmergencyBanner     | None (Pure Functional)   | None                   | 24/7 hotline display    |
| Footer              | None (Pure Functional)   | None                   | RAIT credentials, hours |
+---------------------------------------------------------------------------------------------------+
```

### 2.4 Medical Data Input Vectors

#### Services Dataset (`servicesData`):
```javascript
[
  { id: 1, name: "Cardiology & CathLab", category: "Critical Care", icon: "❤️", doctors: 14, waitTime: "10 mins" },
  { id: 2, name: "Neurology & Brain Spine", category: "Critical Care", icon: "🧠", doctors: 8, waitTime: "15 mins" },
  { id: 3, name: "Orthopedics & Joint Center", category: "Outpatient", icon: "🦴", doctors: 12, waitTime: "20 mins" },
  { id: 4, name: "Pediatrics & Child Care", category: "Outpatient", icon: "👶", doctors: 10, waitTime: "10 mins" },
  { id: 5, name: "Automated Clinical Pathology", category: "Diagnostics", icon: "🔬", doctors: 6, waitTime: "5 mins" },
  { id: 6, name: "3T MRI & High-Speed CT", category: "Diagnostics", icon: "🩻", doctors: 5, waitTime: "15 mins" }
]
```

#### User Interaction Input Triggers:
1. Category Tab Selection: User clicks `"All"`, `"Critical Care"`, `"Outpatient"`, or `"Diagnostics"`.
2. Booking Trigger: User clicks `"📅 Book Appointment"` button on the Hero banner or Navbar.
3. Patient Booking Input: User inputs Patient Name `Asmit Jogdand` and selects Department `Cardiology`.

---

## 3. 📤 Output Specification

### 3.1 Graphical User Interface Output Representation

```
+---------------------------------------------------------------------------------------------------+
|  🎓 RAIT - Department of Computer Engineering | SBL-AWT Sem VI | Student: Asmit Jogdand (25CE1051)|
+---------------------------------------------------------------------------------------------------+
|  [❤️ HealthPulse Portal]    Services   Specialists   Emergency   About        [ 📅 Book Appt ]    |
+---------------------------------------------------------------------------------------------------+
|                                                                                                   |
|                       🏥 ADVANCED CLINICAL HEALTHCARE & SURGICAL EXCELLENCE                       |
|                 Empowering Patients with World-Class Healthcare & Digital Telehealth              |
|                                                                                                   |
|         [ 45,000+ Patients ]    [ 120+ Specialists ]    [ 24/7 Trauma ]    [ 99.8% Recovery ]     |
|                                                                                                   |
|  +-- Clinical Specialties & Departments --------------------------------------------------------+ |
|  | Filter Categories:  [ (•) All ]   [ Critical Care ]   [ Outpatient ]   [ Diagnostics ]       | |
|  |                                                                                              | |
|  |  +--------------------+  +--------------------+  +--------------------+                      | |
|  |  | ❤️ Cardiology      |  | 🧠 Neurology       |  | 🦴 Orthopedics     |                      | |
|  |  | 14 Specialists     |  | 8 Specialists      |  | 12 Specialists     |                      | |
|  |  | Wait: 10 mins      |  | Wait: 15 mins      |  | Wait: 20 mins      |                      | |
|  |  +--------------------+  +--------------------+  +--------------------+                      | |
|  +----------------------------------------------------------------------------------------------+ |
|                                                                                                   |
|  +-- Board-Certified Clinical Specialists ------------------------------------------------------+ |
|  |  👨‍⚕️ Dr. Amarsinh V. Vidhate     Chief Medical Director & Interventional Cardiologist        | |
|  |  👩‍⚕️ Dr. Radhika Sen             Head of Neurosciences & Stroke Management                  | |
|  +----------------------------------------------------------------------------------------------+ |
|                                                                                                   |
|  🚨 24/7 CRITICAL TRAUMA & AMBULANCE HOTLINE: 1800-432-5873 (TOLL-FREE RAPID RESPONSE)           |
+---------------------------------------------------------------------------------------------------+
```

### 3.2 Dynamic State Category Filtering Output

When the user interacts with the Category Filter Tabs, React updates `selectedCategory` state and re-renders only the relevant service cards via the Virtual DOM:

```
+---------------------------------------------------------------------------------------------+
| ACTIVE TAB CLICKED | REACT STATE UPDATED                | CARDS RENDERED TO UI              |
+---------------------------------------------------------------------------------------------+
| "All" (Default)    | selectedCategory = "All"           | All 6 Clinical Department Cards   |
| "Critical Care"    | selectedCategory = "Critical Care" | Cardiology & CathLab, Neurology   |
| "Outpatient"       | selectedCategory = "Outpatient"    | Orthopedics, Pediatrics           |
| "Diagnostics"      | selectedCategory = "Diagnostics"   | Clinical Pathology, 3T MRI & CT   |
+---------------------------------------------------------------------------------------------+
```

### 3.3 Appointment Booking Modal Dialog Output

When clicking **"Book Appointment"**, the interactive booking popup renders with auto-generated token:

```
+-----------------------------------------------------------------------------------+
|                     📅 HEALTHPULSE CLINICAL APPOINTMENT DISPATCH                  |
+-----------------------------------------------------------------------------------+
|  Patient Name:          Asmit Jogdand                                             |
|  Preferred Department:  Cardiology & CathLab                                      |
|  Consulting Physician:  Dr. Amarsinh V. Vidhate                                   |
|  Generated Queue Token: HP-APPT-88219                                             |
|  Status:                SLOT RESERVED (Confirmation SMS & Email Queued)           |
|                                                                                   |
|  [ OK / Print Token ]                                                             |
+-----------------------------------------------------------------------------------+
```

### 3.4 Test Case Execution Results

| Test Scenario | User Action Injected | React Execution & Virtual DOM Behavior | Output Result Observed | Status |
| :--- | :--- | :--- | :--- | :---: |
| **Initial Page Mount** | Page loads in browser | `ReactDOM.createRoot` renders `<App />` tree | Complete Homepage displays with all 6 specialties | **PASS** |
| **Filter: Critical Care** | Click "Critical Care" tab | `setSelectedCategory("Critical Care")` | Non-critical departments unmount; Cardiology & Neurology remain | **PASS** |
| **Filter: Diagnostics** | Click "Diagnostics" tab | `setSelectedCategory("Diagnostics")` | Only Pathology and MRI cards are displayed | **PASS** |
| **Reset Filter** | Click "All" tab | `setSelectedCategory("All")` | All 6 cards re-render cleanly without page reload | **PASS** |
| **Book Appointment** | Click Hero CTA button | Callback prop `onBookClick()` invoked | Appointment prompt pops up and confirms slot | **PASS** |
| **Responsive Viewport**| Viewport resized to 375px | CSS Media query `@media(max-width:768px)` | Grid switches from 3 columns to 1 column stack | **PASS** |

---

## 4. 🏁 Conclusion & Verification
Experiment 03 successfully demonstrated React 18 component-driven architecture. The Virtual DOM reconciled state transitions instantly without whole-page refreshes, props flowed predictably from parents to children, and the responsive design scaled flawlessly across mobile and desktop interfaces.
