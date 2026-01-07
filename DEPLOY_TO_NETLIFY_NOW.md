# 🚀 Deploy to Netlify - Ready to Go!

Your repository is connected to GitHub Desktop. Now let's deploy to Netlify!

## ✅ Pre-Deployment Checklist

- ✅ Code committed locally
- ✅ Repository on GitHub
- ✅ GitHub Desktop connected
- ✅ Build verified and working

## 🌐 Deploy to Netlify - Step by Step

### Method 1: Netlify Website (Recommended - Easiest)

#### Step 1: Go to Netlify
1. Open your browser
2. Go to: **https://app.netlify.com**
3. Sign in (or create a free account)

#### Step 2: Import Your Repository
1. Click **"Add new site"** button
2. Select **"Import an existing project"**
3. Click **"Deploy with GitHub"**
4. **Authorize Netlify** to access your GitHub account
   - Click "Authorize Netlify"
   - You may need to enter your GitHub password

#### Step 3: Select Your Repository
1. Find and select **"The-Coin-Shack"** from the list
2. Click on it

#### Step 4: Configure Build Settings
Netlify should auto-detect Next.js, but verify:

- **Build command:** `npm run build`
- **Publish directory:** `.next`
- **Base directory:** (leave empty)
- Click **"Show advanced"**:
  - **Node version:** `20` (or latest)

#### Step 5: Set Environment Variables
**IMPORTANT:** Before deploying, click **"Show advanced"** → **"New variable"**

Add these variables:
```
Name: NEXTAUTH_SECRET
Value: AGE7O61sutDWIgmxjc4TQgRRDzoCdjag1vX4l3cDUgw=
```

```
Name: NEXTAUTH_URL
Value: https://your-site-name.netlify.app
(You can update this after deployment with your actual site name)
```

#### Step 6: Deploy!
1. Click **"Deploy site"** button
2. Wait for build to complete (2-5 minutes)
3. Your site will be live! 🎉

### Method 2: Using Netlify CLI

If you prefer command line:

```bash
# Login to Netlify
netlify login

# Initialize and deploy
netlify init

# Follow prompts:
# - Create & configure a new site: Yes
# - Team: Select your team
# - Site name: the-coin-shack (or your choice)
# - Build command: npm run build
# - Directory to deploy: .next

# Deploy to production
netlify deploy --prod
```

## ✅ After Deployment

### Your Site Will Be Live At:
```
https://your-site-name.netlify.app
```

### Step 7: Update NEXTAUTH_URL (Important!)
1. Go to Netlify Dashboard
2. Site settings → Environment variables
3. Edit `NEXTAUTH_URL`
4. Change to: `https://YOUR-ACTUAL-SITE-NAME.netlify.app`
5. Trigger a new deployment:
   - Deploys → Trigger deploy → Clear cache and deploy site

### Step 8: Verify Everything Works
Visit your site and test:
- ✅ Home page loads
- ✅ Navigation works
- ✅ Login/Register pages
- ✅ Dark mode toggle
- ✅ All API routes work

## 🔄 Automatic Deployments

Once deployed:
- ✅ Every push to `main` branch = automatic deployment
- ✅ Pull requests = preview deployments
- ✅ Continuous deployment enabled!

## 🔧 Optional: Add Custom Domain

1. In Netlify dashboard → Domain settings
2. Click "Add custom domain"
3. Enter your domain
4. Follow DNS configuration instructions

## 📱 Next Steps

After successful deployment:
1. ✅ **Web app is live!**
2. Set up Firebase (optional) - see `FIRESTORE_SETUP.md`
3. Build iOS app - see `MOBILE_SETUP.md`
4. Configure monitoring and analytics

## 🆘 Troubleshooting

### Build Fails
- Check build logs in Netlify dashboard
- Verify environment variables are set
- Ensure Node version is 20

### Site Shows Error
- Check deployment logs
- Verify `NEXTAUTH_SECRET` is set
- Make sure build completed successfully

### Environment Variables Not Working
- Variables must start with `NEXT_PUBLIC_` for client-side
- Redeploy after adding variables
- Clear cache and redeploy

---

**Ready to deploy? Go to https://app.netlify.com and follow the steps above! 🚀**

