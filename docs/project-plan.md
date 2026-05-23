# Daily Wage Tracker Project

## Problem Statement

Daily wage workers in India usually do not have:
- Proper attendance records
- Wage transparency
- Proof of work
- Payment tracking

This project helps contractors manage workers digitally.

---

# Users

## Contractor
- Login
- Add workers
- Mark attendance
- Track wages

## Worker
- View attendance
- Get wage proof
- Receive SMS/WhatsApp updates

---

# MVP Features

- Contractor Authentication
- Worker Management
- Attendance System
- Automatic Wage Calculation
- Dashboard Overview

---

# Frontend Pages

- Login Page
- Dashboard
- Workers Page
- Attendance Page

---

# Backend APIs

- Auth API
- Worker API
- Attendance API

---

# Database Collections

## Users

```js
{
  name,
  phone,
  password
}
```

## Workers

```js
{
  name,
  phone,
  dailyWage,
  contractorId
}
```

## Attendance

```js
{
  workerId,
  date,
  status,
  wageForDay
}
```

---

# Tech Stack

- React
- Node.js
- Express.js
- MongoDB
- Tailwind CSS
- JWT Authentication