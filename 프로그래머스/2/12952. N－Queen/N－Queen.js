function solution(n) {
    let ans = 0;
    
    const check = (row, col, visited) => {
        // col
        for (let r = 0; r < row; r++) {
            if (visited[r][col]) return false;
        }
        
        // 왼쪽 대각선
        let moveCnt = Math.min(row, col);
        for (let i = 1; i <= moveCnt; i++) {
            if (visited[row - i][col - i]) return false;
        }
        
        // 오른쪽 대각선
        moveCnt = Math.min(row, n - col - 1);
        for (let i = 1; i <= moveCnt; i++) {
            if (visited[row - i][col + i]) return false;
        }
        
        return true;
    }
    
    const bt = (row, visited) => {
        
        if (row === n - 1) {
            ans++;
            return;
        }
        
        for (let c = 0; c < n; c++) {
            if (!check(row + 1, c, visited)) continue;
            
            visited[row + 1][c] = true;
            bt(row + 1, visited);
            visited[row + 1][c] = false;
        }
    }
    
    const visited = Array.from({length: n}, 
                               () => Array.from({length: n}, () => false));
    
    bt(-1, visited, 0);
    
    return ans;
}