// 문제요약: 원쿠션으로 공을 맞출 때 굴러간 거리의 최솟값
// 알고리즘 선택: 
//  가장 짧은 거리가 나오기 위해선 두 공의 위치를 고려해서 가장 가까운 벽을 선택
//  벽은 총 4개, 꼭짓점 고려?
//      꼭짓점-ball-흰공이 있다면 일단 꼭짓점으로 보내면 안됨
//      꼭짓점-흰공-ball 순서대로라면, 흰공을 꼭짓점에 보내고 ball에 맞을 순 있음
//          하지만 흰공은 꼭짓점-흰공 사이를 두 번 왔다갔다 해야 하므로 최솟값이 나올 수 없음
//  따라서 고려해야 하는 벽은 총 4개
//      s=흰공, t=ball 이라고 할 때, 
//          위쪽 벽 좌표 = [s-t의 x좌표의 가운데, 최대높이]
//          오른쪽 벽 좌표 = [최대너비, s,t의 y좌표 가운데]
//          아래 벽 좌표 = [s-t의 x좌표 가운데, 최소높이]
//          왼쪽 벽 좌표 = [최소너비, s,t의 y좌표 가운데]
//  각각 4가지 경우를 계산하고 비교하면 됨
// 부분문제 분해: 
//  for balls: 
//      위쪽 벽 좌표 구하기
//          만약 s,t의 x끼리 일치하고, t가 위쪽 벽과 더 가까우면 제낌
//          계산
//      오른쪽 벽 좌표 구하기
//          만약 s,t의 y끼리 일치하고, t가 오른쪽 벽과 더 가까우면 제낌
//          계산
//      ...
//  function dist: 거리 계산하는 함수

function solution(m, n, startX, startY, balls) {
    var answer = [];
    
    // 가로범위: 1~m, 세로범위: 1~n
    for (const ball of balls) {
        const [x, y] = ball;
        let ans = Infinity;
        
        const xMiddle = Math.floor((startX + x) / 2);
        const yMiddle = Math.floor((startY + y) / 2);
        
        // 위 벽 좌표
        const up = [xMiddle, n];
        if (x !== startX) {
            ans = Math.min(ans, calDist(ball, up));
        } else {
            // x가 겹치는 경우, start가 벽과 더 가까워야 함=더 위에 있어야 함
            if (startY > y) {
                ans = Math.min(ans, calDist(ball, up));
            }
        }
        
        // 아래 벽 좌표
        const down = [xMiddle, 0];
        if (x !== startX) {
            ans = Math.min(ans, calDist(ball, down));
        } else {
            // x가 겹치는 경우, start가 더 아래에 있어야 함
            if (startY < y) {
                ans = Math.min(ans, calDist(ball, down));
            }
        }
        
        // 왼쪽 벽 좌표
        const left = [0, yMiddle];
        if (y !== startY) {
            ans = Math.min(ans, calDist(ball, left));
        } else {
            // y가 겹치는 경우, start x 가 더 작아야 함
            if (startX < x) {
                ans = Math.min(ans, calDist(ball, left));
            }
        }
        
        // 오른쪽 벽 좌표
        const right = [m, yMiddle];
        if (y !== startY) {
            ans = Math.min(ans, calDist(ball, right));
        } else {
            // y가 겹치는 경우, start x 가 더 커야 함
            if (startX > x) {
                ans = Math.min(ans, calDist(ball, right));
            }
        }
        
        answer.push(ans);
    }
    
    function calDist(ball, wall) {
        let [ballX, ballY] = ball;
        const [wallX, wallY] = wall;

        // 위
        if (wall[1] === n) {
            const diff = wallY - ballY;
            ballY += diff * 2;
        } 
        // 아래
        else if (wall[1] === 0) {
            const diff = ballY;
            ballY -= diff * 2;
        }
        // 왼
        else if (wall[0] === 0) {
            const diff = ballX;
            ballX -= diff * 2;
        }
        // 오른쪽
        else if (wall[0] === m) {
            const diff = wallX - ballX;
            ballX += diff * 2;
        }
        
        return Math.pow(startX - ballX, 2) + Math.pow(startY - ballY, 2);
    }
    
    return answer;
}

