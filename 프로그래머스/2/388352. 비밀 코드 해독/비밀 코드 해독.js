// 문제: 비밀코드로 가능한 조합의 개수를 구하기
// 오름차순 조합을 모두 구한 뒤, q, ans 와 일치하는 조합의 개수를 세기
// 5자리, 1~30 => 30!/25!x5!

function solution(n, q, ans) {
    var answer = 0;
    
    const combinations = getCombination(Array.from({length: n}, (_, idx) => idx + 1), 5);
    
    for (let i = 0; i < combinations.length; i++) {
        let flag = true;
        
        for (let j = 0; j < q.length; j++) {
            if (!check(combinations[i], q[j], ans[j])) {
                flag = false;
                continue;
            }
        }
        
        if (flag) answer++;
    }
    
    function check(combi, q, ans) {
        let cnt = 0; 
        
        for (let i = 0; i < q.length; i++) {
            if (combi.includes(q[i])) cnt++;
        }
        
        if (cnt === ans) return true;
        
        return false;
    }
    
    function getCombination(arr, cnt) {
        const res = [];
        
        if (cnt === 1) return arr.map(el => [el]);
        
        arr.forEach((item, idx, origin) => {
            const rest = arr.slice(idx + 1);
            const combinations = getCombination(rest, cnt - 1);
            const attached = combinations.map(combi => [item, ...combi]);
            res.push(...attached);
        });
        
        return res;
    }
    
    return answer;
}