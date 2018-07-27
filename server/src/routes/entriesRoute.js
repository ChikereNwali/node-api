const express = require('express');
const entries = require('../models/entriesDb');
const validateEntries = require('../functions/validateEntry');
const router = express.Router();

router.getAll = (req, res) => {
	res.send(entries);
};

router.getOne = (req, res) => {
	const entry = entries.find(c => c.id === parseInt(req.params.id) );
	if(!entry) res.status(404).send('The entry with the given ID was not found');
	res.send(entry);
};

router.createEntry = (req,res) => {

	const {error} = validateEntries(req.body);
	if(error) return res.status(400).send(error.details[0].message);

	const entry = {
		id:entries.length + 1,
		title:req.body.title,
		note:req.body.note
	};
	entries.push(entry);
	res.send(entry);

};

router.updateEntry = (req,res) =>{
	const entry = entries.find(c => c.id === parseInt(req.params.id) );
	if(!entry){ res.status(404).send('The course with the given ID was not found');
		return;
	}
	else{
		const {error} = validateEntries(req.body);
		if(error) return res.status(400).send(error.details[0].message);
		entry.title = req.body.title;
		entry.note = req.body.note;
		res.send(entry);
	}
};

router.deleteEntry = (req,res) =>{
	const entry = entries.find(c => c.id === parseInt(req.params.id) );
	if(!entry) res.status(404).send('The entry with the given ID was not found');

	const targetIndex = entries.indexOf(entry);
	entries.splice(targetIndex, 1);

	res.send(entry);
};


module.exports = router;
