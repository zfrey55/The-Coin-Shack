# Deployment Guide for The Coin Shack - Netlify & Firestore

Your application is configured for deployment to Netlify with Google Firestore integration.

## ✅ Pre-Deployment Checklist

- ✅ Build verified successfully
- ✅ Git repository initialized
- ✅ Netlify configuration created (`netlify.toml`)
- ✅ Firebase/Firestore dependencies installed
- ✅ Firestore integration utilities created

## 🚀 Deploy to Netlify

### Option 1: Deploy via Netlify CLI (Recommended)

1. **Install Netlify CLI globally (if not already installed):**
   ```bash
   npm install -g netlify-cli
   ```

2. **Login to Netlify:**
   ```bash
   netlify login
   ```
   This will open a browser window for authentication.

3. **Initialize and deploy:**
   ```bash
   netlify init
   ```
   Follow the prompts:
   - Create & configure a new site? **Yes**
   - Team: Select your team
   - Site name: `the-coin-shack` (or your preferred name)
   - Build command: `npm run build` (press Enter)
   - Directory to deploy: `.next` (press Enter)

4. **Deploy to production:**
   ```bash
   netlify deploy --prod
   ```

### Option 2: Deploy via Netlify Web Interface

1. Go to [app.netlify.com](https://app.netlify.com) and sign in
2. Click "Add new site" → "Import an existing project"
3. Connect to your Git provider (GitHub, GitLab, or Bitbucket)
   - If you haven't pushed to Git yet, see Git Setup below
4. Configure build settings:
   - Build command: `npm run build`
   - Publish directory: `.next`
5. Click "Deploy site"

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

## 📝 Git Setup (Recommended)

1. **Configure Git (one-time):**
   ```bash
   git config user.email "your-email@example.com"
   git config user.name "Your Name"
   ```

2. **Create initial commit:**
   ```bash
   git add .
   git commit -m "Initial commit - ready for deployment"
   ```

3. **Push to GitHub/GitLab/Bitbucket:**
   ```bash
   git remote add origin https://github.com/yourusername/the-coin-shack.git
   git branch -M main
   git push -u origin main
   ```

4. **Connect to Netlify:**
   - In Netlify, import from your Git repository
   - This enables automatic deployments on every push

## 🔄 Using Firestore in Your API Routes

Your API routes are currently using mock data. To switch to Firestore:

1. Update each API route file (in `app/api/*/route.ts`)
2. Replace mock data imports with Firestore functions:

**Example - `app/api/hosts/route.ts`:**
```typescript
import { getHosts } from '@/lib/firestore';
import { NextResponse } from 'next/server';

export async function GET() {
  try {
    const hosts = await getHosts();
    return NextResponse.json(hosts, {
      headers: {
        'Cache-Control': 'public, s-maxage=60, stale-while-revalidate=300',
      },
    });
  } catch (error) {
    console.error('Error fetching hosts:', error);
    return NextResponse.json({ error: 'Failed to fetch hosts' }, { status: 500 });
  }
}
```

Apply similar changes to:
- `app/api/streams/route.ts`
- `app/api/games/route.ts`
- `app/api/products/route.ts`
- `app/api/posts/route.ts`
- `app/api/pricing/route.ts`

## 🎯 Quick Deploy Commands

```bash
# Login (one-time)
netlify login

# Deploy to production
netlify deploy --prod

# Or build and deploy
npm run build && netlify deploy --prod
```

## 📊 Build Configuration

Your `netlify.toml` is configured with:
- Build command: `npm run build`
- Publish directory: `.next`
- Node version: 20
- Next.js plugin: `@netlify/plugin-nextjs` (auto-installed by Netlify)

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
