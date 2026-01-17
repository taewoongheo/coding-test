// 완전탐색으로 뚫으면?
//  항상 오름차순 정렬이기 때문에 조합임
//  nCk=n!/(k!(n-k)!)=30!/(25!5!) = 142506
// 모든 조합에 대해 입력한 정수들을 각각 검사한다면
//  142506x10x5=가능

function solution(n, q, ans) {
    let result = 0;
    
    const arr = Array.from({length: n}, (_, i) => i + 1);
    
    const getCombinations = (arr, selectedIdx) => {
        if (selectedIdx === 1) return arr.map(el => [el]);
        
        const res = [];
        arr.forEach((fixed, index, origin) => {
            const rest = origin.slice(index + 1);
            const combi = getCombinations(rest, selectedIdx - 1);
            const attached = combi.map(el => [fixed, ...el]);
            res.push(...attached);
        })
        
        return res;
    }
    
    const combinations = getCombinations(arr, 5);
    
    for (const combi of combinations) {
        let s = true;
        
        for (let i = 0; i < q.length; i++) {
            let cnt = 0;
            for (let j = 0; j < 5; j++) {
                if (combi.includes(q[i][j])) cnt++;
            }
            if (cnt !== ans[i]) {
                s = false;
                break;
            }
        }
        
        if (s) result++;
    }
    
    return result;
}