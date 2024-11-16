
class Node {
  constructor(value) {
    this.value = value;
    this.left = 0;
    this.right = 0;
    this.leftChildCnt = 0;
    this.rightChildCnt = 0;
  }
}

const input = require("fs")
  .readFileSync(process.platform === "linux" ? "/dev/stdin" : "./input.txt")
  .toString()
  .trim()
  .split("\n");
const N = Number(input[0]);
const g = new Map();
for (let i = 1; i <= N; i++) {
  g.set(i, new Node(i));
}
for (let i = 0; i < N; i++) {
  const line = input[i + 1].split(" ");
  const node = g.get(Number(line[0]));
  const leftNode = Number(line[1]);
  const rightNode = Number(line[2]);
  node.left = leftNode;
  node.right = rightNode;
}

function cntChild(nodeValue) {
  const node = g.get(nodeValue);
  if (node.left !== -1) {
    node.leftChildCnt = cntChild(node.left);
  }
  if (node.right !== -1) {
    node.rightChildCnt = cntChild(node.right);
  }
  return node.leftChildCnt + node.rightChildCnt + 1;
}

//root 찾기
const v = Array(N + 1).fill(false);
let root = 0;
for (let i = 1; i <= N; i++) {
  const node = g.get(i);
  v[node.left] = true;
  v[node.right] = true;
}

for (let i = 1; i <= N; i++) {
  if (!v[i]) {
    root = i;
    break;
  }
}

cntChild(root);

const treeArr = Array(N + 1).fill(0);

function dfs(node, idx, lvl) {
  if (node.left !== -1) {
    const leftNode = g.get(node.left);
    const leftIdx = idx - leftNode.rightChildCnt - 1;
    treeArr[leftIdx] = lvl + 1;
    dfs(leftNode, leftIdx, lvl + 1);
  }
  if (node.right !== -1) {
    const rightNode = g.get(node.right);
    const rightIdx = idx + rightNode.leftChildCnt + 1;
    treeArr[rightIdx] = lvl + 1;
    dfs(rightNode, rightIdx, lvl + 1);
  }
  return;
}

const rootNode = g.get(root);
treeArr[rootNode.leftChildCnt + 1] = 1;
dfs(rootNode, rootNode.leftChildCnt + 1, 1);

let maxValue = Number.MIN_SAFE_INTEGER;
let ansLvl = 1;
for (let i = 1; i <= N; i++) {
  let sIdx = 0;
  let eIdx = 0;
  const level = i;
  for (let j = 1; j <= N; j++) {
    if (treeArr[j] === level) {
      if (sIdx === 0) {
        sIdx = j;
      } else {
        eIdx = j;
      }
    }
  }
  if (eIdx === 0) {
    eIdx = sIdx;
  }
  if (maxValue < eIdx - sIdx + 1) {
    maxValue = eIdx - sIdx + 1;
    ansLvl = level;
  }
}

console.log(ansLvl + " " + maxValue);
