<template>
  <div>
    <form @submit.prevent="handleSubmit" v-if="!setEmailSentSuccess">
      <b-notification v-if="!!error" type="is-danger is-light" role="alert">
        {{ error }}
      </b-notification>
      <div class="column">
        <b-field label="Email" :type="email_error">
          <b-input type="email" v-model="user.email" required></b-input>
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
    <template v-if="setEmailSentSuccess">
      <div>Reset link has been sent to your registered Email.</div>
    </template>
  </div>
</template>
<script>
import axios from "axios";
export default {
  name: "forget_password",
  data() {
    return {
      user: {},
      email_error: "",
      error: "",
      isLoading: false,
      setEmailSentSuccess: false,
    };
  },
  methods: {
    handleSubmit() {
      //   let regex = new RegExp("[a-z0-9]+@[a-z]+\.[a-z]{2,3}");
      if (!this.user.email) return;
      this.isLoading = true;
      axios
        .post("/api/auth/forget-password", this.user)
        .then((res) => {
          if (res.data.status) {
            this.setEmailSentSuccess = true;
          }
        })
        .catch(() => {
          this.email_error = "is-danger";
          this.error = "The email is not found on our records";
        })
        .finally(() => {
          this.isLoading = false;
        });
    },
  },
};
</script>
