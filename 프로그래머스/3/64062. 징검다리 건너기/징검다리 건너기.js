function solution(stones, k) {
    stones.push(Infinity);
    const stack = [{ cnt: Infinity, idx: -1 }];
    let answer = Infinity;
    
    for (let i = 0; i < stones.length; i++) {
        const right = { cnt: stones[i], idx: i };
        
        while (stack[stack.length - 1].cnt < right.cnt) {
            const mid = stack.pop();
            const left = stack[stack.length - 1];
            if (right.idx - left.idx > k) {
                answer = Math.min(mid.cnt, answer);
            }
        }
        
        stack.push(right);
    }
    
    return answer;
}
