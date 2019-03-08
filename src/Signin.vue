<template>
  <form @submit.prevent="submit">
    <YoInput
      type="email"
      v-model="email"
      placeholder="Почта"
    ></YoInput>
    <YoInput
      type="password"
      v-model="password"
      placeholder="Пароль"
    ></YoInput>
  </form>
</template>

<script>
import YoInput from "@/ui/YoInput";

export default {
  name: "Signin",
  components: {
    YoInput
  },
  data: () => ({
    email: "",
    password: ""
  }),
  methods: {
    submit() {}
  }
};
</script>

