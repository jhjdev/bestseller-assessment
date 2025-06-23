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

<!-- Sidebar component now uses global CSS classes -->
<!-- All styles are moved to assets/css/components/sidebar.css -->
