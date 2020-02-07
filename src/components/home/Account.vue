<template>
  <div id="account" class="h-full w-full md:ml-16">
    account
    <button
      id="logout"
      @click="logout"
      class="trans absolute top-0 right-0 mt-2 mr-2 md:mt-4 md:mr-4 p-2 h-auto w-20 mx-auto bg-accent2 hover:bg-accent1 text-white rounded focus:outline-none"
    >
      log out
    </button>
  </div>
</template>

<script>
export default {
  name: "Account",
  methods: {
    logout: function() {
      this.$store.commit("logout");
      this.$router.push("/login");
    }
  }
};
</script>

<style></style>
