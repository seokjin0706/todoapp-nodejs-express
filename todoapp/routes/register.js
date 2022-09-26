var router = require('express').Router();
var MongoDB = require('../lib/mongodb.js');
var db = MongoDB.getDB();

router.post('/', (req, res)=>{
    db.collection('login').insertOne({ id: req.body.id, pw: req.body.pw }, (err, result) => {
        res.redirect('/');
    });
});

module.exports = router;

