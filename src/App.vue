<template>
  <div id="app" class="w-screen bg-main2">
    <transition v-bind:name="transitionName" mode="out-in">
      <router-view
        @navigate="toggleNavigateAnimation"
        @backNavigate="toggleBackAnimation"
      />
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

/* ------- */

.right2left-enter-active,
.right2left-leave-active {
  transition: all 0.3s ease-out;
}

.right2left-enter-to,
.right2left-leave {
  opacity: 1;
}
.right2left-enter {
  opacity: 0;
  transform: translateX(100px);
}

.right2left-leave-to {
  opacity: 0;
  transform: translateX(-100px);
}

/* ------- */

.left2right-enter-active,
.left2right-leave-active {
  transition: all 0.3s ease-in-out;
}

.left2right-enter-to,
.left2right-leave {
  opacity: 1;
}
.left2right-enter {
  opacity: 0;
  transform: translateX(-100px);
}

.left2right-leave-to {
  opacity: 0;
  transform: translateX(100px);
}

/* --------- */
.right2leftv2-enter-active,
.right2leftv2-leave-active {
  transition: all 0.3s ease-out;
}

.right2leftv2-leave-active {
  position: absolute;
}

.right2leftv2-enter-to,
.right2leftv2-leave {
  opacity: 1;
}
.right2leftv2-enter {
  opacity: 0;
  transform: translateX(100px);
}

.right2leftv2-leave-to {
  opacity: 0;
  transform: translateX(-100px);
}
</style>
