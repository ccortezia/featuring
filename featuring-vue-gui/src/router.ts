import Vue from 'vue';
import Router from 'vue-router';
import Home from './views/Home.vue';
import UserProfile from './views/UserProfile.vue';
import TicketBoard from './views/TicketBoard.vue';
import TicketWelcomePanel from './views/TicketWelcomePanel.vue';
import TicketCreatorPanel from './views/TicketCreatorPanel.vue';
import TicketDetailsPanel from './views/TicketDetailsPanel.vue';
import TicketEditorPanel from './views/TicketEditorPanel.vue';

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: '/',
      component: Home,
      children: [
        {
          path: 'profile',
          component: UserProfile,
        },
        {
          path: 'tickets',
          component: TicketBoard,
          children: [
            {
              path: 'new',
              component: TicketCreatorPanel,
            },
            {
              path: ':ticketId/edit',
              component: TicketEditorPanel,
              props: true,
            },
            {
              path: ':ticketId',
              component: TicketDetailsPanel,
              props: true,
            },
            {
              path: '',
              component: TicketWelcomePanel,
            },
          ],
        },
        {
          path: '',
          component: TicketBoard,
          children: [{
            path: '',
            component: TicketWelcomePanel,
          }],
        },
      ],
    },
    // {
    //   path: '/about',
    //   name: 'about',
    //   // route level code-splitting
    //   // this generates a separate chunk (about.[hash].js) for this route
    //   // which is lazy-loaded when the route is visited.
    //   component: () => import(/* webpackChunkName: "about" */ './views/About.vue'),
    // },
  ],
});
