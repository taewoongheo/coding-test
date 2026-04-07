// boolean 배열
// stations 의 영향 범위만큼 true
// 루프 시작
//  false 를 만나면 최대 범위를 미리 계산
//      w * 2 + 1
//      이걸 카운트로 초기화
//  false 라면
//      카운트를 소모해서 true 로 바꾸기
//      카운트가 없다면 새로운 카운트 할당
//  만약 이미 true 라면 카운트 = 0
// => 시간초과

// 배열없이 풀기
// stations 에서 비어있는 범위를 미리 알 수 있음
//  그 범위 내에서 w*2+1 로 나눴을 때 올림한 게 기지국 개수임
// stations 를 사용해서 범위 배열을 구하고, 그 범위에서 몇 개의 기지국이 나오는지 체크

function solution(n, stations, w) {
    const arr = [];
    
    let end = 1;
    for (const s of stations) {
        const se = s - w - 1;
        const cnt = se - end + 1;
        if (cnt > 0) {
            arr.push(cnt);   
        }
        end = s + w + 1;
    }
    
    const cnt = n - end + 1;
    if (cnt > 0) {
        arr.push(cnt);
    }
    
    let ans = 0; 
    for (const cnt of arr) {
        ans += Math.ceil(cnt / (w * 2 + 1));
    }
    
    return ans;
}
    
