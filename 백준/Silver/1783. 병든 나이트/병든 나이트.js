const fs = require('fs');
const filePath = process.platform === 'linux' ? '/dev/stdin' : './input';
const stdin = fs.readFileSync(filePath).toString().trim().split('\n').map(s => s.trim());
const input = (() => {
  let line = 0;
  return () => stdin[line++];
})();

let [n, m] = input().split(' ').map(Number);

let ans = 0;

if(n === 1 || m === 1){
  ans += 1;
}
else if(n === 2){
  m = Math.min(m, 8);
  ans = 1 + Math.floor((m-1)/2);
}
else{
  if(m <= 4){
    ans = m;
  }
  else{
    if(m < 8){
      if(m-1 >= 6){
        ans += 5;
      }
      else{
        ans += 4;
      }
    }
    else{
      ans += 4;
      ans += 2;
      ans += m-8;
    }
  }
}

console.log(ans);