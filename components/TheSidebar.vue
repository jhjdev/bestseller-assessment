<template>
  <aside class="sidebar">
    <div class="sidebar-content">
      <h3 class="sidebar-title">Categories</h3>
      <CategoryTree :category="rootCategory" />
    </div>
  </aside>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { useProductStore } from '~/stores/product';
import type { Category } from '~/types';

const productStore = useProductStore();

// Correctly set rootCategory to the root category object from data.json
const rootCategory = computed(() => {
  // Return the full categories object which already has the structure we need
  return productStore.categories;
});
</script>

<style scoped>
.sidebar {
  width: 250px;
  background-color: white;
  border-right: 1px solid var(--border-color);
  padding: 20px;
  height: 100%;
}

.sidebar-title {
  font-size: 1.2rem;
  margin-bottom: 15px;
  padding-bottom: 10px;
  border-bottom: 1px solid var(--border-color);
}

@media (max-width: 768px) {
  .sidebar {
    width: 100%;
    border-right: none;
    border-bottom: 1px solid var(--border-color);
  }
}
</style>