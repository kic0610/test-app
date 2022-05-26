import React from "react";
import styled from "styled-components";
import { useState } from "react";

import HomeCard from "../components/HomeCard";
import axios from "axios";
import shortid from "shortid";
import Clock from "../components/Clock";

const HomeSection = styled.section`
  width: 100%;
  margin-top: 20px;

  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr;
  grid-template-rows: 1fr 1fr;

  row-gap: 5em;

  justify-items: center;
  align-items: flex-start;
`;

const Home = () => {
  let [homeCardData, setHomeCardData] = useState([]);

  let onGet = () => {
    axios.get("http://localhost:8001/list", {}).then((res) => {
      setHomeCardData(res.data);
      console.log(res.data);
    });
  };

  return (
    // prop를 받아와 하나씩 넣어서
    <div>
      <h1 style={{ marginLeft: "5%", fontWeight: 600 }} onClick={onGet}>
        홈 (설문post접근데이터 , 작성자명 , 설문제목을 썸네일로 구현 )
      </h1>
      <Clock />
      <HomeSection>
        {homeCardData.map((data) => (
          <HomeCard key={shortid.generate()} data={data} />
        ))}
      </HomeSection>
    </div>
  );
};

export default Home;
