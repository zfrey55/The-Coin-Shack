# Push to GitHub - Quick Guide

Your code is ready to push! Follow these steps:

## Option 1: Using GitHub Desktop (Easiest)

1. Download [GitHub Desktop](https://desktop.github.com/)
2. Sign in to your GitHub account
3. File → Add Local Repository
4. Select "The Coin Shack" folder
5. Click "Publish repository"
6. Make sure the repository name is: `The-Coin-Shack`
7. Click "Publish"

## Option 2: Using Command Line with Authentication

### Step 1: Set up authentication

Choose one method:

#### A. Personal Access Token (Recommended)

1. Go to GitHub → Settings → Developer settings → Personal access tokens → Tokens (classic)
2. Generate new token (classic)
3. Select scopes: `repo` (full control)
4. Copy the token
5. Run these commands:

```bash
git remote set-url origin https://YOUR_TOKEN@github.com/zfrey/The-Coin-Shack.git
git push -u origin main
```

#### B. SSH Key

1. Generate SSH key (if you don't have one):
```bash
ssh-keygen -t ed25519 -C "dev@coinshack.com"
```

2. Add SSH key to GitHub:
   - Copy the public key: `cat ~/.ssh/id_ed25519.pub`
   - Go to GitHub → Settings → SSH and GPG keys → New SSH key
   - Paste the key

3. Update remote URL:
```bash
git remote set-url origin git@github.com:zfrey/The-Coin-Shack.git
git push -u origin main
```

#### C. GitHub CLI

```bash
# Install GitHub CLI: https://cli.github.com/
gh auth login
git push -u origin main
```

## Option 3: Verify Repository Name

Make sure the repository exists and is named exactly:
- `The-Coin-Shack` (with capitals)

If you named it differently, update the remote:

```bash
git remote set-url origin https://github.com/zfrey/YOUR-ACTUAL-REPO-NAME.git
git push -u origin main
```

## After Pushing Successfully

Once pushed, you'll see:
```
✓ Pushed to GitHub successfully!
```

Then proceed to deploy to Netlify (see DEPLOY_NOW.md)

## Troubleshooting

**"Repository not found"**
- Repository doesn't exist → Create it on GitHub first
- Wrong name → Check the exact repository name on GitHub
- Authentication required → Use one of the auth methods above

**"Permission denied"**
- You don't have access → Make sure you're logged into the correct GitHub account
- Need authentication → Use Personal Access Token or SSH

**"Remote origin already exists"**
```bash
git remote remove origin
git remote add origin https://github.com/zfrey/The-Coin-Shack.git
git push -u origin main
```

---

**Need help?** Verify your repository exists at: https://github.com/zfrey/The-Coin-Shack

