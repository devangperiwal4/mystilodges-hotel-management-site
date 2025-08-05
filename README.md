# 🏨 MystiLodges - Hotel Management & Room Reservation Website

MystiLodges is a **MERN stack** based hotel management and room reservation platform designed to allow users to browse, book, and manage hotel room bookings effortlessly. Admins can manage listings, and users can find their perfect stay with ease.

---

## 🚀 Features

- 🛏️ Browse available rooms with details and pricing
- 📅 Book rooms based on availability
- 👤 User authentication (Sign up / Login)
- 🧾 View and manage reservations
- 🔐 Admin panel for room and booking management

---

## 🛠️ Tech Stack

**Frontend:**
- React.js
- React Router
- Tailwind CSS / Bootstrap (if used)

**Backend:**
- Node.js
- Express.js

**Database:**
- MongoDB (via Mongoose)

**Others:**
- JWT for authentication
- REST APIs

---

## ⚙️ Installation & Setup

1. **Clone the repository**
   ```bash
   git clone https://github.com/devangperiwal4/mystilodges-hotel-management-site.git
   cd mystilodges-hotel-management-site
   ```
2. **Install frontend dependencies**
   ```bash
   cd client
   npm install
   ```

3. **Install backend dependencies**
   ```bash
   cd ../server
   npm install
   ```

4. **Set up environment variables**

   Create a .env file inside the server directory:
   ```bash
   MONGO_URI=your_mongodb_connection_string
   JWT_SECRET=your_jwt_secret
   ```

5. **Run the application**

   Open two terminals:

   - Terminal 1 (Backend)
   ```bash
   cd server
   npm start
   ```
   - Terminal 2 (Frontend)
   ```bash
   cd client
   npm start
   ```
   
   The frontend will be live on http://localhost:3000 and backend on http://localhost:5000




---


