// 문제요약: 틱택토 규칙에 맞는 보드판인지 검사
// 알고리즘 선택: 
//  안되는 경우를 선택
//  상태: O, X, 보드
//  1. O개수 < X개수
//  2. O개수-X개수 > 1
//  3. O승리 시, O개수-X개수!==1
//  4. O승리 시, X도 승리
//  5. X승리 시, O개수!==X개수

function solution(board) {
    
    board = board.map(el => el.split('')).flat();
    
    let oCnt = 0;
    let xCnt = 0;
    board.forEach(el => {
        if (el === 'O') oCnt++;
        else if (el === 'X') xCnt++;
    });
    
    if (oCnt < xCnt) return 0;
    
    if (oCnt - xCnt > 1) return 0;
    
    const win = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6],
    ];
    
    let IsOWin = win.reduce((IsOWin, line) => {
        if (
            board[line[0]] === 'O' &&
            board[line[1]] === 'O' &&
            board[line[2]] === 'O'
        ) return true;
        return IsOWin;
    }, false);
    
    let IsXWin = win.reduce((IsXWin, line) => {
        if (
            board[line[0]] === 'X' &&
            board[line[1]] === 'X' &&
            board[line[2]] === 'X'
        ) return true;
        return IsXWin;
    }, false);
    
    if (IsOWin && oCnt - xCnt !== 1) return 0; 
    
    if (IsOWin && IsXWin) return 0;
    
    if (IsXWin && oCnt !== xCnt) return 0;
    
    return 1;
}