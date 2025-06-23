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

<style scoped>
.category-list {
  list-style: none;
}

.category-item {
  margin-bottom: 5px;
}

.category-link {
  display: block;
  padding: 5px 0;
  color: var(--dark-color);
  transition: color 0.3s ease;
  font-weight: 500;
}

.category-link:hover {
  color: var(--accent-color);
}

.subcategories {
  margin-left: 15px;
}

.subcategory-list {
  list-style: none;
}

.subcategory-item {
  margin-top: 2px;
}
</style>