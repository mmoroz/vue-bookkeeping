<template>
  <form class="card auth-card" @submit.prevent="submitHandler">
    <div class="card-content">
      <span class="card-title">Домашняя бухгалтерия</span>
      <div class="input-field">
        <input
            id="email"
            type="text"
            v-model.trim="email"
            :class="{invalid: ($v.email.$dirty && !$v.email.required) || ($v.email.$dirty && !$v.email.email)}"
        >
        <label for="email">Email</label>
        <small class="helper-text invalid" v-if="$v.email.$dirty && !$v.email.required">Введите Email</small>
        <small class="helper-text invalid" v-if="$v.email.$dirty && !$v.email.email">Невалидный Email</small>
      </div>
      <div class="input-field">
        <input
            id="password"
            type="password"
            v-model.trim="password"
            :class="{invalid: ($v.password.$dirty && !$v.password.required) || ($v.password.$dirty && !$v.password.minLength)}"
        >
        <label for="password">Пароль</label>
        <small class="helper-text invalid" v-if="$v.password.$dirty && !$v.password.required">Введите пароль</small>
        <small class="helper-text invalid" v-if="$v.password.$dirty && !$v.password.minLength">
          Пароль должен быть не менее {{ $v.password.$params.minLength.min }} символов. Сейчас он {{ password.length }}
        </small>
      </div>
      <div class="input-field">
        <input
            id="name"
            type="text"
            v-model.trim="name"
            :class="{invalid: ($v.name.$dirty && !$v.name.required)}"
        >
        <label for="name">Имя</label>
        <small class="helper-text invalid" v-if="$v.name.$dirty && !$v.name.required">Введите Имя</small>
      </div>
      <p>
        <label>
          <input type="checkbox" v-model="isRules"/>
          <span>С правилами согласен</span>
        </label>
        <br>
        <small class="helper-text invalid" v-if="$v.isRules.$dirty && !$v.isRules.checked">Согласитесь с правилами</small>
      </p>
    </div>
    <div class="card-action">
      <div>
        <button
            class="btn waves-effect waves-light auth-submit"
            type="submit"
        >
          Зарегистрироваться
          <i class="material-icons right">send</i>
        </button>
      </div>

      <p class="center">
        Уже есть аккаунт?
        <a href="/">Войти!</a>
      </p>
    </div>
  </form>
</template>

<script>
import {email, minLength, required} from "vuelidate/lib/validators";

export default {
  name: "Register",
  data: () => ({
    email: '',
    password: '',
    name: '',
    isRules: false
  }),
  methods: {
    async submitHandler(){
      if(this.$v.$invalid){
        this.$v.$touch()
        return
      }
      const formData = {
        email: this.email,
        password: this.password,
        name: this.name,
      }

      try{
        await this.$store.dispatch('register',formData)
        this.$router.push('/')
      }catch (e) {

      }

    }
  },
  validations:{
    email: {email, required},
    password: {required, minLength: minLength(6)},
    name: {required},
    isRules: { checked: v => v}
  }
}
</script>
