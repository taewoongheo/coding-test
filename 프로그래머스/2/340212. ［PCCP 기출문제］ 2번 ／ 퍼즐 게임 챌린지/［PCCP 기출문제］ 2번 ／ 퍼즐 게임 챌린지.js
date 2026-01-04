// 최대 숙련도는 최대 난이도? 로 가정하면 100000
//  30000000000 => 시간초과
// 이진탐색
//  log(100000) x 300000 = 1500000 가능

function solution(diffs, times, limit) {
    
    if (diffs.length === 1) return diffs[0];

    let ans = Infinity;
    
    let s = 0; 
    let e = 100000
    
    while (s <= e) {
        const mid = Math.floor((s + e) / 2);
        const res = result(mid);
        if (res <= limit) {
            ans = Math.min(mid, ans);
            e = mid - 1;
        } else {
            s = mid + 1;
        }
    }
    
    function result(level) {
        let res = times[0];
        
        for (let i = 1; i < diffs.length; i++) {
            const diff = diffs[i];
            const cur = times[i];
            const prev = times[i - 1];
            
            if (level >= diff) {
                res += cur;
                continue;
            }
            
            res += ((diff - level) * (cur + prev)) + cur;
        }
        
        return res;
    }
    
    return ans !== 0 ? ans : 1;
}