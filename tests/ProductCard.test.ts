import { describe, it, expect, vi } from 'vitest';
import { mount } from '@vue/test-utils';
import { h } from 'vue';
import ProductCard from '../components/ProductCard.vue';

// Mock the image placeholder composable
vi.mock('~/composables/useImagePlaceholder', () => ({
  useImagePlaceholder: () => ({
    placeholderImage: '/images/placeholder.jpg',
  }),
}));

// Mock NuxtLink
const NuxtLinkStub = {
  name: 'NuxtLink',
  props: ['to'],
  template: '<a :href="to"><slot /></a>',
};

describe('ProductCard Component', () => {
  it('renders correctly with all props', () => {
    const product = {
      id: 1,
      brand: 'Test Brand',
      price: 299.95,
      stock: 10,
      color: 'Black',
      size: ['XS', 'S', 'L', 'M'],
      name: {
        dk: 'TEST PRODUCT',
        en: 'TEST PRODUCT EN',
      },
      images: ['https://example.com/image.jpg'],
      categories: ['adults', 'women', 'women_clothes'],
    };

    const wrapper = mount(ProductCard, {
      props: {
        product,
      },
      global: {
        stubs: {
          NuxtLink: NuxtLinkStub,
        },
      },
    });

    // Check that the component renders the product information correctly
    expect(wrapper.text()).toContain('Test Brand');
    expect(wrapper.text()).toContain('TEST PRODUCT EN');
    expect(wrapper.find('img').attributes('src')).toBe('https://example.com/image.jpg');

    // Check price formatting (using non-breaking space as it appears in the actual output)
    expect(wrapper.text()).toContain('DKK 299.95');
  });

  it('uses Danish name when English name is not available', () => {
    const product = {
      id: 1,
      brand: 'Test Brand',
      price: 299.95,
      stock: 10,
      color: 'Black',
      size: ['XS', 'S', 'L', 'M'],
      name: {
        dk: 'TEST PRODUCT DK',
        en: '',
      },
      images: ['https://example.com/image.jpg'],
      categories: ['adults', 'women', 'women_clothes'],
    };

    const wrapper = mount(ProductCard, {
      props: {
        product,
      },
      global: {
        stubs: {
          NuxtLink: NuxtLinkStub,
        },
      },
    });

    // Check that the component uses the Danish name when English is not available
    expect(wrapper.text()).toContain('TEST PRODUCT DK');
  });

  it('shows color options count when variants are available', () => {
    const product = {
      id: 2,
      brand: 'Another Brand',
      price: 199.95,
      stock: 5,
      color: 'Blue',
      size: ['S', 'M'],
      name: {
        dk: 'TEST PRODUCT',
        en: 'TEST PRODUCT',
      },
      images: ['https://example.com/image.jpg'],
      categories: ['adults', 'men', 'men_clothes'],
      variant: [
        {
          stock: 3,
          color: 'Red',
          size: ['XS', 'S'],
        },
        {
          stock: 2,
          color: 'Green',
          size: ['M', 'L'],
        },
      ],
    };

    const wrapper = mount(ProductCard, {
      props: {
        product,
      },
      global: {
        stubs: {
          NuxtLink: NuxtLinkStub,
        },
      },
    });

    // Check that the component shows the color options count
    expect(wrapper.text()).toContain('Colors:');
    expect(wrapper.text()).toContain('3 options'); // Blue (main) + Red + Green
  });

  it('uses placeholder image when no images are available', () => {
    const product = {
      id: 3,
      brand: 'No Image Brand',
      price: 99.95,
      stock: 2,
      color: 'Black',
      size: ['S'],
      name: {
        dk: 'NO IMAGE',
        en: 'NO IMAGE',
      },
      images: [], // Empty images array
      categories: ['adults'],
    };

    const wrapper = mount(ProductCard, {
      props: {
        product,
      },
      global: {
        stubs: {
          NuxtLink: NuxtLinkStub,
        },
      },
    });

    // Check that the component uses a placeholder image
    const imgElement = wrapper.find('img');
    expect(imgElement.exists()).toBe(true);
    expect(imgElement.attributes('src')).toBe('/images/placeholder.jpg');
  });
});
