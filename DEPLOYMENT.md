# Deployment Guide

This project is configured for automatic deployment to Netlify.

## 🚀 Auto-Deployment

**Already Configured:**
- ✅ GitHub Actions workflow auto-deploys on every push
- ✅ Netlify integration connected
- ✅ Build and deployment automated

Every push to `main` automatically:
1. Builds the project
2. Deploys to Netlify production
3. Updates your live site

## 📋 Manual Deployment (if needed)

### Via Netlify Dashboard

1. Go to [app.netlify.com](https://app.netlify.com)
2. Site will auto-deploy on push, or manually trigger deploy

## 🔥 Google Firestore Setup

### 1. Create Firebase Project

1. Go to [Firebase Console](https://console.firebase.google.com/)
2. Click "Add project" or select an existing project
3. Follow the setup wizard
4. Enable **Firestore Database**:
   - Go to Firestore Database in the left menu
   - Click "Create database"
   - Choose **Production mode** (or Test mode for development)
   - Select a location for your database

### 2. Get Firebase Configuration

1. In Firebase Console, go to Project Settings (gear icon)
2. Scroll down to "Your apps" section
3. Click the web icon (`</>`) to add a web app
4. Register your app (give it a nickname)
5. Copy the Firebase configuration object

### 3. Set Environment Variables in Netlify

In your Netlify dashboard:
1. Go to Site settings → Environment variables
2. Add the following variables:

```
NEXT_PUBLIC_FIREBASE_API_KEY=your-api-key
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your-project.firebaseapp.com
NEXT_PUBLIC_FIREBASE_PROJECT_ID=your-project-id
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your-project.appspot.com
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=your-sender-id
NEXT_PUBLIC_FIREBASE_APP_ID=your-app-id
NEXTAUTH_SECRET=your-nextauth-secret-key
NEXTAUTH_URL=https://your-site.netlify.app
```

**To generate NEXTAUTH_SECRET:**
```bash
openssl rand -base64 32
```
Or use an online generator like: https://generate-secret.vercel.app/32

### 4. Firestore Security Rules

Set up Firestore security rules in Firebase Console:

1. Go to Firestore Database → Rules
2. Add appropriate rules (example below - adjust for your needs):

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    // Hosts - public read, admin write
    match /hosts/{document=**} {
      allow read: if true;
      allow write: if request.auth != null && get(/databases/$(database)/documents/users/$(request.auth.uid)).data.role == 'admin';
    }
    
    // Streams - public read, authenticated write
    match /streams/{document=**} {
      allow read: if true;
      allow create: if request.auth != null;
      allow update, delete: if request.auth != null && request.resource.data.hostId == request.auth.uid;
    }
    
    // Games - public read, authenticated write
    match /games/{document=**} {
      allow read: if true;
      allow create: if request.auth != null;
      allow update, delete: if request.auth != null && request.resource.data.hostId == request.auth.uid;
    }
    
    // Products - public read, admin write
    match /products/{document=**} {
      allow read: if true;
      allow write: if request.auth != null && get(/databases/$(database)/documents/users/$(request.auth.uid)).data.role == 'admin';
    }
    
    // Posts - public read, authenticated write
    match /posts/{document=**} {
      allow read: if true;
      allow create: if request.auth != null;
      allow update, delete: if request.auth.uid == resource.data.authorId;
    }
    
    // Users - read own, write own
    match /users/{userId} {
      allow read: if request.auth != null;
      allow write: if request.auth != null && request.auth.uid == userId;
    }
    
    // Spot Prices - public read, admin write
    match /spotPrices/{document=**} {
      allow read: if true;
      allow write: if request.auth != null && get(/databases/$(database)/documents/users/$(request.auth.uid)).data.role == 'admin';
    }
  }
}
```

### 5. Create Firestore Collections

Your Firestore database should have these collections:
- `hosts` - Host profiles
- `streams` - Live streams
- `games` - Interactive games
- `products` - E-commerce products
- `posts` - Community posts
- `users` - User accounts
- `spotPrices` - Metal spot prices

You can create them manually or let them be created automatically when you first write data.


## 📊 Build Configuration

- Build command: `npm run build`
- Publish directory: `.next`
- Node version: 20

## 🐛 Troubleshooting

### Build Fails
- Check environment variables are set in Netlify dashboard
- Verify Node version (should be 20+)
- Review build logs in Netlify dashboard

### Firestore Connection Issues
- Verify all `NEXT_PUBLIC_FIREBASE_*` environment variables are set
- Check Firestore security rules
- Ensure Firestore is enabled in Firebase Console

### API Routes Not Working
- Make sure Firestore collections exist
- Check Firestore security rules allow reads
- Review browser console and Netlify function logs

## 📚 Next Steps After Deployment

1. ✅ Set environment variables in Netlify
2. ✅ Configure Firestore security rules
3. ✅ Create Firestore collections (or migrate mock data)
4. ✅ Update API routes to use Firestore
5. ✅ Test authentication flows
6. ✅ Configure custom domain (optional)
7. ✅ Set up monitoring and analytics

---

**Your application is ready for Netlify deployment with Firestore! 🚀**
