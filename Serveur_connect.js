// nécessite nodejs > v0.10

var fs = require('fs')
  , http = require('http')
  , server = http.createServer( function(request, response) {
      var sent_header = false
        , stream = fs.createReadStream('Music'+request.url)
      ;
      stream.on('error', function(e) {
        response.writeHead(404, { 'Content-Type': 'text/plain; charset=utf-8' });
        response.end('Désolé, le document demandé est introuvable...');
        console.log('404 '+request.url);
      });
      stream.on('data', function(data) {
        if ( ! sent_header ) {
          response.writeHead(200, { 'Content-Type': 'audio/m4a'});
          console.log('200 '+request.url);
          sent_header = true;
        }
        response.write(data);
      });
      stream.on('end', function(data) {
        response.end();
      });
    })
;
server.listen(8080);