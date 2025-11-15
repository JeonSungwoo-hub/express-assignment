# Express Assignment: REST API 구현 과제

## 1. 프로젝트 개요 및 목표

본 프로젝트는 Node.js와 Express 프레임워크를 사용하여 기본적인 RESTful API 서버를 구현하고, 다음의 핵심 요구사항들을 충족하는 것을 목표로 합니다.

- 사용자 정의 미들웨어를 통한 서버 로직 구현
- 8가지 HTTP 메서드 기반의 API 구현
- 2xx, 4xx, 5xx 계열의 다양한 HTTP 응답 코드 사용
- 모든 응답에 표준화된 JSON 포맷 적용

---

## 2. API 상세 구현 목록 (총 8개)

User와 Post 두 가지 가상 리소스를 사용하여 CRUD 연산을 구현했으며, 모든 API는 `/api` 엔드포인트 아래에서 작동합니다.

| 번호 | HTTP 메서드 | 엔드포인트 | 목적 | 응답 코드 (성공/실패) |
| :---: | :--- | :--- | :--- | :--- |
| **1** | `GET` | `/api/users` | 모든 사용자 목록 조회 | **200 OK** |
| **2** | `GET` | `/api/posts/:id` | 특정 게시글 상세 조회 | **200 OK** / **404 Not Found** |
| **3** | `POST` | `/api/users` | 새 사용자 생성 | **201 Created** / **400 Bad Request** |
| **4** | `POST` | `/api/posts` | 새 게시글 생성 | **201 Created** / **400 Bad Request** |
| **5** | `PUT` | `/api/users/:id` | 특정 사용자 이름 수정 | **200 OK** / **404 Not Found** |
| **6** | `PUT** | `/api/posts/:id` | 게시글 수정 | **200 OK** / **500 Internal Server Error (특정 ID 시)** |
| **7** | `DELETE` | `/api/users/:id` | 사용자 삭제 | **204 No Content** / **404 Not Found** |
| **8** | `DELETE` | `/api/posts/:id` | 게시글 삭제 | **204 No Content** / **403 Forbidden (권한 없음 가정)** |

---

## 3. 미들웨어 구현 및 표준 응답 포맷

### A. 요청 로그 미들웨어 (`requestLogger.js`)

모든 클라이언트 요청에 대해 `server.js`의 터미널에 **요청 시간, HTTP 메서드, 요청 경로**를 기록합니다.
