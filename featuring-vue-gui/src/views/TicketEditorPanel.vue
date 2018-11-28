<template>
    <div class="ticket-panel">TICKET EDITOR PANEL {{ ticketId }}</div>
</template>

<script lang="ts">
import Vue from 'vue';

export default Vue.extend({
    props: ['ticketId'],
});
</script>
