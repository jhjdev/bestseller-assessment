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

<style scoped>
.search-header {
  margin-bottom: 30px;
}

.search-title {
  font-size: 2rem;
  font-weight: 600;
  margin-bottom: 10px;
}

.search-query {
  font-size: 1.1rem;
  color: var(--secondary-color);
  margin-bottom: 20px;
}

.product-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  gap: 20px;
}

.no-results, .no-query {
  text-align: center;
  padding: 50px 0;
  color: var(--secondary-color);
}

.back-link {
  display: inline-block;
  margin-top: 20px;
  padding: 10px 20px;
  background-color: var(--primary-color);
  color: white;
  border-radius: 4px;
  text-decoration: none;
  transition: background-color 0.3s ease;
}

.back-link:hover {
  background-color: var(--accent-color);
}
</style>