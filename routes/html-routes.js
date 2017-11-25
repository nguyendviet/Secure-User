const jwt = require('jsonwebtoken');
const db = require('../models');
var key = require('../config/keys');

module.exports = (app)=>{
    app.get('/', (req, res)=>{
        res.render('index');
    });

    app.get('/user/:token', (req, res)=>{
        var token = req.params.token;

        // check if token exists
        if (!token) {
            res.status(401).redirect('/error');
        }
        else {
            // decode token
            jwt.verify(token, key.secret, (err, decoded)=>{
                if (err) {
                    res.status(401).redirect('/error');
                }
                else {
                    db.User.findAll({
                        where: {
                            id: decoded.id
                        }
                    })
                    .then((user)=>{
                        var userName = user[0].name;
                        var userObj = {
                            name: userName
                        }
                        res.render('user', userObj);
                    });
                }
            });
        }
    });
};