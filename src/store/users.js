import Vue from "vue";
const state = {
  users: [
    {
      name: "John",
      age: 44
    },
    {
      name: "Ram",
      age: 45
    }
  ]
};

const mutations = {
  ADD_USER(state, payload) {
    Vue.set(state, "users", [...state.users, payload]);
  },
  DELETE_USER(state, payload) {
    let newState = state.users.findIndex(user => user.name === payload);
    state.users.splice(newState, 1);
    Vue.set(state, "users", state.users);
  },
  EDIT_USER(state, payload) {
    let newState = state.users.findIndex(user => user.name === payload.name);
    state.users[newState].age = payload.age;
  }
};

const actions = {
  add_user({ commit }, payload) {
    commit("ADD_USER", payload);
  },
  delete_user({ commit }, payload) {
    commit("DELETE_USER", payload);
  },
  edit_user({ commit }, payload) {
    commit("EDIT_USER", payload);
  }
};

const getters = {
  getUsers: state => {
    return state.users;
  }
};

export default {
  namespaced: true,
  state,
  mutations,
  actions,
  getters
};
