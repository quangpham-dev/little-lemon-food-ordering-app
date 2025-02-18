# Little Lemon Food Ordering App

A React Native mobile application built with Expo and TypeScript for the Coursera React Native Specialization.

## Tech Stack

### Core
- React Native 0.76.7
- Expo SDK 52.0.35
- TypeScript 5.3.3
- React 18.3.1

### Navigation & Routing
- Expo Router 4.0.17
- React Navigation 7.0.14

### State & Storage
- React Native Async Storage 1.23.1
- Expo SQLite 15.1.2
- Expo Secure Store 14.0.1

### UI Components
- Expo Vector Icons 14.0.2
- Expo Blur 14.0.3
- Expo Haptics 14.0.1
- Expo Checkbox 4.0.1

### Utilities
- Axios 1.7.9
- Lodash Debounce 4.0.8

### Development Tools
- ESLint 8.57.0
- Prettier 3.4.2
- Husky 9.1.7
- Jest 29.2.1
- TypeScript 5.3.3

## Prerequisites

- Node.js >= 20
- Yarn
- Expo CLI
- iOS Simulator / Android Emulator

## Getting Started

1. Install dependencies:
```bash
yarn install
```

2. Start the development server:
```bash
yarn start
```

3. Run on specific platform:
```bash
# iOS
yarn ios

# Android 
yarn android

# Web
yarn web
```

## Available Scripts

### Development
- `yarn start` - Start Expo development server
- `yarn ios` - Run on iOS
- `yarn android` - Run on Android
- `yarn web` - Run on web browser

### Testing & Quality
- `yarn test` - Run Jest tests
- `yarn lint` - Run ESLint
- `yarn format` - Format code with Prettier

### Utilities
- `yarn clean-cache` - Clean Babel loader cache
- `yarn reset-project` - Reset project to initial state

## Project Structure

```
little-lemon-food-ordering-app/
├── app/                # Expo Router configuration and route groups
│   ├── (app)/          # Main app routes
│   ├── (auth)/         # Authentication-related routes
│   ├── +not-found.tsx  # 404 page configuration
│   └── _layout.tsx     # Root layout configuration
├── assets/             # Static assets (images, fonts)
├── components/         # Reusable React components
├── constants/          # App-wide constants and configuration
├── contexts/           # React context providers
├── hooks/              # Custom React hooks
├── interfaces/         # TypeScript interface definitions
├── screens/            # Screen components
│   ├── Home.tsx
│   ├── Onboarding.tsx
│   └── Profile.tsx
├── scripts/            # Utility scripts
├── themes/             # App theming and styling
├── utils/              # Utility functions and helpers
├── app.json            # Expo app configuration
├── package.json        # Project dependencies and scripts
└── tsconfig.json       # TypeScript configuration
```

### Key Directories Overview

- **`app/`**: Contains Expo Router configuration, including route groups and layout files
- **`assets/`**: Stores static resources like images and fonts
- **`components/`**: Reusable UI components used across the app
- **`constants/`**: Stores constant values and configuration settings
- **`contexts/`**: React context providers for state management
- **`hooks/`**: Custom React hooks for reusable logic
- **`interfaces/`**: TypeScript interface and type definitions
- **`screens/`**: Full-page components for different app views
- **`themes/`**: Styling and theming configurations
- **`utils/`**: Helper functions and utility scripts

## Development Guidelines

- Follow TypeScript best practices
- Write unit tests for new features
- Use meaningful variable and function names
- Keep components small and focused
- Use async/await for asynchronous operations

## License

This project is for educational purposes only.
