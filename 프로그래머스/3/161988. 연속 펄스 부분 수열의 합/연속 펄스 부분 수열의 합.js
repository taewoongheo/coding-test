// 문제요약: 펄스수열을 곱했을 때 부분수열의 합이 가장 큰 것
// 알고리즘 선택: 
//  부분수열이면 모든 원소가 연속해야 함
//  하나의 수열은 두 가지 경우가 나옴
//  상태: 현재 수에 곱할 수(1, -1), 합, 현재 수
//      dp[현재 수][곱할 수]=합: 현재수에 -1 또는 1을 곱했을 때 최대합
//      하지만 이전 수가 -1을 곱했다면 이번엔 반드시 1을 곱해야 됨. 즉, 부분문제들이 독립적이지 않음
//  그럼 -1, 1 부터 시작하는 펄스수열을 곱한 수열 두 개를 만듦
//  상태를 줄임: 현재 수, 합
//      dp[현재 수]=합: 현재 수까지의 최대 합
//      두 가지 선택이 가능
//      1. 이전 수열을 함께 잇는 경우
//      2. 현재 수에서 다시 시작하는 경우
//      dp[i] = Math.max(dp[i - 1] + dp[i], dp[i])
// 부분문제 분해: 
//  -1, 1 펄스 수열을 곱한 수열 두 개를 만듦
//  두 수열에 대해 dp
//  거기서 나온 최댓값을 갱신

function solution(sequence) {
    var answer = 0;
    
    const dp1 = sequence.map((el, idx) => {
        if (idx % 2 === 0) return el * -1;
        return el;
    });
    
    const dp2 = sequence.map((el, idx) => {
        if (idx % 2 === 1) return el * -1;
        return el;
    });
    
    answer = Math.max(dp1[0], dp2[0]);
    
    for (let i = 1; i < sequence.length; i++) {
        const dp1sum = dp1[i - 1] + dp1[i];
        const dp2sum = dp2[i - 1] + dp2[i];
        
        dp1[i] = Math.max(dp1sum, dp1[i]);
        dp2[i] = Math.max(dp2sum, dp2[i]);
        
        answer = Math.max(answer, dp1sum);
        answer = Math.max(answer, dp2sum);
    }
    
    return answer;
}