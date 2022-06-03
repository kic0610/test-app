import { Input, Form } from "antd";
import { PlusCircleOutlined } from "@ant-design/icons";
import React, { useState } from "react";
import styled from "styled-components";
import { DatePicker } from "antd";
import { useCallback } from "react";
import { Button } from "antd";
import axios from "axios";
import shortid from "shortid";
import MultipleChoice from "../components/MultipleChoice";
import SubjectiveQuestion from "../components/SubjectiveQuestion";

const TemplateSelect = styled.div`
  position: relative;
  display: flex;
  justify-content: space-around;
  align-items: center;
  width: 70vw;
  height: 20vh;
  left: 50%;
  transform: translateX(-50%);

  background-color: #024059;

  .ant-btn {
    width: 160px;
    height: 55px;
    font-size: 1.2rem;
  }
`;

const TemplateForm = styled(Form)`
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

  display: flex;
  justify-content: center;
  align-items: center;

  /* ant-input는 Input.TextArea를 뜻함 */
  .surveyTitle {
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
  }
`;

const TitleSurveyBox = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
  margin-top: 25px;
`;

const AddBtn = styled.div`
  position: fixed;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  top: 53%;
  right: 0.7%;

  width: 13%;
  height: 20%;

  color: #bfbfbf;

  font-weight: 600;

  div {
    border-radius: 4px;
    background-color: #181a1b;
    padding: 3px;

    width: 100%;
    text-align: center;
    transition: 0.6s;

    cursor: pointer;
  }

  div:hover {
    box-shadow: 0px 0px 15px #181a1b;
  }
`;

const SurveyContainer = styled.div`
  width: 100%;
