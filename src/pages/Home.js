import React, { useEffect } from "react";
import styled from "styled-components";
import { useState } from "react";

import HomeCard from "../components/HomeCard";
import shortid from "shortid";
import Clock from "../components/Clock";
import axios from "axios";

const HomeSection = styled.section`
  position: relative;
  display: grid;

  left: 50%;
  transform: translateX(-50%);
  justify-items: center;
  align-items: center;

  width: 95%;
  margin-top: 20px;

  grid-template-columns: 1fr 1fr 1fr 1fr;
  row-gap: 5em;
`;

const Home = ({ SurveyData }) => {
  return (
    // prop를 받아와 하나씩 넣어서
    <div>
      <Clock />
      <HomeSection>
        {SurveyData.map((data) => (
          <HomeCard key={shortid.generate()} cardData={data} />
        ))}
      </HomeSection>
    </div>
  );
};

export default Home;
