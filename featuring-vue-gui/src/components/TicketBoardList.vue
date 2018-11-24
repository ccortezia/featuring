<template>
    <ul>
        <TicketBoardItem :id="1" />
        <TicketBoardItem :id="2" />
        <TicketBoardItem :id="3" />
        <TicketBoardItem :id="4" />
    </ul>
</template>

<script lang="ts">
import Vue from 'vue';
import TicketBoardItem from './TicketBoardItem.vue';

export default Vue.extend({
    components: {
        TicketBoardItem,
    },
});
</script>
