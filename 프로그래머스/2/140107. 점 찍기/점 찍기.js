function solution(k, d) {
    
    const md = Math.pow(d, 2);
    let x = d;
    
    let ans = 0;
    
    const max = Math.floor(d / k) * k;
    for (let y = 0; y <= max; y += k) {
        let dis = Math.pow(y, 2) + Math.pow(x, 2);
        while (dis > md) {
            dis = Math.pow(y, 2) + Math.pow(--x, 2);
        }
        ans += Math.floor(x / k) + 1;
    }
    
    return ans;
}