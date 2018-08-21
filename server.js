var express = require('express');
var bodyParser = require('body-parser');
var cas = require('byu-cas');
var session = require('express-session');
var CASAuthentication = require('cas-authentication');
var app = express();


app.use( session({
    secret            : 'asfjip2q3r__u89fwdiojfDSJFDSJ**FF',
    resave            : false,
    saveUninitialized : true
}));

// Create a new instance of CASAuthentication.
var cas = new CASAuthentication({
    cas_url     : 'https://cas.byu.edu/cas/',
    service_url : 'http://localhost:4000',
    cas_version: 'saml1.1'
});

app.use(bodyParser.json());
/*app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin","*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
})*/

var api = express.Router();

api.get('/', cas.bounce, (req, res)=>{
	res.send( '<html><body>Hello!</body></html>' );
});


// Unauthenticated clients will receive a 401 Unauthorized response instead of
// the JSON data.
api.get( '/api', cas.block, ( req, res ) => {
    res.json( { success: true } );
});

// An example of accessing the CAS user session variable. This could be used to
// retrieve your own local user records based on authenticated CAS username.
api.get( '/api/user', cas.block, ( req, res ) => {
    res.json( { cas_user: req.session[ cas.session_name ] } );
});

// Unauthenticated clients will be redirected to the CAS login and then to the
// provided "redirectTo" query parameter once authenticated.
api.get( '/authenticate', cas.bounce_redirect );
 
// This route will de-authenticate the client with the Express server and then
// redirect the client to the CAS logout page.
api.get( '/logout', cas.logout, (req, res)=>{
	res.send( '<html><body>Log Out Successful!</body></html>' );
} );

app.use('/', api);

/*


api.get('/signin', (req, res) =>{
	cas.validate(ticket, service).then(function success(response) {
	  console.log("Ticket valid! Hello, " + response.username);
	  console.dir(response.attributes);
    res.json(response);
	}).catch(function error(e) {
	  console.log("Invalid ticket. Error message was: " + e.message);
	});
	console.log('here');
	res.sendStatus(200);
})

api.get('/', (req, res) =>{
	console.log('got here')
    res.sendStatus(200);
})

app.use('/api', api);*/

var port = 4000;
app.listen(port);