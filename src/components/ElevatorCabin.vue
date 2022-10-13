<template>
  <div
    class="elevator-cabin"
    :class="{ blinkingAnimation: animationON }"
    :style="{
      height: `${100 / elevatorProps.maxFloor}%`,
      bottom: `${(100 / elevatorProps.maxFloor) * (elevatorProps.floor - 1)}%`, 
      transition: `bottom ${transitionTime}s ease-in-out 0s`,
      animationDelay:`${transitionTime}s`,
    }" 
  >
    <div 
      v-if="animationON"
      class="indicator">
      <div 
        v-if="(elevatorProps.prevFloor - elevatorProps.floor) < 0"
        class="arrow-up"/>
      <div 
        v-if="(elevatorProps.prevFloor - elevatorProps.floor) > 0"
        class="arrow-down"/>
      <div class="destination-num">{{elevatorProps.floor}}</div>
    </div>
  </div>
</template>

<script>
export default {
  name: "ElevatorCabin",
  props: {
    elevatorProps: {
      type: Object,
      required: true
    },
  },
  data() {
    return {
      animationON: false,
    };
  },
  computed:{
    transitionTime(){ 
      return Math.abs(this.elevatorProps.floor - this.elevatorProps.prevFloor) * this.elevatorProps.transitionTime;
    }
  },
  watch:{
    "elevatorProps.floor"(){
      this.triggerAnimation();
    }
  },
  methods:{
    triggerAnimation() {
      this.animationON = true;
      console.log(this.animationON);
      setTimeout(() => {
        this.animationON = false;
      }, this.transitionTime * 1000 + 3000);
    }
  }
};
</script>

<style lang="scss" scoped>  
  .elevator-cabin {
    width: 100%;

    display: flex;
    flex-direction: column;
    align-items:center;
    
    position: absolute;

    background-color: aquamarine;

    .indicator {
      width: 60%;
      min-width: 1.6rem;
      height: 15%;
      min-height: 1.6rem;
      margin-top: 10%;

      display: flex;
      align-items: center;
      justify-content: space-around;

      background-color: rgba(0, 0, 0, 0.244);
      border-radius: 0.5rem;

      .arrow-up, .arrow-down{
        width: .1rem;
        height: 1.4rem;

        position: relative;

        background-color: #000;

        &::before, &::after{
          display: block;
          content: "";

          position: absolute;

          width:.1rem;
          height:.7rem;

          background-color: #000;
        }
      }
      .arrow-up {
        &::before, &::after{
          top: 0;
          transform-origin: top;
        }
        &::before{
          transform: rotateZ(-40deg) translateX(-25%);
          
        }
        &::after{
          transform: rotateZ(40deg) translateX(25%);
        }
      }
      .arrow-down{
        &::before, &::after{
          bottom: 0;
          transform-origin: bottom;
        }
        &::before{
          transform: rotateZ(-40deg) translateX(25%);
          
        }
        &::after{
          transform: rotateZ(40deg) translateX(-25%);
        }
      }
      .destination-num{
        font-size: 1.6rem;
        font-weight: bold;
      }
    }
  }

  .blinkingAnimation {
    animation-name: blinking;
    animation-duration: 3s;
    animation-iteration-count: 1;
  }

  @keyframes blinking {
    from {
      opacity: 1;
    }
    25% {
      opacity: 0.3;
    }
    50% {
      opacity: 1;
    }
    75% {
      opacity: 0.3;
    }
    to {
      opacity: 1;
    }
  }
</style>