class Item {
    constructor(s, e, c) {
        this.s = s;
        this.e = e;
        this.c = c;
    }
}

class PriorityQueue {
    constructor() {
        this.heap = [null];
    }
    
    size() {
        return this.heap.length - 1;
    }
    
    swap(idx1, idx2) {
        const node = this.heap[idx1];
        this.heap[idx1] = this.heap[idx2];
        this.heap[idx2] = node;
    }
    
    push(node) {
        this.heap.push(node);
        
        let cIdx = this.heap.length - 1;
        let pIdx = Math.floor(cIdx / 2);
        
        while (this.heap[pIdx] && this.heap[cIdx] && this.heap[pIdx].c > this.heap[cIdx].c) {
            this.swap(pIdx, cIdx);
            cIdx = pIdx;
            pIdx = Math.floor(cIdx / 2);
        }
    }
    
    pop() {
        if (this.heap.length === 1) return null;
        
        this.swap(1, this.heap.length - 1);
        const pop = this.heap.pop();
        
        let cIdx = 1;
        let lIdx = cIdx * 2;
        let rIdx = cIdx * 2 + 1;
        
        while ((this.heap[lIdx] && this.heap[cIdx].c > this.heap[lIdx].c) || 
              (this.heap[rIdx] && this.heap[cIdx].c > this.heap[rIdx].c)) {
            let sIdx = lIdx;
            if (this.heap[rIdx] && this.heap[lIdx].c > this.heap[rIdx].c) {
                sIdx = rIdx;
            }
            this.swap(cIdx, sIdx);
            cIdx = sIdx;
            lIdx = cIdx * 2;
            rIdx = cIdx * 2 + 1;
        }
        
        return pop;
    }
}

function solution(n, costs) {
    const ncost = Array.from({ length: n }).map(() => []);
    
    costs = costs.sort((a, b) => a[2] - b[2]);
    
    for (const [n1, n2, c] of costs) {
        ncost[n1].push([n2, c]);
        ncost[n2].push([n1, c]);
    }
    
    const v = new Set();
    v.add(costs[0][0]);
    const pq = new PriorityQueue();

    for (let i = 0; i < ncost[costs[0][0]].length; i++) {
        pq.push(new Item(costs[0][0], ncost[costs[0][0]][i][0], ncost[costs[0][0]][i][1]));
    }
    
    let ans = 0;
    while (pq.size()) {
        const { s, e, c } = pq.pop();
        if (v.has(e)) continue;
        v.add(e);
        ans += c;
        
        for (let i = 0; i < ncost[e].length; i++) {
            pq.push(new Item(e, ncost[e][i][0], ncost[e][i][1]));
        }
    }
    
    return ans;
}
