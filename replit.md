# FocusForge - Habit Tracker App

## Overview
FocusForge is a simple, elegant habit tracker web application that helps users track and manage their daily habits. The app features a dark-themed, modern UI with local storage persistence.

## Tech Stack
- **HTML5** - Structure
- **CSS3** - Styling with gradient backgrounds and modern design
- **Vanilla JavaScript** - Core functionality and DOM manipulation
- **LocalStorage** - Data persistence

## Features
- Add new habits with custom text
- Click habits to mark them as completed (with visual strikethrough)
- Real-time statistics showing total habits and completed count
- Data persists across browser sessions using localStorage
- Responsive, centered layout

## Project Structure
```
.
├── index.html    # Main HTML structure
├── style.css     # All styling and visual design
└── script.js     # JavaScript logic for habit management
```

## Recent Testing (October 27, 2025)
### Issues Found and Fixed:
1. **File Separation Issue** - script.js originally contained both CSS and JavaScript mixed together
   - Fixed by separating CSS code into style.css
   - JavaScript code properly isolated in script.js

### Testing Results:
- ✅ Server running properly on port 5000
- ✅ All files loading correctly (index.html, style.css, script.js)
- ✅ No console errors
- ✅ UI displays correctly with proper styling
- ✅ App is ready for use

## How to Run
The app is served using Python's built-in HTTP server:
```bash
python3 -m http.server 5000
```

## User Interface
- **Dark Theme** - Black gradient background (#0d0d0d to #1a1a1a)
- **Accent Color** - Cyan (#00ffcc) for branding and buttons
- **Modern Typography** - Poppins font family
- **Responsive Design** - Centered layout, max-width 400px
