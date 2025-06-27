# Fashion Store

A modern, production-ready e-commerce fashion store built with Vue 3 and Nuxt, featuring server-side rendering, MongoDB integration, and elegant animations.

## ✨ Key Features

### 🚀 **Advanced SSR & Performance**

- **Full Server-Side Rendering** - Optimized Nuxt.js implementation with proper hydration
- **Smart Caching** - 5-minute API cache with stale-while-revalidate for optimal performance
- **Route-based Caching** - Different cache strategies for pages, products, and API endpoints
- **Loading States** - Elegant Suspense-based loading with custom spinners
- **Error Boundaries** - Graceful error handling with retry functionality

### 🗄️ **MongoDB Integration with Fallback**

- **Hosted MongoDB** - Primary data source with automatic connection handling
- **Smart Fallback System** - Seamlessly falls back to local JSON when MongoDB is unavailable
- **Data Seeding** - Automated MongoDB seeding from JSON data
- **Category Management** - Efficient nested category storage and retrieval
- **Real-time Status** - Application shows current data source (MongoDB/Local)

### 🎨 **Premium UI/UX**

- **Sophisticated Animations** - Professional hover effects throughout the interface
- **Entrance Animations** - Staggered element animations for engaging page loads
- **Shimmer Effects** - Modern loading states and interactive feedback
- **Responsive Design** - Seamless experience across all devices
- **Typography & Spacing** - Carefully crafted design system

### 🛍️ **E-commerce Features**

- **Product Listing Page (PLP)** - Advanced filtering and category navigation
- **Product Detail Page (PDP)** - Detailed product views with variant selection
- **Category Navigation** - Multi-level nested category browsing
- **Search Functionality** - Real-time product search with autocomplete
- **Promotional Spots** - Dynamic promotional content integration

## 🔧 **Developer Experience**

- **TypeScript** - Strict type safety throughout the application
- **Modern State Management** - Pinia with SSR-optimized hydration
- **Composables** - Reusable Vue 3 composition functions
- **Testing Suite** - Comprehensive unit tests with Vitest
- **Clean Architecture** - Well-organized, maintainable codebase
- **GitHub Actions CI/CD** - Automated testing, linting, and deployment
- **Code Quality** - ESLint and Prettier for consistent code style
- **Automated Dependencies** - Dependabot for security updates

## 📁 Project Structure

```
/
├── assets/
│   └── css/            # Organized CSS with component-specific styles
├── components/         # Reusable Vue components
│   ├── ErrorBoundary.vue   # Error handling component
│   ├── CategoryTree.vue    # Nested category navigation
│   └── ProductCard.vue     # Product display component
├── composables/        # Vue 3 composition functions
│   ├── useProducts.ts      # Product state management
│   └── useImagePlaceholder.ts
├── data/               # Data files
│   └── data.json           # Fallback JSON data
├── layouts/            # Application layouts with Suspense
├── pages/              # File-based routing
├── plugins/            # Nuxt plugins
│   └── init-store.ts       # SSR store initialization
├── scripts/            # Utility scripts
│   └── seed.ts             # MongoDB seeding script
├── server/
│   └── api/
│       └── data.ts         # API with MongoDB integration
├── stores/             # Pinia state management
│   └── products.ts         # Product store with SSR support
├── tests/              # Unit tests
├── types/              # TypeScript definitions
├── .env.example        # Environment variables template
├── nuxt.config.ts      # Nuxt configuration with SSR optimizations
└── package.json        # Dependencies and scripts
```

## 🚀 Getting Started

### Prerequisites

- **Node.js** (v18 or later)
- **npm** or **yarn**
- **MongoDB** (optional - hosted instance or local)

### Installation

1. **Clone the repository:**

```bash
git clone https://github.com/yourusername/bestseller-assessment.git
cd bestseller-assessment
```

2. **Install dependencies:**

```bash
npm install
```

3. **Environment Setup (Optional - MongoDB):**

```bash
# Copy environment template
cp .env.example .env

# Edit .env and add your MongoDB credentials:
# MONGODB_URI=your_mongodb_connection_string_heredatabase
# MONGODB_DB_NAME=your_database_name
```

4. **Seed MongoDB (Optional):**

```bash
# If you have MongoDB configured
npm run seed
```

5. **Start the development server:**

```bash
npm run dev
```

6. **Open your browser and navigate to `http://localhost:4000`**

> 💡 **Note:** The application runs on port 4000 and automatically falls back to local JSON data if MongoDB is not configured.

### 🏗️ Building for Production

```bash
npm run build
```

### 🚀 Starting the Production Server

```bash
npm run start
```

### 🧪 Running Tests

```bash
# Run all tests
npm run test

# Run tests in watch mode
npm run test:watch

# Generate coverage report
npm run test:coverage
```

### 📊 Available Scripts

- `npm run dev` - Start development server with optimizations
- `npm run build` - Build for production
- `npm run generate` - Generate static site
- `npm run preview` - Preview production build
- `npm run seed` - Seed MongoDB with sample data
- `npm run start` - Start production server
- `npm run lint` - Run ESLint code quality checks
- `npm run format` - Format code with Prettier
- `npm run format:check` - Check code formatting
- `npm run ci` - Run full CI pipeline (lint + format + test)

## 🏗️ Architecture & Implementation

### 🗄️ Data Management

#### **MongoDB Integration**

