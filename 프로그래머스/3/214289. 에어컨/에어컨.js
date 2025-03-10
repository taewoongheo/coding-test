// 문제요약: 에어컨의 최소 소비 전력 구하기
// 알고리즘 선택: 
//  에어컨을 올리거나 내리거나 유지하거나 끌 수 있음
//  이때 에어컨을 올리는 경우를 생각해보면, 
//      현재온도가 22도일 때 희망온도가 24,25,26이라면 모두 동작은 같다(+1)
//      따라서 희망온도는 고려하지 않아도 된다
//  특정 시간대에서 다음 온도를 조절할 수 있음. 이때 4개의 분기가 생기는데, 이전까지의 상태는 계속 동일함
//  즉, 중복이 발생
//  또한 각 상태의 값을 소비전력으로 두고 최소값만 뽑는다면, 그 값은 해당 부분문제까지의 최적해가 됨
//  => dp
//      고려해야할 상태: 특정 시간대(탑승여부), 소비전력, 현재 온도
//          네 가지 동작이 가능
//          1. 다음 온도를 올리는 경우
//              dp[i][j] = min(dp[i + 1][j + 1] + a, )
//          2. 다음 온도를 내리는 경우
//              dp[i][j] = min(dp[i + 1][j - 1] + a, )
//          3. 다음 온도를 유지하는 경우
//              dp[i][j] = min(dp[i + 1][j] + b, )
//          4. 에어컨을 끄는 경우
//              dp[i][j] = min(dp[i + 1][j + 외부온도 방향으로 += 1])
// 부분문제 분해: 
//  dp[onboard][51]
//  for isInPerson in onboard:
//      for 0~51 in temp:
//          dp 네 가지 동작
//  마지막 dp 배열에서 최소 소비 전력 구하기(탑승 여부까지 고려해야 됨)

function solution(temperature, t1, t2, a, b, onboard) {
    temperature += 10;
    t1 += 10;
    t2 += 10;
    
    const dp = Array.from({length: onboard.length}, () => 
                         Array.from({length: 51}, () => Infinity));
    dp[0][temperature] = 0;
    
    for (let i = 0; i < onboard.length - 1; i++) {
        const isInPerson = onboard[i];
        for (let j = 0; j <= 50; j++) {
            if (dp[i][j] === Infinity) continue;
            if (isInPerson === 1 && (j > t2 || j < t1)) continue;

            // 온도 올리기
            if (j < 50) dp[i + 1][j + 1] = Math.min(dp[i][j] + a, dp[i + 1][j + 1]);
            
            // 온도 내리기
            if (j > 0) dp[i + 1][j - 1] = Math.min(dp[i][j] + a, dp[i + 1][j - 1]);
            
            // 온도 유지하기
            dp[i + 1][j] = Math.min(dp[i][j] + b, dp[i + 1][j]);
            
            // 에어컨 끄기
            const dir = temperature > j ? 1 : temperature === j ? 0 : -1;
            dp[i + 1][j + dir] = Math.min(dp[i][j], dp[i + 1][j + dir]);
        }
    }
    
    
    let ans = Infinity;
    const status = onboard.at(-1);
    for (let temp = 0; temp < dp.at(-1).length; temp++) {
        if (temp === Infinity) continue;
        
        if (status === 1 && (temp < t1 || temp > t2)) continue;
        
        ans = Math.min(ans, dp.at(-1)[temp]);
    }
    
    return ans;
}