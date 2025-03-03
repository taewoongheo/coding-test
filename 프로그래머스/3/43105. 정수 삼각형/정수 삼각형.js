// 최댓값 구하기
// 특정 상태가 되기까지 중복이 발생
// 부분문제의 최적해 존재
// 결정문제(이 숫자를 선택?)
// 각 문제들이 서로 독립적
// dp[i + 1] = Math.max(dp[i] + triangle[i + 1][j + 1], dp[i + 1]);
// dp[i] += triangle[i][j + 1]

function solution(triangle) {
    var answer = 0;
    
    const dp = Array.from({length: triangle.length}, () => 0);
    dp[0] = triangle[0][0];
    
    for (let i = 0; i < triangle.length - 1; i++) {
        for (let j = triangle[i].length - 1; j >= 0; j--) {
            dp[j + 1] = Math.max(dp[j] + triangle[i + 1][j + 1], dp[j + 1]);
            dp[j] += triangle[i + 1][j];
        }
    }
    
    return Math.max(...dp);
}