// middleware/requestLogger.js

/**
 * 모든 API 요청의 시간, HTTP 메서드, URL을 기록하는 미들웨어
 */
const requestLogger = (req, res, next) => {
    // 현재 시간을 'HH:MM:SS' 형태로 추출
    const time = new Date().toLocaleTimeString('ko-KR', { hour12: false });
    
    // 콘솔에 로그 출력
    console.log(`[${time}] ${req.method} ${req.originalUrl}`);
    
    // 다음 미들웨어 또는 라우트 핸들러로 제어를 넘깁니다.
    next();
};

module.exports = requestLogger;