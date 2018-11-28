<template>
    <div class="ticket-panel ticket-panel-details">
        <template v-if="!ready">
            LOADING
        </template>
        <template v-else>
            <h1>{{ ticket.title }}</h1>

            <!-- {this.state.error ? createErrorAlert(this.state.error) : null} -->
            <header>
                <div class="badge badge-info">{{ticket.clientName}}</div>
                <div class="badge badge-info">{{ticket.productName}}</div>
                <!-- <div>Due by: {{ticket.deadline.format('MM/DD/YYYY')}}</div> -->
            </header>
            <div class="ticket-description">{{ticket.description}}</div>
            <!-- <Link to={`/tickets/${ticket.ticketId}/edit`} class="btn btn-outline-primary mr-1">Edit</Link> -->
            <b-button class="btn btn-outline-danger" @click="deleteTicket">Delete</b-button>
        </template>
    </div>
</template>

<script lang="ts">
import Vue from 'vue';
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
            const ticketId = this.ticketId;
            const finder = (ticket: TicketData) => ticket.ticketId === ticketId;
            return this.$store.state.ticketBoard.tickets.find(finder);
        },
    },
});
</script>
