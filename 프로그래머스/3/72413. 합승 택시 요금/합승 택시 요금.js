function solution(n, s, a, b, fares) {
    var answer = Number.MAX_SAFE_INTEGER;
    
    const g = Array.from({length: n + 1}, () => Array.from({length: n + 1}, () => Infinity))
    const dist = Array.from({length: n + 1}, () => Array.from({length: n + 1}, () => Infinity))
    
    for (let i = 0; i < fares.length; i++) {
        const [v1, v2, cost] = fares[i];
        g[v1][v2] = cost;
        g[v2][v1] = cost;
    }
    
    for (let i = 1; i <= n; i++) {
        for (let j = 1; j <= n; j++) {
            if (i === j) dist[i][j] = 0;
            else dist[i][j] = g[i][j];
        }
    }
    
    for (let k = 1; k <= n; k++) {
        for (let i = 1; i <= n; i++) {
            for (let j = 1; j <= n; j++) {
                if (dist[i][k] + dist[k][j] < dist[i][j]) {
                    dist[i][j] = dist[i][k] + dist[k][j];
                }
            }
        }
    }
    
    for (let i = 1; i <= n; i++) {
        answer = Math.min(answer, dist[s][i] + dist[i][a] + dist[i][b])
    }
    
    return answer;
}