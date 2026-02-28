# Repository Restructure Guide

## Current Situation
- Mobile app: In main TrashVerse folder
- Web app: In TrashVerse/testy folder (cloned from separate repo)
- Backend: In TrashVerse/backend folder

## Recommended Structure: Monorepo

### Step 1: Restructure Current Repository

```bash
# Create new structure
mkdir TrashVerse-new
cd TrashVerse-new

# Initialize git
git init

# Create folders
mkdir backend mobile web docs

# Copy backend
cp -r ../TrashVerse/backend/* ./backend/

# Copy mobile app (current app folder)
cp -r ../TrashVerse/app ./mobile/app
cp -r ../TrashVerse/components ./mobile/components
cp -r ../TrashVerse/services ./mobile/services
cp -r ../TrashVerse/contexts ./mobile/contexts
cp -r ../TrashVerse/constants ./mobile/constants
cp -r ../TrashVerse/hooks ./mobile/hooks
cp -r ../TrashVerse/assets ./mobile/assets
cp -r ../TrashVerse/data ./mobile/data
cp -r ../TrashVerse/scripts ./mobile/scripts
cp ../TrashVerse/package.json ./mobile/
cp ../TrashVerse/package-lock.json ./mobile/
cp ../TrashVerse/app.json ./mobile/
cp ../TrashVerse/tsconfig.json ./mobile/
cp ../TrashVerse/expo-env.d.ts ./mobile/
cp ../TrashVerse/eslint.config.js ./mobile/
cp ../TrashVerse/.gitignore ./mobile/

# Copy web app (testy folder)
cp -r ../TrashVerse/testy/* ./web/

# Copy documentation
cp ../TrashVerse/*.md ./docs/
```

### Step 2: Create Root Configuration Files

#### Root .gitignore
```gitignore
# Dependencies
node_modules/
__pycache__/
*.pyc
.Python
venv/
env/

# Environment variables
.env
.env.local
.env.*.local

# Build outputs
dist/
build/
.next/
.expo/

# IDE
.vscode/
.idea/
*.swp
*.swo

# OS
.DS_Store
Thumbs.db

# Logs
*.log
npm-debug.log*

# Database
*.db
*.sqlite
*.sqlite3

# Uploads
uploads/
```

#### Root README.md
```markdown
# TrashVerse - Waste to Wealth Platform

Monorepo containing all TrashVerse applications.

## Project Structure

- `backend/` - FastAPI backend API
- `mobile/` - React Native/Expo mobile app
- `web/` - Next.js web application
- `docs/` - Documentation

## Quick Start

### Backend
```bash
cd backend
python -m venv venv
source venv/bin/activate  # Windows: venv\Scripts\activate
pip install -r requirements.txt
python run.py
```

### Mobile App
```bash
cd mobile
npm install
npx expo start
```

### Web App
```bash
cd web
npm install
npm run dev
```

## Documentation
See `docs/` folder for detailed guides.
```

#### Root package.json (Optional - for workspace management)
```json
{
  "name": "trashverse-monorepo",
  "version": "1.0.0",
  "private": true,
  "workspaces": [
    "mobile",
    "web"
  ],
  "scripts": {
    "mobile": "cd mobile && npm start",
    "web": "cd web && npm run dev",
    "backend": "cd backend && python run.py",
    "install:all": "npm install && cd mobile && npm install && cd ../web && npm install",
    "clean": "rm -rf node_modules mobile/node_modules web/node_modules"
  }
}
```

### Step 3: Update Git Remote

```bash
# In TrashVerse-new folder
git add .
git commit -m "Restructure: Monorepo with backend, mobile, and web"

# Update remote (if you want to keep same repo)
git remote add origin <your-github-repo-url>
git branch -M main
git push -u origin main --force
```

---

## Alternative: Separate Repositories with Git Submodules

If you prefer separate repos:

### Main Repository Structure
```
TrashVerse/
├── backend/          # Git submodule
├── mobile/           # Git submodule  
├── web/              # Git submodule
└── README.md
```

### Setup Commands

```bash
# Create main repo
mkdir TrashVerse-main
cd TrashVerse-main
git init

# Add backend as submodule
git submodule add <backend-repo-url> backend

# Add mobile as submodule
git submodule add <mobile-repo-url> mobile

# Add web as submodule
git submodule add <web-repo-url> web

# Commit
git add .
git commit -m "Add submodules"
git push
```

### Working with Submodules

```bash
# Clone with submodules
git clone --recursive <main-repo-url>

# Update all submodules
git submodule update --remote --merge

# Push changes to specific submodule
cd mobile
git add .
git commit -m "Update mobile app"
git push

# Update main repo to point to new commit
cd ..
git add mobile
git commit -m "Update mobile submodule"
git push
```

---

## Alternative: Separate Repositories (Independent)

Keep three completely separate repos:

### Repository 1: TrashVerse-Backend
```
TrashVerse-Backend/
├── app/
├── requirements.txt
├── run.py
└── README.md
```

### Repository 2: TrashVerse-Mobile
```
TrashVerse-Mobile/
├── app/
├── components/
├── services/
├── package.json
└── README.md
```

