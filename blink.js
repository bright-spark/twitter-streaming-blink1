/*!
 * twitter-streaming-blink1
 * https://github.com/twitterdev/twitter-streaming-blink1
 *
 * This Node.js application demonstrates how to detect Twitter user events
 * in real-time. These events include receiving a new follow, being
 * mentioned in a Tweet, and having a Tweet favorited. The two Twitter
 * Streaming APIs used for this are the filter endpoint and the user
 * endpoint. For more information on these endpoints, see the following 
 * documentation:
 *
 * https://dev.twitter.com/streaming/reference/get/user
 * https://dev.twitter.com/streaming/reference/post/statuses/filter
 *
 * By @jbulava
 * Released under the Apache license
 */

// Required Node.js modules for using Twitter APIs and blink(1)
var Twit = require('twit');           // https://github.com/ttezel/twit
var Blink1 = require('node-blink1');  // https://github.com/sandeepmistry/node-blink1

// Twitter configuarion for twit
//   Create a Twitter application at http://t.co/apps to get keys and tokens
var T = new Twit({
    consumer_key:         ''
  , consumer_secret:      ''
  , access_token:         ''
  , access_token_secret:  ''
});

// Define which Twitter handle to track
var screen_name = 'jbulava';

// Create a Twitter User Stream and Filter Stream connection
var user_stream   = T.stream('user');
var filter_stream = T.stream('statuses/filter', { track: '@'+screen_name });

// Configure a blink(1) for communicating with LEDs if found
try {
  var blink1 = new Blink1();
} catch (err) {
  var blink1 = false;
  console.log(err);
  console.log('Events will only show in the console.');
}

// A custom blink function to use both LEDs.
//   Function takes RGB color values (0-255) and a loop count.
//   FYI, you could use the pattern functionality in the node-blink1
//   library, but you cannot define a pattern AND control a single
//   LED at the same time as these use the same byte in the data package.
//   #TheMoreYouKnow
function blink(r, g, b, loopCount) {
  if (blink1 && loopCount > 0) {
    blink1.fadeToRGB(300, r, g, b, 1);      // Action color on LED1
    blink1.fadeToRGB(300, 85, 172, 238, 2); // Twitter blue on LED2
    setTimeout(function() {
      blink1.fadeToRGB(300, 0, 0, 0, 1); // Turn off LED1
      blink1.fadeToRGB(300, 0, 0, 0, 2); // Turn off LED2
    }, 300);

    // Loop the blink
    setTimeout(function() {
      blink(r, g, b, loopCount-1);
    }, 600);
  }
}

// Define the blink color and count for receiving a favorite
function blinkFavorite() {
  blink(215, 231, 0, 6);
}

// Define the blink color and count for receiving a mention
function blinkMention() {
  blink(231, 0, 227, 6);
}

// Define the blink color and count for receiving a follow
function blinkFollow() {
  blink(85, 172, 238, 6);
}

// Indicate when a User Stream connection has been established
 user_stream.on('connect', function (request) {
   console.log('Listening on user stream for @' + screen_name + '...');
 })

// Indicate when a Filter Stream connection has been established
filter_stream.on('connect', function (request) {
  console.log('Listening for mentions of @' + screen_name + '...');
})

// Listen for favorite events
user_stream.on('favorite', function (eventMsg) {
  if (eventMsg.target.screen_name = screen_name) {
    console.log('@' + eventMsg.source.screen_name + ' has favorited a Tweet.');
    blinkFavorite();
  }
});

// Listen for follow events
user_stream.on('follow', function (eventMsg) {
  if (eventMsg.target.screen_name = screen_name) {
    console.log('@' + eventMsg.source.screen_name + ' is a now a follower.');
    blinkFollow();
  }
});

// Listen for mention events
filter_stream.on('tweet', function (tweet) {
  console.log('@' + tweet.user.screen_name + ' Tweeted with a mention.');
  blinkMention();
})