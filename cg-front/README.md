# Common Ground Frontend



This directory contains the user interface for **CommonGround**, built with **React**, **Tailwind CSS**, and **React Router**.

---

## 💡 Overview

The frontend handles interactive state management, client-side routing, navigation headers, login modals, user profile dashboards, and event/group creation forms.

---

## 📸
<img width="1687" height="755" alt="Screenshot 2026-07-27 123756" src="https://github.com/user-attachments/assets/01b95947-c503-44f4-8fe2-96dccdc28f64" />
<img width="1565" height="662" alt="Screenshot 2026-07-27 123811" src="https://github.com/user-attachments/assets/ef6378c3-2003-4fdf-b2fb-ece86bbee1f6" />

<img width="1601" height="473" alt="Screenshot 2026-07-27 123821" src="https://github.com/user-attachments/assets/7568cdbe-e6a0-4c73-a680-3fdcfb75e776" />

<img width="555" height="466" alt="Screenshot 2026-07-27 123841" src="https://github.com/user-attachments/assets/377039c6-ad4d-4daa-a7bb-abba2f6e8049" />





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
