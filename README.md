# Recip-O-Matic

Recip-O-Matic is a small front-end application designed to help users discover and manage recipes. Users can search for recipes by ingredients or keywords, view a list of matching recipes, see detailed information for a specific recipe, and save their favorite recipes to a local list for easy access.

## Features

- **Recipe Search:** Search for recipes by entering ingredients or keywords.
- **Recipe Listing:** View a list of matching recipes with basic details (name, short description, image).
- **Detailed Recipe View:** Click on a recipe to view detailed information, including ingredients, instructions, and preparation time (where available).
- **Favorite Recipes:** Save favorite recipes to a local list (stored in browser `localStorage`) for easy access.
- **Responsive Design:** Works well on both desktop and mobile devices.
- **Homepage Suggestions:** Displays a set of suggested recipe suggestions on the initial load of the homepage.

## Tech Stack & Libraries

- **Framework:** [Next.js](https://nextjs.org/) (with App Router) - A React framework for building full-stack web applications.
- **Language:** [TypeScript](https://www.typescriptlang.org/) - For static typing and improved developer experience.
- **Styling:** [Tailwind CSS](https://tailwindcss.com/) - A utility-first CSS framework for rapid UI development.
- **State Management:**
  - React Hooks (`useState`, `useEffect`, `useContext`, `useCallback`).
  - Custom React Hook (`useLocalStorage`) for persisting data (favorites) in the browser's local storage.
  - React Context API (`FavoritesContext`) for managing and providing access to favorite recipes globally.
- **Icons:** [Lucide React](https://lucide.dev/) - A simply beautiful and consistent icon toolkit.
- **Linting/Formatting:** ESLint & Prettier (typically configured by `create-next-app`).
- **Testing:**
  - [Jest](https://jestjs.io/) - JavaScript testing framework.
  - [React Testing Library](https://testing-library.com/docs/react-testing-library/intro/) - For testing React components in a user-centric way.

This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
