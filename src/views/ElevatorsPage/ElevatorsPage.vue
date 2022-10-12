<template>
  <div class="elevators-wrap">
    <elevator-row 
      v-for="elevator in elevatorsList"
      :key="elevator.key"
      :floor="elevator.floor"
      :maxFloor="elevator.maxFloor" />
    <buttons-row :maxFloor="maxFloor" />
  </div>

</template>

<script>
import ElevatorRow from "@components/ElevatorRow.vue";
import ElevatorsConfig from "@/views/ElevatorsPage/ElevatorsConfig";
import ButtonsRow from "@components/ButtonsRow.vue";

export default {
  name: "ElevatorsPage",

  components: { ElevatorRow, ButtonsRow },

  data() {
    return {
      elevatorsList: Array(ElevatorsConfig.elevators)
        .fill(null)
        .map((elem, index) => {
          return { floor: 1, key: index, maxFloor: ElevatorsConfig.floors };
        }),
      maxFloor: ElevatorsConfig.floors,
    };
  },

  methods: {},
};
</script>

<style scoped lang="scss">
.elevators-wrap {
  min-width: 100%;
  min-height: 100%;

  display: flex;
}
</style>
