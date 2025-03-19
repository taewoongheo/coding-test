// 동작
//  에어컨 희망온도 설정하면 실내온도가 희망온도로 1도씩 변함, 같으면 유지
//  끄면 실내온도가 외부온도로 1도씩 변함
// 알고리즘 선택:
//  실내온도가 20도일 때, 희망온도를 22, 23, 24..로 바꾸면 1도 증가하는 동작이 모두 동일함
//  즉, 희망온도는 신경쓸 필요가 없음
//  상태: 실내온도, 시간, 전력
//  dp[시간][실내온도]=전력, i시간일 때 실내온도가 j라면, 당시 최소 전력
//      선택할 수 있는 동작은, 온도를 올리거나, 내리거나, 유지하거나, 끄거나
//      각 부분문제들은 모두 독립적, 최적해를 갖고 있음(최소 전력을 계속 선택하면 최종값은 최소 전력이 나올 것임)
//      1. 온도올리기, dp[i + 1][j + 1]=min(dp[i][j] + a, )
//      2. 온도내리기, dp[i + 1][j - 1]=min(dp[i][j] + a, )
//      3. 온도유지하기, dp[i + 1][j]=min(dp[i][j] + b, )
//      4. 에어컨끄기, dp[i + 1][j + dir]=min(dp[i][j + dir], )

function solution(temperature, t1, t2, a, b, onboard) {
    var answer = Infinity;
    
    temperature += 10;
    t1 += 10;
    t2 += 10;
    const dp = Array.from({length: onboard.length}, () => 
                         Array.from({length: 51}, () => Infinity));
    dp[0][temperature] = 0;
    
    for (let i = 0; i < onboard.length - 1; i++) {
        const isPerson = onboard[i];
        for (let j = 0; j <= 50; j++) {
            if (dp[i][j] === Infinity) continue;
            if (isPerson && (j < t1 || j > t2)) continue;
            
            if (j + 1 <= 50) {
                dp[i + 1][j + 1] = Math.min(dp[i][j] + a, dp[i + 1][j + 1]);
            }
            if (j - 1 >= 0) {
                dp[i + 1][j - 1] = Math.min(dp[i][j] + a, dp[i + 1][j - 1]);
            }
            dp[i + 1][j] = Math.min(dp[i][j] + b, dp[i + 1][j]);
            
            const dir = temperature > j ? 1 : temperature === j ? 0 : -1;
            if ((j + dir >= 0) && (j + dir <= 50)) {
                dp[i + 1][j + dir] = Math.min(dp[i][j], dp[i + 1][j + dir]);
            }
        }
    }
    
    const isPerson = onboard.at(-1);
    for (let i = 0; i <= 50; i++) {
        if (isPerson && (i < t1 || i > t2)) continue;
        answer = Math.min(dp.at(-1)[i], answer);
    }
    
    return answer;
}