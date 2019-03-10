<template>
  <label class="checkbox">
    <input
      type="checkbox"
      :checked="value"
      @input="$emit('input', $event.target.checked)"
    >
    <span class="checkbox__rect">
      <img
        class="checkbox__icon"
        :src="require('./checkbox.svg')"
        role="presentation"
      >
      <img
        class="checkbox__daw"
        :src="require('./daw.png')"
        role="presentation"
      >
    </span>

    <span class="checkbox__text">
      <slot></slot>
    </span>
  </label>
</template>

<script>
export default {
  name: "CheckBox",
  props: ["value"]
  // props: {
  //   checked: { type: Boolean, default: false },
  //   value: {}
  // }
};
</script>

<style lang="sass" scoped>
@import "~@/sass/utils"

.checkbox
  display: flex
  align-items: center

  position: relative

.checkbox input
  z-index: 1
  position: absolute
  top: 0
  left: 0

  width: 100%
  height: 100%

  cursor: pointer
  opacity: 0

.checkbox input:checked ~ .checkbox__text,
.checkbox input:checked ~ .checkbox__rect .checkbox__daw
  opacity: 1

.checkbox__rect
  position: relative
  width: 30px
  height: 30px

.checkbox__icon
  position: absolute
  top: 0
  left: 0

  width: 100%
  height: 100%

.checkbox__daw
  position: absolute
  top: 50%
  left: 50%
  transform: translate(-50%, -50%)

  transition: $trs
  opacity: 0


.checkbox__text
  margin-left: 8px

  color: $grey
  font-size: 16px

  opacity: 0.5
  transition: $trs

</style>
