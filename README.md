# Trishikha Chakraborty — Portfolio Website

A beautiful **neumorphic** portfolio built with React.js, featuring a **Light/Dark theme toggle** with lavender light theme and deep purple dark theme.

---

## ✨ Features

- 🌗 **Light / Dark Theme Toggle** — Lavender light mode & deep purple dark mode
- 🧊 **Neumorphic UI** — Soft shadows, pressed inputs, floating cards
- 🎠 **Project Carousel** — Filterable by category with swipe/drag support
- 📊 **Animated Skill Bars** — Triggered on scroll
- 📱 **Fully Responsive** — Mobile-first design
- ⌨️ **Typewriter Effect** — Hero role cycling animation
- 💫 **Floating Animations** — Orbital tool icons, gradient blobs
- 📬 **Contact Form** — Opens native mail client via `mailto:`

---

## 🚀 Getting Started

### Prerequisites
- Node.js v16+ installed
- npm or yarn

### Install & Run

```bash
# Step 1: Navigate into the folder
cd trishikha-portfolio

# Step 2: Install dependencies
npm install

# Step 3: Start the development server
npm start
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## 📁 Project Structure

```
src/
├── App.js              # Root with ThemeContext
├── App.css             # Global CSS variables & neumorphic utilities
├── index.js
├── index.css
└── components/
    ├── Navbar.js / .css
    ├── Hero.js / .css
    ├── About.js / .css
    ├── Skills.js / .css
    ├── Experience.js / .css
    ├── Projects.js / .css
    ├── Contact.js / .css
    └── Footer.js / .css
```

---

## 🎨 Customization

### Update Portfolio Drive Link
Search for `https://drive.google.com/drive/folders/1TbVjSTg-xBk4SFVsigBSaFvr3wYJGQ43` and replace with your real Google Drive folder URL.

### Add Real Project Images
In `Projects.js`, replace the `emoji` field in each project with an `img` tag pointing to your own images.

### Update Contact Info
Edit `contactInfo` array in `Contact.js` with your correct phone/email/LinkedIn.

---

## 🛠 Build for Production

```bash
npm run build
```

This creates an optimized build in the `build/` folder ready to deploy on Netlify, Vercel, or GitHub Pages.

---

## 📦 Dependencies

- `react` ^18.2.0
- `react-dom` ^18.2.0
- `react-scripts` 5.0.1
- `react-icons` ^5.0.1
- Google Fonts: Playfair Display, DM Sans, Space Mono

---

Made with ♥ for Trishikha Chakraborty | Kolkata, India
