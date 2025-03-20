function solution(n, q, ans) {
    var answer = 0;
    
    const arr = Array.from({length: n}, (_, idx) => idx + 1);
    const combinations = getCombinations(arr, 5);

    for (let i = 0; i < combinations.length; i++) {
        let flag = true;
        const combi = combinations[i];
        for (let j = 0; j < q.length; j++) {
            const cnt = matchCnt(combi, q[j]);
            if (cnt !== ans[j]) {
                flag = false;
                break;
            };
        }
        if (flag) answer++;
    }
    
    function matchCnt(combi, q) {
        let cnt = 0; 
        for (let i = 0; i < combi.length; i++) {
            if (q.includes(combi[i])) cnt++;
        }
            
        return cnt;
    }
    
    function getCombinations(arr, cnt) {
        const res = [];
        
        if (cnt === 1) return arr.map(el => [el]);
        arr.forEach((num, idx, origin) => {
            const rest = origin.slice(idx + 1);
            const attached = getCombinations(rest, cnt - 1);
            const at = attached.map(combi => [num, ...combi]);
            res.push(...at);
        });
        
        return res;
    }
    
    return answer;
}