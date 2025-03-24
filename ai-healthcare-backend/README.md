# NewGen Backend

This is the backend server for our AI-powered healthcare assistant. It receives health data (like weight, height, exercise, heartbeat) and stores it in a database. It also supports multiple languages using i18n for international users.

## How to Run This Project

1. Open your terminal or Git Bash  
2. Go to the backend folder:
```bash
cd NewGen-backend

Install the necessary packages:
npm install

Start the server:
npm start

The server will run at:
http://localhost:3000

API Endpoints
POST /api/health/record
Save daily health data like:

Exercise minutes
Water intake
Weight

Request body example:
{
  "userId": "abc123",
  "date": "2025-03-23",
  "exerciseMinutes": 30,
  "waterIntake": 1.5,
  "weight": 55
}

GET /api/health/records/:userId
Get all saved health records for one user.

POST /api/health/metrics
Save a user’s weight and height.

Request body example:

{
  "userId": "abc123",
  "weight": 54.5,
  "height": 160
}

POST /api/health/heartbeat
Save or update a user’s heartbeat.

Request body example:

{
  "userId": "abc123",
  "heartbeat": 78
}

Language Support (i18n)
You can view translated messages by adding ?lang=xx to the URL.

Supported languages:

en → English (default)
es → Spanish
zh → Chinese

Example:
http://localhost:3000/api/health/metrics?lang=es