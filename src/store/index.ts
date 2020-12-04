import { createStore } from 'vuex'
import Account from '@/models/Account';

export default createStore({
  state: {
    account: Account,
    token: String,
    projectId: String,
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
    }
  },
  modules: {
  }
})
