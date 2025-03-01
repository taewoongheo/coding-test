// dp[i + 1][j] = Math.max(dp[i][j] + triangle[i + 1][j], dp[i][j]);
// dp[i + 1][j + 1] = Math.max(dp[i][j] + triangle[i + 1][j + 1], dp[i][j + 1]);

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