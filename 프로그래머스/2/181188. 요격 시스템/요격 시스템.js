// 문제요약: 미사일을 모두 관통할 수 있는 요격 미사일의 최소 개수
// 알고리즘 선택: 
//  요격미사일이 격추미사일의 범위 안에만 있으면 됨
//  격추미사일들이 시작하는 지점을 기준으로 오름차순 정렬
//  맨 처음에 나오는 격추미사일이 끝나는 지점을 기준으로 요격미사일 발사
//  만약 현재 요격미사일로 다음 격추미사일을 관통할 수 없다면, 다음 요격미사일의 시작 지점을 기준으로 다시 요격미사일 발사 => greedy

function solution(targets) {
    var answer = 1;
    
    targets = targets.sort((a, b) => b[1] - a[1]);
    
    let missile = targets.pop()[1];
    while (targets.length) {
        const [s, e] = targets.pop();
        
        if (s >= missile) {
            missile = e;
            answer++;
        }
    }
    
    return answer;
}