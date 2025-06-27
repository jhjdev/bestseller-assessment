import { describe, it, expect, beforeEach, vi } from 'vitest';
import { setActivePinia, createPinia } from 'pinia';
import { useProductStore } from '../stores/products';

// Mock data for testing
const mockProducts = [
  {
    id: 1,
    brand: 'Test Brand',
    price: 299.95,
    stock: 10,
    color: 'Black',
    size: ['XS', 'S', 'L', 'M'],
    name: {
      dk: 'TEST PRODUCT 1',
      en: 'TEST PRODUCT 1',
    },
    images: ['https://example.com/image1.jpg'],
    categories: ['adults', 'women', 'women_clothes'],
  },
  {
    id: 2,
    brand: 'Another Brand',
    price: 199.95,
    stock: 5,
    color: 'Blue',
    size: ['S', 'M'],
    name: {
      dk: 'TEST PRODUCT 2',
      en: 'TEST PRODUCT 2',
    },
    images: ['https://example.com/image2.jpg'],
    categories: ['adults', 'men', 'men_clothes'],
  },
];

const mockCategories = {
  root: {
    id: 'root',
    parent_category_id: '',
    level: 0,
    name: { en: 'Root', dk: 'Rod' },
    categories: [],
  },
  adults: {
    id: 'adults',
    parent_category_id: 'root',
    level: 1,
    name: { en: 'Adults', dk: 'Voksen' },
    categories: [],
  },
  women: {
    id: 'women',
    parent_category_id: 'adults',
    level: 2,
    name: { en: 'Women', dk: 'Kvinder' },
    categories: [],
  },
  men: {
    id: 'men',
    parent_category_id: 'adults',
    level: 2,
    name: { en: 'Men', dk: 'Mænd' },
    categories: [],
  },
};

describe('Product Store', () => {
  beforeEach(() => {
    // Create a fresh pinia instance for each test
    setActivePinia(createPinia());
    vi.clearAllMocks();

    // Setup $fetch mock for each test
    (global.$fetch as any) = vi.fn().mockResolvedValue({
      products: mockProducts,
      categories: mockCategories,
      promotionalSpots: [],
      source: 'test',
    });
  });

  it('should initialize with empty state', () => {
    const store = useProductStore();
    expect(store.products).toHaveLength(0);
    expect(Object.keys(store.categories)).toHaveLength(0);
    expect(store.searchQuery).toBe('');
    expect(store.selectedCategoryId).toBeUndefined();
  });

  it('should fetch and store data correctly', async () => {
    const store = useProductStore();
    await store.fetchData();

    expect(store.products).toHaveLength(2);
    expect(store.products[0].id).toBe(1);
    expect(store.products[1].id).toBe(2);
    expect(store.dataSource).toBe('test');
  });

  it('should filter products by category', async () => {
    const store = useProductStore();
    await store.fetchData(); // Load data first

    // Set the selected category to women_clothes
    store.setSelectedCategory('women_clothes');

    // Should only return products in the women category
    expect(store.filteredProducts).toHaveLength(1);
    expect(store.filteredProducts[0].id).toBe(1);

    // Change category to men_clothes
    store.setSelectedCategory('men_clothes');

    // Should only return products in the men category
    expect(store.filteredProducts).toHaveLength(1);
    expect(store.filteredProducts[0].id).toBe(2);
  });

  it('should filter products by search query', async () => {
    const store = useProductStore();
    await store.fetchData(); // Load data first

    // Search for "TEST PRODUCT 1"
    store.setSearchQuery('TEST PRODUCT 1');

    // Should only return products matching the search query
    expect(store.filteredProducts).toHaveLength(1);
    expect(store.filteredProducts[0].id).toBe(1);

    // Search for a brand
    store.setSearchQuery('Another Brand');

    // Should only return products matching the brand
    expect(store.filteredProducts).toHaveLength(1);
    expect(store.filteredProducts[0].id).toBe(2);

    // Search for something that doesn't exist
    store.setSearchQuery('nonexistent');

    // Should return no products
    expect(store.filteredProducts).toHaveLength(0);
  });

  it('should get a product by ID', async () => {
    const store = useProductStore();
    await store.fetchData(); // Load data first

    // Get product with ID 1
    const product = store.getProductById(1);

    // Should return the correct product
    expect(product).toBeDefined();
    expect(product?.id).toBe(1);
    expect(product?.brand).toBe('Test Brand');

    // Get a product that doesn't exist
    const nonexistentProduct = store.getProductById(999);

    // Should return undefined (not null)
    expect(nonexistentProduct).toBeUndefined();
  });

  it('should get a category by ID', async () => {
    const store = useProductStore();
    await store.fetchData(); // Load data first

    // Get category with ID "women"
    const category = store.getCategoryById('women');

    // Should return the correct category
    expect(category).toBeDefined();
    expect(category?.id).toBe('women');
    expect(category?.name.en).toBe('Women');

    // Get a category that doesn't exist
    const nonexistentCategory = store.getCategoryById('nonexistent');

    // Should return undefined
    expect(nonexistentCategory).toBeUndefined();
  });

  it('should get category name correctly', async () => {
    const store = useProductStore();
    await store.fetchData(); // Load data first

    // Get existing category name
    const categoryName = store.getCategoryName('women');
    expect(categoryName).toBe('Women');

    // Get non-existent category name
    const unknownName = store.getCategoryName('nonexistent');
    expect(unknownName).toBe('Unknown Category');
  });
});
