// dp[p][b] = B의 흔적이 b개일 때, 물품p까지 고려했을 때 A의 흔적
// A를 선택하는 경우
//  dp[p][b] = Math.min(dp[p][b], dp[p - 1][b] + a);
// B를 선택하는 경우
//  dp[p][b + b흔적] = Math.min(dp[p][b+b흔적], dp[p-1][b] + b흔적)

function solution(info, n, m) {
    var answer = Infinity;
    
    const dp = Array.from({length: info.length + 1}, () => 
                         Array.from({length: m}, () => Infinity));
    dp[0][0] = 0;
    
    for (let p = 1; p <= info.length; p++) {
        const [a, b] = info[p - 1];
        for (let c = 0; c < m; c++) {
            // A를 선택
            dp[p][c] = Math.min(dp[p - 1][c] + a, dp[p][c]);
            
            // B를 선택
            if (c + b >= m) continue;
            dp[p][c + b] = Math.min(dp[p - 1][c], dp[p][c + b]);
        }
    }
    
    answer = dp[info.length].reduce((acc, el) => {
        return el < n ? Math.min(acc, el) : acc;
    }, Infinity);
    
    return answer === Infinity ? -1 : answer;
}