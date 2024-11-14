class Imo {
  constructor(imoCnt, clipboard, cnt) {
    this.imoCnt = imoCnt;
    this.clipboard = clipboard;
    this.cnt = cnt;
  }
}

class Item {
  constructor(value) {
    this.value = value;
    this.next = null;
  }
}

class Queue {
  constructor() {
    this.head = null;
    this.tail = null;
    this.length = 0;
  }

  push(value) {
    const item = new Item(value);
    if (this.head === null) {
      this.head = item;
    } else {
      this.tail.next = item;
    }
    this.tail = item;
    this.length += 1;
  }

  pop() {
    const popItem = this.head;
    this.head = popItem.next;
    this.length -= 1;
    return popItem.value;
  }
}

const input = require("fs")
  .readFileSync(process.platform === "linux" ? "/dev/stdin" : "./input.txt")
  .toString();
const S = Number(input);

const v = Array(2001)
  .fill()
  .map((e) => Array(1001).fill(false));
const q = new Queue();
q.push(new Imo(1, 0, 0));
v[1][0] = true;

while (q.length !== 0) {
  const imo = q.pop();
  const imoCnt = imo.imoCnt;
  const clipboard = imo.clipboard;
  const cnt = imo.cnt;

  if (imoCnt === S) {
    console.log(cnt);
    break;
  }

  //이모티콘 개수만큼 클립보드에 저장
  if (!v[imoCnt][imoCnt]) {
    const nImo = new Imo(imoCnt, imoCnt, cnt + 1);
    q.push(nImo);
    v[imoCnt][imoCnt] = true;
  }

  //클립보드에 있는 모든 이모티콘을 붙여넣기
  if (imoCnt + clipboard < 2001 && !v[imoCnt + clipboard][clipboard]) {
    const nImo = new Imo(imoCnt + clipboard, clipboard, cnt + 1);
    q.push(nImo);
    v[imoCnt + clipboard][clipboard] = true;
  }

  //하나 삭제
  if (imoCnt > 0 && !v[imoCnt - 1][clipboard]) {
    const nImo = new Imo(imoCnt - 1, clipboard, cnt + 1);
    q.push(nImo);
    v[imoCnt - 1][clipboard] = true;
  }
}
