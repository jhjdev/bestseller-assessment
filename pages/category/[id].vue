<template>
  <div class="category-page">
    <div class="container">
      <div class="category-header">
        <h1 class="category-title">{{ categoryName }}</h1>
        <div class="breadcrumbs">
          <NuxtLink to="/">Home</NuxtLink>
          <span class="breadcrumb-separator">/</span>
          <span>{{ categoryName }}</span>
        </div>
      </div>

      <div v-if="products.length > 0" class="product-listing">
        <div class="product-grid">
          <template v-for="(item, index) in productGridItems" :key="item.id || `promo-${index}`">
            <ProductCard v-if="item.type === 'product'" :product="item.data" />
            <PromotionalSpot v-else-if="item.type === 'promo'" :spot="item.data" />
          </template>
        </div>
      </div>
      
      <div v-else class="no-products">
        <p>No products found in this category.</p>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useProductStore } from '~/stores/product';
import type { Product, PromotionalSpot } from '~/types';

const route = useRoute();
const productStore = useProductStore();
const categoryId = computed(() => route.params.id as string);

// Set the selected category in the store
productStore.setSelectedCategory(categoryId.value);

// Get the category details
const category = computed(() => {
  return productStore.getCategoryById(categoryId.value);
});

// Get the category name
const categoryName = computed(() => {
  return category.value?.name.en || 'Category';
});

// Get products for this category
const products = computed(() => {
  return productStore.filteredProducts;
});

// Combine products and promotional spots for the grid
const productGridItems = computed(() => {
  const items = [];
  const promoSpots = productStore.promotionalSpots;
  
  // Add products and promotional spots to the grid
  products.value.forEach((product, index) => {
    // Add the product
    items.push({
      type: 'product',
      data: product,
      id: product.id
    });
    
    // Check if we need to insert a promotional spot after this product
    const promoSpot = promoSpots.find(spot => spot.position === index + 1);
    if (promoSpot) {
      items.push({
        type: 'promo',
        data: promoSpot
      });
    }
  });
  
  return items;
});

// Set page metadata
useHead({
  title: `${categoryName.value} - Fashion Store`,
  meta: [
    { name: 'description', content: `Shop our collection of ${categoryName.value} at Fashion Store.` }
  ]
});
</script>

<!-- Category page now uses global CSS classes -->
<!-- All styles are moved to assets/css/pages/category.css -->
