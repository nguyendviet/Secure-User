const jwt = require('jsonwebtoken');
const db = require('../models');

module.exports = (app)=>{
    app.get('/', (req, res)=>{
        res.render('index');
    });
};