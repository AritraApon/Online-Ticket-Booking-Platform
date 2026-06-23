# 🚀 Online Ticket Booking Platform

A modern and responsive **MERN Stack Ticket Booking Platform** where users can discover and book tickets for different transportation services such as **Bus, Train, Launch, and Flight**. The platform supports **role-based dashboards** for Users, Vendors, and Admins with secure authentication, booking management, payment integration, and analytics.

🌐 Live Site: https://online-ticket-booking-platform-red.vercel.app

---

## 📸 Project Preview

<p align="center">
  <img src="https://i.ibb.co.com/6RXB9cvk/image.png" width="30%" />
  <img src="https://i.ibb.co.com/xtxp0Qvm/image.png" width="30%" />
  <img src="https://i.ibb.co.com/27M4q6fC/image.png" width="30%" />
</p>

<p align="center">
  <img src="https://i.ibb.co.com/kVcYVcfB/image.png" width="30%" />
  <img src="https://i.ibb.co.com/b56KFn9k/image.png" width="30%" />
  <img src="https://i.ibb.co.com/bgGnTLDR/image.png" width="30%" />
</p>

> Replace the image paths with your own screenshots.

---

# ✨ Key Features

### 🔐 Authentication & Authorization
- BetterAuth authentication system
- Email & Password login
- Google Sign In
- Session-based authentication
- JWT protected APIs
- Role-based authorization
- Three user roles:
  - 👤 User
  - 🏪 Vendor
  - 🛡️ Admin

### 🎫 Ticket Management
- Browse Bus, Train, Launch, and Flight tickets
- Search tickets by From → To locations
- Filter by transport type
- Sort by price (Low → High / High → Low)
- Pagination support
- Ticket details page with countdown timer
- Advertisement section controlled by Admin
- Latest tickets section

### 📖 Booking System
- Protected ticket booking
- Booking quantity validation
- Booking status management
- Pending, Accepted, Rejected, and Paid states
- Automatic ticket quantity updates after payment
- Real-time countdown until departure

### 👤 User Dashboard
- User profile
- My booked tickets
- Transaction history
- Stripe payment integration

### 🏪 Vendor Dashboard
- Vendor profile
- Add new tickets
- Update and delete tickets
- Manage booking requests
- Revenue overview with charts

### 🛡️ Admin Dashboard
- Manage all tickets
- Approve and reject tickets
- Manage users and roles
- Mark vendors as fraud
- Advertise and unadvertise tickets
- Maximum 6 advertised tickets

### 📊 Analytics & Visualization
- Revenue charts
- Total tickets sold
- Total tickets added
- Total revenue overview

### 📱 Responsive Design
- Mobile responsive
- Tablet responsive
- Desktop responsive
- Sticky navbar
- Modern dashboard layout
- Consistent design system

---

# 🚧 Features Planned For Future Updates

The following optional features are planned and will be added in future versions:

- 🌙 Complete Dark Mode support
- 📄 PDF Ticket Download after payment
- 🔔 Live Notification system
- ❌ Cancel Booking before vendor approval
- 🚌 Live Seat Map for bus tickets

---

# 🛠️ Tech Stack

### Frontend
- React.js
- Next.js
- Tailwind CSS
- BetterAuth
- React Router
- React Icons
- Recharts
- Stripe
- Swiper.js

### Backend
- Node.js
- Express.js
- MongoDB Atlas
- JWT
- CORS
- Dotenv
- Vercel

---

# 📦 NPM Packages Used

```bash
next
react
tailwindcss
better-auth
lucide-icons
recharts
swiper
@stripe/stripe-js
@stripe/react-stripe-js
express
mongodb
jsonwebtoken
cors
dotenv
```

---

# 🎯 Project Highlights

✅ Role-Based Authentication System
✅ Secure Protected Routes & APIs
✅ Ticket Search, Filter, Sort & Pagination
✅ Booking & Payment Workflow
✅ Admin Advertisement Management
✅ Fraud Vendor Detection System
✅ Revenue Analytics Dashboard
✅ Fully Responsive UI
✅ Clean and Scalable Project Structure

---

# 🔗 Links

### 🌐 Live Website
https://online-ticket-booking-platform-red.vercel.app

### ⚙️ Server Repository
https://github.com/AritraApon/online-ticket-booking-platform-server

### 💻 Client Repository
https://github.com/AritraApon/Online-Ticket-Booking-Platform.

---
# 🚀 Run Locally

### Clone the Client Repository

```bash
git clone https://github.com/your-username/online-ticket-booking-platform-client.git
cd online-ticket-booking-platform-client
```

### Install Dependencies

```bash
npm install
```

### Setup Environment Variables

Create a `.env.local` file in the root directory and add:

```env
NEXT_PUBLIC_SERVER_URL=your_server_url
BETTER_AUTH_SECRET=your_secret_key
BETTER_AUTH_URL=http://localhost:3000
MONGO_DB_URI=your_mongodb_connection_string
NEXT_PUBLIC_IMGBB_API_KEY=your_imgbb_api_key
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=your_stripe_publishable_key
STRIPE_SECRET_KEY=your_stripe_secret_key
```

### Run Development Server

```bash
npm run dev
```

Open:

```bash
http://localhost:3000
```

### Build for Production

```bash
npm run build
npm start
```

# 👨‍💻 Developer

**Aritro Mazumdar**

Full Stack Developer

Built with ❤️ using MERN Stack