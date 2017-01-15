/******************/
/*  DEPENDENCIES  */
/******************/
var	express               = require("express"),
	bodyParser            = require("body-parser"),
	mongoose              = require("mongoose"),
	passport              = require("passport"),
	LocalStrategy         = require("passport-local"),
	passportLocalMongoose = require("passport-local-mongoose"),
	expressSession        = require("express-session"),
	methodOverride        = require("method-override"),
	flash                 = require("connect-flash");

/***********************/
/*  MODELS and ROUTES  */
/***********************/
var Campground            = require("./models/campground"),
	Comment               = require("./models/comment"),
	User                  = require("./models/user");

var authenticationRoutes  = require("./routes/authentications"),
	campgroundRoutes      = require("./routes/campgrounds"),
	commentRoutes         = require("./routes/comments");

/****************/
/*  APP CONFIG  */
/****************/

// Express & EJS
var app = express();
app.use(express.static(__dirname + "/public"));
app.set("view engine", "ejs");

// Mongoose & Database
var url = process.env.DATABASEURL || "mongodb://localhost/yelp_camp";
mongoose.connect(url);

// Bodyparser & Method Override
app.use(bodyParser.urlencoded({ extended: true })); /* Always placed ahead of routes */
app.use(methodOverride("_method"));
app.use(flash());

// Passport & Sessions
app.use(expressSession({ /* app.use(require("express-session")({ */
	secret: "Yelp Camp", resave: false, saveUninitialized: false
}));
app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());
app.use(function (req, res, next) { /* Place this after passport config but before routes */
	res.locals.currentUser = req.user; /* This will be called on EVERY route */
	res.locals.error = req.flash("error");
	res.locals.success = req.flash("success");
	next();
});

// Routes
app.use("/", authenticationRoutes);
app.use("/campgrounds", campgroundRoutes);
app.use("/campgrounds/:id/comments", commentRoutes);


/************/
/*  SERVER  */
/************/
var PORT_NUM         = process.env.PORT || 3000;
var SERVER_START_MSG = "> Server is up and running on Port " + PORT_NUM + "!";

app.listen(PORT_NUM, function () {
	console.log(SERVER_START_MSG);
});
