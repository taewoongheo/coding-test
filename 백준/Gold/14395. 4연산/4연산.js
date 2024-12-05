class Item {
  constructor(num, str) {
    this.num = num;
    this.str = str;
    this.next = null;
  }
}

class Queue {
  constructor() {
    this.head = null;
    this.tail = null;
    this.length = 0;
  }

  push(item) {
    if (this.head === null) {
      this.head = item;
    } else {
      this.tail.next = item;
    }
    this.tail = item;
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
  .split(" ")
  .map(Number);
const s = input[0];
const t = input[1];
const thrd = Number.MAX_SAFE_INTEGER;
if (s === t) {
  console.log(0);
  process.exit(0);
}
const v = new Set();

let ans = -1;
(function bfs() {
  const q = new Queue();
  q.push(new Item(s, ""));
  v.add(s);
  const opr = ["*", "+", "-", "/"];
  while (q.length !== 0) {
    const item = q.pop();
    const str = item.str;
    const num = item.num;
    if (num === t) {
      ans = str;
      return;
    }
    for (let i = 0; i < 4; i++) {
      let nStr = str;
      let nNum = num;
      switch (opr[i]) {
        case "*":
          nStr += "*";
          nNum *= nNum;
          if (nNum > thrd) continue;
          break;
        case "+":
          nStr += "+";
          nNum += nNum;
          if (nNum > thrd) continue;
          break;
        case "-":
          nStr += "-";
          nNum = 0;
          break;
        case "/":
          if (nNum === 0) continue;
          nStr += "/";
          nNum = 1;
          break;
      }
      if (v.has(nNum)) continue;
      q.push(new Item(nNum, nStr));
      v.add(nNum);
    }
  }
})();

console.log(ans);
