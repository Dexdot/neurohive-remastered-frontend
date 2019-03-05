<template>
  <svg
    :fill="fill"
    :stroke="stroke"
    aria-hidden="true"
  >
    <use :xlink:href="iconName" />
  </svg>
</template>

<script>
export default {
  name: "svg-icon",
  props: {
    fill: {
      type: String,
      default: "none"
    },
    stroke: {
      type: String,
      default: "none"
    },
    iconClass: {
      type: String,
      required: true
    },
    className: {
      type: String,
      default: ""
    }
  },
  computed: {
    iconName() {
      return `#icon-${this.iconClass}`;
    }
  }
};
</script>

<style lang="sass" scoped>
svg
  vertical-align: -0.15em
</style>
