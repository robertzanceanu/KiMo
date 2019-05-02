var fs = require ('fs');
module.exports = function (req,res) {
    if(req.url.includes('.css') && req.method === 'GET') {
        const path = __dirname + '/../Views' + req.url;

        fs.readFile(path,function(err,data){
            if(err){
                throw err;
            }
            res.writeHead(200, {"Content-Type":"text/css"});
            res.end(data);
        })
    }
    if (req.url.includes('.png') && req.method === 'GET') {
        const path = __dirname + '/../Views/' + req.url;
        //console.log(path);

        fs.readFile(path, function(err,data) {
            if(err){
                throw err;
            }
            res.writeHead(200,{'Content-Type':'image/png'});
            res.end(data);
        });
    }
    if (req.url.includes('.jpg') && req.method === 'GET') {
        const path = __dirname + '/../Views/' + req.url;
        //console.log(path);

        fs.readFile(path, function(err,data) {
            if(err){
                throw err;
            }
            res.writeHead(200,{'Content-Type':'image/jpg'});
            res.end(data);
        });
    }
    if (req.url.includes('.js') && req.method === 'GET') {
        const path = __dirname + '/../Views/' + req.url;
        //console.log(path);

        fs.readFile(path, function(err,data) {
            if(err){
                throw err;
            }
            res.writeHead(200,{'Content-Type':'text/javascript'});
            res.end(data);
        });
    }
}