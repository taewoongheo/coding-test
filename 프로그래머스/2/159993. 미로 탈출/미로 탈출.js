function solution(maps) {
    let s = null;
    let e = null;
    let l = null;
    
    const rl = maps.length;
    const cl = maps[0].length;
    
    for (let i = 0; i < rl; i++) {
        for (let j = 0; j < cl; j++) {
            const el = maps[i][j];
            if (el === 'S') {
                s = [i, j];
            }
            if (el === 'E') {
                e = [i, j];
            }
            if (el === 'L') {
                l = [i, j];
            }
        }
    }
    
    let ans = 0;
    
    const m = [[0, 1], [1, 0], [0, -1], [-1, 0]];
    let q = [[...s, 0]];
    let v = new Set([`${s[0]} ${s[1]}`]);
    let found = false;
    while (q.length) {
        const [r, c, cnt] = q.shift();
        
        if (r === l[0] && c === l[1]) {
            found = true;
            ans = cnt;
            break;
        }
        
        for (let i = 0; i < 4; i++) {
            const nr = r + m[i][0];
            const nc = c + m[i][1];
            const key = `${nr} ${nc}`;
            
            if (nr < 0 || nr >= rl || nc < 0 || nc >= cl || v.has(key) || maps[nr][nc] === 'X') continue;
            
            q.push([nr, nc, cnt + 1]);
            v.add(key);
        }
    }
    
    if (!found) return -1;
    
    q = [[...l, ans]];
    v = new Set([`${l[0]} ${l[1]}`]);
    found = false;
    while (q.length) {
        const [r, c, cnt] = q.shift();
        
        if (r === e[0] && c === e[1]) {
            ans = cnt;
            found = true;
            break;
        }
        
        for (let i = 0; i < 4; i++) {
            const nr = r + m[i][0];
            const nc = c + m[i][1];
            const key = `${nr} ${nc}`;
            
            if (nr < 0 || nr >= rl || nc < 0 || nc >= cl || v.has(key) || maps[nr][nc] === 'X') continue;
            
            q.push([nr, nc, cnt + 1]);
            v.add(key);
        }
    }
    
    if (!found) return -1;
    
    return ans;
}