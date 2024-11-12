const input = require("fs")
  .readFileSync(process.platform === "linux" ? "/dev/stdin" : "./input.txt")
  .toString()
  .trim()
  .split("\n");

const N = Number(input[0]);
const g = new Map();
for (let i = 1; i <= N; i++) {
  g.set(i, []);
}
for (let i = 0; i < N - 1; i++) {
  const line = input[i + 1].split(" ");
  const node1 = Number(line[0]);
  const node2 = Number(line[1]);
  g.get(node1).push(node2);
  g.get(node2).push(node1);
}
const seq = input[N].split(" ").map((el) => Number(el));
if (seq[0] !== 1) {
  console.log(0);
  process.exit();
}
const v = Array(N + 1).fill(false);
v[1] = true;
const q = [];
q.push(1);

let idx = 1;
while (q.length !== 0) {
  const cNode = q.shift();
  const neighbors = g.get(cNode);
  let cnt = 0;
  neighbors.forEach((e) => {
    if (!v[e]) {
      v[e] = true;
      cnt++;
    }
  });
  for (let i = idx; i < idx + cnt; i++) {
    const seqNode = seq[i];
    if (v[seqNode]) {
      q.push(seqNode);
    } else {
      console.log(0);
      process.exit();
    }
  }
  idx += cnt;
}

console.log(1);
