# 🏛️ PrimeBid — MERN Stack Auction Platform

A luxury, dark-themed auction platform with animated UI and full MERN stack.

---

## 🐛 Bugs Fixed

### 1. Login Not Working
**Root cause:** The `login` action was sending `FormData`, but the backend endpoint expects `Content-Type: application/json`.

**Fix:** In `frontend/src/store/slices/userSlice.js`, the `login` thunk now converts FormData to a plain object before sending as JSON:
```js
const payload = data instanceof FormData ? Object.fromEntries(data.entries()) : data;
```

### 2. Hardcoded API URLs
**Root cause:** All API calls used hardcoded `http://localhost:5000` — broken in any deployed/production environment.

**Fix:** All slice files now use an env variable:
```js
`${import.meta.env.VITE_API_URL || "http://localhost:5000"}/api/v1/...`
```

---

## ⚙️ Setup Instructions

### Prerequisites
- Node.js 18+
- MongoDB (Atlas or local)
- Cloudinary account (for image uploads)

### Backend Setup
```bash
cd backend
npm install

# Copy and fill in your credentials:
cp config/config.env.example config/config.env
# Edit config/config.env with your:
#   MONGO_URI, JWT_SECRET_KEY, CLOUDINARY_*, SMTP_* values

npm start
```

### Frontend Setup
```bash
cd frontend
npm install

# Create .env file:
echo "VITE_API_URL=http://localhost:5000" > .env

npm run dev
```

Frontend will run at: `http://localhost:5173`
Backend will run at: `http://localhost:5000`

---

## 🗝️ Environment Variables

### Backend `config/config.env`
| Variable | Description |
|---|---|
| `PORT` | Server port (default 5000) |
| `MONGO_URI` | MongoDB connection string |
| `FRONTEND_URL` | Frontend URL for CORS |
| `JWT_SECRET_KEY` | Secret for JWT signing |
| `JWT_EXPIRE` | JWT expiry (e.g. `7d`) |
| `COOKIE_EXPIRE` | Cookie expiry in days |
| `CLOUDINARY_CLOUD_NAME` | Cloudinary cloud name |
| `CLOUDINARY_API_KEY` | Cloudinary API key |
| `CLOUDINARY_API_SECRET` | Cloudinary API secret |
| `SMTP_HOST` | Email server host |
| `SMTP_PORT` | Email server port |
| `SMTP_MAIL` | Sender email |
| `SMTP_PASSWORD` | Email password / app password |

### Frontend `.env`
| Variable | Description |
|---|---|
| `VITE_API_URL` | Backend API base URL |

---

## 🎨 Design Highlights
- **Luxury dark theme** with obsidian, charcoal, and gold palette
- **Playfair Display** serif headings + **DM Sans** body
- Animated orb backgrounds, shimmer text, fade-up entrances
- Live countdown timers on every auction card
- Redesigned sidebar with active link highlighting and user avatar
- Responsive 2-column grid for auction cards

