// 규칙:
//  에어컨 희망온도 설정, 원하는 값으로 변경가능
//  실내온도는 희망온도 방향으로 +- 1도, 같으면 안변함, 변하면 a전력, 유지하면 b전력
//  에어컨 끄면 실내온도가 외부온도 방향으로 변함
// 문제요약: 승객이 탑승중인 시간에 실내온도를 t1~t2로 유지하기 위한 전력의 최솟값 구하기
// 알고리즘 선택: 
//  매 시각마다 온도가 1도 단위로 변함
//  만약 실내온도가 22도이고, 희망온도가 23, 24, 25 라면 동작이 모두 동일함(+1)
//  따라서 희망온도는 고려하지 않아도 됨. 단지 온도가 오르고 내리는 것을 보면 됨
//  dp 고려
//      상태: 실내온도, onboard, 소비전력
//          dp[onboard][실내온도]=소비전력: onboard[i]일 때 실내온도가 j라면 그때의 최소 소비전력
//          onboard, 실내온도일 때 가장 작은 소비전력을 고르면 그것이 부분문제의 최적해가 됨
//              최소소비전력을 계속 이어나가면 전체문제의 최적해가 되기 때문
//          독립적인 부분문제?
//              온도를 선택할 때 온도가 이전 값에 영향을 받는가? x
//              i, j라는 최소소비전력에 여러 경로로 도달가능하므로 각 부분문제는 독립적
//      dp[i][j] 일 때, 4가지 동작이 가능
//          1. 온도 올리기
//              dp[i + 1][j + 1] = min(dp[i][j] + a, )
//          2. 온도 내리기
//              dp[i + 1][j - 1] = min(dp[i][j] + a, )
//          3. 온도 유지하기
//              dp[i + 1][j] = min(dp[i][j] + b, )
//          4. 에어컨 끄기
//              dir=+-1(외부방향)
//              dp[i + 1][j + dir] = min(dp[i][j], )
// 부분문제 분해: 
//  온도의 범위가 -10~40이므로 t1, t2, temp에 각각 +10
//  dp[onboard][0~51]
//  dp[0][temperature] = 0: onboard가 0일 때 현재온도를 외부온도로 맞춤, 소비전력은 0


function solution(temperature, t1, t2, a, b, onboard) {
    var answer = Infinity;
    
    temperature += 10;
    t1 += 10;
    t2 += 10;
    
    const dp = Array.from({length: onboard.length}, () => 
                         Array.from({length: 51}, () => Infinity));
    dp[0][temperature] = 0;
    
    for (let i = 0; i < onboard.length - 1; i++) {
        for (let j = 0; j <= 50; j++) {
            if (dp[i][j] === Infinity) continue;
            if (onboard[i] && (j < t1 || j > t2)) continue;
            
            // 온도 올리기
            dp[i + 1][j + 1] = Math.min(dp[i][j] + a, dp[i + 1][j + 1]);
            
            // 온도 내리기
            dp[i + 1][j - 1] = Math.min(dp[i][j] + a, dp[i + 1][j - 1]);
            
            // 온도 유지하기
            dp[i + 1][j] = Math.min(dp[i][j] + b, dp[i + 1][j]);
            
            // 에어컨 끄기
            const dir = temperature > j ? 1 : temperature === j ? 0 : -1;
            dp[i + 1][j + dir] = Math.min(dp[i][j], dp[i + 1][j + dir]);
        }
    }
    
    for (let i = 0; i <= 50; i++) {
        if (onboard.at(-1) && (i < t1 || i > t2)) continue;
        
        answer = Math.min(dp.at(-1)[i], answer);
    }
    
    return answer;
}