### Repository 3: TrashVerse-Web
```
TrashVerse-Web/
├── pages/
├── components/
├── package.json
└── README.md
```

### Coordination Strategy
1. **API Versioning**: Use versioned API endpoints (`/api/v1/`)
2. **Shared Documentation**: Keep API docs in backend repo
3. **Environment Variables**: Each frontend points to same backend URL
4. **Release Coordination**: Tag releases across repos (v1.0.0)

---

## Recommendation for Your Situation

**Go with Monorepo** because:

1. ✅ You're a small team (easier coordination)
2. ✅ Backend and frontends are tightly coupled
3. ✅ Easier to keep API contracts in sync
4. ✅ Simpler CI/CD setup
5. ✅ Single place for issues and PRs
6. ✅ Shared dependencies and tooling

**When to use separate repos:**
- Large team with separate frontend/backend teams
- Different release cycles needed
- Different access controls required
- Frontends are completely independent products

---

## Migration Steps (Detailed)

### Step 1: Backup Everything
```bash
# Create backup
cp -r TrashVerse TrashVerse-backup
```

### Step 2: Create New Structure
```bash
# Create new folder
mkdir TrashVerse-monorepo
cd TrashVerse-monorepo

# Initialize git
git init
```

### Step 3: Move Backend
```bash
mkdir backend
cp -r ../TrashVerse/backend/* ./backend/
```

### Step 4: Move Mobile App
```bash
mkdir mobile

# Copy all mobile-related files
cp -r ../TrashVerse/app ./mobile/
cp -r ../TrashVerse/components ./mobile/
cp -r ../TrashVerse/services ./mobile/
cp -r ../TrashVerse/contexts ./mobile/
cp -r ../TrashVerse/constants ./mobile/
cp -r ../TrashVerse/hooks ./mobile/
cp -r ../TrashVerse/assets ./mobile/
cp -r ../TrashVerse/data ./mobile/
cp -r ../TrashVerse/scripts ./mobile/
cp ../TrashVerse/package.json ./mobile/
cp ../TrashVerse/package-lock.json ./mobile/
cp ../TrashVerse/app.json ./mobile/
cp ../TrashVerse/tsconfig.json ./mobile/
cp ../TrashVerse/expo-env.d.ts ./mobile/
cp ../TrashVerse/eslint.config.js ./mobile/
cp ../TrashVerse/.gitignore ./mobile/.gitignore
```

### Step 5: Move Web App
```bash
mkdir web
cp -r ../TrashVerse/testy/* ./web/
```

### Step 6: Create Root Files
```bash
# Create root .gitignore
cat > .gitignore << 'EOF'
node_modules/
__pycache__/
*.pyc
.env
.env.local
dist/
build/
.next/
.expo/
*.db
*.log
.DS_Store
EOF

# Create root README
cat > README.md << 'EOF'
# TrashVerse Monorepo

## Structure
- backend/ - FastAPI API
- mobile/ - React Native app
- web/ - Next.js web app

## Setup
See individual folders for setup instructions.
EOF
```

### Step 7: Test Each Project
```bash
# Test backend
cd backend
python -m venv venv
source venv/bin/activate
pip install -r requirements.txt
python run.py
# Should start on port 8000

# Test mobile (new terminal)
cd mobile
npm install
npx expo start
# Should open Expo

# Test web (new terminal)
cd web
npm install
npm run dev
# Should open on port 3000
```

### Step 8: Commit and Push
```bash
git add .
git commit -m "Initial monorepo structure"
git remote add origin <your-repo-url>
git push -u origin main
```

---

## Environment Variables Management

### Backend (.env)
```env
DATABASE_URL=sqlite:///./trashverse.db
SECRET_KEY=your-secret-key
ALGORITHM=HS256
ACCESS_TOKEN_EXPIRE_MINUTES=30
```

### Mobile (.env)
```env
EXPO_PUBLIC_API_URL=http://localhost:8000
EXPO_PUBLIC_API_URL_PROD=https://api.trashverse.com
```

### Web (.env.local)
```env
NEXT_PUBLIC_API_URL=http://localhost:8000
NEXT_PUBLIC_API_URL_PROD=https://api.trashverse.com
```

---

## CI/CD Considerations

### GitHub Actions Example
```yaml
name: CI/CD

on: [push, pull_request]

jobs:
  backend:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v2
      - name: Test Backend
        run: |
          cd backend
          pip install -r requirements.txt
          pytest

  mobile:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v2
      - name: Test Mobile
        run: |
          cd mobile
          npm install
          npm test

  web:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v2
      - name: Test Web
        run: |
          cd web
          npm install
          npm test
```

---

## Deployment Strategy

### Option 1: All on Same Server
```
server.trashverse.com
├── /api (backend on port 8000)
├── /app (mobile web build)
└── / (web app on port 3000)
```

### Option 2: Separate Deployments
- Backend: api.trashverse.com (Railway, Render, AWS)
- Web: www.trashverse.com (Vercel, Netlify)
- Mobile: App stores (Expo EAS)

---

## Next Steps

1. Choose structure (Monorepo recommended)
2. Follow migration steps
3. Test all three projects
4. Update documentation
5. Push to GitHub
6. Set up CI/CD
7. Plan deployment strategy
