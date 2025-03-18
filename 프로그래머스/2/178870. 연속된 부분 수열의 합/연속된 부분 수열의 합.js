// 문제요약: 합이 k인 가장 짧은 부분수열의 양끝 인덱스 구하기
// 알고리즘 선택: 
//  상태: 시작, 길이, 합
//  dp[시작][길이] = 합: 시작이 i이고, 길이가 j일 때 합
//  부분문제가 최적해가 될 수 있나?
//      선택할 수 있는 건 현재 수를 이전과 잇기, 또는 끊고 새로 시작하기
//      만약 두 경우 모두 k보다 작다면 최적값을 결정할 수 없음. 
//          왜냐하면 뒤에 뭐가 나오느냐에 따라 달라지기 때문
//  투포인터
//  인덱스를 하나씩 옮기면서 k보다 클 경우 왼쪽인덱스, 작을 경우 오른쪽 인덱스

function solution(sequence, k) {
    var answer = [];
    
    let v = Infinity;
    let lIdx = 0; 
    let rIdx = 0;
    let sum = 0;
    
    while (rIdx <= sequence.length) {
        if (sum < k) sum += sequence[rIdx++];
        else if (sum > k) sum -= sequence[lIdx++];
        else {
            const diff = rIdx - lIdx;
            if (diff < v) {
                v = diff;
                answer = [lIdx, rIdx];
            }
            sum += sequence[rIdx++];
        }
    }
    answer[1]--;
    return answer;
}