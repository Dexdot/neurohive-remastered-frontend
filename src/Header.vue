<template>
  <div>
    <header :class="['header', { 'header--dark': dark }]">
      <div class="container">
        <div class="flex jcfe">

          <template v-if="loggedIn">
            <GlitchLink
              to="/project"
              :text="user.name"
              color="#799dff"
            ></GlitchLink>
            <span class="header__spacer">|</span>
            <GlitchLink
              to="/signout"
              text="Выход"
            ></GlitchLink>
          </template>

          <template v-else>
            <GlitchLink
              to="/signin"
              text="Вход"
            ></GlitchLink>
          </template>

        </div>

        <div class="flex aic">
          <router-link
            to="/"
            class="header__logo"
          >
            <svg-icon
              class="header__logo-icon"
              icon-class="logo"
            ></svg-icon>
          </router-link>

          <nav class="header__nav">
            <ul class="flex aic">
              <li
                v-for="link in links"
                :key="link.to"
              >
                <GlitchLink
                  :to="link.to"
                  :text="link.text"
                ></GlitchLink>
              </li>
            </ul>
          </nav>
        </div>
      </div>
    </header>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import GlitchLink from "@/ui/GlitchLink";

export default {
  name: "Header",
  components: {
    GlitchLink
  },
  props: {
    dark: {
      type: Boolean,
      default: false
    }
  },
  data: () => ({
    links: [
      { to: "/about", text: "О конкурсе" },
      { to: "/projects", text: "Проекты" },
      { to: "/chat", text: "Телеграм-чат" },
      { to: "/form", text: "Подать заявку" },
      { to: "/faq", text: "FAQ" }
    ]
  }),
  computed: {
    ...mapGetters(["user", "loggedIn"])
  }
};
</script>


<style lang="sass" scoped>
@import "~@/sass/utils"

.header
  position: absolute
  top: 0
  left: 0
  right: 0
  
  padding-top: 32px
  
.header__logo
  +link(#fff)

.header__logo-icon
  +ff('width', (1300px: 230px, 1900px: 330px))
  +ff('height', (1300px: 56px, 1900px: 80px))

.header__nav
  margin-left: auto

.header__nav li:not(:first-child)
  +ff('margin-left', (1300px: 56px, 1900px: 96px, 2500px: 120px))

.header__spacer
  margin: 0 16px
  display: inline-block
  transform: translateY(-2px)

.header--dark
  .glitch-link
    +link($grey)

  .header__logo
    +link($grey)

</style>
