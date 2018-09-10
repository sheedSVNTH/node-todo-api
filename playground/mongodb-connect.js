//const MongoClient = require('mongodb').MongoClient;
const {MongoClient, ObjectID} = require('mongodb');

var obj = new ObjectID();
console.log(obj);

////Example of ES6 Destructuring
//var user = {name: 'Rasheed', age: 31};
////object key set equal to oject name
//var {name} = user;
//console.log(name);

MongoClient.connect('mongodb://localhost:27017/TodoApp', (err, client) => {
	if (err) {
		return console.log('Unable to connect to MongoDB server.');
		//Using the return keyword in event error exists so it does not execute the rest of code block 
	}
	console.log('Connected to MongoDB server');
	const db = client.db('TodoApp')
	
//	db.collection('Todos').insertOne({
//		text: 'Something to do',
//		completed: false
//		
//	}, (err, result) => {
//		//code to handle the error
//		if (err) {
//			return console.log('Unable to insert todo: ', err);
//		}
//		//if no error, instore the documents
//		console.log(JSON.stringify(result.ops, undefined, 2));
//	});
	
//	db.collection('Users').insertOne({
//		_id: 123,
//		name: 'Rasheed',
//		age: 31,
//		location: 'Miami, FL'
//		
//	}, (err, result) => {
//		//code to handle the error
//		if (err) {
//			return console.log('Unable to insert user: ', err);
//		}
//		//if no error, instore the documents
//		console.log(result.ops[0]._id.getTimeStamp());
//	});
	
	db.close();
});