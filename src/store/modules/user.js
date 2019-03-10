import axios from 'axios';

export default {
  state: {
    user: null
  },
  getters: {
    user: state => state.user,
    loggedIn: state => state.user !== null
  },
  mutations: {
    setUser: (state, payload) => {
      state.user = payload;
    }
  },
  actions: {
    async signup({ commit }, user) {
      axios
        .post('http://localhost:3000/signup', user)
        .then(({ token }) => {
          // Set token to local storage
          localStorage.setItem('token', token);

          // Remove password
          delete user.password;

          // Commit
          commit('setUser', {
            ...user,
            token
          });
        })
        .catch(error => {
          console.log(error);
          alert('Что-то пошло не так. Попробуйте еще раз');
        });
    },
    async signin({ commit }, data) {
      try {
        // Get token
        const tokenResponse = await axios.post(
          'http://localhost:3000/signin',
          data
        );
        const { token } = tokenResponse.data;

        // Set token to local storage
        localStorage.setItem('token', token);

        // Get user
        const userResponse = await axios.get('http://localhost:3000/api/user', {
          headers: { Authorization: `Bearer ${token}` }
        });
        const user = userResponse.data;

        // Commit
        commit('setUser', {
          ...user,
          token
        });
      } catch (e) {
        console.log(e);
        alert('Что-то пошло не так. Попробуйте еще раз');
      }
    },
    async autoSignin({ commit }, token) {
      axios
        .get('http://localhost:3000/api/user', {
          headers: { Authorization: `Bearer ${token}` }
        })
        .then(res => {
          // Commit
          commit('setUser', {
            ...res.data,
            token
          });
        });
    },
    signout({ commit }) {
      commit('setUser', null);
      localStorage.removeItem('token');
    }
  }
};
