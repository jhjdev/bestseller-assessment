import { defineStore } from 'pinia';
import data from '~/data.json'; // Importing data.json
import type { Product, Category, PromotionalSpot } from '~/types';

export const useProductStore = defineStore('product', {
  state: () => ({
    products: (data.products || []) as Product[], // Load products from data.json
    categories: data.categories as { 
      id: string;
      parent_category_id: string;
      level: number;
      name: { en: string; dk: string };
      categories: Category[];
    }, // Load categories structure from data.json
    selectedCategoryId: null as string | null,
    promotionalSpots: (data.promotionalSpots || []) as PromotionalSpot[], // Load promotional spots from data.json
    searchQuery: '' as string,
  }),
  getters: {
    filteredProducts: (state): Product[] => {
      if (!state.selectedCategoryId) return state.products;
      
      // Filter products that belong to the selected category
      return state.products.filter(product => 
        product.categories && product.categories.includes(state.selectedCategoryId as string)
      );
    },
    searchResults: (state): Product[] => {
      if (!state.searchQuery.trim()) return [];
      
      const query = state.searchQuery.toLowerCase().trim();
      
      // First, find all category IDs that match the search query
      const matchingCategoryIds = new Set<string>();
      
      const findMatchingCategories = (categories: Category[] | undefined) => {
        if (!categories) return;
        
        for (const category of categories) {
          // Check if category name matches search query
          if (category.name?.en?.toLowerCase().includes(query) || 
              category.name?.dk?.toLowerCase().includes(query)) {
            matchingCategoryIds.add(category.id);
          }
          
          // Recursively check subcategories
          if (category.categories) {
            findMatchingCategories(category.categories);
          }
        }
      };
      
      // Start searching from the root categories
      findMatchingCategories(state.categories.categories);
      
      // Now filter products that either match directly or belong to matching categories
      return state.products.filter(product => {
        // Search in product name
        if (product.name?.en?.toLowerCase().includes(query)) return true;
        
        // Search in product brand
        if (product.brand?.toLowerCase().includes(query)) return true;
        
        // Search in product color
        if (product.color?.toLowerCase().includes(query)) return true;
        
        // Search in product size (if any size matches)
        if (product.size && product.size.some(size => 
          String(size).toLowerCase().includes(query)
        )) return true;
        
        // Check if product belongs to any matching category
        if (product.categories && product.categories.some(catId => matchingCategoryIds.has(catId))) {
          return true;
        }
        
        return false;
      });
    },
    allCategories: (state): Category[] => {
      return state.categories.categories || [];
    }
  },
  actions: {
    getProductById(id: number): Product | undefined {
      return this.products.find((product) => product.id === id);
    },
    getCategoryById(id: string): Category | null {
      // Helper function to search for a category in the nested structure
      const findCategory = (categories: Category[] | undefined): Category | null => {
        if (!categories) return null;
        
        for (const category of categories) {
          if (category.id === id) {
            return category;
          }
          
          if (category.categories) {
            const found = findCategory(category.categories);
            if (found) return found;
          }
        }
        
        return null;
      };
      
      return findCategory(this.categories.categories);
    },
    setSelectedCategory(categoryId: string | null): void {
      this.selectedCategoryId = categoryId;
    },
    getAllCategories(): Category[] {
      console.log('Getting all categories:', this.allCategories);
      return this.allCategories;
    },
    getMainCategories(): Category[] {
      // Get the top-level categories directly from the root categories array
      const mainCategories = this.categories.categories || [];
      console.log('Main categories:', mainCategories);
      return mainCategories;
    },
    setSearchQuery(query: string): void {
      this.searchQuery = query;
    },
    clearSearch(): void {
      this.searchQuery = '';
    }
  },
});