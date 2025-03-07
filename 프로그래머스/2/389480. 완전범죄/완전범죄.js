// 문제요약: 모든 물건을 훔쳤을 때, A 흔적의 최솟값
// 알고리즘 선택: 
//  모든 물건을 훔치려면 일단 B가 모두 훔친 상태에서 A에게 하나씩 주는 방식?
//  이 경우 1번물건부터 40번물건까지 하나씩 줘야 함
//  이때 중복이 발생. 예를 들어 1, 2, 3, 7, 14 번 물건을 줬다고 해보자.
//      그럼 조합으로 구한다고 해도, 2,3,7,14 번 물건의 값을 중복해서 구해야 함
//  어쨌든 모든 물건을 훔쳐야 함. i번째 물건을 누가 훔칠 지 결정하면 됨
//  또한 각 선택이 독립적임
//  =>dp
//  점화식 구하기
//      현재 상태: 현재물건,b의 흔적, a의 흔적
//      구해야 하는 최솟값은 a의 흔적이므로, 이걸 값으로 둠
//      dp[현재 상태][b의 흔적] = a의 흔적
//          두 가지 경우가 존재, 현재 i번째 물건이라고 했을 때
//              a가 선택하는 경우
//                  dp[i + 1][b] = min(dp[i + 1][b] + info[i + 1][a], )
//              b가 선택하는 경우
//                  dp[i + 1][b + b흔적] = dp[i][b] => 갱신하는 순서가 왼쪽부터 이므로 이 값은 비교할 필요 없이 바로 채워 넣으면 됨
// 부분문제 분해: 
//  dp[info.length][m]
//  for i in info.length - 1:
//      dp~

function solution(info, n, m) {
    var answer = Infinity;
    
    const dp = Array.from({length: info.length + 1}, () => 
                         Array.from({length: m}, () => Infinity));
    dp[0][0] = 0;
    
    for (let i = 0; i < info.length; i++) {
        const [a, b] = info[i];
        for (let j = 0; j < m; j++) {
            if (dp[i][j] === Infinity) continue;
            
            dp[i + 1][j] = Math.min(dp[i][j] + a, dp[i + 1][j]);
            
            if (j + b >= m) continue;
            dp[i + 1][j + b] = dp[i][j];
        }
    }
    
    for (let i = 0; i < dp[info.length].length; i++) {
        if (dp[info.length][i] < n) answer = Math.min(dp[info.length][i], answer);
    }
    
    return answer === Infinity ? -1 : answer;
}
