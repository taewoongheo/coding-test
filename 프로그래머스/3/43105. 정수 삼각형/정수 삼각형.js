function solution(triangle) {
    
    const n = triangle.length;
    const dp = Array.from({length: n}, () => 0);
    dp[0] = triangle[0][0];
    
    for (let i = 0; i < n - 1; i++) {
        for (let j = i; j >= 0; j--) {
            dp[j + 1] = Math.max(dp[j] + triangle[i + 1][j + 1], dp[j + 1]);
            dp[j] += triangle[i + 1][j];
        }

    }
    
    return Math.max(...dp);
}
