# FolioBuild - Portfolio Builder for Students

A production-ready web application that allows students and job seekers to create professional portfolio websites without any technical knowledge.

![License](https://img.shields.io/badge/license-MIT-blue.svg)
![React](https://img.shields.io/badge/frontend-React-blue?logo=react)
![Node](https://img.shields.io/badge/backend-Node.js-green?logo=nodedotjs)
![MongoDB](https://img.shields.io/badge/database-MongoDB-brightgreen?logo=mongodb)

## 🚀 Features

- **Quick Setup**: Create your professional profile in minutes.
- **Real-time Preview**: See changes instantly as you edit your profile, skills, and projects.
- **Project Showcase**: Highlight your work with descriptions, tech stacks, and direct links to code and live demos.
- **Modern Theme**: Professionally designed, responsive templates focused on readability and impact.
- **Shareable Link**: Get a unique URL (e.g., `/portfolio/johndoe`) to share with recruiters or on social media.
- **Responsive Design**: Looks great on mobile, tablet, and desktop.

## 🛠️ Tech Stack

- **Frontend**: React (Vite), Tailwind CSS, Framer Motion, Lucide React.
- **Backend**: Node.js, Express.
- **Database**: MongoDB (Mongoose ODM).
- **State Management**: React Context API.
- **Icons & UI**: Lucide React + Custom Design System.

## 📦 Project Structure

```text
/client
   /src
      /components   # Reusable UI elements
      /pages        # Top-level page components
      /context      # Auth and Portfolio state
      /hooks        # Custom React hooks
      /services     # API communication logic
      App.jsx       # Routing setup
      main.jsx      # Entry point
/server
   /controllers    # Request handlers
   /routes         # API endpoints
   /models         # MongoDB schemas
   /middleware     # Auth and error handling
   server.js       # Main entry point
```

## ⚙️ Setup Instructions

### Prerequisites
- Node.js (v16+)
- MongoDB (Local or Atlas)

### Backend Setup
1. Navigate to `/server`.
2. Install dependencies: `npm install`.
3. Create a `.env` file based on `.env.example`:
   ```env
   PORT=5000
   MONGODB_URI=your_mongodb_connection_string
   JWT_SECRET=your_jwt_secret
   JWT_EXPIRE=30d
   ```
4. Start the server: `npm run dev` (if nodemon installed) or `node server.js`.

### Frontend Setup
1. Navigate to `/client`.
2. Install dependencies: `npm install`.
3. Start the dev server: `npm run dev`.
4. Open your browser at `http://localhost:5173`.

## 🚢 Deployment (Render/Vercel)

### Backend (Render)
1. Push your code to GitHub.
2. Create a "Web Service" on Render.
3. Root Directory: `server`.
4. Build Command: `npm install`.
5. Start Command: `node server.js`.
6. Add environment variables in Render settings.

### Frontend (Vercel)
1. Root Directory: `client`.
2. Framework Preset: `Vite`.
3. Build Command: `npm run build`.
4. Output Directory: `dist`.
5. Add backend URL as an environment variable if needed.

## 🔮 Future Enhancements
- [ ] Multiple professional templates/themes.
- [ ] Export portfolio as PDF.
- [ ] Drag-and-drop project reordering.
- [ ] Integration with GitHub API to auto-import projects.
- [ ] Custom domain support.

## 📄 License
This project is licensed under the MIT License.
