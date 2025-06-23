<template>
  <div class="product-detail-page">
    <div class="container">
      <div v-if="product" class="product-detail">
        <div class="breadcrumbs">
          <NuxtLink to="/">Home</NuxtLink>
          <span class="breadcrumb-separator">/</span>
          <NuxtLink v-if="mainCategory" :to="`/category/${mainCategory.id}`">
            {{ mainCategory.name.en }}
          </NuxtLink>
          <span v-else>Products</span>
          <span class="breadcrumb-separator">/</span>
          <span>{{ productName }}</span>
        </div>

        <div class="product-content">
          <div class="product-gallery">
            <div class="main-image">
              <img :src="selectedImage" :alt="productName" />
            </div>
            <div class="thumbnail-list">
              <div
                v-for="(image, index) in product.images"
                :key="index"
                class="thumbnail"
                :class="{ active: selectedImageIndex === index }"
                @click="selectImage(index)"
              >
                <img
                  :src="image"
                  :alt="`${productName} - Image ${index + 1}`"
                />
              </div>
            </div>
          </div>

          <div class="product-info">
            <h1 class="product-brand">{{ product.brand }}</h1>
            <h2 class="product-name">{{ productName }}</h2>
            <div class="product-price">{{ formatPrice(product.price) }}</div>

            <div class="product-variants" v-if="hasVariants">
              <div class="variant-section">
                <h3 class="variant-title">Colors</h3>
                <div class="color-options">
                  <div
                    class="color-option"
                    :class="{ active: selectedVariantIndex === -1 }"
                    @click="selectVariant(-1)"
                  >
                    <span class="color-name">{{
                      product.color || 'Default'
                    }}</span>
                  </div>
                  <div
                    v-for="(variant, index) in product.variant"
                    :key="index"
                    class="color-option"
                    :class="{ active: selectedVariantIndex === index }"
                    @click="selectVariant(index)"
                  >
                    <span class="color-name">{{
                      variant.color || 'Option'
                    }}</span>
                  </div>
                </div>
              </div>

              <div class="variant-section">
                <h3 class="variant-title">Sizes</h3>
                <div class="size-options">
                  <div
                    v-for="size in availableSizes"
                    :key="size"
                    class="size-option"
                    :class="{
                      active: selectedSize === size,
                      disabled: !isSizeAvailable(size),
                    }"
                    @click="selectSize(size)"
                  >
                    {{ size }}
                  </div>
                </div>
              </div>
            </div>

            <div class="product-actions">
              <div class="quantity-selector">
                <button
                  @click="decreaseQuantity"
                  :disabled="quantity <= 1"
                  class="quantity-btn"
                >
                  -
                </button>
                <span class="quantity">{{ quantity }}</span>
                <button @click="increaseQuantity" class="quantity-btn">
                  +
                </button>
              </div>

              <button
                class="btn btn-primary add-to-cart-btn"
                :disabled="!isInStock"
              >
                {{ isInStock ? 'Add to Cart' : 'Out of Stock' }}
              </button>
            </div>

            <div class="product-stock">
              <span v-if="isInStock" class="in-stock">In Stock</span>
              <span v-else class="out-of-stock">Out of Stock</span>
            </div>

            <div class="product-description">
              <h3 class="description-title">Product Details</h3>
              <p>
                This {{ productName }} from {{ product.brand }} is a stylish
                addition to your wardrobe. Perfect for any occasion, it features
                premium quality materials and expert craftsmanship.
              </p>
            </div>
          </div>
        </div>
      </div>

      <div v-else class="product-not-found">
        <h2>Product Not Found</h2>
        <p>
          Sorry, the product you are looking for does not exist or has been
          removed.
        </p>
        <NuxtLink to="/" class="btn btn-primary">Back to Home</NuxtLink>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue';
import { useProductStore } from '~/stores/product';
import { useImagePlaceholder } from '~/composables/useImagePlaceholder';
import type { Product, Category } from '~/types';

const route = useRoute();
const productStore = useProductStore();
const { placeholderImage } = useImagePlaceholder();
const productId = computed(() => parseInt(route.params.id as string));

// Get the product details
const product = computed(() => {
  return productStore.getProductById(productId.value);
});

// Set the selected product in the store
if (product.value) {
  productStore.setSelectedProduct(product.value);
}

// Product name
const productName = computed(() => {
  return product.value?.name.en || product.value?.name.dk || 'Product';
});

// Get the main category for this product
const mainCategory = computed(() => {
  if (
    !product.value ||
    !product.value.categories ||
    product.value.categories.length === 0
  ) {
    return null;
  }

  // Try to find a level 1 category (main category)
  for (const categoryId of product.value.categories) {
    const category = productStore.getCategoryById(categoryId);
    if (category && category.level === 1) {
      return category;
    }
  }

  // If no level 1 category is found, return the first category
  const firstCategoryId = product.value.categories[0];
  return productStore.getCategoryById(firstCategoryId);
});

// Image gallery
const selectedImageIndex = ref(0);
const selectedImage = computed(() => {
  if (
    !product.value ||
    !product.value.images ||
    product.value.images.length === 0
  ) {
    return placeholderImage;
  }

  return product.value.images[selectedImageIndex.value];
});

const selectImage = (index: number) => {
  selectedImageIndex.value = index;
};

// Variants
const selectedVariantIndex = ref(-1); // -1 means main product is selected
const selectedSize = ref('');

const hasVariants = computed(() => {
  return product.value?.variant && product.value.variant.length > 0;
});

const currentVariant = computed(() => {
  if (!product.value || selectedVariantIndex.value === -1) {
    return null;
  }

  return product.value.variant?.[selectedVariantIndex.value] || null;
});

