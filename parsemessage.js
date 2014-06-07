exports.parsemessage = function(message){
	//input a string called message

	//splits message into an array, with semi-colon as separator
	var split_message = message.split(';');
	//define location into a unique var
	var message_location = split_message[0];
	//define content into a unique var
	var message_content = split_message[1];

	console.log("location = " + message_location);
	console.log("content = " + message_content);

	return {
		'location': message_location,
		'content': message_content,
	};
}

// exports.parsemessage("mars;yo i'm on mars");
