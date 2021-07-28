import timer from "./store.timer";
import datex from "./store.datex";

const store = {
  timer,
  datex
};

type StoreMapper = typeof store;

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
window.__STORE__ = store;

/**
 * hook: useStore 根据多个个 store 名称，返回values
 * @param {string[]} paths
 * @returns {keyof StoreMapper}
 */
export function useStore<T extends keyof StoreMapper>(...paths: T[]) {
  return paths.reduce((s: Partial<StoreMapper>, c) => {
    s[c] = store[c];
    return s;
  }, {});
}
