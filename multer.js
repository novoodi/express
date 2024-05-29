// multer 함수의 경우 인수는 설정들이다.
const multer = require('multer');
// 이 설정을 사용하기 위해서는 꼭 uploads 파일이 필요하다. 굳이 굳이 따로 만들지 말고 이렇게 사용해보자
const fs = require('fs');
try{
    // uploads 파일이 있는지 확인
    fs.readdirSync('uploads');
}catch (error){
    // uploads 파일이 없으면 
    console.log('uplodes file is disfind');
    // uploads 파일 생성
    fs.mkdirSync('uploads');
};
// 파일 업로드 하는 법
// 파일이 만들어 진 후 req 파일 객체가 생성 된다.
app.post("/upload",upload.single('image'), (req,res)=>{
    console.log(req.file, rq.body);
    res.send('ok');
});
// storage 속성의 경우
// 어디에(destination)/ 어떤 이름(filename)
const upload = multer({
    // 각각 req매개 변수에는 요청에 대한 정보
    // 각각 file객체에는 업로드한 파일에 대한 정보가 담겨져 있다.
    // done의 경우 error이 있다면 에러를 넣고 다음 인수에는 경로나 파일 이름을 넣는다.
    // req나 file의 데이터를 가공해서 done으로 보내는 형식이다.
    // 아래 코드는 현재 uploads라는 폴더에 [파일명+현재시간.확장자]로 업로드 하고 있다

    storage: multer.diskStorage({
        destination(req, file, done) {
            done(null, 'uploads/');
        },
        filename(req, file, done){
            const ext = path.extname(file.originalname);
            done(null, path.basename(file.originalname, ext) + Date.now() +ext);
        },
    }),
    // 업로드에 대한 제한 사항을 설정하는 것이다.
    limits: {fileSize: 5 * 1024* 1024},
});