
class Coor {
  constructor(row, col, cnt) {
    this.row = row;
    this.col = col;
    this.cnt = cnt;
    this.next = null;
  }
}

class Queue {
  constructor() {
    this.head = null;
    this.tail = null;
    this.length = 0;
  }

  push(coor) {
    if (this.head === null) {
      this.head = coor;
    } else {
      this.tail.next = coor;
    }
    this.tail = coor;
    this.length += 1;
  }

  pop() {
    const ret = this.head;
    this.head = this.head.next;
    this.length -= 1;
    return ret;
  }
}

const input = require("fs")
  .readFileSync(process.platform === "linux" ? "/dev/stdin" : "./input.txt")
  .toString()
  .trim()
  .split("\n");

const maxRow = 100;
const b = Array(maxRow)
  .fill()
  .map(() => Array(8).fill("."));
const v = Array(maxRow)
  .fill()
  .map(() =>
    Array(8)
      .fill()
      .map(() => Array(8).fill(0))
  );

for (let i = 0; i < 8; i++) {
  const line = input[i];
  for (let j = 0; j < 8; j++) {
    b[maxRow - 8 + i][j] = line[j];
  }
}

let ans = 0;
(function bfs() {
  const m = [
    [1, 0],
    [-1, 0],
    [0, 1],
    [0, -1],
    [1, 1],
    [-1, -1],
    [1, -1],
    [-1, 1],
    [0, 0],
  ];

  const q = new Queue();
  q.push(new Coor(maxRow - 1, 0, 0));
  v[maxRow - 1][0][0] = true;
  while (q.length !== 0) {
    const coor = q.pop();
    const r = coor.row;
    const c = coor.col;
    const cnt = coor.cnt;
    if (r === maxRow - 7 - cnt && c === 7) {
      ans = 1;
      break;
    }
    for (let i = 0; i < 9; i++) {
      let nr = r + m[i][0];
      const nc = c + m[i][1];
      if (
        nr >= maxRow - cnt ||
        nr < maxRow - 7 - cnt ||
        nc < 0 ||
        nc > 7 ||
        b[nr][nc] === "#"
      )
        continue;
      nr -= 1;
      if (nr < 0 || b[nr][nc] === "#" || v[nr][nc][cnt + 1]) continue;
      q.push(new Coor(nr, nc, cnt + 1));
      v[nr][nc][cnt + 1] = true;
    }
  }
})();

console.log(ans);
