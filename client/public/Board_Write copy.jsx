<div>
  <h4>Write your message</h4>
  <script src="../../Component/smarteditor/js/HuskyEZCreator.js"></script>
  <script src="../../Component/Bootstrap-filestyle/bootstrap-filestyle.min.js"></script>
  <script type="text/javascript">
    $(function()
    {
      //전역변수선언
    }
    //전역변수선언 var editor_object = []; nhn.husky.EZCreator.createInIFrame(
    {oAppRef}: editor_object, elPlaceHolder: "smarteditor", sSkinURI:
    "../../Component/smarteditor/SmartEditor2Skin.html", htParams:{" "}
    {
      // 툴바 사용 여부 (true:사용/ false:사용하지 않음)
      bUseToolbar
    }{" "}
    : true, // 입력창 크기 조절바 사용 여부 (true:사용/ false:사용하지 않음)
    bUseVerticalResizer : true, // 모드 탭(Editor | HTML | TEXT) 사용 여부
    (true:사용/ false:사용하지 않음) bUseModeChanger : true,
    {"}"}
    {"}"}); //전송버튼 클릭이벤트 $("#submitbutton").click(function()
    {
      //id가 smarteditor인 textarea에 에디터에서 대입
      editor_object.getById["smarteditor"].exec("UPDATE_CONTENTS_FIELD", [])
    }
    ; // 이부분에 에디터 validation 검증 //폼 submit
    $("#message_form").submit();
    {"}"}){"}"})
  </script>
  <form
    class="form-horizontal"
    enctype="multipart/form-data"
    role="form"
    action="/bord/write"
    method="post"
    id="message_form"
  >
    <div class="row">
      <div class="col-md-11">
        <div class="form-group" style="margin-bottom:0px">
          <label
            class="control-label"
            for="Message_Title"
            style="margin-bottom:0px"
          >
            Title
          </label>
          <div>
            <input
              class="form-control"
              name="N_Message_Title"
              id="Message_Title"
              type="text"
              placeholder="Title"
            ></input>
          </div>
        </div>
      </div>
    </div>
    <div class="row">
      <div class="col-md-12">
        <div class="form-group">
          <label
            class="control-label"
            for="Message_Text"
            style="margin-bottom:0px"
          >
            Text
          </label>
          <div style="padding-right:4px">
            <textarea
              class="form-control"
              rows="20"
              name="smarteditor"
              id="smarteditor"
              type="text"
            ></textarea>
          </div>
        </div>
        <div class="form-group">
          <div class="text-left">
            <span>
              <label class="control-label" for="Upload_file_input">
                Select Files to Upload
              </label>
              <input
                type="file"
                id="Upload_file_input"
                class="filestyle"
                data-buttonName="btn-primary"
                name="N_Upload_file_input"
                multiple
                data-buttonBefore="true"
              ></input>
            </span>
          </div>
        </div>{" "}
        --{">"}
        <div class="form-group">
          <div class="text-center">
            <button
              class="btn btn-primary"
              id="submitbutton"
              type="submit"
              name="submit"
              value="Submit"
            >
              Submit &nbsp;<i class="fa fa-check spaceLeft"></i>
            </button>
            <button class="btn btn-danger">
              Cancel &nbsp;<i class="fa fa-times spaceLeft"></i>
            </button>
          </div>
        </div>
      </div>
    </div>
  </form>
</div>;
