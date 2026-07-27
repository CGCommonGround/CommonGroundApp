<div align="center">
  <img width="638" height="511" alt="CG_LOGO" src="https://github.com/user-attachments/assets/6f9a74dd-f8ff-4149-a88e-c7ccc10b1a2b" />
  <h1>CommonGround</h1>
  <p><strong>Find common ground. Plan effortless group outings based on real member preferences.</strong></p>

  [![Stack](https://img.shields.io/badge/Stack-Full%20Stack%20Web%20App-slate)](https://github.com)
  [![Database](https://img.shields.io/badge/Database-PostgreSQL-blue)](https://www.postgresql.org/)
  [![License](https://img.shields.io/badge/License-MIT-green)](#license)
</div>

---

## 📌 Project Overview

**CommonGround** is a full-stack social event planning platform designed to eliminate friction when organizing group activities. By comparing group members' budgets, travel preferences, and activity interests, CommonGround helps groups discover shared interests and vote on proposed event itineraries effortlessly.

---

## ✨ Key Features

- **User Authentication:** Simple authentication and profile state management.
- **Dynamic Profile Management:** Dedicated dashboard displaying user details, city, preferences, and active group memberships.
- **Group Creation & Management:** Users can establish public or private groups and automatically acquire admin capabilities.
- **Relational Data Architecture:** Full SQL schema supporting groups, memberships, invitations, place categories, user preferences, events, proposals, and voting.

---

## 🛠️ Tech Stack

### Frontend
- **Framework:** React (Vite)
- **Styling:** Tailwind CSS
- **Icons:** React Icons (`react-icons`)
- **HTTP Client:** Axios
- **Routing:** React Router DOM

### Backend
- **Runtime:** Node.js
- **Framework:** Express.js
- **Database:** PostgreSQL
- **Database Client:** `node-postgres` (`pg`)

---

## 🗄️ Database Architecture

The application relies on a structured PostgreSQL schema consisting of:
- `users`: Stores member credentials and profile details.
- `place_types`: Categorizes location types (Restaurants, Museums, Parks).
- `user_preferences`: Maps user budget and transit preferences per place type.
- `groups` & `group_members`: Manages group privacy, roles (`ADMIN`, `MEMBER`), and participation.
- `events`, `proposals` & `proposal_votes`: Handles group event suggestions and voting status (`YES`, `NO`, `MAYBE`).

---



## 🚀 Quick Start & Installation

### Prerequisites
- Node.js (v18+)
- PostgreSQL installed and running locally or via Docker

### 1. Database Setup

```bash
docker compose up -d
```
- open `localhost:5050`
- enter user and password
- create database and open query tool, copy & paste seed data

### 2. Backend Setup
- at commonGround
```bash
npm install
npm run dev

```
### 3. Frontend Setup
- at commonGround/cg-front
```bash
npm install
npm run dev

```
- `http://localhost:1573`


## 🔗 Key API Integration Points
POST /api/v1/users/login — Authenticates user credentials.

GET /api/v1/users/:id/profile — Loads user metadata and category preferences.

GET /api/v1/users/:id/groups — Retrieves groups joined/created by the active user.

POST /api/v1/groups — Submits new group creation payloads.



## 👥 Team & Contributors
Annia K | [Linkedin]() | [Github](https://github.com/anniakuz)

Ivo J   | [Linkedin]() | [Github](https://github.com/Haimura-JTS)

Mio O   | [Linkedin](www.linkedin.com/in/mio-ogura) | [Github](https://github.com/miaryl)
