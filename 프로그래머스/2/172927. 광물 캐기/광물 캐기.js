// 문제요약: 작업을 끝내기까지 최소한의 피로도 구하기
// 알고리즘 선택: 
//  작업을 끝내다=
//      모든 곡괭이를 사용하거나, 모든 광물을 캠
//  최적화문제이므로 dp의심
//  고려해야 하는 상태: 사용중인 곡괭이, 광물, 피로도
//      dp[광물][곡괭이]=피로도: i번째 광물을 j곡괭이로 캘 때 피로도
//      피로도를 작은 값으로 선택=>부분문제의 최적해 가능
//      그럼 각 부분문제들이 독립적인가?=특정 상태에 여러 경로로 도달가능한가?
//          사용할 수 있는 곡괭이의 수가 정해져 있음. 
//              만약 현재 피로도를 위해 다이아 곡괭이를 사용하면 나중에 사용하지 못함. 
//                  즉, 특정 상태까지 도달하려면 제한된 경로를 따라가야됨(i번째에서 피로도가 높아도 곡괭이를 사용 x-나중에 써야 하기 때문에)
//                  => dp 아님
//  greedy 의심
//      곡괭이로 반드시 5번 연속으로 캐야 함
//      즉, 광물은 5개씩 나뉨
//      나뉜 광물의 비용을 계산하고, 정렬 후, 좋은 곡괭이를 하나씩 사용하면 됨
// 부분문제 분해: 
//  5개씩 그룹화, 이때 다이아, 철, 돌의 개수를 카운트
//  그룹을 정렬, 다이아 > 철 > 돌 순서대로
//  좋은 곡괭이부터 사용해서 첫 번째 그룹부터 계산

function solution(picks, minerals) {
    var answer = 0;
    
    const len = Math.ceil(minerals.length / 5);
    const maxLen = picks[0] + picks[1] + picks[2];
    let marr = [];
    
    for (let i = 0; i < len; i++) {
        if (i >= maxLen) break;
        
        const arr = [0, 0, 0];
        
        minerals.splice(0, 5).forEach(item => {
            switch(item) {
                case "diamond" : arr[0]++; break;
                case "iron" : arr[1]++; break;
                default : arr[2]++; break;
            }
        });
        
        marr.push(arr)
    }
    
    marr = marr.sort((a, b) => {
        if (a[0] !== b[0]) return b[0] - a[0];
        else if (a[1] !== b[1]) return b[1] - a[1];
        return b[0] - a[0];
    });
    
    const tired = [
        [1, 1, 1], 
        [5, 1, 1],
        [25, 5, 1],
    ]
    
    for (let m = 0; m < marr.length; m++) {
        const [d, i, s] = marr[m];
        
        let idx = -1; 
        if (picks[0] > 0) idx = 0;
        else if (picks[1] > 0) idx = 1;
        else if (picks[2] > 0) idx = 2;
        
        if (idx === -1) break;
        
        picks[idx]--;
        answer += tired[idx][0] * d;
        answer += tired[idx][1] * i;
        answer += tired[idx][2] * s;
    };
    
    return answer;
}