# CSS Organization Guide

## Overview

This Vue.js project has been refactored to use a well-organized CSS structure instead of scattered inline styles and scoped component styles. The CSS is now organized into logical, maintainable files.

## File Structure

```
assets/css/
├── main.css                    # Global variables, reset, utilities
├── global.css                  # Shared component patterns
├── layout.css                  # Layout and structure styles
├── components/
│   ├── header.css             # Header component styles
│   ├── footer.css             # Footer component styles
│   ├── sidebar.css            # Sidebar & CategoryTree styles
│   ├── product-card.css       # ProductCard component styles
│   └── promotional-spot.css   # PromotionalSpot component styles
└── pages/
    ├── home.css               # Home page specific styles
    ├── product-detail.css     # Product detail page styles
    ├── category.css           # Category page styles
    ├── search.css             # Search results page styles
    └── coming-soon.css        # FAQ, Contact, Privacy, Shipping pages
```

## CSS Files Explained

### 1. `main.css` - Foundation

- CSS custom properties (variables)
- Global reset and base styles
- Container and grid system
- Button and form styles
- Utility classes
- Responsive breakpoints

### 2. `global.css` - Shared Patterns

- Reusable component patterns (cards, grids, sections)
- Common UI patterns (dropdowns, forms, navigation)
- Status indicators and feedback styles
- Responsive utilities
- Aspect ratio utilities

### 3. Component Files

Each component has its own CSS file containing:

- Component-specific styles
- Component states and variations
- Responsive behavior for that component

### 4. Page Files

Page-specific styles for layouts and patterns unique to specific pages:

- Hero sections
- Page-specific grids
- Custom layouts

## Benefits of This Organization

### ✅ **Maintainability**

- Styles are organized by component/purpose
- Easy to locate and modify specific styles
- Clear separation of concerns

### ✅ **Reusability**

- Common patterns in `global.css` can be reused
- Consistent naming conventions
- Modular approach reduces duplication

### ✅ **Performance**

- CSS is loaded once globally
- No runtime style injection
- Better caching and optimization

### ✅ **Scalability**

- Easy to add new components without style conflicts
- Clear conventions for new team members
- Consistent architecture as project grows

## CSS Class Naming Conventions

### Component Classes

- Use descriptive, semantic names: `.product-card`, `.hero-section`
- Include component context: `.footer-content`, `.nav-list`

### State Classes

- Use modifiers: `.active`, `.disabled`, `.selected`
- Combine with components: `.thumbnail.active`

### Utility Classes

- Keep utility classes in `main.css`
- Use consistent naming: `.text-center`, `.mb-2`, `.d-flex`

## How to Add New Styles

### For New Components

1. Create a new file in `assets/css/components/`
2. Add the file to `nuxt.config.ts` CSS array
3. Use semantic class names
4. Include responsive behavior

### For New Pages

1. Create a new file in `assets/css/pages/`
2. Add the file to `nuxt.config.ts` CSS array
3. Focus on page-specific layouts and patterns

### For Shared Patterns

- Add reusable patterns to `global.css`
- Consider if it belongs in a component file instead
- Follow existing naming conventions

## Migration Benefits

### Before (Problems with Inline/Scoped Styles)

- ❌ Styles scattered across many component files
- ❌ Difficult to maintain consistent design
- ❌ Code duplication
- ❌ Hard to implement design system changes
- ❌ Runtime style injection overhead

### After (Organized CSS Structure)

- ✅ Centralized, organized CSS files
- ✅ Easy to maintain and update
- ✅ Consistent design patterns
- ✅ Better performance
- ✅ Easier collaboration
- ✅ Clear architecture

## CSS Variables Usage

All colors, spacing, and other design tokens are defined in `main.css`:

```css
/* Use variables for consistency */
color: var(--primary-color);
margin: var(--spacing-md);
border-radius: var(--border-radius-sm);
```

## Responsive Design

All responsive behavior is handled through CSS media queries:

- Mobile-first approach
- Consistent breakpoints across all files
- Component-specific responsive behavior

## Best Practices

1. **Use semantic class names** - `.product-grid` not `.grid-3-cols`
2. **Keep specificity low** - Avoid deep nesting
3. **Use CSS variables** - For consistency and theme support
4. **Group related styles** - Component variants together
5. **Document complex patterns** - Add comments for clarity
6. **Test responsive behavior** - Ensure all breakpoints work
7. **Follow naming conventions** - Consistent across all files

This organization makes the project much more maintainable and follows modern CSS architecture best practices!
