import { useNavigate } from "react-router-dom";

function BoardList() {
  const navigate = useNavigate();
  const Cancel1 = () => {
    navigate("../BoardList");
  };

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "top",
        flexDirection: "column",
        alignItems: "center",
        width: "100%",
        height: "100vh",
      }}
    >
      <font size="6">Write your Message</font>
      <form>
        <label>제목 : </label>
        <input type="text"></input>
        <br />
        <label> 내용 : </label>
        <textarea></textarea>
        <br />
        <button>저장하기</button>
        <button onClick={Cancel1}>취소하기</button>
      </form>
    </div>
  );
}

export default BoardList;
