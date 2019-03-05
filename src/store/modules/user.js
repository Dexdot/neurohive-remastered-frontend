export default {
  state: {
    user: {}
  },
  getters: {
    user: state => state.user
  },
  mutations: {
    mutation: (state, payload) => {
      state.user = payload;
    }
  },
  actions: {
    action: ({ commit }, payload) => {
      commit('mutation', payload);
    }
  }
};
