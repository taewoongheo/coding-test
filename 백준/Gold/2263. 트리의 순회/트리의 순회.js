const input = require("fs")
  .readFileSync(process.platform === "linux" ? "/dev/stdin" : "input.txt")
  .toString()
  .trim()
  .split("\n")
  .map((el) => el.split(" ").map(Number));

const N = input.shift()[0];
const inorder = input.shift();
const postorder = input.shift();
const preorder = Array.from({ length: N }, () => 0);
let idx = 0;

getPreorder(0, N - 1, 0, N - 1);
console.log(preorder.join(" "));

function getPreorder(is, ie, ps, pe) {
  if (is <= ie && ps <= pe) {
    preorder[idx++] = postorder[pe];

    let pos = is;
    for (let i = is; i <= ie; i++) {
      if (inorder[i] === postorder[pe]) {
        pos = i;
        break;
      }
    }

    getPreorder(is, pos - 1, ps, ps + pos - 1 - is);
    getPreorder(pos + 1, ie, ps + pos - is, pe - 1);
  }
}
