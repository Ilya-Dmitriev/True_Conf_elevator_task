<template>
  <div class="buttons-row">
    <floor-button 
      v-for="index in maxFloor"
      :key="maxFloor - index + 1"
      :number="maxFloor - index + 1"
      :active="buttonsState[maxFloor - index]"
      class="elevator-button"
      :style="{ top: `${(100 / maxFloor) * (index - 0.5)}%` }"
      @cliked="value => $emit('btnClicked', value)"/>
  </div>
</template>

<script>

export default {
  name: "ButtonsRow",
  props: {
    maxFloor: {
      type: Number,
      required: true,
    },
    buttonsState: {
      type: Array,
      required: true,
    },
  },
};
</script>

<style lang="scss" scoped>
.buttons-row {
  min-width: 2rem;
  flex-grow: 1;

  margin: 1rem 12px;
  box-sizing: border-box;

  position: relative;

  .elevator-button {
    position: absolute;

    transform: translateY(-50%);
  }
}
</style>
