// 특정 칸에 도달할 수 있는 경우의 수는 위, 왼쪽을 더한 것과 같음 
// 진행 중인 스텝을 기준으로 방문하는 칸은 일정함
//  step=1 일 때, (0,1), (1,0)
//  step=2 일 때, (0,2), (1,1), (2,0)
//  step=3 일 때, (0,3), (1,2), (2,1), (3,0)
//  step=4 일 때, (0,4), (1,3), (2,2), (3,1), (4,0)
// 각 칸에 도달할 때 현재 칸의 왼쪽, 위를 더해서 계산하면 됨

function solution(m, n, puddles) {
    const arr = Array.from({length: n}, () => 
                          Array.from({length: m}, () => 0));
    arr[0][0] = 1;
    for (const puddle of puddles) {
        const [r, c] = puddle;
        arr[c - 1][r - 1] = null;
    }
    let step = 1;
    
    while (step < m + n - 1) {
        let row = step;
        for (let i = 0; i < n; i++) {
            const rIdx = i;
            const cIdx = row--;
            if (rIdx >= n || cIdx >= m || cIdx < 0 || arr[rIdx][cIdx] === null) continue;
            
            let value = 0;
            const tIdx = rIdx - 1;
            if (tIdx >= 0 && tIdx < n && arr[tIdx][cIdx] !== null) {
                value += arr[tIdx][cIdx];
            }
            
            const lIdx = cIdx - 1;
            if (lIdx >= 0 && lIdx < m && arr[rIdx][lIdx] !== null) {
                value += arr[rIdx][lIdx];
            }
            
            arr[rIdx][cIdx] = (value % 1000000007);
        }
        
        step++;
    }
    
    return (arr[n - 1][m - 1]  % 1000000007);
}