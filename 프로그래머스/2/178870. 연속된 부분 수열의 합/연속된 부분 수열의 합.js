// 문제요약: 합이 k인 가장 작은 부분수열의 양끝 인덱스 구하기
// 알고리즘 선택: 
//  부분수열의 중간은 끊어질 수 없이 연속해야 함
//  만약 첫번째 인덱스부터 k가 넘칠 때까지 반복한다고 하면,
//      O(1000000!)으로 시간초과가 발생
//  해당 수열을 선택하면 이전과 이어짐, 만약 선택하지 않으면 새로운 부분수열이 시작됨
//  그것을 선택하는 것은 결정문제
//  하지만 부분문제의 최적해라고 할 수 없음. 
//      왜냐하면 n번째 수를 n-1까지의 수열과 더하던 빼던 k 보다 작다면, 이것을 더해야 할 지 아님 새로운 배열로 시작해야 될 지 명확하지 않음(뒤에 나열된 수를 알아야만 해결가능)
//  => dp는 아님
//  투포인터, sum을 계속 계산하면서 포인터를 이동
//  만약 sum이 k를 넘는다면 왼쪽 포인터를 늘림, sum이 k보다 작다면 오른쪽 포인터를 늘림
// 부분문제 분해: 
//  r, l 둘 다 0에서 시작
//  while r > 수열길이: 넘칠때까지
//      if (sum === k) 수열의 길이를 비교하고 이전보다 작다면 갱신
//      if (sum > k) r++
//      if (sum < k) l++

function solution(sequence, k) {

    let rIdx = 0;
    let lIdx = 0;
    let sum = 0;
    
    let ans = [0, Infinity];
    
    while (rIdx <= sequence.length) {
        if (sum === k) {
            const diff = ans[1] - ans[0];
            if (rIdx - lIdx < diff) {
                ans = [lIdx, rIdx];
            }
            sum += sequence[rIdx++];
        } else if (sum < k) {
            sum += sequence[rIdx++];
        } else {
            sum -= sequence[lIdx++];
        }
    }
    
    ans[1]--;
    
    return ans;
}
