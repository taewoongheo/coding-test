function solution(weights) {
    weights.sort((a, b) => b - a);
    
    const dict = {};
    return weights.reduce((cnt, w) => {
        if (dict[w]) cnt += dict[w];
        if (dict[w * 2]) cnt += dict[w * 2];
        if (dict[w * 3 / 2]) cnt += dict[w * 3 / 2];
        if (dict[w * 4 / 3]) cnt += dict[w * 4 / 3];
        
        dict[w] = (dict[w] || 0) + 1;
        
        return cnt;
    }, 0);
}