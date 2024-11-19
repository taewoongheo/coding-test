
const input = require("fs")
  .readFileSync(process.platform === "linux" ? "/dev/stdin" : "./input.txt")
  .toString();

const N = Number(input);
const board = Array(N)
  .fill()
  .map(() => new Array(N).fill(false));

let ans = 0;

function bt(row) {
  if (row === N) {
    ans++;
    return;
  }
  for (let i = 0; i < N; i++) {
    if (check(row, i)) {
      board[row][i] = true;
      bt(row + 1);
      board[row][i] = false;
    }
  }
}

function check(row, col) {
  for (let i = 0; i < row; i++) {
    const diff = row - i;
    const lDia = col - diff;
    const rDia = col + diff;
    if (board[i][col]) {
      return false;
    }
    if (lDia >= 0 && board[i][lDia]) {
      return false;
    }
    if (rDia <= N - 1 && board[i][rDia]) {
      return false;
    }
  }
  return true;
}

bt(0);

console.log(ans);
