//Import the mongoose module
var mongoose = require('mongoose');
//Set up default mongoose connection
var mongoDB = 'mongodb://localhost:27017/flight_database';
mongoose.connect(mongoDB, { useMongoClient: true });
// Get Mongoose to use the global promise library
mongoose.Promise = global.Promise;
//Get the default connection
var db = mongoose.connection;
//Bind connection to error event (to get notification of connection errors)
db.on('error', console.error.bind(console, 'MongoDB connection error:'));

var Schema = mongoose.Schema;

// create a schema
var citySchema = new Schema({
	_id: mongoose.Schema.Types.ObjectId,
	name: { type: String, required: true },
	/*name: { type: String, required: true, unique: true },*/ //uique names should be gurranteed but it is commented here just for test
	created_at: Date,
	updated_at: Date
});

// on every save, add the date
citySchema.pre('save', function(next) {
	// get the current date
	var currentDate = new Date();
	// change the updated_at field to current date
	this.updated_at = currentDate;
	// if created_at doesn't exist, add to that field
	if (!this.created_at)
		this.created_at = currentDate;
	next();
});

// the schema is useless so far
// we need to create a model using it
var City = mongoose.model('City', citySchema);

// make this available to our users in our Node applications
module.exports = City;