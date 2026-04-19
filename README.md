# Developer Portfolio with CMS

A full-stack developer portfolio built with Astro + React frontend and Express + MongoDB backend.

## Tech Stack

- **Frontend**: Astro, React, Tailwind CSS, Framer Motion
- **Backend**: Express.js, MongoDB, Mongoose
- **Features**: Responsive design, smooth animations, CMS API

## Quick Start

### Frontend
```bash
cd frontend
npm install
npm run dev
```

### Backend
```bash
cd backend
npm install
# Make sure MongoDB is running
npm start
```

## Environment Variables

Create `.env` in backend directory:
```
PORT=5000
MONGODB_URI=mongodb://localhost:27017/portfolio
JWT_SECRET=your-secret-key
```

## API Endpoints

- `GET /api/projects` - List all projects
- `POST /api/projects` - Create project
- `GET /api/experience` - List all experiences
- `POST /api/contact` - Send contact message
- `POST /api/auth/login` - Admin login

## Admin Access

Default password: `admin123`
