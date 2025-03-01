// dp[i][j] = i부터 j번째 행렬을 곱했을 때 최소 곱셈의 수
// 행렬의 크기를 기준
// ABCD
// dp[A][B] + dp[B][D], dp[A][C] + dp[C][D] 이런식으로 행렬의 크기마다 최적값이 정해져있음
// dp[A][D] = dp[A][B] + dp[B][D] = mat[A][0] * mat[B][1] * mat[D][1] + dp[B][D] + dp[A]

function solution(matrix_sizes) {
    var answer = 0;
    
    const n = matrix_sizes.length;
    const dp = Array.from({length: n}, () => 
                         Array.from({length: n}, () => Infinity));
    
    for (let i = 0; i < n; i++) {
        dp[i][i] = 0;
    }
    
    for (let size = 1; size < n; size++) {
        for (let start = 0; start < n; start++) {
            const end = start + size;
            if (end >= n) break;
            
            for (let fixed = start; fixed < end; fixed++) {
                dp[start][end] = Math.min(
                    matrix_sizes[start][0] * matrix_sizes[fixed][1] * matrix_sizes[end][1] + dp[start][fixed] + dp[fixed + 1][end], dp[start][end]
                );
            }
        }
    }
    
    return dp[0][n - 1];
}