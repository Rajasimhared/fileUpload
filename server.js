const http = require('http');
const fs = require('fs');
var formidable = require('formidable');
// Server configuration
const hostname = '127.0.0.1';
const port = 3000;
// Render page
fs.readFile('./index.html', function(err, html) {
  if (err) {
    throw err;
  }
  const server = http
    .createServer(function(request, response) {
      if (request.url == '/fileupload') {
        var form = new formidable.IncomingForm();
        form.parse(request, function(err, fields, files) {
          var oldpath = files.filetoupload.path;
          var newpath =
            '/home/hacker/Projects/fileUpload/' + files.filetoupload.name;
          fs.rename(oldpath, newpath, function(err) {
            if (err) throw err;
            response.write('File uploaded and moved!');
            response.end();
          });
        });
      } else if (request.url == '/index.css') {
        response.writeHeader(200, { 'Content-Type': 'text/css' });
        var fileContents = fs.readFileSync('./index.css', { encoding: 'utf8' });
        response.write(fileContents);
        response.end();
      } else {
        response.writeHeader(200, { 'Content-Type': 'text/html' });
        response.write(html);

        response.end();
      }
    })
    .listen(port, hostname, () => {
      console.log(`Server running at http://${hostname}:${port}/`);
    });
});
