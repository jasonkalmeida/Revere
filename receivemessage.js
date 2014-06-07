var querystring = require("querystring");

exports.receiveMessage = function(req, res, parseCallback) {
    if (req.method == "POST") {
        console.log("[200] " + req.method + " to " + req.url);

        req.on("data", function(chunk) { // hopefully we get data in one chunk
            var data = chunk.toString();
            var obj = querystring.parse(data);
            console.log("Received body data:", obj);
            parseCallback(obj);
        });

        req.on("end", function() {
            // empty 200 OK response for now
            res.writeHead(200, "OK", {"Content-Type": "text/html"});
            res.end("<Response></Response>");
        });
    }
    else {
        console.log("[405] " + req.method + " to " + req.url);
        res.writeHead(405, "Method not supported", {"Content-Type": "text/html"});
        res.end("<html><head><title>405 - Method not supported</title></head><body><h1>Method not supported.</h1></body></html>");
    }
}
