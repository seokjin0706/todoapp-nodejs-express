var router = require('express').Router();
var MongoDB = require('../lib/mongodb.js');
var db = MongoDB.getDB();

router.get('/:id', (req, res)=>{
    db.collection('post').findOne({ _id: parseInt(req.params.id) }, (err, result) => {
        if (!result) {
            res.send({ message: "실패" });
            return;
        }
        res.render('detail.ejs', { data: result });
    });
});


module.exports = router;

