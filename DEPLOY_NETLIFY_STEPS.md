# 🚀 Deploy to Netlify - Step by Step

## ✅ Your Code is Ready!
- Repository: `zfrey55/The-Coin-Shack`
- All commits pushed to GitHub
- Build configuration ready

## 📋 Deployment Steps (5 Minutes)

### Step 1: Go to Netlify
1. Open browser: **https://app.netlify.com**
2. Sign in (or create free account)
3. Click **"Add new site"**

### Step 2: Import from GitHub
1. Click **"Import an existing project"**
2. Click **"Deploy with GitHub"**
3. **Authorize Netlify** to access your GitHub account
   - Click "Authorize Netlify"
   - Select the repositories you want to give access to
   - Or select "All repositories"
   - Click "Install & Authorize"

### Step 3: Select Your Repository
1. Find and click on **`The-Coin-Shack`** (under zfrey55)
2. Click **"Select"**

### Step 4: Configure Build Settings
Netlify should auto-detect Next.js, but verify:

- **Build command:** `npm run build`
- **Publish directory:** `.next`
- **Branch to deploy:** `main`

**Click "Show advanced"** and set:
- **Node version:** `20` (or latest available)

### Step 5: Add Environment Variables
**IMPORTANT:** Before deploying, add environment variables:

1. Click **"Show advanced"**
2. Click **"New variable"**
3. Add these one by one:

   **Variable 1:**
   - Key: `NEXTAUTH_SECRET`
   - Value: `AGE7O61sutDWIgmxjc4TQgRRDzoCdjag1vX4l3cDUgw=`

   **Variable 2:**
   - Key: `NEXTAUTH_URL`
   - Value: `https://your-site-name.netlify.app`
   - (You'll update this after first deployment with your actual site name)

### Step 6: Deploy!
1. Click **"Deploy site"** button
2. Wait 2-5 minutes for build to complete
3. **Your site will be live!** 🎉

## ✅ After Deployment

### Step 7: Update NEXTAUTH_URL
1. After deployment, Netlify will give you a site URL like:
   - `https://amazing-name-123456.netlify.app`
2. Go to: **Site settings** → **Environment variables**
3. Edit `NEXTAUTH_URL`
4. Change to your actual site URL
5. Trigger new deployment:
   - **Deploys** → **Trigger deploy** → **Clear cache and deploy site**

### Step 8: Verify Everything Works
Visit your site and test:
- ✅ Home page loads
- ✅ Navigation works
- ✅ Login/Register pages work
- ✅ Dark mode toggle works
- ✅ All API routes return data

## 🔄 Automatic Deployments

Once deployed:
- ✅ **Every push to `main`** = automatic deployment
- ✅ **Pull requests** = preview deployments
- ✅ **No manual deployment needed!**

## 📱 Next Steps After Deployment

1. ✅ **Web app is live!**
2. Set up Firebase (optional) - see `FIRESTORE_SETUP.md`
3. Configure custom domain (optional)
4. Set up monitoring and analytics
5. Build iOS app - see `MOBILE_SETUP.md`

## 🔗 Important Links

- **Your Repository:** https://github.com/zfrey55/The-Coin-Shack
- **Netlify Dashboard:** https://app.netlify.com
- **After deployment, your site will be at:** `https://your-site-name.netlify.app`

---

**Ready to deploy? Go to https://app.netlify.com and follow the steps above!** 🚀

