function solution(n, s, a, b, fares) {
    var answer = Infinity;
    
    const g = Array.from({length: n + 1}, () => 
        Array.from({length: n + 1}, () => Infinity)
    )
    
    for (let i = 0; i < fares.length; i++) {
        const [s, e, c] = fares[i];
        g[s][e] = c;
        g[e][s] = c;
    }
    
    for (let i = 1; i <= n; i++) {
        g[i][i] = 0;
    }
    
    for (let k = 1; k <= n; k++) {
        for (let i = 1; i <= n; i++) {
            for (let j = 1; j <= n; j++) {
                if (g[i][k] + g[k][j] < g[i][j]) {
                    g[i][j] = g[i][k] + g[k][j];
                }
            }
        }
    }
    
    console.log(g);
    
    for (let i = 1; i <= n; i++) {
        answer = Math.min(answer, g[s][i] + g[i][a] + g[i][b]);
    }
    
    return answer;
}