function solution(places) {
    const res = [];
    
    const getManhattan = (p1, p2) => {
        return Math.abs(p1[0] - p2[0]) + Math.abs(p1[1] - p2[1]);
    }
    
    const getCombinations = (arr, selectedNumber) => {
        if (selectedNumber === 1) return arr.map(el => [el]);
        
        const res = [];
        arr.forEach((fixed, index, origin) => {
            const rest = origin.slice(index + 1);
            const combi = getCombinations(rest, selectedNumber - 1);
            const attached = combi.map(el => [fixed, ...el]);
            res.push(...attached);
        });
        
        return res;
    }
    
    const bfs = (combi, map) => {
        const [s, e] = combi;
        
        const getKey = (coor) => {
            return `${coor[0]}-${coor[1]}`;
        }
        
        const q = [[...s, 0]];
        const v = new Set([...getKey(s)]);
        
        let ans = true;
        const m = [[0, 1], [1, 0], [0, -1], [-1, 0]];
        while (q.length) {
            const [r, c, dist] = q.shift();
            
            if (r === e[0] && c === e[1]) {
                if (dist <= 2) ans = false;
                break;
            }
            
            for (let i = 0; i < 4; i++) {
                const nr = r + m[i][0];
                const nc = c + m[i][1];
                const key = getKey([nr, nc]);
                if (nr < 0 || nr >= 5 || nc < 0 || nc >= 5 || v.has(key) || map[nr][nc] === 'X') continue;
                
                q.push([nr, nc, dist + 1]);
                v.add(key);
            }
        }
        
        return ans;
    }
    
    for (const p of places) {
        const m = p.map(el => el.split(''));
        const ps = [];
        for (let i = 0; i < 5; i++) {
            for (let j = 0; j < 5; j++) {
                if (m[i][j] === 'P') ps.push([i, j]);
            }
        }
                
        const combinations = getCombinations(ps, 2);
        
        const d = [];
        for (const combi of combinations) {
            const [p1, p2] = combi;
            const dist = getManhattan(p1, p2);
            if (dist <= 2) d.push(combi);
        }
        
        let ans = 1;
        for (const combi of d) {
            if (!bfs(combi, m)) {
                ans = 0;
                break;
            }
        }
        
        res.push(ans);
    }
    
    return res;
}