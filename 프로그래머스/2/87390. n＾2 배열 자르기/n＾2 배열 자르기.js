// (x, y) 중 더 큰 숫자를 뽑고, 그 숫자에다 +1 하면 됨

function solution(n, left, right) {
    const ans = [];
    
    for (let i = left; i <= right; i++) {
        const idx = i - left;
        
        const r = Math.floor(i / n);
        const c = i % n;
    
        const max = Math.max(r, c);
        ans[idx] = max + 1;
    }
    
    return ans;
}