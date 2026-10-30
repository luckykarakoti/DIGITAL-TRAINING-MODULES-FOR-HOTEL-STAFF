# 🏨 THE LUCKY HOTEL — Staff Digital Training & Operations LMS

A modern, full-stack **MERN (MongoDB, Express, React, Node.js)** digital learning, Standard Operating Procedure (SOP) mastery, and compliance certification platform designed specifically for luxury hotel associates and executive management.

---

## 🌟 Key Features

### 1. 🗂️ Dedicated Modules for Each Staff Role
The curriculum is organized across 8 core hotel departments with official course codes, SOP numbers, and CEU accreditation:
* **🛎️ Front Desk & Reception**:
  * `FO-101`: *Luxury Check-In Sequence & VIP Reception Protocol*
  * `FO-102`: *PBX & Telephone Etiquette: The 3-Ring Benchmark*
  * `FO-103`: *Opera Cloud PMS: Cashiering, Folio Split & Night Audit*
* **🛏️ Housekeeping & Rooms**:
  * `HK-201`: *Five-Star Bed Making & Triple-Sheeting Standards*
  * `HK-202`: *Bathroom Sanitization & Color-Coded Microfiber Protocol*
  * `HK-203`: *Forbes Evening Turndown Service & Ambiance Setting*
  * `HK-204`: *Minibar Sensor Auditing, Par Stocking & Expiry Checking*
* **🍽️ F&B Service & Banquets**:
  * `FB-301`: *Fine Dining Silver Service: Serve Left, Clear & Pour Right*
  * `FB-302`: *Life-Critical Allergen Management & The Big 9 Safety Rules*
  * `FB-303`: *Sommelier Wine Presentation & Decanting Standards*
* **👨‍🍳 Culinary & Kitchen**:
  * `CUL-101`: *Commercial Kitchen HACCP & Temperature Danger Zone (41°F–135°F)*
  * `CUL-102`: *Walk-In Cooler Shelf Hierarchy & FIFO Day-Dotting*
* **🛎️ Concierge & Valet**:
  * `CON-501`: *Luggage Escort (8-Min Delivery Benchmark) & Room Orientation*
  * `CON-502`: *Curbside Valet Vehicle Handover & 360° Damage Inspection*
* **🛡️ Security & Loss Prevention**:
  * `SEC-401`: *Hotel Emergency Codes (Code Red, Code Blue) & Evacuation*
  * `SEC-402`: *24-Hour DND (Do Not Disturb) Mandatory Room Welfare Checks*
* **🍸 Bar & Mixology**:
  * `BAR-101`: *Ice Well Sanitization (Never Scoop with Glass) & Jigger Precision*
* **💆 Spa & Wellness**:
  * `SPA-101`: *Medical Intake Contraindications & Treatment Sanctuary Standards*

### 2. 🔐 Separate Login Portals for Staff & Director
* **Hotel Staff Portal**: Shift associate sign-in by Employee ID or Email with property and department selectors.
* **Directorate & Management Portal**: Level 4 executive clearance portal for hotel directors and QA auditors with compliance oversight and module authoring tools.

### 3. 🖥️ Realistic Enterprise Course Player
* HD video/simulation lecture stage with controls.
* Tabbed operational manual:
  1. **Standard Operating Manual (SOP)**: Step-by-step procedures with verbatim phraseology.
  2. **Floor Audit Inspection Checklist**: Interactive benchmarks used by quality inspectors.
  3. **Non-Negotiable Luxury Benchmarks**: Forbes 5-Star compliance rules.
* Official certification exam (80% passing threshold) with instant verifiable diploma generation.

### 4. 🎭 Frontline Guest Incident Simulator
* Interactive crisis decision tree (*The Downgraded Presidential Suite*, *Banquet Peanut Allergy*).
* Dynamic **Guest Satisfaction Gauge (0%–100%)** that reacts to your choices in real-time.

### 5. 🔍 Suite 401 VIP Pre-Arrival Quality Audit
* Interactive virtual room inspection to spot and flag 5 Forbes 5-Star defect infractions.

### 6. 🚨 Emergency SOP Pocket Cards
* Quick-action reference cards for Code Red, Code Blue, L.A.S.T. conflict recovery, and DND welfare checks.

---

## 🛠️ Technology Stack

* **Frontend**: React 18, Vite, Tailwind CSS, Lucide React icons, Canvas Confetti.
* **Backend**: Node.js, Express.js, JWT Authentication, Morgan Logger, CORS.
* **Database**: MongoDB with Mongoose + Automatic In-Memory Seeded Store fallback (works 100% out of the box with zero database configuration needed).

---

## 🚀 Running the Project Locally

### 1. Install Dependencies
```bash
# In the root folder:
npm install
cd backend && npm install
cd ../frontend && npm install
```

### 2. Start Both Backend & Frontend
From the root folder:
```bash
npm run dev
```

* **Frontend**: `http://localhost:5173`
* **Backend API**: `http://localhost:5000`
* **API Health Check**: `http://localhost:5000/api/health`

---

## 👥 Demo Logins

| Persona | Role | Email / Employee ID | Password |
|---|---|---|---|
| **Aiden Mercer** | Senior Receptionist (Front Desk) | `aiden.mercer@luckyhotel.com` / `EMP-4109` | `password123` |
| **Elena Rostova** | Floor Supervisor (Housekeeping) | `elena.rostova@luckyhotel.com` / `EMP-3882` | `password123` |
| **Mateo Rossi** | Lead Server (F&B) | `mateo.rossi@luckyhotel.com` / `EMP-5021` | `password123` |
| **Marcus Vance** | Director of Learning & Standards | `director@luckyhotel.com` / `EMP-1002` | `password123` |
