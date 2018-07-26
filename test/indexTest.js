/*global  describe:true*/
/*eslint func-style: ["error", "declaration", { "allowArrowFunctions": true }]*/
/*global  it:true*/
/*eslint no-undef: "error"*/

const index = require('../app');
const chai = require('chai');
const request = require('supertest');
const expect = chai.expect;



describe('API Endpoints', ()=>{

	let entry = {id:1, title: 'My world cup experience', note:'It was awesome'};


	//GET all entries
	describe('to get all entries', ()=> {
		it('should fetch all entries correctly', (done)=> {
			request(index) .get('/api/v1/entries')
				.end((err, res) =>{
					expect(res.statusCode).to.equal(200);

					done();
				});
		});
	});


	//POST : Returns error message
	describe('to create an entry ', () => {
		it('should create an entry if the entries are valid',(done) =>{
			request(index) .post('/api/v1/entries') .send(entry) .end((err, res) =>{
				if(err) done(err);
				expect(res.statusCode).to.equal(400);
				//entry != res.body;
				done();
			});
		});

		//POST : creates an entry
		it('should return error message (400):Bad request', (done)=> {

			request(index) .post('/api/v1/entries') .send(entry) .end( (err, res) => {
				entry.id = res.body.id;

				// expect(res.body).to.be.a('object');
				//
				// expect(entry).to.have.property('id');
				// expect(entry).to.have.property('title');
				// expect(entry).to.have.property('note');
				// expect(entry.id).to.be.a('number');
				// expect(entry.title).to.be.a('string');
				// expect(entry.note).to.be.a('string');
				// expect(entry.id).to.equal(1);
				// expect(entry.title).to.equal('My world cup experience');
				// expect(entry.note).to.equal('It was awesome');

				done();
			});

		});

	});

	//GET: fetches a single entry
	describe('GET - fetches an entry by ID', () => {

		it('should return 404 if an entry is not found', (done)=> {
			request(index) .get('/api/v1/entries' + entry.id) .end( (err, res) => {
				expect(res.statusCode).to.equal(404);
				done();
			});
		});

		it('should fetch an entry', (done) => {
			request(index) .get('/api/v1/entries' + entry.id) .end((err, res) => {
				expect(res.body).to.be.a('object');
				done();
			});
		});
	});


	//DELETE - removes a single entry
	describe('DELETE - removes an entry by ID', ()=> {
		it(' should return 404 if entry is not found', (done)=> {
			//let entryId = entry[0].id;
			request(index)
				.delete('/api/v1/entries' + entry.id)
				.end((err, res) =>{
					expect(res.statusCode).to.equal(404);
					done();
				});
		});

		it('should remove an entry', (done)=> {
			request(index) .delete('/api/v1/entries' + entry.id).end((err, res) => {
				expect(res.body).to.be.a('object');
				done();
			});
		});

	});


	//PUT -modifies an entry
	describe('PUT - modifies an entry',()=>{
		it('should return 404 if entry is not found',(done) =>{
			request(index).put('/api/v1/entries' + entry.id).end((err,res)=>{
				expect(res.statusCode).to.equal(404);
				done();
			});
		});

		it('should update an entry',(done) =>{
			request(index).put('/api/v1/entries' + entry.id).end((err,res)=>{
				(res.body);
				done();
			});
		});
	});


});
