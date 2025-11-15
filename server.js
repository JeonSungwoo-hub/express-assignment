// server.js (수정된 미들웨어 순서)

const express = require('express');
const app = express();
const PORT = 3000;

const requestLogger = require('./middleware/requestLogger');
const responseFormatter = require('./middleware/responseFormatter');
const apiRouter = require('./routes/api'); 

// 1. 🚨🚨🚨 JSON 파싱 미들웨어는 반드시 가장 먼저 적용되어야 합니다! 🚨🚨🚨
app.use(express.json()); // <--- 이 부분이 최상단에 있어야 합니다.

// 2. 다른 미들웨어 적용
app.use(requestLogger);
app.use(responseFormatter);

// 3. 라우터 연결
app.use('/api', apiRouter); 

app.listen(PORT, () => {
    console.log(`✅ Server is running on http://localhost:${PORT}`);
});