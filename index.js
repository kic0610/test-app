//express 사용하는 보일러태그
const express = require("express");
const app = express();
const mysql = require("mysql");

const PORT = process.env.port || 8002;
const db = mysql.createPool({ host: "localhost", user: "root", password: "6819et", database: "kic" });

// 서버단에서 cors 처리하는 방법(express)
const cors = require("cors");
let corsOptions = { origin: "*", credential: true };
app.use(cors(corsOptions));

// App.js에서 설문지 데이터를 조회하면 아래 콜백함수로 설문지들을 반환해줌
app.get("/list", (req, res) => {
  const sqlQuery = "SELECT *FROM BOARD;";
  db.query(sqlQuery, (err, result) => {
    // let profile = result.map((item) => JSON.parse(item.profile));
    result.map((item) => (item.SUBJECTIVE_QUESTION = JSON.parse(item.SUBJECTIVE_QUESTION)));
    result.map((item) => (item.MULTIPLECHOICE_QUESTION = JSON.parse(item.MULTIPLECHOICE_QUESTION)));
    result.map((item) => (item.MULTIPLECHOICE_QUESTION_OPTION = JSON.parse(item.MULTIPLECHOICE_QUESTION_OPTION)));
    res.send(result);
    console.log("완료되었습니다. 에러는 => ", result);
  });
});

// PORT번호로 접속이 성공된다면 구현부의 콜백함수를 실행시킨다
app.listen(PORT, () => {
  console.log(`running on port ${PORT}!`);
});
