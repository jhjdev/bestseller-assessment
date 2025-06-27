import { useProductStore } from '~/stores/products';
import type { Product, Category } from '~/types';

export const useProducts = () => {
  const store = useProductStore();

  // Reactive state
  const products = computed(() => store.products);
  const categories = computed(() => store.categories);
  const isLoading = computed(() => store.isLoading);
  const isHydrated = computed(() => store.isHydrated);
  const dataSource = computed(() => store.dataSource);

  // Ensure data is loaded
  const ensureData = async () => {
    await store.ensureHydrated();
  };

  // Force refresh data
  const refreshData = async () => {
    await store.fetchData(true);
  };

  // Product methods
  const getProductById = (id: string | number): Product | undefined => {
    return store.getProductById(id);
  };

  // Category methods
  const getCategoryById = (id: string): Category | undefined => {
    return store.getCategoryById(id);
  };

  const getCategoryName = (id: string): string => {
    return store.getCategoryName(id);
  };

  const getMainCategories = computed(() => store.getMainCategories);

  // Search and filtering
  const searchProducts = (query: string) => {
    store.setSearchQuery(query);
  };

  const filterByCategory = (categoryId: string) => {
    store.setSelectedCategory(categoryId);
  };

  const filteredProducts = computed(() => store.filteredProducts);
  const searchResults = computed(() => store.searchResults);

  // Clear filters
  const clearFilters = () => {
    store.setSearchQuery('');
    store.setSelectedCategory('');
  };

  return {
    // State
    products,
    categories,
    isLoading,
    isHydrated,
    dataSource,

    // Actions
    ensureData,
    refreshData,

    // Product methods
    getProductById,

    // Category methods
    getCategoryById,
    getCategoryName,
    getMainCategories,

    // Search and filtering
    searchProducts,
    filterByCategory,
    filteredProducts,
    searchResults,
    clearFilters,
  };
};
