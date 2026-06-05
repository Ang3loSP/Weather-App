# 🌤️ Weather App — Live Forecast with 3 API Methods

A responsive, single-page weather application that displays real-time weather conditions and a 5-day forecast for any city in the world. Built with vanilla HTML, CSS, and JavaScript, and powered by the OpenWeatherMap API.

---

## 🚀 Live Demo

> Deployed on Netlify — (https://your-site-name.netlify.app)

---

## ✨ Features

- 🔍 **City search** — look up current weather for any city
- 📍 **Geolocation auto-detection** — loads your local weather on startup (falls back to Springs, South Africa if denied)
- 📅 **5-day forecast** — one representative reading per day, horizontally scrollable
- 🌡️ **Current conditions** — temperature (°C), humidity (%), and wind speed (km/h)
- 🔄 **3 switchable API methods** — toggle between Fetch API, jQuery AJAX, and XMLHttpRequest at runtime
- 🖼️ **Local SVG weather icons** with CDN fallback
- 📱 **Fully responsive** — works on desktop and mobile
- 🎨 **Glassmorphism UI** — blurred backdrop, gradient card, smooth transitions

---

## 🧠 The 3 API Methods (Educational Feature)

One of the core learning features of this app is demonstrating three different ways to make HTTP requests in JavaScript. You can switch between them live using the buttons at the top of the card.

| Button | Method | Era | Notes |
|---|---|---|---|
| 🌐 Fetch API | `fetch()` | Modern | Promise-based, clean & readable |
| 📦 jQuery AJAX | `$.ajax()` | Classic | Requires jQuery, widely used in legacy codebases |
| ⚡ XMLHttpRequest | `XHR` | Legacy | The original browser HTTP API, callback-based |

All three methods hit the same OpenWeatherMap endpoints and produce identical output — only the underlying mechanism differs. A toast notification confirms which method is active when you switch.

---

## 📁 Project Structure

```
weather-app/
│
├── Index.html              # Main HTML structure
├── Styles.css              # All styling (glassmorphism, responsive, animations)
├── Script.js               # App logic — API calls, DOM updates, geolocation
│
└── Assets/
    ├── bg.jpg              # Background image
    ├── message/
    │   ├── search-city.png # Illustration shown before a search
    │   └── not-found.png   # Illustration shown when a city isn't found
    └── weather/
        ├── clear.svg
        ├── clouds.svg
        ├── rain.svg
        ├── drizzle.svg
        ├── snow.svg
        ├── thunderstorm.svg
        └── atmosphere.svg
```

---

## 🛠️ Tech Stack

| Technology | Purpose |
|---|---|
| HTML5 | Structure & semantics |
| CSS3 | Styling, glassmorphism, animations, responsive layout |
| Vanilla JavaScript (ES6+) | App logic, DOM manipulation, async/await |
| jQuery 3.7.1 | Powers the jQuery AJAX method option |
| Google Material Symbols | Icons (search, location, humidity, wind) |
| Google Fonts — Poppins | Typography |
| OpenWeatherMap API | Live weather & forecast data |

---

## 🌐 API Reference

This app uses two endpoints from the [OpenWeatherMap API](https://openweathermap.org/api):

**Current Weather**
```
GET https://api.openweathermap.org/data/2.5/weather?q={city}&appid={apiKey}&units=metric
GET https://api.openweathermap.org/data/2.5/weather?lat={lat}&lon={lon}&appid={apiKey}&units=metric
```

**5-Day Forecast**
```
GET https://api.openweathermap.org/data/2.5/forecast?q={city}&appid={apiKey}&units=metric
GET https://api.openweathermap.org/data/2.5/forecast?lat={lat}&lon={lon}&appid={apiKey}&units=metric
```

> ⚠️ The API key is currently hardcoded in `Script.js`. See the [Security Note](#-security-note) below before deploying.

---

## ☁️ Deploying to Netlify

### Option A — Drag & Drop (Quickest)

1. Go to [netlify.com](https://netlify.com) and log in
2. On your dashboard, click **"Add new site" → "Deploy manually"**
3. Drag your entire project folder into the upload area
4. Netlify will assign a URL like `random-name.netlify.app`
5. Rename it under **Site Settings → Change site name**

### Option B — Deploy from GitHub (Recommended)

1. Push your project to a GitHub repository
2. In Netlify, click **"Add new site" → "Import an existing project"**
3. Connect your GitHub account and select the repository
4. Set the following build settings:
   - **Base directory:** *(leave blank)*
   - **Build command:** *(leave blank — no build step needed)*
   - **Publish directory:** `/` or `.`
5. Click **Deploy site**

Future pushes to `main` will automatically redeploy the site.

### After Deploying

- Set a custom domain under **Domain Management** if you have one
- Enable **HTTPS** (Netlify does this automatically)

---

## 🔒 Security Note

The OpenWeatherMap API key is currently written directly in `Script.js`:

```js
const apiKey = 'acfbb8b5447646345ba97df209211e1f'
```

This is fine for a student/portfolio project, but be aware:

- Anyone who views your page source can see the key
- OpenWeatherMap's free tier has rate limits (60 calls/min), which acts as a natural guard
- For production apps, API keys should be stored server-side (e.g. in a Netlify serverless function or environment variable) and never exposed to the browser

---

## ⚙️ Running Locally

No build tools or package managers are needed — this is a pure static site.

**Option 1 — VS Code Live Server**
1. Open the project folder in VS Code
2. Right-click `Index.html` → **"Open with Live Server"**

**Option 2 — Python HTTP Server**
```bash
# Navigate to the project folder, then:
python -m http.server 5500
# Open http://localhost:5500 in your browser
```

> ⚠️ Opening `Index.html` directly in the browser (via `file://`) will block geolocation and may cause CORS errors. Always use a local server.

---

## 🗺️ How It Works

```
User opens app
    │
    ▼
Geolocation requested
    ├── Granted → fetch weather by lat/lon
    └── Denied  → fallback to "Springs"
    │
    ▼
Selected API method called (Fetch / jQuery / XHR)
    │
    ▼
OpenWeatherMap returns JSON
    │
    ├── cod 200 → update UI with weather + forecast
    └── other   → show "City not found" screen
```

---

## 🤝 Acknowledgements

- [OpenWeatherMap](https://openweathermap.org/) — weather data API
- [Google Fonts](https://fonts.google.com/) — Poppins typeface & Material Symbols
- [jQuery](https://jquery.com/) — used for the AJAX method demonstration

---

## 📄 Licence

This project is for educational purposes. Free to use and modify.
