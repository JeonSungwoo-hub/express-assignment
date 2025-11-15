// routes/api.js

const express = require('express');
const router = express.Router();

// 💡 가상의 데이터베이스 (In-memory storage)
let users = [{ id: 1, name: 'Alice', role: 'admin' }];
let posts = [{ id: 101, title: 'Express 시작하기', authorId: 1 }];
let nextUserId = 2;
let nextPostId = 102;


// ==================================================================
// GET API (2개) - 조회
// ==================================================================

// 1. GET /api/users: 모든 사용자 목록 조회 (2xx: 200 OK)
router.get('/users', (req, res) => {
    res.sendSuccess(users, 200); 
});

// 2. GET /api/posts/:id: 특정 게시글 상세 조회 (200 또는 404)
router.get('/posts/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const post = posts.find(p => p.id === id);

    if (post) {
        res.sendSuccess(post, 200);
    } else {
        // 4xx 사용: 404 Not Found
        res.sendError(`Post ID ${id}를 찾을 수 없습니다.`, 404);
    }
});


// ==================================================================
// POST API (2개) - 생성
// ==================================================================

// 3. POST /api/users: 새 사용자 생성 (2xx: 201 Created)
router.post('/users', (req, res) => {
    if (!req.body.name || typeof req.body.name !== 'string') {
        // 4xx 사용: 400 Bad Request
        return res.sendError("이름(name)은 필수 문자열 필드입니다.", 400); 
    }
    
    const newUser = { id: nextUserId++, name: req.body.name, role: 'user' };
    users.push(newUser);
    
    // 2xx 사용: 201 Created
    res.sendSuccess(newUser, 201); 
});

// 4. POST /api/posts: 새 게시글 생성 (데이터 유효성 검사 실패 예시 포함)
router.post('/posts', (req, res) => {
    const { title, content } = req.body;
    
    if (!title || title.length < 5) {
        // 4xx 사용: 400 Bad Request
        return res.sendError("제목은 5자 이상이어야 합니다.", 400);
    }

    const newPost = { id: nextPostId++, title, content, authorId: 1 };
    posts.push(newPost);
    
    // 2xx 사용: 201 Created
    res.sendSuccess(newPost, 201);
});


// ==================================================================
// PUT API (2개) - 수정
// ==================================================================

// 5. PUT /api/users/:id: 특정 사용자 이름 수정 (200 또는 404)
router.put('/users/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const userIndex = users.findIndex(u => u.id === id);

    if (userIndex === -1) {
        // 4xx 사용: 404 Not Found
        return res.sendError(`User ID ${id}를 찾을 수 없습니다.`, 404);
    }
    
    users[userIndex].name = req.body.name || users[userIndex].name;
    
    // 2xx 사용: 200 OK
    res.sendSuccess(users[userIndex], 200);
});

// 6. PUT /api/posts/:id: 게시글 수정 (5xx 예시)
router.put('/posts/:id', (req, res) => {
    const id = parseInt(req.params.id);
    
    // ⚠️ ID가 999일 때, 서버 내부 오류가 발생했다고 가정
    if (id === 999) {
        // 5xx 사용: 500 Internal Server Error
        return res.sendError("게시글 수정 중 서버 내부 오류가 발생했습니다.", 500); 
    }
    
    const postIndex = posts.findIndex(p => p.id === id);
    if (postIndex === -1) {
        return res.sendError(`Post ID ${id}를 찾을 수 없습니다.`, 404);
    }
    posts[postIndex].title = req.body.title || posts[postIndex].title;
    
    // 2xx 사용: 200 OK
    res.sendSuccess(posts[postIndex], 200);
});


// ==================================================================
// DELETE API (2개) - 삭제
// ==================================================================

// 7. DELETE /api/users/:id: 사용자 삭제 (204 또는 404)
router.delete('/users/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const initialLength = users.length;
    
    users = users.filter(u => u.id !== id);

    if (users.length < initialLength) {
        // 2xx 사용: 204 No Content
        res.sendSuccess(null, 204); 
    } else {
        // 4xx 사용: 404 Not Found
        res.sendError(`User ID ${id}를 찾을 수 없어 삭제할 수 없습니다.`, 404);
    }
});

// 8. DELETE /api/posts/:id: 게시글 삭제 (4xx 권한 오류 예시)
router.delete('/posts/:id', (req, res) => {
    // ⚠️ 권한이 없다고 가정
    const hasPermission = false; 

    if (!hasPermission) {
        // 4xx 사용: 403 Forbidden
        return res.sendError("권한 오류: 게시글을 삭제할 권한이 없습니다.", 403); 
    }
    
    // 성공 시: 204 No Content
    res.sendSuccess(null, 204);
});


module.exports = router;