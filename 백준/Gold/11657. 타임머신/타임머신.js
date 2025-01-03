const input = require("fs")
  .readFileSync(process.platform === "linux" ? "/dev/stdin" : "./input.txt")
  .toString()
  .split("\n");

const [N, M] = input.shift().split(" ").map(Number);
const dist = Array.from({ length: N + 1 }, () => Infinity);
const edges = [];

input.forEach((i) => {
  const [s, e, c] = i.split(" ").map(Number);
  edges.push([s, e, c]);
});

dist[1] = 0;
let iloop = false;

for (let i = 0; i < N; i++) {
  for (const [s, e, c] of edges) {
    if (dist[s] + c < dist[e]) {
      dist[e] = dist[s] + c;
      if (i === N - 1) {
        iloop = true;
      }
    }
  }
}

if (iloop) {
  console.log(-1);
} else {
  for (let i = 2; i <= N; i++) {
    console.log(dist[i] === Infinity ? -1 : dist[i]);
  }
}
