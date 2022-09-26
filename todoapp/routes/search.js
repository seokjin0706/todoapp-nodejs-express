var router = require('express').Router();
var MongoDB = require('../lib/mongodb.js');
var db = MongoDB.getDB();

router.get('/', (req, res) => {
    var searchCondition = [
        {
            $search: {
                index: 'titleSearch',
                text: {
                    query: req.query.value,
                    path: "title"
                }
            }
        },
        { $project: { title: 1, _id: 0, score: { $meta: "searchScore" } } }
    ]
    db.collection('post').aggregate(searchCondition).toArray((err, result) => {
        res.render('search.ejs', { posts: result });
    });
});


module.exports = router;

