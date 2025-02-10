
const input = require("fs")
  .readFileSync(process.platform === "linux" ? "/dev/stdin" : "input.txt")
  .toString()
  .trim()
  .split("\n");

const N = +input.shift();
const inorder = input.shift().split(" ").map(Number);
const postorder = input.shift().split(" ").map(Number);
const preorder = Array.from({ length: N }, () => 0);
let idx = 0;

getPreorder(0, N - 1, 0, N - 1);
console.log(preorder.join(" "));

function getPreorder(is, ie, ps, pe) {
  if (is <= ie && ps <= pe) {
    preorder[idx++] = postorder[pe];

    let inorderRootIdx = 0;
    for (let i = is; i <= ie; i++) {
      if (inorder[i] === postorder[pe]) {
        inorderRootIdx = i;
        break;
      }
    }

    getPreorder(is, inorderRootIdx - 1, ps, ps + inorderRootIdx - 1 - is);
    getPreorder(inorderRootIdx + 1, ie, ps + inorderRootIdx - is, pe - 1);
  }
}
