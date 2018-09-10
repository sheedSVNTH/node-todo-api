//const MongoClient = require('mongodb').MongoClient;
const {MongoClient, ObjectID} = require('mongodb');


MongoClient.connect('mongodb://localhost:27017/TodoApp', (err, client) => {
	if (err) {
		return console.log('Unable to connect to MongoDB server.');
	}
	
	console.log('==>Connected to MongoDB server');
	const db = client.db('TodoApp')
	
//	//deleteMany - duplicate text items from MongoDB
	db.collection('Users').deleteMany({name: 'Rasheed'}).then((result) => {
	console.log(result);
	});
	
	//deleteOne
//	db.collection('Todos').deleteOne({text: 'Groceries'}).then((result) => {
//		console.log(result);
//	});
	
	//findOneAndDelete
db.collection('Users').findOneAndDelete({_id: new ObjectID("5b956037a3f3e20446064907")}).then((result) => {
		console.log(JSON.stringify(result, undefined, 2));
	});
	
	//db.close();
});