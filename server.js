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


//using formidable to parse the form in the HTML page
function processAllFieldsOfTheForm(req, res) {
    var form = new formidable.IncomingForm();

    form.parse(req, function (err, fields, files) {
        //Store the data from the fields in your data store.
        //The data store could be a file or database or any other store based
        //on your application.
        res.writeHead(200, {
            'content-type': 'text/plain'
        });
        res.write('received the data:\n\n');
        res.end(util.inspect({
            fields: fields,
            files: files
        }));
    });
}

function processFormFieldsIndividual(req, res) {
    //Store the data from the fields in your data store.
    //The data store could be a file or database or any other store based
    //on your application.
    var fields = [];
    var form = new formidable.IncomingForm();
    form.on('field', function (field, value) {
        console.log(field);
        console.log(value);
        fields[field] = value;
    });

    form.on('end', function () {
        res.writeHead(200, {
            'content-type': 'text/plain'
        });
        res.write('received the data:\n\n');
        res.end(util.inspect({
            fields: fields
        }));
    });
    form.parse(req);
}


//salesforce login block
var sf = require('node-salesforce');
var conn = new sf.Connection({
  // you can change loginUrl to connect to sandbox or prerelease env. 
  loginUrl : 'https://login.salesforce.com' 
});
conn.login(nhlutterodt@hillel.org.trailhead, Deadrise1!, function(err, userInfo) {
  if (err) { return console.error(err); }
  // Now you can get the access token and instance URL information. 
  // Save them to establish connection next time. 
  console.log(conn.accessToken);
  console.log(conn.instanceUrl);
  // logged in user property 
  console.log("User ID: " + userInfo.id);
  console.log("Org ID: " + userInfo.organizationId);
  // ... 
});

//end of salesforce login block
server.listen(1185);
console.log("server listening on 1185");
