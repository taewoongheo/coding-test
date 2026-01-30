// e 기준으로 오름차순 정렬(e 전에는 무조건 터뜨려야 하기 때문)
//  ns = 다음 시작점
//  e < ns 면 터뜨리고 e 갱신

function solution(targets) {
    let ans = 1;
    
    targets = targets.sort((a, b) => b[1] - a[1]);
    let coor = targets.pop()[1];
    
    while (targets.length) {
        const [s, e] = targets.pop();
        
        if (s < coor) continue;
        
        coor = e;
        ans++;
    }
    
    return ans;
}
