twitter-streaming-blink1
========================

A Node.js application that demonstrates how to detect Twitter user events in real-time.  These events include receiving a new follow, being mentioned in a Tweet, and having a Tweet favorited.

The two Twitter Streaming APIs used for this are the [filter endpoint](https://dev.twitter.com/streaming/reference/post/statuses/filter) and the [user endpoint](https://dev.twitter.com/streaming/reference/get/user).

In the example (blink.js), a [blink(1)](http://blink1.thingm.com/) is used to indicate an event. If you do not have a blink(1), then you can still see the events via the console. There is also a simplified version of this example that removes the blink(1) code and focuses only on console output (console.js). This may be easier to follow if you are not interested in controlling LEDs or want to add your own event indicators.

![alt text](https://github.com/twitterdev/twitter-streaming-blink1/raw/master/blink.gif "blink(1) blinking")


Node Modules
------------

- [twit](https://github.com/ttezel/twit)
- [node-blink1](https://github.com/sandeepmistry/node-blink1)

To install:

    npm install twit
    npm install node-blink1

Configuring
-----------

Before using this application, you will need to create a Twitter app or use an existing one.  You can do this at [t.co/apps](http://t.co/apps).  Once you have created an app and have consumer keys and access tokens, enter this information into the Twit constructor (i.e. consumer_key, consumer_secret, access_token, and access_token_secret).

You will also want to update the screen_name variable to indicate which account you would like to track.

Running
-------

To run the application while a blink(1) is plugged into your computer:

    node blink.js

To run the same example that only uses console output:

    node console.js

Credits
-------
 - [@jbulava](https://twitter.com/jbulava)

License
-------
Released under the Apache license