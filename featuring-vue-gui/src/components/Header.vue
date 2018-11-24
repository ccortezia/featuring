<template>
    <header>
    <div id="nav">
      <router-link to="/">Home</router-link> |
      <router-link to="/profile">User Profile</router-link> |
      <router-link to="/tickets/new">New Ticket</router-link> |
      <router-link to="/tickets/1">Open Ticket 1</router-link> |
      <router-link to="/tickets/2">Open Ticket 2</router-link> |
      <router-link to="/tickets/2/edit">Edit Ticket 2</router-link> |
    </div>
    </header>
</template>

<script lang="ts">
import Vue from 'vue';

export default Vue.extend({});
</script>


<style lang="less" scoped>
</style>
