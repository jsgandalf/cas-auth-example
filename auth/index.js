var express = require('express');
var config = require('../config/environment');
var CASAuthentication = require('cas-authentication');

var cas = new CASAuthentication({
    cas_url     : 'https://cas.byu.edu/cas/',
    service_url : config.protocal + config.host + ':' + config.port,
    cas_version: 'saml1.1'
});

var router = express.Router();

router.get('/', cas.bounce, (req, res)=>{
	res.send( '<html><body>Hello!</body></html>' );
});

// Unauthenticated clients will receive a 401 Unauthorized response instead of
// the JSON data.
router.get( '/api', cas.block, ( req, res ) => {
    res.json( { success: true } );
});

// An example of accessing the CAS user session variable. This could be used to
// retrieve your own local user records based on authenticated CAS username.
router.get( '/api/user', cas.block, ( req, res ) => {
    res.json( { cas_user: req.session[ cas.session_name ] } );
});

// Unauthenticated clients will be redirected to the CAS login and then to the
// provided "redirectTo" query parameter once authenticated.
router.get( '/authenticate', cas.bounce_redirect );
 
// This route will de-authenticate the client with the Express server and then
// redirect the client to the CAS logout page.
router.get( '/logout', cas.logout, (req, res)=>{
	res.send( '<html><body>Log Out Successful!</body></html>' );
} );

module.exports = router;