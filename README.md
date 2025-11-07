# 🌍 NextDestination  
**A Full-Stack Travel Booking Platform built using Node.js, Express, MongoDB, and EJS** 



## Live Demo ↗ - https://nextdestination-skjp.onrender.com/listings
---

## 🧾 Overview  
**NextDestination** is a dynamic travel booking and accommodation platform inspired by Airbnb’s functionality.  
It allows users to **explore listings**, **book stays**, **write reviews**, and **manage personal listings** — all through a secure authentication system.  

The app follows the **MVC architecture** for scalability and maintainability, with robust session handling, image upload (Cloudinary + Multer), and integrated flash messaging for user feedback.

---

## 🧱 Tech Stack  

| Layer | Technology |
|--------|-------------|
| **Frontend (Views)** | EJS, HTML, CSS, Bootstrap |
| **Backend** | Node.js, Express.js |
| **Database** | MongoDB (Mongoose ODM) |
| **Authentication** | Passport.js (Local Strategy), express-session |
| **File Uploads** | Multer + Cloudinary |
| **Templating Engine** | EJS-Mate (for layouts & partials) |
| **Session Store** | connect-mongo |
| **Flash Messages** | connect-flash |
| **Validation** | JOI Schema Validation |
| **Deployment** | Render / Heroku / Railway |

---

## ✨ Features  

### 👥 User Management  
- Register, login, and logout functionality using Passport.js  
- Session-based authentication with persistent login  
- Flash messages for success/error feedback  

### 🏡 Listings Module  
- Create, edit, and delete property listings (CRUD operations)  
- Image uploads via **Multer** and **Cloudinary**  
- Data validation using JOI schemas  
- Owner-based access control (only owners can edit/delete their listings)  

### ⭐ Reviews  
- Add and delete reviews on listings  
- Validation for review content  
- Role-based restrictions (only logged-in users can review)  

### 📅 Bookings  
- Booking system for listings (via `/bookings` routes)  
- Linked with user authentication (only logged-in users can book)  

### 💬 Flash Messaging  
- Instant feedback for all user actions (login, CRUD, etc.)

### ⚙️ Error Handling  
- Centralized custom error handler (Express middleware)  
- Renders a friendly EJS error page when routes fail  

---

## 🗂 Project Structure  

nextdestination/
│
├── models/
│ ├── listing.js
│ ├── review.js
│ └── user.js
│
├── routes/
│ ├── listingRoute.js
│ ├── reviewRoute.js
│ ├── userRouter.js
│ └── bookingRoute.js
│
├── controllers/
│ ├── listingController.js
│ ├── reviewController.js
│ ├── userController.js
│ └── bookingController.js
│
├── views/
│ ├── listings/
│ ├── users/
│ ├── partials/
│ └── layouts/
│
├── public/ # Static assets (CSS, JS, images)
├── utils/ # Async wrapper, custom error class
├── middleware.js # Auth, validation, and role-based guards
├── app.js # Main Express server
└── .env.example # Environment variable template

yaml
Copy code

---

## 🔧 Installation & Setup  

### Prerequisites  
- Node.js and npm installed  
- MongoDB instance (local or Atlas)  
- Cloudinary account (for image storage)

### 1️⃣ Clone the repository  
```bash
git clone https://github.com/bikramroy11/nextdestination.git
cd nextdestination
2️⃣ Install dependencies
bash
Copy code
npm install
3️⃣ Configure environment variables
Create a .env file in the project root:

ini
Copy code
ATLASDB_URL=<your_mongodb_connection_string>
SECRET=<your_session_secret>
CLOUDINARY_CLOUD_NAME=<your_cloud_name>
CLOUDINARY_KEY=<your_cloud_key>
CLOUDINARY_SECRET=<your_cloud_secret>
NODE_ENV=development
4️⃣ Start the application
bash
Copy code
npm run dev
By default, the app runs at:
🔗 http://localhost:3000

🧪 Testing & Debugging
Use Postman to test routes (/listings, /login, /signup, etc.)

Use MongoDB Compass to inspect the database

Run the app with nodemon for live reloading

Check console logs and flash messages for error context

⚙️ Environment Variables
Variable	Description
ATLASDB_URL	MongoDB connection string
SECRET	Secret key for sessions
CLOUDINARY_*	Keys for Cloudinary integration
NODE_ENV	Set to “production” or “development”

✅ Future Enhancements
Implement real-time notifications (Socket.io)

Add search, filters, and pagination for listings

Integrate Google Maps API

Add profile pictures and social login (Google OAuth)

Include booking payment (Stripe / Razorpay)

Improve mobile UI responsiveness

👨‍💻 Author
Bikram Roy
🎓 MCA, Vidyasagar University (University Rank 1)
💡 Interests: Full Stack Development, DevOps, Generative AI
🔗 GitHub Profile

📄 License
This project is open-source and available under the MIT License.

⭐ If you like this project, don’t forget to give it a star on GitHub! ⭐

yaml
Copy code

---

Would you like me to add:
- 🖼️ a **“Preview” section with demo screenshots**, or  
- 🏷️ **tech badges (e.g., Node.js, Express, MongoDB, Passport)** at the top of the README?  

They make the GitHub page look more professional and eye-catching.






