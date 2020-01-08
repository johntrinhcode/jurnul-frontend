<template>
  <div id="app" class="w-screen bg-main2 overflow-hidden">
    <transition v-bind:name="transitionName" mode="out-in">
      <router-view @navigate="toggleNavigateAnimation" @backNavigate="toggleBackAnimation" />
    </transition>
  </div>
</template>

<script>
export default {
  name: "app",
  components: {},
  data() {
    return {
      transitionName: "right2left"
    };
  },
  methods: {
    toggleNavigateAnimation() {
      this.transitionName = "right2left";
    },
    toggleBackAnimation() {
      this.transitionName = "left2right";
    }
  },
  mounted() {
    // Address mobile screens..
    function setDocHeight() {
      document.documentElement.style.setProperty(
        "--vh",
        `${window.innerHeight / 100}px`
      );
    }

    window.addEventListener("resize", function() {
      setDocHeight();
    });

    window.addEventListener("orientationchange", function() {
      setDocHeight();
    });

    setDocHeight();
  }
};
</script>

<style>
* {
  margin: 0;
  padding: 0;
  border: 0;
  outline: 0;
}

#app {
  height: calc(var(--vh, 1vh) * 100);
}
</style>
