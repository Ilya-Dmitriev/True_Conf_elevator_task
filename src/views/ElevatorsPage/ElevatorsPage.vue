<template>
  <div class="elevators-wrap">
    <floor-lines :maxFloor="maxFloor"/>
    <elevator-row 
      v-for="elevator in elevatorsList"
      :key="elevator.key"
      :elevatorProps="elevator" />
    <buttons-row 
      :maxFloor="maxFloor" 
      @btnClicked="setNewFloor" />
  </div>

</template>

<script>
import FloorLines from "@ui/FloorLines.vue";
import ElevatorRow from "@components/ElevatorRow.vue";
import ButtonsRow from "@components/ButtonsRow.vue";
import ElevatorsConfig from "@/views/ElevatorsPage/ElevatorsConfig";

export default {
  name: "ElevatorsPage",
  components: { ElevatorRow, ButtonsRow, FloorLines },
  data() {
    return {
      maxFloor: ElevatorsConfig.floors,
      elevatorsList: Array(ElevatorsConfig.elevators)
        .fill(null)
        .map((elem, index) => {
          return { 
            key: index, 
            floor: 1, 
            prevFloor: 1, 
            transitionTime: ElevatorsConfig.passTime,
            maxFloor: ElevatorsConfig.floors 
          };
        }),
    };
  },
  methods: {
    setNewFloor(value) {
      this.elevatorsList[0].prevFloor = this.elevatorsList[0].floor;
      this.elevatorsList[0].floor = value;
    }
  },
};
</script>

<style scoped lang="scss">
.elevators-wrap {
  min-width: 100%;
  min-height: 100%;

  display: flex;
}
</style>
