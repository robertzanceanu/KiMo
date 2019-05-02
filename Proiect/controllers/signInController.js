var fs = require('fs');
module.exports = function (req,res,user) {
    if(req.url === '/signup' && req.method === 'GET') {
        var filename = './Views/html/SignUp.html';
        fs.readFile(filename, function (err,html){
            if (err) {
                throw err;
            }
            res.writeHead(200, {'Content-Type' : 'text/html'});
            res.write(html);
            res.end();
        });
    }
    if(req.url === '/signup' && req.method === 'POST') {
        req.on('data', data => {
            //console.log(data);
            //console.log(req.data);
            var post = JSON.parse(data);
            console.log(post);
            console.log(post.email);
            // user.save({
            //     firstName=post.firstName,
            //     lastName=post.lastName,
            //     email=post.email,
            //     password=post.password,
            //     phoneNumber=post.phone
            // });  
            var newUser = new user(post);
            newUser.save(function (err, usr){
                if(err) return console.error(err);
                console.log("Saved");
            });
            });   
        };
        //console.log(req.body);
}
