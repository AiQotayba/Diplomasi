# 📘 **Diplomasi Platform – Final Project Study**

*(Frontend & Admin System Documentation)*

---

## 1. 🎯 **Project Vision**

**Diplomasi** is an interactive educational platform designed to teach *negotiation, diplomacy, persuasion, and emotional intelligence skills* through immersive digital experiences.

It consists of two core products:

1. **Mobile Application (User-facing)** – Provides interactive courses, scenarios, and gamified learning paths.
2. **Admin Panel (Web-based)** – A control center that allows content managers and administrators to manage courses, users, and educational materials efficiently.

The goal is to deliver a seamless educational experience, bridging behavioral science and modern digital learning UX.

---

## 2. 🧭 **System Architecture Overview**

| Component             | Description                                                                                                                                    |
| --------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------- |
| **Mobile App**        | Cross-platform (Flutter or React Native) application focused on user interaction, progress tracking, and gamified learning.                    |
| **Backend (API)**     | Centralized REST API (Node.js + Express + MongoDB) built by an external backend team. Handles data persistence, authentication, and analytics. |
| **Admin Panel (Web)** | Developed in **Next.js + TypeScript + Tailwind CSS + shadcn/ui**, designed for modular scalability and performance.                            |
| **Database**          | MongoDB with relational mapping between Courses → Levels → Lessons → Questions.                                                                |
| **Cloud Hosting**     | Vercel for the Admin Panel, Render/DigitalOcean for API.                                                                                       |

---

## 3. ⚙️ **Frontend Technical Stack (Admin Panel)**

| Category                   | Stack / Tool                               |
| -------------------------- | ------------------------------------------ |
| **Framework**              | Next.js (App Router)                       |
| **Language**               | TypeScript                                 |
| **UI Library**             | Tailwind CSS, shadcn/ui                    |
| **State & Data**           | React Query (TanStack), Context API        |
| **Validation**             | Zod Schemas                                |
| **Forms**                  | React Hook Form + Zod Integration          |
| **Routing**                | Next.js nested layouts (App directory)     |
| **Auth**                   | JWT Integration with API                   |
| **Performance**            | Dynamic imports, Skeleton loaders, Caching |
| **Dev Tools**              | ESLint, Prettier, GitHub, pnpm             |
| **Analytics & Monitoring** | Sentry, Google Analytics                   |
| **Notifications**          | Socket.io (realtime updates)               |

---

## 4. 🗂️ **Admin Project Structure**

```
diplomasi-admin/
├── src/
│   ├── app/
│   │   ├── dashboard/         # Overview analytics
│   │   ├── manage/            # Unified “Content Studio”
│   │   │   ├── courses/
│   │   │   ├── levels/
│   │   │   ├── lessons/
│   │   │   ├── questions/
│   │   │   ├── articles/
│   │   │   └── certificates/
│   │   ├── users/
│   │   ├── subscriptions/
│   │   ├── glossary/
│   │   ├── notifications/
│   │   ├── reports/
│   │   └── settings/
│   ├── components/
│   │   ├── forms/
│   │   ├── layout/
│   │   └── skeletons/
│   ├── hooks/
│   ├── services/
│   └── utils/
└── public/
    ├── images/
    ├── uploads/
    └── logos/
```

---

## 5. 🧩 **Frontend Architecture & UI/UX Principles**

### A. **Skeleton Loading System**

To enhance perceived performance:

* Each page and submodule includes skeleton placeholders.
* Skeletons visually represent the actual structure before content loads.
* Smooth transitions (fade-in) after data arrives.

✅ Benefits:

* Reduces user frustration during load.
* Keeps UI visually consistent.
* Enhances perceived speed.

---

### B. **Form Architecture (Schema-driven + Reusable)**

Forms are modular, reusable, and aware of entity relationships (Course → Level → Lesson → Question).

| Feature                  | Description                                                               |
| ------------------------ | ------------------------------------------------------------------------- |
| **Schema-based**         | Zod used to define validation rules and default values.                   |
| **Relation-aware**       | Automatically connects related entities (e.g., Lessons linked to Levels). |
| **Reusable modes**       | Single form component supports Create / Edit / Linked Create.             |
| **Form Factory pattern** | Dynamically loads configuration, validation, and endpoint per entity.     |

**Example:**

```tsx
<FormFactory
  entity="lesson"
  mode="create"
  relations={{ course: courseId, level: levelId }}
/>
```

---

