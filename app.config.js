/**
 * App configuration for mobile apps (Expo/React Native)
 * This file is used when building iOS/Android apps
 */

module.exports = {
  expo: {
    name: 'The Coin Shack',
    slug: 'the-coin-shack',
    version: '1.0.0',
    orientation: 'portrait',
    icon: './assets/icon.png',
    userInterfaceStyle: 'automatic',
    splash: {
      image: './assets/splash.png',
      resizeMode: 'contain',
      backgroundColor: '#1a1714'
    },
    assetBundlePatterns: [
      '**/*'
    ],
    ios: {
      supportsTablet: true,
      bundleIdentifier: 'com.coinshack.app',
      buildNumber: '1',
      config: {
        usesNonExemptEncryption: false
      },
      infoPlist: {
        NSUserTrackingUsageDescription: 'This app uses tracking to provide personalized content.',
        NSLocationWhenInUseUsageDescription: 'We use your location to show nearby coin dealers.'
      }
    },
    android: {
      adaptiveIcon: {
        foregroundImage: './assets/adaptive-icon.png',
        backgroundColor: '#1a1714'
      },
      package: 'com.coinshack.app',
      versionCode: 1,
      permissions: [
        'ACCESS_FINE_LOCATION',
        'ACCESS_COARSE_LOCATION'
      ]
    },
    web: {
      favicon: './assets/favicon.png',
      name: 'The Coin Shack',
      shortName: 'Coin Shack',
      themeColor: '#d4af37',
      backgroundColor: '#1a1714'
    },
    plugins: [
      'expo-router',
      [
        'expo-build-properties',
        {
          ios: {
            deploymentTarget: '13.4'
          },
          android: {
            compileSdkVersion: 34,
            targetSdkVersion: 34
          }
        }
      ]
    ],
    extra: {
      apiUrl: process.env.NEXT_PUBLIC_API_URL || 'https://your-domain.netlify.app/api',
      firebaseApiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
      firebaseProjectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
      eas: {
        projectId: 'your-project-id-here'
      }
    }
  }
};

