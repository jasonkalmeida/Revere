exports.tweet = function(tweetmsg) {
    var Twit = require('twit');

    var T = new Twit({
        consumer_key:         'wRvmt950Jqcxl32tHCibEkHiV'
      , consumer_secret:      'wz4PoP4N792SanN5EB1QKbUoGRCATPy1IyxMEoQjy0nfRnpKdC'
      , access_token:         '17769002-pZwjDYScQw7mRSj4jWAWTqI3vCO4atvGQpczMeV9G'
      , access_token_secret:  'bcc4rLun4Zgh6vwvnlPkvgSIGfYMII6HbLlgMoNPBuBYB'
    })

    // var T = new Twit({
    //     consumer_key:         'aB2kbhZBbMfqCS7OfvsS24RqV'
    //   , consumer_secret:      'C50zaJaT2xQv2kNUdN4p1x2P19f31JDq5yic97GogSAypVikX5'
    //   , access_token:         '2551758524-J5GOemVYZZo2Zm0DGsdVOCkE24sNFKziyzEWCnN'
    //   , access_token_secret:  'dkmSmSzEEXkDjRScrW2R01PnYzXXq2xPdFWXuGC6Ibren'
    // })


    T.post('statuses/update', { status: tweetmsg }, function(err, data, response) {
        console.log("Tweeted");
        // console.log(data);
        // console.log(err);
        //console.log(response);
    })
}
