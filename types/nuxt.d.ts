// types/nuxt.d.ts
import { RouteLocationNormalizedLoaded } from 'vue-router';
import { MetaInfo } from 'vue-meta';

declare module '#app' {
  interface PageMeta {
    layout?: string;
    middleware?: string | string[];
  }

  export interface NuxtApp {
    [key: string]: any;
  }
}

declare global {
  const useRoute: () => RouteLocationNormalizedLoaded;
  const useHead: (meta: MetaInfo) => void;

  function defineNuxtPlugin(plugin: (nuxtApp: any) => Promise<void> | void): any;

  function useRuntimeConfig(): {
    mongodbUri: string;
    mongodbDbName: string;
    [key: string]: any;
  };

  function defineEventHandler(handler: (event: any) => Promise<any> | any): any;
}
