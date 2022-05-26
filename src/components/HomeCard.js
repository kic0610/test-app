import React from "react";
import styled from "styled-components";
import { Card } from "antd";
import { Link } from "react-router-dom";
import { useState } from "react";

function getRandomColor() {
  return "#" + Math.floor(Math.random() * 16777215).toString(16);
}

const CardTitle = styled.div`
  width: 100%;
  height: 300px;

  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
  word-break: keep-all;

  font-size: 1.5rem;
  font-weight: 600;
  padding: 1rem;
`;

const HomeCard = (data) => {
  let cardData = data.data;

  let timeSource = cardData.SERVEY_REGISTER_DATE;
  let dateObj = new Date(timeSource);
  let timeString_KR = dateObj.toLocaleString("ko-KR", { timeZone: "Asia/Seoul" });

  return (
    <Link to={`/post/num${cardData.BOARD_ID}`}>
      <Card
        hoverable
        style={{ width: 270, height: "400px", border: "1.5px solid black", borderRadius: "4%", backgroundColor: "#FDFDFD" }}
        cover={<CardTitle style={{ border: "0.5px solid black", borderRadius: "4%", backgroundColor: getRandomColor() }}>{cardData.SERVEY_TITLE}</CardTitle>}
      >
        <Card.Meta title={`${timeString_KR} 작성`} />
      </Card>
    </Link>
  );
};

export default React.memo(HomeCard);
