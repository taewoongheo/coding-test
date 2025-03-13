// 문제요약: 주어진 보드판이 나올 수 있는 경우인지 아닌지 판단
// 알고리즘 선택: 
//  나올 수 없는 경우를 모두 걸러내면 된다
//  1.O개수 < X개수인 경우
//  2.O개수-X개수 >= 2: 2개 이상 차이나는 경우
//  3.X만 존재
//  4.한 줄이 완성되었는데도 계속 진행한 경우
//  만약 한 줄 완성은 늦게 하는 경우 3개보다 많을 수 있음
//  dfs로 게임을 진행하면서 규칙에 맞지 않으면 리턴, 만약 cnt를 끝까지 사용했다면 1
// 부분문제 분해: 
//  O, X 개수와 위치를 모두 카운트=>total
//  O.length < X.length => 불가, 0
//  O.length - X.length >= 2 => 불가, 0
//  dfs(cnt, o):
//      cnt를 모두 사용하면 1 리턴
//      if (o===true): 선공이면
//          for o 하나씩 체크
//              대각선 성공 여부 체크
//              if 성공 시, cnt가 남아있으면 return
//      else: 후공이면
//          for x 하나씩 체크
//              대각선 성공 여부 체크
//              if 성공 시, cnt가 남아있으면 return

function solution(board) {
    var answer = 0;
    
    let total = 0;
    const o = [];
    const x = [];
    for (let i = 0; i < 3; i++) {
        for (let j = 0; j < 3; j++) {
            if (board[i][j] === 'O') {
                o.push([i, j]);
                total++;
            }   
            else if (board[i][j] === 'X') {
                x.push([i, j]);
                total++;
            }
        }
    }
    
    if (o.length < x.length) return 0;
    if (o.length - x.length >= 2) return 0;
    
    const v = Array.from({length: 3}, () => 
                        Array.from({length: 3}, () => 0));
    dfs(total, true);
    
    function dfs(cnt, f) {
        if (cnt === 0) {
            answer = 1;
            return;
        }
        
        if (f) {
            // 선공 차례
            for (let i = 0; i < o.length; i++) {
                const [r, c] = o[i];
                if (v[r][c] === 1) continue;
                
                v[r][c] = 1;
                if (check(v, 1) && cnt !== 1) {
                    // 완성됐는데 더 남아있으면 안됨
                    v[r][c] = 0;
                    continue;
                }
                
                dfs(cnt - 1, false);
                v[r][c] = 0;
            }
        } else {
            for (let i = 0; i < x.length; i++) {
                const [r, c] = x[i];
                if (v[r][c] === -1) continue;
                
                v[r][c] = -1;
                if (check(v, -1) && cnt !== 1) {
                    v[r][c] = 0;
                    continue;
                };
                
                dfs(cnt - 1, true);
                v[r][c] = 0;
            }
        }
    }
    
    function check(v, num) {
        // 가로
        for (let i = 0; i < 3; i++) {
            let cnt = 0;
            for (let j = 0; j < 3; j++) {
                if (v[i][j] === num) cnt++;
                else break;
            }
            if (cnt === 3) return true;
        }
        
        // 세로
        for (let i = 0; i < 3; i++) {
            let cnt = 0;
            for (let j = 0; j < 3; j++) {
                if (v[j][i] === num) cnt++;
                else break;
            }
            if (cnt === 3) return true;
        }
        
        // 위->아래 대각선
        let cnt = 0;
        for (let i = 0; i < 3; i++) {
            if (v[i][i] === num) cnt++;
            else break;
        }
        if (cnt === 3) return true;
        
        // 아래->위 대각선
        cnt = 0; 
        for (let i = 0; i < 3; i++) {
            if (v[2-i][i] === num) cnt++;
            else break;
        }
        if (cnt === 3) return true;
        
        return false;
    }
    
    return answer;
}