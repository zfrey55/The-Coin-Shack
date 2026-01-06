# Firestore Setup Guide

This guide will help you set up Google Firestore for The Coin Shack application.

## 📋 Prerequisites

- Google account
- Firebase project (or create one at [Firebase Console](https://console.firebase.google.com/))

## 🔥 Step 1: Create Firebase Project

1. Go to [Firebase Console](https://console.firebase.google.com/)
2. Click "Add project"
3. Enter project name: `the-coin-shack` (or your preferred name)
4. Disable Google Analytics (optional) or enable if you want it
5. Click "Create project"
6. Wait for project to be created, then click "Continue"

## 💾 Step 2: Enable Firestore Database

1. In Firebase Console, click on **Firestore Database** in the left menu
2. Click **"Create database"**
3. Choose **Production mode** (recommended for production) or **Test mode** (for development)
   - **Production mode**: Requires security rules
   - **Test mode**: Open for 30 days (then requires rules)
4. Select a **location** for your database (choose closest to your users)
5. Click **"Enable"**

## 🔑 Step 3: Get Firebase Configuration

1. In Firebase Console, click the **gear icon** (⚙️) next to "Project Overview"
2. Select **"Project settings"**
3. Scroll down to **"Your apps"** section
4. Click the **web icon** (`</>`) to add a web app
5. Register your app:
   - App nickname: `The Coin Shack Web`
   - Firebase Hosting: Not set up (you can skip this)
6. Click **"Register app"**
7. Copy the Firebase configuration object that looks like this:

```javascript
const firebaseConfig = {
  apiKey: "AIza...",
  authDomain: "your-project.firebaseapp.com",
  projectId: "your-project-id",
  storageBucket: "your-project.appspot.com",
  messagingSenderId: "123456789",
  appId: "1:123456789:web:abcdef"
};
```

## 🔒 Step 4: Set Firestore Security Rules

1. In Firebase Console, go to **Firestore Database** → **Rules**
2. Replace the default rules with:

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    // Helper function to check if user is admin
    function isAdmin() {
      return request.auth != null && 
        get(/databases/$(database)/documents/users/$(request.auth.uid)).data.role == 'admin';
    }
    
    // Helper function to check if user owns resource
    function isOwner(userId) {
      return request.auth != null && request.auth.uid == userId;
    }
    
    // Hosts - Public read, Admin write
    match /hosts/{hostId} {
      allow read: if true;
      allow create, update, delete: if isAdmin();
    }
    
    // Streams - Public read, Authenticated users can create, Host can update
    match /streams/{streamId} {
      allow read: if true;
      allow create: if request.auth != null;
      allow update, delete: if request.auth != null && 
        resource.data.hostId == request.auth.uid;
    }
    
    // Games - Public read, Authenticated users can create, Host can update
    match /games/{gameId} {
      allow read: if true;
      allow create: if request.auth != null;
      allow update, delete: if request.auth != null && 
        resource.data.hostId == request.auth.uid;
    }
    
    // Products - Public read, Admin write
    match /products/{productId} {
      allow read: if true;
      allow create, update, delete: if isAdmin();
    }
    
    // Posts - Public read, Authenticated users can create, Author can update/delete
    match /posts/{postId} {
      allow read: if true;
      allow create: if request.auth != null;
      allow update, delete: if request.auth != null && 
        resource.data.authorId == request.auth.uid;
    }
    
    // Users - Users can read/write their own data
    match /users/{userId} {
      allow read: if request.auth != null;
      allow create: if request.auth != null;
      allow update, delete: if isOwner(userId);
    }
    
    // Spot Prices - Public read, Admin write
    match /spotPrices/{priceId} {
      allow read: if true;
      allow create, update, delete: if isAdmin();
    }
  }
}
```

3. Click **"Publish"**

⚠️ **Note**: For initial testing, you can use Test mode temporarily, but remember to set proper rules before going to production!

## 📦 Step 5: Create Collections Structure

Your Firestore database will automatically create collections when you first write data. However, you can manually create them if preferred:

### Collections to create:

1. **hosts** - Store host profiles
2. **streams** - Store live stream information
3. **games** - Store interactive games
4. **products** - Store e-commerce products
5. **posts** - Store community posts
6. **users** - Store user accounts
7. **spotPrices** - Store metal spot prices

### To create collections manually:

1. In Firestore Database, click **"Start collection"**
2. Enter collection ID (e.g., `hosts`)
3. Add a test document (you can delete it later):
   - Document ID: Click "Auto-ID"
   - Add a field (e.g., `name` with value `test`)
4. Click **"Save"**

## 🌐 Step 6: Set Environment Variables

### For Local Development

Create a `.env.local` file in your project root:

```env
NEXT_PUBLIC_FIREBASE_API_KEY=your-api-key-here
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your-project.firebaseapp.com
NEXT_PUBLIC_FIREBASE_PROJECT_ID=your-project-id
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your-project.appspot.com
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=your-sender-id
NEXT_PUBLIC_FIREBASE_APP_ID=your-app-id

NEXTAUTH_SECRET=your-nextauth-secret
NEXTAUTH_URL=http://localhost:3000
```

### For Netlify Deployment

1. Go to your Netlify site dashboard
2. Navigate to **Site settings** → **Environment variables**
3. Add each variable:
   - Key: `NEXT_PUBLIC_FIREBASE_API_KEY`
   - Value: (paste from Firebase config)
   - Scopes: Select **Production**, **Preview**, and **Development**
4. Repeat for all environment variables

## 🧪 Step 7: Test Connection

1. Start your development server:
   ```bash
   npm run dev
   ```

2. The Firestore connection will be established automatically when you use any Firestore functions.

3. Check Firebase Console → Firestore Database to see if data is being written.

## 📊 Step 8: Migrate Mock Data (Optional)

You can migrate your mock data to Firestore for testing:

1. Use the Firestore console to manually add data, or
2. Create a migration script (example below)

### Example Migration Script

Create `scripts/migrate-data.ts`:

```typescript
import { initializeApp } from 'firebase/app';
import { getFirestore, collection, addDoc } from 'firebase/firestore';
import { mockHosts, mockStreams, mockGames, mockProducts, mockPosts } from '../lib/mock-data';

// Your Firebase config
const firebaseConfig = { /* ... */ };

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

async function migrate() {
  // Migrate hosts
  for (const host of mockHosts) {
    await addDoc(collection(db, 'hosts'), host);
  }
  
  // Migrate other collections...
  console.log('Migration complete!');
}

migrate();
```

## 🔍 Monitoring and Debugging

### View Firestore Data

- Go to Firebase Console → Firestore Database
- Click on any collection to view documents
- Use the console to manually edit/delete documents

### Check Firestore Usage

- Firebase Console → Usage and billing
- Monitor read/write operations
- Set up billing alerts

### Debug Rules

- Use Rules Playground in Firestore Rules tab
- Test your security rules before publishing

## 📚 Additional Resources

- [Firestore Documentation](https://firebase.google.com/docs/firestore)
- [Security Rules Guide](https://firebase.google.com/docs/firestore/security/get-started)
- [Firebase Console](https://console.firebase.google.com/)

---

**Your Firestore is now set up and ready to use! 🎉**

