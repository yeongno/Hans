# LJW3
###2022-08-05 18:34 Updated
###추가 및 변경사항
###요약
-TOPIC기능 구현, 로그인 여부에 따라 표시되는 태그 변경

###TOPIC기능 추가
###server
#routes/topic.js(새 파일)
-TOPIC관련 라우팅 파일을 추가했습니다.
#models/Topic.js(새 파일)
-TOPIC 데이터를 DB에 저장히기 위한 스키마 파일을 추가했습니다.
#index.js(추가)
-라우트 파일 Topic.js파일과 연동하는 명령어를 추가했습니다.
#users.js(추가)
-로그인 성공시 쿠키에 name(닉네임)값이 저장됩니다.


###client

##NavBar(변경)
#로그인 관련 링크 표시(NavBar.jsx)
-비로그인 상태에서는 Sign In(로그인)이 로그인 상태에서는 LogOut(로그아웃) 및 닉네임(name)이 표시됩니다.

##src/Topic(새 폴더)
-Topic관련 파일 및 코드를 담은 폴더를 만들었습니다.
#TopicManagement.js(새 파일)
-Topic 데이터를 추가하고 관리하는 페이지를 만들었습니다.(임시)

##LoginPage
#LoginPage.jsx(추가)
-회원가입 페이지로 연결하는 링크를 추가했습니다.

##PostPage
#DetailPost.js(추가 및 변경)
-댓글 작성칸 왼쪽에 현재 로그인되어있는 사용자의 닉네임(name)이 표기되며 댓글 목록에 댓글 작성자(name)가 표시됩니다.
-댓글의 수정이나 삭제는 댓글 작성자와 현재 로그인 된 사용자와 정보가 일치해야 가능하며 자신이 쓴 댓글에만 수정, 삭제 버튼이 표시됩니다.

#PostList.jsx(추가 및 변경)
-게시글 상단 바에 Topic목록이 담긴 콤보박스를 추가했습니다.
-게시글 리스트에 해당 게시글이 속한 Topic이 표시됩니다.
-게시글의 수정이나 삭제는 글 작성자와 현재 로그인 된 사용자와 정보가 일치해야 가능하며 자신이 쓴 게시글에만 수정, 삭제 버튼이 표시됩니다.
-게시글 리스트에 좋아요(Like), 글 작성자(Writer), 등록일(Date)을 추가했습니다.

#PostPage.jsx(추가 및 변경)
-제목입력란 왼쪽에 Topic 콤보박스를 추가했습니다.

##src/_actions
#post_action.js(추가)
-토픽 등록 및 불러오는 기능을 추가했습니다.