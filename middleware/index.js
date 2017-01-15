var Campground = require("../models/campground.js"),
	Comment    = require("../models/comment.js");

var middleware = {

	isLoggedIn: function (req, res, next) {
		if (req.isAuthenticated()) { // isAuthenticated method docs at: https://github.com/jaredhanson/passport/blob/a892b9dc54dce34b7170ad5d73d8ccfba87f4fcf/lib/passport/http/request.js#L74
			return next();
		}
		req.flash("error", "You must be logged in to do that.");
		res.redirect("/login");
	},

	isCampgroundOwner: function (req, res, next) {
		if (req.isAuthenticated()) {
			Campground.findById(req.params.id, function (err, foundCampground) {
				if (err) {
					req.flash("error", "Campground not found.");
					res.redirect("back");
				} else {
					if (foundCampground.author.id.equals(req.user._id)) {
						next();
					} else {
						req.flash("error", "You do not have permission to do that.");
						res.redirect("back");
					}
				}
			});
		} else {
			req.flash("error", "Please log in to access your campground.");
			res.redirect("back");
		}
	},

	isCommentOwner: function (req, res, next) {
		if (req.isAuthenticated()) {
			Comment.findById(req.params.comment_id, function (err, foundComment) {
				if (err) {
					req.flash("error", "Comment not found.");
					res.redirect("back");
				} else {
					if (foundComment.author.id.equals(req.user._id)) {
						next();
					} else {
						req.flash("error", "You do not have permission to do that.");
						res.redirect("back");
					}
				}
			});
		} else {
			req.flash("error", "Please log in to access your comment.");
			res.redirect("back");
		}
	}

};


module.exports = middleware;
