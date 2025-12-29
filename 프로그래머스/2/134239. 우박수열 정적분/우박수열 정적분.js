function solution(k, ranges) {
    const graph = [k];
    
    while (k !== 1) {
        if (k % 2 === 0) {
            k = Math.floor(k / 2);
        } else {
            k = k * 3 + 1;   
        }
        graph.push(k);
    }
    
    const n = graph.length - 1;
    
    const area = [];
    for (let i = 0; i < graph.length - 1; i++) {
        const cur = graph[i];
        const next = graph[i + 1];
        
        const diff = Math.abs(cur - next);
        const h = diff / 2;
        const min = Math.min(cur, next);
        
        area.push(min + h);
    }
    
    const res = [];
    for (const range of ranges) {
        const [s, e] = range;
        if (s > n + e) {
            res.push(-1.0);
            continue;
        }
        
        let ans = 0.0;
        for (let i = s; i < n + e; i++) {
            ans += area[i];
        }
        res.push(ans);
    }
    
    return res;
}