const availableSizes = computed(() => {
  if (!product.value) {
    return [];
  }

  if (selectedVariantIndex.value === -1) {
    return product.value.size || [];
  }

  return currentVariant.value?.size || [];
});

const selectVariant = (index: number) => {
  selectedVariantIndex.value = index;
  selectedSize.value = ''; // Reset size selection when variant changes

  // If this variant has its own images, update the selected image
  if (
    index !== -1 &&
    currentVariant.value?.images &&
    currentVariant.value.images.length > 0
  ) {
    selectedImageIndex.value = 0; // Reset to first image of the variant
  }
};

const isSizeAvailable = (size: string | number) => {
  return availableSizes.value.includes(size);
};

const selectSize = (size: string | number) => {
  if (isSizeAvailable(size)) {
    selectedSize.value = size as string;
  }
};

// Quantity
const quantity = ref(1);

const increaseQuantity = () => {
  quantity.value++;
};

const decreaseQuantity = () => {
  if (quantity.value > 1) {
    quantity.value--;
  }
};

// Stock status
const isInStock = computed(() => {
  if (!product.value) {
    return false;
  }

  if (selectedVariantIndex.value === -1) {
    return (
      product.value.stock === 'Unlimited' ||
      (typeof product.value.stock === 'number' && product.value.stock > 0)
    );
  }

  const variant = currentVariant.value;
  return (
    variant &&
    (variant.stock === 'Unlimited' ||
      (typeof variant.stock === 'number' && variant.stock > 0))
  );
});

// Price formatting
const formatPrice = (price: number) => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'DKK',
    minimumFractionDigits: 2,
  }).format(price);
};

// Set page metadata
useHead({
  title: product.value
    ? `${productName.value} - ${product.value.brand}`
    : 'Product Not Found',
  meta: [
    {
      name: 'description',
      content: product.value
        ? `Shop ${productName.value} by ${product.value.brand} at Fashion Store.`
        : 'Product not found at Fashion Store.',
    },
  ],
});
</script>

<style scoped>
.product-detail-page {
  padding: 20px 0;
}

.breadcrumbs {
  font-size: 0.9rem;
  color: var(--secondary-color);
  margin-bottom: 20px;
}

.breadcrumbs a {
  color: var(--primary-color);
}

.breadcrumb-separator {
  margin: 0 5px;
}

.product-content {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 40px;
}

.product-gallery {
  position: relative;
}

.main-image {
  width: 100%;
  margin-bottom: 15px;
  border-radius: 8px;
  overflow: hidden;
}

.main-image img {
  width: 100%;
  height: auto;
  display: block;
}

.thumbnail-list {
  display: flex;
  gap: 10px;
  overflow-x: auto;
  padding-bottom: 10px;
}

.thumbnail {
  width: 80px;
  height: 80px;
  border-radius: 4px;
  overflow: hidden;
  cursor: pointer;
  opacity: 0.7;
  transition: opacity 0.3s ease, border 0.3s ease;
  border: 2px solid transparent;
}

.thumbnail.active {
  opacity: 1;
  border-color: var(--primary-color);
}

.thumbnail img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.product-brand {
  font-size: 1.2rem;
  font-weight: 600;
  color: var(--primary-color);
  margin-bottom: 5px;
}

.product-name {
  font-size: 2rem;
  font-weight: 700;
  color: var(--dark-color);
  margin-bottom: 15px;
}

.product-price {
  font-size: 1.5rem;
  font-weight: 600;
  color: var(--accent-color);
  margin-bottom: 20px;
}

.product-variants {
  margin-bottom: 30px;
}

.variant-section {
  margin-bottom: 20px;
}

.variant-title {
  font-size: 1rem;
  font-weight: 600;
  margin-bottom: 10px;
}

.color-options,
.size-options {
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
}

.color-option,
.size-option {
  padding: 8px 15px;
  border: 1px solid var(--border-color);
  border-radius: 4px;
  cursor: pointer;
  transition: all 0.3s ease;
}

.color-option.active,
.size-option.active {
  border-color: var(--primary-color);
  background-color: var(--primary-color);
  color: white;
}

.size-option.disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

.product-actions {
  display: flex;
  gap: 15px;
  margin-bottom: 20px;
}

.quantity-selector {
  display: flex;
  align-items: center;
  border: 1px solid var(--border-color);
  border-radius: 4px;
  overflow: hidden;
}

.quantity-btn {
  background-color: var(--light-color);
  border: none;
  padding: 10px 15px;
  cursor: pointer;
  font-size: 1.2rem;
}

.quantity-btn:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

.quantity {
  padding: 0 15px;
  min-width: 40px;
  text-align: center;
}

.add-to-cart-btn {
  flex: 1;
  padding: 10px 20px;
}

.add-to-cart-btn:disabled {
  background-color: var(--secondary-color);
  cursor: not-allowed;
}

.product-stock {
  margin-bottom: 20px;
}

.in-stock {
  color: var(--success-color);
  font-weight: 500;
}

.out-of-stock {
  color: var(--danger-color);
  font-weight: 500;
}

.product-description {
  margin-top: 30px;
  padding-top: 20px;
  border-top: 1px solid var(--border-color);
}

.description-title {
  font-size: 1.2rem;
  font-weight: 600;
  margin-bottom: 10px;
}

.product-not-found {
  text-align: center;
  padding: 50px 0;
}

.product-not-found h2 {
  font-size: 2rem;
  margin-bottom: 15px;
}

.product-not-found p {
  margin-bottom: 20px;
  color: var(--secondary-color);
}

@media (max-width: 992px) {
  .product-content {
    grid-template-columns: 1fr;
    gap: 30px;
  }
}
</style>
