const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const db = require('../models');
var key = require('../config/keys');

module.exports = (app)=>{
    // new note
    app.post('/note/new', (req, res)=>{

        console.log('\n============\nget new note!');
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
                }
                else {

                    console.log('\n==================\ncontent: ' + req.body.entry);
                    console.log('\n=========\ndecoded id: ' + decoded.id);
                    db.Note.create({
                            UserId: decoded.id,
                            entry: req.body.entry
                    })
                    .then((note)=>{
                        res.json(note);
                    });
                }
            });
        }
    });
};