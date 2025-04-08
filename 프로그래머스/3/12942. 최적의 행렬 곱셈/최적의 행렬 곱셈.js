// 문제: 행렬의 최소 곱셈 연산 수를 구하기
// ABCD 행렬이 있다고 했을 때, 가장 먼저 할 수 있는 건 AB, BC, CD 개 중에서 고르기
// 만약 AB를 선택했다면 (AB)C 또는 (AB)CD
// 최소곱을 구해야하므로 dp 고려
//  상태: 두 행렬 i, j, 곱셈 수
//  dp[i][j]=곱셈 수 => 행렬 i, j 를 곱했을 때 최소 곱셈 수 
//      12 23 34, 13 24, 14
//      크기를 하나씩 늘려가면서 최적의 곱 개수를 구하는 방식
//      만약 dp[1][4] 이라고 하면 dp[1][3] + dp[3][4] 일 수도 있고, dp[1][2] + dp[2][4] 도 가능
//      부분문제의 독립성 만족, 가장 적은 최소 곱셈 횟수만 구하면 되므로 부분문제의 최적해 만족

function solution(matrix_sizes) {
    
    const n = matrix_sizes.length;
    const dp = Array.from({length: n}, 
                         () => Array.from({length: n}, () => Infinity));
    for (let i = 0; i < n; i++) {
        dp[i][i] = 0;
    }
    
    for (let size = 1; size < n; size++) {
        for (let s = 0; s < n - 1; s++) {
            let e = s + size;
            
            if (e >= n) continue;
            
            for (let t = s; t < e; t++) {
                dp[s][e] = Math.min(
                    dp[s][t] + dp[t + 1][e] + (matrix_sizes[s][0] * matrix_sizes[t][1] * matrix_sizes[e][1]),
                    dp[s][e]
                );
            }
        }
    }
    
    return dp[0][n - 1];
}
  