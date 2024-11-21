class Register {
  constructor(number, command) {
    this.number = number;
    this.command = command;
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
    this.length += 1;
  }

  pop() {
    const retItem = this.head;
    this.head = this.head.next;
    this.length -= 1;
    return retItem;
  }
}

function bfs(A, B) {
  const q = new Queue();
  const v = Array(10000).fill(false);
  q.push(new Register(A, ""));
  v[A] = true;

  const command = ["D", "S", "L", "R"];

  while (q.length !== 0) {
    const reg = q.pop();
    const num = reg.number;
    const str = reg.command;
    if (num === B) {
      console.log(str);
      return;
    }
    for (let i = 0; i < 4; i++) {
      const commd = command[i];
      let nNum = num;
      let nStr = str;
      switch (commd) {
        case "D":
          nStr += "D";
          nNum *= 2;
          if (nNum >= 10000) {
            nNum = Math.floor(nNum % 10000);
          }
          break;
        case "S":
          nStr += "S";
          nNum -= 1;
          if (nNum === -1) {
            nNum = 9999;
          }
          break;
        case "L":
          nStr += "L";
          const lDigit = Math.floor(nNum / 1000);
          nNum = Math.floor(nNum % 1000);
          nNum *= 10;
          nNum += lDigit;
          break;
        case "R":
          nStr += "R";
          const fDigit = Math.floor(nNum % 10);
          nNum = Math.floor(nNum / 10);
          nNum += fDigit * 1000;
          break;
      }
      if (!v[nNum]) {
        v[nNum] = true;
        q.push(new Register(nNum, nStr));
      }
    }
  }
}

const input = require("fs")
  .readFileSync(process.platform === "linux" ? "/dev/stdin" : "./input.txt")
  .toString()
  .trim()
  .split("\n");

const T = Number(input[0]);
for (let i = 0; i < T; i++) {
  const line = input[i + 1].split(" ");
  bfs(Number(line[0]), Number(line[1]));
}
