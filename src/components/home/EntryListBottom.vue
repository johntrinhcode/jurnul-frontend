<template>
  <div id="entries" class="absolute flex items-center bottom-0 h-48 w-full">
    <ul class="relative flex w-128 h-full items-center mx-auto">
      <LeftArrow
        id="left-arrow"
        v-bind:class="{ 'cursor-not-allowed opacity-50': atEnd }"
        @click="goBackward"
        class="trans fill-current text-accent2 cursor-pointer"
      />
      <transition-group v-bind:name="transitionName" class="flex mx-auto">
        <div
          v-for="entry in visibleEntries"
          :key="entry.date"
          :class="{
            'border-accent2': isSelected(entry)
          }"
          @click="() => selectEntry(entry)"
          class="trans entry-item w-40 flex items-center p-2 bg-main1 text-accent2 mx-2 rounded-lg cursor-pointer border-2 border-main1 hover:border-accent2"
        >
          <component
            class="w-8 h-8 m-2"
            :is="moodImage[entry.rating]"
          ></component>
          <p class="select-none">{{ convertTime(entry) }}</p>
        </div>
      </transition-group>
      <RightArrow
        id="right-arrow"
        v-bind:class="{ 'cursor-not-allowed opacity-50': atBeginning }"
        @click="goForward"
        class="trans fill-current text-accent2 cursor-pointer"
      />
    </ul>
  </div>
</template>

<script>
import moment from "moment";
import VerySadEmoji from "../../assets/emojis/svg/051-embarrassed.svg";
import SadEmoji from "../../assets/emojis/svg/051-sad-2.svg";
import NeutralEmoji from "../../assets/emojis/svg/051-confused.svg";
import HappyEmoji from "../../assets/emojis/svg/051-happy-2.svg";
import VeryHappyEmoji from "../../assets/emojis/svg/051-happy-5.svg";
import LeftArrow from "../../assets/icons/svg/icon-arrow-left.svg";
import RightArrow from "../../assets/icons/svg/icon-arrow-right.svg";

export default {
  name: "Entries",
  components: {
    VerySadEmoji,
    SadEmoji,
    NeutralEmoji,
    HappyEmoji,
    VeryHappyEmoji,
    LeftArrow,
    RightArrow
  },
  data() {
    return {
      maxVisibleEntries: 3,
      visibleEntries: [],
      currentOffset: 0,
      transitionName: "",
      moodImage: {
        0: VerySadEmoji,
        1: SadEmoji,
        2: NeutralEmoji,
        3: HappyEmoji,
        4: VeryHappyEmoji
      }
    };
  },
  mounted() {
    this.updateVisibleEntries(this.currentOffset);
  },
  computed: {
    allEntries: function() {
      return this.$store.getters.userInfo.entries;
    },
    atEnd: function() {
      return (
        this.currentOffset + this.maxVisibleEntries == this.allEntries.length
      );
    },
    atBeginning: function() {
      return this.currentOffset == 0;
    }
  },
  methods: {
    selectEntry: function(entry) {
      this.$store.dispatch("selectEntry", entry);
    },
    isSelected: function(entry) {
      if (this.$store.getters.selectedEntry) {
        const selectedEntry = this.$store.getters.selectedEntry;
        return selectedEntry.date == entry.date;
      }
      return false;
    },
    goBackward: function() {
      if (!this.atEnd) {
        this.currentOffset = this.currentOffset + 1;
        this.transitionName = "left2right";

        this.visibleEntries.pop();
        this.visibleEntries.unshift(
          this.allEntries[
            this.allEntries.length - this.currentOffset - this.maxVisibleEntries
          ]
        );
      }
    },
    goForward: function() {
      if (!this.atBeginning) {
        this.currentOffset = this.currentOffset - 1;
        this.transitionName = "right2leftv2";

        this.visibleEntries.shift();
        this.visibleEntries.push(
          this.allEntries[this.allEntries.length - this.currentOffset - 1]
        );
      }
    },
    convertTime: function(time) {
      if (time) {
        return moment.unix(time.date).format("MMM D, YYYY");
      }
    },
    addEntry: function() {
      if (this.currentOffset == 0) {
        if (this.visibleEntries.length < this.maxVisibleEntries) {
          this.visibleEntries.push(this.allEntries[this.allEntries.length - 1]);
        } else {
          this.transitionName = "right2leftv2";

          this.visibleEntries.shift();
          this.visibleEntries.push(this.allEntries[this.allEntries.length - 1]);
        }
      } else {
        this.currentOffset += 1;
      }
    },
    updateVisibleEntries: function() {
      this.currentOffset = 0;
      this.visibleEntries = [];

      const max =
        this.allEntries.length < this.maxVisibleEntries
          ? this.allEntries.length
          : this.maxVisibleEntries;

      for (let i = 0; i < max; i++) {
        this.visibleEntries.push(
          this.allEntries[this.allEntries.length - i - 1]
        );
      }

      this.visibleEntries = this.visibleEntries.reverse();
    }
  }
};
</script>

<style>
.entry-item {
  -webkit-box-shadow: 0px 10px 9px 0px rgba(0, 0, 0, 0.09);
  -moz-box-shadow: 0px 10px 9px 0px rgba(0, 0, 0, 0.09);
  box-shadow: 0px 10px 9px 0px rgba(0, 0, 0, 0.09);
}

#left-arrow {
  position: absolute;
  left: -4rem;
}

#right-arrow {
  position: absolute;
  right: -4rem;
}
</style>
