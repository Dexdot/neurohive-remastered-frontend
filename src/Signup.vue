<template>
  <div class="container">
    <h1 class="h2">Подать заявку</h1>
    <h2 class="h4">Заявка — еще не участие</h2>

    <NoiseButton>F.A.Q</NoiseButton>
  </div>
</template>

<script>
import NoiseButton from "@/ui/NoiseButton";

export default {
  name: "Signup",
  components: {
    NoiseButton
  }
};
</script>

<style lang="sass" scoped>
@import "~@/sass/utils"

.h2,
.h4
  color: $grey

</style>

<style lang="sass">
@import "~@/sass/utils"

body
  color: $grey
  background: #f3f3f3
</style>

