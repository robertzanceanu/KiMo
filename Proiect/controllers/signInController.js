var fs = require('fs');

module.exports = function (req, res, user) {
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
            var post = JSON.parse(data);

            var newUser = new user(post);

            var email = newUser.email;
            var password = newUser.password;
            var phoneNumber = newUser.phoneNumber;

            user.findOne({email: email}, function(err, user) {
                if(err) {
                    console.log(err);
                }
                else 
                    if(user) {
                        console.log("Acest cont exista deja in baza de date");
                    }
                    else {
                            if(email.includes('yahoo.ro')===false && email.includes('yahoo.com')===false && email.includes('gmail.com')===false && email.includes('info.uaic.ro')===false) {
                                console.log("Email-ul nu este valid.");
                            }
                            else if(password.length < 6) {
                                console.log("Parola este prea mica.");
                            }
                                else if(phoneNumber.length != 10 || phoneNumber.includes('07', 0)===false) {
                                    console.log("Numarul introdus nu este corect.");
                                }

                                    else {
                                            newUser.save(function (err, usr){
                                                if(err) return console.error(err);
                                                console.log("Saved");
                                            });
                                        }
                        }   
                });
        });   
    };
}
