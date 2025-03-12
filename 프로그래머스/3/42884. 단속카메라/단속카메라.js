// 문제요약: 자동차의 범위가 주어질 때, cctv의 최소 설치 횟수 구하기
// 알고리즘 선택: 
//  dp의심
//      상태: 지점, 자동차의 수, cctv 개수
//          dp[지점][자동차 수]=cctv 개수: 지점i에서 j개의 자동차를 고려할 때 cctv의 최소개수
//              지점 i에서 자동차 j를 고려할 수 없음
//              왜냐하면 지점에 따라 자동차가 이미 배치되어 있기 때문
//              점화식 자체를 세울 수 없으므로 dp 안됨
//  greedy
//      cctv는 범위 중 어쨌든 한 곳에만 있으면 됨
//      진출점을 기준으로 정렬, 진출점에 하나씩 놓는다고 해보자. 
//      만약 현재 진출점보다 진입점이 작은 자동차가 들어왔을 때,
//          진입점이 작은 자동차는 이미 카운트 됨
//          진입점이 크다면 현재 진출점인 자동차가 카운트 됨
//      만약 진입점을 기준으로 정렬한다면?
//          [0,100], [1,1]인 경우 두번째 자동차에 cctv를 달지 못함
//          진출점 기준인 경우,
//          [1,1], [0, 100] 으로 정렬됨, 둘 다 고려가능. 이 경우 cctv 하나만 있어도 [0,100]까지 잡을 수 있음

function solution(routes) {
    var answer = 1;
    
    routes = routes.sort((a, b) => b[1] - a[1]);
    let cur = routes.pop()[1];
    
    while (routes.length) {
        const next = routes.pop();
        
        if (cur >= next[0]) continue;
        
        cur = next[1];
        answer++;
    }
    
    return answer;
}