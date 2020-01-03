import Home from "./components/Home.vue";
import Register from "./components/auth/Register.vue";
import Login from "./components/auth/Login.vue";

export default [
  { path: "/", name: "Home", component: Home },
  { path: "/register", name: "Register", component: Register },
  { path: "/login", name: "Login", component: Login }
];
