<template>
  <div class="elevators-wrap">
    <floor-lines 
      :maxFloor="maxFloor"
      :elevatorsNum="elevatorsNum"
    />
    <elevator-row 
      v-for="elevator in elevatorsList"
      :key="elevator.key"
      :elevatorProps="elevator" 
      :maxFloor="maxFloor"/>
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
      elevatorsNum: ElevatorsConfig.elevators,
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
    addFloorToQueue(newFloor){
      const isUnlocked = !this.elevatorsList.find((elevator) => {
        return elevator.floor === newFloor;
      });
      if(isUnlocked){
        this.callsQueue.add(newFloor);
        this.buttonsList[newFloor - 1] = true;
        this.sendElevator();
      }
    },
    sendElevator(){
      const elevator = this.findNearestElevator(this.elevatorsList, this.callsQueue.first);
      if(elevator?.free &&  this.callsQueue.length > 0){
        const newFloor = this.callsQueue.take();
        this.setNewFloor(elevator, newFloor);
        elevator.free = false;
        setTimeout(() => {
          elevator.free = true;
          this.buttonsList[newFloor - 1] = false;
        }, elevator.transitionTime + elevator.restingTime);
        setTimeout(() => {
          this.sendElevator();
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
    },
    findNearestElevator(elevatorsList, newFloor){
      let minDif = this.maxFloor;
      let nearestElevator = undefined;
      elevatorsList.forEach((elevator) => {
        if (elevator.free){
          let dif = Math.abs(elevator.floor - newFloor);
          if (dif < minDif){
            minDif = dif;
            nearestElevator = elevator;
          }
        }
      });
      return nearestElevator;
    },
  },
};
</script>

<style scoped lang="scss">
.elevators-wrap {
  min-width: 100%;
  min-height: 100%;

  position: relative;

  display: flex;
}
</style>
