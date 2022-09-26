var router = require('express').Router();
var MongoDB = require('../lib/mongodb.js');
var db = MongoDB.getDB();

router.delete('/', (req, res) => {
    console.log(req.body);
    req.body._id = parseInt(req.body._id);

    var targetData = { _id: req.body._id, user: req.user.id };

    db.collection('post').deleteOne(targetData, (err, result) => {
        console.log('삭제완료');
        res.status(200).send({ message: '성공했습니다.' });
    });
});


module.exports = router;

