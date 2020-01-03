<template>
  <div id="home">
    <div class="flex flex-col w-full h-full">
      <EntryView
        v-if="$store.getters.selectedEntry"
        :entry="$store.getters.selectedEntry"
      />
      <EntrySubmit
        v-if="!$store.getters.selectedEntry"
        @new-entry="updateEntries"
      />
      <EntryListBottom ref="entries" />

      <button
        id="logout"
        @click="logout"
        class="trans absolute top-0 right-0 mt-4 mr-4 p-2 h-auto w-20 mx-auto bg-accent2 hover:bg-accent1 text-white rounded focus:outline-none"
      >
        log out
      </button>
    </div>
  </div>
</template>

<script>
import EntryView from "./home/EntryView";
import EntrySubmit from "./home/EntrySubmit";
import EntryListBottom from "./home/EntryListBottom";

export default {
  name: "Home",
  components: {
    EntryView,
    EntrySubmit,
    EntryListBottom
  },
  data() {
    return {
      currentLocation: ""
    };
  },
  async mounted() {},
  methods: {
    logout: function() {
      this.$store.commit("logout");
      this.$router.push("/login");
    },
    updateEntries: async function() {
      await this.$store.dispatch("updateUser");
      this.$refs["entries"].addEntry();
    }
  }
};
</script>

<style>
#home {
  height: calc(var(--vh, 1vh) * 100);
}

#logout {
  -webkit-box-shadow: 0px 5px 9px 0px rgba(0, 0, 0, 0.09);
  -moz-box-shadow: 0px 5px 9px 0px rgba(0, 0, 0, 0.09);
  box-shadow: 0px 5px 10px 0px rgba(0, 0, 0, 0.09);
}
</style>
