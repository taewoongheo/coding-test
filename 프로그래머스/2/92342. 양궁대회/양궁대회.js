// 각 과녁에 필요한 최소 개수를 계산
// 해당 개수를 기준으로 개수를 빼면서 가능한 조합을 모두 뽑음(dfs)
//  가능한 조합 중 점수가 어피치보다 높다면 바로 리턴(인덱스 0부터 시작)
// 현재 인덱스를 선택할 지, 선택하지 않을지만 고르면 됨

function solution(n, info) {
    let diff = 0;
    let ans = null;
    const need = info.map(el => el + 1);
    
    const isSmaller = (ans, arr) => {
        for (let i = 10; i >= 0; i--) {
            if (ans[i] > arr[i]) return false;
            else if (ans[i] < arr[i]) return true;
        }
        
        return false;
    }
    
    const dfs = (idx, cnt, visit = new Set()) => {
        if (cnt === 0 || idx === 11) {
            // 어피치 점수랑 비교해야됨
            let l_score = 0;
            let a_score = 0;
            const cneed = [...need];
            
            for (let i = 0; i <= 10; i++) {
                if (visit.has(i)) {
                    l_score += 10 - i;
                    continue;
                }
                if (info[i] !== 0) {
                    a_score += 10 - i;
                }
                
                cneed[i] = 0;
            }
            
            if (l_score > a_score) {
                const newDiff = l_score - a_score;

                if (cnt > 0) {
                    cneed[10] += cnt; // 남은 화살 0점에 몰아주기
                }

                // 1. 점수 차이가 더 큰 경우 -> 무조건 갱신
                if (newDiff > diff) {
                    diff = newDiff;
                    ans = [...cneed];
                } 
                // 2. 점수 차이가 같은 경우 -> 낮은 점수 우선순위 확인
                else if (newDiff === diff) {
                    if (ans === null || isSmaller(ans, cneed)) {
                        ans = [...cneed];
                    }
                }
            }
            
            return;
        }
        
        // 선택
        if (cnt >= need[idx]) {
            visit.add(idx);
            dfs(idx + 1, cnt - need[idx], visit);
            visit.delete(idx);
        }
        
        // 선택 x
        dfs(idx + 1, cnt, visit);
    }
    
    dfs(0, n);
    
    return ans === null ? [-1] : ans;
}
