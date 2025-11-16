function solution(sequence, k) {
    let s = 0;
    let e = 0;
    
    const ans = [0, 1000000];
    
    let num = sequence[s];
    while (s <= e) {
        if (num < k && e < sequence.length - 1) {
            num += sequence[++e];
        } else if (num > k) {
            num -= sequence[s++];
        } else {
            if (num === k && e - s < ans[1] - ans[0]) {
                ans[0] = s;
                ans[1] = e;
            }
            num -= sequence[s++];
        }
    }
    
    return ans;
}