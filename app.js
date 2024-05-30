// //expres모듈을 실행해서 app변수에 할당
// const express = require('express');
// // 경로 설정을 위한 path
// const path = require('path');
// // 추가 적인 로그를 볼 수 있는 모드이다,
// const morgan = require('morgan');
// const cookieParser = require('cookie-parser');
// const session = require('express-session');
// // .env를 읽어서 process.env로 만들어 주는 패키지입니다. dotenv 이름이 dot.env인 이유

// const dotenv = require('dotenv');
// dotenv.config();
// // const uesrRouter = require('./routes/user');
// // const indexRouter = require('./routes');

// // start는 app.js를 nodemond으로 실행 하겠다는 뜻
// const app = express();
// //app.set 서버가 실행될 포트를 설정 PORT속성이 있다면 그 값을 사용하고 아니면
// // 3000 사용
// app.set('port', process.env.PORT || 3000);
// // 파일들의 위치를 지정하는 것
// // res.reder메서드가 이걸 기준으로 템플릿 엔진을 찾아서 렌더링 합니다.
// // app.set('views', path.join(__dirname, 'views'));
// // // 어떤 종류의 탬플릿 엔진을 사용할지 정하는 것
// // app.set('view engine', 'pug');
// // app.use(morgan('dev'));
// // router.get('/', (req, res, next) => {
// //     res.render('index', { title: 'Express' });
// // });
// // GET 요청이 들어올 때 어떤 동작을 할지 적는 부분
// // req는 요청에 관한 정보, res는 응답에 관한 정보가 들어있는 객체이다.
// // 현제는 GER / 요청시  hello, Express를 응답으로 전송해준다.
// // app.get('/', (req, res) => {
// //     //res.send('Hello, Express');
// //     // 요청에 대한 반환이 아닌 html 열고 싶다면 path를 사용해야 한다.
// //     res.sendFile(path.join(__dirname, '/index.html'));
// // });

// // GET / 500 9.580 ms - 55
// // 순서대로 [HTTP 메서드] [주소] [HTTP 상태 코드] [응답 속도] - [응답 바이트]
// app.use(morgan('dev'));
// // 경로를 지정해주는 것, 다른 설치는 필요 없으며 express 안에 있다.
// // public은 폴더 이며 이 안에 css, js, 이미지 파일 등을 넣을 수 있다.
// app.use('/', express.static(path.join(__dirname, 'public')));
// // req.body를 만들어 주는 미들웨어다.
// app.use(express.json());//JSON 형식의 데이터를 보내는 방식 
// app.use(express.urlencoded({ extended: false }));//주소 형식을 보내는 방식
// // cookieParser은 요청에 동봉 된 쿠키를 해석해서 req.cookie 객체로 만들어 줍니다.
// // 설정된 쿠키를 지우려면 정확히 모든 것이 동일해야 합니다.
// // ex) name = 김정현 쿠키를 보냈다면 req.cookies{name:"김정현"}이 된다.
// // 비밀 키를 넣어 준다면 name = 김정현.sign과 같은 모양이 된다
// // 서명 된 쿠키는 더 이상 req.cookies에 들어가 있지 않고 req.signedCookies에 들어간다.
// // 쿠키의 생성과 제거는 res.cookie/res.clearCookie
// // ex) res.cookie(키, 값, 옵션) -> 이때 옵션의 값은 같이 않아도 제거됩니다.
// // 옵션 중 sign 이라는 옵션이 있는데 이를 true로 설정할 경우 쿠키 뒤에 서명이 붙는다.
// // 서명을 위한 비밀키는 미드웨어 값과 동일 합니다.
// app.use(cookieParser(process.env.COOKIE_SECRET));
// // express-session은 사용자 별로 req.session이 저장된다.
// // express=session은 인수로 세션에 대한 설정 값을 받는다.
// app.use(session({
//     // 수정사항이 생기지 않아도 저장할 것인지
//     resave: false,
//     // 저장할 내역이 없더라도 다시 저장할 것인지 
//     saveUninitialized: false,
//     // 쿠키의 키값과 동일하게 설정 하는 것이 좋다.
//     secret: process.env.COOKIE_SECRET,
//     // 세션을 관리하게 될 경우 클라이언트에 쿠키를 보내게 된다.
//     // 안전한 쿠키 전송을 위해서는 서명을 추가해야 하고
//     // 쿠키를 서명하기 위해서는 secret의 값이 필요하다.
//     // 세션 쿠키의 이름은 name옵션을 통해서 설정한다.
//     cookie: {
//         // 클라인언트에서는 쿠키를 확인하지 못하게 하는 옵션
//         httpOnly: true,
//         // https가 아닌 환경에서도 작동할 수 있게 배포시에 사용한다. 
//         secure: false,
//         // 추가 옵션
//         // store 옵션은 메모리에 저장하는 방법이다. 
//         // 이때 재시작을 하게 되면 세션이 모두 없어진다.
//         // 세션의 삭제 -> req.session.destroy 메서드를 사용해서 삭제 한다.
//         // 세션의 이이디 확인 req.session.id

