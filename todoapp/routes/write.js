var router = require('express').Router();


router.get('/', (req, res)=>{
    res.render('write.ejs')
});


module.exports = router;

