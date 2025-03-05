// 시간복잡도?

// 문제요약: 하나의 시추관으로 뽑을 수 있는 가장 많은 석유량 구하기
// 알고리즘 선택: 
//  bfs가 가장 먼저 떠오름. 열을 하나씩 검사하면서 석유를 만나면 bfs 돌려서 개수 구하기
//  최대크기는 2500
//  근데 이미 추출가능한 석유들을 중복해서 탐색하고 있음
//  map으로 각 석유들과 그 양을 결정, 그리고 맵에 석유가 있는 곳에 라벨링
//  열을 검사하면서 뽑은 석유들을 저장, 또 만나면 제낌. 
// 부분문제 분해: 
//  idx=2
//  for i in land.length
//      for j in land.length
//          if land[i][j] === 1 이면 탐색해야 됨
//               cnt = bfs(i, j)
//          map.set(idx, cnt)
//  for i in land.length:
//      total: 총 석유량
//      for j in land.length:
//          if land[i][j] !== 0: 석유
//              if (!v.has(land[i][j])): 아직 탐색하지 않은 석유들
//                  total += map.get(land[i][j])
//                  v.add(land[i][j])
//      answer 갱신

function solution(land) {
    const rows = land.length;
    const cols = land[0].length;
    
    const answer = Array.from({length: cols}, () => 0);
    
    for (let r = 0; r < rows; r++) {
        for (let c = 0; c < cols; c++) {
            
            if (land[r][c] === 0) continue;
            
            let cnt = 1;
            const vcol = new Set();
            const q = [];
            q.push([r, c]);
            land[r][c] = 0;
            vcol.add(c);
            
            const m = [[1, 0], [0, 1], [-1, 0], [0, -1]];
            while (q.length) {
                const [cr, cc] = q.shift();
                
                for (let i = 0; i < 4; i++) {
                    const nr = cr + m[i][0];
                    const nc = cc + m[i][1];
                    
                    if (nr < 0 || nr >= rows || nc < 0 || nc >= cols || land[nr][nc] === 0) continue;
                    
                    q.push([nr, nc]);
                    // v[nr][nc] = true;
                    land[nr][nc] = 0;
                    vcol.add(nc);
                    cnt++;
                }
            }

            for (const col of vcol) {
                answer[col] += cnt;
            }
        }
    }
    
    return Math.max(...answer);
}