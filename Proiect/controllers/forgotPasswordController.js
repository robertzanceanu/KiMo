var fs = require('fs');
var nodemailer = require('nodemailer');
var objectId = require('mongodb').ObjectID;

module.exports = function (req, res, user) {
    if(req.url === '/forgotPassword' && req.method === 'GET') {
        var filename = './Views/html/ForgotPassword.html';
        fs.readFile(filename, function (err,html){
            if (err) {
                throw err;
            }
            res.writeHead(200, {'Content-Type' : 'text/html'});
            res.write(html);
            res.end();
        });
    }
    if(req.url === '/forgotPassword' && req.method === 'POST') {
        req.on('data', data => {
            var post = JSON.parse(data);
           
            var email = post.email;
            
            user.findOne({email: email}, function(err, user) {
                if(err) {
                    throw err;
                }
                else 
                    if(!email) {
                        console.log("Email-ul introdus nu exista in bd");
                    }
                    else {
                        var myEmail = 'alexandra.rotaru11223344@gmail.com';
                        var myPassword = 'parolamea11';

                        let newPassword ='';
                        var sizePassword = 8;
                        var charset = "qwertyuiopasdfghjklzxcvbnmQWERTYUIOPASDFGHJKLZXCVBNM1234567890";
                        for(var i=0; i<sizePassword; i++) {
                            newPassword += charset.charAt(Math.floor(Math.random() * charset.length));
                        }
            
                        var transporter = nodemailer.createTransport({
                            service: 'gmail',
                            auth: {
                                user: myEmail,
                                pass: myPassword
                            }
                        });
                        
                        var mailOption = {
                            from: myEmail,
                            to: email,
                            subject: 'New Password',
                            html: `Aceasta este noua dumneavoastra parola: <b>${newPassword}</b>`
                        };
            
                        transporter.sendMail(mailOption, function(error, info) {
                            if(error) {
                                throw err;
                            }
                            else {
                                user.password = newPassword;

                                user.save(function(err) {
                                    if(err) {
                                        throw err;
                                    }
                                });
                                console.log("Email trimis cu succes");
                            }
                        });
                    }
                
            });
        }); 
    }
}
