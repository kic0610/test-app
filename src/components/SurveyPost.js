import { Input, Form } from "antd";

import styled from "styled-components";
import PostGraph from "./PostGraph";
import { Button } from "antd";
import shortid from "shortid";
import axios from "axios";
import { useNavigate, useLocation, useParams } from "react-router-dom";
import { useCallback, useEffect, useRef, useState } from "react";

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

  .chartBox {
    text {
      font-size: 1rem !important;
      font-weight: bold !important;
      fill: rgb(0, 128, 0) !important;
    }
  }

  .topContent {
    display: flex;
    justify-content: space-between;

    .Chartresults {
      margin-right: 10%;
      min-width: 10%;
      width: auto;
      font-weight: 600;
    }
  }

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
    margin-bottom: 15px;
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

const SurveyPost = () => {
  // 리액트 라우터로 현재 주소의 index를 가져오기 (서버와 통신하는 쿼리로사용)
  const { BOARD_ID } = useParams();
  const ChartView = useRef(null);

  let [display, setdisplay] = useState("none");
  let [SubmitValue, setSubmitValue] = useState(false);
  let [postItem, setpostItem] = useState(null);
  let [SubjectiveResponse, SetSubjectiveResponse] = useState([]);
  let [MultipleChoiceOptionResponse, SetMultipleChoiceOptionResponse] = useState({});
  let [ResultCount, SetResultCount] = useState([]);

  useEffect(() => {
    async function fetchData() {
      const post = await axios.get("http://localhost:8003/boardContent", {
        params: {
          BOARD_ID: BOARD_ID,
        },
      });
      let sample = post.data[0];
      setpostItem(post.data[0]);
      sample.MULTIPLECHOICE_QUESTION[0].map((data, index) => {
        MultipleChoiceOptionResponse[index] = [];
      });
      console.log(sample, "sample.MULTIPLECHOICE_QUESTIONsample.MULTIPLECHOICE_QUESTION");
    }
    fetchData();
  }, []);

  // 입력을 받아서 상태로 저장하는 모듈

  let onSubjectiveResponse = useCallback(
    (e) => {
      let subindex = Number(e.currentTarget.getAttribute("data-subjective_q-index"));
      SubjectiveResponse[subindex] = e.target.value;
    },
    [SubjectiveResponse]
  );

  let onCheck = useCallback(
    (e) => {
      let Option = e.currentTarget.getAttribute("data-option");
      let SurveyIndex = Number(e.currentTarget.getAttribute("data-survey-index"));

      if (e.target.checked) {
        console.log("체크가되어지고 값이 추가됩니다.");
        MultipleChoiceOptionResponse[SurveyIndex].push(Option);
      } else {
        console.log("체크 해제되어지고 값이 삭제됩니다.");
        const DeleteOptionIndex = MultipleChoiceOptionResponse[SurveyIndex].indexOf(Option);
        MultipleChoiceOptionResponse[SurveyIndex].splice(DeleteOptionIndex, 1);
      }
    },
    [MultipleChoiceOptionResponse]
  );

  let onView = () => {
    if (SubmitValue) {
      setdisplay("block");
    } else {
      alert("설문 작성후 확인해주세요.");
    }
  };

  let onSubmit = async () => {
    await axios
      .post("http://localhost:8003/answerinsert", {
        BOARD_ID: BOARD_ID,
        SubjectiveResponse: SubjectiveResponse,
        MultipleChoiceOptionResponse: MultipleChoiceOptionResponse,
      })
      .then((result) => {
        SetResultCount(result.data);
        setSubmitValue(true);
      })
      .catch((e) => {
        console.error(e, "e");
      })
      .finally(() => {
        console.log("설문조사 완료");
        console.log("입력값들 초기화");
        postItem.MULTIPLECHOICE_QUESTION[0].map((data, index) => {
          MultipleChoiceOptionResponse[index] = [];
        });
      });
  };

  console.log(postItem, "postItem");
  if (postItem != null) {
    return (
      <Ddiv>
        <h1 style={{ marginLeft: "5%", fontWeight: 600 }}>ㅁㅁid의 게시물 (게시물의 id를통해 (설문제목,설문번호별 설문+설문타입,객관식선택지,주관식은구현))</h1>

        <ServeyForm onFinish={onSubmit}>
          <div className="TopForm">
            {postItem.SERVEY_TITLE}

            <div>
              <Button onClick={onView} className="Chartresults" style={{ marginRight: "5vw", backgroundColor: "#000000", color: "white" }}>
                설문 통계 확인
              </Button>

              <Button type="primary" htmlType="submit">
                설문 작성 완료
              </Button>
            </div>
          </div>

          {postItem.MULTIPLECHOICE_QUESTION[0].map((data, index) => (
            <SurveyBox key={shortid.generate()}>
              <div className="topContent">
                <div className="surveyQuestion">
                  {data},{index}
                </div>
              </div>

              <div className="bottomLine" style={{ bottom: "inherit", backgroundColor: "pink", height: "1px", width: "99%", display: "block" }}></div>
              <div className="answerObjectivity">
                {postItem.MULTIPLECHOICE_QUESTION_OPTION[index].map((Option, index2) => (
                  <span key={shortid.generate()} className="answerObjectivityItem">
                    <input type="checkbox" id={Option} onClick={onCheck} data-option-index={index2} data-survey-index={index} data-option={Option} />
                    <label style={{ marginLeft: "10px" }} htmlFor={Option}>
                      {Option}
                    </label>
                  </span>
                ))}
              </div>
              <div className="bottomLine" style={{ bottom: "inherit", backgroundColor: "green", height: "1px", width: "99%", display: "block" }}></div>
              <div className="chartBox" ref={ChartView} style={{ display: display }}>
                <PostGraph countdata={ResultCount} Options={postItem.MULTIPLECHOICE_QUESTION_OPTION[index]} index={index} />
              </div>
            </SurveyBox>
          ))}

          {postItem.SUBJECTIVE_QUESTION[0].map((data, index) => (
            <SurveyBox key={shortid.generate()}>
              <div className="surveyQuestion">
                {data},{index}
              </div>
              <div className="bottomLine" style={{ bottom: "inherit", backgroundColor: "pink", height: "1px", width: "99%", display: "block" }}></div>

              <Input.TextArea onChange={onSubjectiveResponse} data-subjective_q-index={index} placeholder="사용자의 답변이 입력되는 란입니다."></Input.TextArea>
              <div className="bottomLine" style={{ bottom: "inherit", backgroundColor: "green", height: "1px", width: "99%", display: "block" }}></div>
            </SurveyBox>
          ))}
        </ServeyForm>
      </Ddiv>
    );
  } else {
    console.log("postItem이 null일때 빈페이지를 띄워줌");
  }
};

export default SurveyPost;
