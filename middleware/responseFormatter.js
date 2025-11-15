// middleware/responseFormatter.js

/**
 * 응답 객체(res)에 통일된 형식의 응답 함수를 추가하는 미들웨어
 */
const responseFormatter = (req, res, next) => {
    
    // 1. 성공(2xx) 응답을 위한 함수
    res.sendSuccess = (data, statusCode = 200) => {
        // 요구사항: 2xx 응답 코드 사용 (200, 201, 204 등)
        res.status(statusCode).json({
            status: "success", // 성공 상태 표시
            data: data
        });
    };

    // 2. 실패(4xx, 5xx) 응답을 위한 함수
    res.sendError = (errorMessage, statusCode) => {
        // 요구사항: 4xx, 5xx 응답 코드 사용 (400, 404, 500 등)
        // 만약 상태 코드가 주어지지 않으면 500 (서버 오류)을 기본값으로 사용
        const finalStatusCode = statusCode || 500; 

        res.status(finalStatusCode).json({
            status: "error", // 에러 상태 표시
            message: errorMessage
        });
    };

    // 다음 미들웨어 또는 라우트 핸들러로 제어를 넘깁니다.
    next();
};

module.exports = responseFormatter;