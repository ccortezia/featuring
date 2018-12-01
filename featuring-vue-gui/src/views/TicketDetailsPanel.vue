<template>
    <div class="ticket-panel ticket-panel-details">
        <template v-if="!ready">
            LOADING
        </template>
        <template v-else>
            <h1>{{ ticket.title }}</h1>
            <header>
                <div class="badge badge-info">{{ticket.clientName}}</div>
                <div class="badge badge-info">{{ticket.productName}}</div>
                <!-- <div>Due by: {{ticket.deadline.format('MM/DD/YYYY')}}</div> -->
            </header>
            <div class="ticket-description">{{ticket.description}}</div>
            <b-button class="btn" :to="`/tickets/${ticket.ticketId}/edit`">Edit</b-button>
            <b-button class="btn btn-outline-danger" @click="deleteTicket">Delete</b-button>
        </template>
    </div>
</template>

<script lang="ts">
import Vue from 'vue';
import { mapGetters } from 'vuex';
import { mapState } from 'vuex';
import { TicketData } from '../types';

export default Vue.extend({
    props: ['ticketId'],
    methods: {
        deleteTicket() {
            this.$store.dispatch('ticketBoard/deleteTicket', this.ticketId);
        },
    },
    computed: {
        ready(this) {
            return this.$store.state.ticketBoard.tickets.length;
        },
        ticket(this) {
            return this.$store.getters['ticketBoard/ticket'](this.ticketId);
        },
    },
});
</script>
