// 문제: A,B 도둑이 모든 물건을 훔쳤을 때, A도둑이 남긴 흔적의 누적 개수의 최솟값 구하기
// 최솟값 문제이므로 dp 고려
// 상태: A, B 도둑의 누적 흔적, 현재 물건
// dp[현재물건][B도둑의 흔적]=A도둑의 흔적, 현재물건이 i이고, B도둑의 흔적이 j일 때 A도둑의 흔적
//  A도둑의 흔적이 최솟값인 부분문제를 선택하면 전체문제의 최적해가 되므로 부분문제의 최적해조건만족
//  이전상태에서의 선택과 독립적이다. 왜냐하면 물건 i를 선택할 때 i-1의 선택에 영향을 받지 않기 때문
//      즉, 특정 해에 도달하기까지 여러 경로가 존재하므로 각 부분문제는 독립적
// 점화식
//  dp[현재물건][B도둑의 흔적]=A도둑의 흔적
//  두 가지 선택이 가능
//      1. 현재 물건을 A도둑이 훔침
//          dp[현재물건][B도둑흔적]=A도둑 흔적 + 물건 흔적
//      2. 현재 물건을 B도둑이 훔침
//          dp[현재물건][B도둑흔적 + 물건흔적]=A도둑 흔적

function solution(info, n, m) {
    var answer = Infinity;
    
    const dp = Array.from({length: info.length + 1}, () => 
                         Array.from({length: m}, () => Infinity));
    dp[0][0] = 0;
    
    for (let i = 0; i < dp.length - 1; i++) {
        const [a, b] = info[i];
        for (let j = 0; j < dp[i].length; j++) {
            if (dp[i][j] === Infinity) continue;
            
            // A가 선택
            if (dp[i][j] + a < n) dp[i + 1][j] = Math.min(dp[i][j] + a, dp[i + 1][j]);
            
            // B가 선택
            if (j + b < m) dp[i + 1][j + b] = Math.min(dp[i][j], dp[i + 1][j + b]);
        }
    }
    
    for (let i = 0; i < dp.at(-1).length; i++) {
        answer = Math.min(answer, dp.at(-1)[i]);
    }
    
    if (answer === Infinity) return -1;
    
    return answer;
}