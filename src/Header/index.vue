<template>
  <header class="header">
    <div class="container">
      <router-link
        to="/"
        class="header__logo"
      >
        <svg-icon
          class="header__logo-icon"
          icon-class="logo"
        ></svg-icon>
      </router-link>
    </div>
  </header>
</template>

<script>
export default {
  name: "Header"
};
</script>


<style lang="sass" scoped>
@import "~@/sass/utils"

.header
  padding-top: 40px
.header__logo
.header__logo-icon
  +ff('width', (1300px: 230px, 1900px: 330px))
  +ff('height', (1300px: 56px, 1900px: 80px))
  width: 19%
</style>
