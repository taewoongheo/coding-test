// 현재 검사해야되는 기준의 숫자를 가운데에 두고 양 옆에서 최종적으로 어떤 숫자가 남는지 체크
//  기본적으로는 작은 숫자만 남게 됨
//  따라서 양 옆 수열 중에서 작은 숫자만 남게 됨
// 이후 규칙에 맞게 왼-가-오 를 비교하면서 가능한지 보면 됨
//  사실상 양 옆 숫자가 둘 다 가운데보다 작으면 안됨
// 반례:
//  양 옆에서 압축할 때 기회를 써야되는 경우가 있을까?
//      기회를 쓴다 = 가운데보다 큰 숫자를 남긴다
//      그럼 결국 압축했을 때 기회를 사용하는 것과 동일
// 시간초과
//  양 옆 최솟값 구하는 로직
//      처음에 한번씩 조사하고, 진행되면서 갱신하는 방식
//          왼쪽 = 새로 들어가는 값이 더 작으면 해당 값으로 바로 갱신
//          오른쪽 = 사라지는 값이 가장 작은 값이었다면 다시 조사, O(n)
//          => 시간초과
//      미리 스택으로 정렬한 뒤 오른쪽 최솟값을 재사용하는 방식
//          현재 인덱스가 오른쪽 최솟값 인덱스보다 크거나 같으면 오른쪽 최솟값 갱신

function solution(a) {
    let ans = 0;
    
    const mrStack = [...a].map((el, idx) => [el, idx]).sort((a, b) => b[0] - a[0]);
    let lm = 1000000001;
    let [rm, rmIdx] = mrStack.pop();
    
    for (let i = 0; i < a.length; i++) {
        const c = a[i];
        
        if (a[i - 1] !== undefined) lm = Math.min(a[i - 1], lm);
        if (rmIdx <= i) {
            while (mrStack.length) {
                const [trm, trmIdx] = mrStack.pop();
                if (trmIdx > i) {
                    rm = trm;
                    rmIdx = trmIdx;
                    break;
                }
            }
        }
        
        if (lm < c && rmIdx > i && rm < c) continue;

        ans++;
    }
    
    return ans;
}