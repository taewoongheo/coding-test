
    
function solution(sequence) {
        
    const dp1 = sequence.map((el, i) => {
        if (i % 2 === 0) return el * -1;
        return el;
    });
    const dp2 = sequence.map((el, i) => {
        if (i % 2 === 1) return el * -1;
        return el;
    });
    
    let answer = Math.max(dp1[0], dp2[0]);
    
    for (let i = 1; i < sequence.length; i++) {
        const dp1v = dp1[i] + dp1[i - 1];
        const dp2v = dp2[i] + dp2[i - 1];
        answer = Math.max(dp1v, answer);
        answer = Math.max(dp2v, answer);
        
        dp1[i] = Math.max(dp1v, dp1[i]);
        dp2[i] = Math.max(dp2v, dp2[i]);
    }
    
    return answer;
}