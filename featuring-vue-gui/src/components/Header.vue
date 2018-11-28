<template>
    <header class="primary">
      <router-link class="logo" to="/">FEATURING</router-link>
      <router-link to="/profile">User Profile</router-link> |
      <router-link to="/tickets/new">New Ticket</router-link> |
      <router-link to="/tickets/2/edit">Edit Ticket 2</router-link> |
      <div class="auth-box">
        <div class="username">{{profile && profile.fullname}}</div>
        <!-- Add LogoutButton here -->
      </div>
    </header>
</template>

<script lang="ts">
import Vue from 'vue';

export default Vue.extend({
  props: ['profile'],
});
</script>


<style lang="less" scoped>
header.primary {
  display: flex;
  justify-content: space-between;
  padding: 15px;
  border: solid 2px grey;
  min-height: 60px;
  background-color: #222;
  min-width: 300px;

  &.primary .logo {
    text-decoration: none;
    color: white;
    font-size: 1.5em;
    text-shadow: 0px 0px 13px #08c, 0px 0px 15px #08c, 0px 0px 30px #08c;
  }

  &.primary .auth-box {
    /* display: none; */
  }

  /* TODO: handle media query > sm. */
  &.primary .nav-toggle {
    /* display: none; */
  }

  &.primary .auth-box {
    color: white;
    display: flex;
    align-items: center;
  }

  &.primary .username {
    margin-right: 10px;
    font-size: 1.3em;
    text-decoration: none;
    color: white;
  }
}
</style>
