import React from "react";

function ReplyRendering() {
  const user = useSelector((state) => state.user);
  const [UserImg, setUserImg] = useState("");
  const [UserName, setUserName] = useState("");
  const [Contentset, setContents] = useState("");
  const userId = user.userData._id;

  useEffect(() => {
    fetchUserList();
  }, []);
  const fetchUserList = () => {
    axios
      .post("/api/reply/getReply", {
        postFrom: props.postFrom,
      })
      .then((response) => {
        if (response.data.req) {
          setUserImg(response.data.req[0].proFileImg);
          setUserName(response.data.req[0].userName);
          setOnReply(true);
        } else {
          setOnReply(false);
          console.log("null");
        }
      });
  };
  return (
    <div>
      <img
        style={{
          width: "5%",
          height: "5%",
          border: "1px solid lightgray",
          alignItems: "center",
          justifyContent: "center",
          borderRadius: "50px",
          boxShadow: "1px 1px 1px 1px inset",
        }}
        src={`http://localhost:5000/${UserImg}`}
        alt="프로필"
      />
    </div>
  );
}

export default ReplyRendering;
