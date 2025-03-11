// 문제요약: k를 만족하는 가장 짧은 부분수열의 두 인덱스를 구하기
// 알고리즘 선택:
//  만약 첫번째 인덱스부터 k를 만족할때까지 검사한다면 시간초과가 발생할것임
//      O(1000000000000)
//  최소 부분수열 구하기이므로 최적화문제, dp 고려
//  선택할 수 있는 건 두 가지
//      다음 수를 선택=>부분수열 이어가기
//      다음 수를 선택하지 않음=>부분수열 끝
//  하지만 경로최적화 문제가 있음. 예를 들어 특정 수 x에 도달하기 위해선 다른 여러 경로에서 접근할 수 없음 => dp 안됨
//  부분수열은 중간에 끊어질 수 없다는 특징이 있음
//  두 개의 포인터를 만들고 k를 만족할때까지 두 개의 포인터를 이동시키는 방법
// 부분문제 분해: 
//  왼쪽, 오른쪽=0 으로 시작
//  만약 sum이 k보다 크다면, 왼쪽++
//  만약 sum이 k보다 작다면, 오른쪽++
//  같으면 갱신 후 오른쪽++

function solution(sequence, k) {
    var answer = [];
    let diff = Infinity;
    
    let lIdx = 0;
    let rIdx = 0;
    let sum = 0; 
    
    while (rIdx <= sequence.length) {
        if (sum === k) {
            if ((rIdx - lIdx) < diff) {
                diff = rIdx - lIdx;
                answer = [lIdx, rIdx];
            }
            sum += sequence[rIdx++];
        } else if (sum < k) sum += sequence[rIdx++];
        else sum -= sequence[lIdx++];
    }
    
    answer[1]--;
    
    return answer;
}