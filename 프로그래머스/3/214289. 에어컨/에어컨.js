function solution(temperature, t1, t2, a, b, onboard) {
    const MAX = 1000001;
    const MIN_TEMP = -10, MAX_TEMP = 40;
    const RANGE = MAX_TEMP - MIN_TEMP;
    
    // 온도가 이미 쾌적 범위 내라면 에어컨 필요 없음
    if (t1 <= temperature && temperature <= t2) return 0;
    
    // 온도 정규화: -10도를 0으로 만들어 0~50 범위 사용
    temperature -= MIN_TEMP;
    t1 -= MIN_TEMP;
    t2 -= MIN_TEMP;
    
    // DP 배열 초기화
    const dp = Array.from({length: onboard.length}, () => 
                         Array.from({length: RANGE + 1}, () => MAX));
    dp[0][temperature] = 0;
    
    for (let i = 0; i < onboard.length - 1; i++) {
        for (let j = 0; j <= RANGE; j++) {
            // 현재 상태가 불가능하면 넘어감
            if (dp[i][j] === MAX) continue;
            
            // 승객이 탑승했는데 온도 범위 밖인 경우 SKIP
            if (onboard[i] === 1 && (j < t1 || j > t2)) continue;
            
            // 1. 에어컨을 끄는 경우
            let nextTemp = j;
            if (j < temperature && j < RANGE) nextTemp = j + 1;
            else if (j > temperature && j > 0) nextTemp = j - 1;
            dp[i + 1][nextTemp] = Math.min(dp[i][j], dp[i + 1][nextTemp]);
            
            // 2. 희망온도 != 현재온도
            if (j > 0) dp[i + 1][j - 1] = Math.min(dp[i][j] + a, dp[i + 1][j - 1]);
            if (j < RANGE) dp[i + 1][j + 1] = Math.min(dp[i][j] + a, dp[i + 1][j + 1]);
            
            // 3. 희망온도 == 현재온도
            dp[i + 1][j] = Math.min(dp[i][j] + b, dp[i + 1][j]);
        }
    }
    
    // 최소 전력 찾기
    let answer = MAX;
    for (let j = 0; j <= RANGE; j++) {
        // 마지막에 승객이 있으면 쾌적 범위 확인
        if (onboard[onboard.length - 1] === 1 && (j < t1 || j > t2)) continue;
        answer = Math.min(dp[onboard.length - 1][j], answer);
    }
    
    return answer;
}