# AI Healthcare Backend

Welcome to the **AI Healthcare Backend** repository. This server-side application powers the AI Healthcare system, managing user authentication, health data processing, and database integration.

## 🧠 Overview

This backend is part of a full-stack AI-powered healthcare app. It manages:

- Secure user registration and login
- Health and wellness data endpoints
- MongoDB data storage and validation
- Session handling and cross-origin requests

## ⚙️ Tech Stack

- **Node.js** – Runtime
- **Express.js** – Web framework
- **MongoDB** – NoSQL database
- **Mongoose** – ODM for MongoDB
- **express-session** – Session management
- **dotenv** – Environment variables
- **bcryptjs** – Password hashing
- **cors** – Cross-origin resource sharing

## 📦 Prerequisites

- Node.js v14+
- MongoDB (local or Atlas)

## 🛠 Installation

Clone the repo and install dependencies:

```bash
git clone https://github.com/HiIamGaryee/NewGen-ui.git
cd NewGen-ui/ai-healthcare-backend
npm install

🔐 Configuration
Create a .env.local file inside the ai-healthcare-backend folder. Example content:
MONGO_URI=mongodb://localhost:27017/ai-healthcare
SESSION_SECRET=your_super_secret_key
PORT=8080

🚀 Running the Server
node server.js

The backend should now be running at:
http://localhost:8080

📄 License
This project is open-source and available under the MIT License.
