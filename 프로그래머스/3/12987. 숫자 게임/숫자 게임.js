// 어차피 이겨도 승점은 1점
// A 팀 점수보다 높은 B 팀 점수들 중, 가장 작은 걸 고르면 됨
//  100000 x 100000 = 1×10¹⁰ 시간초과
// 정렬해서 차례대로 비교, 내림차순
//  A[0] > B[0] 라면 A[0] > B[n] 이므로, A[0] 을 이길 수 있는건 없음
//  A[0] < B[0] 라면 A[n] < B[0] 임. 그런데 가장 작은 차이가 나도록 이겨야하므로, A 중 가장 큰 A[0]을 이기는게 맞음

function solution(A, B) {
    const a = A.sort((a, b) => a - b);
    const b = B.sort((a, b) => a - b);
    
    let cnt = 0;
    while (a.length) {
        const aNum = a[a.length - 1];
        const bNum = b[b.length - 1];
        
        if (aNum >= bNum) {
            // A 가 이기면 a 에서만 pop
            a.pop();
            continue;
        }
        
        // B 가 이기면 cnt++, 함께 pop
        cnt++;
        a.pop();
        b.pop();
    }
    
    return cnt;
}