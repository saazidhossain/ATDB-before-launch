# Lovable Equipment Project

This project is a modern web application for equipment management and presentation, built with React, Vite, TypeScript, and Shadcn UI.
It supports internationalization (English/Bengali) and features fluid animations and a responsive design.

## Features

- **Equipment Categories**: Browse different types of equipment easily.
- **Live Fleet Photos**: View real-time or updated photos of the equipment fleet.
- **Project Highlights**: Discover showcases of past projects and equipment utilization.
- **Internationalization (i18n)**: Seamless English and Bengali text switching.
- **Responsive UI**: Built with Tailwind CSS and Shadcn UI components.
- **Animations**: Powered by framer-motion for a dynamic user experience.

## Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) (v18 or newer recommended)
- [npm](https://npmjs.com/)

### Installation

1. Clone the repository and navigate into the directory.
2. Install dependencies:
   ```shell
   npm install
   ```

### Running the Development Server

Start the application locally using Vite:

```shell
npm run dev
```

The application will be available at `http://localhost:5173` by default.

## Scripts

- `npm run dev`: Starts the development server.
- `npm run build`: Builds the app for production.
- `npm run lint`: Lints the codebase using ESLint.
- `npm run test`: Runs the Vitest unit tests.
- `npm run test:visual`: Runs visual regression tests using Playwright.

## Testing

The project is configured for unit testing and visual regression testing:

### Unit Tests
Run standard unit tests (Vitest + React Testing Library):
```shell
npm run test
```

### Visual Regression Tests
Run visual tests using Playwright:
```shell
npm run test:visual
```
*(Note: You may need to install Playwright dependencies first using `npx playwright install`)*
