# GitHub Secrets Setup for Auto-Deploy

The GitHub Actions workflow is now configured to automatically deploy to Netlify on every push!

## ✅ Required GitHub Secrets

You need to add these secrets to your GitHub repository:

### Step 1: Go to Repository Settings

1. Go to: https://github.com/zfrey55/The-Coin-Shack
2. Click **Settings** (top menu)
3. Click **Secrets and variables** → **Actions**
4. Click **New repository secret**

### Step 2: Add Required Secrets

Add each of these secrets one by one:

#### Netlify Secrets (Required)

1. **NETLIFY_AUTH_TOKEN**
   - Get it from: https://app.netlify.com/user/applications#personal-access-tokens
   - Click "New access token"
   - Give it a name: `GitHub Actions Deploy`
   - Copy the token
   - Add as secret: `NETLIFY_AUTH_TOKEN`

2. **NETLIFY_SITE_ID**
   - Go to your Netlify site dashboard
   - Click **Site settings** → **General**
   - Under "Site information", find **Site ID**
   - Copy it
   - Add as secret: `NETLIFY_SITE_ID`

#### NextAuth Secrets (Required)

3. **NEXTAUTH_SECRET**
   - Value: `AGE7O61sutDWIgmxjc4TQgRRDzoCdjag1vX4l3cDUgw=`
   - Add as secret: `NEXTAUTH_SECRET`

4. **NEXTAUTH_URL**
   - Value: `https://your-site-name.netlify.app`
   - Replace with your actual Netlify site URL
   - Add as secret: `NEXTAUTH_URL`

#### Firebase Secrets (Optional - only if using Firestore)

5. **NEXT_PUBLIC_FIREBASE_API_KEY**
6. **NEXT_PUBLIC_FIREBASE_PROJECT_ID**
7. **NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN**
8. **NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET**
9. **NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID**
10. **NEXT_PUBLIC_FIREBASE_APP_ID**

## ✅ After Adding Secrets

Once you've added the secrets:
- ✅ Every push to `main` will automatically deploy to Netlify
- ✅ Pull requests will build but not deploy
- ✅ No manual deployment needed!

## 🚀 How It Works

1. **You push code** → GitHub Actions triggers
2. **Workflow runs:**
   - Installs dependencies
   - Runs linter
   - Builds the project
   - Deploys to Netlify
3. **Your site updates automatically!**

## 🔍 Verify It's Working

After adding secrets and pushing code:
1. Go to: https://github.com/zfrey55/The-Coin-Shack/actions
2. You'll see the workflow running
3. Check Netlify dashboard for deployment

## 📋 Quick Checklist

- [ ] Add `NETLIFY_AUTH_TOKEN` to GitHub secrets
- [ ] Add `NETLIFY_SITE_ID` to GitHub secrets
- [ ] Add `NEXTAUTH_SECRET` to GitHub secrets
- [ ] Add `NEXTAUTH_URL` to GitHub secrets
- [ ] (Optional) Add Firebase secrets if using Firestore

---

**Once secrets are added, automatic deployment will work!** 🎉

