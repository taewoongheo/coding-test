function solution(maps) {
    let ans = 0;
    
    const rowLen = maps.length;
    const colLen = maps[0].length;
    const v = Array.from({length: rowLen}, () => 
                        Array.from({length: colLen}, () => false));
    v[0][0] = true;
    
    const m = [[0, 1], [1, 0], [-1, 0], [0, -1]];
    
    const q = [[0 ,0, 1]];
    while (q.length) {
        const [row, col, cnt] = q.shift();
        
        if (row === rowLen - 1 && col === colLen - 1) return cnt;
        
        for (let i = 0; i < 4; i++) {
            const nr = row + m[i][0];
            const nc = col + m[i][1];
            const nCnt = cnt + 1;
            
            if (nr < 0 || nr >= rowLen || nc < 0 || nc >= colLen || v[nr][nc] || !maps[nr][nc]) continue;
            v[nr][nc] = true;
            q.push([nr, nc, nCnt]);
        }
    }
    
    return -1;
}