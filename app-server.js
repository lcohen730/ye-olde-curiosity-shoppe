const express = require('express');
const app = express();
const path = require('path');
const favicon = require('serve-favicon');
const logger = require('morgan');

app.use(logger('dev'));
app.use(express.json());

app.use(favicon(path.join(__dirname, 'public', 'img', 'favicon.ico')))
app.use(express.static(path.join(__dirname, 'public')))

// Check if token and create req.user
app.use(require('./config/checkToken'));

// Put API routes here, before the "catch all" route
app.use('/api/users', require('./routes/api/users'));
// Protect the API routes below from anonymous users
const ensureLoggedIn = require('./config/ensureLoggedIn');
app.use('/api/items', ensureLoggedIn, require('./routes/api/items'));
app.use('/api/orders', ensureLoggedIn, require('./routes/api/orders'));

// The following "catch all" route (note the *) is necessary
// to return the index.html on all non-AJAX requests
app.get('/*', function(req, res) {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
  });
  
  // Configure to use port 3001 instead of 3000 during
  // development to avoid collision with React's dev server
  const port = process.env.PORT || 3008;
  
  app.listen(port, function() {
    console.log(`Express app running on port ${port}`)
  });

module.exports = app