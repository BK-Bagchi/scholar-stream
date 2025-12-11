# 📘 ScholarStream

ScholarStream is a Scholarship Management & Application Platform that bridges the gap between students and global scholarship opportunities. It allows universities and institutions to publish scholarships, while students can easily search, explore, apply, and track their application progress—all in one place.

Designed with a clean UI, secure backend, and seamless payment integration **(Stripe)**, ScholarStream aims to simplify the complex world of scholarship discovery and application management.

---

## 🚀 Features

### 🧑‍🎓 User & Authentication

- Secure user registration & login using JWT
- Role-based access system (Student, Moderator, Admin)
- Separate dashboards based on user type
- Profile creation and application tracking for students

---

## 🎓 Scholarship Discovery

- Browse hundreds of scholarships added by universities or organizations
- View detailed information including eligibility, requirements, deadlines, and fees
- Responsive search system supporting keywords like:

  - Scholarship Name
  - University Name
  - Subject Category
  - Degree Type

- Filter scholarships by:

  - Scholarship Category (Full Fund / Partial / Merit Based)
  - Subject Category
  - Country / Location

- Pagination-enabled results for a smooth experience

---

## 📝 Scholarship Application System

### Students Can:

- Apply for scholarships by submitting necessary data
- Complete application fee payment via **Stripe (secure payment gateway)**
- View and track their application status:
  - **Pending → Processing → Completed**
- Receive moderator feedback or updates instantly

### Moderators Can:

- Review submitted applications
- Update the status:
  - **Pending → Processing → Completed**
- Provide feedback or reject invalid applications

---

## 👨‍💼 Admin Panel

Admins have advanced control over the platform:

### 🔧 Scholarship Management

- Add new scholarships
- Edit or update scholarship details
- Remove or archive outdated opportunities

### 👥 User Management

- Manage Students, Moderators, and Admins
- Assign roles
- Remove inactive or fraudulent accounts

### 📊 Analytics Dashboard

- Total scholarships
- Total applications
- Paid vs Unpaid applications
- Revenue tracking from application fees
- Category-based application insights
- Fully dynamic charts and statistical metrics

---

## 💳 Integrated Payment Gateway

ScholarStream uses **Stripe** for real-time payment processing.

### Supports:

- Success URL with Session ID-based data retrieval
- Cancel/Failed URL routing with complete payment data verification
- Proper refund or failed status handling
- Secure backend validation to prevent fraudulent transactions

---

## 🎨 Elegant UI / UX

A polished, modern interface built using **React + Tailwind CSS**:

- Dark/Light theme toggling using custom ThemeContext
- Smooth animations, clean components, and consistent color palette
- Reusable Card components for Scholarships & Applications
- Fully responsive layout for mobile, tablet, and desktop

---

## ⚙️ Backend Functionality

Powered by Node.js & Express.js with a robust architectural setup:

- RESTful API structure
- MongoDB database with Mongoose models
- Middleware for:

  - Authentication
  - Authorization
  - Payment verification
  - Application validation

- Secure route handling & error responses

---

## 🛠️ Tech Stack

| Layer          | Technology                              |
| -------------- | --------------------------------------- |
| Frontend       | React, Tailwind CSS, Lucide Icons       |
| State Mgmt     | Context API (AuthContext, ThemeContext) |
| Backend        | Node.js, Express.js                     |
| Database       | MongoDB + Mongoose                      |
| Authentication | JWT                                     |
| Payment        | Stripe Integration                      |
| Hosting        | Netlify (Frontend), Render (Backend)    |

---

## 🧩 Key Modules

- **AuthContext** — manages authentication globally
- **ThemeContext** — handles Light/Dark UI state
- **Payment Handler** — processes success, fail, and cancel URLs
- **Admin Dashboard Module** — dynamic charts + metrics
- **Application Reviewer** — complete moderator workflow

---

## 🧑‍💻 Author

### **Dipto Bagchi**

- 🌐 MERN Stack Developer
- ⚡ Passionate about building real-world, scalable web applications
- 💡 Experience with UI/UX, backend systems, and real-time apps
