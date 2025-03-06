// 문제요약: 모든 수레를 도착지점으로 옮길 수 있는 최소한의 횟수 구하기
// 알고리즘 선택: 
//  만약 파란수레가 1,1에 있을 때, 빨간 수레가 1,2에 있는 경우, 또는 1,3에 있는 경우,
//      모두 다른 상태로 고려해야 함. 
//      또한 모든 수레가 '움직여야' 함.
//      초기 상태=4x4 개의 경우
//      방문한 칸은 재방문할 수 없으므로 한번 이동 후 선택할 수 있는 칸은 3x3개
//      따라서 시간복잡도는 4x4x(3x3)^?
//  r,b 중 누가 먼저 움직이느냐는 상관없음
//      왜냐하면 r이 움직여서 b가 움직이지 못한다면 그 경우는 거기서 끝이기 때문
//      또한 모든 경우의 수를 고려하기 때문에 상관 x
//  bfs 선택
// 부분문제 분해: 
//  class Status: { red:[], blue: [], cnt, rv, bv };
//  방문여부 보드를 r, b 각각 따로 만들어야 됨
//      하나만 만들면 덮어씌워져서 재방문 가능성이 있음
//  rv: red방문, bv: blue방문
//  bfs:
//      status를 pop
//      b, r 이 서로를 고려하지 않고 각각 갈 수 있는 위치를 모두 구함, 그걸 2개의 배열로 리턴
//      2개의 배열에서 나올 수 있는 조합을 골라 새로운 status 로 만들고 bfs 반복
//      이때 두 위치가 겹치면 안됨

class Status {
    constructor(rcoor, bcoor, rv, bv, cnt, rc, bc) {
        this.rcoor = rcoor;
        this.bcoor = bcoor;
        this.rv = rv;
        this.bv = bv;
        this.cnt = cnt;
        this.rc = rc;
        this.bc = bc;
    }
}

function solution(maze) {
    let answer = 0;

    const rows = maze.length;
    const cols = maze[0].length;
    
    const rv = new Set();
    const bv = new Set();
    
    let [rsr, rsc] = [0, 0];
    let [rer, rec] = [0, 0];
    let [bsr, bsc] = [0, 0];
    let [ber, bec] = [0, 0];
    for (let i = 0; i < rows; i++) {
        for (let j = 0; j < cols; j++) {
            if (maze[i][j] === 1) [rsr, rsc] = [i, j];
            else if (maze[i][j] === 2) [bsr, bsc] = [i, j];
            else if (maze[i][j] === 3) [rer, rec] = [i, j];
            else if (maze[i][j] === 4) [ber, bec] = [i, j];
            else if (maze[i][j] === 5) {
                const key = parseKey(i, j);
                rv.add(key);
                bv.add(key);
            }
        }
    }
    
    const rkey = parseKey(rsr, rsc);
    const bkey = parseKey(bsr, bsc);
    rv.add(rkey);
    bv.add(bkey);
    const q = [new Status([rsr, rsc], 
                          [bsr, bsc], 
                          rv,
                          bv,
                          0, 
                          false, 
                          false)];

    const m = [[1, 0], [0, 1], [-1, 0], [0, -1]];
    while (q.length) {
        const status = q.shift();

        
        if (status.rc && status.bc) {
            answer = status.cnt;
            break;
        }
        
        const redcoor = status.rcoor;
        const bluecoor = status.bcoor;
        
        const blue_possible = [];
        const red_possible = [];
        
        // 이동 가능한 위치 찾는 부분 수정 (상대 수레 위치 고려하지 않기)
        for (let i = 0; i < 4; i++) {
            const nbr = bluecoor[0] + m[i][0];
            const nbc = bluecoor[1] + m[i][1];
            if (nbr < 0 || nbr >= rows || nbc < 0 || nbc >= cols ||
                status.bv.has(parseKey(nbr, nbc))) continue;
            blue_possible.push([nbr, nbc]);
        }
        for (let i = 0; i < 4; i++) {
            const nrr = redcoor[0] + m[i][0];
            const nrc = redcoor[1] + m[i][1];
            if (nrr < 0 || nrr >= rows || nrc < 0 || nrc >= cols ||
                status.rv.has(parseKey(nrr, nrc))) continue;
            red_possible.push([nrr, nrc]);
        }

        // 빨간색만 찾은 경우 = 빨간색 고정 (여기에도 스위칭 조건 추가)
        if (status.rc) {
            for (let i = 0; i < blue_possible.length; i++) {
                const [br, bc] = blue_possible[i];
                // 상대방 현재 위치와 겹치는지 체크
                if (br === redcoor[0] && bc === redcoor[1]) continue;
                // 스위칭 방지 조건 추가 (파란 수레가 빨간 수레 위치로 가고, 빨간 수레는 이미 그 자리에 고정됨)
                if (br === redcoor[0] && bc === redcoor[1]) continue;

                let isComplete = false;
                if (br === ber && bc === bec) isComplete = true;
                const nrv = new Set([...status.rv]);
                const nbv = new Set([...status.bv]);
                nbv.add(parseKey(br, bc));
                q.push(new Status(redcoor, [br, bc], nrv, nbv, status.cnt + 1, status.rc, isComplete));
            }
        }

        // 파란색만 찾은 경우 = 파란색 고정 (여기에도 스위칭 조건 추가)
        else if (status.bc) {
            for (let i = 0; i < red_possible.length; i++) {
                const [rr, rc] = red_possible[i];
                // 상대방 현재 위치와 겹치는지 체크  
                if (rr === bluecoor[0] && rc === bluecoor[1]) continue;
                // 스위칭 방지 조건은 이미 있음

                let isComplete = false;
                if (rr === rer && rc === rec) isComplete = true;
                const nrv = new Set([...status.rv]);
                const nbv = new Set([...status.bv]);
                nrv.add(parseKey(rr, rc));
                q.push(new Status([rr, rc], bluecoor, nrv, nbv, status.cnt + 1, isComplete, status.bc));
            }
        }

        // 둘 다 못찾은 경우 (스위칭 조건 확인)
        else {
            for (let i = 0; i < blue_possible.length; i++) {
                for (let j = 0; j < red_possible.length; j++) {
                    const nbcoor = blue_possible[i];
                    const nrcoor = red_possible[j];
                    // 같은 곳으로 이동하는지 체크
                    if (nbcoor[0] === nrcoor[0] && nbcoor[1] === nrcoor[1]) continue;

                    // 스위칭 체크 (현재 위치와 이동할 위치가 서로 교환되는지)
                    if ((nrcoor[0] === bluecoor[0] && nrcoor[1] === bluecoor[1]) &&
                        (nbcoor[0] === redcoor[0] && nbcoor[1] === redcoor[1])) continue;

                    const nrv = new Set([...status.rv]);
                    const nbv = new Set([...status.bv]);    

                    nbv.add(parseKey(nbcoor[0], nbcoor[1]));
                    nrv.add(parseKey(nrcoor[0], nrcoor[1]));

                    let isBlueComplete = false;
                    let isRedComplete = false;
                    if (nbcoor[0] === ber && nbcoor[1] === bec) isBlueComplete = true;
                    if (nrcoor[0] === rer && nrcoor[1] === rec) isRedComplete = true;

                    q.push(new Status(nrcoor, nbcoor, nrv, nbv, status.cnt + 1, isRedComplete, isBlueComplete));
                }
            }
        }
    }
    
    function parseKey(r, c) {
        return `${r} ${c}`;
    }
        
    return answer;
}