<template>
  <div
    class="elevator-cabin"
    :class="{ blinkingAnimation: !elevatorProps.free }"
    :style="{
      height: `${elevatorProps.cabinHeight}%`,
      bottom: `${elevatorProps.cabinHeight * (elevatorProps.floor - 1)}%`, 
      transition: `bottom ${elevatorProps.transitionTime}ms ease-in-out 0s`,
      animationDelay:`${elevatorProps.transitionTime}ms`,
    }" 
  >
    <div 
      v-if="!elevatorProps.free"
      class="indicator">
      <div 
        v-if="elevatorProps.direction === 'up'"
        class="arrow-up"/>
      <div 
        v-if="elevatorProps.direction === 'down'"
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
};
</script>

<style lang="scss" scoped>  
  .elevator-cabin {
    width: 100%;
    min-height: 10rem;

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