function solution(maps) {
    const m = maps.map(el => el.split(''));
    const rlen = m.length;
    const clen = m[0].length;
    
    const v = new Set();
    
    const ans = [];
    
    const bfs = (i, j) => {
        let cnt = Number(m[i][j]);
        
        const q = [[i, j]];
        v.add(`${i}-${j}`);
        
        const move = [[1, 0], [0, 1], [-1, 0], [0, -1]];
        
        while (q.length) {
            const [r, c] = q.shift();
            for (let k = 0; k < 4; k++) {
                const nr = r + move[k][0];
                const nc = c + move[k][1];
                if (nr < 0 || nr >= rlen || nc < 0 || nc >= clen || m[nr][nc] === 'X' || v.has(`${nr}-${nc}`)) continue;
                
                v.add(`${nr}-${nc}`);
                q.push([nr, nc]);
                cnt += Number(m[nr][nc]);
            }
        }
        
        return cnt;
    }
    
    for (let i = 0; i < rlen; i++) {
        for (let j = 0; j < clen; j++) {
            if (m[i][j] === 'X' || v.has(`${i}-${j}`)) continue;
            ans.push(bfs(i, j));
        }
    }
    
    if (!ans.length) return [-1];
    
    return ans.sort((a, b) => a - b);
}