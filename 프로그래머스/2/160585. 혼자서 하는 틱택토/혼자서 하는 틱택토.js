// 아예 없는 경우 1 리턴
// O 의 개수보다 X 의 개수가 많은 경우(X 가 연속으로 두었음)
// O 개수와 X 의 개수의 차가 2 이상인 경우(두 번 연속 두었음)
// O 가 이겼을 때 X 의 개수와 O 와 같은 경우(많은 경우는 위에서 걸러짐)
// X 가 이겼을 때 O 의 개수가 X 와 다른 경우

function solution(board) {
    const map = board.map(el => el.split(''));
    
    let o = 0, x = 0;
    for (let i = 0; i < 3; i++) {
        for (let j = 0; j < 3; j++) {
            if (map[i][j] === 'O') o++;
            else if (map[i][j] === 'X') x++;
        }
    }
    
    const isWin = (mark, map) => {
        let possible = true;
        
        // 가로
        for (let i = 0; i < 3; i++) {
            possible = true;
            for (let j = 0; j < 3; j++) {
                if (map[i][j] !== mark) {
                    possible = false;
                    break;
                }
            }
            
            if (possible) return true;
        }
        
        // 세로
        for (let i = 0; i < 3; i++) {
            possible = true;
            for (let j = 0; j < 3; j++) {
                if (map[j][i] !== mark) {
                    possible = false;
                    break;
                }
            }
            
            if (possible) return true;
        }
        
        // 왼쪽 대각선
        possible = true;
        for (let i = 0; i < 3; i++) {
            if (map[i][i] !== mark) {
                possible = false;
                break;
            }
        }
        if (possible) return true;
        
        // 오른쪽 대각선
        possible = true;
        for (let i = 0; i < 3; i++) {
            if (map[i][2 - i] !== mark) {
                possible = false;
                break;
            }
        }
        if (possible) return true;
        
        return false;
    }
    
    if (o === 0 && x === 0) return 1;
    
    if (x > o) return 0;
    
    if (Math.abs(o - x) >= 2) return 0;
    
    if (isWin('O', map) && o === x) return 0;
    
    if (isWin('X', map) && o !== x) return 0;
    
    return 1;
}