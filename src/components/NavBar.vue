<template>
  <b-navbar>
    <template #brand>
      <b-navbar-item tag="router-link" :to="{ path: '/' }">
        BN - Home Bill
      </b-navbar-item>
    </template>
    <template #start>
      <b-navbar-item href="#"> Home </b-navbar-item>
      <b-navbar-item href="#"> Shippments </b-navbar-item>
      <b-navbar-item href="#">
        <b-input
          type="search"
          maxlength="30"
          place-holder="Search here"
          @unput="($event) => handlChange($event)"
        >
        </b-input>
      </b-navbar-item>
      <b-navbar-dropdown label="Report">
        <b-navbar-item href="#"> Home Bill Cover </b-navbar-item>
        <b-navbar-item href="#"> Contact </b-navbar-item>
      </b-navbar-dropdown>
    </template>

    <template #end>
      <b-navbar-item tag="div">
        <b-navbar-dropdown :label="currentUser.name">
          <b-navbar-item href="/profile"> Profile </b-navbar-item>
          <b-navbar-item @click="handleLogout"> Log out </b-navbar-item>
        </b-navbar-dropdown>
      </b-navbar-item>
    </template>
  </b-navbar>
</template>
<script>
export default {
  data() {
    return {};
  },
  methods: {
    handleLogout() {
      this.$store.commit("auth/logout");
      this.$router.push("/auth");
    },
    handlChange(data) {
      console.log(data);
    },
  },
  computed: {
    currentUser() {
      return this.$store.getters["auth/currentUser"];
    },
  },
};
</script>
