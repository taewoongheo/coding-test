// 제곱해서 더한 값이 최소가 되려면, 숫자를 최대한 적게(고르게) 만들어야 함
// 즉, 가장 큰 숫자를 찾아 하나씩 빼면 됨

// n 에 대해 매번 works 를 돌면 20000000000 시간초과
// 최댓값을 한번에 하나씩 빼면 됨 => 힙, log(2)20000 = 14
// => 14000000

class PriorityQueue {
    constructor() {
        this.heap = [null];
    }
    
    swap(idx1, idx2) {
        const el = this.heap[idx1];
        this.heap[idx1] = this.heap[idx2];
        this.heap[idx2] = el;
    }
    
    push(item) {
        this.heap.push(item);
        
        let idx = this.heap.length - 1;
        let pIdx = Math.floor(idx / 2);
        
        while (this.heap[pIdx] && this.heap[idx] > this.heap[pIdx]) {
            this.swap(idx, pIdx);
            idx = pIdx;
            pIdx = Math.floor(idx / 2);
        }
    }
    
    pop() {
        const el = this.heap[1];
        if (!el) return null;
        
        this.swap(1, this.heap.length - 1);
        this.heap.pop();
        
        let idx = 1;
        let lIdx = 2;
        let rIdx = 3;
        while ((this.heap[lIdx] && this.heap[lIdx] > this.heap[idx]) ||
              (this.heap[rIdx] && this.heap[rIdx] > this.heap[idx])) {
            let bIdx = lIdx;
            if (this.heap[rIdx] && this.heap[rIdx] > this.heap[lIdx]) {
                bIdx = rIdx;
            }
            this.swap(idx, bIdx);
            idx = bIdx;
            lIdx = idx * 2;
            rIdx = idx * 2 + 1;
        }
        
        return el;
    }
    
    getHeaps() {
        return this.heap;
    }
}

function solution(n, works) {
    let res = 0;
    
    const pq = new PriorityQueue();
    for (const work of works) {
        pq.push(work);
    }

    while (n) {
        let pop = pq.pop();
        if (pop === null) return res;
        
        if (pop > 1) {
            pop--;
            pq.push(pop);
        }
        
        n--;
    }
    
    console.log(pq.getHeaps());
    
    return pq.getHeaps().slice(1).reduce((acc, cur) => Math.pow(cur, 2) + acc, 0);
}
