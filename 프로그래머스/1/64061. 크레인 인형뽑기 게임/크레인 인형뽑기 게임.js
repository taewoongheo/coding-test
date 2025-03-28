// 문제: 크레인을 순서대로 작동시켜 상자에 넣었을 때, 사라지는 인형의 개수 세기
// stack을 사용하면 된다
// 만약 0밖에 없다면 그 턴은 그냥 다음으로 넘기기

function solution(board, moves) {
    var answer = 0;
    
    const stack = [];

    for (let i = 0; i < moves.length; i++) {
        const m = moves[i] - 1;
        
        for (let r = 0; r < board.length; r++) {
            const item = board[r][m];
            
            if (item !== 0) {
                board[r][m] = 0;
                if (stack.length) {
                    const pop = stack.at(-1);
                    if (pop === item) {
                        stack.pop();
                        answer += 2;
                    } else {
                        stack.push(item);
                    }
                } else {
                    stack.push(item);
                }
                
                break;
            }
        }
    }
    
    return answer;
}