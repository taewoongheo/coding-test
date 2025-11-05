function solution(n, t, m, p) {
    let str = '';
    for (let i = 0; i <= 10000000; i++) {
        str = str + i.toString(n).toUpperCase();
    }
    
    let ans = '';
    let idx = p;
    while (ans.length !== t) {
        ans += str[idx - 1];
        idx += m;
    }
    
    return ans;
}