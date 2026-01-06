# Quick Start Guide

Get The Coin Shack up and running in 5 minutes!

## 🚀 Web App (5 minutes)

### 1. Install Dependencies
```bash
npm install
```

### 2. Create Environment File
Create `.env.local`:
```env
NEXTAUTH_SECRET=development-secret-change-in-production
NEXTAUTH_URL=http://localhost:3000
```

Generate a secure secret:
```bash
npm run generate-secret
```

### 3. Start Development Server
```bash
npm run dev
```

### 4. Open Browser
Visit [http://localhost:3000](http://localhost:3000)

✅ **That's it!** The app runs with mock data.

## 🔥 Enable Firestore (Optional)

### 1. Set Up Firebase
Follow [FIRESTORE_SETUP.md](./FIRESTORE_SETUP.md)

### 2. Add Firebase Variables to `.env.local`
```env
NEXT_PUBLIC_FIREBASE_API_KEY=your-key
NEXT_PUBLIC_FIREBASE_PROJECT_ID=your-project-id
# ... other Firebase vars
```

### 3. Restart Dev Server
```bash
npm run dev
```

## 📱 Mobile App Setup

### 1. Install Expo CLI
```bash
npm install -g expo-cli
```

### 2. Create Mobile Project
```bash
npx create-expo-app mobile --template blank-typescript
cd mobile
```

### 3. Install Dependencies
```bash
npm install firebase @react-navigation/native
```

### 4. Configure API URL
Create `mobile/.env`:
```env
EXPO_PUBLIC_API_URL=https://your-domain.netlify.app
```

### 5. Start Mobile App
```bash
npm start
```

## 🌐 Deploy to Production

### Netlify Deployment

1. **Push to GitHub**
```bash
git add .
git commit -m "Ready for deployment"
git push
```

2. **Connect to Netlify**
   - Go to [app.netlify.com](https://app.netlify.com)
   - Import from Git
   - Set environment variables
   - Deploy!

See [DEPLOYMENT.md](./DEPLOYMENT.md) for detailed instructions.

## ✅ Verify Setup

Check everything is working:
```bash
npm run check-env
npm run build
```

## 🎯 Next Steps

1. **Local Testing**: See [LOCAL_TESTING.md](./LOCAL_TESTING.md)
2. **Firestore Setup**: See [FIRESTORE_SETUP.md](./FIRESTORE_SETUP.md)
3. **Deployment**: See [DEPLOYMENT.md](./DEPLOYMENT.md)
4. **Mobile App**: See [MOBILE_SETUP.md](./MOBILE_SETUP.md)
5. **Production**: See [PRODUCTION_CHECKLIST.md](./PRODUCTION_CHECKLIST.md)

## 🆘 Troubleshooting

### Port Already in Use
```bash
# Windows
netstat -ano | findstr :3000
taskkill /PID <PID> /F

# Mac/Linux
lsof -ti:3000 | xargs kill
```

### Build Errors
```bash
rm -rf .next node_modules
npm install
npm run build
```

### Environment Variables Not Working
1. Restart dev server
2. Check `.env.local` exists
3. Run `npm run check-env`

## 📚 Full Documentation

- [README.md](./README.md) - Project overview
- [LOCAL_TESTING.md](./LOCAL_TESTING.md) - Local testing guide
- [API.md](./API.md) - API documentation
- [DEPLOYMENT.md](./DEPLOYMENT.md) - Deployment guide
- [MOBILE_SETUP.md](./MOBILE_SETUP.md) - Mobile app setup
- [PRODUCTION_CHECKLIST.md](./PRODUCTION_CHECKLIST.md) - Production checklist

---

**Need help?** Check the documentation files or open an issue!

