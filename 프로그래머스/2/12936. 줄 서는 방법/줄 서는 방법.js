function solution(n, k) {
    const fac = [1];
    for (let i = 1; i <= n; i++) {
        fac.push(fac.at(-1) * i);
    }
    
    k--;
    
    const nums = Array.from({length: n}, (_, i) => i + 1);
    const ans = [];
    
    for (let i = n - 1; i >= 0; i--) {
        const idx = Math.floor(k / fac[i]);
        
        k = k % fac[i];
        
        ans.push(nums[idx]);
        
        nums.splice(idx, 1);
    }
    
    return ans;
}