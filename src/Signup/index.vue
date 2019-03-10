<template>
  <div class="signup">
    <Header dark />
    <section class="signup__container container">
      <h1 class="h2">Подать заявку</h1>
      <h2 class="h4">Заявка — еще не участие</h2>
      <div class="flex">

        <div class="signup__info">
          <ul class="signup__rules">
            <li
              class="flex ais"
              v-for="(rule, i) in rules"
              :key="i"
            >
              <img
                :src="require('./list-icon.png')"
                role="presentation"
              >
              <p v-html="rule">
              </p>
            </li>
          </ul>

          <NoiseButton
            @click="$router.push('/faq')"
            w="224"
            grey
            dark-text
          >F.A.Q</NoiseButton>
        </div>

        <form
          novalidate
          class="signup__form"
          @submit.prevent="submit"
        >
          <YoInput
            type="email"
            placeholder="Почта"
            v-model="email"
            :valid="validEmail"
          >
            Мы напишем вам, если в заявке чего-то не хватает
          </YoInput>
          <YoInput
            type="password"
            placeholder="Пароль"
            v-model="password"
            :valid="validPassword"
          >
            Не менее: 8 символов, 1 прописной, 1 цифры
          </YoInput>
          <YoInput
            type="text"
            placeholder="Имя"
            v-model="name"
            :valid="name.length > 1"
          >
            Заявку подает один человек, даже если участвует команда
          </YoInput>
          <YoInput
            type="text"
            placeholder="Контакт в телеграме"
            v-model="telegram"
            :valid="telegram.length > 1"
          >
            Мы напишем вам, если в заявке чего-то не хватает
          </YoInput>
          <YoInput
            type="text"
            placeholder="Название проекта"
            v-model="projectName"
            :valid="projectName.length > 1"
          >
            Например, «Приложение, которое создает рецепты блюд по фотографиям еды»
          </YoInput>
          <YoInput
            type="text"
            placeholder="Краткое описание проекта"
            v-model="projectDescription"
            :valid="projectDescription.length > 1"
          >
            Два-три предложения о том, как будет работать ваш продукт
          </YoInput>

          <h3>Состав команды</h3>

          <ul class="signup__team">
            <li
              :key="mate.id"
              v-for="(mate, i) in team"
            >
              <div class="signup__mate">
                <span>{{ indexMate(i) }}.</span>
                <button
                  v-if="i > 0"
                  @click="removeMate(i)"
                  type="button"
                >Удалить участника</button>
              </div>
              <YoInput
                type="text"
                placeholder="Имя"
                v-model="mate.name"
                :valid="mate.name.length > 1"
              />
              <YoInput
                type="text"
                placeholder="Роль"
                v-model="mate.role"
                :valid="mate.role.length > 1"
              />
            </li>
          </ul>

          <AddButton
            type="button"
            @click="addMate"
          >Добавить участника</AddButton>

          <CheckBox v-model="checked">Согласен на обработку персональных данных</CheckBox>

          <NoiseButton
            type="submit"
            dark-text
          >Отправить</NoiseButton>

          <p>Мы получили вашу заявку. В течение 1-2 дней мы пришлем вам ссылку на личный кабинет или напишем вам в Телеграме.</p>
        </form>

      </div>
    </section>
  </div>
</template>

<script>
import Header from "@/Header";
import YoInput from "@/ui/YoInput";
import NoiseButton from "@/ui/NoiseButton";
import AddButton from "@/ui/AddButton";
import CheckBox from "@/ui/CheckBox";

import { auth } from "@/validate-auth";

// Unique id for :key
let id = 0;

export default {
  name: "Signup",
  mixins: [auth],
  components: {
    Header,
    YoInput,
    NoiseButton,
    AddButton,
    CheckBox
  },
  data: () => ({
    rules: [
      "Мы рассмотрим вашу заявку за 1-2 дня. Если она соответствует требованиям конкурса, вы получите по почте доступ в личный кабинет",
      "Если в заявке нужно что-то изменить, мы напишем вам в Телеграме и все объясним.",
      "В личном кабинете вы сможете добавить готовый проект и опубликовать его.",
      '10 мая все команды, опубликовавшие свой проект, участвуют в голосовании. Если вы не опубликовали проект, не сможете голосовать. Любой вопрос по конкурсу задавайте в <a target="_blank" href="https://telegram.org/">нашем чате</a>'
    ],
    name: "",
    telegram: "",
    projectName: "",
    projectDescription: "",
    team: [{ name: "", role: "" }],
    checked: ""
  }),
  computed: {
    validFields() {
      return [
        this.name,
        this.telegram,
        this.projectName,
        this.projectDescription
      ].every(v => v.length > 1);
    },
    validTeam() {
      return this.team.every(
        mate => mate.name.length > 1 && mate.role.length > 1
      );
    },
    valid() {
      return (
        this.validEmail &&
        this.validPassword &&
        this.validFields &&
        this.validTeam &&
        this.checked
      );
    }
  },
  methods: {
    async submit() {
      if (this.valid) {
        const {
          email,
          password,
          name,
          telegram,
          projectName,
          projectDescription,
          team
        } = this;

        const data = {
          email,
          password,
          name,
          telegram,
          projectName,
          projectDescription,
          team
        };

        const resp = await this.$store.dispatch("signup", data);
        this.$router.push("/");
      }
    },
    addMate() {
      this.team.push({ name: "", role: "", id: id++ });
    },
    removeMate(i) {
      this.team = this.team.filter((v, index) => index !== i);
    },
    indexMate(i) {
      const index = i + 1;
      return index < 10 ? `0${index}` : `${index}`;
    }
  }
};
</script>

<style lang="sass" scoped>
@import "~@/sass/utils"

// Titles
.h2,
.h4
  color: $grey

.h2
  margin-bottom: 48px
.h4
  margin-bottom: 40px


// Signup
.signup
  color: $grey
  background: #f3f3f3

  padding-top: 10%
  padding-bottom: 8%

  @media (max-width: 1440px)
    padding-top: 12%

.signup__container
  margin: 0 auto
  max-width: calc(#{1300px} + #{$pad} * 2)


// Info
.signup__info
  max-width: 40%


// Rules
.signup__rules
  font-size: 16px
  line-height: 1.6
  margin-bottom: 40px

.signup__rules li
  margin-bottom: 24px

.signup__rules img
  width: 12px
  height: 12px
  margin-top: 4px
  margin-right: 16px

.signup__rules /deep/ a
  +link($lt)


// Form
.signup__mate
  display: flex
  align-items: center
  margin-bottom: 8px

  font-size: 14px
  opacity: 0.6

.signup__mate button
  color: $lt
  margin-left: auto

.signup__form
  +ff('margin-left', (1300px: 88px, 1900px: 112px))
  +ff('padding-left', (1300px: 88px, 1900px: 112px))
  border-left: 1px solid rgba($b, 0.1)

.signup__form p
  font-size: 16px
  line-height: 1.6

.signup__form h3
  margin-top: 48px
  margin-bottom: 24px

.signup__form .add-button
  margin-top: 48px

.signup__form .input,
.signup__form .noise-button,
.signup__form .add-button,
.signup__form .checkbox
  margin-bottom: 32px

</style>