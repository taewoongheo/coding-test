function solution(storage, requests) {
    const map = storage.map(el => el.split(''));
    
    const rsize = map.length;
    const csize = map[0].length;
    
    const removed = new Set();
    const getKey = (r, c) => `${r}-${c}`;
    
    let forkLift = new Set();
    
    for (const req of requests) {
        const b = req.charAt(0);
        if (req.length === 1) {
            // 지게차
            
            // top
            for (let i = 0; i < csize - 1; i++) {
                if (forkLift.has(getKey(0, i))) continue;
                doForkLift(0, i, b);
            }
            
            // right
            for (let i = 0; i < rsize - 1; i++) {
                if (forkLift.has(getKey(i, csize - 1))) continue;
                doForkLift(i, csize - 1, b);
            }
            
            // bottom
            for (let i = csize - 1; i >= 1; i--) {
                if (forkLift.has(getKey(rsize - 1, i))) continue;
                doForkLift(rsize - 1, i, b);
            }
            
            // left
            for (let i = rsize - 1; i >= 1; i--) {
                if (forkLift.has(getKey(i, 0))) continue;
                doForkLift(i, 0, b);
            }
            
            forkLift.forEach(el => removed.add(el));
            forkLift = new Set();
        } else {
            // 크레인
            for (let i = 0; i < rsize; i++) {
                for (let j = 0; j < csize; j++) {
                    const el = map[i][j];
                    const key = getKey(i, j);
                    if (!removed.has(key) && el === b) {
                        removed.add(key);
                    }
                }
            }
        }
    }

    function doForkLift(r, c, b) {
        const key = getKey(r, c);
        if (!removed.has(key)) {
            // 제거되지 않았다면 일치하는지만 검사
            const el = map[r][c];
            if (el === b) {
                forkLift.add(key);
            } 
        } else {
            // 제거됨, bfs 시작
            bfs(r, c, b);
        }
    }

    function bfs(r, c, b) {
        const q = [[r, c]];
        const v = new Set();
        v.add(getKey(r, c));
        
        const m = [[1, 0], [0, 1], [-1, 0], [0, -1]];
        
        while (q.length) {
            const [r, c] = q.pop();
            for (let i = 0; i < 4; i++) {
                const nr = r + m[i][0];
                const nc = c + m[i][1];
                
                const key = getKey(nr, nc);
                if (nr < 0 || nr >= rsize || nc < 0 || nc >= csize || v.has(key)) continue;
                
                // 빈 칸이면 담고, 빈 칸이 아니면 검사만
                v.add(key);
                if (removed.has(key)) {
                    q.push([nr, nc]);
                    forkLift.add(key);
                } else {
                    const el = map[nr][nc];
                    if (el === b) {
                        forkLift.add(key);
                    }
                }
            }
        }
    }
    
    return rsize * csize - removed.size;
}