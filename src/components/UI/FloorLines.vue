<template>
  <div 
    class="floor-lines"
    :style="{
      minHeight: `${this.maxFloor * 10}rem`, 
      minWidth: `calc(${this.elevatorsNum * 12}rem + 44px)`
    }"
  >
    <div
      v-for="index in maxFloor - 1"
      :key="index"
      class="floor-line"
      :style="{ top: `${(100 / this.maxFloor) * index}%` }"
    />
  </div>
</template>

<script>
export default {
  name: "FloorLines",
  props: {
    maxFloor: {
      type: Number,
      required: true,
    },
    elevatorsNum: {
      type: Number,
      required: true,
    }
  },
};
</script>

<style lang="scss" scoped>
.floor-lines{
  position: absolute;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  .floor-line {
    height: 1px;

    position: absolute;
    right: 0;
    left: 0;

    transform: translateY(-50%);

    background-color: rgba(0, 0, 0, 0.371);
  }
}
</style>
