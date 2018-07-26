const express = require('express');
const bodyParser = require('body-parser');
const app = express();
//const routes = require('./server/src/routes/entriesRoute');
const entriesCtrl = require('./src/controllers/entryController');

// parse requests of content-type - application/json
app.use(bodyParser.json());
// parse requests of content-type - application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({extended:false}));

app.use((req, res, next) => {
	res.setHeader('cache-control', 'private,max-age=0,no-cache, no-store, must-revalidate');
	res.setHeader('expires', '0');
	res.setHeader('pragma', 'no-cache');
	next();
});

//Fetch the index page
app.get('/', (req,res) => {
	res.send('Welcome to my new Diary Endpoints');
});

//Fetch all entries
//app.get('/api/v1/entries', routes.getAll);
app.get('/api/v1/entries', entriesCtrl.getAllEntries);

//Fetch a single entry
//app.get('/api/v1/entries/:id', routes.getOne);
app.get('/api/v1/entries/:id', entriesCtrl.getOneEntry);

//Create a single entry
//app.post('/api/v1/entries', routes.createEntry);
app.post('/api/v1/entries', entriesCtrl.createEntry);

//Modify a single entry
//app.put('/api/v1/entries/:id', routes.updateEntry );
app.put('/api/v1/entries/:id', entriesCtrl.updateEntry );

//Delete a single entry
//app.delete('/api/v1/entries/:id', routes.deleteEntry);
app.delete('/api/v1/entries/:id', entriesCtrl.deleteEntry);

//Sever port
const port = process.env.PORT || 3000;
app.listen(port, () => (`Listening on port ${port}...`));
module.exports = app;
