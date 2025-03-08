// 문제요약: 최소 소비전력 구하기
// 알고리즘 선택: 
//  에어컨은 1도 증가, 하강, 유지 가능
//  고려해야 하는 상태: 실내온도, 소비전력, 시간
//      dp[시간][실내온도]=소비전력
//      네 가지 동작이 가능
//          1. 실내온도를 올리는 경우
//              dp[i][j] = min(dp[i - 1][j - 1] + a);
//          2. 실내온도를 내리는 경우
//              dp[i][j] = min(dp[i - 1][j + 1] + a);
//          3. 실내온도를 유지하는 경우
//              dp[i][j] = min(dp[i - 1][j] + b);
//          4. 에어컨을 끄는 경우
//              dp[i][j] = 실외온도를 기준으로 dp[i - 1][j += 1]
// 부분문제 분해: 
//  외부온도 0을 기준으로 t1, t2의 범위를 재설정
//  실내온도는 0~50까지의 범위를 가짐
//  

function solution(temperature, t1, t2, a, b, onboard) {
    var answer = 0;
    
    const dp = Array.from({length: onboard.length}, () => 
                         Array.from({length: 50}, () => Infinity));
    temperature = temperature > t2 ? t1 - (temperature - t2) : temperature;
    t1 -= temperature;
    t2 -= temperature;
    temperature = 0; 
    
    dp[0][temperature] = 0;
    
    for (let i = 1; i < onboard.length; i++) {
        const isPersonInCar = onboard[i];
        for (let j = 0; j < 50; j++) {
            if (isPersonInCar && (j < t1 || j > t2)) continue;
            
            const candi = [];
            
            candi.push(j > 0 ? dp[i - 1][j - 1] + a : Infinity);
            candi.push(j !== 0 ? dp[i - 1][j] + b : dp[i - 1][j]);
            candi.push(j < 49 ? dp[i - 1][j + 1] : Infinity);
            
            dp[i][j] = Math.min(...candi);
        }
    }
    
    return Math.min(...dp[dp.length - 1]);
}