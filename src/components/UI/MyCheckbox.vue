<template>
  <input 
    type="checkbox"
    class="checkbox">
</template>

<script>
export default {
  name: "MyCheckbox",
};
</script>

<style lang="scss" scoped>
.checkbox {
  position: relative;
  cursor: pointer;

  &::before {
    display: block;
    content: "";

    width: 110%;
    height: 110%;

    position: absolute;
    top: -20%;
    left: -20%;

    background-color: #fff;
    border: 2px solid rgb(0, 147, 147);
    border-radius: 50%;
  }

  &:checked {
    &::after {
      display: block;
      content: "";

      width: 90%;
      height: 90%;

      position: absolute;
      top: 5%;
      left: 5%;

      background-color: rgb(0, 147, 147);
      border-radius: 50%;
    }
  }
}
</style>