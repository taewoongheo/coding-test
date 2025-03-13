// 문제요약: 연속하는 펄스 부분 수열의 가장 큰 합 구하기
// 알고리즘 선택: 
//  상태: 현재 수, 합
//      dp[i]=합: 현재 수 i 일 때 최대 합
//          두 가지 선택이 가능
//          i와 이전 수열을 포함
//          i는 독립적인 수열로 시작
//          i의 포함여부에 따라 최대 합을 선택, 이때 부분문제의 해는 최적해임
//          또한 i를 선택할 지 말지는 이전의 상태에 영향을 받지 않음. 즉, 부분문제는 독립적
//          dp[i] = max(dp[i - 1] + dp[i], dp[i])
// 부분문제 분해: 
//  1로 시작하는 수열, -1로 시작하는 수열 두 개를 만듦
//  for 수열:
//      둘 다 dp
    
function solution(sequence) {
    
    const dp1 = sequence.map((el, idx) => {
        if (idx % 2 === 0) return el * -1;
        return el;
    });
    const dp2 = sequence.map((el, idx) => {
        if (idx % 2 === 1) return el * -1;
        return el;
    });
    
    let ans = Math.max(dp1[0], dp2[0]);
    for (let i = 1; i < sequence.length; i++) {
        const dp1num = dp1[i - 1] + dp1[i];
        const dp2num = dp2[i - 1] + dp2[i];
        dp1[i] = Math.max(dp1num, dp1[i]);
        dp2[i] = Math.max(dp2num, dp2[i]);
        ans = Math.max(ans, dp1[i]);
        ans = Math.max(ans, dp2[i]);
    }
    
    console.log(dp1);
    console.log(dp2)
    
    return ans;
}