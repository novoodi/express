//expres모듈을 실행해서 app변수에 할당
const express = require('express');
// 경로 설정을 위한 path
const path = require('path');
// 추가 적인 로그를 볼 수 있는 모드이다,
const morgan = require('morgan');
const cookieParser = require('cookie-parser');
const session = require('express-session');
// .env를 읽어서 process.env로 만들어 주는 패키지입니다. dotenv 이름이 dot.env인 이유

const dotenv = require('dotenv');
dotenv.config();
// start는 app.js를 nodemond으로 실행 하겠다는 뜻
const app = express();
//app.set 서버가 실행될 포트를 설정 PORT속성이 있다면 그 값을 사용하고 아니면
// 3000 사용
app.set('port', process.env.PORT || 3000);
// GET 요청이 들어올 때 어떤 동작을 할지 적는 부분
// req는 요청에 관한 정보, res는 응답에 관한 정보가 들어있는 객체이다.
// 현제는 GER / 요청시  hello, Express를 응답으로 전송해준다.
// app.get('/', (req, res) => {
//     //res.send('Hello, Express');
//     // 요청에 대한 반환이 아닌 html 열고 싶다면 path를 사용해야 한다.
//     res.sendFile(path.join(__dirname, '/index.html'));
// });

// GET / 500 9.580 ms - 55
// 순서대로 [HTTP 메서드] [주소] [HTTP 상태 코드] [응답 속도] - [응답 바이트]
app.use(morgan('dev'));
// 경로를 지정해주는 것, 다른 설치는 필요 없으며 express 안에 있다.
// public은 폴더 이며 이 안에 css, js, 이미지 파일 등을 넣을 수 있다.
app.use('/', express.static(path.join(__dirname, 'public')));
// req.body를 만들어 주는 미들웨어다.
app.use(express.json());//JSON 형식의 데이터를 보내는 방식 
app.use(express.urlencoded({ extended: false }));//주소 형식을 보내는 방식
// cookieParser은 요청에 동봉 된 쿠키를 해석해서 req.cookie 객체로 만들어 줍니다.
// 설정된 쿠키를 지우려면 정확히 모든 것이 동일해야 합니다.
app.use(cookieParser(process.env.COOKIE_SECRET));
// express-session은 사용자 별로 req.session이 저장된다.
app.use(session({
    // 수정사항이 생기지 않아도 저장할 것인지
    resave: false,
    // 저장할 내역이 없더라도 다시 저장할 것인지 
    saveUninitialized: false,
    // 쿠키의 키값과 동일하게 설정 하는 것이 좋다.
    secret: process.env.COOKIE_SECRET,
    // 쿠키에 대한 옵션
    cookie: {
        // 클라인언트에서는 쿠키를 확인하지 못하게 하는 옵션
        httpOnly: true,
        // https가 아닌 환경에서도 작동할 수 있게 배포시에 사용한다. 
        secure: false,
    },
    name: 'session-cookie',
}));
//-------------------------------------------
// 미들 웨어의 시작 
app.use((req, res, next) => {
    console.log('모든 요청이 다 실행됩니다.');
    // 다음 미들 웨어로 넘어가는 next();
    next();
});
app.get('/', (req, res, next) => {
    console.log('GET / 요청에만 실행됩니다.');
    next();
}, (req, res) => {// next();로 다음 미들웨어로 왔는데 여기서 문제가 생긴다.
    throw new Error('에러는 에러처리 미들웨어로 이동됩니다.');
});
// 에러 처리 미들웨어는 4가지 변수를 가지고 있어야 한다
// err은 에러에 대한 정보
app.use((err, req, res, nest) => {
    console.log(err);
    res.status(500).send(err.message);
});
// app.get(port)로 포트를 가져온다.
app.listen(app.get('port'), () => {
    console.log(app.get('port'), '번 포트에서 대기 중');
});