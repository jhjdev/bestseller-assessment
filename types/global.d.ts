// Global type definitions for Nuxt and Vue auto-imports

declare global {
  // Vue Composition API
  const computed: (typeof import('vue'))['computed'];
  const ref: (typeof import('vue'))['ref'];
  const reactive: (typeof import('vue'))['reactive'];
  const watch: (typeof import('vue'))['watch'];
  const watchEffect: (typeof import('vue'))['watchEffect'];
  const onMounted: (typeof import('vue'))['onMounted'];
  const onUnmounted: (typeof import('vue'))['onUnmounted'];
  const nextTick: (typeof import('vue'))['nextTick'];

  // Nuxt auto-imports
  const useRoute: (typeof import('@nuxt/types'))['useRoute'];
  const useRouter: (typeof import('@nuxt/types'))['useRouter'];
  const useHead: (typeof import('@nuxt/types'))['useHead'];
  const useSeoMeta: (typeof import('@nuxt/types'))['useSeoMeta'];
  const navigateTo: (typeof import('@nuxt/types'))['navigateTo'];
  const $fetch: (typeof import('@nuxt/types'))['$fetch'];

  // Nuxt config
  const defineNuxtConfig: (config: any) => any;

  // Pinia
  const defineStore: (typeof import('pinia'))['defineStore'];
}

export {};
