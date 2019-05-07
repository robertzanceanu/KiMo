const http = require('http');
const fs = require('fs');
var cookies = require('cookies');

var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/KiMo', {useNewUrlParser: true});

const userModel = require('./models/userModel');
var user = userModel(mongoose);

const sensorModel = require('./models/sensorModel');
var sensorKid = sensorModel(mongoose);

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
    //var cookie = new cookies(req, res, null);

    styleController(req, res); 
    indexController(req, res);
    signInController(req, res, user);
    loginController(req, res, user);
    mapController(req, res);
    adaugareSenzorController(req, res, sensorKid);
    modificareSenzorController(req, res, sensorKid);
    actualizareProfilController(req, res, user);
    forgotPasswordController(req, res, user);
});

server.listen(port, ()=> {
    console.log('Server is running at port: ' + port);
});