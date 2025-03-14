// 문제요약: 모든 차량이 cctv를 만나는 최소 횟수
// 알고리즘 선택: 
//  아무래도 많이 겹치는 부분에 cctv를 두는게 좋을 것임
//  그럼 진출점과 진입점 어디에 두는게 좋을까
//  진입점 기준 정렬, 진출점에 두면 2개, 진입점에 둬도 2개 => 하나로 가능해야됨
//      [1, 10], [2, 3]
//  진출점 기준 정렬, 진출점 기준 정렬 시, 진출점에 하나 두면 끝남
//      [2, 3], [2, 10]
// 부분문제 분해: 
//  진출점 기준 정렬
//  마지막 차량의 진출점을 기준으로 다음 차량의 진입점이 더 작다면 cctv 필요없음
//  만약 다음 차량의 진입점이 더 크다면 cctv 추가 후 해당 차량의 진출점을 기준으로 갱신

function solution(routes) {
    var answer = 1;
    
    routes = routes.sort((a, b) => b[1] - a[1]);
    
    let last = routes.pop()[1];
    
    while (routes.length) {
        const cur = routes.pop();
        
        if (last >= cur[0]) continue;
        
        answer++;
        last = cur[1];
    }
    
    return answer;
}