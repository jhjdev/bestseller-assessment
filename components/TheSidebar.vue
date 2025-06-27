<template>
  <aside class="sidebar">
    <h2 class="sidebar-title">Categories</h2>
    <div v-if="productStore.isLoading" class="loading">Loading categories...</div>
    <div v-else>
      <!-- Check if rootCategory exists and has subcategories -->
      <div v-if="!rootCategory" class="error">No categories found</div>
      <CategoryTree v-else-if="rootCategory" :category="rootCategory" />
    </div>
  </aside>
</template>

<script setup>
import { computed, onMounted } from 'vue';
import { useProductStore } from '~/stores/products';

const productStore = useProductStore();

// Create a root category that contains all main categories
const rootCategory = computed(() => {
  if (Object.keys(productStore.categories).length === 0) return null;

  // Check if root category exists
  if (productStore.categories['root']) {
    return productStore.categories['root'];
  }

  // If no root category exists, create one with main categories
  const mainCategories = productStore.getMainCategories;

  return {
    id: 'root',
    name: {
      en: 'Categories',
      dk: 'Kategorier',
    },
    level: 0,
    categories: mainCategories,
  };
});

// Ensure data is available on client-side
onMounted(async () => {
  await productStore.ensureHydrated();
});
</script>
