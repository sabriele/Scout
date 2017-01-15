var	express    = require("express"),
	router     = express.Router({ mergeParams: true }),
	Campground = require("../models/campground.js"),
	Comment    = require("../models/comment.js"),
	middleware = require("../middleware"); // filename not needed because it automatically redirects to index.js


/* 3.CREATE */
router.post("/", middleware.isLoggedIn, function (req, res) {
	Campground.findById(req.params.id, function (err, campground) {
		if (err) {
			console.log(err);
			res.redirect("/campgrounds/" + campground._id);
		} else {
			Comment.create(req.body.comment, function (err, newComment) {
				if (err) { console.log(err); } else {
					newComment.author.id = req.user._id;
					newComment.author.username = req.user.username;
					newComment.save();

					campground.comments.push(newComment);
					campground.save();

					req.flash("success", "You have successfully posted a comment.");
					res.redirect("/campgrounds/" + campground._id);
				}
			});
		}
	});
});

/* 5.EDIT */
router.get("/:comment_id/edit", middleware.isCommentOwner, function (req, res) {
	Comment.findById(req.params.comment_id, function (err, editComment) {
		if (err) { res.redirect("back"); } else {
			res.render("comments/edit", { campgroundId: req.params.id, comment: editComment });
		}
	});
});

/* 6.UPDATE */
router.put("/:comment_id", middleware.isCommentOwner, function (req, res) {
	Comment.findByIdAndUpdate(req.params.comment_id, req.body.comment, function (err, updatedComment) {
		if (err) { res.redirect("back"); } else {
			req.flash("success", "You have successfully updated your comment.");
			res.redirect("/campgrounds/" + req.params.id);
		}
	});
});

/* 7.DESTROY */
router.delete("/:comment_id", middleware.isCommentOwner, function (req, res) {
	Comment.findByIdAndRemove(req.params.comment_id, function (err) {
		if (err) { res.redirect("back"); } else {
			req.flash("success", "You have successfully removed your comment.");
			res.redirect("/campgrounds/" + req.params.id);
		}
	});
});


module.exports = router;
