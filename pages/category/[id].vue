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
import { computed } from 'vue';
// Remove incorrect imports - Nuxt auto-imports these
// import { useRoute, useHead } from 'vue-router';
import { useProductStore } from '~/stores/products';
import type { Product, PromotionalSpot } from '~/types';

const route = useRoute(); // Let Nuxt auto-import handle this
const productStore = useProductStore();
const categoryId = computed(() => route.params.id as string);

// Filter products by category ID
const products = computed(() => {
  return productStore.products.filter(
    (product: Product) => product.categories && product.categories.includes(categoryId.value)
  );
});

// Get the category details
const category = computed(() => {
  return productStore.getCategoryById(categoryId.value);
});

// Get the category name
const categoryName = computed(() => {
  return productStore.getCategoryName(categoryId.value);
});

// Combine products and promotional spots for the grid
const productGridItems = computed(() => {
  const items: any[] = [];
  const promoSpots = productStore.promotionalSpots || [];

  // Add products and promotional spots to the grid
  products.value.forEach((product: Product, index: number) => {
    // Add the product
    items.push({
      type: 'product',
      data: product,
      id: product.id,
    });

    // Check if we need to insert a promotional spot after this product
    const promoSpot = promoSpots.find((spot: PromotionalSpot) => spot.position === index + 1);
    if (promoSpot) {
      items.push({
        type: 'promo',
        data: promoSpot,
      });
    }
  });

  return items;
});

// Set page metadata
useHead({
  // Let Nuxt auto-import handle this
  title: `${categoryName.value} - Fashion Store`,
  meta: [
    {
      name: 'description',
      content: `Shop our collection of ${categoryName.value} at Fashion Store.`,
    },
  ],
});
</script>
