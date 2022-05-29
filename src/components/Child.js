import React, { forwardRef, useImperativeHandle } from "react";

const Child = forwardRef((props, ref) => {
  useImperativeHandle(ref, () => ({
    showAlert() {
      alert("hi");
    },
  }));

  return <div>자식임</div>;
});

export default Child;
