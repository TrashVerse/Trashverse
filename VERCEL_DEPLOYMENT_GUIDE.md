# Vercel Deployment Guide - Frontend

## Prerequisites
- ✅ Backend deployed on Render (get your backend URL)
- ✅ GitHub repository pushed with latest code
- ✅ Vercel account (sign up at [vercel.com](https://vercel.com))

## Step-by-Step Deployment

### Step 1: Sign in to Vercel

1. Go to [vercel.com](https://vercel.com)
2. Click "Sign Up" or "Log In"
3. Sign in with GitHub (recommended)

### Step 2: Import Your Project

1. Click "Add New..." → "Project"
2. You'll see a list of your GitHub repositories
3. Find and select your repository:
   - `ScepterCode/Trashverse` or
   - `TrashVerse/Trashverse`
4. Click "Import"

### Step 3: Configure Project Settings

Vercel will auto-detect your project. Configure these settings:

#### Framework Preset
- Select: **Vite**

#### Root Directory
- Click "Edit" next to Root Directory
- Enter: `web`
- Click "Continue"

#### Build and Output Settings
These should auto-populate, but verify:
- Build Command: `npm run build`
- Output Directory: `dist`
- Install Command: `npm install`

### Step 4: Add Environment Variables

This is the MOST IMPORTANT step!

1. Click on "Environment Variables" section
2. Add this variable:

   **Name:** `VITE_API_URL`
   
   **Value:** Your Render backend URL (e.g., `https://trashverse-backend.onrender.com`)
   
   ⚠️ **Important:** 
   - Do NOT include a trailing slash
   - Use the exact URL from your Render deployment
   - Example: `https://your-backend-name.onrender.com`

3. Select "Production", "Preview", and "Development" (all three)

### Step 5: Deploy

1. Click "Deploy"
2. Vercel will:
   - Clone your repository
   - Install dependencies
   - Build your project
   - Deploy to production
3. Wait 2-5 minutes for deployment to complete

### Step 6: Get Your Deployment URL

Once deployed, you'll see:
- ✅ Deployment successful
- Your live URL: `https://your-project-name.vercel.app`

Click "Visit" to see your live site!

### Step 7: Update Backend CORS

Now that you have your Vercel URL, update your backend to allow requests from it:

1. Go to [Render Dashboard](https://dashboard.render.com)
2. Open your backend service
3. Go to "Environment" tab
4. Find or add `ALLOWED_ORIGINS` variable
5. Set value to: `https://your-project-name.vercel.app`
   - If you have multiple origins, separate with commas:
     `https://your-app.vercel.app,https://www.yourdomain.com`
6. Click "Save Changes"
7. Backend will automatically redeploy (takes 1-2 minutes)

### Step 8: Test Your Deployment

1. Visit your Vercel URL: `https://your-project-name.vercel.app`
2. Test these features:
   - ✅ Homepage loads
   - ✅ Can navigate to Login page
   - ✅ Can login with: username=`admin`, password=`admin123`
   - ✅ Dashboard loads after login
   - ✅ Can create waste entry
   - ✅ Images upload successfully
   - ✅ Admin dashboard works

## Troubleshooting

### Build Fails

**Error:** "Command failed with exit code 1"

**Solutions:**
1. Check build logs in Vercel dashboard
2. Verify `web` directory is set as root
3. Ensure `package.json` has correct build script
4. Check for TypeScript errors

### Can't Connect to Backend

**Error:** Network errors or CORS errors

**Solutions:**
1. Verify `VITE_API_URL` is set correctly
2. Check backend is running on Render
3. Verify CORS is configured in backend
4. Test backend health: `https://your-backend.onrender.com/health`

### Environment Variable Not Working

**Error:** API calls go to wrong URL

**Solutions:**
1. Verify variable name is exactly `VITE_API_URL`
2. Redeploy after adding environment variables
3. Check variable is set for "Production"
4. Clear browser cache and try again

### 404 on Page Refresh

**Error:** Page works on first load but 404 on refresh

**Solution:** This is already handled by `vercel.json` in your project!

## Custom Domain (Optional)

### Add Your Own Domain

1. Go to your project in Vercel
2. Click "Settings" → "Domains"
3. Click "Add"
4. Enter your domain (e.g., `trashverse.com`)
5. Follow DNS configuration instructions
6. Wait for DNS propagation (5-60 minutes)

### Update Backend CORS

After adding custom domain:
1. Go to Render backend settings
2. Update `ALLOWED_ORIGINS` to include your custom domain
3. Example: `https://trashverse.com,https://www.trashverse.com`

## Automatic Deployments

Vercel automatically deploys when you push to GitHub:

- **Push to `main` branch** → Production deployment
- **Push to other branches** → Preview deployment
- **Pull requests** → Preview deployment with unique URL

## Monitoring & Analytics

### View Deployments
- Vercel Dashboard → Your Project → Deployments
- See all deployments, their status, and logs

### View Analytics
- Vercel Dashboard → Your Project → Analytics
- See page views, performance metrics, etc.

### View Logs
- Click on any deployment
- Click "View Function Logs" or "Build Logs"
- Debug any issues

## Environment Variables Reference

| Variable | Value | Required |
|----------|-------|----------|
| VITE_API_URL | Your Render backend URL | Yes |

Example:
```
VITE_API_URL=https://trashverse-backend.onrender.com
```

## Vercel CLI (Optional)

For advanced users, you can deploy via CLI:

```bash
# Install Vercel CLI
npm install -g vercel

# Login
vercel login

# Deploy
cd web
vercel

# Deploy to production
vercel --prod
```

## Quick Checklist

Before deploying:
- [ ] Backend is deployed and running on Render
- [ ] You have your backend URL
- [ ] Code is pushed to GitHub
- [ ] You have a Vercel account

During deployment:
- [ ] Selected correct repository
- [ ] Set root directory to `web`
- [ ] Framework preset is Vite
- [ ] Added `VITE_API_URL` environment variable
- [ ] Clicked Deploy

After deployment:
- [ ] Updated backend CORS with Vercel URL
- [ ] Tested login functionality
- [ ] Verified all features work
- [ ] Checked images upload correctly

## Support

If you encounter issues:
1. Check Vercel build logs
2. Verify environment variables
3. Test backend separately
4. Check browser console for errors
5. Review this guide

## Next Steps

After successful deployment:
1. ✅ Share your live URL
2. ✅ Set up custom domain (optional)
3. ✅ Monitor analytics
4. ✅ Set up error tracking (optional)
5. ✅ Configure CI/CD (already automatic!)

---

**Your app is now live on Vercel! 🎉**

Live URL: `https://your-project-name.vercel.app`
