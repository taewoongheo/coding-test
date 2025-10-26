function solution(arr) {
    
    const max = Math.max(...arr);
    
    let ans = max;
    while (true) {
        let flag = true;
        for (let i = 0; i < arr.length; i++) {
            if (ans % arr[i] === 0) {
                continue;
            }
            
            flag = false;
            break;
        }
        
        if (flag) break;
        
        ans++;
    }
    
    return ans;
}