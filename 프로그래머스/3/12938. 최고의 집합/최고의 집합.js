// 조합을 하나하나 구할 필요가 없음
// s 를 n 으로 나누면 됨 걍 최대한 고르게 펴졌을 때가 가장 큼

function solution(n, s) {
    const q = Math.floor(s / n);
    let r = s % n;
    
    if (q === 0) return [-1];
    
    const arr = Array.from({length: n}, () => q);
    
    let idx = arr.length - 1;
    while (r) {
        arr[idx]++;
        idx--;
        r--;
    }
    
    return arr;
}