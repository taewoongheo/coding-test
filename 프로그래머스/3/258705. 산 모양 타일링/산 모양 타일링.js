// 문제요약: 주어진 모양을 정삼각형, 마름모 타일로 채울 수 있는 경우의 수 구하기
// 알고리즘 선택:
//  큰 정삼각형 하나는 4가지 방법 존재
//  작은 삼각형부터 생각해보자. 먼저 이 경우엔 1 가지
//  여기에 인접한 삼각형 하나를 추가, 그럼 총 2가지
//  여기에 인접한 삼각형 하나를 추가, 그럼 총 3가지, ...
//  작은 삼각형 모양이 계속 반복되고 있음 => dp
//      삼각형 개수로 dp
//          만약 n+1 번째에 삼각형 하나가 추가되었다면,
//              인접한 삼각형과 만나 마름모 -> + n-1번째 경우의 수
//              혼자 분리 -> + n번째 경우의 수
//      dp[i]: i번째 삼각형을 연결했을 때 경우의 수
//          = dp[i - 1] + dp[i - 2]
//      이때 고려해야 할 것은, 위쪽에 작은 삼각형이 붙어 큰 삼각형이 이루어졌을 경우,
//          가장 오른쪽 아래에 있는 삼각형이 추가되었을 땐 가운데 삼각형과 마름모를 이루므로,
//              위쪽, 왼쪽 삼각형이 분리된다.
//              따라서 dp[i] = dp[i - 1] + dp[i - 3]
// 부분문제분해:
//  tops를 돌면서 1의 개수를 카운트, dp: 2n+1+(1개수)
//  dp[0]=1
//  if dp.length > 1: dp[1]=2
//  dp는 top을 포함중
//  bTri = false; top존재여부
//  up = dp[1]!==undefined?true:false; 위쪽 삼각형
//  upidx = up=false일때마다 자기자신이 top인지 아래쪽인지 검사
//  for i in 3 ~ dp.length:
//      if (bTri): 이전삼각형이 top이었음
//          dp[i] = dp[i - 1] + dp[i - 3]
//          bTri = false
//      else:
//          dp[i] = dp[i - 1] + dp[i - 2]
//      if (!up): 이전 삼각형이 위 삼각형이므로 나는 top일 가능성이 있음
//          if (tops[upidx]) bTri=true; upidx++
//      else up = !up

function solution(n, tops) {
  var answer = 0;

  const upcnt = tops.reduce((upcnt, el) => {
    if (el) return (upcnt += 1);
    return upcnt;
  }, 0);

  const dp = Array.from({ length: 2 * n + 1 + upcnt }, () => 0);
  dp[0] = 1;
  if (dp.length > 1) dp[1] = 2;

  let bTri = false;
  let prevup = true; // 이전 삼각형의 상태
  let upidx = -1;

  for (let i = 2; i < dp.length; i++) {
    let flag = bTri;
    if (bTri) {
      dp[i] = (dp[i - 1] + dp[i - 3]) % 10007;
      bTri = false;
    } else {
      dp[i] = (dp[i - 1] + dp[i - 2]) % 10007;
    }

    if (prevup) {
      // 이전 삼각형이 위쪽 삼각형이라면, 현재 삼각형이 top 일 가능성이 있다
      upidx++;
      if (tops[upidx]) {
        // top은 아래 삼각형으로 취급
        prevup = false;
        bTri = true;
      } else {
        prevup = !prevup;
      }
    } else {
      if (flag) continue;
      prevup = !prevup;
    }
  }

  return dp[dp.length - 1];
}