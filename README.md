# Firebase CRUD Task App

## Description

A protected CRUD app built with Next.js (App Router) + TypeScript, Firebase Authentication, and Firestore. Authenticated users can create, read, update, and delete their own tasks. The dashboard greets the user by email and all operations run against Firestore.

## Technologies Used

- Next.js (App Router) + TypeScript
- Firebase Authentication
- Cloud Firestore
- Tailwind CSS

## Features

- Firebase Authentication (Email/Password)
- Protected Routes (dashboard only for logged-in users)
- CRUD Operations (Tasks in Firestore)
- Personalized Dashboard Greeting (Hello, user@email)

## Setup Instructions

### Setup Instructions

1) Clone the repository
```bash
git clone https://github.com/Ualine055/task-mgt-app.git
cd task-mgt-app/task-management-app
```

2) Install dependencies
```bash
npm install
```

3) Firebase configuration
- Create a Firebase project and enable:
  - Authentication: Email/Password provider
  - Firestore Database
- Add a Web App in Firebase console and copy the config.
- Provide these env vars (create `.env.local` at project root `task-management-app/`):
```
NEXT_PUBLIC_FIREBASE_API_KEY=...
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=...
NEXT_PUBLIC_FIREBASE_PROJECT_ID=...
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=...
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=...
NEXT_PUBLIC_FIREBASE_APP_ID=...
```

4) Run the app
```bash
npm run dev
# open http://localhost:3000 (or the printed port)
```

## Project Structure (key files)

- `app/login/page.tsx` — Login page
- `app/register/page.tsx` — Register page
- `app/page.tsx` — Protected Dashboard (TaskForm + TaskList)
- `contexts/AuthContext.tsx` — Auth provider using `useAuthState`
- `lib/firebase.ts` — Firebase app, `auth`, and `db` setup
- `lib/types.ts` — Task and Auth context types
- `components/TaskForm.tsx` — Create/Edit task form
- `components/TaskList.tsx` — Task list with complete/edit/delete

## Project Structure (full)

```
task-mgt-app/
├─ README.md                      # Root README (this file)
└─ task-management-app/
   ├─ .env.local                  # Firebase env vars (not committed)
   ├─ .gitignore
   ├─ next.config.ts
   ├─ package.json
   ├─ package-lock.json
   ├─ postcss.config.mjs
   ├─ tsconfig.json
   ├─ eslint.config.mjs
   ├─ next-env.d.ts
   ├─ middleware.ts               # (Deprecated middleware; optional to migrate later)
   ├─ public/
   │  └─ ...                      # Static assets (favicons, screenshots, etc.)
   ├─ app/
   │  ├─ globals.css
   │  ├─ layout.tsx               # Wraps app with AuthProvider
   │  ├─ page.tsx                 # Dashboard (protected)
   │  ├─ login/
   │  │  └─ page.tsx              # Login page
   │  └─ register/
   │     └─ page.tsx              # Register page
   ├─ components/
   │  ├─ TaskForm.tsx             # Create/Edit form
   │  └─ TaskList.tsx             # List + toggle/edit/delete
   ├─ contexts/
   │  └─ AuthContext.tsx          # Auth provider (react-firebase-hooks)
   └─ lib/
      ├─ firebase.ts              # Firebase app, auth, db (validated via env)
      └─ types.ts                 # Task and Auth context types
```

## Deployment (Vercel)

1. Push to GitHub (env vars are not committed)
2. Create a new Vercel project from this repo
3. Set Root Directory to `task-management-app`
4. In Vercel Project Settings → Environment Variables, add the Firebase vars above
5. Deploy

 **Live Application**: [Vercel Deployment Link](task-mgt-app-gdn8.vercel.app)

## Screenshots

### Login Page
![Login Page](/task-management-app/app/assets/login.PNG)

### Dashboard Page
![Dashboard](/task-management-app/app/assets/dashboard.PNG)

### Create Account Page
![Create Account Page](/task-management-app/app/assets/register.PNG)

## Testing Credentials (for evaluation)

- Email: `testuser@gmail.com`
- Password: `test1234`

Ensure this account exists in Firebase Authentication and has one or two tasks in Firestore for demonstration.
