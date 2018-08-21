var express = require('express');
var bodyParser = require('body-parser');
var cas = require('byu-cas');
var app = express();


app.use(bodyParser.json());
/*app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin","*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
})*/

function doSomethingToGetTicket(){
	console.log('ticket');
}

var ticket = doSomethingToGetTicket();
var service = 'http://localhost:4000/';

/*app.get('/', function(req, res){
	res.sendStatus(200);
})*/

var api = express.Router();

api.get('/', (req, res)=>{
	res.sendStatus(200);
});

api.get('/signin', (req, res)=>{
	cas.validate(ticket, service).then(function success(response) {
	  console.log("Ticket valid! Hello, " + response.username);
	  console.dir(response.attributes);
    res.sendStatus(200);
	}).catch(function error(e) {
		res.sendStatus(401);
	  console.log("Invalid ticket. Error message was: " + e.message);
	});
});

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