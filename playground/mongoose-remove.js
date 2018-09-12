const {ObjectID} = require('mongodb');

const {mongoose} = require('./../server/db/mongoose');
const {Todo} = require('./../server/models/todo');
const {User} = require('./../server/models/user');

Todo.remove({}).then((result) => {
	console.log(result);
});

//Todo.findOneAndRemove({_id: '5b983928ec8cb205d75e2417'}).then((todo) => {
//	
//});

Todo.findByIdAndRemove('5b983928ec8cb205d75e2417').then((todo) => {
	console.log(todo);
});
