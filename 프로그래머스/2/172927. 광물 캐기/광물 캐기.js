// 문제요약: 모든 광물들을 캘 때 최소한의 피로도 구하기
// 알고리즘 선택: 
//  곡괭이로 5번 연속으로 캐야함
//  상태: 현재광물, 곡괭이, 피로도
//      dp[현재광물][곡괭이]=피로도: 광물i이고 j곡괭이일 때 최소 피로도
//      부분문제의 최적해?
//          낮은 피로도를 유지하기 위해선 가장 좋은 곡괭이부터 사용해야 함
//          이 경우 나중에 가서 다이아가 연속으로 나왔을 때 불리해질 수 있음
//          즉, 부분문제의 해는 최적해가 아님
//  greedy
//      광물은 무조건 5개씩 캐야됨
//      광물을 5개씩 세트로 만들고, 세트를 가중치 순서대로 정렬
//      이후 좋은 곡괭이부터 사용하면 됨
// 부분문제 분해: 
//  만약 곡괭이로 캘 수 있는 광물 수가 더 많다면, 광물의 최대 수 만큼. 광물이 더 많다면, 곡괭이 최대 수만큼까지만 그룹화
//  가중치 기준 오름차순 정렬
//  다이아->철->돌 곡괭이 순으로 사용

function solution(picks, minerals) {
    var answer = 0;
    
    const max = Math.min((picks[0] + picks[1] + picks[2]) * 5, minerals.length);
    let marr = [0, 0, 0];
    let arr = [];
    let cnt = 0;
    
    for (let i = 0; i < minerals.length; i++) {
        if (max <= i) break;
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
    arr.forEach(item => {
        const [d, i, s] = item;
        
        let idx = 0;
        if (picks[0] > 0) idx = 0;
        else if (picks[1] > 0) idx = 1;
        else idx = 2;
        
        picks[idx]--;
        
        answer += tired[idx][0] * d;
        answer += tired[idx][1] * i;
        answer += tired[idx][2] * s;
    })
    
    return answer;
}