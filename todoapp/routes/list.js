var router = require('express').Router();
var MongoDB = require('../lib/mongodb.js');
var db = MongoDB.getDB();

router.get('/', (req, res)=>{
    db.collection('post').find().toArray((err, result)=>{
        console.log(result);
        res.render('list.ejs', {posts : result});
    });
});


module.exports = router;

