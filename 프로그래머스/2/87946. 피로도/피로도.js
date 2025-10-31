// 그리디는 안된다고 판단
// '필요'를 기준으로 하면(많은 것부터 하던 적은거 부터 하던), 첫번째 나오는 던전의 소요피로도가 100 인 경우 무조건 한 개임
// '소요'가 적은 걸 기준으로 하면 마지막에 오는 던전의 피도로가 100인 경우 모두 못돔
//  [99, 20]
//  [50, 40]
//  [30, 10]
//  => 1-3-2 순으로 하면 성공이지만, 소요가 적은걸 기준으로 하면 3-에서 끝남
// 던전을 선택하는 순서가 중요함 => 순열
//  최악의 경우 모든 던전을 선택하므로 8! => 40000 시간초과 여유있음
//  dfs 로 더 이상 탐색할 수 없으면 리턴

function solution(k, dungeons) {
    let ans = 0;
    
    const dfs = (depth, fatigue, visit) => {

        for (let i = 0; i < dungeons.length; i++) {
            if (!visit.has(i) && fatigue >= dungeons[i][0]) {
                visit.add(i);
                dfs(depth + 1, fatigue - dungeons[i][1], visit);
                visit.delete(i);
            }
        }
        
        ans = Math.max(ans, depth);
    }
    
    dfs(0, k, new Set());
     
    return ans;
}