function solution(n, computers) {
    let ans = 0;
    const visit = new Set();
    
    for (let i = 0; i < n; i++) {
        if (visit.has(i)) continue;
        dfs(i, visit);
        ans++;
    }
    
    function dfs(node, visit) {
        const s = [node];
        
        while (s.length) {
            const n = s.pop();
            if (visit.has(n)) continue;
            visit.add(n);
   
            for (let i = 0; i < computers[n].length; i++) {
                if (visit.has(i)) continue;
                if (computers[n][i] === 0) continue;
                s.push(i);
            }
        }
    }
    
    return ans;
}