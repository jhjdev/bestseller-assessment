// Fix the import statement
import { defineNuxtPlugin } from 'nuxt/app';
import { useProductStore } from '~/stores/products';

export default defineNuxtPlugin(async (nuxtApp) => {
  // Only run on server-side during SSR to avoid double fetching
  if (import.meta.server) {
    const productStore = useProductStore();

    try {
      // Fetch data on server-side for SSR
      await productStore.fetchData();

      // Log basic info about successful data loading
      if (process.env.NODE_ENV === 'development') {
        console.log(
          `SSR: Store initialized with ${Object.keys(productStore.categories).length} categories, ${productStore.products.length} products from ${productStore.dataSource}`
        );
      }
    } catch (error) {
      console.error('Failed to initialize store during SSR:', error);
      // Don't throw - allow the app to continue with client-side fallback
    }
  }
});
