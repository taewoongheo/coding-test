// 칸 하나 잡고 방문하지 않은 칸이면 bfs
// 석유 덩어리마다 라벨을 붙임
// 맵이 완성되면 열을 하나씩 검사해서 포함된 라벨을 찾고, 각 라벨마다 석유 덩어리 크기를 계산해서 갱신
//  500x500x500=125000000 => 시간초과
// 행을 기준으로 방문하면 굳이 마지막에 한번 더 루프를 돌 필요가 없음
class Item {
    constructor(r, c) {
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

    push(r, c) {
        const newItem = new Item(r, c);
        if (this.length === 0) {
            this.head = newItem;
            this.tail = newItem;
        } else {
            this.tail.next = newItem;
            this.tail = newItem;
        }
        this.length++;
    }

    pop() {
        if (this.length === 0) return null; 

        const ret = this.head;
        this.head = this.head.next;
        this.length--;

        if (this.length === 0) {
            this.tail = null;
        }
        
        return ret;
    }

    isEmpty() {
        return this.length === 0;
    }
}

function solution(land) {
    let ans = 0;

    let oilLabel = 2;
    
    // 석유 덩어리
    const oil = new Map();
 
    // col 마다 포함한 석유 덩어리
    const co = new Map();
    
    const rsize = land.length;
    const csize = land[0].length;
    
    for (let c = 0; c < csize; c++) {
        let sum = 0;
        co.set(c + 1, new Set());
        const set = co.get(c + 1);
        
        for (let r = 0; r < rsize; r++) {
            let label = land[r][c];
            if (label === 0 || set.has(label)) continue;
            
            if (label === 1) {
                label = oilLabel++;
                oil.set(label, bfs(r, c, label));
            }
            
            set.add(label);
            sum += oil.get(label);
        }
        
        ans = Math.max(sum, ans);
    }
    
    function bfs(r, c, label) {
        const q = new Queue();
        
        q.push(r, c);
        
        const v = new Set();
        
        const getKey = (r, c) => `${r}-${c}`;
        
        v.add(getKey(r, c));
        
        land[r][c] = label;
        
        const m = [[1, 0], [0, 1], [-1, 0], [0, -1]];
        while (!q.isEmpty()) {
            const item = q.pop();
            const {r, c} = item;
            for (let i = 0; i < 4; i++) {
                const nr = r + m[i][0];
                const nc = c + m[i][1];
                
                const key = getKey(nr, nc);
                if (nr < 0 || nr >= rsize || nc < 0 || nc >= csize || v.has(key) || land[nr][nc] === 0) continue;
                land[nr][nc] = label;
                v.add(key);
                q.push(nr, nc);
            }
        }
        
        return v.size;
    }
    
    return ans;
}