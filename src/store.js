import Vue from "vue";
import Vuex from "vuex";
import createPersistedState from "vuex-persistedstate";
import axios from "axios";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    userId: null,
    userInfo: null,
    token: null,

    selectedEntry: null
  },
  mutations: {
    login(state, data) {
      state.userId = data.userId;
      state.userInfo = data.userInfo;
      state.token = data.token;
    },
    logout(state) {
      state.userId = null;
      state.token = null;
    },
    updateUser(state, data) {
      state.userId = data.userId;
      state.userInfo = data.userInfo;
      state.token = data.token;
    },
    selectEntry(state, entry) {
      state.selectedEntry = entry;
    },
    deselectEntry(state) {
      state.selectedEntry = null;
    }
  },
  actions: {
    updateUser: async function(context) {
      const user_payload = {
        userId: context.state.userId
      };

      await axios
        .post(process.env.VUE_APP_USERINFO_API, user_payload, {
          headers: {
            "auth-token": context.state.token,
            "Content-Type": "application/json"
          }
        })
        .then(response => {
          const data = {
            userId: context.state.userId,
            userInfo: response.data,
            token: context.state.token
          };

          context.commit("updateUser", data);
        })
        .catch(error => {
          console.log(error.response.data);
          this.loginError = true;
        });
    },
    selectEntry: function(context, entry) {
      context.commit("selectEntry", entry);
    },
    deselectEntry: function(context) {
      context.commit("deselectEntry");
    }
  },
  getters: {
    userId: state => {
      return state.userId;
    },
    userToken: state => {
      return state.token;
    },
    userInfo: state => {
      return state.userInfo;
    },
    selectedEntry: state => {
      return state.selectedEntry;
    },
    allEntries: state => {
      return state.userInfo.entries;
    }
  },
  plugins: [createPersistedState()]
});