`;

const Surveying = () => {
  // 객관식 설문 데이터 생성 및 삭제 (배열데이터 map하여 사용 , component key 사용필수 , splice로 삭제도 사용해볼것)

  const [MultipleChoiceKey, setMultipleChoiceKey] = useState([]);
  const [SubjectiveQuestionKey, setSubjectiveQuestionKey] = useState([]);

  const [MultiplechoiceQ, setMultiplechoiceQ] = useState([]);
  const [SubjectiveQ, setSubjectiveQ] = useState([]);

  const [MultiplechoiceQ_Option, setMultiplechoiceQ_Option] = useState({});

  const [MyCode, setMyCode] = useState();
  const [Title, setTitle] = useState();
  const [DeadLine, setDeadLine] = useState();

  const onMultipleChoiceAdd = useCallback(() => {
    const shortkey = shortid.generate();
    setMultipleChoiceKey(MultipleChoiceKey.concat(shortkey));
  }, [MultipleChoiceKey]);

  const onMultipleChoiceRemove = useCallback(
    (e) => {
      // 아래의 MultiplechoiceQ 배열속 질문 요소를 완전히 제거하려면 filter가 아닌 이방식으로 해야함
      const target1 = e.currentTarget.getAttribute("data-multiplechoice-key");
      const target2 = e.currentTarget.getAttribute("index");
      setMultipleChoiceKey(MultipleChoiceKey.filter((data) => data !== target1));
      MultiplechoiceQ.splice(target2, 1);
    },
    [MultipleChoiceKey, MultiplechoiceQ]
  );

  // 주관식 설문 데이터 생성 및 삭제 (배열데이터 map하여 사용 , component key 사용필수)

  const onSubjectiveQuestionAdd = useCallback(() => {
    const shortkey = shortid.generate();
    setSubjectiveQuestionKey(SubjectiveQuestionKey.concat(shortkey));
  }, [SubjectiveQuestionKey]);

  const onSubjectiveQuestionRemove = useCallback(
    (e) => {
      const target = e.currentTarget.getAttribute("data-subjectivequestion-key");
      setSubjectiveQuestionKey(SubjectiveQuestionKey.filter((data) => data !== target));
    },
    [SubjectiveQuestionKey]
  );

  // 입력을 받아서 상태로 저장하는 모듈

  const onMyCode = useCallback((e) => {
    setMyCode(e.target.value);
  }, []);

  const onTitle = useCallback((e) => {
    setTitle(e.target.value);
  }, []);

  const onDeadLine = useCallback((e) => {
    setDeadLine(e._d);
  }, []);

  const onSubjectiveQ = useCallback((e) => {
    setSubjectiveQ(e.target.value);
  }, []);

  // 설문지 데이터 전달하여 데이터 INSERT
  const onSubmit = () => {
    console.log(MyCode, Title, DeadLine, SubjectiveQ, MultiplechoiceQ, "MultiplechoiceQ_Option:", MultiplechoiceQ_Option);
    // console.log(MultiplechoiceQ, "MultiplechoiceQ", "최종적으로 보내는 데이터");
  };

  return (
    <Form onFinish={onSubmit} style={{ msUserSelect: "none", MozUserSelect: "-moz-none", WebkitUserSelect: "none", userSelect: "none" }}>
      <TemplateForm className="TemplateForm">
        <div className="TopForm">
          <TitleSurveyBox>
            <Input.TextArea
              onChange={onMyCode}
              className="surveyTitle"
              placeholder="내가 만든 설문만 모아 볼수있는 비밀번호를 입력하세요 ( 10자 이내)"
              style={{ fontSize: "1rem", width: "45vw", height: "37px", backgroundColor: "#181A1B", color: "white", border: "none" }}
              maxLength={10}
            ></Input.TextArea>
            <Input.TextArea
              onChange={onTitle}
              className="surveyTitle"
              placeholder="설문 제목을 입력하세요 ( 50자)"
              style={{ fontSize: "1rem", width: "55vw", height: "37px", marginTop: "1rem", backgroundColor: "#181A1B", color: "white", border: "none" }}
              maxLength={50}
            ></Input.TextArea>
            <div className="bottomLine" style={{ bottom: "inherit", backgroundColor: "gray", height: "1px", width: "55vw", display: "block" }}></div>
            <br />
            <DatePicker showTime placeholder="설문의 마감 날짜/시간" onChange={onDeadLine} />
          </TitleSurveyBox>
        </div>
        <br />
        <br />
        <br />

        <SurveyContainer>
          {MultipleChoiceKey.map((MultipleChoiceeItem, index) => (
            <span key={MultipleChoiceeItem}>
              <MultipleChoice
                key={MultipleChoiceeItem}
                index={index}
                MultipleChoiceeItem={MultipleChoiceeItem}
                MultiplechoiceQ={MultiplechoiceQ}
                MultiplechoiceQ_Option={MultiplechoiceQ_Option}
              />
              <div onClick={onMultipleChoiceRemove} index={index} data-multiplechoice-key={MultipleChoiceeItem}>
                {MultipleChoiceeItem} , 제거버튼
              </div>
            </span>
          ))}

          {/* important point 1. key를 입력하지 않으면 설문제거의 버그가 일어남 */}
          {SubjectiveQuestionKey.map((SubjectiveQuestionItem, index) => (
            <span key={SubjectiveQuestionItem}>
              <SubjectiveQuestion SubjectiveQuestionItem={SubjectiveQuestionItem} index={index} SubjectiveQ={SubjectiveQ} />
              <div onClick={onSubjectiveQuestionRemove} data-subjectivequestion-key={SubjectiveQuestionItem}>
                {SubjectiveQuestionItem} , 제거버튼
              </div>
            </span>
          ))}
        </SurveyContainer>
      </TemplateForm>

      <AddBtn>
        <div onClick={onMultipleChoiceAdd}>
          <PlusCircleOutlined style={{ marginRight: "10px", fontSize: "1rem" }} />
          객관식 설문 추가
        </div>

        <div onClick={onSubjectiveQuestionAdd}>
          <PlusCircleOutlined style={{ marginRight: "10px", fontSize: "1rem" }} />
          주관식 설문 추가
        </div>
      </AddBtn>

      <br />
      <br />
      <br />
      <br />
      <TemplateSelect>
        <Button type="primary" htmlType="submit">
          설문 작성 완료
        </Button>
      </TemplateSelect>
    </Form>
  );
};

export default Surveying;
