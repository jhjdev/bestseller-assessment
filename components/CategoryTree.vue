<template>
  <div class="category-tree">
    <ul class="category-list">
      <li v-if="category.id !== 'root'" class="category-item">
        <NuxtLink :to="`/category/${category.id || 'unknown'}`" class="category-link">
          {{ category.name?.en || 'Unnamed Category' }}
        </NuxtLink>
      </li>
      <li v-if="category.categories && category.categories.length > 0" class="subcategories">
        <ul class="subcategory-list">
          <li v-for="subCategory in category.categories" :key="subCategory.id" class="subcategory-item">
            <CategoryTree :category="subCategory" />
          </li>
        </ul>
      </li>
    </ul>
  </div>
</template>

<script setup lang="ts">
import type { Category } from '~/types';

const props = defineProps<{
  category: Category;
}>();

// Debugging to ensure proper data is passed
console.log('CategoryTree received category:', props.category);
</script>

<!-- CategoryTree component now uses global CSS classes -->
<!-- All styles are moved to assets/css/components/sidebar.css -->
