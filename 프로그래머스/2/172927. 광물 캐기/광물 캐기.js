// 문제요약: 광물을 캘 때 최소한의 피로도 구하기
// 알고리즘 선택: 
//  곡괭이 하나당 최대 5번 사용가능
//  한 번 사용한 곡괭이는 끝까지 사용해야 함
//  광물을 모두 캐거나, 곡괭이를 사용할 수 없을 때까지
//  특정 광물에서 어떤 곡괭이를 사용할 것인가?
//      한번 사용하기 시작한 곡괭이는 최대 5번 사용가능
//  곡괭이는 최대 15개. 순열을 만든다고 하면 15^15(각 자릿수마다 15개씩 가능)
//      곡괭이의 순서를 직접 모두 고려하면 시간초과
//  특정 상태에서 행동할 수 있는 건 두 가지. 현재 곡괭이를 계속 사용하거나, 다른 곡괭이를 사용하거나
//  그리고 그 상태까지 경우의 수가 계속 중복(n+1 상태에서보면, n까지의 상태가 중복됨)
//  근데 곡괭이 하나 당 5번 이하로 쓸 수 있는 것 때문에 dp가 안됨
//      고려해야 하는 상태가 곡괭이, 곡괭이 사용횟수, 현재 광물, 피로도 4개임
//      일단 dp는 아니다 그럼
//      그리고 그렇게 부분문제를 잡았다하더라도, 그게 최적해가 아님
//          왜냐하면 현재 피로도가 낮게 하려고 다이아 곡괭이 썼다가 나중에 필요 시 못쓸 수 있음
//              => 근데 이렇게 하는거 맞나? 이건 greedy 아닌가
//  dfs?
//      구현은 가능한데, 시간복잡도를 계산해봐야 함
//      현재 곡괭이 당 5개의 경우의 수가 생김
//      또한 남은 곡괭이에서 하나를 골라야 됨
//      picks는 최대 15개, 그리고 곡괭이 하나 당 5. 
//          시간복잡도 어떻게 잡음? 
//              현재 곡괭이에서 15개 중 하나를 고르거나, 아님 5번 이하로 사용=>15!x5
//          하지만 minerals의 깊이는 최대 50임. 

function solution(picks, minerals) {
    var answer = Infinity;
    
    const status = [];
    let idx = 0;
    
    for (let i = 0; i < picks.length; i++) {
        let r = 'diamond'; 
        if (i === 1) r = 'iron'; 
        else if (i === 2) r = 'stone';
        
        for (let j = 0; j < picks[i]; j++) {
            status[idx++] = {
                r: r,
                left: 5,
                used: false,
            }
        }
    }
    
    const tlqkf = [];
    dfs(null, status, 0, 0);
    console.log(tlqkf)
    
    
    function dfs(cur, v, cnt, idx) {
        
        if (idx === minerals.length - 1) {
            answer = Math.min(answer, cnt);
            return;
        }
        
        const m = minerals[idx];
        
        if (cur !== null && cur.left > 0) {
            const f = getFatigue(cur.r, m);
            v.left--;
            dfs(cur, v, cnt + f, idx + 1);
            v.left++;
        }
        
        for (let i = 0; i < v.length; i++) {
            if (!v[i].used) {
                const f = getFatigue(v[i].r, m);
                
                v[i].used = true;
                v[i].left--;
                dfs(v[i], v, cnt + f, idx + 1);
                v[i].used = false;
                v[i].left++;
            }
        }
    }
    
    function getFatigue(pick, mine) {
        if (pick === 'diamond') {
            return 1;
        } else if (pick === 'iron') {
            if (mine === 'diamond') {
                return 5;
            }
            return 1;
        } else {
            if (mine === 'diamond') {
                return 25; 
            } else if (mine === 'iron') {
                return 5;
            }
            return 1;
        }
    } 
    
    return answer;
}