- **Primary Data Source:** Hosted MongoDB for production-ready data storage
- **Automatic Fallback:** Seamlessly switches to local JSON when MongoDB is unavailable
- **Efficient Seeding:** Automated data migration from JSON to MongoDB
- **Optimized Queries:** Structured for fast category and product retrieval

#### **Smart Caching System**

- **API Caching:** 5-minute server-side cache with automatic invalidation
- **Browser Caching:** Optimized cache headers for different content types
- **Stale-While-Revalidate:** Serves cached content while updating in background

### 🔄 SSR Implementation

#### **Server-Side Rendering**

- **Full SSR:** Complete page rendering on the server for optimal SEO
- **Smart Hydration:** Client-side hydration only when necessary
- **State Persistence:** Seamless state transfer from server to client
- **Error Boundaries:** Graceful handling of SSR failures

#### **Performance Optimizations**

- **Route-based Caching:** Different cache strategies per route type
- **Code Splitting:** Automatic component-level code splitting
- **Asset Optimization:** Compressed images and minified assets
- **Lazy Loading:** Components and images loaded on demand

## 💻 Technical Features

### 🛍️ **Product Listing Page (PLP)**

- **Advanced Grid Layout** - Responsive product grid with optimal spacing
- **Smart Filtering** - Real-time category-based product filtering
- **Promotional Integration** - Dynamic promotional spots with position-based rendering
- **Rich Product Cards** - Brand, name, price, variants, and color options
- **Loading States** - Skeleton loaders and smooth transitions

### 📦 **Product Detail Page (PDP)**

- **Detailed Product Views** - Comprehensive product information display
- **Interactive Image Gallery** - Thumbnail navigation with zoom capabilities
- **Variant Management** - Color, size, and stock availability tracking
- **Dynamic Pricing** - Real-time price updates based on variants
- **Stock Indicators** - Live inventory status with visual feedback

### 🧭 **Navigation System**

- **Multi-level Categories** - Nested category tree with infinite depth support
- **Animated Header** - Professional hover effects and entrance animations
- **Smart Breadcrumbs** - Dynamic breadcrumb generation for easy navigation
- **Search Integration** - Real-time search with category filtering
- **Mobile Optimized** - Responsive navigation for all screen sizes

### ⚡ **State Management**

- **SSR-Optimized Pinia** - Server-side state initialization and client hydration
- **Smart Caching** - Prevents unnecessary data refetching
- **Reactive Filtering** - Real-time product filtering and search
- **Error Recovery** - Automatic retry mechanisms for failed requests
- **Type Safety** - Full TypeScript integration for reliable state management

## 🚀 **CI/CD Pipeline**

### **GitHub Actions Workflows**

#### **Main CI Pipeline** (`.github/workflows/ci.yml`)

- **🔍 Code Quality** - ESLint linting and Prettier formatting checks
- **🧪 Testing** - Unit tests with coverage reporting on Node.js 18 & 20
- **🏗️ Build Verification** - Production build testing
- **🔒 Security Scanning** - npm audit and CodeQL analysis
- **🗄️ Database Testing** - MongoDB integration tests (when configured)
- **🚀 Preview Deployments** - Automatic Netlify previews for PRs
- **🌟 Production Deployment** - Automatic deployment on main branch

#### **Dependency Management** (`.github/workflows/dependabot.yml`)

- **🤖 Automated Updates** - Weekly dependency updates
- **🧪 Auto-merge** - Safe auto-merging after tests pass
- **📦 Grouped Updates** - Development and production dependencies grouped separately

#### **Quality Gates**

- All PRs must pass linting, formatting, and tests
- Code quality checks with TypeScript strict mode
- Security vulnerability scanning
- Automated preview deployments for testing

### **Secrets Configuration**

For full CI/CD functionality, configure these repository secrets:

```bash
# MongoDB (optional)
MONGODB_URI=mongodb_connection_string
MONGODB_DB_NAME=bestseller

# Deployment (optional)
NETLIFY_AUTH_TOKEN=your_token
NETLIFY_SITE_ID=your_site_id

# Code Coverage (optional)
CODECOV_TOKEN=your_token
```

### **Branch Protection**

Recommended branch protection rules for `main`:

- Require pull request reviews
- Require status checks (CI pipeline)
- Require up-to-date branches
- Restrict pushes to main

## 🔮 Future Enhancements

### 🛒 **E-commerce Features**

- Shopping cart with persistent storage
- Multi-step checkout process
- Payment gateway integration
- Order management system
- Wishlist and favorites functionality

### 👤 **User Management**

- User authentication and authorization
- Customer profiles and order history
- Social login integration
- Guest checkout options

### 📈 **Advanced Features**

- Product reviews and ratings system
- Advanced search with filters (price, brand, size, etc.)
- Product recommendations engine
- Inventory management dashboard
- Analytics and reporting
- Multi-language support
- Currency conversion

### 🔧 **Technical Improvements**

- Redis caching for better performance
- Elasticsearch integration for advanced search
- CDN integration for global asset delivery
- Monitoring and logging improvements
- A/B testing framework

## 🤝 Contributing

We welcome contributions! Please follow these steps:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the ISC License.

## 🙏 Acknowledgments

- Built with Vue 3 and Nuxt.js
- Styled with modern CSS animations
- Powered by MongoDB and TypeScript
- Tested with Vitest and Vue Test Utils

---

**Made with ❤️ for modern e-commerce experiences**
