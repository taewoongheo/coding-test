const N = +require("fs")
  .readFileSync(process.platform === "linux" ? "/dev/stdin" : "input.txt")
  .toString()
  .trim();

const tree = ["  *  ", " * * ", "*****"];
const answer = Array.from({ length: N }, (_) =>
  Array.from({ length: 2 * N - 1 }, (_) => " ")
);

star(N, 0, 0);
console.log(answer.map((row) => row.join("")).join("\n"));

function star(num, row, col) {
  if (num === 3) {
    for (let i = 0; i < 3; i++) {
      for (let j = 0; j < 5; j++) {
        answer[row + i][col + j] = tree[i][j];
      }
    }

    return;
  }

  star(num / 2, row, col + num / 2);
  star(num / 2, row + num / 2, col);
  star(num / 2, row + num / 2, col + num);
}
