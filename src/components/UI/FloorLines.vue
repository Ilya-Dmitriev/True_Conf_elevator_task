<template>
  <div
    v-for="index in maxFloor + 1"
    :key="index"
    class="floor-line"
    :style="{ top: `${(100 / this.maxFloor) * (index - 1)}%` }"
  />
</template>

<script>
export default {
  name: "FloorLines",
  props: {
    maxFloor: {
      type: Number,
      required: true,
    },
  },
};
</script>

<style lang="scss" scoped>
.floor-line {
  height: 1px;

  position: absolute;
  right: -12px;
  left: -12px;

  transform: translateY(-50%);

  background-color: rgba(0, 0, 0, 0.371);
}
</style>
