<template>
  <div>
    <header class="header">
      <div class="container">
        <div class="flex jcfe">
          <GlitchLink
            to="/signin"
            text="Вход"
          ></GlitchLink>
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
import GlitchLink from "@/ui/GlitchLink";

export default {
  name: "Header",
  components: {
    GlitchLink
  },
  data: () => ({
    links: [
      { to: "/about", text: "О конкурсе" },
      { to: "/projects", text: "Проекты" },
      { to: "/chat", text: "Телеграм-чат" },
      { to: "/form", text: "Подать заявку" },
      { to: "/faq", text: "FAQ" }
    ]
  })
};
</script>


<style lang="sass" scoped>
@import "~@/sass/utils"

.header
  padding-top: 32px
  
.header__logo-icon
  +ff('width', (1300px: 230px, 1900px: 330px))
  +ff('height', (1300px: 56px, 1900px: 80px))

.header__nav
  margin-left: auto

.header__nav li:not(:first-child)
  +ff('margin-left', (1300px: 56px, 1900px: 96px, 2500px: 120px))
</style>
