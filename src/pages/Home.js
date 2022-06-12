import React, { useEffect } from "react";
import styled from "styled-components";
import { useState } from "react";

import HomeCard from "../components/HomeCard";
import shortid from "shortid";
import Clock from "../components/Clock";
import axios from "axios";

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
