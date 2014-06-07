exports.parseMessage = function(message) {
    // splits message into an array, with semicolon as separator
    var message_tokens = message.split(";");
    var message_location = message_tokens[0].trim();
    var message_content = message_tokens[1].trim();

    console.log("location = " + message_location);
    console.log("content = " + message_content);

    return {
        "location": message_location,
        "content": message_content,
    };
}

// exports.parseMessage("mars;yo i'm on mars");
