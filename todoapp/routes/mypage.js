var router = require('express').Router();
var isLogined = require('./middleware.js');

router.get('/', isLogined, (req, res)=>{
    res.render('mypage.ejs', { user: req.user });
});

module.exports = router;

