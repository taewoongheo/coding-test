
let [N, K] = require("fs")
  .readFileSync(process.platform === "linux" ? "/dev/stdin" : "input.txt")
  .toString()
  .trim()
  .split(" ")
  .map(Number);

const result = [];
let max = 0;
for (let i = 1; i < N; i++) {
  const a = i;
  const b = N - i;
  const cnt = a * b;

  result.push([a, b, cnt]);

  max = Math.max(max, cnt);
}

if (max < K) {
  console.log(-1);
  process.exit(0);
}

if (K === 0) {
  let str = "B";
  for (let i = 0; i < N - 1; i++) {
    str += "A";
  }

  console.log(str);
  process.exit(0);
}

for (let i = 0; i < N; i++) {
  let [a, b, cnt] = result[i];

  if (cnt === K) {
    let str = "";
    for (let j = 0; j < a; j++) {
      str += "A";
    }
    for (let j = 0; j < b; j++) {
      str += "B";
    }

    console.log(str);
    process.exit(0);
  }

  if (cnt > K) {
    let str = "";
    while (K >= 0 && b !== 0) {
      if (K >= b) {
        str += "A";
        K -= b;
      } else {
        str += "B";
        b--;
      }

      if (K === 0 && b > 0) {
        for (let i = 0; i < b; i++) {
          str += "B";
        }
        b = 0;
      }
    }

    console.log(str);
    process.exit(0);
  }
}
