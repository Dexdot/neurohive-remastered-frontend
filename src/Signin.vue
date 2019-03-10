<template>
  <section class="signin">
    <Header dark />

    <div class="signin__form">
      <h1 class="h2">Вход</h1>

      <form
        novalidate
        @submit.prevent="submit"
      >
        <YoInput
          type="email"
          placeholder="Почта"
          v-model="email"
        />
        <YoInput
          type="password"
          placeholder="Пароль"
          v-model="password"
        />
        <NoiseButton
          w="160"
          h="56"
          dark-text
        >Вход</NoiseButton>
      </form>
    </div>
  </section>
</template>

<script>
import Header from "@/Header";
import YoInput from "@/ui/YoInput";
import NoiseButton from "@/ui/NoiseButton";

import { auth } from "@/validate-auth";

export default {
  name: "Signin",
  mixins: [auth],
  components: {
    Header,
    YoInput,
    NoiseButton
  },
  computed: {
    valid() {
      return this.validEmail && this.validPassword;
    }
  },
  methods: {
    async submit() {
      if (this.valid) {
        const { email, password } = this;
        const resp = await this.$store.dispatch("signin", { email, password });
        this.$router.push("/");
      }
    }
  }
};
</script>

<style lang="sass" scoped>
@import "~@/sass/utils"

.h2
  color: $grey
  margin-bottom: 48px

.input
  margin-bottom: 32px

// Signin
.signin
  color: $grey
  background: #f3f3f3

  min-height: 100vh
  padding-top: 10%

  @media (max-width: 1440px)
    padding-top: 12%

.signin__form
  position: absolute
  top: 50%
  left: 50%
  transform: translate(-50%, -50%)

  width: 35%
  max-width: 520px
  min-width: 300px

.noise-button
  margin-left: auto


</style>
