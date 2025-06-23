# Fashion Store

A modern e-commerce fashion store built with Vue 3 and Nuxt, featuring server-side rendering.

## Features

- **Server-Side Rendered (SSR)** - Built with Nuxt.js for optimal performance and SEO
- **Product Listing Page (PLP)** - Displays products with filtering by category
- **Product Detail Page (PDP)** - Shows detailed product information, variants, and images
- **Responsive Design** - Works on desktop, tablet, and mobile devices
- **Category Navigation** - Main menu and sidebar navigation using nested categories
- **Promotional Spots** - Dynamic promotional content integrated into product listings
- **State Management** - Using Pinia for efficient state management
- **TypeScript** - Type-safe code for better developer experience
- **Testing** - Unit tests with Vitest and Vue Test Utils

## Project Structure

```
/
├── assets/             # Static assets like CSS
├── components/         # Vue components
├── composables/        # Reusable Vue composition functions
├── layouts/            # Page layouts
├── pages/              # Application pages and routes
├── public/             # Public static assets
├── server/             # Server-side code
├── stores/             # Pinia stores
├── tests/              # Test files
├── types/              # TypeScript type definitions
├── data.json           # Mock product and category data
├── nuxt.config.ts      # Nuxt configuration
├── package.json        # Project dependencies and scripts
└── tsconfig.json       # TypeScript configuration
```

## Getting Started

### Prerequisites

- Node.js (v16 or later)
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone https://github.com/yourusername/bestseller-assessment.git
cd bestseller-assessment
```

2. Install dependencies:
```bash
npm install
# or
yarn install
```

3. Run the development server:
```bash
npm run dev
# or
yarn dev
```

4. Open your browser and navigate to `http://localhost:3000`

### Building for Production

```bash
npm run build
# or
yarn build
```

### Starting the Production Server

```bash
npm run start
# or
yarn start
```

### Running Tests

```bash
npm run test
# or
yarn test
```

## Implementation Details

### Product Listing Page (PLP)

- Displays products in a responsive grid layout
- Filters products by category
- Includes promotional spots based on position
- Shows product information including brand, name, price, and color options

### Product Detail Page (PDP)

- Shows detailed product information
- Image gallery with thumbnails
- Color and size variant selection
- Stock availability information
- Add to cart functionality

### Navigation

- Main menu in the header showing top-level categories
- Sidebar navigation showing the full category tree
- Breadcrumb navigation for easy browsing

### State Management

- Pinia store for managing product and category data
- Computed properties for filtering and sorting products
- Actions for updating the application state

## Future Improvements

- Add a shopping cart and checkout process
- Implement user authentication
- Connect to a real backend API instead of using mock data
- Add more advanced filtering and sorting options
- Implement wishlist functionality
- Add product reviews and ratings