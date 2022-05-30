import { Input, Form } from "antd";

import styled from "styled-components";
import PostGraph from "./PostGraph";
import { Button } from "antd";
import shortid from "shortid";
import axios from "axios";
import { useNavigate, useLocation, useParams } from "react-router-dom";

const ServeyForm = styled(Form)`
  position: relative;

  display: flex;
  flex-direction: column;

  left: 50%;
  transform: translateX(-50%);
  width: 70vw;
  height: auto;
  min-height: 80vh;
  background-color: #181a1b;
  color: white;
  font-size: 1.2rem;
  padding: 7%;

  /* 센터로 정렬하는 flex */
  display: flex;
  justify-content: center;
  align-items: center;

  .ant-input {
    border: 2px solid black;
    border-radius: 7px;
  }

  .TopForm {
    position: absolute;
    top: 0;
    width: 100%;
    height: auto;
    color: white;
    background-color: #024059;
    padding: 20px;
    display: flex;
    justify-content: space-between;
  }
`;

const SurveyBox = styled.div`
  margin-top: 100px;

  min-width: 100%;
  max-width: 100%;

  .answerObjectivity {
    display: flex;
    justify-content: space-around;
    flex-wrap: wrap;
    margin-top: 25px;
  }

  .answerObjectivityItem {
    min-width: 75px;
    display: flex;
    justify-content: space-around;
    align-items: center;
    margin-top: 7.5px;
    margin-bottom: 7.5px;
  }

  .ant-input {
    font-size: 1rem;
    width: 99%;
    height: 37px;
    margin-top: 25px;
    background-color: #181a1b;
    color: #a5a5a6;
    border: none;
  }
`;
const Ddiv = styled.div``;

const SurveyPost = (data) => {
  let data1 = data.data;

  const { id } = useParams();

  const postIndex = id - 1;

  return (
    <Ddiv>
      <h1 style={{ marginLeft: "5%", fontWeight: 600 }}>ㅁㅁid의 게시물 (게시물의 id를통해 (설문제목,설문번호별 설문+설문타입,객관식선택지,주관식은구현))</h1>

      <ServeyForm>
        <div className="TopForm">
          {data1[postIndex].SERVEY_TITLE}

          <Button type="primary">설문 작성 완료</Button>
        </div>

        {data1[postIndex].SUBJECTIVE_QUESTION[0].map((data) => (
          <SurveyBox key={shortid.generate()}>
            <div className="surveyQuestion">{data}</div>
            <div className="bottomLine" style={{ bottom: "inherit", backgroundColor: "pink", height: "1px", width: "99%", display: "block" }}></div>

            <Input.TextArea placeholder="사용자의 답변이 입력되는 란입니다."></Input.TextArea>
            <div className="bottomLine" style={{ bottom: "inherit", backgroundColor: "green", height: "1px", width: "99%", display: "block" }}></div>
          </SurveyBox>
        ))}

        {data1[postIndex].MULTIPLECHOICE_QUESTION[0].map((data, index) => (
          <SurveyBox key={shortid.generate()}>
            <div className="surveyQuestion">{data}</div>
            <div className="bottomLine" style={{ bottom: "inherit", backgroundColor: "pink", height: "1px", width: "99%", display: "block" }}></div>

            <div className="answerObjectivity">
              {data1[postIndex].MULTIPLECHOICE_QUESTION_OPTION[index].map((Option) => (
                <span key={shortid.generate()} className="answerObjectivityItem">
                  <input type="checkbox" id={Option} />
                  <label htmlFor={Option}>{Option}</label>
                </span>
              ))}
            </div>
            <div className="bottomLine" style={{ bottom: "inherit", backgroundColor: "green", height: "1px", width: "99%", display: "block" }}></div>
          </SurveyBox>
        ))}
      </ServeyForm>

      <PostGraph />
    </Ddiv>
  );
};

export default SurveyPost;
