const express = require('express');
const path = require('path');
const favicon = require('serve-favicon');
const logger = require('morgan');

// Always require and configure near the top
// dotenv module reads the key=value pairs in a .env file
require('dotenv').config();

// Connect to the database
require('./config/database');

const app = express();

// Configure to use port 3001 instead of 3000 during
// development to avoid collision with React's dev server
// the or operator in this context is a shortcut
// ff the first part is true, return the first part,
// if the first part is false, return the second part
const PORT = process.env.PORT || 3001;

// logger takes "dev" as an argument
app.use(logger('dev'));
app.use(express.json());

// NOTE: Technically, app.use is all middleware
app.use(require('./config/checkToken'));

// Configure both serve-favicon & static middleware
// to serve from the production 'build' folder
app.use(favicon(path.join(__dirname, 'build', 'favicon.ico')));
// telling our express app to use this directory for our static assets
app.use(express.static(path.join(__dirname, 'build')));

// Put API routes here, before the "catch all" route
// IMPORTANT... THIS ALWAYS NEEDS TO BE BEFORE OUR CATCH ALL BUT AFTER EVERYTHING ELSE
app.use('/api/users', require('./routes/api/users'));

// The following "catch all" route (note the *) is necessary
// to return the index.html on all non-AJAX requests
// remember to mount API or other routes before this one since this is the "catch all"
app.get('/*', function (req, res) {
  res.sendFile(path.join(__dirname, 'build', 'index.html'));
});

app.listen(PORT, function () {
  console.log(`Express app running on port ${PORT}`);
});
