//const MongoClient = require('mongodb').MongoClient;
const {MongoClient, ObjectID} = require('mongodb');


MongoClient.connect('mongodb://localhost:27017/TodoApp', (err, client) => {
	if (err) {
		return console.log('Unable to connect to MongoDB server.');
	}
	
	console.log('==>Connected to MongoDB server');
	const db = client.db('TodoApp')

	db.collection('Users').findOneAndUpdate({
		_id: new ObjectID('5b968e6a427eb6043cfe8eb7')
	}, {
		$set: {
			name: 'Rasheed'
		}, 
		$inc: {
			age: 4
		}
	}, {
		returnOriginal: false
	}).then((result) => {
		console.log(result);
	});
	
//
//		db.collection('Todos').findOneAndUpdate({
//		_id: new ObjectID('5b96cfb5e6406d2d42b9d960')
//	}, {
//		$set: {
//			completed: true
//		}
//	}, {
//		returnOriginal: false
//	}).then((result) => {
//		console.log(result);
//	})

	//db.close();
});

