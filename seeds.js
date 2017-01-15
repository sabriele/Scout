var mongoose = require("mongoose");
var Campground = require("./models/campground"),
	Comment = require("./models/comment");

var data = [
	{ name: "Salmon Creek", image: "https://images.unsplash.com/photo-1414016642750-7fdd78dc33d9?ixlib=rb-0.3.5&q=80&fm=jpg&crop=entropy&s=28288b1af03ab13b4edac3df8383aa9b", description: "Excellent fishing opportunities!" },
	{ name: "Granite Hill", image: "https://images.unsplash.com/photo-1460458248189-2cb101df4e67?ixlib=rb-0.3.5&q=80&fm=jpg&crop=entropy&s=8b6519b7847ba2d8fb662c6a27661f65", description: "Chilly grey mornings." },
	{ name: "Mountain Goat's Rest", image: "https://images.unsplash.com/photo-1459378560864-f0b73495599c?ixlib=rb-0.3.5&q=80&fm=jpg&crop=entropy&s=386f6e8581f34b7672b53c7bd41198ed", description: "" }
];

function seedDatabase() {
	Campground.remove({}, function(err) { 		// Remove campgrounds
		if (err) { console.log(err); } else {
			console.log("Campground(s) removed.");
			data.forEach(function(seed) { 		// Re-populate campgrounds
				Campground.create(seed, function(err, campground) {
					if (err) { console.log(err); } else {
						console.log("Campground created.");
						Comment.create({		// Add comments
							text: "This is a comment.",
							author: "So-and-so"
						}, function(err, comment) {
							if (err) { console.log(err); } else {
								campground.comments.push(comment);
								campground.save();
								console.log("New comment created.");
							}
						});
					}
				});
			});
		}
	});
}

module.exports = seedDatabase;
