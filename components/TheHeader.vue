<template>
  <header class="header">
    <div class="container">
      <div class="header-content">
        <div class="logo">
          <NuxtLink to="/">Fashion Store</NuxtLink>
        </div>

        <nav class="main-nav">
          <ul class="nav-list">
            <li v-for="category in mainCategories" :key="category.id" class="nav-item">
              <NuxtLink :to="`/category/${category.id}`" class="nav-link">
                {{ category?.name?.en || 'Unknown Category' }}
              </NuxtLink>
              <div v-if="category?.categories?.length" class="dropdown">
                <ul class="dropdown-list">
                  <li
                    v-for="subCategory in category.categories"
                    :key="subCategory.id"
                    class="dropdown-item"
                  >
                    <NuxtLink :to="`/category/${subCategory.id}`" class="dropdown-link">
                      {{ subCategory?.name?.en || 'Unknown Subcategory' }}
                    </NuxtLink>
                  </li>
                </ul>
              </div>
            </li>
          </ul>
        </nav>

        <div class="search-bar">
          <form @submit.prevent="performSearch">
            <input
              type="text"
              placeholder="Search products..."
              v-model="searchQuery"
              @input="handleSearchInput"
            />
            <button type="submit" class="search-button">
              <span class="search-icon">🔍</span>
            </button>
          </form>
        </div>
      </div>
    </div>
  </header>
</template>

<script setup lang="ts">
import { ref, computed, watch } from 'vue';
import { useProductStore } from '~/stores/products'; // FIXED: Use correct store path (plural)
import { useRouter } from 'vue-router';

const productStore = useProductStore();
const router = useRouter();
const searchQuery = ref('');

// Initialize search query from store if it exists
searchQuery.value = productStore.searchQuery || '';

// Watch for changes to the store's search query (for back button support)
watch(
  () => productStore.searchQuery,
  (newValue) => {
    searchQuery.value = newValue;
  }
);
// Get main categories
const mainCategories = computed(() => {
  return productStore.getMainCategories;
});

// Debounce timer for search input
let debounceTimer: NodeJS.Timeout | null = null;

const handleSearchInput = () => {
  // Clear previous timer
  if (debounceTimer) {
    clearTimeout(debounceTimer);
  }

  // Set a new timer
  debounceTimer = setTimeout(() => {
    // Update the store with the current search query
    productStore.setSearchQuery(searchQuery.value);
  }, 300); // 300ms debounce time
};

const performSearch = () => {
  // Update the store with the current search query
  productStore.setSearchQuery(searchQuery.value);

  // Navigate to the search results page
  router.push('/search');
};
</script>
