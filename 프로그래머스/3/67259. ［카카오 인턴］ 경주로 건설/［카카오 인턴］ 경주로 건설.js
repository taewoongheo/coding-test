function solution(board) {
    const N = board.length;
    board = board.map(el => el.map(el2 => {
        if (el2 === 0) return { ver: Infinity, hor: Infinity };
        return { ver: -1, hor: -1 };
    }));
    
    const queue = [{ row: 0, col: 0 }];
    board[0][0]['ver'] = 0;
    board[0][0]['hor'] = 0;
    
    const m = [[0, 1, "right"], [1, 0, "down"], [-1, 0, "up"], [0, -1, "left"]];
    
    const isPossible = (r, c) => {
        if (r < 0 || c < 0 || r >= N || c >= N) return false;
        if (board[r][c]['hor'] === -1 || board[r][c]['ver'] === -1) return false;
        return true;
    }
    
    const tdir = (dir) => {
        if (dir === 'up' || dir === 'down') return 'ver';
        return 'hor';
    }
    
    while (queue.length) {
        const { row, col } = queue.shift();
        const mmin = { up: Infinity, down: Infinity, right: Infinity, left: Infinity };

        // ver
        if (board[row][col]['ver'] !== Infinity) {
            for (let i = 0; i < 4; i++) {
                const nrow = row + m[i][0];
                const ncol = col + m[i][1];
                const ndir = m[i][2];
                let ncost = board[row][col]['ver'] + 100;
                if (ndir === 'right' || ndir === 'left') ncost += 500;
                
                if (!isPossible(nrow, ncol) || ncost >= board[nrow][ncol][tdir(ndir)]) continue;
                
                mmin[ndir] = Math.min(mmin[ndir], ncost);
            }
        }
        
        // hor
        if (board[row][col]['hor'] !== Infinity) {
            for (let i = 0; i < 4; i++) {
                const nrow = row + m[i][0];
                const ncol = col + m[i][1];
                const ndir = m[i][2];
                let ncost = board[row][col]['hor'] + 100;
                if (ndir === 'up' || ndir === 'down') ncost += 500;
                
                if (!isPossible(nrow, ncol) || ncost >= board[nrow][ncol][tdir(ndir)]) continue;
                
                mmin[ndir] = Math.min(mmin[ndir], ncost);
            }
        }
        
        const keys = ['up', 'right', 'down', 'left'];
        for (const key of keys) {
            if (mmin[key] !== Infinity) {
                if (key === 'up') {
                    board[row - 1][col].ver = mmin[key];
                    queue.push({row: row - 1, col: col});
                }
                if (key === 'down') {
                    board[row + 1][col].ver = mmin[key];
                    queue.push({row: row + 1, col: col});
                }
                if (key === 'right') {
                    board[row][col + 1].hor = mmin[key];
                    queue.push({row: row, col: col + 1});
                }
                if (key === 'left') {
                    board[row][col - 1].hor = mmin[key];
                    queue.push({ row: row, col: col - 1});
                }
            }
        }
    }
    
    return Math.min(board[N - 1][N - 1]['hor'], board[N - 1][N - 1]['ver']);
}
