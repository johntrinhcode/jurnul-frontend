<template>
  <div id="routine" class="flex flex-col w-full h-full">
    <div class="w-full h-16"></div>

    <div id="routine-card" class="relative flex flex-col bg-main1 rounded-lg p-4 mx-auto my-auto">
      <transition name="right2left">
        <Info ref="info" @show="toggleInfo" v-show="showInfo && !isMobile" />
      </transition>
      <transition name="right2left">
        <p
          id="mood-error"
          v-show="showMoodError"
          class="trans absolute text-center font-display font-semibold text-accent1"
        >don't forget to pick your mood 😳</p>
      </transition>

      <p
        class="text-center text-6xl font-display font-semibold leading-none text-accent2"
      >hi {{ $store.getters.userInfo.name.split(" ")[0].toLowerCase() }},</p>
      <p class="font-main text-accent1 font-bold text-center">How was your day?</p>
      <div id="emoji-row" class="flex items-center mx-auto mt-4">
        <div class="flex flex-col">
          <VerySadEmoji
            @click="
              () => {
                setMood(0);
              }
            "
            v-bind:class="{ 'bg-main2': currentMood == 0 }"
            class="emoji trans w-12 h-12 p-2 mx-2 cursor-pointer rounded hover:bg-main2"
          />
          <p class="text-center text-xs text-accent2">bad</p>
        </div>
        <div class="flex flex-col">
          <SadEmoji
            @click="
              () => {
                setMood(1);
              }
            "
            v-bind:class="{ 'bg-main2': currentMood == 1 }"
            class="emoji trans w-12 h-12 p-2 mx-2 cursor-pointer rounded hover:bg-main2"
          />
          <p class="text-center text-xs text-accent2">not good</p>
        </div>
        <div class="flex flex-col">
          <NeutralEmoji
            @click="
              () => {
                setMood(2);
              }
            "
            v-bind:class="{ 'bg-main2': currentMood == 2 }"
            class="emoji trans w-12 h-12 p-2 mx-2 cursor-pointer rounded hover:bg-main2"
          />
          <p class="text-center text-xs text-accent2">ok</p>
        </div>
        <div class="flex flex-col">
          <HappyEmoji
            @click="
              () => {
                setMood(3);
              }
            "
            v-bind:class="{ 'bg-main2': currentMood == 3 }"
            class="emoji trans w-12 h-12 p-2 mx-2 cursor-pointer rounded hover:bg-main2"
          />
          <p class="text-center text-xs text-accent2">good</p>
        </div>
        <div class="flex flex-col">
          <VeryHappyEmoji
            @click="
              () => {
                setMood(4);
              }
            "
            v-bind:class="{ 'bg-main2': currentMood == 4 }"
            class="emoji trans w-12 h-12 p-2 mx-2 cursor-pointer rounded hover:bg-main2"
          />
          <p class="text-center text-xs text-accent2">great</p>
        </div>
      </div>
      <textarea
        id="day-description-box"
        v-model="currentDescription"
        placeholder="✏️ write about it.."
        class="trans w-full h-40 mt-4 p-4 border-2 border-white focus:border-accent1 resize-none rounded"
      ></textarea>

      <button
        @click="submitEntry"
        class="trans p-2 bg-accent2 rounded text-white mt-4 hover:bg-accent1"
      >save entry</button>
    </div>
  </div>
</template>

<script>
import Info from "./Info";
import moment, { utc } from "moment";
import VerySadEmoji from "../../assets/emojis/svg/051-embarrassed.svg";
import SadEmoji from "../../assets/emojis/svg/051-sad-2.svg";
import NeutralEmoji from "../../assets/emojis/svg/051-confused.svg";
import HappyEmoji from "../../assets/emojis/svg/051-happy-2.svg";
import VeryHappyEmoji from "../../assets/emojis/svg/051-happy-5.svg";

export default {
  name: "Routine",
  components: {
    Info,
    VerySadEmoji,
    SadEmoji,
    NeutralEmoji,
    HappyEmoji,
    VeryHappyEmoji
  },
  data() {
    return {
      showInfo: false,
      showMoodError: false,
      isMobile: false,

      currentMood: null,
      currentDescription: ""
    };
  },
  mounted() {
    if (window.innerWidth < 500) {
      this.isMobile = true;
    } else {
      this.isMobile = false;
    }
  },
  methods: {
    toggleInfo: function() {
      this.showInfo = true;
    },
    setMood: function(mood) {
      this.currentMood == mood
        ? (this.currentMood = null)
        : (this.currentMood = mood);
    },
    submitEntry: async function() {
      if (this.currentMood == null) {
        this.showMoodError = true;
        return;
      }

      // API call
      const payload = {
        userId: this.$store.getters.userId,
        entryDate: this.currentTime(),
        entryLong: this.$refs["info"].currentLong,
        entryLat: this.$refs["info"].currentLat,
        entryCity: this.$refs["info"].currentLocationCity,
        entryState: this.$refs["info"].currentLocationState,
        entryWeatherCondition: this.$refs["info"].currentWeather,
        entryWeatherTemp: this.$refs["info"].currentTemperature,
        entryWeatherIcon: this.$refs["info"].currentWeatherIcon,
        entryRating: this.currentMood,
        entryDescription: this.currentDescription
      };

      console.log(payload);

      await this.axios
        .post(process.env.VUE_APP_NEWENTRY_API, payload, {
          headers: { "auth-token": this.$store.getters.userToken }
        })
        .then(response => {
          this.$emit("new-entry");
        })
        .catch(error => {
          console.log(error);
        });
    },
    currentTime: function() {
      const utcTime = moment().unix();

      return utcTime;
    }
  }
};
</script>

<style>
#routine-card {
  -webkit-box-shadow: 0px 10px 9px 0px rgba(0, 0, 0, 0.29);
  -moz-box-shadow: 0px 10px 9px 0px rgba(0, 0, 0, 0.29);
  box-shadow: 0px 10px 9px 0px rgba(0, 0, 0, 0.29);
}

#mood-error {
  width: 18rem;

  top: -2rem;
  right: 0;
  left: 0;
  margin: auto;
}

.trans {
  transition: all 0.5s ease;
}
</style>
