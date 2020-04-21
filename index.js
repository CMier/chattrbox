var http = require('http');
var fs = require('fs');
var extract = require('./extract');
var wss = require('./websockets-server');
var path = require('path');
const mime = require('mime');


//redirect the user to 404 page
var handleError = function (err, res) {  
  var test = [
    'error.html', // html [0]
    'sample_pdf.pdf', // pdf [1]
    'sample_photo.jpg', // picture [2]
    'sample_audio.mp3', // sound[3]
    'sample_video.mp4', // video [4]
    'sample_text.txt' // plain text [5]
]
    var errPath = __dirname + '/app/' + test[0];

    fs.readFile(errPath, function (err, data) {
      if (err) {
          throw err;
          
        } else {    
          mimeTypeError = mime.getType(errPath);
            console.log("MIME: " + mimeTypeError);
            res.setHeader('Content-Type', mimeTypeError);
            res.end(data);
        }  
  });    
};

var server = http.createServer(function (req, res) {  
    console.log('Responding to a request.');
    
    var filePath = extract(req.url);

    fs.readFile(filePath, function (err, data) {
        if (err) {
            handleError(err, res);
            return;
          } else {    
            mimeType = mime.getType(filePath);
            console.log('MIME: ' + mimeType);
            res.setHeader('Content-Type', mimeType);
            res.end(data);
          }  
    });
});
server.listen(3000);