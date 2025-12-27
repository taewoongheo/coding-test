function solution(board) {
    const rowlen = board.length;
    const collen = board[0].length;
    
    if (rowlen <= 1 || collen <= 1) {
        let z = false;
        for (let i = 0; i < rowlen; i++) {
            for (let j = 0; j < collen; j++) {
                if (board[i][j]) {
                    z = true;
                    break;
                }
            }
        }
        
        return z ? 1 : 0;
    }
    
    let max = 0;
    
    for (let i = 1; i < rowlen; i++) {
        for (let j = 1; j < collen; j++) {
            if (board[i][j] === 0) continue;
            
            board[i][j] = Math.min(board[i - 1][j], board[i - 1][j - 1], board[i][j - 1]) + 1;
            max = Math.max(board[i][j], max);
        }
    }
    
    return max * max;
}