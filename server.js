
//step 1) require the modules we need
var
http = require('http'),//helps with http methods
path = require('path'),//helps with file paths
fs = require('fs');//helps with file system tasks
send = require('./sendmessage');
receive = require('./receivemessage');
parse = require('./parsemessage');

// our actual subscribed numbers
var database = [
    {
        'location': 'Palo Alto',
        'number': '+19253361687',
    },
    {
        'location': 'Menlo Park',
        'number': '+19253992505', //'+15102892801',
    }
];

//a helper function to handle HTTP requests
function requestHandler(req, res) {
    var
    content = '',
    fileName = path.basename(req.url),//the file that was requested
    localFolder = __dirname + '/';//where our public files are located

    //NOTE: __dirname returns the root folder that
    //this javascript file is in.

    if(fileName === "/" || fileName === 'index.html') {//if index.html was requested...
        content = localFolder + fileName;//setup the file name to be returned

        //reads the file referenced by 'content'
        //and then calls the anonymous function we pass in
        fs.readFile(content,function(err,contents) {
            //if the fileRead was successful...
            if(!err) {
                //send the contents of index.html
                //and then close the request
                res.end(contents);
            } else {
                //otherwise, let us inspect the eror
                //in the console
                console.dir(err);
            };
        });
    } else if (fileName === 'sendmessage.js') {
        var to = '+19253361687';
        var body = 'ur booty don need explainin';
		send.sendmessage(to, body);
	} else if (fileName === 'receivemessage.js') {
		var parseAndSend = function(sms) {
            var parsed = parse.parsemessage(sms.Body);
            var from = sms.From; // non-twilio number
            var location = parsed.location;
            var content = parsed.content;
            console.log("sms from " + from + " location: " + location + " content: " + content);

            for (var record in database) {
                if (record.location == location) {
                    send.sendmessage(record.number, content);
                }
            }
        };
        receive.receivemessage(req, res, parseAndSend);
	} else {
        //if the file was not found, set a 404 header...
        res.writeHead(404, {'Content-Type': 'text/html'});
        //send a custom 'file not found' message
        //and then close the request
        res.end('<h1>Sorry, the page you are looking for cannot be found.</h1>');
    };
};

http.createServer(requestHandler).listen(8000);
