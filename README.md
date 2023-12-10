# Outsourcing Project

## Team. 미래조
#### [미래조 GitHub](https://github.com/mirae-Jo/Outsourcing.git)

### 팀원소개
- [조미래](https://github.com/mirae-Jo)
  - 지도 API
  - 검색 기능 구현
  - 추천 산 랜덤 List 기능 구현
  - 배포
- [권보라](https://github.com/surely07)
  - Header, Footer UI
  - Home, Detail Page UI
  - 로그인 회원 맞춤 List 구현
  - 카테고리별 다중 필터 List 구현
- [권영준](https://github.com/joonyg)
  - 회원가입, 로그인, 로그아웃 기능 구현
  - 로그인, 회원가입 모달 UI
  - 프로필 수정 기능 구현
  - Nevigation Bar UI
  - FireStore 셋팅
- [정유진](https://github.com/Yujin-Jeong-dev)
  - Detail Page UI
  - 댓글 작성, 수정, 삭제 기능 구현
  - DB 및 API 불러오기
  - 프로필 수정 기능 구현
  - 발표 및 시연 영상 대본 작성
<br>

## 프로젝트 소개

### 프로젝트 명 : 한사랑 산악회
등산은 하고싶지만, 어떤 산을 가야할 지 잘 모르는 초보 등산러들을 위해 등산 스팟을 추천하고
지역/난이도/소요시간별 산을 필터링하여 자신이 원하는 지역, 난이도, 소요시간에 맞는 산을 선정하는데 도움을 주는 웹사이트입니다.
회원가입 시 자신의 지역과 난이도를 설정하여, 유저 맞춤 산 List를 추천합니다.

<br>

### 사이트
[프로젝트로 이동하기](https://hansarang.vercel.app/)

![image](https://github.com/mirae-Jo/Outsourcing/assets/147504785/d7d93f5f-ad0f-46d2-bd74-e5f3000439bf)

<br>

## 기술 스택 및 사용 라이브러리
- react
- redux
- @tanstack/react-query
- react-router-dom
- json-server
- react-kakao-maps-sdk
- react-icons
- styled-components
- styled-reset
- uuid
- axios

- Firebase
- Firebase - Authentication
- Firebase - Storage

<br>

## 프로젝트 구조
```
📦 src
 ┣ 📂 assets
 ┣ 📂 common
 ┃ ┗ 📂 api
 ┣ 📂 components
 ┃ ┣ 📂 Detail
 ┃ ┣ 📂 Home
 ┃ ┣ 📂 Layout
 ┃ ┗ 📂 Login
 ┣ 📂 pages
 ┃ ┗ 📂 sidebar
 ┣ 📂 pages
 ┣ 📂 shared
 ┃ ┗ 📂 redux
 ┣ 📂 styles
 ┣ 📂 utils
 ┣ 📜 App.jsx
 ┗ 📜 index.js
```
<br>

## 기능 구현 리스트

### 📌 구현 사항

#### 지도 API
- ✔️ 지도상에 Marker 표시
- ✔️ 카카오 지도 API 활용

#### 상태관리 라이브러리 및 데이터관리
- ✔️ RTK 및 React-query 사용
- ✔️ fierbase 및 구글시트를 활용한 REST API 사용

#### 다중 필터 구현
- ✔️ 지역별, 난이도별, 소요시간별 다중 필터 구현
- ✔️ User 맞춤 필터 구현

#### 로그인, 회원 가입
- ✔️ firebase Auth를 사용하여 로그인, 회원가입 기능 구현
- ✔️ 아이디(이메일), 패스워드
- ✔️ 소셜 로그인 (구글)

#### CRUD
- ✔️ Firebase에서 제공하는 Auth, FireStore 활용하여 데이터베이스 핸들링
- ✔️ 댓글 기능을 통해 CUD(등록, 수정, 삭제) 구현 및 R(조회)하여 화면 변경

#### 내 프로필
- ✔️ FireStore에 User 정보를 저장하여 User 닉네임, 프로필 이미지 수정

#### 배포
- ✔️ Vercel 호스팅플랫폼을 이용해 배포

