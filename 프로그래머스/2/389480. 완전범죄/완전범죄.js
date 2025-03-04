// 문제요약: 모든 물건을 훔쳤을 때, A도둑이 남긴 흔적의 누적 개수의 최솟값을 구하는 문제
// 알고리즘 선택: 
//  최솟값을 구해야 됨
//  각 물건에 대해 누가 선택할 지 결정, 그 선택이 서로 독립적
//  B도둑이 n번째에 특정 물건을 선택할 지 말지 결정할 때, 그 상태까지 오는 것에 중복이 발생
//  점화식: 
//      dp[물건][B의 흔적] = A의 흔적
//      두 가지 경우가 존재, 이전물건에서
//          A가 선택하는 경우
//              dp[물건+1][B흔적] = A흔적 + 물건흔적
//          B가 선택하는 경우
//              dp[물건+1][B흔적+물건흔적] = A흔적
//  O(n^2)

function solution(info, n, m) {
    var answer = 0;
    
    const dp = Array.from({length: info.length + 1}, () => 
                         Array.from({length: m}, () => Infinity));
    dp[0][0] = 0;
    
    for (let i = 1; i <= info.length; i++) {
        const [a, b] = info[i - 1];
        for (let j = 0; j < m; j++) {
            dp[i][j] = Math.min(dp[i - 1][j] + a, dp[i][j]);
            
            if (j + b >= m) continue;
            dp[i][j + b] = dp[i - 1][j];
        }
    }
    
    answer = dp[dp.length - 1].reduce((answer, el) => {
        if (el < n) return Math.min(answer, el);
        return answer;
    }, Infinity);
    
    return answer === Infinity ? -1 : answer;
}