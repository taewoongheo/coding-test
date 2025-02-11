function solution(n, s, a, b, fares) {
    var answer = Infinity;
    
    const edges = new Map();
    for (let i = 1; i <= n; i++) {
        edges.set(i, []);
    }
    for (let i = 0; i < fares.length; i++) {
        const [s, e, c] = fares[i];
        edges.get(s).push([e, c]);
        edges.get(e).push([s, c]);
    }
    
    const dist = Array.from({length: n + 1}, _ => Array.from({length: n + 1}, _ => Infinity));
    for (let i = 1; i <= n; i++) {
        dist[i][i] = 0;
        for (const [t, c] of edges.get(i)) {
            dist[i][t] = c;
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
        answer = Math.min(answer, dist[s][i] + dist[i][a] + dist[i][b]);
    }
    
    console.log(dist);

    return answer;
}