<template>
  <div class="container">
    <form @submit.prevent="handleSubmit()">
      <div class="card">
        <div class="card-content">
          <p class="control">
            <input
              v-model="currentUser.name"
              class="input"
              type="text"
              required
              error-messages="Name is required"
              placeholder="Name"
            />
          </p>
          <p class="control my-2">
            <input
              class="input"
              v-model="currentUser.email"
              type="email"
              placeholder="email"
              disabled
            />
          </p>
        </div>
        <footer class="card-footer">
          <p class="card-footer-item">
            <button
              type="submit"
              class="button is-primary"
              :loading="isLoading"
              :disabled="isLoading"
            >
              Save Changes
            </button>
          </p>
          <p class="card-footer-item">
            <button
              type="button"
              class="button is-primary"
              @click="changeEmail"
            >
              Change Email
            </button>
          </p>
          <p class="card-footer-item">
            <button
              type="button"
              class="button is-primary"
              @click="changePasswordPrompt"
            >
              Change Password
            </button>
          </p>
        </footer>
      </div>
    </form>
    <b-modal
      v-model="changePWD"
      has-modal-card
      trap-focus
      :destroy-on-hide="false"
    >
      <template>
        <change-password-component
          @close="() => (changePWD = false)"
        ></change-password-component>
      </template>
    </b-modal>
  </div>
</template>
<script>
import axios from "axios";
import ChangePasswordComponent from "./auth/ChangePasswordComponent";
export default {
  components: { ChangePasswordComponent },
  name: "profile",
  data() {
    return {
      user: {},
      isLoading: false,
      changePWD: false,
    };
  },
  created() {
    if (this.currentUser) this.user = Object.assign({}, this.currentUser);
  },
  computed: {
    currentUser() {
      return this.$store.getters["auth/currentUser"];
    },
  },
  watch: {
    currentUser(newVal) {
      if (this.currentUser) this.user = Object.assign({}, newVal);
    },
  },
  methods: {
    handleSubmit() {
      if (this.user.name == "") return;
      this.isLoading = true;
      axios
        .post("/api/profile/change-name", this.user)
        .then((res) => {
          this.$store.commit("auth/loginSuccess", res.data);
        })
        .catch((err) => alert(err))
        .finally(() => (this.isLoading = false));
    },
    changePasswordPrompt() {
      this.changePWD = true;
    },
    changeEmail() {},
  },
};
</script>
<style scoped>
.container {
  position: relative;
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;
  padding-top: 5rem;
  width: 60%;
}
.panel-block {
  flex-direction: column;
}
</style>
