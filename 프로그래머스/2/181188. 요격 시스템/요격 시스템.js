// 미사일이 들어왔을 때 바로 터뜨리지 않고 기다렸다가 다른 미사일도 모였을 때 한꺼번에 터뜨리는게 좋음
// e 기준으로 오름차순 정렬,
//  다음 미사일의 시작지점 ns < e 라면 제낌
//  ns > e 라면, 요격 한번 해주고 ns 로 갱신

function solution(targets) {
    var answer = 1;
    
    targets = targets.sort((a, b) => b[1] - a[1]);
    let coor = targets.pop()[1];

    
    while (targets.length) {
        const [s, e] = targets.pop();
        
        if (s < coor) continue;
        
        coor = e;
        answer++;
    }
    
    return answer;
}