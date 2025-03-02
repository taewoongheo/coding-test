// 문제요약: 제한시간 내에 퍼즐을 모두 해결하기 위한 숙련도의 최솟값
// 알고리즘 선택:
//  특정 레벨까지 도달했을 땐, 몇 번째 문제까지 해결하는데 모두 같은 값임
//  중복이 발생함
//  dp라면, 테이블을 어떻게 그려야하지?
//      구하고자 하는 건 숙련도
//      중복되는건 특정 문제에 특정 레벨일 경우 소요시간
//      dp[해결한문제][숙련도]=소요시간?
//      잠깐 근데, 숙련도는 정해진 하나의 값임. 이 값을 '열'로 사용하면 답을 구할 수 없음
//      dp[해결한문제][소요시간]=숙련도: 특정문제를 풀기까지 소요시간만큼 있을 때 필요한 숙련도
//          dp[3]에서 가장 작은 값을 구하면, 그게 답임
//      근데 점화식을 못구하겠음
//      아니면 dp[문제][숙련도] = 소요시간?: 몇번째문제에서 얼마의 숙련도면 얼마나 걸리는지
//          dp테이블을 만들 때, diffs min ~ diffs max 로 잡으면 됨
//          그리고 dp[last] 에서 가장 작은 값의 '열'을 선택하면 됨
//      근데 이거 결정문제가 아니지 않나? 예/아니오가 아님
// 이진탐색:
//  숙련도를 diffs min ~ diffs max 범위에서 정해놓고, 그 숙련도가 퍼즐을 제한시간 내에 통과가능한지 체크
// 부분문제분해:
//  binarySearch(s, e): diffs min ~ diffs max
//      m = Math.floor((s + e) / 2);
//      const result = check(m);
//      if (result < limit):
//          ans = Math.min(ans, result)
//          binarySearch(s, m); 더 작은 값으로 가능한지 체크
//      else:
//          binarySearch(m, e); 더 큰 값으로 가능한지 체크
//  check(lvl):
//      let time
//      for puzzle:
//          if lvl >= puzzle[diff]: time += times[puzzle]
//          else time += (times[puzzle] + prevdiff) * (diff-lvl) + times[puzzle]
//      return time;

function solution(diffs, times, limit) {
    var answer = Infinity;
    
    const check = (lvl) => {
        let time = 0; 
        for (let i = 0; i < diffs.length; i++) {
            const diff = diffs[i];
            const needTime = times[i];
            
            if (lvl >= diff) {
                time += needTime;
            } else {
                // 첫 번째 레벨은 항상 1이기 때문에 첫 번째 레벨에서 레벨이 부족할 일은 없음
                const wrongTime = needTime + times[i - 1];
                time += (diff - lvl) * wrongTime + needTime;
            }
        }
        
        return time;
    }
    
    const bs = () => {
        let s = 1, e = diffs.reduce((e, cur) => Math.max(e, cur), 0);
    
        while (s <= e) {
            const m = Math.floor((s + e) / 2);
            const ret = check(m);
            
            if (ret <= limit) {
                answer = Math.min(m, answer);
                e = m - 1;
            } else {
                s = m + 1;
            }
        }
    }
    
    bs();
    
    return answer;
}