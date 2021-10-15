<template>
  <div class="login">
    <b-form class="login__form" @submit.prevent="submitHandler">
      <p class="login__form-title">Kanban Board</p>
      <div class="form-group">
        <div class="login__form-input">
          <label for="formEmail">Email</label>
          <input
            type="text"
            class="form-control"
            id="formEmail"
            placeholder="test@test.com"
            v-model.trim="email"
            :class="{
              invalid:
                ($v.email.$dirty && !$v.email.required) ||
                ($v.email.$dirty && !$v.email.email),
            }"
          />
          <p
            v-if="$v.email.$dirty && !$v.email.required"
            class="email-help-block"
          >
            Field of email must not be empty
          </p>
          <p
            v-else-if="$v.email.$dirty && !$v.email.email"
            class="email-help-block"
          >
            Enter the correct email
          </p>
        </div>
      </div>
      <div class="form-group">
        <div class="login__form-input">
          <label for="formPassword">Password</label>
          <input
            type="password"
            class="form-control"
            id="formPassword"
            placeholder="Password"
            v-model.trim="password"
            :class="{
              invalid:
                ($v.password.$dirty && !$v.password.required) ||
                ($v.password.$dirty && !$v.password.minLength),
            }"
          />
          <p
            v-if="$v.password.$dirty && !$v.password.required"
            class="email-help-block"
          >
            Enter your password
          </p>
          <p
            v-else-if="$v.password.$dirty && !$v.password.minLength"
            class="email-help-block"
          >
            Password must be at least
            {{ $v.password.$params.minLength.min }} symbols. Now is ( {{ password.length }} )
          </p>
        </div>
      </div>
      <div class="form-buttons">
        <button
          class="btn btn-success btn-sm btn-block mt-2 login__form-btn"
          type="submit"
        >
          Sign in
        </button>
      </div>
      <p class="login__form-link">
        Not registered yet?
        <router-link to="/register">REGISTRATION --></router-link>
      </p>
    </b-form>
  </div>
</template>

<script>
import { email, required, minLength } from "vuelidate/lib/validators";
export default {
  name: "login",
  data() {
    return {
      email: "",
      password: "",
    };
  },
  validations: {
    email: { email, required },
    password: { required, minLength: minLength(6) },
  },
  methods: {
    async submitHandler() {
      if (this.$v.$invalid) {
        this.$v.$touch();
        return;
      }
      const formData = {
        email: this.email,
        password: this.password,
      }
      try {
        await this.$store.dispatch('login', formData)
        this.$router.push('/main')
      }catch (e){
        this.$notify({
          group: 'error',
          title: 'Important message',
          text: 'Hello user! Your email or password are incorrect!!!'
        });
      }
    },
  },
};
</script>

<style lang="sass">
.login
  display: flex
  justify-content: center
  align-items: center
  height: 100vh

  &__form
    width: 500px
    padding: 35px
    background: #cccccc
    border-radius: 15px

    &-title
      font-family: 'SF-Pro-Display-Bold', sans-serif
      font-style: normal
      font-weight: bold
      font-size: 24px
      line-height: 33px
      color: #2B3744
      text-align: center
      margin-bottom: 12px

    &-btn
      font-family: 'SF-Pro-Display-Regular', sans-serif
      font-size: 18px
      width: 100%
      margin-bottom: 18px

    &-link
      font-family: 'SF-Pro-Display-Regular', sans-serif
      text-align: center

    &-input
      margin-bottom: 20px

.invalid
  border: 1px solid red

.email-help-block
  color: red
</style>