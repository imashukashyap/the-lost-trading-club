# THE LOST TRADING CLUB

A minimal, luxury trading community brand website for **THE LOST TRADING CLUB**, built with **React**, **Vite**, and **Tailwind CSS**.

Featuring a cinematic dark obsidian aesthetic, elegant editorial typography, disciplined minimalism, an edge-to-edge animated financial market background with authentic OHLC candlesticks, 60 FPS hardware-accelerated rendering, and dedicated trading platform referrals.

---

## ✨ Design & Performance Overview

- **Aesthetic**: Dual luxury themes with instant reactive switching:
  - **Dark Mode (Default)**: Deep void obsidian palette (`#060709`), champagne gold (`#d4af37`), metallic amber (`#e5c07b`), and dark bronze accents.
  - **Light Mode**: Crisp off-white & clean slate (`#f8fafc`), sophisticated royal blue (`#2563eb`), and deep navy charcoal typography (`#0f172a`).
  - Seamless persistence via `localStorage` with dark mode default for first-time visitors.
- **Typography**: Cormorant Garamond (luxury serif), Syne (modern display), Plus Jakarta Sans (body), and JetBrains Mono (tactical accents).
- **Hero Background**: Full-screen, edge-to-edge market animation with realistic OHLC wave dynamics, wicks, volume bars, and glowing spline.
- **Cinematic Scroll Animations**: Smooth staggered entrances for Referrals, Connect, and Support cards with reduced-motion support.
- **Production Optimized**: Pre-rendered offscreen canvas grids, throttled scroll observers, and complete Vercel routing configuration (`vercel.json`).

---

## 🏛️ Sections

1. **Navbar**: Minimal navigation with brand monogram `◇` + `THE LOST TRADING CLUB`, links for **Home**, **About**, **Referrals**, **Connect**, and **Support**, sliding active gold underline indicator, and a responsive mobile drawer.
2. **Home (Hero)**:
   - Full-screen edge-to-edge animated financial market canvas background with realistic candlestick wave action.
   - Left-aligned brand monogram `◇`, master title **THE LOST TRADING CLUB**, tagline *"Discipline. Patience. Precision."*, and luxury **Join Telegram** button.
3. **About (Our Story - Better Together)**:
   - Welcoming, community-focused story addressing the challenges and isolation of trading, and how The Lost Trading Club provides an environment for traders to grow, share ideas, and succeed together.
4. **Referrals (Trading Platforms)**:
   - **XM Broker**:
     - Registration URL: `https://www.xmglobal.com/referral?token=IZ4FnguHtNqmve6ztKhvJQ`
     - Referral Code: `RAF4DXU1F` (with one-click copy to clipboard)
     - Entire card clickable, opens in a new tab.
   - **Exness Broker**:
     - Registration URL: `https://one.exnessonelink.com/a/quwpkgntim`
     - Referral Code: `quepkgntim` (with one-click copy to clipboard)
     - Entire card clickable, opens in a new tab.
5. **Connect**:
   - Staggered scroll-animated cards for **Telegram** (`@TheLostTradingClub`) and **Instagram** (`@thelosttradingclub`).
6. **Support (We're Here to Help)**:
   - Staggered scroll-animated cards for Telegram, WhatsApp, and Email support:
     - **Telegram Support**: `@TheLostTradingSupport` -> `https://t.me/mns2132`
     - **WhatsApp Support**: `+91 88630 71189` -> `https://wa.me/918863071189`
     - **Email Support**: `thelosttradingclub@gmail.com` -> `mailto:thelosttradingclub@gmail.com`
7. **Footer**:
   - Minimalist monogram `◇`, quick navigation links, and copyright notice.

---

## 🛠️ Local Development

```bash
# Install dependencies
npm install

# Run Vite development server
npm run dev
```

Open [http://127.0.0.1:5173/](http://127.0.0.1:5173/) in your browser.

---

## 📦 Production Build & Testing

```bash
# Compile and bundle for production
npm run build

# Preview production build locally
npm run preview
```

The output bundle will be generated in the `dist/` directory.

---

## 🚀 Deployment to Vercel

The project is pre-configured for seamless zero-config deployment on [Vercel](https://vercel.com/) with `vercel.json` included for SPA routing and asset caching.

### Option 1: Deploy via GitHub (Recommended)

1. Initialize git and commit your project (if not already done):
   ```bash
   git init
   git add .
   git commit -m "feat: complete production ready The Lost Trading Club website"
   ```
2. Push your repository to **GitHub**, **GitLab**, or **Bitbucket**.
3. Go to [vercel.com](https://vercel.com/) and click **"Add New Project"**.
4. Import your repository.
5. Vercel automatically detects the Vite framework settings:
   - **Framework Preset**: `Vite`
   - **Build Command**: `npm run build`
   - **Output Directory**: `dist`
   - **Install Command**: `npm install`
6. Click **Deploy**. Your site will be live within seconds with SSL and a global CDN.

---

### Option 2: Deploy via Vercel CLI

1. Install the Vercel CLI globally (or run with npx):
   ```bash
   npm i -g vercel
   ```
2. From the project root (`d:\Trading portfolio website`), execute:
   ```bash
   vercel
   ```
3. Follow the CLI prompts:
   - Set up and deploy? **Yes**
   - Which scope? Select your personal or team account
   - Link to existing project? **No**
   - Project name? **lost-trading-club** (or press Enter)
   - In which directory is your code located? `./`
4. For production deployment, run:
   ```bash
   vercel --prod
   ```
