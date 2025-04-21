// 두 인덱스 사이에서 합이 k 인 가장 짧은 배열 찾기
// dp?
//  잇기 또는 끊기
//  근데 뒤에 나올 수가 뭔지 알아야 잇거나 끊을 수 있음
//      현재 부분문제가 독립적이지 않으므로 dp 는 안됨
// 투 포인터
//  sum < k; e++
//  sum > k; s++

function solution(sequence, k) {
    var answer = [0, Infinity];
    
    let s = 0;
    let e = 0;
    let sum = 0;
    
    while (e <= sequence.length) {
        if (sum > k) {
            sum -= sequence[s++];
        } else if (sum < k) {
            sum += sequence[e++];
        } else {
            if (e - s < answer[1] - answer[0]) {
                answer = [s, e];
            }
            sum += sequence[e++];
        }
    }
    
    answer[1]--;
    return answer;
}