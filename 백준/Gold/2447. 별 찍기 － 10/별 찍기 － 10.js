const N = +require("fs")
  .readFileSync(process.platform === "linux" ? "/dev/stdin" : "input.txt")
  .toString()
  .trim();

let str = "";

for (let i = 0; i < N; i++) {
  for (let j = 0; j < N; j++) {
    makeStr(i, j);
  }

  str += "\n";
}

console.log(str.trim());

// 작은 네모에 대해서만 보기. 만약 작은 네모가 아니라면 더 쪼개야됨
// ***
// * *
// ***
function makeStr(i, j) {
  if (i % 3 === 1 && j % 3 === 1) {
    str += " ";
  } else {
    if (Math.floor(i / 3) === 0 && Math.floor(j / 3) === 0) {
      str += "*";
    } else {
      makeStr(Math.floor(i / 3), Math.floor(j / 3));
    }
  }
}
