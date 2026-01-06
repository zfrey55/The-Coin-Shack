# The Coin Shack - Mobile App

This directory contains the mobile app implementation for iOS and Android.

## 🚀 Getting Started

### Prerequisites

- Node.js 18+ installed
- iOS development: macOS with Xcode 14+
- Android development: Android Studio
- Expo CLI (optional, for easier development)

### Installation

```bash
# Install dependencies
npm install

# For iOS development
cd ios && pod install && cd ..

# Start development server
npm run mobile:dev
```

## 📱 Mobile App Architecture

### Recommended Approach: React Native with Expo

1. **Expo (Recommended for quick start)**
   - Easy setup and deployment
   - Over-the-air updates
   - Managed workflow

2. **React Native CLI (For more control)**
   - Full native module access
   - More customization
   - Requires more setup

3. **Hybrid Approach**
   - Use Expo for development
   - Eject when needed for native modules

## 🔗 API Integration

The mobile app connects to the same backend API as the web app:

```
Production API: https://your-domain.netlify.app/api
```

### API Endpoints

All endpoints from the web app are available:
- `/api/auth/[...nextauth]` - Authentication
- `/api/hosts` - Host data
- `/api/streams` - Live streams
- `/api/games` - Games
- `/api/products` - Products
- `/api/posts` - Community posts
- `/api/pricing` - Spot prices

## 📦 Project Structure

```
mobile/
├── src/
│   ├── components/     # Reusable components
│   ├── screens/        # Screen components
│   ├── navigation/     # Navigation setup
│   ├── services/       # API services
│   ├── store/          # State management
│   └── utils/          # Utilities
├── assets/             # Images, fonts, etc.
├── ios/                # iOS native code
├── android/            # Android native code
└── app.json            # Expo configuration
```

## 🔧 Environment Setup

Create `mobile/.env`:

```env
API_URL=https://your-domain.netlify.app
NEXT_PUBLIC_FIREBASE_API_KEY=your-key
NEXT_PUBLIC_FIREBASE_PROJECT_ID=your-project-id
```

## 📲 Building for Production

### iOS

```bash
# Build for App Store
npm run build:ios

# Or using Expo
eas build --platform ios
```

### Android

```bash
# Build for Play Store
npm run build:android

# Or using Expo
eas build --platform android
```

## 🎨 Design Considerations

- Follow iOS Human Interface Guidelines
- Follow Material Design for Android
- Maintain brand consistency with web app
- Use native navigation patterns

## 🔐 Authentication

The mobile app uses the same NextAuth.js backend:
- OAuth providers (Google, etc.)
- Email/password authentication
- JWT tokens stored securely

## 📚 Next Steps

1. Set up Expo project: `npx create-expo-app mobile --template`
2. Install dependencies for mobile
3. Set up navigation (React Navigation)
4. Create API service layer
5. Implement screens matching web app
6. Add push notifications
7. Set up analytics

For detailed setup instructions, see [MOBILE_SETUP.md](./MOBILE_SETUP.md)

