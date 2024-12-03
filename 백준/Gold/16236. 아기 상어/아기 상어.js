
class BabyShark {
  constructor(row, col, cnt, size, eat) {
    this.row = row;
    this.col = col;
    this.cnt = cnt;
    this.size = size;
    this.eat = eat;
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
    this.length++;
  }

  pop() {
    const ret = this.head;
    this.head = this.head.next;
    this.length--;
    return ret;
  }
}

const input = require("fs")
  .readFileSync(process.platform === "linux" ? "/dev/stdin" : "./input.txt")
  .toString()
  .trim()
  .split("\n");

const N = Number(input.shift());
const map = Array(N)
  .fill()
  .map(() => Array(N));

let sr = 0;
let sc = 0;
for (let i = 0; i < N; i++) {
  const line = input.shift().split(" ");
  for (let j = 0; j < N; j++) {
    map[i][j] = Number(line[j]);
    if (map[i][j] === 9) {
      sr = i;
      sc = j;
    }
  }
}

const m = [
  [-1, 0],
  [0, -1],
  [0, 1],
  [1, 0],
];

let next = new BabyShark(sr, sc, 0, 2, 0);
map[sr][sc] = 0;
let ans = 0;
while (next !== null) {
  const bsr = next.row;
  const bsc = next.col;
  const bsCnt = next.cnt;
  const bsSize = next.size;
  const bsEat = next.eat;
  next = null;
  const q = new Queue();
  const v = Array(N)
    .fill()
    .map(() => Array(N));
  q.push(new BabyShark(bsr, bsc, bsCnt, bsSize, bsEat));
  v[bsr][bsc] = true;
  const fishes = new Queue();
  while (q.length !== 0) {
    const bs = q.pop();
    const r = bs.row;
    const c = bs.col;
    const cnt = bs.cnt;
    for (let i = 0; i < 4; i++) {
      const nr = r + m[i][0];
      const nc = c + m[i][1];
      if (
        nr < 0 ||
        nr > N - 1 ||
        nc < 0 ||
        nc > N - 1 ||
        v[nr][nc] ||
        bsSize < map[nr][nc]
      )
        continue;
      if (map[nr][nc] === 0 || bsSize === map[nr][nc]) {
        //지나갈 수 있음
        v[nr][nc] = true;
        q.push(new BabyShark(nr, nc, cnt + 1, bsSize, bsEat));
      } else {
        //먹을 수 있음
        let nBsSize = bsSize;
        let nBsEat = bsEat + 1;
        if (nBsEat === bsSize) {
          nBsSize++;
          nBsEat = 0;
        }
        fishes.push(new BabyShark(nr, nc, cnt + 1, nBsSize, nBsEat));
        v[nr][nc] = true;
      }
    }
  }
  if (fishes.length === 0) {
    //더 이상 먹을 수 있는 물고기가 없음
    break;
  }

  //다음에 먹을 fish 선택
  next = fishes.pop();
  while (fishes.length !== 0) {
    const nFish = fishes.pop();
    if (nFish.cnt < next.cnt) {
      next = nFish;
    } else if (nFish.cnt == next.cnt) {
      if (nFish.row < next.row) {
        next = nFish;
      } else if (nFish.row == next.row && nFish.col < next.col) {
        next = nFish;
      }
    }
  }
  ans = next.cnt;
  map[next.row][next.col] = 0;
}

console.log(ans);
