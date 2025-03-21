// 문제: 모든 차량이 한 번은 cctv를 만날 때 설치해야 하는 최소 카메라 개수
// 그럼 진출점 기준으로 정렬한 뒤, 뒤에 나오는 자동차들의 진입점들과 비교
//  if 다음 자동차 진입점 > 현재 진출점: 
//      answer++, 갱신

function solution(routes) {
    var answer = 1;
    
    routes = routes.sort((a, b) => b[1] - a[1]);
    let out = routes.pop()[1];
    
    while (routes.length) {
        const next = routes.pop();
        
        if (next[0] > out) {
            out = next[1];
            answer++;
        }
    }
    
    return answer;
}