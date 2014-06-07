var http = require("http"),
    path = require("path"),
    fs = require("fs"),
    send = require("./sendmessage"),
    receive = require("./receivemessage"),
    parse = require("./parsemessage"),
    tweet = require("./tweetmessage");

// our virtual twilio number
var TWILIO_NUMBER = "+14155285877";

// our real, actual subscribed numbers
var database = [
    {
        "location": "Palo Alto",
        "number": "+19253361687", // Aaron
    },
    {
        "location": "Menlo Park",
        "number": "+19253992505", // Jason
    }
    // "+15102892801" <-- Rajan
];

// a helper function to handle HTTP requests
function requestHandler(req, res) {
    var content = "",
        fileName = path.basename(req.url), // the file that was requested
        localFolder = __dirname + "/"; // where our public files are located

    // NOTE: __dirname returns the root folder that the current JS file is in.

    if (fileName === "" || fileName === "/" || fileName === "index.html") { // if index.html was requested...
        content = localFolder + "index.html"; // setup the file name to be returned

        // reads the file referenced by "content"
        // and then calls the anonymous function we pass in
        fs.readFile(content, function(error, contents) {
            // if the file read was successful...
            if (!error) {
                // send the contents of index.html and close the request
                res.end(contents);
            } else {
                // otherwise, let us inspect the error in the console
                console.log(error);
            };
        });
    }
    else if (fileName === "sendmessage.js") {
        var to = "+19253361687"; // Aaron's number
        var body = "ur booty don need explainin";
        send.sendMessage(TWILIO_NUMBER, to, body);
    }
    else if (fileName === "receivemessage.js") {
        var parseAndSend = function(sms) {
            var parsed = parse.parseMessage(sms.Body);
            var fromNumber = sms.From; // non-twilio number
            var location = parsed.location;
            var content = parsed.content;
            console.log("SMS from " + fromNumber + " location: " + location + " content: " + content);

            for (var i in database) {
                var record = database[i];
                if (record.location == location) {
                    send.sendMessage(TWILIO_NUMBER, record.number, content);
                }
            }

            tweet.tweetMessage("For " + location + ": " + content);
        };

        receive.receiveMessage(req, res, parseAndSend);
    }
    else {
        // if the file was not found, set a 404 header...
        res.writeHead(404, {"Content-Type": "text/html"});
        // send a custom "file not found" message
        // and then close the request
        res.end("<h1>Sorry, the page you are looking for cannot be found.</h1>");
    };
};

http.createServer(requestHandler).listen(8000);
