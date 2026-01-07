# The Coin Shack

A luxury live coin streaming and commerce platform built with Next.js 14+, TypeScript, and Tailwind CSS.

## Features

- 🪙 Live coin streaming platform
- 🛒 E-commerce integration
- 👥 Host profiles and following
- 📅 Schedule management
- 💬 Community feed
- 👑 VIP membership system
- 🎮 Interactive games (Coin Flip, Case Break, Auction, Mystery Box)
- 📊 Admin dashboard
- 🌓 Dark mode support
- 📱 Fully responsive design

## Tech Stack

- **Framework**: Next.js 14+ (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS v3
- **Database**: Google Firestore
- **State Management**: Zustand
- **Animations**: Framer Motion
- **Icons**: Lucide React
- **Authentication**: NextAuth.js
- **Payments**: Stripe SDK (placeholders)
- **Image Optimization**: Sharp
- **Deployment**: Netlify

## Getting Started

1. Install dependencies:
```bash
npm install
```

2. Set up environment variables:
Create a `.env.local` file with:
```
# Firebase Configuration
NEXT_PUBLIC_FIREBASE_API_KEY=your-api-key
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your-project.firebaseapp.com
NEXT_PUBLIC_FIREBASE_PROJECT_ID=your-project-id
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your-project.appspot.com
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=your-sender-id
NEXT_PUBLIC_FIREBASE_APP_ID=your-app-id

# NextAuth Configuration
NEXTAUTH_SECRET=development-secret-change-in-production
NEXTAUTH_URL=http://localhost:3000

# Stripe (Optional)
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_test_placeholder
STRIPE_SECRET_KEY=sk_test_placeholder
```

For detailed Firestore setup instructions, see [FIRESTORE_SETUP.md](./FIRESTORE_SETUP.md)

3. Run the development server:
```bash
npm run dev
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser.

> **💡 Tip**: The app works with mock data by default! You don't need to set up Firestore for local testing. See [LOCAL_TESTING.md](./LOCAL_TESTING.md) for detailed testing instructions.

## Project Structure

```
/app
  /(auth)          # Authentication pages
  /(main)          # Main application pages
  /(admin)         # Admin dashboard
  /api             # API routes
/components
  /luxury          # Luxury UI components
  /admin           # Admin components
  /screens         # Screen components
/lib               # Utilities, types, store, mock data
/styles            # Global styles
```

## Admin Access

To access admin features, set a user's role to 'admin' in the Zustand store.

## Deployment

This project is configured for deployment to Netlify with Google Firestore integration.

### Quick Deploy

1. Push your code to GitHub/GitLab/Bitbucket
2. Connect your repository to [Netlify](https://app.netlify.com)
3. Set environment variables in Netlify dashboard
4. Deploy!

For detailed deployment instructions, see [DEPLOYMENT.md](./DEPLOYMENT.md)

## Documentation

- [API Documentation](./API.md) - Complete API reference
- [Deployment](./DEPLOYMENT.md) - Netlify deployment
- [Local Testing](./LOCAL_TESTING.md) - Local development with mock data
- [Firestore Setup](./FIRESTORE_SETUP.md) - Google Firestore configuration
- [Mobile App](./MOBILE_SETUP.md) - iOS & Android development
- [Production Checklist](./PRODUCTION_CHECKLIST.md) - Pre-launch checklist

## License

Proprietary - All rights reserved

