<template>
  <div id="app">
    <router-view />
  </div>
</template>

<script>
export default {
  name: "App",
  created() {
    const token = localStorage.getItem("token");
    if (token) {
      this.$store.dispatch("autoSignin", token);
    }
  }
};
</script>

<style lang="sass">
@import "./app.sass"
</style>

