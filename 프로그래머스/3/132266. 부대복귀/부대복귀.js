function solution(n, roads, sources, destination) {
    const graph = Array.from( {length: n + 1 }, () => []);
    
    for (const [a, b] of roads) {
        graph[a].push(b);
        graph[b].push(a);
    }
    
    const dist = Array(n + 1).fill(-1);
    dist[destination] = 0;
    
    const q = [destination];
    let head = 0;
    
    while (head < q.length) {
        const node = q[head++];
        
        for (const next of graph[node]) {
            if (dist[next] !== -1) continue;
            
            dist[next] = dist[node] + 1;
            q.push(next);
        }
    }
    
    return sources.map(source => dist[source]);
}