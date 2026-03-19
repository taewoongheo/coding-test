// words <= 50 이라 그래프 안그리고 바로 탐색해도 됨

function solution(begin, target, words) {
    let ans = 0;
    
    const visit = new Set(begin);
    
    const queue = [{
        word: begin,
        cnt: 0
    }];
    
    while (queue.length) {
        const {word, cnt} = queue.shift();
        
        if (word === target) {
            ans = cnt;
            break;
        }
        
        const possibles = getPossibles(word, visit);
        
        for (const w of possibles) {
            queue.push({
                word: w,
                cnt: cnt + 1
            })
            visit.add(w);
        }
    }
    
    function getPossibles(word, visit) {
        const possibles = [];
        for (const w of words) {
            let cnt = 0;
            for (let i = 0; i < w.length; i++) {
                if (word.charAt(i) !== w.charAt(i)) cnt++;
                if (cnt >= 2) break;
            }
            if (cnt < 2 && !visit.has(w)) possibles.push(w);
        }
        
        return possibles;
    }
    
    return ans;
}