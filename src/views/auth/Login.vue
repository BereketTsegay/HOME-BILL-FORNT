<template>
  <div>
    <b-notification v-if="!!error" type="is-danger is-light" role="alert">
          {{ error }}
        </b-notification>
        <div class="column">
          <b-field label="Email" :type="email_error">
            <b-input type="email" v-model="user.email" required></b-input>
          </b-field>
        </div>
        <div class="column">
          <b-field label="Password" :type="password_error">
            <b-input
              type="password"
              required
              v-model="user.password"
              password-reveal
            >
            </b-input>
          </b-field>
          <router-link to="/auth/forget_password"
            >Forget Password??</router-link
          >
        </div>
        <div class="column">
          <button
            @click="handleSubmit"
            class="button is-primary is-fullwidth"
            type="submit"
            :loading="isLoading"
            :disabled="isLoading"
          >
            Login
          </button>
        </div>
  </div>
</template>

<script>
// import { login } from "../../helpers/auth";
export default {
  props: {},
  data() {
    return {
      user: {},
      isLoading: false,
      error: "",
      email_error: "",
      password_error: "",
    };
  },
  methods: {
    handleSubmit() {
      this.error = "";
      this.email_error = "";
      this.password_error = "";
      if (!this.user.email) {
        this.error = "email is required";
        this.email_error = "is-danger";
      }
      if (!this.user.password) {
        this.error += " password is required";
        this.password_error = "is-danger";
      }
      if (this.error) return;

      this.isLoading = true;
      this.$store
        .dispatch("auth/login", this.user)
        .then(() => {
          this.$router.push("/");
        })
        .catch((exe) => {
          this.error = exe;
          this.user = {};
        })
        .finally(() => (this.isLoading = false));
    },
  },
};
</script>