//     },
//     name: 'session-cookie',
// }));
// // app.use('/', indexRouter);
// // app.use('/user', uesrRouter);


// // app.use((req, res, next) => {
// //     res.status(404).send("take a double double");
// // });
// // const multer = require('multer');
// // const fs = require('fs');
// // const router = require('./routes');
// // const { title } = require('process');
// // try {
// //     fs.readdirSync('uploads');
// // } catch (error) {
// //     console.error('uploads 폴더가 없어 uploads 폴더를 생성합니다.');
// //     fs.mkdirSync('uploads');
// // }
// // const upload = multer({
// //     storage: multer.diskStorage({
// //         destination(req, file, done) {
// //             done(null, 'uploads/');
// //         },
// //         filename(req, file, done) {
// //             const ext = path.extname(file.originalname);
// //             done(null, path.basename(file.originalname, ext) + Date.now() + ext);
// //         },
// //     }),
// //     limits: { fileSize: 5 * 1024 * 1024 },
// // });
// // app.get('/upload', (req, res) => {
// //     res.sendFile(path.join(__dirname, 'multipart.html'));
// // });
// // app.post('/upload', upload.single('image'), (req, res) => {
// //     console.log(req.file);
// //     res.send('ok');
// // });

// // 미들 웨어는 다음과 같이 동시에 장착이 가능하다.
// // 주의사항 next 메서드가 사용되지 않는다 이말은 즉, res,sendFile 메서드로 보낸다는 것이다.
// // 즉 다음 express가 실행되지 않는 다는 뜻
// // app.use(
// //     morgan('dev'),
// //     express.static('/', path.join(__dirname, 'public')),
// //     express.json(),
// //     express.urlencoded({ extended: false }),
// //     cookieParser(process.env.COOKIE_SECRET),
// //     );
// //-------------------------------------------
// // 미들 웨어의 시작 
// // app.use((req, res, next) => {
// //     console.log('모든 요청이 다 실행됩니다.');
// //     // 다음 미들 웨어로 넘어가는 next();
// //     next();
// // });
// app.get('/', (req, res, next) => {
//     console.log('GET / 요청에만 실행됩니다.');
//     next();
// }, (req, res) => {// next();로 다음 미들웨어로 왔는데 여기서 문제가 생긴다.
//     throw new Error('에러는 에러처리 미들웨어로 이동됩니다.');
// });
// // 에러 처리 미들웨어는 4가지 변수를 가지고 있어야 한다
// // err은 에러에 대한 정보
// app.use((err, req, res, next) => {
//     console.log(err);
//     res.status(500).send(err.message);
// });
// // app.get(port)로 포트를 가져온다.
// app.listen(app.get('port'), () => {
//     console.log(app.get('port'), '번 포트에서 대기 중');
// });