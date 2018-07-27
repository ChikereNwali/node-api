const routes = require('../routes/entriesRoute');

const entriesCtrl = {};

entriesCtrl.getAllEntries = routes.getAll;
entriesCtrl.getOneEntry = routes.getOne;
entriesCtrl.createEntry = routes.createEntry;
entriesCtrl.updateEntry = routes.updateEntry;
entriesCtrl.deleteEntry = routes.deleteEntry;
module.exports = entriesCtrl;
