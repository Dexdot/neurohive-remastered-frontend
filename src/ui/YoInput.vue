<template>
  <div class="input">
    <input
      :type="type"
      :placeholder="placeholder"
      @input="$emit('input', $event.target.value)"
    >
    <div class="input__line"></div>
    <small class="input__text">
      <slot></slot>
    </small>
  </div>
</template>

<script>
export default {
  name: "YoInput",
  props: {
    value: [String, Number],
    type: {
      type: String,
      required: true,
      default: "text"
    },
    placeholder: String
  }
};
</script>

<style lang="sass" scoped>
@import "~@/sass/utils"

.input
  position: relative
  width: 100%

.input input
  width: 100%
  height: 32px
  padding-bottom: 12px

  letter-spacing: 0.01em
  +mul(r)
  font-size: 16px
  color: $grey
.input input::placeholder
  color: $grey

.input__line
  position: absolute
  top: 32px
  left: 0

  width: 100%
  height: 1px

  background: rgba($grey, 0.5)

.input__text
  font-size: 14px
  color: $grey
  
  opacity: 0.5

  display: inline-block
  padding-top: 8px

</style>


