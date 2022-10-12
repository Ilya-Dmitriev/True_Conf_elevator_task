<template>
  <div class="elevator-row"
       :style="{minHeight: `${maxFloor * 10}rem`}"
  >
    <elevator-cabin 
      :floor="floor"
      :maxFloor="maxFloor"/>
    <floor-lines :maxFloor="maxFloor" />
  </div>
</template>

<script>
import FloorLines from "@ui/FloorLines.vue";
import ElevatorCabin from "@components/ElevatorCabin.vue";

export default {
  name: "ElevatorRow",
  components: { FloorLines, ElevatorCabin },
  props: {
    floor: {
      type: Number,
      required: true,
    },
    maxFloor: {
      type: Number,
      required: true,
    },
  },
};
</script>

<style lang="scss" scoped>
.elevator-row {
  min-width: 10rem;
  margin: 1rem;
  box-sizing: border-box;
  border-left: 2px solid teal;
  border-right: 2px solid teal;

  position: relative;
}
</style>
