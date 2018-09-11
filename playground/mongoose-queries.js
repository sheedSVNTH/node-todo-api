const {ObjectID} = require('mongodb');

const {mongoose} = require('./../server/db/mongoose');
const {Todo} = require('./../server/models/todo');
const {User} = require('./../server/models/user');

//var id = '5b97e3704893540307e301e1';
var id = '5b9735d6b45197037b5b0d6b';


if (!ObjectID.isValid(id)) {
	console.log('ID not valid');
}


//Todo.find({
//	_id: id
//}).then((todos) => {
//	console.log('Todos', todos);
//});
//
//Todo.findOne({
//	_id: id
//}).then((todo) => {
//	console.log('Todo', todo);
//});

//Todo.findById(id).then((todo) => {
//	if(!todo) {
//		return console.log('Item not found.')
//	}
//	console.log('Todo by Id', todo);
//}).catch((e) => console.log(e));

User.findById(id).then((user) => {
	if(!user) {
		return console.log('--User not found.--')
	}
	console.log(JSON.stringify(user, undefined, 2));
}).catch((e) => console.log(e));