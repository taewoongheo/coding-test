let [S, T] = require("fs")
  .readFileSync(process.platform === "linux" ? "/dev/stdin" : "input.txt")
  .toString()
  .trim()
  .split("\n")
  .map((el) => el.split(""));

let ans = 0;
dfs(T.slice());

console.log(ans);

function dfs(str) {
  if (S.join("") === str.join("")) {
    ans = 1;
    return;
  }

  if (str.length === 0) return;

  if (str[str.length - 1] === "A") {
    let newStr = str.slice(0, -1);
    dfs([...newStr]);
  }

  if (str[0] === "B") {
    let reversedStr = str.slice().reverse().slice(0, -1);
    dfs([...reversedStr]);
  }
}
