import Vue from "vue";
import Vuex from "vuex";
import VueRouter from "vue-router";
import VueAxios from "vue-axios";
import axios from "axios";
import App from "./App.vue";

import routes from "./routes.js";
import store from "./store.js";

import "es6-promise/auto";
import "./assets/styles/index.css";

Vue.config.productionTip = false;
Vue.use(VueRouter);

Vue.use(VueAxios, axios);
Vue.use(Vuex);

const router = new VueRouter({
  routes
});

router.beforeEach((to, from, next) => {
  if (
    !store.getters.userId &&
    to.path !== "/login" &&
    to.path !== "/register"
  ) {
    next("/login");
  } else {
    if (to.path == "/") {
      router.replace({ name: "Home", params: { id: store.getters.userId } });
    }
    // Validate current token.
    next();
  }
});

new Vue({
  render: h => h(App),
  router,
  store
}).$mount("#app");
