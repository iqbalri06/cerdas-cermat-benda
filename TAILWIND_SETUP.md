# BendaCerdas Quiz Application

BendaCerdas is an interactive quiz application built with React and styled with Tailwind CSS.

## Features

- Beautiful, modern UI with smooth animations using Framer Motion
- Material selection before starting a quiz
- Interactive quiz interface with timer and scoreboard
- Engaging feedback system with visual cues
- Responsive design for all devices

## Setup Instructions

1. Install dependencies:
```
npm install
```

2. To properly set up Tailwind CSS, make sure to:

   a. Make sure you have the proper dependencies:
   ```
   npm install tailwindcss postcss autoprefixer @headlessui/react @heroicons/react framer-motion --save
   ```

   b. Set up your Tailwind configuration:
   ```
   npx tailwindcss init -p
   ```

   c. Modify your `tailwind.config.js` file to scan your React components:
   ```javascript
   /** @type {import('tailwindcss').Config} */
   module.exports = {
     content: [
       "./src/**/*.{js,jsx,ts,tsx}",
     ],
     theme: {
       extend: {
         // Your custom theme here
       },
     },
     plugins: [],
   }
   ```

3. Start the development server:
```
npm start
```

## Technologies Used

- React
- Tailwind CSS for styling
- Headless UI for accessible components
- Heroicons for icons
- Framer Motion for animations

## Project Structure

- `src/components/` - React components
  - `Header.js` - The application header
  - `MaterialSelection.js` - Material selection screen
  - `Quiz.js` - Main quiz controller
  - `QuestionCard.js` - Individual question display
  - `Scoreboard.js` - Score and progress tracker

## License

Copyright © 2025 BendaCerdas
