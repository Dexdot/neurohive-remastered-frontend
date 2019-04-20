<template>
  <section class="hero">
    <Header />

    <h1>Neurohive 2018</h1>
    <p>Первый онлайн-хакатон для разработчиков искусственных нейронных сетей</p>

    <div class="hero__footer">
      <Footer />
    </div>
  </section>
</template>

<script>
import Header from "@/Header";
import Footer from "@/Footer";

export default {
  name: "Hero",
  components: {
    Header,
    Footer
  }
};
</script>

<style lang="sass" scoped>
@import "~@/sass/utils"

.hero
  position: relative
  min-height: 100vh

.hero__footer
  position: absolute
  bottom: 6.5%
  left: 0
  right: 0

</style>
