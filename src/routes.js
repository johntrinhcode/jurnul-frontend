import App from "./App.vue";
import User from "./User.vue";
import Home from "./components/Home.vue";
import Calendar from "./components/home/Calendar.vue";
import Account from "./components/home/Account.vue";
import Register from "./components/auth/Register.vue";
import Login from "./components/auth/Login.vue";

export default [
  {
    path: "/user/:id",
    alias: "/",
    component: User,
    children: [
      {
        name: "Home",
        path: "home",
        component: Home
      },
      {
        name: "Calendar",
        path: "calendar",
        component: Calendar
      },
      {
        name: "Account",
        path: "account",
        component: Account
      }
    ]
  },
  { path: "/register", name: "Register", component: Register },
  { path: "/login", name: "Login", component: Login }
];
