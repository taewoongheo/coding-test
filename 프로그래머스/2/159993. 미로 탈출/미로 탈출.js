// 문제요약: 레버를 당긴 후 출구로 탈출하는 가장 빠른 시간
// 알고리즘 선택: 
//  bfs
//  최단거리를 찾는 문제는 bfs로 너비우선탐색 시 가장 빠르게 찾을 수 있음
// 부분문제 분해: 
//  bfs 함수 만들기
//  레버 찾는데 한번, 출구 찾는데 한번 사용

class Item {
    constructor(time, r, c) {
        this.time = time;
        this.r = r;
        this.c = c;
        this.next = null;
    }
}

class Queue {
    constructor() {
        this.head = null;
        this.tail = null;
        this.length = 0;
    }
    
    push(item) {
        if (this.head === null) {
            this.head = item;
        } else {
            this.tail.next = item;
        }
        this.tail = item;
        this.length++;
    }
    
    pop() {
        if (this.head === null) return null;
        const ret = this.head;
        this.head = this.head.next;
        this.length--;
        return ret;
    }
}

function solution(maps) {
    var answer = 0;
    
    const maxr = maps.length;
    const maxc = maps[0].length;
    
    maps = maps.map(el => el.split(''));
    
    let start = [];
    for (let i = 0; i < maxr; i++) {
        for (let j = 0; j < maxc; j++) {
            if (maps[i][j] === 'S') {
                start = [i, j]
                break;
            }
        }
    }
    
    const lever = bfs(0, start[0], start[1], 'L');
    if (lever.time === -1) return -1;
    
    const exit = bfs(lever.time, lever.r, lever.c, 'E');
    
    function bfs(time, r, c, find) {
        let result = {
            time: -1,
            r: -1,
            c: -1,
        };
        
        const v = Array.from({length: maxr}, () => 
                            Array.from({length: maxc}, () => false));
        const q = new Queue();
        q.push(new Item(time, r, c));
        v[r][c] = true;
        console.log(v);
        
        const m = [[1, 0], [0, 1], [-1, 0], [0, -1]];
        while (q.length) {
            const {time, r, c} = q.pop();
            
            if (maps[r][c] === find) {
                result = {
                    time: time,
                    r: r,
                    c: c
                };
                break;
            }
            
            for (let i = 0; i < 4; i++) {
                const nr = r + m[i][0];
                const nc = c + m[i][1];
                
                if (nr < 0 || nr >= maxr || nc < 0 || nc >= maxc || v[nr][nc] || maps[nr][nc] === 'X') continue;
                
                q.push(new Item(time + 1, nr, nc));
                v[nr][nc] = true;
            }
        }
        
        return result;
    }
    
    return exit.time;
}