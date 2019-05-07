var fs = require('fs');
module.exports = function (req, res, sensorKid) {
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
    if(req.url === '/adaugareSenzor' && req.method === 'POST') {
        req.on('data', data => {
            var post = JSON.parse(data);

            var newKid = new sensorKid(post);
            var kidName = newKid.kidName;
            var distance = newKid.distance;
            var age = newKid.age;

            sensorKid.findOne({kidName : kidName}, function(err, sensorKid) {
                if(err) {
                    console.log(err);
                }
                else {
                    if(sensorKid) {
                        res.writeHead(401, "kidExist", {"Content-Type": "text/plain"});
                        res.end();
                    }
                    else {
                        if(distance <= 0) {
                            res.writeHead(401, "distance", {"Content-Type": "text/plain"});
                            res.end();
                        }
                        if(age <= 0 || age >18) {
                            res.writeHead(401, "age", {"Content-Type": "text/plain"});
                            res.end();
                        }
                        else {
                            newKid.save(function (err, usr){
                                if(err) return console.error(err);
                                console.log("Saved");
                                res.writeHead(200,"addSensor", {"Content-Type": "text/plain"} );
                                res.end();
                            });
                        }
                    }
                }
            });
        });
    }
}
