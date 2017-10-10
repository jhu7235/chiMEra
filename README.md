# chiMEra

*Good things come in pairs*

Looking for an awesome pet like a flying dog?  Well look no further! At chiMEra, we create fantastical creatures from the infamous taco cat to lazer sharks.


## Setup

To setup this app, you'll need to take the following steps:

* Fork and clone this repo.
* `cd` into your clone and `rm -rf .git` to remove the chiMEra git tracking
* Update project name and description in `package.json` file
* `git init` to start your own git tracking
* `npm install`, or `yarn install` - whatever you're into
* Create two postgres databases: `chiMEra` and `chiMEra-test` (you can substitute these with the name of your own application - just be sure to go through and change the `package.json` and `server/db/db.js` to refer to the new names)
  * By default, running `npm test` will use `boilermaker-test`, while regular development uses `boilermaker`
* Create a file called `secrets.js` in the project root
  * This file is `.gitignore`'d, and will *only* be required in your *development* environment
  * Its purpose is to attach the secret env variables that you'll use while developing
  * However, it's **very** important that you **not** push it to Github! Otherwise, *prying eyes* will find your secret API keys!
  * It might look like this:

  ```
    process.env.GOOGLE_CLIENT_ID = 'hush hush';
    process.env.GOOGLE_CLIENT_SECRET = 'pretty secret';
    process.env.GOOGLE_CALLBACK = '/auth/google/callback';
  ```

* To use OAuth with Google, complete the step above with a real client ID and client secret from Google
  * You can get them here: https://console.developers.google.com/apis/credentials

## Start

`npm run start-dev` will make great things happen!

If you want to run the server and/or webpack separately, you can also `npm run start-server` and `npm run build-client`.

From there, just follow your bliss.

## Playing with a running demo

To checkout what the finished product looks like go to *https://chimera123.herokuapp.com/*.  You can also see some admin functionalities by logging in as email: jim@jim.com pw: jim
