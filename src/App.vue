<template>
  <elevators-page />
</template>

<script>
import ElevatorsPage from "@/views/ElevatorsPage/ElevatorsPage.vue";

export default {
  components: {
    ElevatorsPage,
  },
};
</script>

<style lang="scss">
:root {
  font-family: $main_font;
  font-size: 10px;
}

#app {
  width: 100vw;
  height: 100vh;
}
</style>
