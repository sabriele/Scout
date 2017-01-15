var express    = require("express"),
	router     = express.Router(),
	Campground = require("../models/campground.js"),
	Comment    = require("../models/comment.js"),
	middleware = require("../middleware"); // filename not needed because it automatically redirects to the index.js


/* 1.INDEX */
router.get("/", function (req, res) {
	Campground.find({}, function (err, allCampgrounds) {
		if (err) {
			console.log(err);
		} else {
			res.render("campgrounds/index", { campgrounds: allCampgrounds, currentUser: req.user });
		}
	});
});

/* 2.NEW */
router.get("/new", middleware.isLoggedIn, function (req, res) {
	res.render("campgrounds/new");
});

/* 3.CREATE */
router.post("/", middleware.isLoggedIn, function (req, res) {
	// /* Method 1 */ var name = req.body.name; var image = req.body.image; var description = req.body.description; var author = { id: req.user._id, username: req.user.username }; var newCampground = { name: name, image: image, description: description, author: author };
	// /* Method 2 */ var newCampground = { name: req.body.name, image: req.body.image, description: req.body.description, author: { id: req.user._id, username: req.user.username } };
	var author = {
		id: req.user._id,
		username: req.user.username
	};
	req.body.campground.author = author;
	Campground.create(req.body.campground, function (err, newCampground) {
		if (err) { console.log(err); } else {
			req.flash("success", "You have successfully created a new campground.");
			res.redirect("/campgrounds");
		}
	});
});

/* 4.SHOW */
router.get("/:id", function (req, res) {
	Campground.findById(req.params.id).populate("comments").exec(function (err, foundCampground) {
		if (err) { console.log(err); } else {
			res.render("campgrounds/show", { campground: foundCampground });
		}
	});
});

/* 5.EDIT */
router.get("/:id/edit", middleware.isCampgroundOwner, function (req, res) {
	Campground.findById(req.params.id, function (err, editCampground) {
		if (err) { console.log(err); } else {
			res.render("campgrounds/edit", { campground: editCampground });
		}
	});
});

/* 6.UPDATE */
router.put("/:id", middleware.isCampgroundOwner, function (req, res) {
	Campground.findByIdAndUpdate(req.params.id, req.body.campground, function (err, updatedCampground) {
		if (err) { console.log(err); } else {
			req.flash("success", "You have successfully updated the campground.");
			res.redirect("/campgrounds/" + req.params.id);
		}
	});
});

/* 7.DESTROY */
router.delete("/:id", middleware.isCampgroundOwner, function (req, res) {
	Campground.findByIdAndRemove(req.params.id, function (err) {
		if (err) { console.log(err); } else {
			req.flash("success", "You have successfully removed the campground.");
			res.redirect("/campgrounds");
		}
	});
});


module.exports = router;
