const [d, s, x, y] = require("fs")
  .readFileSync(process.platform === "linux" ? "/dev/stdin" : "input.txt")
  .toString()
  .trim()
  .split("\n")
  .map((el) => el.split(" "))
  .flat();

let fx = 0;
let fy = 0;
for (let i = s.length - 1; i >= 0; i--) {
  const size = Math.pow(2, i);

  const char = s.at(d - i - 1);
  if (char === "1") {
    fx += size;
  } else if (char === "2") {
    continue;
  } else if (char === "3") {
    fy += size;
  } else if (char === "4") {
    fx += size;
    fy += size;
  }
}

fx += +x;
fy -= +y;

let ans = "";
for (let i = 0; i < d; i++) {
  const limit = Math.pow(2, d - i);
  const middle = Math.floor(limit / 2);

  if (fx >= middle && fx < limit && fy >= 0 && fy < middle) {
    ans += "1";
    fx -= middle;
  } else if (fx >= 0 && fx < middle && fy >= 0 && fy < middle) {
    ans += "2";
  } else if (fx >= 0 && fx < middle && fy >= middle && fy < limit) {
    ans += "3";
    fy -= middle;
  } else if (fx >= middle && fx < limit && fy >= middle && fy < limit) {
    ans += "4";
    fx -= middle;
    fy -= middle;
  }
}

if (ans.length === Number(d)) {
  console.log(ans);
} else {
  console.log(-1);
}
