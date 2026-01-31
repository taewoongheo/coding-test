function solution(begin, end) {
    const ans = [];
    
    for (let i = begin; i <= end; i++) {
        if (i === 1) {
            ans.push(0);
            continue;
        }
        
        let num = 1;
        
        for (let j = 2; j <= Math.sqrt(i); j++) {
            if (i % j === 0) {
                if (i / j <= 10000000) {
                    num = i / j;
                    break;   
                }
                num = j;
            }
        }
        
        ans.push(num);
    }
    
    return ans;
}