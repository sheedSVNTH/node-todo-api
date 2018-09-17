require('./config/config');

const _ = require('lodash');
//Library imports
const express = require('express');
const bodyParser = require('body-parser');
const {ObjectID} = require('mongodb');

//Import local imports
var {mongoose} = require('./db/mongoose');
var {Todo} = require('./models/todo');
var {User} = require('./models/user');
var {authenticate} = require('./middleware/authenticate');

//Call to Express
var app = express();
const port = process.env.PORT || 3000;

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

//DELETE /todos/:id ROUTE
app.delete('/todos/:id', (req, res) => {
	// get the id
	// validate the id -> not valid? return 404
	
	// remove todo by id
		//success
		// error
		// 400 with empty body
	var id = req.params.id;
	
	if (!ObjectID.isValid(id)) {
		return res.status(404).send();
	}
	Todo.findByIdAndRemove(id).then((todo) => {
	if(!todo) {
		return res.status(404).send();
	}
		res.send({todo});
	}).catch((e) => {
		res.status(400).send();
	});

});

app.patch('/todos/:id', (req, res) => {
	var id = req.params.id;
	var body = _.pick(req.body, ['text', 'completed']);
	
	if (!ObjectID.isValid(id)) {
		return res.status(404).send();
	}
	
	if (_.isBoolean(body.completed) && body.completed) {
		body.completedAt = new Date().getTime();
	} else {
		body.completed = false;
		body.completedAt = null;
	}
	
	Todo.findByIdAndUpdate(id, {$set: body}, {new: true}).then((todo) => {
		if (!todo) {
			return res.status(404).send();
		}
		res.send({todo});
	}).catch((e) => {
		res.status(400).send();
	})
});

// POST /users
app.post('/users/', (req, res) => {
	var body = _.pick(req.body, ['email', 'password']);
	var user = new User(body);
	
	user.save().then(() => {
		return user.generateAuthToken();
	}).then((token) => {
		// - means custom header
		res.header('x-auth', token).send(user);
	}).catch((e) => {
		res.status(400).send(e);
	})
});
	
app.get('/users/me', authenticate, (req, res) => {
	res.send(req.user);
});

//Local Port 3000 set-up
app.listen(port, () => {
	console.log(`Started up at port ${port}`);
});

module.exports ={app};