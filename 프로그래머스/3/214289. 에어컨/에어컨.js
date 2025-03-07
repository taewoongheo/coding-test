function solution(temperature, t1, t2, a, b, onboard) {
    
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