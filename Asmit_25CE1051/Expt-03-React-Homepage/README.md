# Experiment 03: Design a Homepage using React.js

## 📌 Student Details
- **Student Name:** Asmit Jogdand
- **Roll Number:** 25CE1051
- **Branch / Class:** B.Tech Computer Engineering (Sem VI)
- **Institution:** Ramrao Adik Institute of Technology (RAIT), D Y Patil Deemed to be University
- **Subject:** Skill Based Lab - Advanced Web Technology (SBL-AWT)

---

## 1. 🎯 Aim
To design and build a modern, component-driven, responsive clinical healthcare homepage using **React.js** (React 18), utilizing functional components, props, state management (`useState`), and responsive layout patterns.

---

## 2. 🏥 Problem Statement
**HealthPulse Hospital Digital Presence:**
Develop the official web homepage for the **HealthPulse** Multi-Specialty Clinic. The portal must present prospective patients with immediate clinical service discovery, board-certified physician profiles, real-time department filtering, emergency ambulance hotlines, key hospital statistics, and seamless appointment booking triggers.

---

## 3. 💻 Hardware & Software Requirements
- **Hardware:** Standard PC with 4 GB RAM minimum.
- **Software:**
  - Modern Web Browser (Google Chrome / Brave / Firefox)
  - Node.js & npm (v18+)
  - React 18, React-DOM, Babel Standalone (or Vite/Webpack build tool)

---

## 4. 📚 Theory & Core Concepts
### 4.1 What is React.js?
React is an open-source, component-based front-end JavaScript library maintained by Meta. It enables developers to build scalable Single Page Applications (SPAs) through a declarative programming model and Virtual DOM reconciliation.

### 4.2 Key React Concepts Demonstrated
1. **Component-Based Architecture:**
   - The UI is broken into independent, reusable functional components:
     - `StudentHeader`: Displays academic credentials.
     - `Navbar`: Sticky brand navigation and quick action buttons.
     - `HeroSection`: High-impact headline, subtext, and critical metrics.
     - `ServicesSection`: Department listing with dynamic category filtering.
     - `SpecialistSection`: Doctor cards with qualifications and booking CTAs.
     - `EmergencyBanner`: 24/7 hotline alert.
     - `Footer`: Clinic working hours and accreditation.
2. **JSX (JavaScript XML):** Syntactic sugar that blends HTML-like syntax with JavaScript logic.
3. **React Hooks (`useState`):**
   - Implemented in `ServicesSection` to filter clinical services dynamically based on active category:
     ```jsx
     const [selectedCategory, setSelectedCategory] = useState("All");
     const filteredServices = selectedCategory === "All"
         ? servicesData
         : servicesData.filter(s => s.category === selectedCategory);
     ```
4. **Props and Event Handlers:** Passing callback functions (`onBookClick`) from parent `App` down to child components (`Navbar`, `HeroSection`).
5. **Virtual DOM:** React optimizes browser rendering by maintaining an in-memory representation of real DOM nodes and applying only necessary diff updates.

---

## 5. ⚙️ Algorithm / Procedure
1. Create root mount node `<div id="root"></div>` in `index.html`.
2. Import React 18, ReactDOM 18, and Babel Standalone.
3. Construct functional components with clear single-responsibility principle.
4. Define application data arrays (`servicesData`, `doctors`) containing medical information.
5. Implement stateful category tab toggling using `useState("All")`.
6. Mount the application root using modern React 18 API: `ReactDOM.createRoot(rootElement).render(<App />)`.
7. Verify responsive typography and layout across mobile, tablet, and desktop breakpoints.

---

## 6. 🧪 Component Hierarchy & Data Flow

```
[ App ]
   ├── [ StudentHeader ] (Static meta information)
   ├── [ Navbar ] (Receives onBookClick callback prop)
   ├── [ HeroSection ] (Receives onBookClick callback prop)
   │       └── [ StatsBar ] (Renders 4 key clinical metrics)
   ├── [ ServicesSection ] (Maintains 'selectedCategory' state)
   │       ├── [ FilterTabs ] (Buttons updating category state)
   │       └── [ ServiceCards Grid ] (Maps filtered clinical data)
   ├── [ SpecialistSection ] (Maps doctor directory)
   ├── [ EmergencyBanner ] (Direct hotline click-to-call link)
   └── [ Footer ] (Clinic hours & regulatory info)
```

---

## 7. 📸 How to Run
1. Navigate to the directory:
   ```bash
   cd /home/ubuntu/SBL-EXPT/Asmit_25CE1051/Expt-03-React-Homepage
   ```
2. Open `index.html` in your browser:
   ```bash
   google-chrome index.html
   # Or run via local server:
   npx serve .
   ```

---

## 8. 💡 Viva-Voce Questions & Answers

**Q1: What is the difference between Virtual DOM and Real DOM?**  
*Answer:* The Real DOM represents the actual HTML rendered on screen; updating it directly is computationally expensive. The Virtual DOM is a lightweight JavaScript representation kept in memory. When changes occur, React compares the Virtual DOM with a previous snapshot (reconciliation) and batches minimal updates to the Real DOM.

**Q2: What is JSX and why can't browsers read it natively?**  
*Answer:* JSX is a syntax extension that looks like HTML within JavaScript. Browsers can only execute standard ECMAScript. Transpilers like Babel convert JSX into native `React.createElement()` calls before execution.

**Q3: What are React Hooks? Why was `useState` introduced?**  
*Answer:* Hooks were introduced in React 16.8 to allow functional components to manage local state and lifecycle methods without writing verbose ES6 classes. `useState` returns a stateful value and an updater function.

**Q4: How does prop drilling differ from passing callback props?**  
*Answer:* Prop drilling refers to passing props through intermediary components that don't need them. Passing callback functions (such as `onBookClick`) enables child components to trigger state changes or actions defined in parent components.

---

## 9. 🏁 Conclusion
A responsive, component-driven clinical homepage was created using **React.js** for the **HealthPulse** portal. Component hierarchy, state filtering, and event handling were executed and validated.
