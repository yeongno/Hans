import { Button } from "antd";
import React from "react";
import { useNavigate } from "react-router-dom";

function Buttons() {
  let navigate = useNavigate();

  const goModify = () => {
    navigate("/modifyProFile");
  };
  const goMyProFile = () => {
    navigate("/myProFile");
  };
  return (
    <div>
      <Button onClick={goModify}>수정 하기</Button>
      <Button onClick={goMyProFile}>저장 하기</Button>
    </div>
  );
}

export default Buttons;
