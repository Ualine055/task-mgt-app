# Firebase CRUD Task App

A protected CRUD app built with Next.js and TypeScript that uses Firebase Authentication and Firestore. Authenticated users can create, read, update, and delete tasks. The dashboard greets the user by their email and all CRUD operations are scoped to the logged-in user.

## Technologies Used
- Next.js
- TypeScript
- Firebase Authentication
- Cloud Firestore

## Features
- Firebase Authentication (email/password)
- Protected Routes (dashboard and CRUD only for authenticated users)
- CRUD Operations (create, read, update, delete tasks)
- Personalized Dashboard Greeting (shows user email)

## Setup Instructions

### 1) Clone the repository
```
git clone https://github.com/Ualine055/task-mgt-app.git
cd task-mgt-app/task-management-app
```

### 2) Install dependencies
```
npm install
```

### 3) Add your Firebase config
Create a file named `.env.local` in `task-management-app/` with your Firebase Web App config values (no quotes):
```
NEXT_PUBLIC_FIREBASE_API_KEY=YOUR_API_KEY
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=YOUR_AUTH_DOMAIN
NEXT_PUBLIC_FIREBASE_PROJECT_ID=YOUR_PROJECT_ID
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=YOUR_STORAGE_BUCKET
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=YOUR_SENDER_ID
NEXT_PUBLIC_FIREBASE_APP_ID=YOUR_APP_ID
```
You can find these in Firebase Console → Project Settings → Your apps → Web app → SDK setup and configuration.

### 4) Run the development server
```
npm run dev
```
Open the printed localhost URL in your browser.

## Deployment Link
Add your live Vercel link here:

- https://your-vercel-deployment-url.vercel.app/

## Screenshots
Add screenshots of the login and dashboard pages here (commit images to `public/` and reference them):

- Login: `public/screenshots/login.png`
- Dashboard: `public/screenshots/dashboard.png`

Example Markdown once added:
```
![Login](public/screenshots/login.png)
![Dashboard](public/screenshots/dashboard.png)
```

## Testing Credentials (for evaluation)
Use the following demo account (ensure it exists in Firebase Authentication and has at least one or two tasks in Firestore):

- Email: `testuser@gmail.com`
- Password: `test1234`

## Notes
- Only authenticated users can access the dashboard and perform CRUD operations.
- Tasks are filtered per user using their email stored on each task document.

## Development scripts
- `npm run dev` – start development server
- `npm run build` – build for production
- `npm start` – run production server
- `npm run lint` – run ESLint
