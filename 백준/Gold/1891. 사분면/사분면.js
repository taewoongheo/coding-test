const [d, s, x, y] = require("fs")
  .readFileSync(process.platform === "linux" ? "/dev/stdin" : "input.txt")
  .toString()
  .trim()
  .split("\n")
  .map((el) => el.split(" "))
  .flat();

let [sx, sy] = findPosition(0, Math.pow(2, d) - 1, 0, Math.pow(2, d) - 1, 0);
sx += +x;
sy -= +y;
console.log(makePosition(0, Math.pow(2, d) - 1, 0, Math.pow(2, d) - 1, -1, ""));

function findPosition(xs, xe, ys, ye, depth) {
  if (depth === Number(d)) {
    return [xs, ys];
  }
  const char = s.at(depth);
  const xm = xs + Math.floor((xe - xs) / 2);
  const ym = ys + Math.floor((ye - ys) / 2);
  switch (char) {
    case "1": {
      return findPosition(xm + 1, xe, ys, ym, depth + 1);
    }
    case "2": {
      return findPosition(xs, xm, ys, ym, depth + 1);
    }
    case "3": {
      return findPosition(xs, xm, ym + 1, ye, depth + 1);
    }
    case "4": {
      return findPosition(xm + 1, xe, ym + 1, ye, depth + 1);
    }
    default:
      return [];
  }
}

function makePosition(xs, xe, ys, ye, depth, str) {
  if (depth === d - 1) {
    return str;
  }
  const xm = xs + Math.floor((xe - xs) / 2);
  const ym = ys + Math.floor((ye - ys) / 2);

  if (sx >= xm + 1 && sx <= xe && sy >= ys && sy <= ym) {
    // 1사분면
    return makePosition(xm + 1, xe, ys, ym, depth + 1, str + "1");
  } else if (sx >= xs && sx <= xm && sy >= ys && sy <= ym) {
    // 2사분면
    return makePosition(xs, xm, ys, ym, depth + 1, str + "2");
  } else if (sx >= xs && sx <= xm && sy >= ym + 1 && sy <= ye) {
    // 3사분면
    return makePosition(xs, xm, ym + 1, ye, depth + 1, str + "3");
  } else if (sx >= xm + 1 && sx <= xe && sy >= ym + 1 && sy <= ye) {
    // 4사분면
    return makePosition(xm + 1, xe, ym + 1, ye, depth + 1, str + "4");
  }
  return -1;
}
