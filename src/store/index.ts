/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import { createStore, Store, useStore as baseUseStore } from "vuex";
import createPersistedState from "vuex-persistedstate";
import { IAllStateTypes, IRootStateTypes } from "./modules/interface";
import { InjectionKey } from "vue";
import ModuleVisitor from "./modules/visitor";

const dataSet = createPersistedState({
  /** 被持久化的状态格式为：模块名.状态名 */
  paths: [
    /** 访客模块 */
    "visitor.visitor",
  ],
});

export default createStore<IRootStateTypes>({
  // state: {},
  // mutations: {},
  // actions: {},
  modules: {
    visitor: ModuleVisitor,
  },
  plugins: [dataSet],
});

// 定义注入类型
export const key: InjectionKey<Store<IRootStateTypes>> = Symbol("vue-store");

export function useStore<T = IAllStateTypes>() {
  return baseUseStore<T>(key);
}
