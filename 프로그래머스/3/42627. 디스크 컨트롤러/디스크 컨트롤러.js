// 소요시간 짧은 것, 요청 시각이 빠른 것, 번호가 작은 것
// 첫번째 잡부터 큐에 넣은 다음에 끝난 시각 확인하면서 해당 시점에 넣을 수 있는 태스크들을 전부 넣으면 됨
//  그리고 다음에 진행할 태스크를 pop
// 큐에 넣을 때 시작시각이 기록되며, 큐에서 나올 때 끝난 시각을 기록
//  completed 배열에 둘을 함께 기록해서 답 구하면 됨

class Task {
    constructor(i, s, d) {
        this.i = i;
        this.s = s;
        this.d = d;
    }
}

class PriorityQueue {
    constructor() {
        this.heap = [null];
    }
    
    size() {
        return this.heap.length - 1;
    }
    
    canSwap(task1, task2) {
        if (task1.d < task2.d) return true;
        if (task1.d === task2.d && task1.s < task2.s) return true;
        if (task1.d === task2.d && task1.s === task2.s && task1.i < task2.i) return true;
        return false;
    }
    
    swap(idx1, idx2) {
        const task1 = this.heap[idx1];
        this.heap[idx1] = this.heap[idx2];
        this.heap[idx2] = task1;
    }
    
    push(task) {
        this.heap.push(task);
        
        let cIdx = this.heap.length - 1;
        let pIdx = Math.floor(cIdx / 2);
        
        while (this.heap[pIdx] && this.canSwap(this.heap[cIdx], this.heap[pIdx])) {
            this.swap(cIdx, pIdx);
            cIdx = pIdx;
            pIdx = Math.floor(cIdx / 2);
        }
    }
    
    pop() {
        const ret = this.heap[1];
        this.swap(1, this.heap.length - 1);
        this.heap.pop();
        if (this.heap.length === 1) return ret;
        
        let cIdx = 1;
        let lIdx = cIdx * 2;
        let rIdx = cIdx * 2 + 1;
        
        while ((this.heap[lIdx] && this.canSwap(this.heap[lIdx], this.heap[cIdx]))
               || (this.heap[rIdx] && this.canSwap(this.heap[rIdx], this.heap[cIdx]))) {
            let sIdx = lIdx;
            if (this.heap[rIdx] && this.canSwap(this.heap[rIdx], this.heap[sIdx])) {
                sIdx = rIdx;
            }
            
            this.swap(cIdx, sIdx);
            cIdx = sIdx;
            lIdx = cIdx * 2;
            rIdx = cIdx * 2 + 1;
        }
        
        return ret;
    }
}

function solution(jobs) {
    const completed = [];
    
    const rjobs = jobs.sort((a, b) => {
        if (a[0] < b[0]) return -1;
        else if (a[0] === b[0]) return a[1] - b[1];
        return 1;
    }).map((el, idx) => [...el, idx]).reverse();
    
    const pq = new PriorityQueue();
    const pop = rjobs.pop();
    pq.push(new Task(pop[2], pop[0], pop[1]));
    let time = 0;
    
    while (pq.size()) {
        const { i, s, d } = pq.pop();
        if (s > time) time = s + d;
        else time += d;
        completed.push([s, time]);
        
        while (rjobs.length) {
            const [start, duration, idx] = rjobs.at(-1);
            if (start > time && pq.size()) break;
            
            const [pstart, pduration, pidx] = rjobs.pop();
            pq.push(new Task(pidx, pstart, pduration));
        }
    }
    
    return Math.floor(
        completed.reduce((acc, cur) => (cur[1] - cur[0]) + acc, 0)
        / completed.length);
}
