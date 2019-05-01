const http = require('http');
const fs = require('fs');

var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/KiMo', {useNewUrlParser: true});

const userModel = require('./models/userModel');
var user = userModel(mongoose);

const styleController = require('./controllers/styleController');
const signInController = require('./controllers/signInController');
const indexController = require('./controllers/indexController');
const loginController = require('./controllers/loginController');
const mapController = require('./controllers/mapController');
const adaugareSenzorController = require('./controllers/adaugareSenzorController');
const modificareSenzorController = require('./controllers/modifSenzorController');
const actualizareProfilController = require('./controllers/actualizareProfilController');
const forgotPasswordController = require('./controllers/forgotPasswordController');

var port = 8080;

const server = http.createServer(function (req,res){
    styleController(req, res); 
    indexController(req, res);
    signInController(req, res);
    loginController(req, res);
    mapController(req, res);
    adaugareSenzorController(req, res);
    modificareSenzorController(req, res);
    actualizareProfilController(req, res);
    forgotPasswordController(req, res);
});

server.listen(port, ()=> {
    console.log('Server is running at port: ' + port);
});