// store/index.js
export const state = () => ({
    isAuthenticated: false,
  });
  
  export const mutations = {
    setAuthentication(state, status) {
      state.isAuthenticated = status;
    },
  };
  