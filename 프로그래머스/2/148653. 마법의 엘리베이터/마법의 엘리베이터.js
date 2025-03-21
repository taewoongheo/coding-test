function solution(storey) {
    var answer = 0;
    
    while (storey) {
        const cur = storey % 10;
        storey = Math.floor(storey / 10);
        
        if (cur < 5) {
            answer += cur;
        } else if (cur > 5) {
            answer += (10 - cur);
            storey += 10;
        } else {
            const next = storey % 10;
            answer += cur;
            if (next > 5) {
                storey += 10;
            }
        }
    }
    
    return answer;
}