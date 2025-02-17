// 문제요약: 삼각형의 꼭대기에서 대각선 방향으로 내려오는 경우 중 그 합이 가장 큰 경우
// 알고리즘 선택: dp
//  이전에 계산된 값을 다음 값이 가져와서 사용할 수 있다.
//  2번째 줄에서 8을 선택할 경우, 세번째 줄의 8을 선택할 수 없다.
//      만약 이때 세번째 줄의 숫자가 9999라면 답이 달라질 수 있다. 
//          즉, 한 줄에서 나오는 최댓값 하나로만 판단하면 안됨.
//  한 칸에는 두 개의 숫자가 영향을 미친다. 자신의 왼쪽, 오른쪽 위
//  이 두 숫자 중 더 큰 값을 선택하면 된다. 
//  이렇게 내려온 마지막 줄에서 가장 큰 값을 선택하면 된다.

function solution(triangle) {
    var answer = 0;
    console.log(triangle);
    
    const dp = Array.from({length: triangle.length}, () => 0);
    dp[0] = triangle[0][0];

    for (let i = 0; i < triangle.length - 1; i++) {
        for (let j = i; j >= 0; j--) {
            dp[j + 1] = Math.max(dp[j + 1], dp[j] + triangle[i + 1][j + 1]);
            dp[j] += triangle[i + 1][j];
            
            answer = Math.max(answer, dp[j]);
            answer = Math.max(answer, dp[j + 1]);
        }
    }
    
    console.log(dp);
    
    return answer;
}