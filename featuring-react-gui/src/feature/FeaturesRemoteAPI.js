
let data = [
  {id: 1,  clientId: 1, title: 'Title 1'.repeat(5),  description: 'desc-1 '.repeat(100),  priority: 1, deadline: '2010-05-02T00:00.000Z', area: 1, ticketUrl: 'http://local.trac/1'},
  {id: 2,  clientId: 1, title: 'Title 2'.repeat(5),  description: 'desc-2 '.repeat(100),  priority: 2, deadline: '2010-05-02T00:00.000Z', area: 2, ticketUrl: 'http://local.trac/2'},
  {id: 3,  clientId: 1, title: 'Title 3'.repeat(5),  description: 'desc-3 '.repeat(100),  priority: 3, deadline: '2010-05-02T00:00.000Z', area: 1, ticketUrl: 'http://local.trac/3'},
  {id: 4,  clientId: 1, title: 'Title 4'.repeat(5),  description: 'desc-4 '.repeat(100),  priority: 4, deadline: '2010-05-02T00:00.000Z', area: 3, ticketUrl: 'http://local.trac/4'},
  {id: 5,  clientId: 1, title: 'Title 5'.repeat(5),  description: 'desc-5 '.repeat(100),  priority: 5, deadline: '2010-05-02T00:00.000Z', area: 1, ticketUrl: 'http://local.trac/5'},
  {id: 6,  clientId: 1, title: 'Title 6'.repeat(5),  description: 'desc-6 '.repeat(100),  priority: 6, deadline: '2010-05-02T00:00.000Z', area: 4, ticketUrl: 'http://local.trac/6'},
  {id: 7,  clientId: 1, title: 'Title 7'.repeat(5),  description: 'desc-7 '.repeat(100),  priority: 7, deadline: '2010-05-02T00:00.000Z', area: 1, ticketUrl: 'http://local.trac/7'},
  {id: 8,  clientId: 1, title: 'Title 8'.repeat(5),  description: 'desc-8 '.repeat(100),  priority: 8, deadline: '2010-05-02T00:00.000Z', area: 1, ticketUrl: 'http://local.trac/8'},
  {id: 9,  clientId: 1, title: 'Title 9'.repeat(5),  description: 'desc-9 '.repeat(100),  priority: 9, deadline: '2010-05-02T00:00.000Z', area: 1, ticketUrl: 'http://local.trac/9'},

  {id: 10, clientId: 2, title: 'Title 10'.repeat(5), description: 'desc-10 '.repeat(100), priority: 1, deadline: '2010-05-02T00:00.000Z', area: 3, ticketUrl: 'http://local.trac/10'},
  {id: 11, clientId: 2, title: 'Title 11'.repeat(5), description: 'desc-11 '.repeat(100), priority: 2, deadline: '2010-05-02T00:00.000Z', area: 4, ticketUrl: 'http://local.trac/11'},
  {id: 12, clientId: 2, title: 'Title 12'.repeat(5), description: 'desc-12 '.repeat(100), priority: 3, deadline: '2010-05-02T00:00.000Z', area: 2, ticketUrl: 'http://local.trac/12'},

  {id: 13, clientId: 3, title: 'Title 13'.repeat(5), description: 'desc-13 '.repeat(100), priority: 1, deadline: '2010-05-02T00:00.000Z', area: 1, ticketUrl: 'http://local.trac/13'},
  {id: 14, clientId: 3, title: 'Title 14'.repeat(5), description: 'desc-14 '.repeat(100), priority: 2, deadline: '2010-05-02T00:00.000Z', area: 2, ticketUrl: 'http://local.trac/14'},
  {id: 15, clientId: 3, title: 'Title 15'.repeat(5), description: 'desc-15 '.repeat(100), priority: 3, deadline: '2010-05-02T00:00.000Z', area: 1, ticketUrl: 'http://local.trac/15'},
  {id: 16, clientId: 3, title: 'Title 16'.repeat(5), description: 'desc-16 '.repeat(100), priority: 4, deadline: '2010-05-02T00:00.000Z', area: 3, ticketUrl: 'http://local.trac/16'},
  {id: 17, clientId: 3, title: 'Title 17'.repeat(5), description: 'desc-17 '.repeat(100), priority: 5, deadline: '2010-05-02T00:00.000Z', area: 1, ticketUrl: 'http://local.trac/17'},
  {id: 18, clientId: 3, title: 'Title 18'.repeat(5), description: 'desc-18 '.repeat(100), priority: 6, deadline: '2010-05-02T00:00.000Z', area: 1, ticketUrl: 'http://local.trac/18'},
  {id: 19, clientId: 3, title: 'Title 19'.repeat(5), description: 'desc-19 '.repeat(100), priority: 7, deadline: '2010-05-02T00:00.000Z', area: 2, ticketUrl: 'http://local.trac/19'},
  {id: 20, clientId: 3, title: 'Title 20'.repeat(5), description: 'desc-20 '.repeat(100), priority: 8, deadline: '2010-05-02T00:00.000Z', area: 4, ticketUrl: 'http://local.trac/20'},
  {id: 21, clientId: 3, title: 'Title 21'.repeat(5), description: 'desc-21 '.repeat(100), priority: 9, deadline: '2010-05-02T00:00.000Z', area: 3, ticketUrl: 'http://local.trac/21'},
  {id: 22, clientId: 3, title: 'Title 22'.repeat(5), description: 'desc-22 '.repeat(100), priority: 10, deadline: '2010-05-02T00:00.000Z', area: 1, ticketUrl: 'http://local.trac/22'},
  {id: 23, clientId: 3, title: 'Title 23'.repeat(5), description: 'desc-23 '.repeat(100), priority: 11, deadline: '2010-05-02T00:00.000Z', area: 4, ticketUrl: 'http://local.trac/23'},
];


