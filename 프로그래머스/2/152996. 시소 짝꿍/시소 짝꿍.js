// weights 를 이중 루프로 돌리면
//  100000x100000=10000000000 시간초과

// 무게가 같은건 카운트해서 같이 셀 수 있음
//  100000(weights 길이) / 100(무게 종류) = 1000, 1000x1000=1000000 가능

function solution(weights) {
    const cnt = weights.reduce((obj, cur) => {
        if (!obj[cur]) obj[cur] = 0;
        obj[cur]++;
        return obj;
    }, {});
    
    const sorted = [...new Set(weights)].sort((a, b) => a - b);
    
    return sorted.reduce((ans, weight) => {
        // 1:1, n(n-1)/2
        ans += cnt[weight] * (cnt[weight] - 1) / 2;
        
        // 2:3
        let idx = weight * 1.5
        if (cnt[idx]) ans += cnt[weight] * cnt[idx];
        
        // 2:4
        idx = weight * 2;
        if (cnt[idx]) ans += cnt[weight] * cnt[idx];
        
        // 3:4
        idx = weight / 3 * 4;
        if (cnt[idx]) ans += cnt[weight] * cnt[idx];
        
        return ans;
    }, 0);
}