

function solution(m, n, board) {
    let ans = 0;
    let last = null;
    
    const b = board.map(el => el.split(''));
    
    while (true) {
        if (ans === last) break;
        last = ans;
        
        const set = new Set();
        for (let i = 0; i < m - 1; i++) {
            for (let j = 0; j < n - 1; j++) {
                
                const block = b[i][j];
                const temp = [];
                let isSuccess = true;
                
                if (block === '@') continue;
                
                for (let l = 0; l < 2; l++) {
                    for (let k = 0; k < 2; k++) {
                        if (block !== b[i + l][j + k]) {
                            isSuccess = false;
                            break;
                        }
                        temp.push([i + l, j + k])
                    }
                    if (!isSuccess) break;
                }
                
                if (isSuccess) temp.forEach(el => set.add(`${el[0]} ${el[1]}`));
            }
        }
        
        const minRowMap = new Map();
        for (const coordinate of set) {
            const [r, c] = coordinate.split(' ');
            b[r][c] = '@';
            const row = minRowMap.get(c);
            if (!row) {
                minRowMap.set(c, r);
                continue;
            }
            minRowMap.set(c, Math.max(r, row));
        }
        
        for (const col of minRowMap.keys()) {
            let row = minRowMap.get(col);
            
            let r = row;
            while (r >= 0) {
                const block = b[r][col];
                
                if (block !== '@') {
                    b[row--][col] = block;
                    b[r][col] = '@';
                }
                    
                r--;
            }
            
        }
        
        ans += set.size;
    }
    
    return ans;
}