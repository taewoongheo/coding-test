const [N, narr, M, marr] = require("fs")
  .readFileSync(process.platform === "linux" ? "/dev/stdin" : "input.txt")
  .toString()
  .trim()
  .split("\n")
  .map((el) => el.split(" ").map(Number));

const sortedNarr = narr.sort((a, b) => a - b);

let ans = "";
for (let i = 0; i < M; i++) {
  if (binarySearch(0, N - 1, marr[i])) {
    ans += "1 ";
  } else {
    ans += "0 ";
  }
}

console.log(ans.trim());

function binarySearch(sIdx, eIdx, el) {
  const mIdx = Math.floor((sIdx + eIdx) / 2);
  if (el === sortedNarr[mIdx]) return true;
  if (sIdx > eIdx) return false;
  if (el > sortedNarr[mIdx]) {
    return binarySearch(mIdx + 1, eIdx, el);
  } else if (el < sortedNarr[mIdx]) {
    return binarySearch(sIdx, mIdx - 1, el);
  }
}
