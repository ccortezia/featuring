
export default class FeaturesRemoteAPI {

  list() {
    return new Promise((resolve, reject) => {
      resolve([
        {id: 1,  clientId: 1, title: 'Title 1'.repeat(5),  description: 'desc-1 '.repeat(100),  priority: 1, deadline: '2010-05-02T00:00.000Z', area: 'Billing', ticketUrl: 'http://local.trac/1'},
        {id: 2,  clientId: 1, title: 'Title 2'.repeat(5),  description: 'desc-2 '.repeat(100),  priority: 2, deadline: '2010-05-02T00:00.000Z', area: 'Policies', ticketUrl: 'http://local.trac/2'},
        {id: 3,  clientId: 1, title: 'Title 3'.repeat(5),  description: 'desc-3 '.repeat(100),  priority: 3, deadline: '2010-05-02T00:00.000Z', area: 'Billing', ticketUrl: 'http://local.trac/3'},
        {id: 4,  clientId: 1, title: 'Title 4'.repeat(5),  description: 'desc-4 '.repeat(100),  priority: 4, deadline: '2010-05-02T00:00.000Z', area: 'Claims', ticketUrl: 'http://local.trac/4'},
        {id: 5,  clientId: 1, title: 'Title 5'.repeat(5),  description: 'desc-5 '.repeat(100),  priority: 5, deadline: '2010-05-02T00:00.000Z', area: 'Billing', ticketUrl: 'http://local.trac/5'},
        {id: 6,  clientId: 1, title: 'Title 6'.repeat(5),  description: 'desc-6 '.repeat(100),  priority: 6, deadline: '2010-05-02T00:00.000Z', area: 'Reports', ticketUrl: 'http://local.trac/6'},
        {id: 7,  clientId: 1, title: 'Title 7'.repeat(5),  description: 'desc-7 '.repeat(100),  priority: 7, deadline: '2010-05-02T00:00.000Z', area: 'Billing', ticketUrl: 'http://local.trac/7'},
        {id: 8,  clientId: 1, title: 'Title 8'.repeat(5),  description: 'desc-8 '.repeat(100),  priority: 7, deadline: '2010-05-02T00:00.000Z', area: 'Billing', ticketUrl: 'http://local.trac/8'},
        {id: 9,  clientId: 1, title: 'Title 9'.repeat(5),  description: 'desc-9 '.repeat(100),  priority: 7, deadline: '2010-05-02T00:00.000Z', area: 'Billing', ticketUrl: 'http://local.trac/9'},
        {id: 10, clientId: 2, title: 'Title 10'.repeat(5), description: 'desc-10 '.repeat(100), priority: 7, deadline: '2010-05-02T00:00.000Z', area: 'Claims', ticketUrl: 'http://local.trac/10'},
        {id: 11, clientId: 2, title: 'Title 11'.repeat(5), description: 'desc-11 '.repeat(100), priority: 7, deadline: '2010-05-02T00:00.000Z', area: 'Reports', ticketUrl: 'http://local.trac/11'},
        {id: 12, clientId: 2, title: 'Title 12'.repeat(5), description: 'desc-12 '.repeat(100), priority: 7, deadline: '2010-05-02T00:00.000Z', area: 'Policies', ticketUrl: 'http://local.trac/12'},
        {id: 13, clientId: 3, title: 'Title 13'.repeat(5), description: 'desc-13 '.repeat(100), priority: 7, deadline: '2010-05-02T00:00.000Z', area: 'Billing', ticketUrl: 'http://local.trac/13'},
        {id: 14, clientId: 3, title: 'Title 14'.repeat(5), description: 'desc-14 '.repeat(100), priority: 7, deadline: '2010-05-02T00:00.000Z', area: 'Policies', ticketUrl: 'http://local.trac/14'},
        {id: 15, clientId: 3, title: 'Title 15'.repeat(5), description: 'desc-15 '.repeat(100), priority: 7, deadline: '2010-05-02T00:00.000Z', area: 'Billing', ticketUrl: 'http://local.trac/15'},
        {id: 16, clientId: 3, title: 'Title 16'.repeat(5), description: 'desc-16 '.repeat(100), priority: 7, deadline: '2010-05-02T00:00.000Z', area: 'Claims', ticketUrl: 'http://local.trac/16'},
        {id: 17, clientId: 3, title: 'Title 17'.repeat(5), description: 'desc-17 '.repeat(100), priority: 7, deadline: '2010-05-02T00:00.000Z', area: 'Billing', ticketUrl: 'http://local.trac/17'},
        {id: 18, clientId: 3, title: 'Title 18'.repeat(5), description: 'desc-18 '.repeat(100), priority: 7, deadline: '2010-05-02T00:00.000Z', area: 'Billing', ticketUrl: 'http://local.trac/18'},
        {id: 19, clientId: 3, title: 'Title 19'.repeat(5), description: 'desc-19 '.repeat(100), priority: 7, deadline: '2010-05-02T00:00.000Z', area: 'Policies', ticketUrl: 'http://local.trac/19'},
        {id: 20, clientId: 3, title: 'Title 20'.repeat(5), description: 'desc-20 '.repeat(100), priority: 7, deadline: '2010-05-02T00:00.000Z', area: 'Reports', ticketUrl: 'http://local.trac/20'},
        {id: 21, clientId: 3, title: 'Title 21'.repeat(5), description: 'desc-21 '.repeat(100), priority: 7, deadline: '2010-05-02T00:00.000Z', area: 'Claims', ticketUrl: 'http://local.trac/21'},
        {id: 22, clientId: 3, title: 'Title 22'.repeat(5), description: 'desc-22 '.repeat(100), priority: 7, deadline: '2010-05-02T00:00.000Z', area: 'Billing', ticketUrl: 'http://local.trac/22'},
        {id: 23, clientId: 3, title: 'Title 23'.repeat(5), description: 'desc-23 '.repeat(100), priority: 7, deadline: '2010-05-02T00:00.000Z', area: 'Reports', ticketUrl: 'http://local.trac/23'},
      ]);
    });
  }
}
