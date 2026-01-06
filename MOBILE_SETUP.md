# Mobile App Setup Guide

Complete guide for setting up The Coin Shack iOS and Android apps.

## 🎯 Overview

The mobile apps will share the same backend API as the web application, providing a native experience on iOS and Android devices.

## 📋 Prerequisites

### For iOS Development
- **macOS** (required for iOS development)
- **Xcode** 14+ ([Download](https://developer.apple.com/xcode/))
- **CocoaPods**: `sudo gem install cocoapods`
- **Apple Developer Account** ($99/year for App Store distribution)

### For Android Development
- **Android Studio** ([Download](https://developer.android.com/studio))
- **Java Development Kit (JDK)** 17+
- **Android SDK** (installed via Android Studio)
- **Google Play Developer Account** ($25 one-time fee)

### For Both
- **Node.js** 18+
- **npm** or **yarn**
- **Expo CLI** (optional but recommended): `npm install -g expo-cli`

## 🚀 Step 1: Choose Your Framework

### Option A: Expo (Recommended for Beginners)

**Pros:**
- Fast setup and development
- Over-the-air updates
- Built-in push notifications
- Easy deployment
- No need for Xcode/Android Studio for basic features

**Cons:**
- Limited native module access (unless using Expo dev client)
- Larger app bundle size

### Option B: React Native CLI

**Pros:**
- Full access to native modules
- Smaller bundle size
- More control over build process

**Cons:**
- More complex setup
- Requires Xcode/Android Studio knowledge

### Option C: Hybrid (Best of Both)

Start with Expo, eject to bare workflow when needed.

## 📦 Step 2: Create Mobile Project

### Using Expo (Recommended)

```bash
# Install Expo CLI
npm install -g expo-cli

# Create new Expo project
npx create-expo-app mobile --template blank-typescript

cd mobile

# Install dependencies
npm install
```

### Using React Native CLI

```bash
# Install React Native CLI
npm install -g react-native-cli

# Create new project
npx react-native init CoinShackMobile --template react-native-template-typescript

cd CoinShackMobile
```

## 🔗 Step 3: Set Up API Integration

### Create API Service

Create `mobile/src/services/api.ts`:

```typescript
const API_URL = process.env.EXPO_PUBLIC_API_URL || 'https://your-domain.netlify.app';

export const api = {
  async get<T>(endpoint: string): Promise<T> {
    const response = await fetch(`${API_URL}${endpoint}`);
    if (!response.ok) throw new Error(`API Error: ${response.statusText}`);
    return response.json();
  },

  async post<T>(endpoint: string, data: any): Promise<T> {
    const response = await fetch(`${API_URL}${endpoint}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });
    if (!response.ok) throw new Error(`API Error: ${response.statusText}`);
    return response.json();
  },
};

// API endpoints
export const endpoints = {
  hosts: '/api/hosts',
  streams: '/api/streams',
  games: '/api/games',
  products: '/api/products',
  posts: '/api/posts',
  pricing: '/api/pricing',
  auth: '/api/auth',
};
```

## 🔥 Step 4: Set Up Firebase for Mobile

### Install Firebase SDK

```bash
npm install firebase @react-native-firebase/app @react-native-firebase/firestore
```

### Initialize Firebase

Create `mobile/src/config/firebase.ts`:

```typescript
import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: process.env.EXPO_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.EXPO_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.EXPO_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.EXPO_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.EXPO_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.EXPO_PUBLIC_FIREBASE_APP_ID,
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
```

## 📱 Step 5: Set Up Navigation

### Install Navigation Library

```bash
npm install @react-navigation/native @react-navigation/native-stack
npm install react-native-screens react-native-safe-area-context
```

### Create Navigation Structure

Create `mobile/src/navigation/AppNavigator.tsx`:

```typescript
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from '../screens/HomeScreen';
import StreamScreen from '../screens/StreamScreen';
// ... other screens

const Stack = createNativeStackNavigator();

export default function AppNavigator() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="Stream" component={StreamScreen} />
        {/* ... other screens */}
      </Stack.Navigator>
    </NavigationContainer>
  );
}
```

## 🎨 Step 6: Create Screen Components

### Home Screen Example

Create `mobile/src/screens/HomeScreen.tsx`:

```typescript
import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, StyleSheet } from 'react-native';
import { api, endpoints } from '../services/api';

export default function HomeScreen() {
  const [streams, setStreams] = useState([]);

  useEffect(() => {
    loadStreams();
  }, []);

  const loadStreams = async () => {
    try {
      const data = await api.get(endpoints.streams);
      setStreams(data);
    } catch (error) {
      console.error('Error loading streams:', error);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Live Streams</Text>
      <FlatList
        data={streams}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.streamCard}>
            <Text>{item.title}</Text>
          </View>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16 },
  title: { fontSize: 24, fontWeight: 'bold', marginBottom: 16 },
  streamCard: { padding: 16, marginBottom: 8, backgroundColor: '#fff', borderRadius: 8 },
});
```

## 🔐 Step 7: Set Up Authentication

### Install Auth Libraries

```bash
npm install @react-native-async-storage/async-storage
npm install expo-auth-session expo-crypto
```

### Create Auth Service

Create `mobile/src/services/auth.ts`:

```typescript
import AsyncStorage from '@react-native-async-storage/async-storage';
import { api, endpoints } from './api';

export const auth = {
  async login(email: string, password: string) {
    const response = await api.post(`${endpoints.auth}/signin`, { email, password });
    await AsyncStorage.setItem('token', response.token);
    return response;
  },

  async logout() {
    await AsyncStorage.removeItem('token');
  },

  async getToken() {
    return await AsyncStorage.getItem('token');
  },
};
```

## 📦 Step 8: Build Configuration

### iOS Configuration

Edit `mobile/ios/Podfile` if needed:
```ruby
platform :ios, '13.4'
```

### Android Configuration

Edit `mobile/android/build.gradle`:
```gradle
minSdkVersion = 21
targetSdkVersion = 34
compileSdkVersion = 34
```

## 🚀 Step 9: Build for Production

### iOS Build

```bash
# Using Expo
eas build --platform ios --profile production

# Or using Xcode
cd ios
pod install
cd ..
npx react-native run-ios --configuration Release
```

### Android Build

```bash
# Using Expo
eas build --platform android --profile production

# Or using Gradle
cd android
./gradlew assembleRelease
```

## 📲 Step 10: App Store Submission

### iOS App Store

1. Create app in App Store Connect
2. Archive build in Xcode
3. Upload via Xcode Organizer
4. Submit for review

### Google Play Store

1. Create app in Google Play Console
2. Generate signed APK/AAB
3. Upload to Play Console
4. Submit for review

## 🎯 Next Steps

1. **Push Notifications**: Set up FCM/APNS
2. **Analytics**: Integrate Firebase Analytics
3. **Crash Reporting**: Set up Sentry or Firebase Crashlytics
4. **Deep Linking**: Configure universal links
5. **In-App Purchases**: Set up payment processing
6. **App Store Optimization**: Optimize listing for discovery

## 📚 Resources

- [React Native Docs](https://reactnative.dev/)
- [Expo Docs](https://docs.expo.dev/)
- [Firebase Mobile Setup](https://firebase.google.com/docs)
- [App Store Guidelines](https://developer.apple.com/app-store/review/guidelines/)
- [Play Store Policies](https://play.google.com/about/developer-content-policy/)

---

**Ready to build! 🚀**

