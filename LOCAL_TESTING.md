# Local Testing Guide

This guide will help you run and test The Coin Shack application locally using mock data.

## 🚀 Quick Start (No Firebase Required)

The application works out-of-the-box with mock data! You don't need to set up Firestore for local testing.

### Step 1: Install Dependencies

```bash
npm install
```

### Step 2: Create Environment File

Create a `.env.local` file in the project root with minimal configuration:

```env
NEXTAUTH_SECRET=development-secret-change-in-production
NEXTAUTH_URL=http://localhost:3000
```

**To generate a secure NEXTAUTH_SECRET:**
- Visit: https://generate-secret.vercel.app/32
- Or run: `openssl rand -base64 32`

### Step 3: Start Development Server

```bash
npm run dev
```

### Step 4: Open in Browser

Open [http://localhost:3000](http://localhost:3000) in your browser.

That's it! The app will run with mock data.

## 🧪 Testing Features

### Available Pages

1. **Home** (`/`) - Main dashboard with games and live streams
2. **Schedule** (`/schedule`) - View upcoming streams
3. **Commerce** (`/commerce`) - Browse products
4. **Chats** (`/chats`) - Community feed
5. **More** (`/more`) - Additional features and settings
6. **Login** (`/login`) - User authentication
7. **Register** (`/register`) - Create new account
8. **Host Profile** (`/host/[id]`) - View host details
9. **Admin Dashboard** (`/admin/dashboard`) - Admin panel (requires admin role)

### Mock Authentication

You can login with **any email and password** - it's all mock authentication:

- Email: `test@example.com`
- Password: `password123`

Or any credentials - they all work in demo mode!

### Test Admin Access

To test admin features:

1. Login with any credentials
2. Open browser console (F12)
3. Run this in the console:

```javascript
// This will set the current user as admin
// (In a real app, this would be handled server-side)
localStorage.setItem('admin-test', 'true');
// Then refresh the page
```

Or modify `lib/store.ts` to set a default admin user for testing.

### Mock Data Available

The app includes mock data for:
- ✅ 4 Hosts (Rari, Mike, Dom, Manu)
- ✅ 3 Live Streams
- ✅ 3 Games (Coin Flip, Case Break, Auction)
- ✅ 3 Products
- ✅ 2 Community Posts
- ✅ 4 Spot Prices (Gold, Silver, Platinum, Palladium)

## 🎮 Testing Interactive Features

### Games
- Navigate to Home page
- Click on any game card
- Games show participants and prize pools

### Live Streams
- Home page shows live streams
- Schedule page shows upcoming streams
- Click "Watch Live" on any stream

### Commerce
- Browse products on Commerce page
- View product details
- Add to cart (UI only - no actual checkout)

### Community Feed
- View posts on Chats page
- Like posts (mock - doesn't persist)
- See VIP badges and host indicators

### Dark Mode
- Toggle theme using the theme switcher
- Theme preference is saved in Zustand store

## 🔍 Debugging

### Check Console

Open browser DevTools (F12) to see:
- Mock data being loaded
- Firebase warnings (if not configured - this is normal)
- Any errors or warnings

### Network Tab

Check Network tab to see:
- API routes returning mock data
- `/api/hosts`, `/api/streams`, `/api/games`, etc.

### React DevTools

Install React DevTools browser extension to:
- Inspect component state
- Debug Zustand store
- Track state changes

## 🐛 Troubleshooting

### Port Already in Use

If port 3000 is busy:
```bash
# Kill the process using port 3000 (Windows)
netstat -ano | findstr :3000
taskkill /PID <PID> /F

# Or use a different port
npm run dev -- -p 3001
```

### Build Errors

```bash
# Clear Next.js cache
rm -rf .next
npm run dev
```

### Firebase Warnings

If you see Firebase warnings in the console - **this is normal!** The app works perfectly with mock data. These warnings are just informing you that Firestore is not configured, which is expected for local testing.

### Styling Issues

If styles aren't loading:
```bash
# Rebuild Tailwind
npm run build
```

## 🎯 Testing Checklist

- [ ] Home page loads and displays games/streams
- [ ] Navigation works between pages
- [ ] Login/Register forms work
- [ ] Dark mode toggle works
- [ ] All API routes return mock data
- [ ] Images load correctly
- [ ] Responsive design works on mobile
- [ ] No console errors (except Firebase warnings)

## 🔄 Switching to Firestore (Optional)

If you want to test with real Firestore data:

1. Follow [FIRESTORE_SETUP.md](./FIRESTORE_SETUP.md)
2. Add Firebase environment variables to `.env.local`
3. Restart the dev server
4. The app will automatically switch from mock data to Firestore

## 📊 Performance Testing

### Lighthouse Audit

Run Lighthouse in Chrome DevTools:
1. Open DevTools (F12)
2. Go to "Lighthouse" tab
3. Run audit
4. Check performance, accessibility, SEO scores

### Network Throttling

Test on slow connections:
1. DevTools → Network tab
2. Throttle: "Slow 3G" or "Fast 3G"
3. Reload page and test functionality

## 🎨 UI Testing

- Test on different screen sizes (mobile, tablet, desktop)
- Test dark/light mode
- Check all interactive elements (buttons, links, forms)
- Verify animations and transitions
- Test form validation
- Check accessibility (keyboard navigation, screen readers)

---

**Happy Testing! 🚀**

If you encounter any issues, check the browser console for error messages.

