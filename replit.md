# FocusForge - Habit Tracker App

## Overview
FocusForge is an interactive, animated habit tracker web application that helps users track and manage their daily habits. The app features a dark-themed, modern UI with local storage persistence, suggested habits, and celebration animations.

## Tech Stack
- **HTML5** - Structure
- **CSS3** - Styling with gradient backgrounds, modern design, and animations
- **Vanilla JavaScript** - Core functionality and DOM manipulation
- **LocalStorage** - Data persistence

## Features
- ✅ Add custom habits with text input
- ✅ Press Enter key to quickly add habits
- ✅ Click habits to mark as completed (with visual strikethrough)
- ✅ Delete habits with dedicated delete button
- ✅ **Suggested Habits** - 8 preset habits to quickly add
- ✅ **Confetti Animation** - Celebration effect when completing habits
- ✅ **Smooth Animations** - Entry, completion, and delete animations
- ✅ Real-time statistics showing total habits and completed count
- ✅ Data persists across browser sessions using localStorage
- ✅ Responsive, centered layout
- ✅ Custom scrollbar for habit list
- ✅ Accessible with ARIA labels for screen readers

## Project Structure
```
.
├── index.html    # Main HTML structure
├── style.css     # All styling, visual design, and animations
└── script.js     # JavaScript logic for habit management
```

## Recent Updates (October 27, 2025)

### Latest Features Added:
1. **Suggested Habits Section**
   - 8 preset habits with emojis (💧 Drink water, 🏃 Exercise, 📖 Read, etc.)
   - Click any chip to instantly add it to your list
   - Hover effects with scale and glow

2. **Animations**
   - Slide-in animation for newly added habits
   - Confetti celebration (30 particles) when completing a habit
   - Smooth slide-out animation when deleting
   - Glowing title effect
   - Hover animations on all interactive elements

3. **Enhanced Visual Design**
   - Professional spacing and layout
   - Smooth transitions on all elements
   - Focus states with cyan glow
   - Custom scrollbar styling
   - Better color contrast and accessibility

### Testing Results:
- ✅ Server running properly on port 5000
- ✅ All files loading correctly
- ✅ No console errors
- ✅ Suggested habits working perfectly
- ✅ Animations smooth and performant
- ✅ Delete functionality with animation
- ✅ Keyboard support (Enter key) functional
- ✅ Confetti celebration on completion
- ✅ All features verified and approved

## How to Run
The app is served using Python's built-in HTTP server:
```bash
python3 -m http.server 5000
```

## User Interface
- **Dark Theme** - Black gradient background (#0d0d0d to #1a1a1a)
- **Accent Color** - Cyan (#00ffcc) for branding and buttons
- **Modern Typography** - Poppins font family
- **Responsive Design** - Centered layout, max-width 450px
- **Smooth Animations** - CSS transitions and keyframe animations

## Suggested Habits Included
1. 💧 Drink 8 glasses of water
2. 🏃 Exercise for 30 minutes
3. 📖 Read for 20 minutes
4. 🧘 Meditate for 10 minutes
5. 🌅 Wake up at 6 AM
6. 💤 Sleep 8 hours
7. 🥗 Eat healthy meals
8. 📝 Journal daily thoughts

## Future Customization Ideas
- Add more suggested habits or categories
- Customize confetti colors
- Track streaks or completion dates
- Add priority levels
- Export/import habit data
- Daily reset functionality
- Progress charts and analytics
- Custom themes
