<template>
  <div
    class="flex md:absolute md:flex-col w-full md:w-16 h-12 md:h-full items-center bg-accent2"
  >
    <div
      @click="goHome"
      :style="{
        backgroundColor: atHome ? '#C9A6A1' : '#D08883'
      }"
      class="trans flex h-full md:h-16 w-full border-r-2 border-main2 md:border-none bg-accent2 hover:bg-accent1 cursor-pointer"
    >
      <HomeIcon class="fill-current text-white mx-auto my-auto" />
    </div>
    <div
      @click="goCalendar"
      :style="{
        backgroundColor: atCalendar ? '#C9A6A1' : '#D08883'
      }"
      class="trans flex h-full md:h-16 w-full border-r-2 border-main2 md:border-none bg-accent2 hover:bg-accent1 cursor-pointer"
    >
      <CalendarIcon class="fill-current text-white mx-auto my-auto" />
    </div>
    <div
      @click="goAccount"
      :style="{
        backgroundColor: atAccount ? '#C9A6A1' : '#D08883'
      }"
      class="trans flex h-full md:h-16 w-full bg-accent2 hover:bg-accent1 cursor-pointer"
    >
      <UserIcon class="fill-current text-white mx-auto my-auto" />
    </div>
  </div>
</template>

<script>
import HomeIcon from "../../assets/icons/svg/home.svg";
import CalendarIcon from "../../assets/icons/svg/calendar.svg";
import UserIcon from "../../assets/icons/svg/user.svg";

export default {
  name: "NavMobile",
  components: {
    HomeIcon,
    CalendarIcon,
    UserIcon
  },
  data() {
    return {
      atHome: this.$router.currentRoute.name == "Home",
      atCalendar: this.$router.currentRoute.name == "Calendar",
      atAccount: this.$router.currentRoute.name == "Account"
    };
  },
  methods: {
    update: function() {
      this.atHome = this.$router.currentRoute.name == "Home";
      this.atCalendar = this.$router.currentRoute.name == "Calendar";
      this.atAccount = this.$router.currentRoute.name == "Account";
    },
    goHome: function() {
      if (this.$router.currentRoute.name != "Home") {
        this.$router.push({
          name: "Home",
          params: { id: this.$store.getters.userId }
        });
      }

      this.update();
    },
    goCalendar: function() {
      if (this.$router.currentRoute.name != "Calendar") {
        this.$router.push({
          name: "Calendar",
          params: { id: this.$store.getters.userId }
        });
      }

      this.update();
    },
    goAccount: function() {
      if (this.$router.currentRoute.name != "Account") {
        this.$router.push({
          name: "Account",
          params: { id: this.$store.getters.userId }
        });
      }
      this.update();
    }
  },
  computed: {
    homeButtonColor: function() {
      return this.$router.currentRoute.name == "Home" ? "#C9A6A1" : "#D08883";
    },
    calendarButtonColor: function() {
      return this.$router.currentRoute.name == "Calendar"
        ? "#C9A6A1"
        : "#D08883";
    },
    accountButtonColor: function() {
      return this.$router.currentRoute.name == "Account"
        ? "#C9A6A1"
        : "#D08883";
    }
  }
};
</script>

<style></style>
