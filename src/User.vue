<template>
  <div id="user" class="relative w-full h-full">
    <div class="flex flex-col md:flex-row w-full h-full">
      <router-view @calendar-select="updateNav"></router-view>
      <NavMobile ref="nav" />
    </div>
  </div>
</template>
<script>
import NavMobile from "./components/home/NavMobile";

export default {
  name: "User",
  components: {
    NavMobile
  },
  data() {
    return {
      currentLocation: ""
    };
  },
  computed: {
    isMobile: function() {
      return this.mobile;
    }
  },
  async mounted() {},
  methods: {
    updateNav: function() {
      console.log(this.$refs.nav);
      this.$refs.nav.update();
    },
    logout: function() {
      this.$store.commit("logout");
      this.$router.push("/login");
    },
    updateEntries: async function() {
      await this.$store.dispatch("updateUser");
      //this.$refs["entries"].addEntry();
    }
  }
};
</script>

<style>
#logout {
  -webkit-box-shadow: 0px 5px 9px 0px rgba(0, 0, 0, 0.09);
  -moz-box-shadow: 0px 5px 9px 0px rgba(0, 0, 0, 0.09);
  box-shadow: 0px 5px 10px 0px rgba(0, 0, 0, 0.09);
}
</style>
