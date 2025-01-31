const input = require("fs")
  .readFileSync(process.platform === "linux" ? "/dev/stdin" : "input.txt")
  .toString()
  .trim()
  .split("\n");

const [R, C] = input.shift().split(" ").map(Number);
const arr = input.map((el) => el.split(" ").map(Number));

let ans = "";
if (R % 2 !== 0) {
  ans += ("R".repeat(C - 1) + "D" + "L".repeat(C - 1) + "D").repeat(
    Math.floor(R / 2)
  );
  ans += "R".repeat(C - 1);
} else if (C % 2 !== 0) {
  ans += ("D".repeat(R - 1) + "R" + "U".repeat(R - 1) + "R").repeat(
    Math.floor(C / 2)
  );
  ans += "D".repeat(R - 1);
} else if (R % 2 === 0 && C % 2 === 0) {
  let v = 1000;
  let position = [-1, -1];
  for (let i = 0; i < R; i++) {
    for (let j = 0; j < C; j++) {
      if (i === 0 && j === 0) continue;
      if (i % 2 !== 0 && j % 2 === 0) {
        // 홀수 행 => 짝수 열
        if (arr[i][j] < v) {
          v = arr[i][j];
          position = [i, j];
        }
      } else if (i % 2 === 0 && j % 2 !== 0) {
        // 짝수 행 => 홀수 열
        if (arr[i][j] < v) {
          v = arr[i][j];
          position = [i, j];
        }
      }
    }
  }

  ans += ("D".repeat(R - 1) + "R" + "U".repeat(R - 1) + "R").repeat(
    Math.floor(position[1] / 2)
  );

  let r = Math.floor(position[1] / 2) * 2;
  let c = 0;
  const bound = Math.floor(position[1] / 2) * 2 + 1;
  while (r <= bound && c !== R - 1) {
    if (r < bound && (c !== position[0] || bound !== position[1])) {
      r++;
      ans += "R";
    } else if (
      r === bound &&
      (c !== position[0] || bound - 1 !== position[1])
    ) {
      r--;
      ans += "L";
    }
    if (c != R - 1) {
      c++;
      ans += "D";
    }
  }

  ans += "R";

  ans += ("R" + "U".repeat(R - 1) + "R" + "D".repeat(R - 1)).repeat(
    Math.floor((C - position[1] - 1) / 2)
  );
}

console.log(ans);
