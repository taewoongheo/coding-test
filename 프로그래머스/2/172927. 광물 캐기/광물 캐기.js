// 문제요약: 광물을 모두 캐거나 곡괭이를 모두 사용할 때까지 최소 피로도
// 알고리즘 선택: 
//  한번 선택한 곡괭이로 5개를 무조건 캐야함
//  광물을 캐는 순서가 정해져 있음
//      즉, 광물은 5개씩 그룹화 뒤, 그 순서대로만 캐야함
//  만약 5개씩 그룹화된 광물을 좋은 곡괭이부터 사용한다면 나중에 피로도가 높아질 수 있음
//  따라서 광물을 피로도 순서대로 정렬한 뒤, 좋은 곡괭이부터 사용하면 됨
//  어차피 정렬해도 5개씩만 캐면 된다는 순서만 유지하면 되기 때문에 상관없음

function solution(picks, minerals) {
    var answer = 0;
    
    const max = Math.min((picks[0] + picks[1] + picks[2]) * 5, minerals.length);
    let arr = [];
    let marr = [0, 0, 0];
    let cnt = 0;
    
    for (let i = 0; i < max; i++) {
        const m = minerals[i];
        
        if (m === 'diamond') marr[0]++;
        else if (m === 'iron') marr[1]++;
        else marr[2]++;
        cnt++;
        
        if (cnt === 5) {
            cnt = 0;
            arr.push(marr);
            marr = [0, 0, 0];
        }
    }
    arr.push(marr);
    
    arr = arr.sort((a, b) => {
        if (a[0] !== b[0]) return b[0] - a[0];
        else if (a[1] !== b[1]) return b[1] - a[1];
        return b[2] - a[2];
    });
    
    const tired = [
        [1, 1, 1],
        [5, 1, 1],
        [25, 5, 1],
    ]
    
    arr.forEach(el => {
        const [d, i, s] = el;
        
        let idx = 0;
        if (picks[0] > 0) idx = 0;
        else if (picks[1] > 0) idx = 1;
        else if (picks[2] > 0) idx = 2;
        
        picks[idx]--;
        answer += tired[idx][0] * d;
        answer += tired[idx][1] * i;
        answer += tired[idx][2] * s;
    });
    
    
    return answer;
}