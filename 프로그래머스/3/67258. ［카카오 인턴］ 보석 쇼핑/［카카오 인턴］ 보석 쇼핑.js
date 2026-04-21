// 0, 0 부터 시작, 슬라이딩 윈도
// 모든 보석이 포함되지 않았다면, end 를 한 칸씩 늘림
//  전부 포함될 때까지 반복
// 모든 보석이 포함됐다면 start 를 한 칸씩 늘림
//  현재 인덱스 갱신

function solution(gems) {
    const gt = new Set();
    for (const gem of gems) {
        gt.add(gem);
    }
    
    const keys = new Set();
    const maps = {};
    
    let ans = null;
    let diff = Infinity;
    
    let s = 0;
    let e = 0;
    while (e < gems.length + 1) {
        // 모든 보석이 포함되지 않았다면 e++
        if (keys.size < gt.size) {
            const gem = gems[e];
            keys.add(gem);
            if (!maps[gem]) maps[gem] = 0;
            maps[gem]++;
            e++;
            continue;
        }
        
        // 모든 보석이 포함되었다면 s++;
        if ((e - s) < diff) {
            diff = e - s;
            ans = [s + 1, e];
        }
        
        const gem = gems[s];
        maps[gem]--;
        if (maps[gem] === 0) {
            delete maps[gem];
            keys.delete(gem);
        }
        s++;
    }
    
    return ans;
}