### C. **Unified Management Section (Content Studio)**

A single, intuitive hub for managing all educational content.

| Main Section              | Includes                            | Description                |
| ------------------------- | ----------------------------------- | -------------------------- |
| **Courses Manager**       | Courses, Levels, Lessons, Questions | Core educational structure |
| **Articles Center**       | Articles + media                    | Knowledge base management  |
| **Certificates Center**   | Certificates + validations          | Issue, view, and track     |
| **Glossary Manager**      | Terms, definitions (AR/EN)          | Multilingual content       |
| **Users & Subscriptions** | Learners, roles, payment plans      | Administrative control     |
| **Notifications**         | Push + in-app messaging             | Communication center       |

Each section supports:

* CRUD with modal-based forms
* Relation-aware filters
* Inline editing
* Auto-refresh and pagination
* Cross-navigation between parent-child entities

---

### D. **UI/UX Design Language**

* Based on **Modular Dashboards** with consistent spacing, typography, and layout.
* **Dark/Light mode** toggle and full **RTL/LTR support**.
* Clean hierarchy of navigation:

  * Sidebar (Main Modules)
  * Breadcrumbs (Hierarchy)
  * Top Actions (Create, Export, Filter)
* Visual grouping for related content (accordion or nested tabs).

---

## 6. 🧠 **Data Relationships**

| Parent      | Children                    | Relation           |
| ----------- | --------------------------- | ------------------ |
| **Course**  | Levels                      | One-to-Many        |
| **Level**   | Lessons                     | One-to-Many        |
| **Lesson**  | Questions, ExtraContent     | One-to-Many        |
| **User**    | Certificates, Subscriptions | One-to-Many        |
| **Article** | Notifications               | One-to-One or Many |

---

## 7. 🚀 **Performance Optimization**

| Area               | Strategy                                |
| ------------------ | --------------------------------------- |
| **Loading**        | Skeleton placeholders + lazy components |
| **Caching**        | React Query persistent cache            |
| **Data Fetching**  | Parallel fetching for nested entities   |
| **Image Handling** | Next.js Image Optimization + CDN        |
| **Build**          | Code-splitting + dynamic imports        |
| **UI**             | Virtualized data tables for large lists |

---

## 8. 🔒 **Security & Access Control**

* Authentication via JWT (with backend verification).
* Role-based authorization (Owner, Manager, Reviewer, Support).
* Token storage in secure cookies.
* CSRF/XSS prevention through input validation and secure headers.
* HTTPS enforced on production.

---

## 9. 📊 **Analytics & Reporting**

* Admin dashboard showing:

  * Active users
  * Course completion rates
  * Lesson engagement metrics
  * Subscription revenue
* Integrations:

  * Google Analytics (user behavior)
  * Sentry (error and performance tracking)
  * Export reports as CSV or PDF.

---

## 10. 🔮 **Scalability & Future Enhancements**

| Area               | Planned Enhancement                                            |
| ------------------ | -------------------------------------------------------------- |
| **AI Integration** | Automated lesson quality insights, question difficulty ranking |
| **Collaboration**  | Multi-admin live editing (real-time)                           |
| **Performance**    | Edge Caching and Incremental Static Regeneration (ISR)         |
| **Automation**     | Auto notifications + auto certificate issuance                 |
| **Theming**        | Adaptive theme builder for brands/institutions                 |

---

## 11. 🧱 **Design System & Accessibility**

* Based on **shadcn/ui** with customized brand tokens.
* Global component library for consistent use: buttons, modals, forms, tables.
* Fully **responsive**, **keyboard-navigable**, and **accessible (WCAG 2.1)**.

---

## 12. 📁 **Deployment & Environment**

| Environment    | Platform       | URL                                          |
| -------------- | -------------- | -------------------------------------------- |
| **Production** | Vercel         | `https://admin.diplomasi.app`                |
| **Staging**    | Vercel Preview | `https://staging.diplomasi-admin.vercel.app` |
| **Backend**    | DigitalOcean   | API endpoint (ready by backend team)         |

---

## 13. ✅ **Summary**

The **Diplomasi Admin Panel** serves as a central nervous system for the Diplomasi learning ecosystem.
It’s engineered for:

* High performance
* Intuitive UX
* Modular growth
* Reusability and long-term maintainability

This architecture empowers content creators, educators, and administrators to manage the entire educational journey efficiently, from creating a lesson to issuing a certificate — all through one cohesive interface.
