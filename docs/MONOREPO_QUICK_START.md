# Monorepo Quick Start Guide

## TL;DR - Just Tell Me What To Do

### Option 1: Automated (Recommended)
```bash
# Windows
restructure-to-monorepo.bat

# Mac/Linux
chmod +x restructure-to-monorepo.sh
./restructure-to-monorepo.sh
```

### Option 2: Manual (5 commands)
```bash
# 1. Create structure
mkdir ../TrashVerse-monorepo
cd ../TrashVerse-monorepo
git init

# 2. Create folders
mkdir backend mobile web

# 3. Copy files (see detailed guide)
# ... copy commands ...

# 4. Commit
git add .
git commit -m "Initial monorepo"

# 5. Push
git remote add origin YOUR-GITHUB-URL
git push -u origin main
```

---

## Why Monorepo?

**Before (Current):**
```
TrashVerse/
├── backend/
├── app/              ← Mobile app
├── testy/            ← Web app (from different repo)
└── ... other files
```
Problem: Confusing structure, web app is from different repo

**After (Monorepo):**
```
TrashVerse-monorepo/
├── backend/          ← FastAPI
├── mobile/           ← React Native
└── web/              ← Next.js
```
Solution: Clean, organized, one repo for everything

---

## Daily Workflow After Monorepo

### Making Changes
```bash
# Edit mobile app
cd mobile
# ... make changes ...

# Edit web app
cd ../web
# ... make changes ...

# Edit backend
cd ../backend
# ... make changes ...
```

### Committing Changes
```bash
# From root folder
git add .
git commit -m "Add login feature to all platforms"
git push
```

That's it! One push updates everything.

---

## Running Projects After Monorepo

### Terminal 1: Backend
```bash
cd TrashVerse-monorepo/backend
python -m venv venv
venv\Scripts\activate  # Windows
source venv/bin/activate  # Mac/Linux
python run.py
```
→ http://localhost:8000

### Terminal 2: Mobile
```bash
cd TrashVerse-monorepo/mobile
npm install
npx expo start
```
→ Press 'w' for web preview

### Terminal 3: Web
```bash
cd TrashVerse-monorepo/web
npm install
npm run dev
```
→ http://localhost:3000

---

## File Structure Comparison

### Before
```
TrashVerse/
├── backend/
│   ├── app/
│   └── requirements.txt
├── app/                    ← Mobile screens
├── components/             ← Mobile components
├── services/               ← Mobile services
├── package.json            ← Mobile dependencies
├── testy/                  ← Web app (separate repo)
│   ├── pages/
│   ├── components/
│   └── package.json
└── ... 50+ other files
```

### After
```
TrashVerse-monorepo/
├── backend/
│   ├── app/
│   └── requirements.txt
├── mobile/
│   ├── app/
│   ├── components/
│   ├── services/
│   └── package.json
├── web/
│   ├── pages/
│   ├── components/
│   └── package.json
├── docs/
└── README.md
```

Much cleaner! ✨

---

## Environment Variables

### Backend (.env)
```env
DATABASE_URL=sqlite:///./trashverse.db
SECRET_KEY=your-secret-key
```

### Mobile (.env)
```env
EXPO_PUBLIC_API_URL=http://localhost:8000
```

### Web (.env.local)
```env
NEXT_PUBLIC_API_URL=http://localhost:8000
```

All three point to same backend!

---

## Git Workflow

### Before (Confusing)
```bash
# Mobile changes
cd TrashVerse
git add app/ components/ services/
git commit -m "Update mobile"
git push

# Web changes - different repo!
cd TrashVerse/testy
git add .
git commit -m "Update web"
git push  # Goes to different repo!
```

### After (Simple)
```bash
# All changes
cd TrashVerse-monorepo
git add .
git commit -m "Update mobile and web"
git push  # One push for everything!
```

---

## Common Questions

### Q: What happens to the old testy repo?
**A:** You can archive it or delete it. Add a note saying "Moved to monorepo".

### Q: Do I need to change my backend code?
**A:** No! Backend stays exactly the same.

### Q: Will my mobile app still work?
**A:** Yes! Just in a different folder now.

### Q: Can I still deploy separately?
**A:** Yes! Deploy backend to Railway, mobile to Expo, web to Vercel.

### Q: What if I want to go back?
**A:** The script creates a backup. You can always restore it.

---

## Deployment After Monorepo

### Backend
```bash
# Deploy to Railway/Render
cd backend
# ... deploy commands ...
```

### Mobile
```bash
# Build with Expo
cd mobile
eas build --platform android
eas build --platform ios
```

### Web
```bash
# Deploy to Vercel
cd web
vercel deploy
```

All from same repo! 🎉

---

## Troubleshooting

### "Script not found"
```bash
# Make script executable (Mac/Linux)
chmod +x restructure-to-monorepo.sh
```

### "Git not initialized"
```bash
cd TrashVerse-monorepo
git init
```

### "Can't find files"
Make sure you run the script from TrashVerse root folder.

---

## Next Steps

1. ✅ Read this guide
2. ✅ Run restructure script
3. ✅ Test all three projects
4. ✅ Push to GitHub
5. ✅ Start working in monorepo

**Time needed:** 30 minutes to 1 hour

---

## Resources

- Full guide: `REPOSITORY_RESTRUCTURE_GUIDE.md`
- Decision helper: `REPO_STRATEGY_DECISION.md`
- Comparison report: `PROJECT_COMPARISON_REPORT.md`

---

## Still Confused?

The simplest explanation:

**Before:** Mobile and web in different places, confusing
**After:** Everything in one place, organized
**Benefit:** One git push updates everything

That's it! 🚀
