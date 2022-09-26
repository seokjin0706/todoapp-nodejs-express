module.exports = function isLogined(req, res, next) {
    if (req.user) { // 세션이 있으면 req.user가 있음 -> deserializeUser로 찾은 데이터
        next();
    } else {
        res.send('로그인을 안했습니다.');
    }
}