# Netlify Deployment Setup

## 🚀 Quick Deploy Options

### Option 1: Via Netlify Website (Easiest - Recommended)

1. **Go to Netlify:**
   - Visit: https://app.netlify.com
   - Sign in (or create free account)

2. **Import Your Repository:**
   - Click **"Add new site"** → **"Import an existing project"**
   - Click **"Deploy with GitHub"**
   - Authorize Netlify to access GitHub
   - Select repository: **`zfrey55/The-Coin-Shack`**

3. **Configure Build Settings:**
   - Build command: `npm run build`
   - Publish directory: `.next`
   - Click **"Show advanced"**:
     - Node version: `20`

4. **Add Environment Variables:**
   - Click **"Show advanced"** → **"New variable"**
   - Add these variables:
     ```
     NEXTAUTH_SECRET = AGE7O61sutDWIgmxjc4TQgRRDzoCdjag1vX4l3cDUgw=
     NEXTAUTH_URL = https://your-site-name.netlify.app
     ```
   - (Update NEXTAUTH_URL after first deployment with actual site name)

5. **Deploy:**
   - Click **"Deploy site"**
   - Wait 2-5 minutes for build
   - Your site will be live! 🎉

### Option 2: Via Netlify CLI

If you want to use command line:

```bash
# Login (one-time)
netlify login

# Initialize
netlify init

# Follow prompts, then deploy
netlify deploy --prod
```

## ✅ After Deployment

1. **Update NEXTAUTH_URL:**
   - Go to Site settings → Environment variables
   - Edit `NEXTAUTH_URL` with your actual site URL
   - Trigger new deployment

2. **Verify:**
   - Visit your site URL
   - Test all pages
   - Check functionality

## 🔄 Automatic Deployments

Once connected:
- ✅ Every push to `main` = automatic deployment
- ✅ Pull requests = preview deployments
- ✅ No manual deployment needed!

---

**Repository:** https://github.com/zfrey55/The-Coin-Shack

**Ready to deploy!** 🚀

