var config = require('./environment');
var session = require('express-session');
var bodyParser = require('body-parser');

module.exports = (app) => {


  //cors support
  /*app.use((req, res, next) => {
      res.header("Access-Control-Allow-Origin","*");
      res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
      next();
  })*/

	//app.engine('html', require('ejs').renderFile);
  //app.set('view engine', 'html');
  app.use(bodyParser.json());
	app.use( session({
    secret            : config.sessionSecret,
    resave            : false,
    saveUninitialized : true
	}));

  if ('production' === config.env) {
    app.use(function(req, res, next) {
      if (req.headers['x-forwarded-proto'] != 'https') {
        res.redirect('https://' + req.get('host') + req.url);
      } else {
        next();
      }
    });
  }else {
  	//Do development stuff
  }

 

}