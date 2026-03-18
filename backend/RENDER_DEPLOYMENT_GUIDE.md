# TrashVerse Backend - Render Deployment Guide

## 🚀 Complete Deployment Specifications for Render

This guide provides all the necessary files and configurations to successfully deploy the TrashVerse backend on Render.

## 📋 Prerequisites

1. **Render Account**: Sign up at [render.com](https://render.com)
2. **GitHub Repository**: Code should be in a GitHub repository
3. **PostgreSQL Database**: Will be created automatically via Render
4. **Resend API Key**: For email functionality

## 📁 Deployment Files Created

### **Core Configuration Files**
- `render.yaml` - Render service configuration
- `Dockerfile` - Container configuration
- `requirements.txt` - Python dependencies (updated)
- `runtime.txt` - Python version specification
- `gunicorn.conf.py` - Production server configuration

### **Build & Start Scripts**
- `build.sh` - Build process script
- `start.sh` - Application startup script
- `init_production_db.py` - Database initialization

### **Configuration Files**
- `.dockerignore` - Docker build exclusions
- Updated `app/main.py` - Production-ready FastAPI app

## 🔧 Deployment Steps

### **Step 1: Prepare Repository**
1. Commit all files to your GitHub repository
2. Ensure the `backend/` folder contains all deployment files

### **Step 2: Create Render Services**

#### **Option A: Using render.yaml (Recommended)**
1. Go to Render Dashboard
2. Click "New" → "Blueprint"
3. Connect your GitHub repository
4. Select the repository and branch
5. Render will automatically detect `render.yaml` and create services

#### **Option B: Manual Setup**
1. **Create PostgreSQL Database:**
   - Go to Render Dashboard
   - Click "New" → "PostgreSQL"
   - Name: `trashverse-db`
   - Plan: Starter (Free)
   - Note the connection details

2. **Create Web Service:**
   - Click "New" → "Web Service"
   - Connect GitHub repository
   - Root Directory: `backend`
   - Environment: Python 3
   - Build Command: `pip install -r requirements.txt`
   - Start Command: `uvicorn app.main:app --host 0.0.0.0 --port $PORT`

### **Step 3: Configure Environment Variables**

Set these environment variables in Render:

```env
# Required
DATABASE_URL=<from_postgresql_service>
SECRET_KEY=<generate_secure_key>
RESEND_API_KEY=re_imeqaLTJ_LMycHLq3YEs1R9XAiHqD9VvW

# Optional (with defaults)
ALGORITHM=HS256
ACCESS_TOKEN_EXPIRE_MINUTES=10080
DEFAULT_FROM_EMAIL=onboarding@resend.dev
PASSWORD_RESET_TOKEN_EXPIRE_MINUTES=30
EMAIL_MODE=production
ENVIRONMENT=production
PYTHON_VERSION=3.11.0
```

### **Step 4: Initialize Database**

After deployment, run the database initialization:

1. Go to your web service in Render
2. Open the "Shell" tab
3. Run: `python init_production_db.py`

## 🔒 Security Configuration

### **Environment Variables Security**
- `SECRET_KEY`: Generate a secure random key (32+ characters)
- `DATABASE_URL`: Automatically provided by Render PostgreSQL
- `RESEND_API_KEY`: Your production Resend API key

### **CORS Configuration**
The app is configured with these allowed origins:
- `http://localhost:3000` (development)
- `http://localhost:3001` (development)
- `https://trashverse.vercel.app` (production)
- `https://www.trashverse.com` (production)
- Custom origin via `FRONTEND_URL` environment variable

## 📊 Service Specifications

### **Web Service Configuration**
```yaml
Type: Web Service
Environment: Python 3.11
Plan: Starter ($7/month) or Free (with limitations)
Build Command: pip install -r requirements.txt
Start Command: uvicorn app.main:app --host 0.0.0.0 --port $PORT
Auto-Deploy: Yes (on git push)
```

### **Database Configuration**
```yaml
Type: PostgreSQL
Plan: Starter ($7/month) or Free (with limitations)
Database Name: trashverse
User: Auto-generated
Connection: Internal (secure)
```

## 🚀 Production Features

### **Performance Optimizations**
- **Gunicorn**: Multi-worker WSGI server for production
- **Connection Pooling**: SQLAlchemy connection management
- **Static Files**: Efficient serving of upload files
- **Health Checks**: `/health` endpoint for monitoring

### **Security Features**
- **CORS**: Properly configured for production domains
- **Environment Variables**: Secure credential management
- **Input Validation**: Pydantic models for request validation
- **Authentication**: JWT token-based security

### **Monitoring & Logging**
- **Structured Logging**: JSON-formatted logs for production
- **Health Endpoint**: `/health` for uptime monitoring
- **Error Handling**: Comprehensive error responses
- **Request Logging**: Detailed access logs

## 🔧 Post-Deployment Configuration

### **1. Database Setup**
```bash
# Run in Render Shell
python init_production_db.py
```

### **2. Test API Endpoints**
```bash
# Health check
curl https://your-app.onrender.com/health

# API documentation (if enabled)
curl https://your-app.onrender.com/docs
```

### **3. Configure Frontend**
Update your frontend API base URL to:
```javascript
const API_BASE_URL = 'https://your-app.onrender.com'
```

## 📱 Mobile App Configuration

Update mobile app API configuration:
```typescript
const API_BASE_URL = 'https://your-app.onrender.com'
```

## 🔄 Continuous Deployment

### **Automatic Deployment**
- Render automatically deploys on git push to main branch
- Build logs available in Render dashboard
- Zero-downtime deployments

### **Manual Deployment**
- Use "Manual Deploy" button in Render dashboard
- Deploy specific commits or branches
- Rollback to previous deployments

## 🐛 Troubleshooting

### **Common Issues**

1. **Build Failures**
   - Check Python version in `runtime.txt`
   - Verify all dependencies in `requirements.txt`
   - Review build logs in Render dashboard

2. **Database Connection Issues**
   - Verify `DATABASE_URL` environment variable
   - Check PostgreSQL service status
   - Run database initialization script

3. **CORS Errors**
   - Add your frontend domain to allowed origins
   - Set `FRONTEND_URL` environment variable
   - Check browser network tab for exact error

4. **Email Issues**
   - Verify `RESEND_API_KEY` is set correctly
   - Check email logs in application logs
   - Ensure `EMAIL_MODE=production`

### **Debugging Commands**
```bash
# Check environment variables
env | grep -E "(DATABASE_URL|SECRET_KEY|RESEND)"

# Test database connection
python -c "from app.database import engine; print(engine.execute('SELECT 1').scalar())"

# Check application logs
tail -f /var/log/app.log
```

## 📈 Scaling Considerations

### **Performance Optimization**
- Upgrade to higher Render plans for more resources
- Implement Redis for caching (separate service)
- Use CDN for static file serving
- Database connection pooling optimization

### **Monitoring**
- Set up external monitoring (UptimeRobot, etc.)
- Configure log aggregation (LogDNA, etc.)
- Implement application metrics (Prometheus, etc.)

## 💰 Cost Estimation

### **Starter Plan (Recommended)**
- Web Service: $7/month
- PostgreSQL: $7/month
- **Total: $14/month**

### **Free Tier (Limited)**
- Web Service: Free (with sleep after 15min inactivity)
- PostgreSQL: Free (90 days, then $7/month)
- **Total: $0-7/month**

## 🎯 Success Criteria

After successful deployment, you should have:

✅ **Backend API** running at `https://your-app.onrender.com`
✅ **Database** with admin user and initial data
✅ **Health endpoint** responding at `/health`
✅ **Email system** working with Resend integration
✅ **CORS** properly configured for your frontend
✅ **Authentication** working with JWT tokens
✅ **File uploads** working for waste and profile images

## 📞 Support

If you encounter issues:
1. Check Render documentation: [render.com/docs](https://render.com/docs)
2. Review application logs in Render dashboard
3. Test API endpoints using the `/docs` interface
4. Verify environment variables are set correctly

Your TrashVerse backend is now ready for production deployment on Render! 🚀