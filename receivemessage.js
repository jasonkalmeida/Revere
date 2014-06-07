exports.receivemessage = function(req, res) {

	var data;

	 if (req.method == 'POST') {
		console.log("[200] " + req.method + " to " + req.url);

		req.on('data', function(chunk) {
			console.log("Received body data:");
			data = chunk.toString();
		    var obj = JSON.parse('{"' + decodeURI(data).replace(/"/g, '\\"').replace(/&/g, '","').replace(/=/g,'":"') + '"}');
			console.log(obj);
			console.log(obj.Body);
			console.log(obj.From);
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
