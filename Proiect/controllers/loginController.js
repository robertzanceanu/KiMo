var fs = require('fs');

module.exports = function (req, res, user) {
    if(req.url === '/login' && req.method === 'GET') {
        var filename = './Views/html/Login.html';
        fs.readFile(filename, function (err,html){
            if (err) {
                throw err;
            }
            res.writeHead(200, {'Content-Type' : 'text/html'});
            res.write(html);
            res.end();
        });
    }

    if(req.url === '/login' && req.method === 'POST') {
        req.on('data', data => {
            var post = JSON.parse(data);
           
            var email = post.email;
            var password = post.password;

            user.findOne({email: email, password: password}, function(err, user) {
                if(err) {
                    console.log(err);
                }
                else 
                    if(user) {
                        console.log("Map page");
                    }
                    else {
                           console.log("Datele introduse nu sunt corecte");
                    }
            });
        });   
    };
}
