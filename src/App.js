import { Route, Routes, Switch } from "react-router-dom";

import React, { useEffect, useState } from "react";
import Home from "./pages/Home";
import styled from "styled-components";

import Surveying from "./pages/Surveying";
import SearchResult from "./components/SearchResult";
import MySurvey from "./components/MySurvey";
import HomeMenu from "./components/HomeMenu";
import axios from "axios";
import SurveyPost from "./components/SurveyPost";
import shortid from "shortid";
import SignupForm from "./pages/SignupForm";
import LoginForm from "./pages/LoginForm";

const MyFooter = styled.footer`
  position: absolute;
  padding: 5px;
  border: 2px solid black;
  background-color: #1d2021;
  color: #9c9489;
  width: 100%;
  height: 15vh;
  font-weight: 500;
`;

const App = () => {
  let [homeCardData, setHomeCardData] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:8002/boardlist").then((res) => {
      setHomeCardData(res.data);
    });
  }, []);

  return (
    <div style={{ minHeight: "100vh", backgroundColor: "#236C4E" }}>
      <HomeMenu />
      <Routes>
        <Route exact path="/" element={<Home SurveyData={homeCardData} />} />
        <Route path="/surveying" element={<Surveying />} />
        {/* 나중에 구현 */}
        {/* <Route path="/signup" element={<SignupForm />} /> */}
        {/* <Route path="/login" element={<LoginForm />} /> */}

        <Route path="/search/query" element={<SearchResult />} />
        <Route path="/Writer_id/post" element={<MySurvey />} />

        {/* 이 컴포넌트를 상세페이지로 만들기 이때 주소별로 <SurveyPost/>를 인스턴스화 시켜야함 */}

        <Route path="/post/:BOARD_ID" element={<SurveyPost />} />
      </Routes>
      <br />
      <br />
      <br />
      <MyFooter>
        문의사항&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;고객요청사항에 남기시거나, study6819789@gmail.com에 문의를 남겨주세요.
        <hr />
        <div style={{ position: "absolute", bottom: "0px" }}>
          Copyright © 2022 KIC Inc. 모든 권리 보유
          <br />
          Establishment&nbsp;&nbsp;강익치
        </div>
      </MyFooter>
    </div>
  );
};

export default App;
