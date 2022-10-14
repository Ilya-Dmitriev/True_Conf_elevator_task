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
      callsQueue: sessionStorage.getItem("callsQueue") 
        ? new UniQueue(JSON.parse(sessionStorage.getItem("callsQueue")).queue) 
        : new UniQueue([]),
      buttonsList: sessionStorage.getItem("buttonsList") 
        ? JSON.parse(sessionStorage.getItem("buttonsList")) 
        : Array(ElevatorsConfig.floors).fill(false),
      elevatorsList: sessionStorage.getItem("elevatorsList") 
        ? JSON.parse(sessionStorage.getItem("elevatorsList")) 
        : Array(ElevatorsConfig.elevators).fill(null).map(this.getNewElevator),
    };
  },
  mounted() {
    this.elevatorsList.forEach(
      (elevator) => {
        elevator.free = true;
        this.buttonsList[elevator.floor - 1] = false;
        setTimeout(() => {this.sendElevator();}, 1000);
      });
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
        this.savePoint();
        this.sendElevator();
      }
    },
    sendElevator(){
      const elevator = this.findNearestElevator(this.elevatorsList, this.callsQueue.first);
      if(elevator?.free &&  this.callsQueue.length > 0){
        const newFloor = this.callsQueue.take();
        sessionStorage.setItem("callsQueue", JSON.stringify(this.callsQueue));
        this.setNewFloor(elevator, newFloor);
        elevator.free = false;
        this.savePoint();
        setTimeout(() => {
          elevator.free = true;
          this.buttonsList[newFloor - 1] = false;
        }, elevator.transitionTime + elevator.restingTime);
        setTimeout(() => {
          this.savePoint();
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
    savePoint(){
      sessionStorage.setItem("callsQueue", JSON.stringify(this.callsQueue));
      sessionStorage.setItem("buttonsList", JSON.stringify(this.buttonsList));
      sessionStorage.setItem("elevatorsList", JSON.stringify(this.elevatorsList));
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
