<template>
  <button 
    type="button" 
    class="floor-btn"
    :class="{active: active}"
    @click="$emit('cliked', number)">
    <div class="floor-num">
      {{number}}
    </div>
    <div class="roundes"/>
  </button>
</template>

<script>

export default {
  name: "FloorButton",
  props: {
    active: {
      type: Boolean,
      default: false,
    },
    number: {
      type: Number,
      required: true,
    }
  },
};
</script>

<style lang="scss" scoped>
.floor-btn{
  width: 2rem;
  height: 4rem;
  padding: 0;

  color:rgb(0, 147, 147);

  display: flex;
  flex-direction: column;

  background:none;
  border: none;
  outline: 1px solid currentColor;
  
  transition-duration: all 0.1s;
  .floor-num{
    width: 2rem;
    height: calc(2rem - 1px);

    font-size: 1.6rem;
    text-align: center;

    border-bottom: 1px solid currentColor;
  }

  .roundes {
    width: 2rem;
    height: 2rem;

    position: relative;
    cursor: pointer;

    &::before {
      display: block;
      content: "";

      width: 50%;
      height: 50%;

      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate3d(-50%, -50%, 0);

      background-color: #fff;
      border: 2px solid currentColor;
      border-radius: 50%;
    }
    &::after {
      display: block;
      content: "";

      width: 25%;
      height: 25%;

      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate3d(-50%, -50%, 0);

      background-color: currentColor;
      border-radius: 50%;
    }
  }

  &.active, &:active{
    color: rgb(231, 131, 50);
  }
}
</style>