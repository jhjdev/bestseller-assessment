// types/nuxt.d.ts
import { RouteLocationNormalizedLoaded } from 'vue-router';
import { MetaInfo } from 'vue-meta';

declare module '#app' {
  interface PageMeta {
    layout?: string;
    middleware?: string | string[];
  }
}

declare global {
  const useRoute: () => RouteLocationNormalizedLoaded;
  const useHead: (meta: MetaInfo) => void;
}