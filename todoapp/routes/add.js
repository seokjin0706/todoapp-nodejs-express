var router = require('express').Router();
var MongoDB = require('../lib/mongodb.js');
var db = MongoDB.getDB();

router.post('/', (req, res)=>{
    db.collection('counter').findOne({ name: '게시물개수' }, (err, counterResult) => {
        let totalPost = counterResult.totalPost;
        let post = { _id: totalPost, user: req.user.id, title: req.body.title, date: req.body.date };
        db.collection('post').insertOne(post, (err, postResult) => {
            db.collection('counter').updateOne({ name: '게시물개수' }, { $inc: { totalPost: 1 } }, (err, updateResult) => {
            });
        });
    });
    res.redirect('/list');
});


module.exports = router;

