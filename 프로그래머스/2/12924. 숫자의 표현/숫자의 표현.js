// 1부터 n까지 반복하면 10000 x 10000 = 100000000 시간초과
// 특정 구간 사이의 합은 재사용이 가능함
// 투포인터
//  n 을 넘으면 왼쪽 포인터 + 1, n 보다 작으면 오른쪽 포인터 + 1

function solution(n) {
    var answer = 0;
    
    const arr = Array.from({length: n + 1}, (_, idx) => idx); 
    let lIdx = 0; 
    let rIdx = 1;
    
    let num = arr[rIdx];
    
    while (lIdx < rIdx) {
        if (num > n) {
            num -= arr[++lIdx];
        } else if (num < n) {

                num += arr[++rIdx];   
        } else {
            // num === n
            answer++;
            num -= arr[++lIdx];
        }
    }
    
    return answer;
}