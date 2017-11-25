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

    // sign in user
    app.post('/signin', (req, res)=>{
        // search parent table for entered email
        db.User.findAll({
            where: {
                email: req.body.email
            }
        })
        .then((user)=>{
            // if email not registered
            if (user.length === 0) {
                res.status(401).send({message: 'Your email has not been registered.'});
            }
            // if email registered
            else {
                var password = req.body.password;
                var hash = user[0].password;

                // compare entered password with saved password
                bcrypt.compare(password, hash, (err, match)=>{
                    if (err) throw err;
                    
                    if (!match) {
                        res.status(401).send({message: 'Wrong email and password combination.'});
                    }
                    else {
                        var id = user[0].id;
                        var name = user[0].name;
                        var token = jwt.sign({id: id}, key.secret, {expiresIn: '4h'});

                        // send token to client
                        res.send({token: token, name: name});
                    }
                });
            }
        });
    });

    // authenticate user
    app.post('/auth/:name', (req, res)=>{
        var token = req.headers.token;

        if (!token) {
            res.status(401).redirect('/error');
        }
        else {
            res.redirect('/user/' + token);
        }
    });

    // sign out user
    app.post('/signout', (req, res)=>{
        res.redirect('/');
    });

    // change password
    app.put('/user', (req, res)=>{
        var token = req.headers.token;
        var newPassword = req.body.password;

        // check if token exists
        if (!token) {
            res.status(401).redirect('/error');
        }
        else {
            // decode token
            jwt.verify(token, key.secret, (err, decoded)=>{
                if (err) {
                    res.status(401).redirect('/error');
                };

                var userId = decoded.id;

                // encrypt password
                bcrypt.hash(newPassword, saltRounds, (errEncrypt, hash)=>{
                    if (errEncrypt) throw errEncrypt;
                    
                    db.User.update(
                        {
                            password: hash
                        }, {
                            where: {
                                id: userId
                            }
                        }
                    )
                    .then((changed)=>{
                        res.json(changed);
                    });
                }); 
            });
        }
    });

    // delete account
    app.delete('/user', (req, res)=>{
        var token = req.headers.token;

        // check if token exists
        if (!token) {
            res.status(401).redirect('/error');
        }
        else {
            // decode token
            jwt.verify(token, key.secret, (err, decoded)=>{
                if (err) {
                    res.status(401).redirect('/error');
                };

                var userId = decoded.id;
                
                db.User.destroy({
                    where: {
                        id: userId
                    }
                })
                .then((confirm)=>{
                    res.json(confirm);
                })
            });
        }
    });
};