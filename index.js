//express 사용하는 보일러태그
const express = require("express");
const app = express();
const mysql = require("mysql");

const PORT = process.env.port || 8003;
const db = mysql.createPool({ host: "127.0.0.1", user: "root", password: "1234", database: "capstoneDB" });
// const db = mysql.createPool({ host: "localhost", user: "root", password: "6819et78", database: "capstoneDB" });

// 서버단에서 cors 처리하는 방법(express)
const cors = require("cors");
let corsOptions = { origin: "*", credential: true, methods: "GET,HEAD,PUT,PATCH,POST,DELETE" };
app.use(cors(corsOptions));

// import 하는 부분
const bodyParser = require("body-parser");

// 아랫부분 적당한 위치에 추가
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));

// App.js에서 설문지 데이터목록을 조회함 (Home.js에서 사용)
app.get("/boardlist", (req, res) => {
  const sqlQuery = "SELECT *FROM BOARD;";
  db.query(sqlQuery, (err, result) => {
    console.log(result, " <-result 완료되었습니다.  ");
    console.log(err, "<- err 에러입니다.");

    result.map((item) => (item.SUBJECTIVE_QUESTION = JSON.parse(item.SUBJECTIVE_QUESTION)));
    result.map((item) => (item.MULTIPLECHOICE_QUESTION = JSON.parse(item.MULTIPLECHOICE_QUESTION)));
    result.map((item) => (item.MULTIPLECHOICE_QUESTION_OPTION = JSON.parse(item.MULTIPLECHOICE_QUESTION_OPTION)));
    res.send(result);
  });
});

// SurveyPost.js에서 설문지 데이터를 조회함 (SurveyPost.js에서 사용)
app.get("/boardContent", (req, res) => {
  // sql query 문
  const sql = "SELECT * FROM BOARD WHERE `BOARD_ID` = ?;";
  const values = [req.query.BOARD_ID];

  db.query(sql, values, (err, result) => {
    result.map((item) => (item.SUBJECTIVE_QUESTION = JSON.parse(item.SUBJECTIVE_QUESTION)));
    result.map((item) => (item.MULTIPLECHOICE_QUESTION = JSON.parse(item.MULTIPLECHOICE_QUESTION)));
    result.map((item) => (item.MULTIPLECHOICE_QUESTION_OPTION = JSON.parse(item.MULTIPLECHOICE_QUESTION_OPTION)));
    res.send(result);
    console.log(result, " <-result 완료되었습니다.  ");
    console.log(err, "<- err 에러입니다.");
  });
});

// surveying.js에서 설문지 데이터를 작성하여 데이터베이스로 저장 (Surveying.js에서 사용)
app.post("/insert", (req, res) => {
  // let MyServeyKey = req.body.MyServeyKey.replace("'", "\\'");
  let MyServeyKey = req.body.MyServeyKey;
  let Title = req.body.Title;
  let SubjectiveQ = { 0: req.body.SubjectiveQ };
  let SubjectiveQSTR = JSON.stringify(SubjectiveQ);
  let MultiplechoiceQ = { 0: req.body.MultiplechoiceQ };
  let MultiplechoiceQSTR = JSON.stringify(MultiplechoiceQ);
  let MultiplechoiceQ_Option = req.body.MultiplechoiceQ_Option;
  let MultiplechoiceQ_OptionSTR = JSON.stringify(MultiplechoiceQ_Option);
  let DeadLine = req.body.DeadLine;

  const sqlQuery = `insert into BOARD(MY_SERVEY_KEY, SERVEY_TITLE, SUBJECTIVE_QUESTION, MULTIPLECHOICE_QUESTION, MULTIPLECHOICE_QUESTION_OPTION, SERVEY_DEADLINE_DATE) values(?, ?, ?, ?, ?, ?);`;

  const values = [MyServeyKey, Title, SubjectiveQSTR, MultiplechoiceQSTR, MultiplechoiceQ_OptionSTR, DeadLine];
  db.query(sqlQuery, values, (err, result) => {
    res.send(result);
    console.log(result, " <-result 완료되었습니다.  ");
    console.log(err, "<- err 에러입니다.");
  });
});

// PORT번호로 접속이 성공된다면 구현부의 콜백함수를 실행시킨다
app.listen(PORT, () => {
  console.log(`running on port ${PORT}!`);
});