export default class FeaturesRemoteAPI {

  create(obj) {
    return new Promise((resolve, reject) => {
      obj.id = generateId(data);
      obj.priority = 1;
      const items = data.filter((item) => item.clientId == obj.clientId);
      increasePriorities(items, obj.priority);
      data.push(obj);
      resolve(obj);
    });
  }

  list() {
    return new Promise((resolve, reject) => {
      resolve(data.slice().sort((a, b) => b.priority - a.priority));
    });
  }

  update(id, nobj) {
    return new Promise((resolve, reject) => {
      let obj = data.find((item) => item.id == id);
      const items = data.filter((item) => item.clientId == obj.clientId);
      const priorities = items.map((item) => item.priority);
      if (nobj.priority) nobj.priority = limitFromRange(priorities, nobj.priority);
      adjustPriorities(items, obj.priority, nobj.priority);
      resolve(Object.assign(obj, nobj));
    });
  }

  del(id) {
    return new Promise((resolve, reject) => {
      let obj = data.find((item) => item.id == id);
      data = data.filter((item) => item.id != id);
      const items = data.filter((item) => item.clientId == obj.clientId);
      decreasePriorities(items, obj.priority);
      resolve();
    });
  }
}


// -------------------------------------------------------------------------------
// NOTE: The auxiliary functions below should be removed once this data handling
//  is moved to the backend.
// -------------------------------------------------------------------------------

function generateId(data) {
  const ids = data.map((item) => item.id);
  const maxid = Math.max.apply(null, ids);
  return maxid + 1;
}


function limitFromRange(options, targetv) {
  if (targetv === undefined) return;
  const max = Math.max.apply(null, options);
  const min = Math.min.apply(null, options);
  return Math.min(Math.max(targetv, min), max);
}


function adjustPriorities(items, currentp, targetp) {
  if (targetp === undefined) return;
  (targetp > currentp) && decreasePriorities(items, currentp, targetp);
  (targetp < currentp) && increasePriorities(items, currentp, targetp);
}

function increasePriorities(items, start, end) {
  changePriorities(items, start, end,
    (item) => item.priority += 1)
}

function decreasePriorities(items, start, end) {
  changePriorities(items, start, end,
    (item) => item.priority -= 1)
}


function changePriorities(items, start, end, fn) {
  items.filter((item) => item.priority >= (start || 0))
       .filter((item) => (end === undefined && true) || item.priority <= end)
       .forEach(fn)
}
