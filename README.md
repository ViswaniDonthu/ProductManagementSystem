# 📦 Product Management Application

A simple **Product Management System** with CRUD operations, built using **React (frontend)**, **Node.js + Express (backend)**, and **MongoDB (database)**.  
This project demonstrates **MERN stack skills** including authentication, API integration, search optimization, and responsive UI.

---

## 📑 Table of Contents
- [About](#-about)
- [Tech Stack](#-tech-stack)
- [Features](#-features)
- [Project Structure](#-project-structure)
- [Installation](#-installation)
- [Environment Variables](#-environment-variables)
- [Running the App](#-running-the-app)
- [API Endpoints](#-api-endpoints)
- [Deployment](#-deployment)
- [Screenshots](#-screenshots)

---

## About
This app allows the **admin** to:
- Add new products with name, description, category, price, and image  
- View products in a **grid layout with categories**  
- Update existing products  
- Delete products  
- Authenticate using **JWT-based login**  
- Browse products with **infinite scrolling**  
- Switch between **light and dark themes**  

---

## Tech Stack
- **Frontend:** React, Context API, Formik, Yup, Axios  
- **Backend:** Node.js, Express.js, Mongoose  
- **Database:** MongoDB  
- **Authentication:** JWT  
- **Image Storage:** Cloudinary  
- **Styling:** CSS  

---

## Features
-  **Authentication** – Secure login using JWT  
-  **Add Products** – Add name, description, category, price, and image , shows image preview to user.
-  **View Products** – Grid-based product display with categories  
-  **Update Products** – Edit product details anytime  
-  **Delete Products** – Remove products from the list   
-  **Sorting** – Sort by Price ,Newest → Oldest or Oldest → Newest
-  **Category Filtering** – Select a category to view only related products 
-  **Search with Debouncing** – Search by product name/description using **regex in DB** with **Debouncing** for optimized performance  
-  **Infinite Scrolling** – Seamless browsing with **pagination**
-  **Theme Toggle** – Switch between light and dark themes
-  **Centralized Error Handling** :
- **Known Errors** → Handled using a custom `AppError` class. 
- **Unexpected Errors** → Managed by a global error handling middleware, ensuring consistent error responses.  
- **Toast Notification**-Success and error messages are displayed using toast popups for better user feedback.  
-  **Responsiveness** - Works smoothly on **laptop, tablet, and mobile devices**
 

---

## Project Structure


```bash
product-management-app/
│── frontend/              # React frontend
│   ├── public/            # Static files
│   ├── src/               # Source code
│   │   ├── components/    # UI components (AuthForm, Header, ProductForm, ProductCard, etc.)
│   │   ├── context/       # Context API (AuthContext, ProductContext)
│   │   ├── App.js
│   │   └── index.js
│   └── package.json
│
│── backend/               # Express backend
│   ├── models/            # Mongoose models (Product)
│   ├── routes/            # API routes
│   ├── controllers/       # Route handlers
│   ├── middlewares/       # Middleware (auth, error handling)
│   ├── config/            # DB, Cloudinary connection
│   ├── index.js           # Entry point
│   └── package.json
│
│── README.md              # Project documentation

```
# Installation

Clone the repo
```bash
git clone https://github.com/company/product-management-app.git
cd product-management-app
```

# Install dependencies
```bash
cd productManagement-frontend
 npm install
cd productManagement-server
 npm install
```
# Environment Variables

Create .env files in both frontend/ and backend/.
Backend (backend/.env)
```bash
PORT=5000
JWT_SECRET="ur secret key"
ADMIN_EMAIL=test@example.com
ADMIN_PASSWORD=12345
CLOUDINARY_CLOUD_NAME="cloud_name"
CLOUDINARY_API_KEY=api_key
CLOUDINARY_API_SECRET=api_secret
MONGODB_URI=mongodb_uri
```
Frontend (frontend/.env)
```bash 
REACT_APP_BACKEND_URL=http://localhost:5000
 ```

# Running the App
Backend
``` bash
cd backend
npm run dev
```
Frontend
``` bash 
cd frontend
npm start
```
## 📡 API Endpoints

### Auth
- `POST /api/auth/login` → Login user  

###  Products
- `GET /api/products` → Get all products (with query parameters for filtering, sorting, searching)  
- `GET /api/products/categories` → Get all categories (used internally for frontend display)  
- `POST /api/products` → Add a new product  
- `PUT /api/products/:id` → Update an existing product  
- `DELETE /api/products/:id` → Delete a product  

## Deployment

The application is live here:  deployed in Vercel.
 [Live Demo](https://product-management-system-theta-six.vercel.app/)

Backend API:  deployed in Render.
 [API Base URL](https://productmanagementsystem-p7k0.onrender.com)
 
## Screenshots

<img width="1920" height="1080" alt="Screenshot (117)" src="https://github.com/user-attachments/assets/5d054cd9-4062-4ac4-8899-6c7d3df847bb" />

<img width="1905" height="937" alt="Screenshot (118)" src="https://github.com/user-attachments/assets/ae9f7d53-92b2-4353-9982-84522b8f3619" />
<img width="1920" height="965" alt="Screenshot (119)" src="https://github.com/user-attachments/assets/4e5d880f-52f9-4237-9a45-2532355b009d" />
<img width="1920" height="974" alt="Screenshot (120)" src="https://github.com/user-attachments/assets/d62db9ce-7b30-4dc5-89af-acc334762fbd" />
<img width="1920" height="977" alt="Screenshot (121)" src="https://github.com/user-attachments/assets/710d7487-fa1b-4d24-b16d-d545ca7de935" />

<img width="394" height="811" alt="Screenshot (122)" src="https://github.com/user-attachments/assets/a2fabc3a-dbfa-4e06-94d5-e076afa0a975" />

<img width="399" height="801" alt="Screenshot (123)" src="https://github.com/user-attachments/assets/b313be58-3eaf-4520-b640-a95d62a520ef" />








