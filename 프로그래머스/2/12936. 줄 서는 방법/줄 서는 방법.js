function solution(n, k) {
    const ans = [];
    const nums = Array.from({length: n}, (_, i) => i + 1);
    const factorial = [1];
    for (let i = 1; i <= n; i++) {
        factorial.push(factorial[i - 1] * i);
    }
    
    k--; // 0-based
    
    for (let i = n - 1; i >= 0; i--) {
        const index = Math.floor(k / factorial[i]);
        
        k = k % factorial[i];
        
        ans.push(nums[index]);
        nums.splice(index, 1);
    }
    
    return ans;
}