// 문제요약: 모든 행렬들의 최소 곱셈 연산의 수를 구하기
// 입력: 
//  matrix_sizes: 행렬정보, 3<=matrix_sizes<=200
// 알고리즘 선택: 
//  행렬은 서로 인접한 행렬끼리만 곱할 수 있음
//  행렬 곱을 할 때 서로 같은 길이를 가진 열(=행)이 필요하기 때문
//  행렬 A,B,C,D가 있을 때, 우리가 문제에서 구하고자 하는 것은 결국 A~D까지의 최소 곱셈 연산 수임
//  A와D사이에는 여러 개의 행렬이 존재할 수 있다
//      A(BCD), (AB)(CD), (ABC)D, ...
//  이때 중복 연산이 발생하는 것을 볼 수 있다. 예를 들어 A~D의 행렬 중, 최소가 되기 위해선 BC를 우선적으로 곱해야 최적 값이 나올 수 있다
//  따라서 이 값들을 재사용할 수 있고, 이러한 재사용 가능한 값들은 부분문제의 최적해이기 때문에 이 문제는 DP로 풀 수 있다. 
//  점화식구하기: 
//      dp[A][D]가 A에서 D까지의 최소 곱셈 행렬 수 라고 하자
//      이 안에는 여러 개의 행렬이 곱해지는 경우의 수가 존재
//      가장 작은 단위는 dp[A][B], dp[B][C], dp[C][D] 일 것이다. 
//      그리고 다음은 dp[A][C], dp[B][D],
//      마지막은 dp[A][D] 이런 식으로 구해야 한다
//      따라서 dp를 진행하면서, 행렬의 크기는 고정시키되, 그 안에서 어떤 행렬을 기준으로 곱할 지 결정해야 된다
//      예를 들어 dp[A][D]에서 B를 기준으로 한다면, dp[A][B] + dp[B][D]
//          dp[A][D]에서 C를 기준으로 한다면, dp[A][C] + dp[C][D]
//              이때 여기서 사용되는 dp[A][C], dp[C][D]는 모두 이전에 계산된 값들이다
//      dp[A][D](B기준) = min(dp[A][D], dp[A][B] + dp[B][D] + (matrix a row * matrix a col * matrix d col))
//      따라서 점화식은 dp[i][j] = min(dp[i][j], dp[i][k] + dp[k + 1][j] + (m[i][0] * m[i][1] * m[j][1]))

function solution(matrix_sizes) {
    
    const n = matrix_sizes.length;
    const dp = Array.from({length: n}, () => Array.from({length: n}, () => Infinity));
    for (let i = 0; i < n; i++) {
        dp[i][i] = 0;
    }
    
    for (let size = 1; size < n; size++) {

        for (let start = 0; start < n; start++) {
            const end = start + size;
            if (end >= n) break;
            
            for (let fixed = start; fixed < end; fixed++) {
                dp[start][end] = Math.min(
                    dp[start][end],
                    dp[start][fixed] + dp[fixed + 1][end] + 
                        (matrix_sizes[start][0] * matrix_sizes[fixed][1] * matrix_sizes[end][1])
                )
            }
        }
    }
    
    return dp[0][n - 1];
}
