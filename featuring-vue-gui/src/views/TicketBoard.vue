<template>
    <div class="ticket-board">
      <div class="ticket-navigator">
        <TicketBoardControl />
        <TicketBoardList :tickets="tickets"/>
      </div>
      <router-view/>
    </div>
</template>

<script lang="ts">
import Vue from 'vue';
import { mapState } from 'vuex';
import TicketBoardControl from '../components/TicketBoardControl.vue';
import TicketBoardList from '../components/TicketBoardList.vue';

export default Vue.extend({
  components: {
    TicketBoardControl,
    TicketBoardList,
  },
  computed: {
    ...mapState('ticketBoard', ['tickets', 'clients', 'products']),
  },
  created() {
    this.$store.dispatch('ticketBoard/retrieveTickets')
      .then(() => this.$store.dispatch('ticketBoard/retrieveClients'))
      .then(() => this.$store.dispatch('ticketBoard/retrieveProducts'))
    ;
  },
});
</script>

<style lang="less" scoped>
.ticket-board {
  display: flex;
  flex-direction: row;
}

.ticket-navigator {
  flex-grow: 1;
  min-width: 400px;
  max-width: 400px;
  flex-basis: auto; /* default value */
}

.ticket-panel {
  flex-grow: 4;
  padding: 50px;

  header {
    display: flex;
    margin: 20px 0 20px 0;
  }

  header div {
    margin: 0 20px 0 0;
  }

  div.ticket-description {
    min-height: 200px;
  }
}
</style>
