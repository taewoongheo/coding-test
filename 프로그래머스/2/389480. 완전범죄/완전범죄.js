// 문제요약: A,B도둑이 모든 물건을 훔쳤을 때, A도둑의 흔적 최솟값 구하기
// 알고리즘 선택: 
//  모든 물건을 훔치려면 첫번째 물건부터 마지막 물건까지 A,B 둘 중 누군가는 반드시 선택해야 한다
//  만약 첫번째 물건을 A가 훔치면, B의 흔적은 증가하지 않는다
//  반면 B가 훔치면 A의 흔적이 증가하지 않는다
//  문제에서 A도둑의 흔적이 최소가 되도록 해야하므로, A와 B 둘 중 누가 물건을 훔쳤는지 경우를 따져가며 체크한 후,
//      그 중 B < m && A 최소인 값을 골라야 한다
//  이때 특정 상태에 도달하기까지 중복이 발생
//  물건을 선택하는 각 동작은 모두 독립적이며 부분문제의 최적해
//  => DP
//  점화식 세우기
//      고려해야 하는 상태: 현재 물건, A의 흔적, B의 흔적
//      dp[물건][B흔적]=A흔적 => i번째 물건에서 B의 흔적이 얼마일 때 A의 흔적의 값
//      B의 흔적은 0~m(중간에 넘치면 끝나기 때문)
//      두 가지 선택지가 있음
//          A가 선택
//              dp[i + 1][b] = Math.min(dp[i][b] + info[i + 1][0], dp[i + 1][b])
//          B가 선택
//              dp[i + 1][b + info[i][1]] = dp[i + 1][b]
// 부분문제분해:
//  dp=[Infinity][Infinity]
//  dp[0][0] = 0
//  for i in dp - 1:
//      for j in dp[i]:
//          if dp[i][j] === Infinity: continue
//          const [a, b] = dp[i][j]
//          dp[i + 1][j] = min(a + info[i + 1][0], dp[i + 1][b])
//          dp[i + 1][j + b] = a

function solution(info, n, m) {
    var answer = Infinity;
    
    const dp = Array.from({length: info.length + 1}, () => 
                         Array.from({length: m}, () => Infinity));
    dp[0][0] = 0;
    
    for (let i = 0; i < dp.length - 1; i++) {
        for (let j = 0; j < dp[i].length; j++) {
            if (dp[i][j] === Infinity) continue;
            const [a, b] = info[i];
            dp[i + 1][j] = Math.min(dp[i][j] + a, dp[i + 1][j]);
            
            if (j + b >= m) continue;
            dp[i + 1][j + b] = dp[i][j];
        }
    }
    
    answer = dp[dp.length - 1].reduce((answer, el) => {
        if (el < n) return Math.min(answer, el);
        return answer;
    }, answer);
    
    return answer === Infinity ? -1 : answer;
}