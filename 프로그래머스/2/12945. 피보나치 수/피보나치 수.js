function solution(n) {

    const arr = Array.from({length: n + 1}, () => 0);
    arr[1] = 1;
    
    let num = 0;
    for (let i = 2; i <= n; i++) {
        arr[i] = (arr[i - 1] + arr[i - 2]) % 1234567;
        num = arr[i];
    }
    
    return num;
}