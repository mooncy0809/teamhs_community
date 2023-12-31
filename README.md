# Team Hs
`개발자 면접 문제 은행` 웹 애플리케이션 프로젝트 입니다. <br/><br/>
 `2023.08.04 ~ 2023.09.30` 동안 `Spring Boot` 와 `React` 를 사용해 구현했습니다.
 
이 프로젝트를 통해 이루고자 한 목표는 `Spring에서 제공하는 프레임워크를 직접 사용해 보기` 였습니다. 
프로젝트 구현 과정 동안 회원 인증/인가, 예외처리를 고민하며 코드를 작성했습니다.


# 📚 목차
* [프로젝트 구조](#-프로젝트-구조)
* [사용 기술](#-사용-기술)
* [구현 기능](#-구현-기능)
* [기능 실행화면](#-기능-실행화면)
* [API 명세서](#-API-명세서)
* [ERD 설계](#-ERD-설계)
* [트러블슈팅](#-트러블슈팅)

# 🎃 프로젝트 구조
### 📌 Backend
<img width="575" alt="backend-project-structure" src="https://github.com/mooncy0809/teamhs_community/assets/57522230/8ee32012-5026-4218-bfa3-9758e7f90abf">

### 🥕 Frontend
<img width="574" alt="frontend-project-structure" src="https://github.com/mooncy0809/teamhs_community/assets/57522230/ed2d5b26-1e92-4a08-a92b-585dfdaaaaab">


# 🕹 사용 기술
### 📌 Backend
|기술|버전|
|----|----|
|Spring Boot|3.1.2|
|Spring Security|6.1.2|
|Bean Validation|3.0.2|
|JSON Web Token|0.9.1|
|JPA|3.1.2|
|jdk|17.0.2|
|thymeleaf|3.1.2|
|MySQL Connector J|8.0.33|
|Swagger|3.0.0|

### 🥕 Frontend
|기술|버전|
|----|----|
|NodeJS|18.17.0|
|React|18.2.0|
|axios|1.5.0|
|react-axios|2.0.6|
|react-dom|18.2.0|
|react-router|6.3.0|
|react-router-dom|6.3.0|
|react-redux|8.1.2|
|redux|4.2.1|
|react-scripts|5.0.1|
|react-quill|2.0.0|
|react-cookie|6.1.0|
|quill-image-resize|3.0.9|
|sweetalert2|11.7.31|

# 🎢 구현 기능
* 게시판 기능
  * 모든 게시글 및 특정 게시글 조회
  * 게시글 검색 (전체, 제목, 내용)
  * 게시글 작성 [회원]
  * 게시글 수정 [게시글 작성자]
  * 게시글 삭제 [게시글 작성자]
  * 게시글 좋아요와 조회수[회원]
  * 댓글 조회 [회원]
  * 댓글 작성 [회원]
  * 댓글 수정 [댓글 작성자]
  * 댓글 삭제 [댓글 작성자]
  * 답글 작성 [회원]
  * 답글 조회 [회원]
  * 답글 삭제 [답글 작성자]
* 문제 기능
  * 문제 작성 [관리자]
  * 문제 조회 [관리자]
  * 문제 수정 [관리자]
  * 문제 삭제 [관리자]
  * 답안 작성 [회원]
  * 답안 조회 [회원]
  * 답안 수정 [회원]
  * 답안 삭제 [회원]
  * 정답 작성 [관리자]
  * 정답 수정 [관리자]
  * 정답 확인 [회원]
  * 채점 기능 [관리자] (-ing)
* 회원 기능
  * 회원가입
  * 로그인/로그아웃
  * 마이페이지
  
# 🍭 기능 실행화면

## 게시판 기능
### 모든 게시글 및 특정 게시글 조회
* 모든 게시글을 조회할 수 있습니다.
* 페이징 기능을 통해 한 페이지에 최대 15개의 게시글이 조회됩니다.
* 카테고리 별 조회가 가능합니다(전체, 자유게시판, 뉴스)
<img width="1724" alt="boardlist" src="https://github.com/mooncy0809/teamhs_community/assets/57522230/7acb6715-457b-4f09-9b8a-5e371cae756e">
<img width="1724" alt="bbslist2" src="https://github.com/mooncy0809/teamhs_community/assets/57522230/53a4e632-85e1-4abc-8b6c-adb44595f33c">
<img width="1724" alt="bbslist3" src="https://github.com/mooncy0809/teamhs_community/assets/57522230/b5fb450e-733b-43f6-9bbd-7abd16e3ceef">

* 게시글 리스트를 클릭하면, 게시글의 상세 내용을 조회할 수 있습니다.
<img width="1724" alt="board-detail1" src="https://github.com/mooncy0809/teamhs_community/assets/57522230/e7e888c3-6dfb-4eac-aa60-9ba009bd2af5">
<img width="1724" alt="board-detail2" src="https://github.com/mooncy0809/teamhs_community/assets/57522230/45553333-c029-4848-a92b-5990a2834ee0">


### 게시글 검색
* 게시글 전체(제목 + 내용)와 제목과 내용으로 게시글을 검색할 수 있습니다.
<img width="1724" alt="board-search" src="https://github.com/mooncy0809/teamhs_community/assets/57522230/3fe0b55d-ebc1-41ff-86c0-1406cda5573a">


### 게시글 작성
* 로그인한 사용자는 게시글을 작성할 수 있습니다.
* 게시글 제목과 내용에 내용이 없을 시, 저장 버튼이 활성화 되지 않습니다.
* 이미지 첨부가 가능합니다.
<img width="1724" alt="bbs-write" src="https://github.com/mooncy0809/teamhs_community/assets/57522230/0edcc6e6-ca0c-467f-85e1-a7045030e5c4">
<img width="1724" alt="bbs-write-success" src="https://github.com/mooncy0809/teamhs_community/assets/57522230/fdfae106-524b-4b3f-ba88-e8e65adff109">
<img width="1724" alt="bbs-write-result" src="https://github.com/mooncy0809/teamhs_community/assets/57522230/dfca4abb-34a3-4f3b-b63a-671080a2820c">

* 로그인하지 않았을 경우 게시글 작성 버튼이 표시되지 않습니다.
<img width="1724" alt="bbs-write-auth" src="https://github.com/mooncy0809/teamhs_community/assets/57522230/dc25504d-4041-49c4-bfa6-999dad5b2013">


### 게시글 수정
* 게시글 작성자는 게시글을 수정할 수 있습니다.
<img width="1724" alt="bbs-update" src="https://github.com/mooncy0809/teamhs_community/assets/57522230/3dd14e36-6580-4afd-b93e-daab05ecf835">
<img width="1724" alt="bbs-update2" src="https://github.com/mooncy0809/teamhs_community/assets/57522230/3ac62788-e6a0-4f63-b132-05fc2498a7be">
<img width="1724" alt="bbs-update3" src="https://github.com/mooncy0809/teamhs_community/assets/57522230/fb0d7e9f-bd15-41b3-9bb6-2f9daca69554">
<img width="1724" alt="bbs-update2" src="https://github.com/mooncy0809/teamhs_community/assets/57522230/3f9edefc-f0de-4bb3-9076-be3ffa5486ed">
<img width="1724" alt="bbs-update-success" src="https://github.com/mooncy0809/teamhs_community/assets/57522230/60e62922-3f92-4962-b298-1858ab9e9747">


* 자신이 작성한 게시글에만 수정, 삭제 버튼이 활성화됩니다.
<img width="1724" alt="bbs-update-delete-btn-active" src="https://github.com/mooncy0809/teamhs_community/assets/57522230/76e3695a-2af1-4cc1-9f64-7846045f1bef">

### 게시글 삭제
* 게시글 작성자는 게시글을 삭제할 수 있습니다.
<img width="1724" alt="bbs-delete" src="https://github.com/mooncy0809/teamhs_community/assets/57522230/9451d85e-50d8-4d27-8680-05148175b29c">
<img width="1724" alt="bbs-delete2" src="https://github.com/mooncy0809/teamhs_community/assets/57522230/d47e5015-378a-4149-ac38-4997d50c513f">
<img width="1724" alt="bbs-delete-result" src="https://github.com/mooncy0809/teamhs_community/assets/57522230/237f4195-4980-43a8-9c51-82f6fc3f0160">

### 게시글 좋아요 & 조회수
* 게시글에 좋아요를 누를 수 있습니다.
* 각 계정 당 게시글 좋아요 하나씩 누를 수 있고, 좋아요가 되어있는 상태에서 누르면 좋아요가 취소됩니다.
<img width="1724" alt="board_like1" src="https://github.com/mooncy0809/teamhs_community/assets/57522230/e2900ea6-7bc9-46bb-b133-e44e60ccee92">
<img width="1724" alt="board_like2" src="https://github.com/mooncy0809/teamhs_community/assets/57522230/096da14a-0aae-4594-ab5a-ec178fefd74b">
<img width="1724" alt="board_like3" src="https://github.com/mooncy0809/teamhs_community/assets/57522230/8f491787-f5b0-4983-91ca-0232f44cad95">

* 게시글을 보면 조회수가 추가됩니다.
<img width="1724" alt="board_view" src="https://github.com/mooncy0809/teamhs_community/assets/57522230/7e5c6993-04ac-42fa-bb4a-c6f7381daf0b">

* 게시글 리스트에서 각 게시글의 좋아요와 조회수가 표시됩니다.
<img width="1724" alt="board_like_view_result" src="https://github.com/mooncy0809/teamhs_community/assets/57522230/4e36d84b-aeab-4629-8b72-2f0480a48597">


## 댓글 기능
### 댓글 조회
* `게시글 상세 페이지` 에서 관련된 댓글을 조회할 수 있습니다.

* 게시글의 달린 전체 댓글 갯수를 조회할 수 있습니다.
<img width="1724" alt="comment1" src="https://github.com/mooncy0809/teamhs_community/assets/57522230/3a7d0a51-424b-498d-acd6-58f489eaed77">

* 현재 접속자를 표시해줍니다. 댓글의 내용이 없으면 작성 버튼이 비활성화됩니다.
<img width="1724" alt="comment2" src="https://github.com/mooncy0809/teamhs_community/assets/57522230/28c2a9ec-3697-4776-a636-ed9a4d3e6665">

* 댓글 작성자가 아니면 수정/삭제가 불가합니다.
<img width="1724" alt="comment3" src="https://github.com/mooncy0809/teamhs_community/assets/57522230/7ae19a0a-4ac5-4294-ba2d-732f34c329c9">

* 로그인 하지 않으면 댓글을 작성할 수 없습니다.
<img width="1724" alt="comment-can't" src="https://github.com/mooncy0809/teamhs_community/assets/57522230/7396a824-cef4-4b9d-b7f9-073cd144cbe3">



### 댓글 작성
* 로그인한 사용자는 댓글을 작성할 수 있습니다.

<img width="1680" alt="comment-write1" src="https://github.com/mooncy0809/teamhs_community/assets/57522230/e5724e07-c8d8-46ef-a961-d46df5410f75">
<img width="1724" alt="comment-write2" src="https://github.com/mooncy0809/teamhs_community/assets/57522230/822fbfe6-aef9-42bf-963c-3e619aa4ffe7">


### 댓글 수정
* 자신이 작성한 댓글을 수정할 수 있습니다.
<img width="1724" alt="comment-update1" src="https://github.com/mooncy0809/teamhs_community/assets/57522230/02a993cc-fa8f-4369-a868-b9220902436d">
<img width="1724" alt="comment-update2" src="https://github.com/mooncy0809/teamhs_community/assets/57522230/6d1f62fb-e098-41ff-b03b-43cfd59cce42">
* 수정된 댓글은 수정된 시간으로 업데이트되고, (수정됨)으로 표시됩니다.
<img width="1724" alt="comment-update3" src="https://github.com/mooncy0809/teamhs_community/assets/57522230/6767e1ae-dd92-4688-a0f8-35fc0c09dd3f">

### 댓글 삭제
* 자신이 작성한 댓글을 삭제할 수 있습니다.
<img width="1724" alt="comment-delete" src="https://github.com/mooncy0809/teamhs_community/assets/57522230/d3900b21-a1dd-4309-be9a-77475c12e52b">
<img width="1680" alt="comment-delete2" src="https://github.com/mooncy0809/teamhs_community/assets/57522230/e4696bc7-84b1-4079-9625-585449d8c1f0">


## 답글 기능
### 답글 조회
* 댓글에 달린 답글 갯수를 표시합니다.클릭하면 해당 댓글의 답글을 조회할 수 있습니다.
<img width="1724" alt="comment1" src="https://github.com/mooncy0809/teamhs_community/assets/57522230/0ee60e29-8afe-4c98-9e24-cf57659c63ae">
* 닫기를 클릭하면 해당 답글창이 닫힙니다.
<img width="1724" alt="comment1" src="https://github.com/mooncy0809/teamhs_community/assets/57522230/e63ce993-1c6c-4306-92ef-a09cab396dd2">
* 답글이 5개 이상이면 "답글 더보기" 버튼이 생성되고, 답글 더보기 버튼을 클릭하면 나머지 답글이 표시됩니다.
<img width="1724" alt="comment1" src="https://github.com/mooncy0809/teamhs_community/assets/57522230/1d18cd37-8440-4aee-b38a-1c7a7090f354">
* 숨기기를 클릭하면 답글이 다시 5개만 보이게 됩니다.
<img width="1724" alt="comment1" src="https://github.com/mooncy0809/teamhs_community/assets/57522230/5a04db38-0c97-43bf-a0b3-5e78d96ae4e2">
* 로그인을 하지 않으면 답글을 작성할 수 없습니다.
<img width="1724" alt="comment1" src="https://github.com/mooncy0809/teamhs_community/assets/57522230/0ea68ef5-b43f-4dce-a97e-1bb80ed867cf">

### 답글 작성
<img width="1724" alt="comment1" src="https://github.com/mooncy0809/teamhs_community/assets/57522230/c8d9161c-15b1-4175-b85e-f0518093598c">
<img width="1724" alt="comment1" src="https://github.com/mooncy0809/teamhs_community/assets/57522230/7426d16c-21e2-43a1-b761-244cead5909d">


### 답글 삭제
<img width="1724" alt="comment1" src="https://github.com/mooncy0809/teamhs_community/assets/57522230/729ebd3c-861c-40a0-b461-3e16b0ed531f">
<img width="1724" alt="comment1" src="https://github.com/mooncy0809/teamhs_community/assets/57522230/f00ae18e-5a7a-4740-a2f8-21d576be7e2b">
<img width="1724" alt="comment1" src="https://github.com/mooncy0809/teamhs_community/assets/57522230/24bb4e04-d22d-4201-a516-243c95a23a7d">


<br><br><br><br>
## 문제 기능
### 문제 작성
* 관리자 아이디로 로그인 했을 경우 문제를 작성할 수 있습니다.
* 필수 항목을 입력하지 않으면 저장 버튼이 활성화 되지 않습니다.

![image](https://github.com/mooncy0809/teamhs_community/assets/84116509/d850623c-aa8e-46a4-a9e4-71220fb30e59)
<br><br><br><br>

* 모든 항목을 입력하면 저장 버튼이 활성화 됩니다.
  
![image](https://github.com/mooncy0809/teamhs_community/assets/84116509/89c9c7c6-eee2-4505-82df-cd33d0f96ec6)
<br><br><br><br>


### 문제 조회
* 전체 문제를 조회할 수 있습니다.
* 페이징 기능을 통해 한 페이지에 최대 10개의 문제가 조회됩니다.

![image](https://github.com/mooncy0809/teamhs_community/assets/84116509/3bf49fe6-87f2-49d5-8cf4-4835c71ca17d)
<br><br><br><br>

* 관리자는 문제 목록에서 정답을 추가할 수 있습니다.

![image](https://github.com/mooncy0809/teamhs_community/assets/84116509/67e88d54-9b94-4469-bf7a-b08937184cb8)
<br><br><br><br>

* 카테고리별로 문제유형별로 필터링하여 조회가 가능합니다.

![image](https://github.com/mooncy0809/teamhs_community/assets/84116509/f10522f8-eadc-4e65-985d-a57748f01e71)
![image](https://github.com/mooncy0809/teamhs_community/assets/84116509/a15c0b62-7cd6-43bb-a629-e22d82c57cf6)
<br><br><br><br>

* 문제의 제목을 클릭하면 문제 조회가 가능합니다.

![image](https://github.com/mooncy0809/teamhs_community/assets/84116509/05ace339-6dfc-4470-9768-e93e5c39b32c)
<br><br><br><br>


### 문제 수정
* 문제 작성자인 경우 문제 수정이 가능합니다.

![image](https://github.com/mooncy0809/teamhs_community/assets/84116509/05ace339-6dfc-4470-9768-e93e5c39b32c)
![image](https://github.com/mooncy0809/teamhs_community/assets/84116509/c410793f-c3bd-4132-8fc1-da7dd18ab76f)
<br><br><br><br>

* 수정을 클릭하면 문제 수정 페이지로 넘어가고 이전의 문제 내용을 불러옵니다. 여기서 자유롭게 수정하여 변경된 내용으로 저장이 가능합니다.

![image](https://github.com/mooncy0809/teamhs_community/assets/84116509/4a40233d-d2df-4ed7-858e-0ecf700279b3)
![image](https://github.com/mooncy0809/teamhs_community/assets/84116509/23c08938-4909-45f3-8f4f-a1fff150003c)
<br><br><br><br>


### 문제 삭제
* 문제 작성자인 경우 문제 삭제가 가능합니다.
* 삭제를 클릭하면 확인 메시지창의 띄운 후 삭제됩니다.

![image](https://github.com/mooncy0809/teamhs_community/assets/84116509/71b584ba-154b-40e2-9978-81b9e77c08fc)
<br><br><br><br>


### 답안 작성
* 문제 페이지에서 `문제풀기` 버튼을 클릭하면 답안 작성 페이지로 이동합니다.

![image](https://github.com/mooncy0809/teamhs_community/assets/84116509/627354ab-ceb7-404d-8a07-2ce5a77988af)
<br><br><br><br>

* 답안 작성 페이지로 이동하면 좌측에 문제가 출력되고 우측에 답안 작성 폼이 출력됩니다.
* 객관식의 경우 MenuItem이 출력되고 단답식과 주관식의 경우 입력 폼이 나오게 됩니다.

![image](https://github.com/mooncy0809/teamhs_community/assets/84116509/6d4d8b9e-630e-485b-8ea6-8811abada633)
![image](https://github.com/mooncy0809/teamhs_community/assets/84116509/0c7f89dc-8cf4-43ac-a17e-29024b94576a)
<br><br><br><br>


### 답안 조회
* 문제 페이지에서 답안을 작성한 사람들의 리스트를 확인할 수 있습니다.
* 리스트에서 답변내용은 10자 이내로 출력됩니다.

![image](https://github.com/mooncy0809/teamhs_community/assets/84116509/ecf67a3a-48c8-477c-800c-ad57d4e053f3)
<br><br><br><br>

* 리스트의 답변을 클릭하면 답변 상세페이지로 이동하고 답변 내용을 문제와 함께 확인할 수 있습니다.

![image](https://github.com/mooncy0809/teamhs_community/assets/84116509/8044f55b-ae52-4f18-b39e-1229127363a5)
<br><br><br><br>


### 답안 수정
* 답안 수정은 문제 수정과 동일하게 수행됩니다.



### 답안 삭제
* 답안 삭제는 문제 삭제와 동일하게 수행됩니다.


<br><br><br><br>
### 정답 작성
* 정답 작성은 관리자로 로그인한 경우에만 가능합니다
* 문제 리스트에서 정답 버튼 클릭시 정답 목록 확인과 함께 정답 추가가 가능합니다.

![image](https://github.com/mooncy0809/teamhs_community/assets/84116509/2c6b1766-2a1f-4c10-a5f5-acadf45da29a)
![image](https://github.com/mooncy0809/teamhs_community/assets/84116509/30edbc0d-c5bc-4c5b-bd2f-19bcae07700c)
<br><br><br><br>


### 정답 수정
* 정답 수정은 문제 수정과 동일하게 수행됩니다.



### 정답 삭제
* 정답 삭제는 문제 삭제와 동일하게 수행됩니다.


<br><br><br><br>
## 회원 기능
### 영호가 수정해야 하는 부분

### 회원가입
* 회원가입 시 아이디 중복을 체크합니다.


* 회원가입을 통해 서비스에 사용자 정보를 저장합니다.


### 로그인/로그아웃
* 로그인

  * 로그인을 완료하면 브라우저의 `Local Storage` 에 사용자 `id` 와 `JWT` 토큰 정보를 저장합니다.


* 로그아웃


* 로그아웃을 완료하면 브라우저의 `Local Storage` 의 내용도 삭제합니다.

여기까지

  
# 🤙🏻 API 명세서
HTTP 메서드를 통해 행위를 명시할 수 있도록 RESTful 방식으로 설계했습니다. <br/><br/>
<img width="997" alt="api-definition" src="https://github.com/mooncy0809/teamhs_community/assets/57522230/682655cb-3579-4a81-843c-79094803dbca">

# 🕸 ERD 설계
<img width="997" alt="erd" src="https://github.com/mooncy0809/teamhs_community/assets/57522230/35128a2e-92cf-41e9-8cf3-b63a02680950"/>


# 👾 트러블슈팅
