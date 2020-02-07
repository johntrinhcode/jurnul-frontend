<template>
  <div id="calendar" class="h-full w-full md:ml-16">
    <VueCal
      hide-view-selector
      :time="false"
      :events="attributes"
      @cell-click="selectEntry($event)"
      default-view="month"
      class="vuecal--rounded-theme font-display font-bold bg-main2"
    />
  </div>
</template>

<script>
import VueCal from "vue-cal";
import "vue-cal/dist/vuecal.css";
import moment from "moment";

export default {
  name: "Calendar",
  components: {
    VueCal
  },
  data() {
    return {};
  },
  methods: {
    selectEntry: function(e) {
      // Find entry.
      const entries = this.$store.getters.allEntries;
      let selectedEntry = null;

      entries.forEach(entry => {
        if (
          moment(entry.date * 1000).format("YYYY-MM-DD") ==
          moment(e).format("YYYY-MM-DD")
        ) {
          selectedEntry = entry;
        }
      });
      // Set selected entry.
      this.$store.dispatch("selectEntry", selectedEntry);

      // Navigate back to the homepage.
      this.$router.push("home");
      this.$emit("calendar-select");
    }
  },
  computed: {
    attributes: function() {
      const entries = this.$store.getters.allEntries;

      const dates = [];

      entries.forEach(entry => {
        dates.push({
          start: moment.unix(entry.date).format("YYYY-MM-DD HH:MM"),
          end: moment.unix(entry.date).format("YYYY-MM-DD HH:MM"),
          allDay: true
        });
      });

      return dates;
    }
  },
  async mounted() {
    await this.$store.dispatch("updateUser");
  }
};
</script>

<style>
.vuecal__title-bar {
  background-color: #d08883 !important;
  color: white;
}

.vuecal--rounded-theme.vuecal--green-theme:not(.vuecal--day-view)
  .vuecal__cell-content {
  background-color: #fcf2f0 !important;
}

.vuecal__cell:hover {
  background-color: #fcf2f0 !important;
}

.vuecal__cell:hover {
  transition: all 0.25s ease !important;
}

.vuecal__cell-events-count,
.vuecal__cell-date {
  cursor: pointer !important;
}

.vuecal--rounded-theme.vuecal--green-theme:not(.vuecal--day-view)
  .selected
  .vuecal__cell-content {
  border-color: #d08883 !important;
}

.vuecal__cell-events-count {
  background-color: #d08883 !important;
}

.vuecal--rounded-theme.vuecal--green-theme:not(.vuecal--day-view)
  .vuecal__cell.today
  .vuecal__cell-content {
  background-color: #d08883 !important;
  color: #fff;
}
</style>
