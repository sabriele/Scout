# Scout
Campground rating site.

**[You can view this app in production here.](https://scout-camp-app.herokuapp.com/)**

## About

Scout is a website that publishes crowd-sourced reviews of campground sites. Users can browse through the reviews on the site as well as contribute personal ratings, reviews and comments. A user can look through the various campground site reviews without logging in, but will be directed to create a personal account if they wish to submit a review or comment on another review.

Each review has a campground name, a short description, a picture of the campground site, the price of the site per night, and a rating system (out of 5 stars). Reviews can be edited or deleted even after they have been posted.

Additionally, the website is fully responsive, allowing users to easily access the site on their mobile devices.


## Getting Started

### Prerequisites

* [Node.js and npm](https://nodejs.org/en/download/)
* [MongoDB](https://www.mongodb.com/download-center)

For deployment:
* [Git](https://git-scm.com/downloads)
* [Heroku CLI](https://devcenter.heroku.com/articles/heroku-cli)

On MacOS, prerequisite packages can be installed via [Homebrew](https://brew.sh/) (recommended)
```bash
$ brew install node mongodb git heroku
```
*(By chaining the packages together you can install multiple Homebrew formulas simultaneously)*


### Installing

Clone this repo to your desktop
```bash
$ git clone https://github.com/sabriele/Scout
```

Then, go to its root directory and run 
```bash
$ npm install
``` 
to install all of its dependencies.

Once the dependencies are installed, you can run `node app.js` to start the application. You will then be able to access it at http://localhost:3000.

## Deployment

To deploy this project to a live system, first convert it to a Git repository. In the root directory,
```bash
$ git init
```

Then, stage and commit your project
```bash
$ git add .
$ git commit -m "Initial commit"
```

Create the app on Heroku (replace 'appname' with your choice of name for the project)
```bash
$ heroku create appname
```
The newly created app will show up on your [Heroku dashboard](https://dashboard.heroku.com/).

Upload all of the files from your local repository to the remote repository
```bash
$ git push heroku master
```

Finally, configure a database on mLab to work with Heroku: 
* On the mLab dashboard, create a new database. 
* Under the 'Users' tab, add a new user with a username and password. 
* To connect with the database, head over to your Heroku app dashboard. Under the app's 'Settings' tab, create a new Config Variable key-value pair with `DATABASEURL` in the *Key* field and your MongoDB URI in the *Value* field (for example, `mongodb://username:password@ds19999.mlab.com:9999/appname`).

## Technology Stack

**Front-end:**
* HTML5, CSS3, JavaScript
* [Bootstrap](http://getbootstrap.com/)
* [EJS](http://ejs.co/)

**Back-end:**
* [MongoDB](https://www.mongodb.com/)
* [Node.js](https://nodejs.org/), [npm](https://www.npmjs.com/)
	* [Express](https://expressjs.com/)
	* [Mongoose](http://mongoosejs.com/)
	* [Passport.js](http://passportjs.org/)

**Deployed with:**
* [Heroku](https://www.heroku.com/)
* [mLab](https://mlab.com/)

## Acknowledgments

Based on [The Web Developer Bootcamp](https://www.udemy.com/the-web-developer-bootcamp/) by Colt Steele and Ian Schoonover.
