import React from "react";

const TsteA = (props, setData) => {
  console.log(props);
  return (
    <>
      <br />{" "}
      <div onClick={() => props.setData("qqq")}>
        send data to parentsend data to parentsend data to parentsend data to parentsend data to parentsend data to parent
      </div>
      <br />
    </>
  );
};

export default TsteA;
