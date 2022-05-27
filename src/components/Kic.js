import { Input, Form } from "antd";

import React from "react";

import styled from "styled-components";
import PostGraph from "./PostGraph";
import { Button } from "antd";
import shortid from "shortid";

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

const Kic = (homeCardData) => {
  let data = homeCardData.homeCardData;

  let OptionJsonString = data.profile;
  let title = data.SERVEY_TITLE;
  let SubjectiveQuestion = data.SUBJECTIVE_QUESTION.split(",");
  let MultipleChoiceQuestion = data.MULTIPLECHOICE_QUESTION.split(",");
  let MultipleChoiceQuestionOption = JSON.parse(OptionJsonString);

  let subjectiveQuestionState = SubjectiveQuestion;
  let MultipleChoiceQuestionState = MultipleChoiceQuestion;
  let MultipleChoiceQuestionOptionState = MultipleChoiceQuestionOption;

  console.log(subjectiveQuestionState);

  // 입력을 받아서 상태로 저장하는 모듈
  // let [subjectiveQuestionState, setSubjectiveQuestionState] = useState(SubjectiveQuestion);
  // let [MultipleChoiceQuestionState, setMultipleChoiceQuestionState] = useState(MultipleChoiceQuestion);
  // let [MultipleChoiceQuestionOptionState, setMultipleChoiceQuestionOptionState] = useState(MultipleChoiceQuestionOption);

  // console.log(MultipleChoiceQuestionOptionState, 777);
  // console.log(typeof data.profile, 888);
  // console.log(MultipleChoiceQuestionOptionState, 999);

  return (
    <div>
      <h1 style={{ marginLeft: "5%", fontWeight: 600 }}>ㅁㅁid의 게시물 (게시물의 id를통해 (설문제목,설문번호별 설문+설문타입,객관식선택지,주관식은구현))</h1>

      <ServeyForm>
        <div className="TopForm">
          {title}

          <Button type="primary">설문 작성 완료</Button>
        </div>

        {subjectiveQuestionState.map((sqdata) => (
          <SurveyBox key={shortid.generate()}>
            <div className="surveyQuestion">{sqdata}</div>
            <div className="bottomLine" style={{ bottom: "inherit", backgroundColor: "pink", height: "1px", width: "99%", display: "block" }}></div>

            <Input.TextArea placeholder="사용자의 답변이 입력되는 란입니다."></Input.TextArea>
            <div className="bottomLine" style={{ bottom: "inherit", backgroundColor: "green", height: "1px", width: "99%", display: "block" }}></div>
          </SurveyBox>
        ))}

        {MultipleChoiceQuestionState.map((mcqdata, index) => (
          <SurveyBox key={shortid.generate()}>
            <div className="surveyQuestion">{mcqdata}</div>
            <div className="bottomLine" style={{ bottom: "inherit", backgroundColor: "pink", height: "1px", width: "99%", display: "block" }}></div>

            <div className="answerObjectivity">
              {MultipleChoiceQuestionOptionState[index].map((Option) => (
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
    </div>
  );
};

export default Kic;
