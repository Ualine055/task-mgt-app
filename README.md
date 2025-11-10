# Firebase CRUD Task App

## Description

A protected CRUD application built with Next.js, TypeScript, Firebase Authentication, and Firestore. This app demonstrates a complete authentication and task management system where users can register, log in, and manage their personal tasks with full create, read, update, and delete functionality.

## Technologies Used

- **Next.js** - React framework for production
- **TypeScript** - Type-safe JavaScript
- **Firebase Authentication** - Secure user authentication with email/password
- **Firestore Database** - Real-time NoSQL database for task storage
- **Tailwind CSS** - Utility-first CSS framework
- **shadcn/ui** - High-quality React components

## Features

✨ **Firebase Authentication**
- User registration with email and password
- Secure login and logout functionality
- Email-based user management

🔐 **Protected Routes**
- Dashboard only accessible to authenticated users
- Automatic redirection to login for unauthorized access
- Session management using Firebase Auth State

📝 **CRUD Operations**
- **Create**: Add new tasks with title, description, and priority
- **Read**: View all your tasks in a dynamic task list
- **Update**: Edit task details and mark tasks as completed
- **Delete**: Remove tasks from the system

👋 **Personalized Dashboard Greeting**
- Greeting message with user's name and email
- Real-time task count display
- Task management interface

## Setup Instructions

### Prerequisites
- Node.js (v16 or higher)
- npm or yarn
- A Firebase project

### Installation

1. **Clone the repository**
   \`\`\`bash
   git clone https://github.com/Ualine055/task-mgt-app.git
   cd firebase-crud-task-app
   \`\`\`

2. **Install dependencies**
   \`\`\`bash
   npm install
   \`\`\`

3. **Add your Firebase config in firebase.ts**
   - Create a `firebase.ts` file in the root directory
   - Add your Firebase configuration from Firebase Console:
   \`\`\`typescript
   import { initializeApp } from 'firebase/app';
   import { getAuth } from 'firebase/auth';
   import { getFirestore } from 'firebase/firestore';

   const firebaseConfig = {
     apiKey: "YOUR_API_KEY",
     authDomain: "YOUR_AUTH_DOMAIN",
     projectId: "YOUR_PROJECT_ID",
     storageBucket: "YOUR_STORAGE_BUCKET",
     messagingSenderId: "YOUR_MESSAGING_SENDER_ID",
     appId: "YOUR_APP_ID"
   };

   const app = initializeApp(firebaseConfig);
   export const auth = getAuth(app);
   export const db = getFirestore(app);
   \`\`\`

4. **Run the development server**
   \`\`\`bash
   npm run dev
   \`\`\`

5. **Open your browser**
   - Navigate to `http://localhost:3000`

## Project Structure

\`\`\`
firebase-crud-task-app/
├── app/
│   ├── layout.tsx           # Root layout
│   ├── page.tsx             # Dashboard page
│   ├── login/
│   │   └── page.tsx         # Login page
│   ├── register/
│   │   └── page.tsx         # Registration page
│   └── globals.css          # Global styles
├── components/
│   ├── TaskForm.tsx         # Form for creating/editing tasks
│   ├── TaskList.tsx         # Display tasks
├── contexts/
│   └── AuthContext.tsx      # Custom hook for auth state
├── lib/
│   └── firebase.ts          # Firebase configuration
|   ├── type.ts
|   └── types.ts
├── firebase.ts              # Firebase config (create this)
└── package.json
\`\`\`


## Deployment

🚀 **Live Application**: [ Vercel Deployment Link](https://task-mgt-app-gdn8-5i9s7fvzx-ualine055-5515s-projects.vercel.app)

## Screenshots

### Login Page
![Login Page](/task-management-app/app/assets/login.PNG)

### Dashboard Page
![Dashboard](/task-management-app/app/assets/dashboard.PNG)

### Create Account Page
![Create Acoount Page](/task-management-app/app/assets/register.PNG)
