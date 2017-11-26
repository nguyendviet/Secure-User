const jwt = require('jsonwebtoken');
const db = require('../models');
var key = require('../config/keys');

module.exports = (app)=>{
    // new note
    app.post('/note/new', (req, res)=>{
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
                    var id = decoded.id;
                    var content = req.body.entry;

                    // save new note to note table
                    db.Note.create({
                            UserId: id,
                            entry: content
                    })
                    .then((note)=>{
                        // res.json(note);

                        // find all notes by this user
                        db.Note.findAll({
                            where: {UserId: id},
                            order: [['createdAt', 'DESC']],
                            limit: 10
                        })
                        .done((notes)=>{
                            // send all notes back
                            res.json(notes);

                            // res.redirect('/user/' + token + '/' + notes);
                        });
                    });
                }
            });
        }
    });
};