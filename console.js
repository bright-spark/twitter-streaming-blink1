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

// Required Node.js module for using Twitter APIs
var Twit = require('twit');  // https://github.com/ttezel/twit

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
  }
});

// Listen for follow events
user_stream.on('follow', function (eventMsg) {
  if (eventMsg.target.screen_name = screen_name) {
    console.log('@' + eventMsg.source.screen_name + ' is a now a follower.');
  }
});

// Listen for mention events
filter_stream.on('tweet', function (tweet) {
  console.log('@' + tweet.user.screen_name + ' Tweeted with a mention.');
})