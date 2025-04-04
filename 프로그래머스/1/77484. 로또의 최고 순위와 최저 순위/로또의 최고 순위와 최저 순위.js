// 문제: 현재 로또의 가능한 최고순위, 최저순위를 구하기
// 최고 순위가 되려면 lottos의 0이 모두 당첨번호가 되면 됨
// 최저 순위가 되려면 0이 모두 다른 번호면 됨
// 그럼 lottos 에 0을 제외한 숫자들 중 당첨번호가 몇 개인지 카운트 = nums
// win_nums - nums = 나올 수 있는 남은 당첨번호들, remain
// 현재 0개수=zcnt
// 최고순위
//  remain >= zcnt 면 zcnt + nums 가 순위
//  remain < zcnt 면 remain + nums 가 순위
// 최저순위
//  nums

function solution(lottos, win_nums) {
    var answer = [];
    
    let nums = 0;
    let zcnt = 0;
    for (const num of lottos) {
        if (num === 0) zcnt++;
        else if (win_nums.includes(num)) nums++;
    }
    
    // 남은 당첨번호들
    const remain = win_nums.length - nums;
    
    // 최저순위
    if (nums < 2) answer[1] = 6;
    else answer[1] = 6 - nums + 1;
    
    // 최고순위
    if (remain >= zcnt) {
        if (zcnt + nums < 2) answer[0] = 6;
        else answer[0] = 6 - (zcnt + nums) + 1;
    } else {
        if (remain + nums < 2) answer[0] = 6;
        else answer[0] = 6 - (remain + nums) + 1;
    }
    
    return answer;
}