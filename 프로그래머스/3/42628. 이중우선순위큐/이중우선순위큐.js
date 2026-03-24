// 최댓값/최솟값 큐를 두 개 만들고, 삽입/삭제를 기록하는 객체를 각각 추가
//   bObj, sObj
// 'D 1' 또는 'D -1' 명령을 수행할 때 해당 숫자가 이미 pop 된 숫자인지를 확인
//  즉, 최소큐는 D -1 수행 시, ret 을 확인, 만약 bObj 에 존재하는 숫자면(=이미 big 에서 제거된 숫자) bObj 에서 제거하고 다시 pop, pop 이 됐다면 해당 숫자를 sObj 에 기록
//  최대큐 또한 마찬가지로 sObj 를 확인

// 마지막엔 각자 하나씩 pop 해서 return

class MaxQueue {
  constructor() {
    this.heap = [0];
  }

  swap(idx1, idx2) {
    const item1 = this.heap[idx1];
    this.heap[idx1] = this.heap[idx2];
    this.heap[idx2] = item1;
  }

  push(item) {
    this.heap.push(item);
    let idx = this.heap.length - 1;

    let pIdx = Math.floor(idx / 2);
    while (pIdx && this.heap[pIdx] && this.heap[idx] > this.heap[pIdx]) {
      this.swap(idx, pIdx);
      idx = pIdx;
      pIdx = Math.floor(idx / 2);
    }
  }

  pop() {
    if (this.heap.length === 1) return null;

    const ret = this.heap[1];

    if (this.heap.length > 2) this.swap(1, this.heap.length - 1);
    this.heap.pop();

    let idx = 1;
    let lIdx = idx * 2;
    let rIdx = idx * 2 + 1;

    while (
      (lIdx && this.heap[lIdx] && this.heap[idx] < this.heap[lIdx]) ||
      (rIdx && this.heap[rIdx] && this.heap[idx] < this.heap[rIdx])
    ) {
      let bIdx = lIdx;
      if (rIdx && this.heap[rIdx] && this.heap[rIdx] > this.heap[lIdx]) {
        bIdx = rIdx;
      }

      this.swap(idx, bIdx);
      idx = bIdx;
      lIdx = idx * 2;
      rIdx = idx * 2 + 1;
    }

    return ret;
  }
}

class MinQueue {
  constructor() {
    this.heap = [0];
  }

  swap(idx1, idx2) {
    const item1 = this.heap[idx1];
    this.heap[idx1] = this.heap[idx2];
    this.heap[idx2] = item1;
  }

  push(item) {
    this.heap.push(item);
    let idx = this.heap.length - 1;

    let pIdx = Math.floor(idx / 2);
    while (pIdx && this.heap[pIdx] && this.heap[idx] < this.heap[pIdx]) {
      this.swap(idx, pIdx);
      idx = pIdx;
      pIdx = Math.floor(idx / 2);
    }
  }

  pop() {
    if (this.heap.length === 1) return null;

    const ret = this.heap[1];

    if (this.heap.length > 2) this.swap(1, this.heap.length - 1);
    this.heap.pop();

    let idx = 1;
    let lIdx = idx * 2;
    let rIdx = idx * 2 + 1;

    while (
      (lIdx && this.heap[lIdx] && this.heap[idx] > this.heap[lIdx]) ||
      (rIdx && this.heap[rIdx] && this.heap[idx] > this.heap[rIdx])
    ) {
      let bIdx = lIdx;
      if (rIdx && this.heap[rIdx] && this.heap[rIdx] < this.heap[lIdx]) {
        bIdx = rIdx;
      }

      this.swap(idx, bIdx);
      idx = bIdx;
      lIdx = idx * 2;
      rIdx = idx * 2 + 1;
    }

    return ret;
  }
}

function solution(operations) {
  const bLog = {};
  const sLog = {};

  const maxQueue = new MaxQueue();
  const minQueue = new MinQueue();

  for (const o of operations) {
    const [command, num] = o.split(" ");
    if (command === "I") {
      // 삽입
      maxQueue.push(+num);
      minQueue.push(+num);
      continue;
    }

    // command === 'D'
    if (num === "1") {
      // 최대큐 삭제
      popMax(bLog, sLog);

      continue;
    }

    // 최소큐 삭제
    popMin(bLog, sLog);
  }

  function popMax(bLog, sLog, last = false) {
    let ret = 0;
    while (true) {
      let pop = maxQueue.pop();
      if (pop === null) {
        break;
      }

      if (!sLog[pop]) {
        if (!last) bLog[pop] = (bLog[pop] || 0) + 1;
        ret = pop;
        break;
      }

      sLog[pop]--;
    }

    return ret;
  }

  function popMin(bLog, sLog, last = false) {
    let ret = 0;
    while (true) {
      let pop = minQueue.pop();
      if (pop === null) {
        break;
      }

      if (!bLog[pop]) {
        if (!last) sLog[pop] = (sLog[pop] || 0) + 1;
        ret = pop;
        break;
      }

      bLog[pop]--;
    }

    return ret;
  }

  return [popMax(bLog, sLog, true), popMin(bLog, sLog, true)];
}

