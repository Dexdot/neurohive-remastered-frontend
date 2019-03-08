<template>
  <router-link
    class="glitch-link"
    @mouseenter.native="mouseenter"
    @mouseleave.native="reset"
    :style="size"
    :to="to"
  >{{ textContent }}</router-link>
</template>

<script>
export default {
  name: "GlitchLink",
  props: {
    to: String,
    text: String
  },
  data: () => ({
    pool: "!<>-_\\/[]{}—=+*^?#________",
    interval: 0,
    size: {},
    textContent: ""
  }),
  created() {
    // Задаем оригинальный текст
    this.textContent = this.text;
  },
  mounted() {
    // Задаем размеры, чтобы не прыгало
    this.size = {
      width: `${this.$el.offsetWidth}px`,
      height: `${this.$el.offsetHeight}px`
    };
  },
  methods: {
    mouseenter() {
      let i = 1;

      this.interval = setInterval(() => {
        // Ресетим после 3х раз
        if (i > 3) {
          this.reset();
          return false;
        }

        // Рандомими текст
        this.createRandomText();
        i++;
      }, 150);
    },
    createRandomText() {
      let text = "";
      let possible = this.pool + this.text;

      for (let i = 0; i < this.text.length; i++) {
        text += possible.charAt(Math.floor(Math.random() * possible.length));
      }

      this.textContent = text;
    },
    reset() {
      this.textContent = this.text;
      window.clearInterval(this.interval);
    }
  }
};
</script>


<style lang="sass" scoped>
@import "~@/sass/utils"

.glitch-link
  display: inline-block
  white-space: nowrap

  +mul(m)
  color: $w
  font-size: 12px
  letter-spacing: 0.1em  
  text-transform: uppercase

</style>
