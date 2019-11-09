[![Build Status](https://travis-ci.org/Bonifase/server.svg?branch=master)](https://travis-ci.org/Bonifase/server) [![Test Coverage](https://api.codeclimate.com/v1/badges/5c89e8bb40ab8d7bd628/test_coverage)](https://codeclimate.com/github/Bonifase/server/test_coverage) [![Maintainability](https://api.codeclimate.com/v1/badges/5c89e8bb40ab8d7bd628/maintainability)](https://codeclimate.com/github/Bonifase/server/maintainability)

## Testing Restful Express/Nodejs API with Mocha and Chai

#### Get mocha to run your tests

If it’s your first time using mocha on this computer, you’ll need to install the mocha global CLI package:

```
$ npm install -g mocha
Now if your tests are at the default test path you can run your tests with:

$ mocha
```

#### Write your tests

Mocha exposes new globals — describe() and it() — to group tests together.

To keep dependencies down, you can use Node’s built in assert module.

Here’s a file of unit tests you can use as an example: dsernst/pythagorean-triples /test.js

Setup \$ npm test
A common way to configure your testing suite is to use npm’s built in test command. To do this, add "test": "mocha" to the “scripts” section of your package.json, like so:

```
"scripts": {
  "test": "mocha"
},
```

#### Setup TravisCI for automatic builds

TravisCI can run your tests automatically and notify you of any problems. This even works for pull-requests. And it’s free if your repo is public.

Here’s what you’ll need to do:

Log in to Travis and flick your repo’s switch on.
Add a basic .travis.yml file for your project:

```
language: node_js
node_js:
- "stable"
```

Push a new version to GitHub.
If you set up the npm test command in the previous step, Travis will use this automatically.
