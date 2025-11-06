class PriorityQueue {
  constructor() {
    this.heap = [];
  }

  swap(idx1, idx2) {
    const item1 = this.heap[idx1];
    const item2 = this.heap[idx2];
    this.heap[idx1] = item2;
    this.heap[idx2] = item1;
  }

  push(value) {
    this.heap.push(value);
    let idx = this.heap.length - 1;

    while (idx > 0) {
      let pIdx = Math.floor((idx - 1) / 2);

      if (this.heap[idx] < this.heap[pIdx]) {
        this.swap(idx, pIdx);
        idx = pIdx;
        continue;
      }

      break;
    }
  }

  pop() {
    const value = this.heap[0];

    const last = this.heap.pop();
    if (this.heap.length > 0) this.heap[0] = last;

    let idx = 0;
    let lIdx = 1;
    let rIdx = 2;
    while (lIdx < this.heap.length) {
      let sIdx = lIdx;
      if (rIdx < this.heap.length && this.heap[sIdx] > this.heap[rIdx])
        sIdx = rIdx;
      if (this.heap[idx] < this.heap[sIdx]) break;
      this.swap(idx, sIdx);
      idx = sIdx;
      lIdx = idx * 2 + 1;
      rIdx = idx * 2 + 2;
    }

    return value;
  }
}

function solution(scoville, K) {
  const pq = new PriorityQueue();
  scoville.forEach((el) => pq.push(el));

  let cnt = 0;
  
  if (pq.heap.every((el) => el >= K)) return cnt;

  while (pq.heap.length >= 2) {
      
    const pop1 = pq.pop();
    const pop2 = pq.pop();

    pq.push(pop1 + pop2 * 2);
    cnt++;
      
    if (pq.heap.every((el) => el >= K)) return cnt;
  }

  return -1;
}
