var express  = require("express"),
	router   = express.Router(),
	passport = require("passport"),
	User     = require("../models/user.js");


/* 1.ROOT */
router.get("/", function (req, res) {
	res.render("home");
});

/* 2.REGISTER */
router.get("/register", function (req, res) {
	res.render("register");
});

router.post("/register", function (req, res) {
	var newUser = new User({ username: req.body.username });
	User.register(newUser, req.body.password, function (err, user) {
		if (err) {
			req.flash("error", "User already registered.");
			res.redirect("/register");
		}
		passport.authenticate("local")(req, res, function () {
			req.flash("success", "Welcome to YelpCamp " + req.body.username + "!");
			res.redirect("/campgrounds");
		});
	});
});

/* 3.LOGIN */
router.get("/login", function (req, res) {
	res.render("login");
});

router.post("/login", passport.authenticate("local", { // app.post(route, middleware, callback)
	successRedirect: "/campgrounds",
	failureRedirect: "/login"
}), function (req, res) {

});

/* 4.LOGOUT */
router.get("/logout", function (req, res) {
	req.logout();
	req.flash("success", "You have successfully logged out. See you again soon!");
	res.redirect("/campgrounds");
});

/* 5.ERROR */
router.get("/error404", function (req, res) {
	res.render("error");
});


module.exports = router;
