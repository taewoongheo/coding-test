// 문제: 제한시간 내에 모든 퍼즐을 해결할 수 있는 숙련도의 최솟값 구하기
// diffs 길이 <= 300000, limit <= 10^15, diffs[i]=100000
//  이진탐색?
//      숙련도 범위를 min diffs ~ max diffs 사이에서 결정
//      만약 limit 을 넘치면 level 을 올림, limit 을 넘치지 않으면 갱신하고 level 내림


function solution(diffs, times, limit) {
    var answer = Infinity;
    
    let s = 1, e = diffs.reduce((e, cur) => Math.max(e, cur), 0);
    
    while (s <= e) {
        const m = Math.floor((s + e) / 2);
        
        if (cal(m)) {
            answer = Math.min(answer, m);
            e = m - 1;
        } else s = m + 1;
    }
    
    function cal(lvl) {
        let total = 0;
        
        let prev = 0;
        for (let i = 0; i < diffs.length; i++) {
            const diff = diffs[i];
            const time = times[i];
            if (lvl >= diff) total += time;
            else {
                const cnt = diff - lvl;
                total += (prev + time) * cnt + time;
            }
            prev = time;
        }
        
        if (total <= limit) return true;
            
        return false;
    }
    
    return answer;
}