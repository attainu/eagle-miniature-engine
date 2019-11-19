const mongoose = require('mongoose');
​
var insightsSchema = new mongoose.Schema({
	appId: {
		type: mongoose.Schema.Types.ObjectId,
		ref: 'App'
	},
	viewCount: Number,
	shareCount: Number,
	resultCount: Number
})
​
module.exports = mongoose.model('Insight', insightsSchema);

​
var quizSchema = new mongoose.Schema({
	appId: {
		type: mongoose.Schema.Types.ObjectId,
		ref: 'App'
	},
	data: {
		question: String,
		options: [{
			type: String
		}]
	},
	createdAt: Date,
	updatedAt: Date
})
​
module.exports = mongoose.model('Quiz', quizSchema);

​
var appSchema = new mongoose.Schema({
	name:{
		type: String,
		required: true
	},
	thumbnail_image: {
		type: String,
		required: true
	},
	appType: {
		type: Schema.Types.ObjectId,
    	required: true,
    	refPath: 'currApp'
	},
	currApp: {
		type: String,
		required: true,
		enum: ['quiz', 'motvQuotes']
	},
	active: {
		type: Boolean,
		required: true
	},
	createdAt: Date,
	updatedAt: Date
});
​
module.exports = mongoose.model('Quiz', quizSchema);

​
var userSchema = new mongoose.Schema({
	userId: String,
	facebookID: {
		type: String
	},
	name: String,
	profileImage: String,
	email: String
})
​
module.exports = mongoose.model('User', userSchema);