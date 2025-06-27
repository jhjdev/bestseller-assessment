import { defineStore } from 'pinia';
import type { Product, Category, PromotionalSpot } from '~/types';

export interface StoreData {
  products: Product[];
  categories: Record<string, Category>;
  promotionalSpots: PromotionalSpot[];
  searchQuery: string;
  selectedCategoryId?: string;
  dataSource?: string;
  isLoading: boolean;
  isHydrated: boolean;
  lastFetched?: number;
}

// Create the store
export const useProductStore = defineStore('products', {
  state: (): StoreData => ({
    products: [],
    categories: {},
    promotionalSpots: [],
    searchQuery: '',
    selectedCategoryId: undefined,
    dataSource: undefined,
    isLoading: false,
    isHydrated: false,
    lastFetched: undefined,
  }),

  getters: {
    getProductById: (state) => (id: string | number) => {
      return state.products.find((product: Product) => product.id === id);
    },
    getCategoryById: (state) => (id: string) => {
      return state.categories[id];
    },
    getAllCategories: (state) => {
      return Object.values(state.categories);
    },
    // Add methods that were in product.ts
    getMainCategories: (state) => {
      return Object.values(state.categories).filter((cat) => cat?.level === 1);
    },
    searchResults: (state) => {
      if (!state.searchQuery) return [];

      const query = state.searchQuery.toLowerCase();
      return state.products.filter(
        (product: Product) =>
          product.name?.en?.toLowerCase().includes(query) ||
          product.name?.dk?.toLowerCase().includes(query) ||
          product.brand?.toLowerCase().includes(query)
      );
    },
    filteredProducts: (state) => {
      if (state.searchQuery) {
        // Don't use searchResults getter, repeat the filter logic
        const query = state.searchQuery.toLowerCase();
        return state.products.filter(
          (product: Product) =>
            product.name?.en?.toLowerCase().includes(query) ||
            product.name?.dk?.toLowerCase().includes(query) ||
            product.brand?.toLowerCase().includes(query)
        );
      } else if (state.selectedCategoryId) {
        return state.products.filter(
          (product: Product) =>
            product.categories && product.categories.includes(state.selectedCategoryId || '')
        );
      }
      return state.products;
    },
    // New getter to safely access category names
    getCategoryName: (state) => (id: string) => {
      const category = state.categories[id];
      if (!category) {
        console.log(`Category with ID ${id} not found`);
        return 'Unknown Category';
      }
      if (category.name) {
        if (typeof category.name === 'object') {
          // If name is an object with language keys
          const name = category.name.en || category.name.dk;
          if (name) return name;
        } else if (typeof category.name === 'string') {
          // If name is directly a string
          return category.name;
        }
      }

      console.log(`Category with ID ${id} has invalid name structure:`, category);
      return 'Unnamed Category';
    },
  },

  actions: {
    async fetchData(force = false) {
      // Avoid refetching if data is fresh (within 5 minutes) and not forced
      const CACHE_DURATION = 5 * 60 * 1000; // 5 minutes
      if (!force && this.lastFetched && Date.now() - this.lastFetched < CACHE_DURATION) {
        return {
          products: this.products,
          categories: this.categories,
          promotionalSpots: this.promotionalSpots,
        };
      }

      this.isLoading = true;
      try {
        const data = await $fetch<{
          products: Product[];
          categories: Record<string, Category>;
          promotionalSpots: PromotionalSpot[];
          source: string;
        }>('/api/data');

        this.products = data.products;
        this.categories = data.categories;
        this.promotionalSpots = data.promotionalSpots || [];
        this.dataSource = data.source;
        this.lastFetched = Date.now();
        this.isHydrated = true;

        // Log basic info for debugging if needed
        if (process.env.NODE_ENV === 'development') {
          console.log(
            `Data loaded from: ${this.dataSource} (${Object.keys(this.categories).length} categories, ${this.products.length} products)`
          );
        }

        return data;
      } catch (error) {
        console.error('Failed to fetch data:', error);
        throw error;
      } finally {
        this.isLoading = false;
      }
    },

    // Client-side hydration method
    async ensureHydrated() {
      if (import.meta.client && !this.isHydrated) {
        await this.fetchData();
      }
    },

    // Add methods that were in product.ts
    setSearchQuery(query: string) {
      this.searchQuery = query;
    },

    setSelectedCategory(categoryId: string) {
      this.selectedCategoryId = categoryId;
    },
  },
});
