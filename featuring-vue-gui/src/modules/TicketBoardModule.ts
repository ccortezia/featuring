import { Module } from 'vuex';
import { RootState, TicketBoardState, TicketData, ClientData, ProductData } from '../types';

const TicketBoardModule: Module<TicketBoardState, RootState> = {
  namespaced: true,

  state: {
    selectedClient: null,
    tickets: [],
    clients: [],
    products: [],
  },

  getters: {
    ticket: (state) => (ticketId: string) => {
      const finder = (ticket: TicketData) => ticket.ticketId === ticketId;
      return state.tickets.find(finder);
    },
  },

  mutations: {
    selectClient(state, clientId: string) {
      state.selectedClient = clientId;
    },

    reloadTicket(state, ticketData: TicketData) {
      flatUpsert(state.tickets, ticketData, 'ticketId');
    },

    reloadClient(state, clientData: ClientData) {
      flatUpsert(state.clients, clientData, 'clientId');
    },

    reloadProduct(state, productData: ProductData) {
      flatUpsert(state.products, productData, 'productId');
    },

    deleteTicket(state, ticketId: string) {
      console.log('DELETING ' + ticketId);
    },
  },

  actions: {

    updateTicket({ commit }, ticketData) {
      return new Promise((resolve, reject) => {
        setTimeout(() => {
          commit('reloadTicket', ticketData);
        });
      });
    },

    retrieveTickets({ commit }) {
      return new Promise((resolve, reject) => {
        setTimeout(() => {
          const response = [
            {
              ticketId: '1',
              title: 'Ticket 1',
              description: 'Long test to describe what this ticket is about',
              priority: 1,
              clientId: 1,
              productId: 1,
              deadline: '2018-01-01',
            },
            {
              ticketId: '2',
              title: 'Ticket 2',
              description: 'Long test to describe what this ticket is about',
              priority: 2,
              clientId: 1,
              productId: 1,
              deadline: '2018-01-01',
            },
            {
              ticketId: '3',
              title: 'Ticket 3',
              description: 'Long test to describe what this ticket is about',
              priority: 3,
              clientId: 1,
              productId: 1,
              deadline: '2018-01-01',
            },
            {
              ticketId: '4',
              title: 'Ticket 4',
              description: 'Long test to describe what this ticket is about',
              priority: 4,
              clientId: 1,
              productId: 1,
              deadline: '2018-01-01',
            },
          ];
          response.forEach((ticketData) => commit('reloadTicket', ticketData));
          resolve(response);
        }, 1000);
      });
    },

    deleteTicket({ commit }, ticketId: string) {
      return new Promise((resolve, reject) => {
        setTimeout(() => {
          commit('deleteTicket', ticketId);
          resolve();
        }, 1000);
      });
    },

    retrieveClients({ commit }) {
      return new Promise((resolve, reject) => {
        setTimeout(() => {
          const response = [
            { clientId: 1, clientName: 'Client 1' },
            { clientId: 2, clientName: 'Client 2' },
            { clientId: 3, clientName: 'Client 3' },
            { clientId: 4, clientName: 'Client 4' },
          ];
          response.forEach((clientData) => commit('reloadClient', clientData));
          resolve(response);
        }, 1000);
      });
    },

    retrieveProducts({ commit }) {
      return new Promise((resolve, reject) => {
        setTimeout(() => {
          const response = [
            { productId: 1, productName: 'Product 1' },
            { productId: 2, productName: 'Product 2' },
            { productId: 3, productName: 'Product 3' },
            { productId: 4, productName: 'Product 4' },
          ];
          response.forEach((productData) => commit('reloadProduct', productData));
          resolve(response);
        }, 1000);
      });
    },
  },
};


function flatUpsert<T, K extends keyof T>(targetCollection: T[], dataPoint: T, keyAttribute: K) {

  const finder = (item: T) => item[keyAttribute] === dataPoint[keyAttribute];

  const foundIndex = targetCollection.findIndex(finder);

  if (foundIndex < 0) {
    targetCollection.push(dataPoint);
  } else {
    Object.assign(targetCollection[foundIndex], dataPoint);
  }
}

export default TicketBoardModule;
