exports.receivemessage = function(req, res) {

	 if (req.method == 'POST') {
		console.log("[200] " + req.method + " to " + req.url);

		req.on('data', function(chunk) {
			console.log("Received body data:");
			console.log(chunk.toString());
		});

		req.on('end', function() {
			// empty 200 OK response for now
			res.writeHead(200, "OK", {'Content-Type': 'text/html'});
			res.end("<Response></Response>");
		});
	} else {
		console.log("[405] " + req.method + " to " + req.url);
		res.writeHead(405, "Method not supported", {'Content-Type': 'text/html'});
		res.end('<html><head><title>405 - Method not supported</title></head><body><h1>Method not supported.</h1></body></html>');
	}
}
