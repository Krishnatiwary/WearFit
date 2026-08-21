# WearFit 👕🤖

WearFit is an AI-powered digital wardrobe platform that helps users organize their clothes, manage their wardrobe, and get personalized outfit recommendations based on weather, occasion, season, and clothing compatibility.

## 🚀 Vision

Stop wasting time deciding what to wear.

Upload your wardrobe once and let WearFit help you discover suitable outfits for different occasions.

## ✨ Key Features

- 🔐 User Authentication
- 👕 Digital Wardrobe Management
- 📤 Upload Clothing Items
- ✏️ Edit Clothing Details
- 🗑️ Delete Clothing Items
- 🔍 Wardrobe Search
- 🤖 AI Outfit Recommendations
- 🌤️ Weather-based Outfit Suggestions
- 🎨 Color Compatibility Matching
- 📅 Weekly Outfit Planner
- 🔔 Browser Notifications
- ⚙️ User Settings
- 📊 Dashboard Statistics
- 🗄️ MongoDB Database Integration
- 🔑 JWT-based Authentication

## 🤖 AI Stylist

WearFit's AI Stylist analyzes wardrobe items using factors such as:

- Occasion
- Weather
- Temperature
- Humidity
- Season
- Clothing category
- Color compatibility

It generates outfit combinations and provides a match score along with an explanation for the recommendation.

## 🛠️ Tech Stack

### Frontend

- React
- Vite
- Tailwind CSS
- React Router
- Axios
- React Icons

### Backend

- Python
- FastAPI
- Uvicorn
- Pydantic

### Database

- MongoDB
- MongoDB Atlas

### Authentication

- JWT
- Password Hashing

### APIs & Services

- Open-Meteo Weather API
- Browser Notification API

## 📁 Project Structure

```text
WearFit/
│
├── backend/
│   ├── controllers/
│   ├── database/
│   ├── models/
│   ├── routes/
│   ├── services/
│   ├── utils/
│   ├── uploads/
│   ├── notifications.py
│   ├── main.py
│   └── requirements.txt
│
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── App.jsx
│   │   └── ProtectedRoute.jsx
│   ├── package.json
│   └── vite.config.js
│
├── dataset/
├── docs/
├── images/
├── models/
├── requirements.txt
└── README.md