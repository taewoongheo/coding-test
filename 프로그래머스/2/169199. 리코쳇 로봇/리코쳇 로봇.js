function solution(board) {
    const map = board.map(el => el.split(''));
    
    const rlen = map.length;
    const clen = map[0].length;
    
    let s = null;
    let e = null;
    
    for (let i = 0; i < map.length; i++) {
        for (let j = 0; j < map[0].length; j++) {
            if (map[i][j] === 'R') s = [i, j];
            if (map[i][j] === 'G') e = [i, j];
        }
    }
    
    const q = [[...s, 0]];
    const v = new Set([`${s[0]}-${s[1]}`]);
    const d = [[0, 1], [1, 0], [0, -1], [-1, 0]];
    
    const move = (r, c, d) => {
        let i = 0;
        while (true) {
            let nr = r + d[0];
            let nc = c + d[1];
            if (nr < 0 || nr >= rlen || nc < 0 || nc >= clen || map[nr][nc] === 'D') break;
            
            r = nr;
            c = nc;
        }
        
        return [r, c];
    }
    
    while (q.length) {
        const [r, c, cnt] = q.shift();
        
        if (r === e[0] && c === e[1]) {
            return cnt;
        }
        
        for (let i = 0; i < 4; i++) {
            const [nr, nc] = move(r, c, d[i]);
            const key = `${nr}-${nc}`;
            if (v.has(key)) continue;
            
            v.add(key);
            q.push([nr, nc, cnt + 1]);
        }
    }
    
    return -1;
}