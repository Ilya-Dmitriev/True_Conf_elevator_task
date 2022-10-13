<template>
  <div 
    class="elevator-row"
    :style="{minHeight: `${elevatorProps.maxFloor * 10}rem`}"
  >
    <elevator-cabin :elevatorProps="elevatorProps"/>
  </div>
</template>

<script>
import ElevatorCabin from "@components/ElevatorCabin.vue";

export default {
  name: "ElevatorRow",
  components: { ElevatorCabin },
  props: {
    elevatorProps: {
      type: Object,
      required: true,
    },
  },
};
</script>

<style lang="scss" scoped>
.elevator-row {
  min-width: 10rem;
  margin: 0 1rem;
  box-sizing: border-box;
  border-left: 2px solid teal;
  border-right: 2px solid teal;

  position: relative;
}
</style>
