var http = require('http');
var fs = require('fs');
var formidable = require("formidable");
var util = require('util');


//create a server for the application
var server = http.createServer(function (req, res) {
    if (req.method.toLowerCase() == 'get') {
        displayForm(res);
    } else if (req.method.toLowerCase() == 'post') {
        //processAllFieldsOfTheForm(req, res);
        processFormFieldsIndividual(req, res);
    }
});

//display the index html page that has the form
function displayForm(res) {
    fs.readFile('index.html', function (err, data) {
        res.writeHead(200, {
            'Content-Type': 'text/html',
                'Content-Length': data.length
        });
        res.write(data);
        res.end();
    });
}



//end of salesforce login block
server.listen(1185);
console.log("server listening on 1185");
