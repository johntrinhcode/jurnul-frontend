<template>
  <div id="register" class="flex flex-col">
    <div
      id="register-box"
      class="flex flex-col relative w-full mx-auto my-auto p-2 rounded-lg shadow font-body"
    >
      <button @click="back" id="back-button" class="absolute z-10 focus:outline-none">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          class="w-6 h-6 fill-current text-accent2"
        >
          <path
            class="heroicon-ui"
            d="M5.41 11H21a1 1 0 0 1 0 2H5.41l5.3 5.3a1 1 0 0 1-1.42 1.4l-7-7a1 1 0 0 1 0-1.4l7-7a1 1 0 0 1 1.42 1.4L5.4 11z"
          />
        </svg>
      </button>
      <div class="relative w-full">
        <h1
          id="register-header"
          class="text-center text-5xl text-accent2 font-display leading-none"
        >make an account,</h1>
      </div>

      <p class="text-center text-accent1 font-main text-sm">begin your self care</p>
      <hr class="border-t border-main2 mt-2" />
      <transition name="grow">
        <p
          id="password-error"
          v-if="passwordError"
          transition="grow"
          class="mt-2 overflow-hidden text-center text-sm text-error"
        >oops, make sure your passwords match</p>
      </transition>
      <transition name="grow">
        <p
          id="duplicate-error"
          v-if="duplicateError"
          class="mt-2 overflow-hidden text-center text-sm text-error"
        >oops, that email is registered</p>
      </transition>
      <form @submit="register" class="flex flex-col mt-2 px-4">
        <!-- username -->
        <label for="name" class="text-accent1 text-sm font-main">name</label>
        <input
          required
          v-model="nameInput"
          autocomplete="off"
          type="text"
          name="name"
          id="name"
          class="h-10 rounded pl-2 text-accent1 border-2 border-white focus:border-accent1"
        />
        <!-- email -->
        <label for="email" class="text-accent1 text-sm font-main mt-2">email</label>
        <input
          required
          v-model="emailInput"
          autocomplete="off"
          type="email"
          name="email"
          id="email"
          class="h-10 rounded pl-2 text-accent1 border-2 border-white focus:border-accent1"
        />
        <label for="password" class="text-accent1 text-sm font-main mt-2">password</label>
        <input
          required
          v-model="passwordInput"
          autocomplete="off"
          type="password"
          name="password"
          id="password"
          class="h-10 rounded pl-2 text-accent1 border-2 border-white focus:border-accent1"
        />
        <label for="password" class="text-accent1 text-sm font-main mt-2">confirm password</label>
        <input
          required
          v-model="passwordConfirmInput"
          autocomplete="off"
          type="password"
          name="password"
          id="password-confirm"
          class="h-10 rounded pl-2 text-accent1 border-2 border-white focus:border-accent1"
        />
        <button class="h-16 rounded text-2xl bg-accent2 mt-4 focus:outline-none hover:bg-accent1">
          <div class="text-white">register</div>
        </button>
      </form>
    </div>
  </div>
</template>

<script>
import moment from "moment";

export default {
  name: "Register",
  data() {
    return {
      nameInput: null,
      emailInput: null,
      passwordInput: null,
      passwordConfirmInput: null,

      passwordError: false,
      duplicateError: false
    };
  },

  methods: {
    register: async function(event) {
      event.preventDefault();

      if (this.passwordInput !== this.passwordConfirmInput) {
        this.passwordError = true;
        return;
      }

      const payload = {
        name: this.nameInput,
        email: this.emailInput,
        password: this.passwordInput
      };

      console.log(process.env.VUE_APP_REGISTER_API);
      await this.axios
        .post(process.env.VUE_APP_REGISTER_API, payload)
        .then(response => {
          // Bring back to the login screen.
          this.$router.push("/login");
        })
        .catch(error => {
          if (error.response.data == "User already registered.") {
            this.duplicateError = true;
            this.passwordError = false;
          }
        });
    },
    back: function() {
      this.$emit("backNavigate");
      this.$router.back();
    }
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

#register {
  height: calc(var(--vh, 1vh) * 100);
}

#register-box {
  width: 18rem;

  background-color: #fcf2f0;
  -webkit-box-shadow: 0px 10px 9px 0px rgba(0, 0, 0, 0.29);
  -moz-box-shadow: 0px 10px 9px 0px rgba(0, 0, 0, 0.29);
  box-shadow: 0px 10px 9px 0px rgba(0, 0, 0, 0.29);
}

@media (min-width: 768px) {
  #register-box {
    width: 20rem;

    background-color: #fcf2f0;
    -webkit-box-shadow: 0px 10px 9px 0px rgba(0, 0, 0, 0.29);
    -moz-box-shadow: 0px 10px 9px 0px rgba(0, 0, 0, 0.29);
    box-shadow: 0px 10px 9px 0px rgba(0, 0, 0, 0.29);
  }
}

@media (min-width: 1024px) {
  #register-box {
    width: 24rem;

    background-color: #fcf2f0;
    -webkit-box-shadow: 0px 10px 9px 0px rgba(0, 0, 0, 0.29);
    -moz-box-shadow: 0px 10px 9px 0px rgba(0, 0, 0, 0.29);
    box-shadow: 0px 10px 9px 0px rgba(0, 0, 0, 0.29);
  }
}

#register-header {
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

.grow-enter-active,
.grow-leave-active {
  transition: all 0.3s ease-in-out;
}

.grow-enter-to {
  max-height: 2.5rem;
  opacity: 1;
}
.grow-leave {
  max-height: 2.5rem;
  opacity: 1;
}
.grow-enter,
.grow-leave-to {
  max-height: 0rem;
  opacity: 0;
}

#password-error,
#duplicate-error {
  height: auto;
}
</style>
