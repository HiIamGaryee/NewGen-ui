# AI Healthcare Backend

Welcome to the **AI Healthcare Backend** repository. This server-side application powers the AI Healthcare system, managing user authentication, health data processing, and database integration.

## 🧠 Overview

This backend is part of a full-stack AI-powered healthcare app. It manages:

- Secure user registration and login
- Health and wellness data endpoints
- MongoDB data storage and validation
- Session handling and cross-origin requests

## ⚙️ Tech Stack

- **[Node.js](https://nodejs.org/en)** – JavaScript runtime  
- **[Express.js](https://expressjs.com/)** – Web framework  
- **[MongoDB](https://www.mongodb.com/)** – NoSQL database  
- **[Mongoose](https://mongoosejs.com/)** – ODM for MongoDB  
- **[express-session](https://github.com/expressjs/session)** – Session management  
- **[dotenv](https://github.com/motdotla/dotenv)** – Environment variables  
- **[bcryptjs](https://github.com/dcodeIO/bcrypt.js)** – Password hashing  
- **[cors](https://github.com/expressjs/cors)** – Cross-origin resource sharing  

## 📦 Prerequisites

- Node.js v14+
- MongoDB (local or Atlas)

## 🛠 Installation

Clone the repo and install dependencies:

```bash
git clone https://github.com/HiIamGaryee/NewGen-ui.git
```

```bash
cd NewGen-ui/ai-healthcare-backend
```

```bash
npm install
```

## 🔐 Configuration

Create a .env file inside the ai-healthcare-backend folder.
Example content refer .env.example

```bash
MONGO_URI=mongodb+srv://<username>:<password>@cluster0.apaaj.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0
PORT=8081
SESSION_SECRET=your_session_secret
NODE_ENV=development
FRONTEND_URL="http://localhost:8081"
```

## 🚀 Running the Server

```bash
node server.js
```

The backend should now be running at:
http://localhost:8080

## 📄 License

This project is open-source and available under the MIT License.
