<template>
  <div id="login" class="flex flex-col">
    <div id="login-box" class="mx-auto my-auto p-8 rounded-lg shadow font-body">
      <h1
        id="login-header"
        class="text-center text-5xl text-accent2 font-display leading-none"
      >
        welcome,
      </h1>
      <p class="text-center text-accent1 font-main text-sm">
        sign into your account
      </p>
      <hr class="border-t border-main2 mt-2" />
      <transition name="grow">
        <div v-if="loginError" class="mt-2">
          <p class="text-center text-sm text-error">
            incorrect email or password
          </p>
        </div>
      </transition>
      <form @submit="login" class="flex flex-col mt-2 px-4">
        <label for="email" class="text-accent1 text-sm font-main">email</label>
        <input
          required
          v-model="emailInput"
          autocomplete="off"
          type="email"
          name="email"
          id="email"
          class="h-10 rounded pl-2 text-accent1 border-2 border-white focus:border-accent1"
        />
        <label for="password" class="text-accent1 text-sm font-main mt-2"
          >password</label
        >
        <input
          required
          v-model="passwordInput"
          autocomplete="off"
          type="password"
          name="password"
          id="password"
          class="h-10 rounded pl-2 text-accent1 border-2 border-white focus:border-accent1"
        />
        <button
          class="h-16 rounded text-2xl bg-accent2 mt-4 focus:outline-none hover:bg-accent1"
        >
          <div class="text-white">login</div>
        </button>
      </form>
      <div class="relative block text-center">
        <div id="bottom-options" class="absolute w-full">
          <div class="text-sm">
            <p class="inline text-accent1">don't have an account?</p>
            <p
              @click="registerRedirect"
              class="inline text-accent2 pl-2 cursor-pointer"
            >
              register here
            </p>
          </div>
          <div class="text-sm">
            <p class="inline text-accent1">forgot your password?</p>
            <p class="inline text-accent2 pl-2 cursor-pointer">
              recover it here
            </p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Login",
  data() {
    return {
      emailInput: null,
      passwordInput: null,
      id: null,
      loginError: false
    };
  },
  methods: {
    login: async function(event) {
      event.preventDefault();

      const payload = {
        email: this.emailInput,
        password: this.passwordInput
      };

      await this.axios
        .post(process.env.VUE_APP_LOGIN_API, payload)
        .then(async response => {
          // Log in user.
          const userId = response.data.user;
          const token = response.data.token;

          const user_payload = { userId: userId };

          await this.axios
            .post(process.env.VUE_APP_USERINFO_API, user_payload, {
              headers: {
                "auth-token": token,
                "Content-Type": "application/json"
              }
            })
            .then(response => {
              const userInfo = response.data;

              this.$store.commit("login", {
                userId: userId,
                userInfo: userInfo,
                token: token
              });
            })
            .catch(error => {
              console.log(error.response.data);
              this.loginError = true;
            });
          // Redirect user to homepage.
          this.$router.push("/");
        })
        .catch(error => {
          console.log(error.response.data);
          this.loginError = true;
        });
    },
    registerRedirect: function() {
      this.$emit("navigate");
      this.$router.push("/register");
    }
  },
  mounted() {
    // Address mobile screens..
    function setDocHeight() {
      document.documentElement.style.setProperty(
        "--vh",
        `${window.innerHeight / 100}px`
      );
    }

    window.addEventListener("resize", function() {
      setDocHeight();
    });

    window.addEventListener("orientationchange", function() {
      setDocHeight();
    });

    setDocHeight();
  }
};
</script>

<style scoped>
/* Disable ugly chrome autofill blue box */
input:-webkit-autofill,
input:-webkit-autofill:hover,
input:-webkit-autofill:focus textarea:-webkit-autofill,
textarea:-webkit-autofill:hover textarea:-webkit-autofill:focus,
select:-webkit-autofill,
select:-webkit-autofill:hover,
select:-webkit-autofill:focus {
  -webkit-box-shadow: 0 0 0px 1000px #ffffff inset !important;
  -webkit-text-fill-color: #c9a6a1;
  font-size: inherit;
  transition: font-size 5000s ease-in-out 0s;
}

#login {
  height: calc(var(--vh, 1vh) * 100);
  background-color: #f8e1d7;
}

#login-box {
  width: 20rem;

  background-color: #fcf2f0;
  -webkit-box-shadow: 0px 10px 9px 0px rgba(0, 0, 0, 0.29);
  -moz-box-shadow: 0px 10px 9px 0px rgba(0, 0, 0, 0.29);
  box-shadow: 0px 10px 9px 0px rgba(0, 0, 0, 0.29);
}

@media (min-width: 768px) {
  #login-box {
    width: 20rem;

    background-color: #fcf2f0;
    -webkit-box-shadow: 0px 10px 9px 0px rgba(0, 0, 0, 0.29);
    -moz-box-shadow: 0px 10px 9px 0px rgba(0, 0, 0, 0.29);
    box-shadow: 0px 10px 9px 0px rgba(0, 0, 0, 0.29);
  }
}

@media (min-width: 1024px) {
  #login-box {
    width: 24rem;

    background-color: #fcf2f0;
    -webkit-box-shadow: 0px 10px 9px 0px rgba(0, 0, 0, 0.29);
    -moz-box-shadow: 0px 10px 9px 0px rgba(0, 0, 0, 0.29);
    box-shadow: 0px 10px 9px 0px rgba(0, 0, 0, 0.29);
  }
}

#login-header {
  font-weight: 500;
}

#bottom-options {
  bottom: -7.5rem;
  line-height: 20px;
}

label {
  letter-spacing: 1px;
}

input {
  transition: all 0.3s ease;
}

.grow-enter-active {
  transition: all 0.5s ease;
}
.grow-leave-active {
  transition: all 0.8s cubic-bezier(1, 0.5, 0.8, 1);
}
.grow-enter, .grow-leave-to
/* .slide-fade-leave-active below version 2.1.8 */ {
  max-height: 0px;
  opacity: 0;
}
</style>
