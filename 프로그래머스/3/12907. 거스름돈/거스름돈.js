// 1원만 사용해서 5원을 만드는 경우
// 1,2원을 사용해서 5원을 만드는 경우
//  이때 각 거스름돈은 이전에 만들었던 값을 재사용할 수 있다. 
//  예를 들어 3원을 1,2원을 사용해 만든다고 할 경우, 2원을 빼면 나머지 1원이 남음. 1원으로 1원을 만드는 경우는 이전에 구했으므로 그 값을 사용할 수 있다.

function solution(n, money) {
    var answer = 0;
    
    const dp = Array.from({length: n + 1}, () => 0);
    dp[0] = 1;
    
    for (const m of money) {
        for (let i = m; i <= n; i++) {
            dp[i] += dp[i - m];
        }
    }
    
    console.log(dp);
    
    return dp[n];
}