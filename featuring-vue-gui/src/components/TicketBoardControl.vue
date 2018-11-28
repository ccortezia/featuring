<template>
    <div class="ticket-board-controller panel-body">
        <div>
            <b-button to="/tickets/new" class="btn btn-outline-dark">Create</b-button>
        </div>
        <div>
            <b-form-select @change="selectClient" :value="selectedClient" :options="options"/>
        </div>
    </div>
</template>

<script lang="ts">
import Vue from 'vue';
import { mapMutations, mapState } from 'vuex';
import { ClientData } from '../types';


export default Vue.extend({
  methods: {
    ...mapMutations('ticketBoard', ['selectClient']),
  },
  computed: {
    options(this) {
      const clientsData = this.$store.state.ticketBoard.clients;
      const defaultClientOption = { value: null, text: 'Please select an client' };
      return [defaultClientOption].concat(clientsData.map(clientDataToSelectOption));
    },
    ...mapState('ticketBoard', ['selectedClient']),
  },
});


function clientDataToSelectOption(clientData: ClientData) {
  return { value: clientData.clientId, text: clientData.clientName };
}

</script>

<style lang="less" scoped>
/* Ticket Board Controller */

.ticket-board-controller {
  height: 50px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px;

  > div:last-child {
    width: 75%;
  }

  select {
    width: 100%;
  }
}
</style>
