<template>
  <div id="home" class="flex flex-col h-full w-full md:ml-16">
    <!--
      <EntryView
        v-if="$store.getters.selectedEntry"
        :entry="$store.getters.selectedEntry"
      />
            -->

    <div class="w-full h-full">
      <div v-if="entryCreation" class="w-full h-full">
        <EntrySubmitMobile @close="closeAddEntry" @new-entry="updateEntries" />
      </div>
      <div v-else class="flex flex-col w-full h-full">
        <div class="h-56 md:h-40">
          <transition name="right2left">
            <InfoMobile
              @show="showInfo"
              v-show="!entryCreation && infoVisible"
            />
          </transition>
        </div>
        <div
          v-if="
            noEntryToday &&
              $store.getters.selectedEntry == null &&
              !entryCreation
          "
          class="bg-main2 h-16 text-center font-display font-bold text-accent2 my-auto"
        >
          no entry written for today
        </div>
        <div
          v-if="
            !noEntryToday && !entryCreation && !$store.getters.selectedEntry
          "
          class="bg-main2 h-16 text-center font-display font-bold text-accent2 my-auto"
        >
          no entry selected
        </div>
        <div v-if="$store.getters.selectedEntry != null" class="w-full h-full">
          <EntryViewMobile :entry="$store.getters.selectedEntry" />
        </div>
        <div
          v-if="noEntryToday && !entryCreation && !$store.getters.selectedEntry"
          class="w-full bg-main2 px-2 py-4"
        >
          <button
            @click="addEntry"
            class="block w-full p-2 mx-auto rounded bg-accent2 text-white font-display font-bold cursor-pointer"
          >
            new entry
          </button>
        </div>
        <div
          v-if="$store.getters.selectedEntry"
          class="w-full bg-main2 px-2 py-4"
        >
          <button
            class="block w-full p-2 mx-auto rounded bg-accent2 text-white font-display font-bold cursor-pointer"
          >
            edit entry
          </button>
        </div>
      </div>
    </div>

    <!--
      <button
        id="logout"
        @click="logout"
        class="trans absolute top-0 right-0 mt-2 mr-2 md:mt-4 md:mr-4 p-2 h-auto w-20 mx-auto bg-accent2 hover:bg-accent1 text-white rounded focus:outline-none"
      >log out</button>
      -->
  </div>
</template>

<script>
// Displays details about the day. Gives the option to add a new entry if there isn't one for today yet, otherwise
// it'll give you the option to edit your current entry.
import EntryViewMobile from "./home/EntryViewMobile";
import EntrySubmitMobile from "./home/EntrySubmitMobile";
import Info from "./home/Info";
import InfoMobile from "./home/InfoMobile";

import moment from "moment";

export default {
  name: "Home",
  components: {
    EntryViewMobile,
    EntrySubmitMobile,
    InfoMobile,
    Info
  },
  data() {
    return {
      currentLocation: "",
      isMobile: false,
      infoVisible: false,
      entryCreation: false
    };
  },
  async mounted() {
    await this.$store.dispatch("updateUser");
  },
  methods: {
    updateEntries: async function() {
      await this.$store.dispatch("updateUser");
      const entries = this.$store.getters.allEntries;

      if (entries.length != 0) {
        await this.$store.dispatch("selectEntry", entries[entries.length - 1]);
      }

      this.entryCreation = false;
    },
    showInfo: function() {
      this.infoVisible = true;
    },
    addEntry: function() {
      this.entryCreation = true;
    },
    closeAddEntry: function() {
      this.entryCreation = false;
    }
  },
  computed: {
    noEntryToday: function() {
      const entries = this.$store.getters.allEntries;
      if (
        entries.length != 0 &&
        moment.unix(entries[entries.length - 1].date).format("YYYY-MM-DD") ==
          moment().format("YYYY-MM-DD")
      ) {
        return false;
      }
      return true;
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
