//express 사용하는 보일러태그
const express = require("express");
const app = express();
const mysql = require("mysql");

const PORT = process.env.port || 8001;
const db = mysql.createPool({ host: "localhost", user: "root", password: "6819et", database: "kic" });

// 서버단에서 cors 처리하는 방법(express)
const cors = require("cors");
let corsOptions = { origin: "*", credential: true };
app.use(cors(corsOptions));

//클라이언트로부터 특정 주소로 get요청을 받는경우 콜백함수를 실행시킨다 (쿼리에 556값 입력)
// app.get("/", (req, res) => {
//   const sqlQuery = "INSERT INTO requested (rowno) VALUES (526)";
//   db.query(sqlQuery, (err, result) => {
//     console.log(err);
//     res.send("http://localhost:8000/로 get요청 성공!");
//   });
// });

app.get("/list", (req, res) => {
  const sqlQuery = "SELECT *FROM BOARD;";
  db.query(sqlQuery, (err, result) => {
    res.send(result);
    console.log(result, "성공");
  });
});

// PORT번호로 접속이 성공된다면 구현부의 콜백함수를 실행시킨다
app.listen(PORT, () => {
  console.log(`running on port ${PORT}!`);
});
