// 자르는 단위 1개부터 length / 2 까지 반복

function solution(s) {
    let ans = s.length;
    
    const max = Math.floor(s.length / 2);
    
    for (let i = 1; i <= max; i++) {
        let str = '';
        
        let prev = s.substring(0, i);
        let count = 1;
        
        let idx = i; 
        while (idx < s.length) {
            
            let end = idx + i;
            if (end > s.length) end = s.length;
            
            const sliced = s.substring(idx, end);
            
            if (prev === sliced) {
                count++;
            } else {
                if (count === 1) {
                    str += prev;
                    prev = sliced;
                    count = 1;
                } else {
                    str = str + Number(count) + prev;
                    prev = sliced;
                    count = 1;
                }
            }
            
            idx += i;
        }
        
        if (count === 1) {
            str += prev;
        } else {
            str = str + Number(count) + prev;
        }

        ans = Math.min(str.length, ans);
    }
    
    return ans;
}