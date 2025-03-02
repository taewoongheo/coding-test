// 문제요약: A도둑이 남긴 흔적의 누적값이 최소가 되는 값을 구하기
// 알고리즘 선택: 
//  모든 물품을 B가 갖고 있다고 했을 때, 그 중 A가 물품을 골라 최솟값을 구하는 방식
//      dfs-물건의 개수는 40개이므로 O(2^40) 시간초과
//  물품들은 어쨌든 모두 골라야 한다. 즉, A B 중 누군가는 골라야 한다
//  우리가 구하고자 하는 값은 A 흔적의 최솟값이다. 그리고 물품을 고르던지 말던지 결정해야 함
//  물품선택 시 각 시행이 독립적
//  따라서 dp로 풀 수 있다
//      dp[고려한 물품][B의 흔적개수] = A흔적개수
//          A가 선택할 경우
//              dp[물품][B 흔적개수] = Math.min(dp[물품 - 1][B흔적개수] + 물품[0])
//          B가 선택할 경우
//              dp[물품][B 흔적개수 + 물품[1]] = Math.min(dp[물품 - 1][B 흔적개수 + 물품[1]])

function solution(info, n, m) {
    var answer = Infinity;
    
    const dp = Array.from({length: info.length + 1}, () => 
                         Array.from({length: m}, () => Infinity));
    dp[0][0] = 0;
    
    for (let i = 1; i <= info.length; i++) {
        const [a, b] = info[i - 1];
        for (let j = 0; j < m; j++) {
            // A가 선택
            dp[i][j] = Math.min(dp[i - 1][j] + a, dp[i][j]);
            
            // B가 선택
            if (j + b >= m) continue;
            dp[i][j + b] = Math.min(dp[i - 1][j], dp[i][j + b]);
        }
    }
    
    answer = dp[info.length].reduce((answer, cur) => {
        if (cur < n) return Math.min(answer, cur);
        return answer;
    }, answer);
    
    return answer === Infinity ? -1 : answer;
}