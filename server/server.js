
//Library imports
var express = require('express');
var bodyParser = require('body-parser');

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

//Local Port 3000 set-up
app.listen(3000, () => {
	console.log('--Started on Port 3000--');
});

module.exports ={app};