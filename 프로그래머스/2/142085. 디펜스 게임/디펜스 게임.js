// k 배열은 항상 모두 채우는 것이 유리
// 문제는 k 배열에 무엇을 넣을것인가 => 큰 수들을 넣어야 함
// enemy 루프를 한번 도는데 1000000, k 배열의 최대 길이도 500000
//  최악의 시간복잡도는 500000000000 => 시간초과
// k 배열에서 가장 작은 수를 효율적으로 찾을 방법이 필요함
//  1. 우선순위큐에 넣기, log1000000 = 20, 1000000 x 20 = 20000000 가능

// pq 의 길이가 k 가 아니라면 항상 큐에 넣음
// 만약 k 에 도달했다면, pq 에서 가장 작은 수를 꺼내고 enemy 와 비교
//  pq.pop > enemy 라면, n - enemy 
//  pq.pop < enemy 라면, n - pq.pop, pq 에 enemy 넣음
//  결과값이 음수면 종료

class PriorityQueue {
    constructor() {
        this.heap = [0];
    }
    
    swap(idx1, idx2) {
        const el1 = this.heap[idx1];
        const el2 = this.heap[idx2];
        this.heap[idx2] = el1;
        this.heap[idx1] = el2;
    }
    
    push(node) {
        this.heap.push(node);
        if (this.heap.length === 2) return;
        
        let cIdx = this.heap.length - 1;
        let pIdx = Math.floor(cIdx / 2);
    
        while (this.heap[pIdx] && this.heap[cIdx] < this.heap[pIdx]) {    
            this.swap(cIdx, pIdx);
            cIdx = pIdx;
            pIdx = Math.floor(cIdx / 2);
        }
    }
    
    pop() {
        const ret = this.heap[1];
        const last = this.heap.pop();
        if (this.heap.length === 1) return ret;
        
        this.heap[1] = last;
        
        let cIdx = 1;
        let lIdx = 2;
        let rIdx = 3;
        
        while (this.heap[lIdx]) {
            let sIdx = lIdx;
            if (this.heap[rIdx] && this.heap[rIdx] < this.heap[lIdx]) {
                sIdx = rIdx;
            }
            if (this.heap[cIdx] <= this.heap[sIdx]) break;
            
            this.swap(cIdx, sIdx);
            cIdx = sIdx;
            lIdx = cIdx * 2;
            rIdx = cIdx * 2 + 1;
        }
        
        return ret;
    }
}

function solution(n, k, enemy) {
    
    if (k >= enemy.length) return enemy.length
    
    let num = n;
    let round = k;
    
    const pq = new PriorityQueue();
    
    for (let i = 0; i < k; i++) {
        pq.push(enemy[i]);
    }
    
    for (let i = k; i < enemy.length; i++) {
        const pop = pq.pop();
        if (pop > enemy[i]) {
            num -= enemy[i];
            pq.push(pop);
        } else {
            num -= pop;
            pq.push(enemy[i]);
        }
        
        if (num < 0) break;
        
        round = i + 1;
    }
    
    return round;
}