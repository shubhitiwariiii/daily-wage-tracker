# Daily Wage Tracker

A full-stack web application for managing daily wage workers, attendance, and wage calculations digitally.

## Problem Statement

Millions of daily wage workers in India do not have:
- Proper attendance records
- Wage transparency
- Digital proof of work
- Payment tracking systems

This project helps contractors manage workers digitally through a simple and scalable platform.

---

# Features

## Current Features

- Add Workers
- Get All Workers
- MongoDB Database Integration
- REST API Backend
- Express Server Setup

---

# Upcoming Features

- Attendance Tracking
- Wage Calculation
- Contractor Authentication
- Worker Dashboard
- WhatsApp/SMS Notifications
- Payment History
- Analytics Dashboard

---

# Tech Stack

## Backend
- Node.js
- Express.js
- MongoDB Atlas
- Mongoose

## Frontend (Upcoming)
- React.js
- Tailwind CSS

---

# Project Structure

```bash
daily-wage-tracker/
│
├── backend/
│   ├── src/
│   │   ├── config/
│   │   ├── controllers/
│   │   ├── middleware/
│   │   ├── models/
│   │   ├── routes/
│   │   └── server.js
│   │
│   ├── .env
│   ├── .gitignore
│   └── package.json
│
├── frontend/
│
├── docs/
│   └── project-plan.md
│
└── README.md
```

---

# API Endpoints

## Workers API

### Add Worker

```http
POST /api/workers
```

### Get All Workers

```http
GET /api/workers
```

---

# Installation

## Clone Repository

```bash
git clone https://github.com/your-username/daily-wage-tracker.git
```

## Backend Setup

```bash
cd backend
npm install
npm run dev
```

---

# Environment Variables

Create `.env` inside backend folder:

```env
PORT=5000
MONGO_URI=your_mongodb_connection_string
```

---

# Current Progress

- [x] Backend Setup
- [x] MongoDB Atlas Connection
- [x] Worker Model
- [x] Add Worker API
- [x] Get Workers API
- [x] Attendance System
- [x] Authentication
- [ ] Frontend Development
- [ ] Deployment

---

# Future Scope

- Multi-language support (Hindi/English)
- QR-based worker verification
- Payroll exports
- SMS alerts
- Progressive Web App (PWA)
- Admin analytics dashboard

---

# Author

Shubhi Tiwari
