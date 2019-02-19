var express = require('express');
var fs = require('fs');
var multer = require('multer'); // v1.0.5

var app = express();
app.use(express.static('./public'));

var upload = multer(); // for parsing multipart/form-data

app.post('/testFormData', upload.array(), function(req, res) {
    var base64Data = req.body.imgBase64;
    console.log('writing file...', base64Data);
    fs.writeFile(__dirname + "/upload/out.png", base64Data, 'base64', function(err) {
        if (err) console.log(err);
        fs.readFile(__dirname + "/upload/out.png", function(err, data) {
            if (err) throw err;
            console.log('reading file...', data.toString('base64'));
            res.send(data);
        });
    });
});

var server = app.listen(1313, function() {
    var host = server.address().address;
    var port = server.address().port;
    console.log('Server listening at http://%s:%s', host, port);
});