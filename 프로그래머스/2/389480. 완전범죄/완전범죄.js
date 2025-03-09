// 문제요약: A,B 도둑이 모든 물건을 훔칠 때, A도둑의 흔적이 최솟값 구하기
// 알고리즘 선택: 
//  일단 모든 물건을 훔치려면 B가 모든 물건을 갖고 있는 상태에서 A,B 조건이 만족하도록 A의 개수를 조정하면 됨
//  B가 모든 물건을 훔친 상태에서 A의 조합을 구해 그 수만큼 빼고 값을 갱신하는 방법
//      하나의 물건을 A가 선택하거나, 선택하지 않을 수 있으므로 O(40!)의 시간복잡도를 가짐
//      이때 i 번째 물건을 고를지 말지 선택할 때, 이전에 고른 물건의 상태가 중복됨
//  i번째 물건을 선택할 지 말지 고르는 것은 결정문제임
//  또한 i번째 물건을 선택할 때 이전까지의 물건의 선택이 중복됨
//  물건을 선택하는 각 상태가 부분문제의 최적해가 될 수 있음(A의 최솟값이 최적해)
//  점화식 세우기
//      상태: 현재 고를 물건, A의 흔적, B의 흔적
//      구해야 하는 최솟값은 A의 흔적, A의 작을 수록 최적해
//      dp[현재고를물건][B의흔적]=A의흔적
//      두 가지 선택이 가능
//          현재 물건을 A가 선택
//              dp[i][b흔적]=min(dp[i-1][b흔적]+a흔적, )
//          현재 물건을 B가 선택
//              dp[i][b흔적+현재물건의 b흔적]=dp[i-1][b흔적]
//                  방향자체가 왼쪽에서 오른쪽으로 정해져있기 때문에 최솟값 갱신 필요없이 바로 값으로 넣으면 됨
// 부분문제 분해: 
//  dp[물건개수+1][m]
//  dp[0][0]=0 물건을 가지지 않은 상태로 초기화
//  for 1~i in i:
//      a, b = info[i - 1]
//      for 0~m in j:
//          dp값 갱신

function solution(info, n, m) {
    var answer = 0;
    
    const dp = Array.from({length: info.length + 1}, () => 
                         Array.from({length: m}, () => Infinity));
    dp[0][0] = 0;
    
    for (let i = 1; i <= info.length; i++) {
        const [a, b] = info[i - 1];
        for (let j = 0; j < m ; j++) {
            dp[i][j] = Math.min(dp[i - 1][j] + a, dp[i][j]);
            
            if (j + b >= m) continue;
            dp[i][j + b] = dp[i - 1][j];
        }
    }
    
    answer = dp[dp.length - 1].reduce((answer, cur) => {
        if (cur < n) return Math.min(answer, cur);
        return answer;
    }, Infinity);
    
    return answer === Infinity ? -1 : answer;
}