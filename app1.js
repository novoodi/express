const express = require('express');
const app = express();

app.set('port', process.env.PORT || 3000);
app.get('/', (req, res, next) => {
    console.log('GET / 요청에만 실행됩니다.');
    next();
}, (req, res) => {// next();로 다음 미들웨어로 왔는데 여기서 문제가 생긴다.
    throw new Error('post맨 실행 확인');
});
app.use((err, req, res, next) => {
    console.log(err);
    res.status(500).send(err.message);
});
// app.get(port)로 포트를 가져온다.
app.listen(app.get('port'), () => {
    console.log(app.get('port'), '번 포트에서 대기 중');
});