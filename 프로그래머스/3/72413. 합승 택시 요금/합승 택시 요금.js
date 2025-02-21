// 문제요약: 두 정점으로 이동해야 하는 경우, 공통으로 이동하는 경우를 고려하여 최소 비용 구하기
// 모든 정점들이 각 정점들로부터 최단 거리를 알고 있는 경우 -> 플로이드 워셜 알고리즘

function solution(n, s, a, b, fares) {
    var answer = Infinity;
    
    const g = Array.from({length: n + 1}, () => Array.from({length: n + 1}, () => Infinity));
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

    for (let i = 1; i <= n; i++) {
        answer = Math.min(answer, g[s][i] + g[i][a] + g[i][b]);
    }
    
    return answer;
}