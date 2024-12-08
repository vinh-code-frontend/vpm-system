import { defineStore } from 'pinia';
import { markRaw, type Component } from 'vue';

namespace Store {
  export type State = {
    loading: boolean;
    isMenuCollapse: boolean;
    elementIcons: string[];
  };
  export type Getter = {};
  export type Action = {
    setLoading(payload: boolean): void;
    setMenuCollapse(payload: boolean): void;
    setElementIcons(payload: Record<string, Component>): void;
  };
}

export const useSiteConfig = defineStore<'siteConfig', Store.State, Store.Getter, Store.Action>('siteConfig', {
  state: () => ({
    loading: false,
    isMenuCollapse: false,
    elementIcons: []
  }),
  actions: {
    setLoading(payload: boolean) {
      this.loading = payload;
    },
    setMenuCollapse(payload) {
      this.isMenuCollapse = payload;
    },
    setElementIcons(elementIconModule) {
      this.elementIcons = Object.entries(elementIconModule).map(([key]) => key);
    }
  }
});
