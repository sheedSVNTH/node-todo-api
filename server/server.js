
//Library imports
var express = require('express');
var bodyParser = require('body-parser');
var {ObjectID} = require('mongodb');

//Import local imports
var {mongoose} = require('./db/mongoose');
var {Todo} = require('./models/todo');
var {User} = require('./models/user');

//Call to Express
var app = express();

app.use(bodyParser.json());

//Body-parser will take JSON and convert it to object, attaching to req object

app.post('/todos', (req, res) => {
	var todo = new Todo({
		text: req.body.text
	});
	
	todo.save().then((doc) => {
		res.send(doc);
	}, (e) => {
		res.status(400).send(e);
	});
});


app.get('/todos', (req, res) => {
	Todo.find().then((todos) => {
		res.send({todos});
	}, (e) => {
		res.status(400).send(e);
	});
});

app.get('/todos/:id', (req, res) => {
	var id = req.params.id;
	//Check if ID is valid, if not, send 404 error
	if (!ObjectID.isValid(id)) {
		return res.status(404).send();
	}

	//findById 
	//success - if todo send it back // if no todo - send back 404 with empty body 
	//error - send 400 request was not value, dont sent back error/empty body

	Todo.findById(id).then((todo) => {
	if(!todo) {
		return res.status(404).send();
	}
		res.send({todo});
	}).catch((e) => {
		res.status(400).send();
	});
});

//Local Port 3000 set-up
app.listen(3000, () => {
	console.log('--Started on Port 3000--');
});

module.exports ={app};