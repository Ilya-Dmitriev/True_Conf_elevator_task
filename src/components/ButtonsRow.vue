<template>
  <div class="buttons-row">
    <my-checkbox 
      v-for="index in maxFloor"
      :key="index"
      class="elevator-button"
      :style="{ top: `${(100 / maxFloor) * (index - 0.5)}%` }" />
    <floor-lines :maxFloor="maxFloor" />
  </div>
</template>

<script>
import FloorLines from "@ui/FloorLines.vue";
import MyCheckbox from "@ui/MyCheckbox.vue";

export default {
  name: "ButtonsRow",
  components: { FloorLines, MyCheckbox },
  props: {
    maxFloor: {
      type: Number,
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
