const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const db = require('../models');
const saltRounds = 10;
var key = require('../config/keys');

module.exports = (app)=>{
    // register user
    app.post('/register', (req, res)=>{

        console.log('got info');
        db.User.findAll({
            where: {
                email: req.body.email
            }
        })
        .then((user)=>{
            // if found matching email
            if (user.length !== 0) {
                res.send({message: 'Your email is already registered.'});
            }
            // if email not registered
            else {
                var password = req.body.password;

                console.log(password);
                
                // encrypt password before saving
                bcrypt.hash(password, saltRounds, (err, hash)=>{
                    if (err) throw err;
                    
                    // save user's info into database
                    db.User.create({
                        name: req.body.name,
                        email: req.body.email,
                        password: hash
                    })
                    .then((result)=>{
                        var token = jwt.sign({id: result.id}, key.secret, {expiresIn: '4h'});
                        // send token to client
                        res.send({token: token});
                    });
                });
            }
        });
    });

    // authenticate user
    app.post('/auth/:name', (req, res)=>{
        var token = req.headers.token;

        console.log('\n==============\nget token at post auth token ' + token);

        if (!token) {
            res.status(401).redirect('/error');
        }
        else {
            res.redirect('/user/' + token);
        }
    });
};