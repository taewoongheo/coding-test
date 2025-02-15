// 문제요약: R에서 G로 이동하는 최소 횟수. 이때 이동은 가장자리에 닿을 때까지 이동(상하좌우)
// 알고리즘 선택: 
//  최단거리 찾기 => bfs
//  특정 위치에 도달했을 때, 순서 같은 상태는 중요하지 않으므로 단순 bfs로 가능
// 부분문제 분할:
//  bfs
//  move(r, c, dir): 현재 위치에 특정 방향으로 이동한 결과의 좌표를 리턴

class Node {
    constructor(row, col, cnt) {
        this.row = row;
        this.col = col;
        this.cnt = cnt;
        this.next = null;
    }
}

class Queue {
    constructor() {
        this.head = null;
        this.tail = null;
        this.length = 0;
    }
    
    push(node) {
        if (this.head === null) {
            this.head = node;
        } else {
            this.tail.next = node;
        }
        this.tail = node;
        this.length += 1;
    }
    
    pop() {
        const ret = this.head;
        this.head = this.head.next;
        this.length -= 1;
        return ret;
    }
}

function solution(board) {
    var answer = -1;
    
    const maxr = board.length;
    const maxc = board[0].length;
    
    const b = [];
    const v = Array.from({length: maxr}, () => Array.from({length: maxc}, () => false));
    
    let rrow, rcol, grow, gcol;
    for (let i = 0; i < board.length; i++) {
        b.push(board[i].split(''));
        board[i].split('').forEach((el, j) => {
            if (el === 'R') {
                rrow = i;
                rcol = j;
            }
            if (el === 'G') {
                grow = i;
                gcol = j;
            }
        })
    }
    
    const q = new Queue();
    q.push(new Node(rrow, rcol, 0));
    v[rrow][rcol] = true;
    const m = [[1, 0], [0, 1], [-1, 0], [0, -1]];
    
    console.log(q);
    while (q.length !== 0) {
        const node = q.pop();
        if (node.row === grow && node.col === gcol) {
            answer = node.cnt;
            break;
        }
        for (let i = 0 ; i < 4; i++) {
            const [nr, nc] = move(node.row, node.col, m[i]);
            if (!v[nr][nc]) {
                v[nr][nc] = true;
                q.push(new Node(nr, nc, node.cnt + 1));
            }
        }
    }
    
    function move(row, col, dir) {
        let nrow = row;
        let ncol = col;
        while (nrow >= 0 && nrow < maxr && ncol >= 0 && ncol < maxc && b[nrow][ncol] !== 'D') {
            nrow += dir[0];
            ncol += dir[1];
        }
        return [nrow-dir[0], ncol-dir[1]];
    }
    
    return answer;
}