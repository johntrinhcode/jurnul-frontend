<template>
  <div class="flex w-full h-full px-8">
    <div id="entry-view" class="relative w-full md:w-128 bg-main1 mx-auto my-auto rounded p-4">
      <component id="entry-rating" :is="moodImage[rating]"></component>
      <CloseButton
        @click="$store.dispatch('deselectEntry')"
        class="absolute top-0 right-0 fill-current text-accent2 m-2 cursor-pointer"
      />

      <p class="text-center text-accent2 text-4xl font-bold font-display leading-tight">{{ date }}</p>
      <div id="info-row" class="flex w-full items-center">
        <div class="flex w-full items-center text-left text-sm text-accent2">
          <img :src="weatherIcon" class="w-12 h-12" />
          <div>
            <p class="text-xs leading-none">{{ Math.round(temperature * 10) / 10 }}&#8457;</p>
            <p class="text-xs leading-none">{{ condition }}</p>
          </div>
        </div>
        <p class="w-full text-center text-sm text-accent2">{{ time }}</p>
        <p class="w-full text-right text-sm text-accent2">{{ city }}, {{ state }}</p>
      </div>
      <div
        class="w-full h-32 border-2 border-main2 bg-main2 rounded p-4 mt-4 overflow-y-scroll hide-scroll"
      >
        <p class="text-accent2">{{ description }}</p>
      </div>
    </div>
  </div>
</template>

<script>
import moment from "moment";
import CloseButton from "../../assets/icons/svg/icon-x.svg";
import VerySadEmoji from "../../assets/emojis/svg/051-embarrassed.svg";
import SadEmoji from "../../assets/emojis/svg/051-sad-2.svg";
import NeutralEmoji from "../../assets/emojis/svg/051-confused.svg";
import HappyEmoji from "../../assets/emojis/svg/051-happy-2.svg";
import VeryHappyEmoji from "../../assets/emojis/svg/051-happy-5.svg";

export default {
  name: "EntryView",
  components: {
    CloseButton,
    VerySadEmoji,
    SadEmoji,
    NeutralEmoji,
    HappyEmoji,
    VeryHappyEmoji
  },
  data() {
    return {
      moodImage: {
        0: VerySadEmoji,
        1: SadEmoji,
        2: NeutralEmoji,
        3: HappyEmoji,
        4: VeryHappyEmoji
      }
    };
  },
  props: {
    entry: {
      required: true
    }
  },
  computed: {
    rating: function() {
      return this.entry.rating;
    },
    date: function() {
      return moment.unix(this.entry.date).format("MMM D, YYYY");
    },
    city: function() {
      return this.entry.location.city;
    },
    state: function() {
      return this.entry.location.state;
    },
    time: function() {
      return moment.unix(this.entry.date).format("h:mm a");
    },
    description: function() {
      return this.entry.description;
    },
    weatherIcon: function() {
      return this.entry.weather.icon;
    },
    temperature: function() {
      return this.entry.weather.temperature;
    },
    condition: function() {
      return this.entry.weather.condition;
    }
  }
};
</script>

<style>
#entry-view {
  -webkit-box-shadow: 0px 10px 9px 0px rgba(0, 0, 0, 0.29);
  -moz-box-shadow: 0px 10px 9px 0px rgba(0, 0, 0, 0.29);
  box-shadow: 0px 10px 9px 0px rgba(0, 0, 0, 0.29);
}

#entry-rating {
  position: absolute;
  top: -1rem;
  left: -1rem;

  width: 3.5rem;
  height: 3.5rem;
}

.hide-scroll::-webkit-scrollbar {
  display: none;
}
</style>
