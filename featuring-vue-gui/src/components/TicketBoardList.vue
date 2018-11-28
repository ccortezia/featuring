<template>
    <div class="ticket-list">
        <b-list-group class="list-feature">
            <TicketBoardItem v-for="ticket in tickets" :key="ticket.id" :ticket="ticket" />
        </b-list-group>
    </div>
</template>

<script lang="ts">
import Vue from 'vue';
import TicketBoardItem from './TicketBoardItem.vue';

export default Vue.extend({
    components: {
        TicketBoardItem,
    },
    props: {
        tickets: Array,
    },
});
</script>

<style lang="less" scoped>
.ticket-list {
  flex-grow: 1;
  overflow-y: scroll;
  height: 80vh;
}
</style>

