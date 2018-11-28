<template>
  <b-list-group-item class="ticket-item flex-column align-items-start" :to="`/tickets/${ticket.ticketId}`">
    <h4>{{ ticket.ticketTitle }}</h4>
    <p className="list-group-item-text">{{ ticket.title }}</p>
  </b-list-group-item>
</template>

<script lang="ts">
import Vue from 'vue';

export default Vue.extend({
  props: {
    active: Boolean,
    ticket: Object,
  },
});
</script>

<style lang="less">

  .ticket-item.list-group-item.active {
    background-color: #324559;
    border-color: #324559;
  }
  .ticket-item .btn-bump-priority {
    position: absolute;
    right: 10px;
    top: 10px;
  }

</style>
