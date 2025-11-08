// 뒤에서부터 진행
// 하나의 원소에 대해, 스택에서 자기 자신과 작거나 같은 원소를 찾을 때까지 pop
// 만약 찾았다면 pop 해당 원소와 인덱스 비교해서 기록
// 만약 못찾았다면(=스택이 빔) 자신의 인덱스를 기록

// 브레이크 포인트를 갱신하면서 중복을 제거하는 방식
//  12x42341 이 있을 때, 첫번째 4는 2에 걸려야 하고, 두번째 4는 1에 걸려야 함
//  만약 x 가 1 이라면, 브레이크 포인트인 2 를 통과할 수 있고 3 4 는 검사할 필요가 없음
//  즉, 자기자신보다 큰 브레이크 포인트들을 갱신하는게 핵심

function solution(prices) {
    const len = prices.length;
    const ans = Array.from({length: len}, () => 0);
    
    const stack = [[prices[len - 1], 0]];
    ans[len - 1] = 0;
    for (let i = len - 2; i >= 0; i--) {
        const num = prices[i];
        const idx = len - 1 - i;
        
        let mIdx = 0;
        while (stack.length) {
            const [cn, ci] = stack.at(-1);
            if (num <= cn) {
                stack.pop();
                continue;
            }
            
            mIdx = ci;
            break;
        }
        
        ans[i] = idx - mIdx;
        stack.push([num, idx]);
    }
    
    return ans;
}