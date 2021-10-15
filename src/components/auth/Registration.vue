<template>
  <div class="registration">
    <form class="registration__form" @submit.prevent="submitHandler">
      <p class="registration__form-title">Kanban Board</p>
      <div>
        <label for="formName">Name</label>
        <input
            type="text"
            class="form-control"
            id="formName"
            placeholder="Aleksandr"
            v-model.trim="name"
            :class="{
            invalid:
            ($v.name.$dirty && !$v.name.required)
            }"
        >
        <p
            v-if="$v.name.$dirty && !$v.name.required"
            class="help-block"
        >name</p>
      </div>
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
              class="help-block"
          >
            Field of email must not be empty
          </p>
          <p
              v-else-if="$v.email.$dirty && !$v.email.email"
              class="help-block"
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
              class="help-block"
          >
            Enter your password
          </p>
          <p
              v-else-if="$v.password.$dirty && !$v.password.minLength"
              class="help-block"
          >
            Password must be at least
            {{ $v.password.$params.minLength.min }} symbols. Now is (
            {{ password.length }} )
          </p>
        </div>
      </div>
        <div class="form-buttons">
          <button class="btn btn-primary btn-sm btn-block mt-2 registration__form-btn">Submit</button>
        </div>
      <p class="registration__form-link">
        Have an account?
        <router-link to="/login"> <--LOGIN </router-link>
      </p>

    </form>
  </div>

</template>

<script>
import {email, minLength, required} from "vuelidate/lib/validators";

export default {
  name: "registration",
  data() {
    return {
      name:"",
      email: "",
      password: "",
    };
  },
  validations: {
    name: {required},
    email: { email, required },
    password: { required, minLength: minLength(6) },
  },
  methods:{
    async submitHandler(){
      if (this.$v.$invalid) {
        this.$v.$touch();
        return;
      }
      const formData = {
        email: this.email,
        password: this.password,
        name: this.name,
      }
      try {
        await this.$store.dispatch('register', formData)
        this.$router.push('/main')
      }catch (e){
        this.$notify({
          group: 'error',
          title: 'Important message',
          text: 'Hello user! Your email or password are incorrect!!!'
        });
      }
    }
  }
}
</script>

<style lang="sass">

  .registration
    display: flex
    justify-content: center
    align-items: center
    height: 100vh

    &__form
      width: 400px
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

  .invalid
    border: 1px solid red

  .help-block
    color: red
</style>