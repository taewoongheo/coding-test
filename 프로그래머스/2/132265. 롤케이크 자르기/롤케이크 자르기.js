// 위치 하나 잡고 루프, 위치 다시 잡고 루프 => O(n^2)
//  최대 길이가 1000000 이므로 O(n^2) = 10^12 시간초과
// Map 2개 만들면 O(n) 에 가능

function solution(topping) {
    let ans = 0;
    
    const lmap = new Map();
    const rmap = new Map();
    topping.forEach(el => {
        if (!rmap.get(el)) rmap.set(el, 1);
        else {
            const cnt = rmap.get(el);
            rmap.set(el, cnt + 1);
        }
    });
    
    for (let i = 0; i < topping.length; i++) {
        const num = topping[i];
        const rnum = rmap.get(num);
        const lnum = lmap.get(num);
        
        if (rnum - 1 === 0) {
            rmap.delete(num);
        } else {
            rmap.set(num, rnum - 1);
        }
        
        if (!lnum) {
            lmap.set(num, 1);
        } else {
            lmap.set(num, lnum + 1);
        }
        
        if (rmap.size === lmap.size) ans++;
    }
    
    return ans;
}