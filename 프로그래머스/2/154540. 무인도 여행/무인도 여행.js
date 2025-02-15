// 문제요약: 각 섬을 이루는 숫자들의 합을 섬마다 구하기
// 알고리즘 선택: 
//  배열의 각 원소에 대해 루프
//  이때 숫자를 만나면 bfs, 방문처리
//  최대 개수 리턴

class Node {
    constructor(row, col) {
        this.row = row;
        this.col = col;
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
        if (this.head.next) this.head = this.head.next;
        else this.head = null;
        this.length -= 1;
        return ret;
    }
}

function solution(maps) {
    var answer = [];
    
    const maxr = maps.length;
    const maxc = maps[0].length;
    
    const m = Array.from({length: maxr}, () => Array.from({length: maxc}), () => 0);
    const v = Array.from({length: maxr}, () => Array.from({length: maxc}), () => false);
    
    const island = [];
    for (let i = 0; i < maps.length; i++) {
        const line = maps[i].split('');
        for (let j = 0; j < line.length; j++) {
            if (maps[i][j] === 'X') {
                v[i][j] = true;
            } else {
                v[i][j] = false;
                island.push([i, j]);
            }
            m[i][j] = maps[i][j];
        }
    }
    
    for (let i = 0; i < island.length; i++) {
        const [row, col] = island[i];
        if (!v[row][col]) answer.push(bfs(row, col));
    }
    
    if (answer.length === 0) answer = [-1];
    else answer.sort((a, b) => a - b);
    
    function bfs(row, col) {
        const q = new Queue();
        q.push(new Node(row, col));
        v[row][col] = true;
        const move = [[1, 0], [0, 1], [-1, 0], [0, -1]];
        
        let cnt = 0;
        while (q.length !== 0) {
            const node = q.pop();
            cnt += Number(m[node.row][node.col]);
            for (let i = 0; i < 4; i++) {
                const nr = node.row + move[i][0];
                const nc = node.col + move[i][1];
                if (nr < 0 || nr >= maxr || nc < 0 || nc >= maxc || v[nr][nc] || m[nr][nc] === 'X') continue;
                q.push(new Node(nr, nc));
                v[nr][nc] = true;
            }
        }
        
        return cnt;
    }
    
    return answer;
}