// N은 최대 500000.
// 질문: 자바스크립트에서 배열의 메모리 계산은 c 와 동일한가?(아닐거같은데)

// 질문: 숫자 정보를 어떻게 저장할까?
// Map? 2차원 배열? 어떤게 더 메모리를 많이 잡아먹지?

// 질문: 재귀방식과 루프 방식의 명확한 차이는?
// 예상: 재귀방식이 메모리를 더 잡아먹을 듯. 왜냐하면 스택이 계속 생기니까.
// 그럼 루프방식이 항상 더 좋은가?

let [N, narr, M, marr] = require("fs")
  .readFileSync(process.platform === "linux" ? "/dev/stdin" : "input.txt")
  .toString()
  .trim()
  .split("\n");

narr = narr
  .split(" ")
  .map(Number)
  .sort((a, b) => a - b);

const numnarr = [[narr[0], 1]];
let lastnum = narr[0];
for (let i = 1; i < N; i++) {
  const num = narr[i];
  if (lastnum !== num) {
    lastnum = num;
    numnarr.push([lastnum, 1]);
  } else {
    numnarr[numnarr.length - 1][1]++;
  }
}

marr = marr.split(" ").map(Number);
let ans = "";
for (let i = 0; i < M; i++) {
  const idx = binarySearch(0, numnarr.length - 1, marr[i]);
  if (idx !== -1) {
    ans += `${numnarr[idx][1]} `;
  } else {
    ans += "0 ";
  }
}

console.log(ans.trim());

function binarySearch(sIdx, eIdx, el) {
  while (sIdx <= eIdx) {
    const mIdx = Math.floor((sIdx + eIdx) / 2);
    if (numnarr[mIdx][0] === el) return mIdx;
    else if (numnarr[mIdx][0] > el) eIdx = mIdx - 1;
    else if (numnarr[mIdx][0] < el) sIdx = mIdx + 1;
  }

  return -1;
}
