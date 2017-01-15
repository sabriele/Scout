var mongoose = require("mongoose");

var campgroundSchema = new mongoose.Schema({
	name: String,
	image: String,
	description: String,
	price: { type: Number, get: getPrice },
	author: {
		id: {
			type: mongoose.Schema.Types.ObjectId,
			ref: "User"
		},
		username: String
	},
	comments: [{
		type: mongoose.Schema.Types.ObjectId,
		ref: "Comment"
	}]
});

function getPrice(num) { // Why don't I need setter function?
	num = num * 100;
	return (num / 100).toFixed(2);
}

// // Getter
// campgroundSchema.path("price").get(function (num) {
// 	return (num / 100).toFixed(2);
// });

// // Setter
// campgroundSchema.path("price").set(function (num) {
// 	return num * 100;
// });



module.exports = mongoose.model("Campground", campgroundSchema);
