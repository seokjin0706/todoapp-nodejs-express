var router = require('express').Router();
var MongoDB = require('../lib/mongodb.js');
var db = MongoDB.getDB();

router.get('/:id', (req, res) => {
    db.collection('post').findOne({ _id: parseInt(req.params.id) }, (err, result) => {
        if (!result) {
            res.send({ message: "실패" });
            return;
        }
        res.render('edit.ejs', { data: result });
    });
});

router.put('/', (req, res) => {
    db.collection('post').updateOne(
        { _id: parseInt(req.body.id) },
        { $set: { title: req.body.title, date: req.body.date } },
        (err, result) => {
            console.log("수정완료");
            console.log(result);
            res.redirect('/list');
        });
});

module.exports = router;

