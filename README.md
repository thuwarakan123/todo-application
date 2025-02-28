# 📝 To-Do Application

## 📌 Project Overview  
This is a **Full-Stack To-Do Application** built with:  
- **Backend:** Node.js (Express) with PostgreSQL  
- **Frontend:** React (Vite) with MUI  
- **Database:** PostgreSQL (Running in Docker)  
- **Authentication:** JWT-based Login & Register  

## 🎯 Features  
✅ **User Authentication (Register & Login)**  
✅ **Manage Tasks (Add, Mark Complete, View Completed)**  
✅ **Industry-Standard UI with MUI**  
✅ **Fully Dockerized Setup**  

---

## 🛠️ **Setup & Installation**  

### **🔹 Prerequisites**  
Before running the project, ensure you have:  
- **Node.js (v16+)** installed  
- **Docker & Docker Compose** installed  

### **🔹 Clone the Repository**  
```bash
git clone https://github.com/yourusername/todo-application.git
cd todo-application
```

### **🔹 Run with Docker (Recommended)**
```bash
docker-compose up --build
```
- The **backend** will be available at `http://localhost:3000`  
- The **frontend** will be available at `http://localhost:5173`  
- PostgreSQL database runs inside Docker  

### **🔹 Run Without Docker**  
#### **Backend Setup**  
```bash
cd backend
npm install
npm run dev
```
- Ensure you have **PostgreSQL running locally** and update `.env` file  

#### **Frontend Setup**  
```bash
cd frontend
npm install
npm run dev
```
- Open `http://localhost:5173` in your browser  

---

## 🔑 **Environment Variables**  
Create a **`.env`** file inside `backend/` and add:  
```env
PORT=3000
DB_HOST=db
DB_PORT=5432
DB_USER=postgres
DB_PASSWORD=yourpassword
DB_NAME=todo_db
JWT_SECRET=your-secret-key
```

---

## 💻 **API Documentation & Testing**  
We have created a **Postman Collection** for testing API endpoints.  
📂 **Find it in the project root**: `ToDo Application.postman_collection.json`  

### **🔹 API Endpoints**
| Endpoint            | Method | Description                | Auth Required |
|---------------------|--------|----------------------------|--------------|
| `/api/v1/auth/register` | POST   | Register a new user       | ❌ No        |
| `/api/v1/auth/login`    | POST   | Login & get JWT token    | ❌ No        |
| `/api/v1/tasks`         | GET    | Get all **incomplete** tasks | ✅ Yes |
| `/api/v1/tasks/completed` | GET    | Get all **completed** tasks | ✅ Yes |
| `/api/v1/tasks`         | POST   | Add a new task           | ✅ Yes |
| `/api/v1/tasks/:id`     | PATCH  | Mark task as completed   | ✅ Yes |

🔹 **Use the Postman collection to test these APIs.**  

---

## 🚀 **Project Structure**  
```
todo-application/
│── backend/          # Backend (Express & PostgreSQL)
│   ├── src/
│   │   ├── controllers/
│   │   ├── routes/
│   │   ├── models/
│   │   ├── services/
│   │   ├── middlewares/
│   │   └── server.js
│   ├── Dockerfile
│   ├── package.json
│   └── .env
│
│── frontend/         # Frontend (React & MUI)
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── services/
│   │   └── App.jsx
│   ├── Dockerfile
│   ├── package.json
│
│── docker-compose.yml
│── ToDo Application.postman_collection.json  # Postman API Collection
│── README.md
```
🔹 **Follows best practices with clear separation of concerns.**  

---

## 🛠 **Troubleshooting**  

1️⃣ **Docker container doesn’t start?**  
- Run `docker-compose down` and then `docker-compose up --build`  

2️⃣ **Frontend or Backend not accessible?**  
- Ensure `docker ps` shows the containers running  
- Check logs using `docker-compose logs`  

3️⃣ **Database Connection Issues?**  
- Ensure the `.env` file has the correct PostgreSQL credentials  

---

## 🎯 **Next Steps**  
🚀 **Features to be added in the future:**  
- ✅ Task Editing Feature  
- ✅ Better UI Animations  
- ✅ Unit & Integration Tests  

---

## 👨‍👩‍👧 **Contributors**  
**Your Name** - [GitHub](https://github.com/yourusername)  

🙌 **Contributions are welcome!** Fork the repo & create a PR.  
```


 
