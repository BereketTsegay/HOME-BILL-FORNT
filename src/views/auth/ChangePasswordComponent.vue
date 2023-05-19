<template>
  <form @submit.prevent="changePassword">
    <div class="modal-card" style="width: auto">
      <header class="modal-card-head">
        <p class="modal-card-title">Change Password</p>
      </header>
      <section class="modal-card-body">
        <b-field label="Old Password">
          <b-input
            type="password"
            v-model="user.old_password"
            password-reveal
            placeholder="Old password"
            required
          >
          </b-input>
        </b-field>

        <b-field label="New Password">
          <b-input
            type="password"
            v-model="user.new_password"
            password-reveal
            placeholder="New password"
            required
          >
          </b-input>
        </b-field>

        <b-field label="Confirm Password">
          <b-input
            type="password"
            v-model="user.comfirm_password"
            password-reveal
            placeholder="Your password"
            required
          >
          </b-input>
        </b-field>
      </section>
      <footer class="modal-card-foot">
        <b-button label="Close" type="button" @click="$emit('close')" />
        <b-button
          label="Change Password"
          native-type="submit"
          type="is-primary"
          :loading="isLoading"
        />
      </footer>
    </div>
  </form>
</template>
<script>
import axios from "axios";
export default {
  data() {
    return {
      user: {},
      isLoading: false,
    };
  },
  methods: {
    changePassword() {
      if (
        this.user.new_password == "" ||
        this.user.confirm_password == "" ||
        this.user.old_password == ""
      )
        return;

      if (this.user.new_password !== this.user.confirm_password) return;
      if (this.user.new_password == this.user.old_password) return;
      this.console.log(this.user);
      //   this.isLoading = false;
      //   axios
      //     .post("/api/profile/change-password", this.user)
      //     .then(() => this.$router.push("/auth"))
      //     .catch((err) => console.log(err.response))
      //     .finally(() => (this.isLoading = false));
    },
  },
};
</script>
