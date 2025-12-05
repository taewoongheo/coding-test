function solution(n) {
    let ans = '';
    
    const arr = ['1', '2', '4'];
    
    while (n) {
        const index = (n - 1) % 3;
        n = Math.floor((n - 1) / 3);
        
        ans = arr[index] + ans;
    }
    
    return ans;
}