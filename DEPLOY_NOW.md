# 🚀 Deploy Now - Step by Step Guide

Your project is **ready to deploy**! Follow these steps to get it live.

## ✅ Pre-Deployment Checklist

- ✅ Build verified and working
- ✅ Git repository committed
- ✅ All files ready
- ✅ Configuration files created

## 🔑 Your Generated Secrets

**NextAuth Secret (for .env.local):**
```
AGE7O61sutDWIgmxjc4TQgRRDzoCdjag1vX4l3cDUgw=
```

## 📋 Step 1: Create GitHub Repository

### Option A: Using GitHub Website

1. Go to [github.com](https://github.com) and sign in
2. Click the **"+"** icon → **"New repository"**
3. Name it: `the-coin-shack` (or your preferred name)
4. Set it to **Private** (recommended) or **Public**
5. **DO NOT** initialize with README, .gitignore, or license
6. Click **"Create repository"**

### Option B: Using GitHub CLI

```bash
gh repo create the-coin-shack --private --source=. --remote=origin --push
```

## 📤 Step 2: Push to GitHub

```bash
# Add GitHub remote (replace YOUR_USERNAME with your GitHub username)
git remote add origin https://github.com/YOUR_USERNAME/the-coin-shack.git

# Push to GitHub
git branch -M main
git push -u origin main
```

## 🌐 Step 3: Deploy to Netlify

### Method A: Using Netlify Website (Easiest)

1. **Go to Netlify:**
   - Visit [app.netlify.com](https://app.netlify.com)
   - Sign in or create a free account

2. **Import Your Repository:**
   - Click **"Add new site"** → **"Import an existing project"**
   - Click **"Deploy with GitHub"**
   - Authorize Netlify to access your GitHub
   - Select your `the-coin-shack` repository

3. **Configure Build Settings:**
   - Build command: `npm run build`
   - Publish directory: `.next`
   - Click **"Show advanced"** and set:
     - Node version: `20`
   - Click **"Deploy site"**

4. **Set Environment Variables:**
   After the first deployment:
   - Go to **Site settings** → **Environment variables**
   - Add these variables:

   ```
   NEXTAUTH_SECRET=AGE7O61sutDWIgmxjc4TQgRRDzoCdjag1vX4l3cDUgw=
   NEXTAUTH_URL=https://your-site-name.netlify.app
   ```

   **For Firebase (when ready):**
   ```
   NEXT_PUBLIC_FIREBASE_API_KEY=your-api-key
   NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your-project.firebaseapp.com
   NEXT_PUBLIC_FIREBASE_PROJECT_ID=your-project-id
   NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your-project.appspot.com
   NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=your-sender-id
   NEXT_PUBLIC_FIREBASE_APP_ID=your-app-id
   ```

5. **Trigger New Deployment:**
   - Go to **Deploys** tab
   - Click **"Trigger deploy"** → **"Clear cache and deploy site"**

### Method B: Using Netlify CLI

```bash
# Install Netlify CLI
npm install -g netlify-cli

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
# - Netlify functions folder: (press Enter for default)

# Deploy to production
netlify deploy --prod
```

## 🔧 Step 4: Configure Custom Domain (Optional)

1. In Netlify dashboard, go to **Domain settings**
2. Click **"Add custom domain"**
3. Enter your domain name
4. Follow DNS configuration instructions
5. Wait for DNS propagation (up to 48 hours)

## ✅ Step 5: Verify Deployment

1. Visit your site: `https://your-site-name.netlify.app`
2. Test all pages:
   - Home page
   - Login/Register
   - All navigation links
   - Dark mode toggle

3. Check functionality:
   - All pages load correctly
   - API routes work
   - Authentication works
   - No console errors

## 🔄 Step 6: Enable Continuous Deployment

Your site is now set up for automatic deployments:
- Every push to `main` branch = automatic deployment
- Pull requests = preview deployments

## 📱 Next Steps

1. **Set up Firebase** (optional but recommended):
   - Follow [FIRESTORE_SETUP.md](./FIRESTORE_SETUP.md)
   - Add Firebase environment variables to Netlify

2. **Monitor Your Site:**
   - Check Netlify dashboard for deployment status
   - Monitor error logs
   - Check analytics

3. **Build iOS App:**
   - Follow [MOBILE_SETUP.md](./MOBILE_SETUP.md)
   - Use your deployed API URL

## 🆘 Troubleshooting

### Build Fails
- Check build logs in Netlify dashboard
- Verify all environment variables are set
- Ensure Node version is 20

### Environment Variables Not Working
- Make sure variables start with `NEXT_PUBLIC_` if used in client code
- Redeploy after adding variables
- Check variable names match exactly

### Site Not Loading
- Check deployment status
- Review error logs
- Verify build completed successfully

## 📞 Need Help?

- **Netlify Docs:** https://docs.netlify.com
- **Next.js Docs:** https://nextjs.org/docs
- **Project Docs:** See [README.md](./README.md)

---

**Your site will be live at:** `https://your-site-name.netlify.app` 🎉

