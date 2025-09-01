# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Common Commands

### Development
```bash
# Install dependencies
npm install

# Start the development server (Expo Go)
npm start
# or (if using mise)
mise run start

# Run on specific platforms
npm run ios        # iOS simulator
npm run android    # Android emulator
npm run web        # Web browser
```

### Code Quality
```bash
# Run linting
npm run lint

# Fix linting issues automatically
npm run lint:fix

# Format code with Prettier
npm run format

# Check formatting without changing files
npm run format:check
```

## Architecture Overview

This is a React Native application using Expo framework with the following key technologies:

### Core Stack
- **Expo Router** (v5) - File-based routing for navigation
- **React Native** (0.79.6) with React 19
- **TypeScript** - Strict mode enabled
- **NativeWind** (v4) - Tailwind CSS for React Native styling

### Project Structure
- `/app/` - Main application screens and navigation (Expo Router)
  - `_layout.tsx` - Root layout component
  - `index.tsx` - Home screen
- `/components/` - Reusable React components
  - `CribbageBoard.tsx` - SVG-based cribbage board visualization
- `/global.css` - Global Tailwind CSS styles

### Styling Approach
The project uses NativeWind with Tailwind CSS classes for styling. Components use `className` props with Tailwind utility classes instead of StyleSheet objects.

### Key Implementation Details
- Path aliases configured: `@/*` maps to the project root
- SVG graphics handled via `react-native-svg`
- The CribbageBoard component renders an interactive game board with player progress tracking using SVG paths