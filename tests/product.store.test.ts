import { describe, it, expect, beforeEach } from 'vitest';
import { setActivePinia, createPinia } from 'pinia';
import { useProductStore } from '../stores/product';

// Mock data for testing
const mockProducts = [
  {
    id: 1,
    brand: "Test Brand",
    price: 299.95,
    stock: 10,
    color: "Black",
    size: ["XS", "S", "L", "M"],
    name: {
      dk: "TEST PRODUCT 1",
      en: "TEST PRODUCT 1"
    },
    images: ["https://example.com/image1.jpg"],
    categories: ["adults", "women", "women_clothes"]
  },
  {
    id: 2,
    brand: "Another Brand",
    price: 199.95,
    stock: 5,
    color: "Blue",
    size: ["S", "M"],
    name: {
      dk: "TEST PRODUCT 2",
      en: "TEST PRODUCT 2"
    },
    images: ["https://example.com/image2.jpg"],
    categories: ["adults", "men", "men_clothes"]
  }
];

// Mock the data.json import
vi.mock('../data.json', () => ({
  default: {
    products: mockProducts,
    categories: {
      id: "root",
      parent_category_id: "",
      level: 0,
      name: {
        en: "Root",
        dk: "Rod"
      },
      categories: [
        {
          id: "adults",
          parent_category_id: "root",
          level: 1,
          name: {
            en: "Adults",
            dk: "Voksen"
          },
          categories: [
            {
              id: "women",
              parent_category_id: "adults",
              level: 2,
              name: {
                en: "Women",
                dk: "Kvinder"
              }
            },
            {
              id: "men",
              parent_category_id: "adults",
              level: 2,
              name: {
                en: "Men",
                dk: "Mænd"
              }
            }
          ]
        }
      ]
    },
    promotionalSpots: []
  }
}));

describe('Product Store', () => {
  beforeEach(() => {
    // Create a fresh pinia instance for each test
    setActivePinia(createPinia());
  });

  it('should have products loaded from data', () => {
    const store = useProductStore();
    expect(store.products).toHaveLength(2);
    expect(store.products[0].id).toBe(1);
    expect(store.products[1].id).toBe(2);
  });

  it('should filter products by category', () => {
    const store = useProductStore();
    
    // Set the selected category to women
    store.setSelectedCategory('women');
    
    // Should only return products in the women category
    expect(store.filteredProducts).toHaveLength(1);
    expect(store.filteredProducts[0].id).toBe(1);
    
    // Change category to men
    store.setSelectedCategory('men');
    
    // Should only return products in the men category
    expect(store.filteredProducts).toHaveLength(1);
    expect(store.filteredProducts[0].id).toBe(2);
  });

  it('should filter products by search query', () => {
    const store = useProductStore();
    
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

  it('should get a product by ID', () => {
    const store = useProductStore();
    
    // Get product with ID 1
    const product = store.getProductById(1);
    
    // Should return the correct product
    expect(product).toBeDefined();
    expect(product?.id).toBe(1);
    expect(product?.brand).toBe('Test Brand');
    
    // Get a product that doesn't exist
    const nonexistentProduct = store.getProductById(999);
    
    // Should return null
    expect(nonexistentProduct).toBeNull();
  });

  it('should get a category by ID', () => {
    const store = useProductStore();
    
    // Get category with ID "women"
    const category = store.getCategoryById('women');
    
    // Should return the correct category
    expect(category).toBeDefined();
    expect(category?.id).toBe('women');
    expect(category?.name.en).toBe('Women');
    
    // Get a category that doesn't exist
    const nonexistentCategory = store.getCategoryById('nonexistent');
    
    // Should return null
    expect(nonexistentCategory).toBeNull();
  });

  it('should set the selected product', () => {
    const store = useProductStore();
    const product = store.products[0];
    
    // Set the selected product
    store.setSelectedProduct(product);
    
    // Should update the selected product
    expect(store.selectedProduct).toBe(product);
    
    // Clear the selected product
    store.setSelectedProduct(null);
    
    // Should clear the selected product
    expect(store.selectedProduct).toBeNull();
  });
});