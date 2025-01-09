
class Item {
  constructor(p, d) {
    this.p = p;
    this.d = d;
  }
}

class PriorityQueue {
  constructor() {
    this.heap = [];
  }

  swap(idx1, idx2) {
    [this.heap[idx1], this.heap[idx2]] = [this.heap[idx2], this.heap[idx1]];
  }

  push(item) {
    this.heap.push(item);
    this.up();
  }

  up() {
    let cIdx = this.heap.length - 1;
    let pIdx = Math.floor((cIdx - 1) / 2);
    while (this.heap[pIdx] && this.heap[cIdx].p > this.heap[pIdx].p) {
      this.swap(cIdx, pIdx);
      cIdx = pIdx;
      pIdx = Math.floor((cIdx - 1) / 2);
    }
  }

  pop() {
    if (this.heap.length === 0) return null;
    const ret = this.heap[0];
    this.swap(this.heap.length - 1, 0);
    this.heap.pop();
    this.down();
    return ret;
  }

  down() {
    let cIdx = 0;
    let lIdx = 1;
    let rIdx = 2;
    while (
      (this.heap[lIdx] && this.heap[lIdx].p > this.heap[cIdx].p) ||
      (this.heap[rIdx] && this.heap[rIdx].p > this.heap[cIdx].p)
    ) {
      let bIdx = lIdx;
      if (this.heap[rIdx] && this.heap[rIdx].p > this.heap[lIdx].p) bIdx = rIdx;
      this.swap(cIdx, bIdx);
      cIdx = bIdx;
      lIdx = cIdx * 2 + 1;
      rIdx = cIdx * 2 + 2;
    }
  }
}

const input = require("fs")
  .readFileSync(process.platform === "linux" ? "/dev/stdin" : "input.txt")
  .toString()
  .split("\n");

const N = +input.shift();
let md = 0;
const dpArr = [];
for (let i = 0; i < N; i++) {
  const [p, d] = input.shift().split(" ").map(Number);
  if (d > md) md = d;
  dpArr.push([p, d]);
}

dpArr.sort((a, b) => b[1] - a[1]);

const pq = new PriorityQueue();
let dpIdx = 0;
let ans = 0;
for (let d = md; d > 0; d--) {
  while (dpIdx < N && dpArr[dpIdx][1] >= d) {
    pq.push(new Item(dpArr[dpIdx][0], dpArr[dpIdx][1]));
    dpIdx++;
  }
  if (pq.heap.length !== 0) ans += pq.pop().p;
}

console.log(ans);
