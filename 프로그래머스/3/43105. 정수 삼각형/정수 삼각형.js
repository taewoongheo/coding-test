function solution(triangle) {

    const dp = Array.from({length: triangle.length}, () => Array.from({length: triangle.length}, () => 0));
    dp[0][0] = triangle[0][0];
    
    for (let i = 0; i < triangle.length - 1; i++) {
        const next = triangle[i + 1];
        for (let j = 0; j < triangle[i].length; j++) {
            const num = dp[i][j];
            dp[i + 1][j] = Math.max(num + next[j], dp[i + 1][j]);
            dp[i + 1][j + 1] = num + next[j + 1];
        }
    }
    
    
    return Math.max(...dp[triangle.length - 1]);
}