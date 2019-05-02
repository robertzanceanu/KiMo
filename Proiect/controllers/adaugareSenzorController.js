var fs = require('fs');
module.exports = function (req,res) {
    if(req.url === '/adaugareSenzor' && req.method === 'GET') {
        var filename = './Views/html/addSenzor.html';
        fs.readFile(filename, function (err,html){
            if (err) {
                throw err;
            }
            res.writeHead(200, {'Content-Type' : 'text/html'});
            res.write(html);
            res.end();
        });
    }
}