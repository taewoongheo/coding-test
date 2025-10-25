function solution(k, tangerine) {
    var answer = 0;
    
    const cnt = tangerine.reduce((obj, cur) => {
        obj[cur] = obj[cur] + 1 || 1;
        return obj;
    }, {});
    
    const sorted = Object.entries(cnt).sort((a, b) => a[1] - b[1]);
    
    while (sorted.length) {
        const [_, cnt] = sorted.pop();
        answer++;
        
        k -= cnt;
        if (k <= 0) {
            break;
        }
    }
    
    return answer;
}