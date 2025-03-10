// 문제요약: 꼭대기에서 바닥까지 이어질 때, 거쳐간 숫자의 최댓값
// 알고리즘 선택: 
//  만약 3번째 줄의 8에서 2를 더할 지 7을 더할 지 결정하는 부분은 각각 다른 상태이지만,
//      이 경로까지 수의 합이 중복된다.
//  또한 2, 7을 각각 더할지 여부를 결정하는 것은 독립적인 문제다.
//  이때 더 큰 값을 선택한다면 그 값은 해당 부분문제의 최적해가 될 것이다
//  => dp
//  점화식 구하기
//      상태: 현재까지의 합, 라인, 현재 수
//      dp[라인][현재 수]=지금까지 합, i번째 라인에서 j수까지 도달했을 때 최대 값
//      dp[i][j] 일 때 두 가지 선택이 가능
//          오른쪽 수를 더함
//              dp[i + 1][j + 1] = min(dp[i + 1][j + 1] + triangle[i + 1][j + 1])
//              dp[i + 1][j] = min(dp[i + 1][j] + triangle[i + 1][j], )

function solution(triangle) {
    var answer = 0;
    
    const n = triangle.length;
    const dp = Array.from({length: n}, () => 
                         Array.from({length: n}, () => 0));
    dp[0][0] = triangle[0][0];
    
    for (let i = 0; i < n - 1; i++) {
        for (let j = i; j >= 0; j--) {
            dp[i + 1][j + 1] = Math.max(dp[i][j] + triangle[i + 1][j + 1], dp[i + 1][j + 1]);
            dp[i + 1][j] = dp[i][j] + triangle[i + 1][j];
        }
    }
    
    return Math.max(...dp[dp.length - 1]);
}