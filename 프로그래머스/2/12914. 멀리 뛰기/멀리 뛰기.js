function solution(n) {
    
    const arr = Array.from({length: n + 1}, () => 0);
    
    arr[0] = 1;
    for (let i = 0; i < arr.length; i++) {
        if (i + 1 < arr.length) {
            arr[i + 1] += (arr[i] % 1234567);   
        }
        if (i + 2 < arr.length) {
            arr[i + 2] += (arr[i] % 1234567);   
        }
    }
    
    return arr[n] % 1234567;
}