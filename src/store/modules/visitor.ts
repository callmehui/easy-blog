/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import { ActionContext, Module } from "vuex";
import { IRootStateTypes } from "./interface";
import { IVisitor, IVisitorState } from "./interface/visitor";

const ModuleVisitor: Module<IVisitorState, IRootStateTypes> = {
  namespaced: true,
  state: (): IVisitorState => ({
    visitor: {
      id: undefined,
      nickname: undefined,
      portrait: undefined,
    },
  }),
  mutations: {
    setVisitor(state: IVisitorState, visotor: IVisitor) {
      state.visitor = visotor;
    },
  },
  actions: {},
  getters: {},
};

export default ModuleVisitor;
