var express = require('express');

process.env.NODE_ENV = process.env.NODE_ENV || 'development';

var config = require('./config/environment');

var app = express();

require('./config/express')(app);
require('./config/routes')(app);


app.listen(config.port, ()=> { console.log("listening on port: " + config.port)});