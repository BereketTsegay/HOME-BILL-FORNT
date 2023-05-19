<template>
  <form @submit.prevent="handleSubmit">
    <div class="column">
      <b-field label="New Password" :type="pwd_error">
        <b-input type="password" v-model="user.password" required></b-input>
      </b-field>
      <b-field label="Confirm Password" :type="confirm_error">
        <b-input
          type="password"
          v-model="user.password_confirmation"
          required
        ></b-input>
      </b-field>
    </div>
    <div class="column">
      <button
        type="submit"
        class="button is-primary is-fullwidth"
        :loading="isLoading"
        :disabled="isLoading"
      >
        Reset Password
      </button>
    </div>
  </form>
</template>
<script>
import axios from "axios";
export default {
  data() {
    return {
      isLoading: false,
      pwd_error: "",
      confirm_error: "",
      user: {},
    };
  },
  mounted() {
    if (this.$route.query.token) {
      this.user.token = this.$route.query.token;
      this.user.email = this.$route.query.email;
    }
  },
  methods: {
    handleSubmit() {
      if (this.user.password == null) {
        this.pwd_error = "is-danger";
        return;
      }
      if (this.user.password !== this.user.password_confirmation) {
        this.confirm_error = "is-danger";
        return;
      }
      this.isLoading = true;
      console.log(this.user);
      axios
        .post("/api/auth/reset-password", this.user)
        .then(() => this.$router.push("/auth"))
        .catch(() => console.log("something goes wrong"))
        .finally(() => (this.isLoading = false));
    },
  },
};
</script>
