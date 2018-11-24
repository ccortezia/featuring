<template>
    <div>
        TICKET BOARD
        <TicketBoardControl />
        <TicketBoardList />
        <router-view/>
    </div>
</template>

<script lang="ts">
import Vue from 'vue';
import TicketBoardControl from '../components/TicketBoardControl.vue';
import TicketBoardList from '../components/TicketBoardList.vue';


export default Vue.extend({
    components: {
        TicketBoardControl,
        TicketBoardList,
    },
});
</script>
