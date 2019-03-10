<template></template>


<script>
export default {
  name: "Signout",
  created() {
    this.$store.dispatch("signout");
    this.$router.push("/");
  }
};
</script>
