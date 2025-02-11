const [N, r, c] = require("fs")
  .readFileSync(process.platform === "linux" ? "/dev/stdin" : "input.txt")
  .toString()
  .trim()
  .split(" ")
  .map(Number);

let ans = 0;

divide(0, 0, Math.pow(2, N));
console.log(ans);

function divide(row, col, size) {
  if (row === r && col === c) {
    console.log(ans);
    process.exit(0);
  }

  if (r >= row && r < row + size && c >= col && c < col + size) {
    size = parseInt(size / 2);
    divide(row, col, size);
    divide(row, col + size, size);
    divide(row + size, col, size);
    divide(row + size, col + size, size);
  } else ans += size * size;
}
