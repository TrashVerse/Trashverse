# 🚀 Render Deployment Checklist

## Pre-Deployment ✅

- [ ] All code committed to GitHub repository
- [ ] `render.yaml` file in backend directory
- [ ] `requirements.txt` updated with all dependencies
- [ ] Environment variables documented
- [ ] Database initialization script ready

## Render Setup ✅

- [ ] Render account created
- [ ] GitHub repository connected
- [ ] PostgreSQL database service created
- [ ] Web service created with correct settings

## Environment Variables ✅

- [ ] `DATABASE_URL` (from PostgreSQL service)
- [ ] `SECRET_KEY` (generate secure key)
- [ ] `RESEND_API_KEY` (your production key)
- [ ] `EMAIL_MODE=production`
- [ ] `ENVIRONMENT=production`

## Post-Deployment ✅

- [ ] Database initialized: `python init_production_db.py`
- [ ] Health check working: `/health`
- [ ] API documentation accessible: `/docs`
- [ ] Admin login working: `admin@trashverse.ng`
- [ ] Email system tested
- [ ] CORS configured for frontend

## Frontend Configuration ✅

- [ ] API base URL updated to Render URL
- [ ] CORS origins include your frontend domain
- [ ] Authentication flow tested
- [ ] File upload functionality tested

## Final Tests ✅

- [ ] User registration working
- [ ] Password reset emails sending
- [ ] File uploads working
- [ ] All API endpoints responding
- [ ] Mobile app connecting successfully

## 🎯 Deployment Commands

### Quick Deploy (using render.yaml):
1. Push code to GitHub
2. Create Blueprint in Render
3. Select repository
4. Deploy automatically

### Manual Commands:
```bash
# Build
pip install -r requirements.txt

# Start
uvicorn app.main:app --host 0.0.0.0 --port $PORT

# Initialize DB
python init_production_db.py
```

## 📱 URLs After Deployment

- **API Base**: `https://your-app-name.onrender.com`
- **Health Check**: `https://your-app-name.onrender.com/health`
- **API Docs**: `https://your-app-name.onrender.com/docs`
- **Admin Login**: Use `admin@trashverse.ng` / `TrashVerse2024!`

## 🔧 Environment Variables Template

```env
DATABASE_URL=postgresql://user:pass@host:port/dbname
SECRET_KEY=your-super-secret-key-here
RESEND_API_KEY=re_imeqaLTJ_LMycHLq3YEs1R9XAiHqD9VvW
DEFAULT_FROM_EMAIL=onboarding@resend.dev
EMAIL_MODE=production
ENVIRONMENT=production
ALGORITHM=HS256
ACCESS_TOKEN_EXPIRE_MINUTES=10080
PASSWORD_RESET_TOKEN_EXPIRE_MINUTES=30
```

Ready for deployment! 🚀