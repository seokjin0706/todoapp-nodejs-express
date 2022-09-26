const express = require('express');
const app = express();

app.use(express.urlencoded({ extended: true }));

const methodOverride = require('method-override');

const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const session = require('express-session');

require('dotenv').config();


app.use(session({
    secret: 'scretCode',
    resave: true,
    saveUninitialized: false
}));
app.use(passport.initialize());
app.use(passport.session());


app.use(methodOverride('_method'));
app.set('view engine', 'ejs');
app.use('/public', express.static('public'));

const MongoDB = require('./lib/mongodb.js');
MongoDB.connectDB((err) => {
    if (err) return console.error(err);
    // Connect to MongoDB and put server instantiaition code inside
    // because we start the connection first
    let db = MongoDB.getDB();
    app.get('/', (req, res) => {
        res.render('index.ejs');
    });


    app.use('/write', require('./routes/write.js'));
    app.use('/list', require('./routes/list.js'));
    app.use('/search', require('./routes/search.js'));
    app.use('/detail', require('./routes/detail.js'))
    app.use('/edit', require('./routes/edit.js'));
    app.use('/register', require('./routes/register'));
    app.use('/add', require('./routes/add.js'));
    app.use('/delete', require('./routes/delete.js'));
    app.use('/mypage', require('./routes/mypage.js'));
    app.use('/chat', require('./routes/chat.js'));

    app.use('/login', require('./routes/login.js'));
    app.post('/login', passport.authenticate('local', {
        failureRedirect: '/fail', // 회원 인증 실패하면 /fail로 이동
    }), (req, res) => {
        res.redirect('/');
    });

    passport.use(new LocalStrategy({
        usernameField: 'id', //input의 name 속성값
        passwordField: 'pw',
        session: true, // 세션을 만들지 여부
        passReqToCallback: false,
    }, (inputId, inputPw, done) => {
        db.collection('login').findOne({ id: inputId }, (err, result) => {
            if (err) return done(err);
            if (!result) return done(null, false, { messasge: '존재하지 않는 아이디' })
            if (inputPw === result.pw) {
                return done(null, result);
            } else {
                return done(null, false, { message: '비밀번호가 틀렸습니다.' });
            }
        })
    }));

    //전략의 done함수에서 result가 id로 들어감
    //세션을 저장시키는 코드
    passport.serializeUser((user, done) => {
        done(null, user.id); //user.id라는 정보를 이용해서 암호화해서 세션을 만듬
        // 세션 데이터를 만들고, 세션의 id정보를 쿠키로 보냄
    });

    //user.id로 세션 데이터를 찾을 때 실행
    passport.deserializeUser((userId, done) => {
        db.collection('login').findOne({ id: userId }, (err, result) => {
            done(null, result); //DB에서 user.id로 유저를 찾아서 유저 정보를 넣음
        }); //마이페이지 접속시 보내주는 거
    })



    app.listen(process.env.PORT, () => {
        console.log(`listening on ${process.env.PORT}`);
    });

});



