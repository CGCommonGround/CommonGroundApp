# Common Ground Frontend



This directory contains the user interface for **CommonGround**, built with **React**, **Tailwind CSS**, and **React Router**.

---

## 💡 Overview

The frontend handles interactive state management, client-side routing, navigation headers, login modals, user profile dashboards, and event/group creation forms.

---

## 🛠️ Tech Stack & Dependencies

- **UI Framework:** React (Vite template)
- **Styling:** Tailwind CSS (Utility-first styling with responsive layouts)
- **Navigation:** `react-router-dom` (Declarative client-side routing)
- **HTTP Client:** `axios` (API requests to Express backend)
- **Icons:** `react-icons` (FontAwesome integration)

---

## 📂 Component Structure
```
frontend/
├── public/
│   └── CG_LOGO.jpg         # Application logo asset
├── src/
│   ├── components/
│   │   ├── Header.jsx      # Navigation header & dynamic user state
│   │   └── LoginModal.jsx  # Modal dialog for user login
│   ├── pages/
│   │   ├── ProfilePage.jsx # Dashboard showing preferences & joined groups
│   │   ├── CreatePage.jsx  # Form interface for new groups & event proposals
│   │   └── ExplorePage.jsx # Event browsing & public discovery view
│   ├── App.jsx             # Main router configuration
│   └── main.jsx            # Entry point
└── package.json

```
