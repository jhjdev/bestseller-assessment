<template>
  <div class="search-results-page">
    <div class="container">
      <div class="search-header">
        <h1 class="search-title">Search Results</h1>
        <div class="search-query">
          <span v-if="searchQuery">Results for: <strong>"{{ searchQuery }}"</strong></span>
          <span v-else>Enter a search term to find products</span>
        </div>
      </div>

      <div v-if="searchResults.length > 0" class="product-listing">
        <div class="product-grid">
          <ProductCard 
            v-for="product in searchResults" 
            :key="product.id" 
            :product="product" 
          />
        </div>
      </div>
      
      <div v-else-if="searchQuery" class="no-results">
        <p>No products found matching "{{ searchQuery }}".</p>
        <p>Try a different search term or browse our categories.</p>
        <NuxtLink to="/" class="back-link">Back to Home</NuxtLink>
      </div>
      
      <div v-else class="no-query">
        <p>Enter a search term in the search bar above to find products.</p>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useProductStore } from '~/stores/product';
import { computed } from 'vue';

const productStore = useProductStore();

// Get the search query from the store
const searchQuery = computed(() => productStore.searchQuery);

// Get search results
const searchResults = computed(() => productStore.searchResults);

// Set page metadata
useHead({
  title: `Search Results - Fashion Store`,
  meta: [
    { name: 'description', content: `Search results for products at Fashion Store.` }
  ]
});
</script>

<!-- Search page now uses global CSS classes -->
<!-- All styles are moved to assets/css/pages/search.css -->
