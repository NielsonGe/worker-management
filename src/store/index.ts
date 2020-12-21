import { createStore } from 'vuex'
import createPersistedState from "vuex-persistedstate";
export default createStore({
  plugins: [createPersistedState()],
  state: {
    account: Object,
    token: String,
    projectId: String,
    project:Object
  },
  mutations: {
    setAccountMutations(state, payload) {
      state.account = payload;
    },
    setTokenMutations(state, payload) {
      state.token = payload;
    },
    setProjectIdMutations(state, payload) {
      state.projectId = payload;
    },
    setProjectMutations(state, payload) {
      state.project = payload;
    }
  },
  actions: {
    setAccount({commit}, payload) {
      commit('setAccountMutations', payload);
    },
    setToken({commit}, payload) {
      commit('setTokenMutations', payload);
    },
    setProjectId({commit}, payload) {
      commit('setProjectIdMutations', payload);
    },
    setProject({commit}, payload) {
      commit('setProjectMutations', payload);
    }
  },
  getters: {
    getAccount(state) {
      return state.account;
    },
    getToken(state) {
      return state.token;
    },
    getProjectId(state) {
      return state.projectId;
    },
    getProject(state){
      return state.project;
    }
  },
  modules: {
  }
})
