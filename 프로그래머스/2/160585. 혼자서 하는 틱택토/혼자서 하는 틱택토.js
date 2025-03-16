// 문제요약: 규칙을 지켜서 나올 수 있는 틱택토인지 판단
// 알고리즘 선택: 
//  규칙이 안되는 경우를 모두 걸러내면 됨
//  상태: o, x
//  1. o 개수 < x 개수
//  2. o 개수 - x 개수 > 1
//  3. o 승리 && o 개수 - x 개수 !== 1
//  4. o 승리 && x 승리
//  5. x 승리 && o 개수 !== x 개수

function solution(board) {
    
    board = board.map(el => el.split('')).flat();
    
    let oCnt = 0; 
    let xCnt = 0;
    board.forEach(el => {
        if (el === 'O') oCnt++;
        if (el === 'X') xCnt++;
    });
    
    if (oCnt < xCnt) return 0;
    if (oCnt - xCnt > 1) return 0;
    
    const lines = [
        [0, 1, 2], 
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7], 
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6],
    ];

    const isOWin = lines.reduce((ret, item) => {
        const res = board[item[0]] === 'O' && board[item[1]] === 'O' && board[item[2]] === 'O';
        if (res) return true;
        return ret
    }, false);
    const isXWin = lines.reduce((ret, item) => {
        const res = board[item[0]] === 'X' && board[item[1]] === 'X' && board[item[2]] === 'X';
        if (res) return true;
        return ret
    }, false);
    
    if (isOWin && oCnt - xCnt !== 1) return 0;
    if (isOWin && isXWin) return 0;
    if (isXWin && oCnt !== xCnt) return 0;
    
    return 1;
}