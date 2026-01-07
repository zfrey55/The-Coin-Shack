# Setup Automatic Push to GitHub

## ✅ What's Been Configured

I've set up automatic pushing. You just need to authenticate **ONE TIME**:

## 🔐 One-Time Authentication Setup

### Option 1: Personal Access Token (Recommended)

1. **Create a GitHub Token:**
   - Go to: https://github.com/settings/tokens
   - Click "Generate new token (classic)"
   - Name it: `The-Coin-Shack-Auto-Push`
   - Select scope: **`repo`** (Full control of private repositories)
   - Click "Generate token"
   - **COPY THE TOKEN** (you'll only see it once!)

2. **Store the Token:**
   - When you push, Git will ask for credentials
   - **Username:** `zfrey`
   - **Password:** Paste your token (not your GitHub password!)
   - Windows Credential Manager will save it

3. **Test Push:**
   ```bash
   git push origin main
   ```
   - Enter your username: `zfrey`
   - Enter password: (paste your token)
   - It will save and never ask again!

### Option 2: SSH Keys (Alternative)

1. **Generate SSH Key:**
   ```bash
   ssh-keygen -t ed25519 -C "dev@coinshack.com"
   ```
   - Press Enter for default location
   - Press Enter for no passphrase (or set one)

2. **Add to GitHub:**
   - Copy your public key:
   ```bash
   cat ~/.ssh/id_ed25519.pub
   ```
   - Go to: https://github.com/settings/keys
   - Click "New SSH key"
   - Paste the key and save

3. **Update Remote to SSH:**
   ```bash
   git remote set-url origin git@github.com:zfrey/The-Coin-Shack.git
   ```

## 🚀 After Authentication

Once authenticated, Cursor will automatically push when you commit!

### How It Works:

1. **Make changes** in Cursor
2. **Commit** (Cursor's Git UI or command)
3. **Auto-push** happens automatically!

### Commands You Can Use:

```bash
# Commit and push in one command
npm run commit-push --message="Your commit message"

# Or use Git directly (will auto-push)
git add -A
git commit -m "Your message"
git push  # This will auto-push with saved credentials
```

## ✅ Verify It's Working

After authenticating once, test it:

```bash
# Make a small change, then:
git add -A
git commit -m "Test auto-push"
git push
```

If it pushes without asking for credentials, you're all set! ✅

## 🎯 In Cursor

Cursor's Git integration should now:
- ✅ Auto-push after commits
- ✅ Use saved credentials
- ✅ No need to open GitHub Desktop

---

**After you authenticate once, everything will be automatic!** 🚀

