<template>
  <div class="elevators-wrap">
    <floor-lines :maxFloor="maxFloor"/>
    <elevator-row 
      v-for="elevator in elevatorsList"
      :key="elevator.key"
      :elevatorProps="elevator" />
    <buttons-row 
      :maxFloor="maxFloor"
      :buttonsState="buttonsList"
      @btnClicked="addFloorToQueue" />
  </div>
</template>

<script>
import ElevatorRow from "@components/ElevatorRow.vue";
import ButtonsRow from "@components/ButtonsRow.vue";
import ElevatorsConfig from "@/views/ElevatorsPage/ElevatorsConfig";
import { UniQueue } from "@/classes/queues";

export default {
  name: "ElevatorsPage",
  components: { ElevatorRow, ButtonsRow },
  data() {
    return {
      maxFloor: ElevatorsConfig.floors,
      transitionTime: ElevatorsConfig.passTime,  
      callsQueue: new UniQueue(),
      buttonsList: Array(ElevatorsConfig.floors).fill(false),
      elevatorsList: Array(ElevatorsConfig.elevators).fill(null).map(this.getNewElevator),
    };
  },
  methods: {
    getNewElevator(elem, index)  {
      return { 
        key: index, 
        floor: 1, 
        direction: "none",
        free: true,
        cabinHeight: 100 / ElevatorsConfig.floors,
        transitionTime: ElevatorsConfig.passTime,
        restingTime: ElevatorsConfig.restTime,
      };
    },
    addFloorToQueue(value){
      if(this.elevatorsList[0].floor !== value){
        this.callsQueue.add(value);
        this.buttonsList[value - 1] = true;
        this.sendElevator(this.elevatorsList[0]);
      }
    },
    sendElevator(elevator){
      if(elevator.free &&  this.callsQueue.length > 0){
        const newFloor = this.callsQueue.take();
        this.setNewFloor(elevator, newFloor);
        elevator.free = false;
        setTimeout(() => {
          elevator.free = true;
          this.buttonsList[newFloor - 1] = false;
        }, elevator.transitionTime + elevator.restingTime);
        setTimeout(() => {
          this.sendElevator(elevator);
        }, elevator.transitionTime + elevator.restingTime + 50);
      };
    },
    setNewFloor(elevator, newFloor) {
      if ((newFloor - elevator.floor) > 0){
        elevator.direction = "up";
      } else if ((newFloor - elevator.floor) < 0){
        elevator.direction = "down";
      } else {
        elevator.direction = "none";
      }
      elevator.transitionTime = Math.abs(elevator.floor - newFloor) * this.transitionTime;
      elevator.floor = newFloor;
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
