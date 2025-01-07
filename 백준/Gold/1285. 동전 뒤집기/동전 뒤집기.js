//2^N x 2^N = 2^2N = 2^40 = 시간초과
//행만 검사, 그리고 열은 그 행에서 derive 된 값으로 계산 => 2^N
//어떻게 가능한가? 순서가 중요하지 않기 때문.
//그러니까, 동전 하나는 두 번 뒤집히면 원래대로 돌아옴.
//즉, 행을 먼저 뒤집든, 열을 먼저 뒤집든 두 번 뒤집힌 동전은 같은 상태

const input = require("fs")
  .readFileSync(process.platform === "linux" ? "/dev/stdin" : "input.txt")
  .toString()
  .split("\n");

const N = +input.shift();
const m = input.map((el) => el.split(""));

let ans = Infinity;
for (let i = 0; i < 1 << N; i++) {
  //i = 101 = ex) 0번째행과 2번째 행을 뒤집는다
  for (let j = 0; j < N; j++) {
    if (i & (1 << j)) {
      //부분집합 검사, ex) 0번째 행과 2번째 행을 뒤집음. 이 상태를 가지고 열에서 검사함
      reverseRow(j);
    }
  }

  ans = Math.min(ans, check());

  //다음 검사를 위해 원래 상태로 복구
  for (let j = 0; j < N; j++) {
    if (i & (1 << j)) {
      reverseRow(j);
    }
  }
}

console.log(ans);

function reverseRow(row) {
  m[row] = m[row].map((el) => (el === "H" ? "T" : "H"));
}

function check() {
  //현재 m 에서 행을 검사
  //이때 문제에서 T 가 더 적어야 함. 따라서 더 적은 값을 T 로 설정
  let cnt = 0;
  for (let row = 0; row < N; row++) {
    let t = 0;
    for (let col = 0; col < N; col++) {
      if (m[col][row] === "T") t++;
    }
    cnt += Math.min(t, N - t);
  }

  return cnt;
}
