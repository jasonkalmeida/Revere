var Twit = require("twit");

exports.tweetMessage = function(message) {
    // Aaron's account
    var T = new Twit({
        consumer_key:         "[INSERT AN CONSUMER KEY]"
      , consumer_secret:      "[INSERT CONSUMER SECRET CODE]"
      , access_token:         "[INSERT ACCESS TOKEN]"
      , access_token_secret:  "[INSERT TOKEN SECRET]"
    })

    // Revere's account
    // var T = new Twit({
    //     consumer_key:         "aB2kbhZBbMfqCS7OfvsS24RqV"
    //   , consumer_secret:      "C50zaJaT2xQv2kNUdN4p1x2P19f31JDq5yic97GogSAypVikX5"
    //   , access_token:         "2551758524-J5GOemVYZZo2Zm0DGsdVOCkE24sNFKziyzEWCnN"
    //   , access_token_secret:  "dkmSmSzEEXkDjRScrW2R01PnYzXXq2xPdFWXuGC6Ibren"
    // })

    T.post("statuses/update", { status: message }, function(error, data, response) {
        if (!error) {
            console.log("Tweeted");
        } else {
            console.log("Error while tweeting: ", error);
        }
    })
}
