# Experiment 03: Design a Homepage using React.js

## 📌 Student Details
- **Student Name:** Somnath Jha
- **Roll Number:** 25CE1050
- **Branch / Class:** B.Tech Computer Engineering (Sem VI)
- **Institution:** Ramrao Adik Institute of Technology (RAIT), D Y Patil Deemed to be University
- **Subject:** Skill Based Lab - Advanced Web Technology (SBL-AWT)

---

## 1. 🎯 Aim
To build a responsive, component-structured e-commerce storefront homepage using **React.js** (React 18), implementing functional components, prop passing, interactive state hooks (`useState`), dynamic product category filtering, and reactive shopping cart incrementation.

---

## 2. ⚡ Problem Statement
**TechVault Developer Storefront:**
Create an interactive single-page e-commerce storefront for **TechVault**. The homepage must display high-performance engineering hardware (Workstations, Curved OLED Monitors, Custom Keyboards, and AI Accelerators). It must feature an active shopping cart counter, dynamic category filter tabs that re-render hardware grids without page reloads, and an enterprise warranty footer.

---

## 3. 💻 Hardware & Software Requirements
- **Hardware:** Standard PC with 4 GB RAM minimum.
- **Software:**
  - Modern Web Browser (Google Chrome / Brave / Firefox)
  - React 18 & Babel Standalone CDN
  - VS Code or preferred text editor

---

## 4. 📚 Theory & Core Concepts
### 4.1 React Component Hierarchy & Unidirectional Data Flow
React applications adhere to unidirectional (top-down) data flow. Data is owned by parent components and passed down to children via read-only `props`.
```
[ App (cartCount State) ]
   ├── [ StudentBanner ]
   ├── [ Navbar (receives cartCount) ]
   ├── [ HeroSection ]
   ├── [ ProductCatalog (manages selectedCategory state, triggers onAddToCart) ]
   └── [ Footer ]
```

### 4.2 State Management (`useState`)
In `ProductCatalog`, local state determines which category filter is active:
```jsx
const [selectedCategory, setSelectedCategory] = useState("All");
const filtered = selectedCategory === "All"
    ? products
    : products.filter(p => p.category === selectedCategory);
```
In `App`, cart state is updated immutably:
```jsx
const [cartCount, setCartCount] = useState(2);
const handleAddToCart = (productTitle) => setCartCount(prev => prev + 1);
```

---

## 5. ⚙️ Algorithm / Procedure
1. Create root mounting point `<div id="root"></div>`.
2. Load React 18, React-DOM, and Babel Standalone.
3. Define functional components: `StudentBanner`, `Navbar`, `HeroSection`, `ProductCatalog`, `Footer`.
4. Populate product catalog array containing hardware specs, pricing, and category tags.
5. Implement category tab filters utilizing React `useState`.
6. Implement cart counter increment callback passed from parent `App` down to child product cards.
7. Mount component tree via `ReactDOM.createRoot(root).render(<App />)`.
8. Validate responsive layout breakpoints on mobile, tablet, and widescreen displays.

---

## 6. 🧪 Test Cases & Execution

| Action | Component | Expected Outcome | Status |
| :--- | :--- | :--- | :---: |
| Page Mount | Root App | Renders full homepage with initial cart count = 2 | Passed |
| Category Filter | Click "Monitors" | Renders only Curved OLED and UltraSharp items | Passed |
| Category Filter | Click "All" | Restores all 6 hardware products | Passed |
| Add to Cart | Click on RTX 4090 | Cart counter increments from 2 to 3; triggers alert | Passed |
| Cart Inspection | Click "🛒 Cart" | Displays modal summary with current item count | Passed |

---

## 7. 📸 How to Run
```bash
cd /home/ubuntu/SBL-EXPT/Somnath_25CE1050/Expt-03-React-Homepage
google-chrome index.html
```

---

## 8. 💡 Viva-Voce Questions & Answers

**Q1: What are React Keys and why are they necessary when mapping arrays (`products.map`)?**  
*Answer:* Keys give elements a stable identity inside React's Virtual DOM. During reconciliation, React uses keys to match existing elements with newly rendered elements, preventing unnecessary DOM re-creations and preserving internal component state.

**Q2: What is the significance of immutability in React state?**  
*Answer:* In React, state should never be modified directly (e.g. `state.count++`). Instead, setter functions (e.g. `setCount(prev => prev + 1)`) must be used to provide a new reference. This allows React to detect changes by reference comparison and trigger re-renders efficiently.

**Q3: How does Babel enable developers to write JSX in the browser?**  
*Answer:* Babel is a JavaScript compiler. It parses JSX syntax into ASTs (Abstract Syntax Trees) and transforms HTML-like tags into standard `React.createElement()` function calls before the browser executes the script.

---

## 9. 🏁 Conclusion
A component-driven developer e-commerce homepage was designed and executed using **React.js** for **TechVault**. Dynamic category filtering, prop-drilled event handlers, and reactive cart states were comprehensively validated.
