<template>
  <footer class="footer">
    <div class="container flex ais jcsb">

      <ul class="footer__social flex aic">
        <li>
          <div class="footer__line"></div>
        </li>
        <li>
          <a
            href="https://facebook.com"
            target="_blank"
          >
            <svg-icon icon-class="fb"></svg-icon>
          </a>
        </li>
        <li>
          <a
            href="https://vk.com"
            target="_blank"
          >
            <svg-icon icon-class="vk"></svg-icon>
          </a>
        </li>
        <li>
          <a
            href="https://instagram.com"
            target="_blank"
          >
            <svg-icon icon-class="inst"></svg-icon>
          </a>
        </li>
      </ul>

      <div class="footer__date-container flex ais">
        <div class="footer__line"></div>

        <div class="flex flex-col">
          <time class="footer__date">Дедлайн — 9 мая</time>

          <ul class="flex ais">
            <li>
              <b>22</b>
              <small>дня</small>
            </li>
            <li>
              <b>14</b>
              <small>часов</small>
            </li>
            <li>
              <b>44</b>
              <small>минут</small>
            </li>
          </ul>

        </div>
      </div>

    </div>
  </footer>
</template>

<script>
export default {
  name: "Footer"
};
</script>

<style lang="sass" scoped>
@import "~@/sass/utils"

// Line
.footer__line
  width: 96px
  height: 2px
  background: $lt


// Social
.footer__social .footer__line
  margin-top: -5px

.footer__social li:not(:last-child)
  +ff('margin-right', (1300px: 32px, 1900px: 56px))

.footer__social a
  width: 16px
  height: 16px

.footer__social svg
  width: 16px
  height: 16px
  fill: $w


// Date
.footer__date-container .footer__line
  margin-top: 4px
  margin-right: 24px

.footer__date
  +mul(b)
  color: $ttl
  font-size: 16px
  letter-spacing: 0.1em
  text-transform: uppercase

.footer__date-container ul
  padding-top: 16px

.footer__date-container ul li:not(:last-child)
  margin-right: 40px  

.footer__date-container ul b
  display: block
  margin-bottom: 8px

  +cl
  color: $lt
  font-size: 27px
  letter-spacing: 4.8px
  text-transform: uppercase

.footer__date-container ul small
  color: $ttl
  font-size: 11px
  letter-spacing: 2px
  text-transform: uppercase

</style>

