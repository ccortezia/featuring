<template>
    <div class="ticket-panel">
        <template v-if="!ready">
            LOADING
            <font-awesome-icon icon="spinner" size="6x" spin />
        </template>
        <template v-else>
            <b-form @submit="onSubmit" novalidate>
                <b-form-group label="Title" label-for="title" description="A short one-line description for this ticket">
                    <b-form-input type="text" v-model="formData.title" id="title" name="title" placeholder="Enter title" required></b-form-input>
                </b-form-group>
                <b-form-group label="Description" label-for="description">
                    <b-form-textarea type="text" v-model="formData.description" id="description" name="description" placeholder="Enter description" />
                </b-form-group>
                <b-form-group label="Client" label-for="client">
                    <b-form-select v-model="formData.clientId" :options="clients" id="client" name="client" required/>
                </b-form-group>
                <b-form-group label="Product" label-for="product">
                    <b-form-select v-model="formData.productId" :options="products" id="product" name="product" required/>
                </b-form-group>
                <b-form-group label="Deadline" label-for="deadline">
                    <b-form-input type="date" v-model="formData.deadline" id="deadline" name="deadline" required></b-form-input>
                </b-form-group>
                <b-button type="submit" class="btn btn-primary">Submit</b-button>
            </b-form>
        </template>
    </div>
</template>

<script lang="ts">
import Vue from 'vue';
import { TicketData, ClientData, ProductData, EntityID, SelectOption } from '../types';

interface FormData {
    title: string | null;
    description: string | null;
    productId: EntityID | null;
    clientId: EntityID | null;
    deadline: Date | null;
}

export default Vue.extend({
    props: ['ticketId'],
    // TODO: Refactor loading protection.
    data(): { formData: FormData } {
        const state = this.$store.state.ticketBoard;
        const isReady = !!state.tickets.length && !!state.clients.length && !!state.products.length;
        if (isReady) {
            const ticketData = this.$store.getters['ticketBoard/ticket'](this.ticketId);
            return {formData: ticketDataToFormData(ticketData)};
        }
        return {
            formData: {
                title: null,
                description: null,
                productId: null,
                clientId: null,
                deadline: null,
            },
        };
    },
    methods: {
        onSubmit(evt: any): void {
            evt.preventDefault();
            this.$store.dispatch('ticketBoard/updateTicket', {ticketId: this.ticketId, ...this.formData});
        },
    },
    computed: {
        // TODO: Refactor loading protection.
        ready(): boolean {
            const state = this.$store.state.ticketBoard;
            return !!state.tickets.length && !!state.clients.length && !!state.products.length;
        },
        clients(): SelectOption[] {
            const clientsData = this.$store.state.ticketBoard.clients;
            const defaultClientOption = { value: null, text: 'Please select an client' };
            return [defaultClientOption].concat(clientsData.map(clientDataToSelectOption));
        },
        products(): SelectOption[] {
            const productsData = this.$store.state.ticketBoard.products;
            const defaultProductOption = { value: null, text: 'Please select a product' };
            return [defaultProductOption].concat(productsData.map(productDataToSelectOption));
        },
    },
    watch: {
        ready(nv: boolean, ov: boolean): void {
            if (nv) {
                const ticketData = this.$store.getters['ticketBoard/ticket'](this.ticketId);
                Object.assign(this.formData, ticketDataToFormData(ticketData));
            }
        },
    },
});

function ticketDataToFormData(data: TicketData): FormData {
    return {
        title: data.title,
        description: data.description,
        productId: data.productId,
        clientId: data.clientId,
        deadline: data.deadline,
    };
}

function clientDataToSelectOption(clientData: ClientData): SelectOption {
  return { value: clientData.clientId, text: clientData.clientName };
}

function productDataToSelectOption(productData: ProductData): SelectOption {
  return { value: productData.productId, text: productData.productName };
}


</script>
