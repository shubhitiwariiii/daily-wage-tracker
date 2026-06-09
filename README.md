# 💼 Daily Wage Tracker

A workforce management platform for contractors to track attendance, wages, and worker productivity.

<img width="1360" height="636" alt="Screenshot 2026-06-09 231900" src="https://github.com/user-attachments/assets/fd8c3367-07b8-4d2d-bfac-63e3881788a4" />
<img width="1355" height="635" alt="Screenshot 2026-06-09 231909" src="https://github.com/user-attachments/assets/28b73bde-db37-46a3-a4bd-ca3d366e560b" />





A full-stack MERN application designed for contractors to manage workers, track daily attendance, calculate wages, and generate attendance reports.

---

## 🚀 Features

### 👷 Contractor Features

- Contractor Registration & Login
- JWT Authentication
- Protected Routes
- Add New Workers
- Edit Worker Details
- Delete Workers
- Mark Daily Attendance (Present / Absent)
- Attendance Register View
- Monthly Wage Tracking
- Search Workers
- Export Attendance Reports as PDF
- Responsive Mobile-Friendly UI

### 👨‍🔧 Worker Features

- Worker Login using Phone Number
- Personal Dashboard
- View Attendance History
- View Present Days
- View Absent Days
- View Total Earnings

---

## 📸 Screenshots

### Contractor Dashboard
<img width="1360" height="636" alt="Screenshot 2026-06-09 231900" src="https://github.com/user-attachments/assets/fd8c3367-07b8-4d2d-bfac-63e3881788a4" />
<img width="1355" height="635" alt="Screenshot 2026-06-09 231909" src="https://github.com/user-attachments/assets/28b73bde-db37-46a3-a4bd-ca3d366e560b" />



- Worker Management
- Attendance Register
- Wage Summary
- PDF Export

### Worker Dashboard

<img width="1364" height="642" alt="Screenshot 2026-06-09 232022" src="https://github.com/user-attachments/assets/436db712-c7e6-4f6a-9e7e-3b7463dc9ad1" />



- Personal Attendance Records
- Earnings Summary

---

## 🛠️ Tech Stack

### Frontend

- React.js
- Vite
- Axios
- Tailwind CSS

### Backend

- Node.js
- Express.js
- JWT Authentication
- Bcrypt.js

### Database

- MongoDB Atlas
- Mongoose

### PDF Generation
<img width="445" height="588" alt="pdf-reports png" src="https://github.com/user-attachments/assets/34bf485c-ee62-4c75-973b-825dc738dfe2" />

- jsPDF
- jspdf-autotable

---

## 📂 Project Structure

```bash
daily-wage-tracker/
│
├── frontend/
│   ├── src/
│   │   ├── pages/
│   │   ├── components/
│   │   ├── assets/
│   │   └── App.jsx
│   │
│   └── package.json
│
├── backend/
│   ├── src/
│   │   ├── controllers/
│   │   ├── routes/
│   │   ├── models/
│   │   ├── middleware/
│   │   └── server.js
│   │
│   └── package.json
│
└── README.md
```

---

## ⚙️ Installation

### Clone Repository

```bash
git clone https://github.com/your-username/daily-wage-tracker.git

cd daily-wage-tracker
```

### Backend Setup

```bash
cd backend

npm install
```

Create a `.env` file:

```env
PORT=5000

MONGO_URI=your_mongodb_connection_string

JWT_SECRET=your_jwt_secret
```

Start backend:

```bash
npm run dev
```

### Frontend Setup

```bash
cd frontend

npm install

npm run dev
```

---

## 📊 Attendance Register

The application provides a contractor-friendly attendance register:

| Worker | Date | Status |
|---------|---------|---------|
| Jignesh | 28/05/2026 | Present |
| Mahesh | 29/05/2026 | Present |

Along with:

- Present Day Count
- Absent Day Count
- Total Earnings Calculation

---

## 📄 PDF Export

Generate professional attendance reports including:

- Total Workers
- Monthly Wages
- Present Days
- Absent Days
- Total Earned Per Worker
- Generated Date & Time

---

## 🔒 Authentication

The application uses:

- JWT Tokens
- Protected Routes
- Password Hashing with Bcrypt

---

## 📱 Responsive Design

Fully responsive layout supporting:

- Desktop
- Tablet
- Mobile Devices

---

## 🎯 Future Improvements

- OTP-Based Worker Login
- Attendance Filters (Today / Week / Month)
- Analytics Dashboard
- Dark Mode
- Multi-Contractor Support Enhancements
- Email / WhatsApp Attendance Reports

---

## 👨‍💻 Author

**Shubhi Tiwari**

Built as a MERN Stack project for worker attendance and wage management.

---

## ⭐ Support

If you found this project useful, consider giving it a star ⭐ on GitHub.
