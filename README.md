User Management System
- Preview video -  [https://drive.google.com/file/d/1G2B3ZND9_RhNLQ7XZkoQmfFz8ka06QA-/view?usp=sharing]

A full-stack MERN (MongoDB, Express, React, Node.js) web application to manage users with features like:

- Add, edit, delete users
- Bulk Excel upload
- Downloadable Excel template
- PAN number masking
Toast notifications

📦 Technologies Used
- Frontend: React, CSS, React Icons, React Toastify
- Backend: Node.js, Express, MongoDB, Mongoose
- File Uploads: Multer
- Excel Handling: ExcelJS
- Validation: validator

🛠 Setup Instructions
1. Clone the repo
- git clone https://github.com/<your-username>/User-Management.git
- cd User-Management
2. Setup Backend
- cd backend
- npm install
- npm start
3. Setup Frontend
- cd ../frontend
- npm install
- npm start

🌐 How to Run Locally
- Ensure MongoDB is running locally (mongodb://localhost:27017/user-management)
- Backend runs on: http://localhost:5000
- Frontend runs on: http://localhost:3000
- The code is built for localhost development only
- CORS is pre-configured for local setup

⚠️ Assumptions & Known Issues
1. PAN is masked in UI but stored in plain text in DB
2. No checks for duplicate email/phone
3. .env must include valid MongoDB URI and server port
4. Accepts only .xlsx Excel format
5. Not ready for production deployment — only localhost

Made with ❤️ by Parv
