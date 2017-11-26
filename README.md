# Secure User

## Overview
A full stack app that allows users to securely register or sign in then write notes which are saved to its database.

### Demo
* Heroku: [Secure User](https://viet-secure-user.herokuapp.com/)
<img src="https://github.com/nguyendviet/Secure-User/blob/master/github.png" width="400"/>

### Logic
* Users register or sign in. App handles cases: unregistered email address, wrong email and password combination...
* Users can change password, delete account.
* Users write new notes and app updates notes instantly from database.

## Install
After cloning the repo to your local machine, go to its folder and run:
```
$ npm install --save
```
You will also need to make your own keys.js file in folder /config.

## Test
Go to folder /test and run:
```
$ mocha <test-file-name>
```
## Technologies
* MySQL, Express, NodeJS.
* npm: mocha, chai, brcypt, jsonwebtoken, handlebars, body-parser.
* jQuery, Bootstrap 4.

## Author(s)
* **Viet Nguyen** - *Solo developer*
