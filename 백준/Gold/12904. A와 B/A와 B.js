
const [S, T] = require("fs")
  .readFileSync(process.platform === "linux" ? "/dev/stdin" : "input.txt")
  .toString()
  .trim()
  .split("\n");

let str = T;
let ans = false;
while (str !== "") {
  const lastChar = str[str.length - 1];
  if (lastChar === "A") {
    str = str.slice(0, -1);
  } else {
    str = str.slice(0, -1);
    let reversed = "";
    for (let i = str.length - 1; i >= 0; i--) {
      reversed += str[i];
    }
    str = reversed;
  }

  if (S === str) {
    ans = true;
    break;
  }
}

if (ans) console.log(1);
else console.log(0);
