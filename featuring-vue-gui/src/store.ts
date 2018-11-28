import Vue from 'vue';
import Vuex, { StoreOptions } from 'vuex';
import {RootState} from './types';
import TicketBoardModule from './modules/TicketBoardModule';

Vue.use(Vuex);


const store: StoreOptions<RootState> = {
  state: {
    version: '1.0.0',
  },
  modules: {
    ticketBoard: TicketBoardModule,
  },
};

export default new Vuex.Store<RootState>(store);
