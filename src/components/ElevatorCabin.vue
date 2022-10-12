<template>
  <div
    class="elevator-cabin"
    :style="{bottom: `${(100 / maxFloor) * (floor - 1)}%`, height: `${100 / maxFloor}%`}" 
  >
    <div class="indicator-top">
      <div class="arrow-up"/>
      <div class="arrow-down"/>
      <div class="destination-num">{{floor}}</div>
    </div>
  </div>
</template>

<script>
export default {
  name: "ElevatorCabin",
  props: {
    floor: {
      type: Number,
      required: true
    },
    maxFloor: {
      type: Number,
      required: true
    },
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

    .indicator-top {
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
        width: .2rem;
        height: 1.4rem;

        position: relative;

        background-color: #000;
        border-radius: 0.1rem;

        &::before, &::after{
          display: block;
          content: "";

          position: absolute;

          width:.2rem;
          height:.7rem;

          border-radius: 0.1rem;
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
</style>