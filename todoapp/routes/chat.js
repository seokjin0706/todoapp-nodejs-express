var router = require('express').Router();
var MongoDB = require('../lib/mongodb.js');
var db = MongoDB.getDB();

router.post('/', (req, res) => {
    let data = { member: [req.body.postUser, req.user.id], title: "채팅방1", date: new Date() };
    db.collection('chatroom').insertOne(data, (err, result)=>{
        console.log('성공');
    });
    res.redirect('/');
});

router.get('/', (req, res)=>{
    res.render('chat.ejs');
});

module.exports = router;

