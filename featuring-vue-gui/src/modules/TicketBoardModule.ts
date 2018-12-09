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
    ticket: (state) => (ticketId: number | string) => {
      if (typeof ticketId === 'string') {
        ticketId = parseInt(ticketId, 10);
      }
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
      fetch('http://localhost:8090/api/v1/session', {
        method: 'POST',
        body: JSON.stringify({username: 'root', password: 'root'}),
        headers: {'Content-Type': 'application/json'}})
        .then((response) => response.json())
        .then((response) => response.data.token)
        .then((token) => fetch('http://localhost:8090/api/v1/tickets', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`,
          }}))
        .then((response) => response.json())
        .then((response) => {
          response.data.forEach((ticketData: APITicketData) => {
            console.log(ticketData);
            commit('reloadTicket', fromAPITicketData(ticketData));
          });
        })
        .catch((error) => console.error(error))
      ;

      // return new Promise((resolve, reject) => {
      //   setTimeout(() => {
      //     const response = [
      //       {
      //         ticketId: 1,
      //         title: 'Ticket 1',
      //         description: 'Long test to describe what this ticket is about',
      //         priority: 1,
      //         clientId: 1,
      //         productId: 1,
      //         deadline: '2018-01-01',
      //       },
      //       {
      //         ticketId: 2,
      //         title: 'Ticket 2',
      //         description: 'Long test to describe what this ticket is about',
      //         priority: 2,
      //         clientId: 1,
      //         productId: 1,
      //         deadline: '2018-01-01',
      //       },
      //       {
      //         ticketId: 3,
      //         title: 'Ticket 3',
      //         description: 'Long test to describe what this ticket is about',
      //         priority: 3,
      //         clientId: 1,
      //         productId: 1,
      //         deadline: '2018-01-01',
      //       },
      //       {
      //         ticketId: 4,
      //         title: 'Ticket 4',
      //         description: 'Long test to describe what this ticket is about',
      //         priority: 4,
      //         clientId: 1,
      //         productId: 1,
      //         deadline: '2018-01-01',
      //       },
      //     ];
      //     response.forEach((ticketData) => commit('reloadTicket', ticketData));
      //     resolve(response);
      //   }, 1000);
      // });
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

import {APITicketData} from '../types';

function fromAPITicketData(data: APITicketData): TicketData {
  return {
    ticketId: data.ticket_id,
    productId: data.product_id,
    clientId: data.client_id,
    title: data.title,
    description: data.description,
    priority: data.priority,
    deadline: data.deadline,
  };
}

export default TicketBoardModule;
