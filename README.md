# Hans
LJW3
##2022-14-20
#PostPage.jsx
-이미지 업로드 기능 및 에디터(CKEditor5) 기능을 추가했습니다.
#DetailPost.js
-dangerouslySetInnerHTML 코드를 통해 게시글 내용(Content)부분에 HTML 태그가 적용되어 표시됩니다.(XSS방어코드는 X)
#index.js(server)
-파일 업로드 관련 모듈, 미들웨어, API를 추가했습니다
#필수 모듈 추가 설치
-해당 기능들을 이용하려면 아래의 명령어를 입력해서 모듈을 추가로 설치하세요(client폴더 포함)

npm install --save multer dotenv path mime-types uuid

##
