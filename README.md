# Restaurant Website (Next.js 14)

A modern, responsive restaurant website built with Next.js 14, TypeScript, Tailwind CSS, and shadcn/ui. It features a browsable menu with categories, an accessible shopping cart and favorites system, a responsive header/navbar, and a lightweight in-page chatbot assistant.

## Features

- **Responsive UI**: Mobile-first layout with adaptive navigation and content.
- **Menu browsing**: Category pages with item cards, ratings, tags, and details dialog.
- **Cart & Favorites**: Client-side state via React Contexts with a cart drawer and favorites drawer.
- **Chatbot**: Floating chat widget to assist users (toggle button at bottom-right).
- **Dark mode**: One-click theme switch using `next-themes`.
- **Performance**: Optimized images with `next/image`, minimal animations, and modern UI components.

## Tech Stack

- **Framework**: Next.js 14 (App Router) + TypeScript
- **UI**: Tailwind CSS, shadcn/ui, Radix UI, lucide-react icons
- **State**: React Context for cart and favorites
- **Tooling**: PostCSS, Tailwind v4, ESLint (via Next), Vercel Analytics (optional)

## Getting Started

Prerequisites:

- Node.js 18+
- npm or pnpm

Install dependencies:

```bash
# with npm
npm install

# or with pnpm
pnpm install
```

Run the development server:

```bash
# with npm
npm run dev

# or with pnpm
pnpm dev
```

Then open http://localhost:3000 in your browser.

Build for production:

```bash
npm run build
npm run start
```

## Scripts

- `dev`: Start the Next.js dev server (with Turbo)
- `build`: Build the app
- `start`: Start the production server
- `lint`: Run Next.js lint (with Turbo)

## Project Structure

```
app/
  page.tsx                # Home page
  about/                  # About page
  contact/                # Contact page
  checkout/               # Checkout page
components/
  header.tsx              # Sticky navbar with theme toggle, cart, favorites
  cart-drawer.tsx         # Shopping cart drawer
  favorites-drawer.tsx    # Favorites drawer
  category/
    ItemCard.tsx          # Menu item card (responsive, details CTA)
    ItemDetailsDialog.tsx # Item details modal/dialog
    CategoryHero.tsx      # Category hero section
    CategoryFilters.tsx   # Filters for category pages
  ui/                     # shadcn/ui primitives
contexts/
  cart-context.tsx        # Cart state and actions
  favorites-context.tsx   # Favorites state and actions
lib/
  menu-data.ts            # Menu data and types
  utils.ts                # Utilities
public/                   # Images (logo, dishes, placeholders)
styles/
  globals.css             # Global styles
```

## Configuration Notes

- **Branding text**: The header shows a concise brand on small screens and a two-line brand on md+; adjust in `components/header.tsx`.
- **Item card details CTA**: Visible by default on small screens; hover-to-reveal on md+; see `components/category/ItemCard.tsx`.
- **Chatbot layout**: Implemented as a floating panel (bottom-right). You can convert it to a drawer or full-screen overlay by adjusting the container in `components/Chatbot.tsx`.
- **Theme**: Toggle dark/light via the sun/moon button (uses `next-themes`).

## Accessibility

- Keyboard and screen-reader friendly components via Radix and shadcn/ui.
- Prefer adding `sr-only` labels for icon-only buttons (e.g., brand name in header on small screens).

## Deployment

- Recommended: Deploy to Vercel.
- Environment variables: Not required for the base template.

## Credits

- UI components powered by shadcn/ui + Radix UI.
- Icons by lucide-react.
- Demo images from Unsplash and public assets under `public/`.
