var fs = require('fs');
module.exports = function (req,res) {
    if(req.url === '/actualizareProfil' && req.method === 'GET') {
        var filename = './Views/html/ActualizareProfil.html';
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
