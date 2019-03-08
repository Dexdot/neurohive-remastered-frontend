<template>
  <div>
    <Header />
    <h1>Neurohive 2018</h1>
    <p>Первый онлайн-хакатон для разработчиков искусственных нейронных сетей</p>
  </div>
</template>

<script>
import Header from "@/Header";

export default {
  name: "Hero",
  components: {
    Header
  }
};
</script>

<style lang="sass" scoped>
@import "~@/sass/utils"
</style>
