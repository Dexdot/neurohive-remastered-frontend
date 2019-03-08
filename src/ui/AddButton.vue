<template>
  <label class="add-button">
    <input
      :type="type"
      @input="$emit('input', $event.target.value)"
      @click="$emit('click')"
    >
    <span class="add-button__circle"></span>
    <span class="add-button__text">
      <slot>Отправить</slot>
    </span>
  </label>
</template>

<script>
export default {
  name: "AddButton",
  props: {
    value: {},
    type: {
      type: String,
      default: "button"
    }
  }
};
</script>

<style lang="sass" scoped>
@import "~@/sass/utils"

.add-button
  display: flex
  align-items: center

  position: relative

.add-button input
  z-index: 1
  position: absolute
  top: 0
  left: 0

  width: 100%
  height: 100%

  opacity: 0

.add-button__circle
  position: relative

  display: block
  width: 24px
  height: 24px

  border-radius: 50%
  border: 1px solid $lt
  border-right: 1px solid transparent

.add-button__circle::before,
.add-button__circle::after
  content: ''
  position: absolute
  top: 50%
  left: 50%
  transform: translate(-50%, -50%)

  background: $lt

.add-button__circle::before
  width: 1px
  height: 8px

.add-button__circle::after
  height: 1px
  width: 8px

.add-button__text
  position: relative

  color: $lt
  font-size: 16px
  margin-left: 8px

.add-button__text::before
  content: ''
  position: absolute
  bottom: -4px
  left: 0

  width: 100%
  height: 1px

  background: $lt
  transform-origin: 0% 50%
  transition: 0.25s cubic-bezier(.68,.07,.41,.99)
  transform: scaleX(0)

.add-button:hover .add-button__text::before
  transform: scaleX(1)

</style>
