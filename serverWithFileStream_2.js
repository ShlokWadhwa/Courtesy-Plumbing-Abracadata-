
// Creating your own Web server with nodejs.

var http = require('http');     // Alternate mechanisim: import * as http from 'http';
var fs = require('fs');         // import * as fs from 'fs';
var url = require('url');       // import * as url from 'url';
var path = require('path');     // import * as path from 'path';

var fileExtensions = {
     ".html":    "text/html",
     ".css":     "text/css",
     ".js":      "text/javascript",
     ".jpeg":    "image/jpeg",
     ".jpg":     "image/jpeg",
     ".png":     "image/png",
     ".gif":    "image/gif", 
 }

var server = http.createServer(function(request, response) { 
    var pathname = url.parse(request.url).pathname;
    var filename;

    //console.log("\n\n");
    //console.log("Request.url: " + request.url.toString());
    //console.log("Pathname: " + pathname);

    if(pathname === "/") {
        // change the 'filename' to the homepage of your website (e.g. "index.html") 
        //filename = "Ch3FooterExample.html"; 
        
        filename = "courtesy_plumbing.html"; 
         //filename = "formHandlingExample_UsingWindowOnloadMethod_WithExtFile_Completed.html"; 

        //console.log("\n\n");
        //console.log("FileName: " + filename);
    }
    else
        filename = path.join(process.cwd(), pathname);

        //console.log("\n\n");
        //console.log("Current Working Directory: " + process.cwd().toString());

    try {
        fs.accessSync(filename, fs.F_OK);
        var fileStream = fs.createReadStream(filename);
        var typeAttribute = fileExtensions[path.extname(filename)];

        //console.log("\n\n");
        //console.log("File extension: " + path.extname(filename));
        //console.log("Type Attribute: " + typeAttribute);

        response.writeHead(200, {'Content-Type': typeAttribute});
        fileStream.pipe(response);
    }
    catch(e) {
            console.log("\n\n");
            console.log('File does not exist: ' + filename);
            response.writeHead(404, {'Content-Type': 'text/plain'});
            response.write('404 - File Not Found (' + filename + ')');
            response.end();
            return;
    }
    return;
    
});

server.listen(5000);

console.log("\nThe Web server is alive!!!\n"  + 
    "It's listening on http://127.0.0.1:5000 or http://localhost:5000");
