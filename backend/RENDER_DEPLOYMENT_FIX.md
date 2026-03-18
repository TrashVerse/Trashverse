# 🚨 Render Deployment Fix Guide

## Issue: Missing SECRET_KEY Environment Variable

**Error**: `ValidationError: 1 validation error for Settings SECRET_KEY Field required`

## ✅ Quick Fix Steps

### **Option 1: Set Environment Variables in Render Dashboard**

1. **Go to your Render service dashboard**
2. **Click on "Environment" tab**
3. **Add these required environment variables:**

```env
SECRET_KEY=your-super-secret-key-32-characters-long
DATABASE_URL=postgresql://user:pass@host:port/dbname
RESEND_API_KEY=re_imeqaLTJ_LMycHLq3YEs1R9XAiHqD9VvW
DEFAULT_FROM_EMAIL=onboarding@resend.dev
EMAIL_MODE=production
ALGORITHM=HS256
ACCESS_TOKEN_EXPIRE_MINUTES=10080
PASSWORD_RESET_TOKEN_EXPIRE_MINUTES=30
DEV_EMAIL_RECIPIENT=onyewuchiscepter@gmail.com
ENVIRONMENT=production
```

4. **Click "Save Changes"**
5. **Redeploy the service**

### **Option 2: Generate SECRET_KEY**

Use this command to generate a secure SECRET_KEY:

```bash
python -c "import secrets; print(secrets.token_urlsafe(32))"
```

Example output: `xvz9K8mN2pQ7rL4sT6uW1yE3oI5nM8jH9kF2dA7cB6eR`

### **Option 3: Use Updated render.yaml (Recommended)**

The updated `render.yaml` file now includes all required environment variables. If you're using Blueprint deployment:

1. **Commit the updated files to GitHub**
2. **Redeploy from Render dashboard**
3. **Environment variables will be set automatically**

## 🔧 Manual Environment Variable Setup

If you need to set them manually in Render:

### **Required Variables:**
```env
SECRET_KEY=<generate_32_char_secret>
DATABASE_URL=<from_postgresql_service>
RESEND_API_KEY=re_imeqaLTJ_LMycHLq3YEs1R9XAiHqD9VvW
```

### **Optional Variables (with defaults):**
```env
DEFAULT_FROM_EMAIL=onboarding@resend.dev
EMAIL_MODE=production
ALGORITHM=HS256
ACCESS_TOKEN_EXPIRE_MINUTES=10080
PASSWORD_RESET_TOKEN_EXPIRE_MINUTES=30
DEV_EMAIL_RECIPIENT=onyewuchiscepter@gmail.com
ENVIRONMENT=production
```

## 🚀 After Setting Environment Variables

1. **Redeploy the service** in Render dashboard
2. **Check deployment logs** for successful startup
3. **Test the health endpoint**: `https://your-app.onrender.com/health`
4. **Initialize database**: Run `python init_production_db.py` in Shell

## 🔍 Verification Steps

### **1. Check Health Endpoint**
```bash
curl https://your-app.onrender.com/health
```

Expected response:
```json
{
  "status": "healthy",
  "version": "1.0.0",
  "environment": "production"
}
```

### **2. Check API Documentation**
Visit: `https://your-app.onrender.com/docs`

### **3. Test Authentication**
```bash
curl -X POST https://your-app.onrender.com/api/auth/login \
  -H "Content-Type: application/x-www-form-urlencoded" \
  -d "username=admin&password=TrashVerse2024!"
```

## 🐛 Common Issues & Solutions

### **Issue: Database Connection Error**
- Ensure `DATABASE_URL` is set from PostgreSQL service
- Check PostgreSQL service is running
- Verify connection string format

### **Issue: Email Not Working**
- Verify `RESEND_API_KEY` is correct
- Check `EMAIL_MODE=production`
- Ensure `DEFAULT_FROM_EMAIL` is valid

### **Issue: Import Errors**
- Check all dependencies in `requirements.txt`
- Verify Python version is 3.11
- Check build logs for missing packages

## 📞 Support Commands

### **Generate New SECRET_KEY:**
```bash
python -c "import secrets; print('SECRET_KEY=' + secrets.token_urlsafe(32))"
```

### **Test Database Connection:**
```bash
python -c "from app.database import engine; print('DB Connected:', engine.execute('SELECT 1').scalar())"
```

### **Check Environment Variables:**
```bash
env | grep -E "(SECRET_KEY|DATABASE_URL|RESEND)"
```

## ✅ Success Indicators

After fixing, you should see:
- ✅ Service starts without errors
- ✅ Health endpoint returns 200 OK
- ✅ API documentation accessible
- ✅ Database connection working
- ✅ Authentication endpoints responding

Your TrashVerse backend should now be running successfully on Render! 🚀