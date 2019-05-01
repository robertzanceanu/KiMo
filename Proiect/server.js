const http = require('http');
const fs = require('fs');

var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/KiMo', {useNewUrlParser: true});

var userModel = require('./models/userModel');
var signInController = require('./controllers/signInController');
var user = userModel(mongoose);

var styleController = require('./controllers/styleController');

var port = 8080;

const server = http.createServer(function (req,res){
    styleController(req,res);
    
    signInController(req,res);
});

server.listen(port, ()=> {
    console.log('Server is running at port: '+port);
});