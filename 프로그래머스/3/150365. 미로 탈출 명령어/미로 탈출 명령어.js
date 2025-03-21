function solution(n, m, x, y, r, c, k) {
    var answer = '';
    
    const dist = Math.abs(x - r) + Math.abs(y - c);
    if (dist > k) return "impossible";
    if (k > dist && ((k - dist) % 2 !== 0)) return "impossible";
    
    const move = [[1, 0, 'd'], [0, -1, 'l'], [0, 1, 'r'], [-1, 0, 'u']];
    
    x--;
    y--;
    r--;
    c--;
    
    let cx = x;
    let cy = y;
    while (k > 0) {
        for (let i = 0; i < 4; i++) {
            const nx = cx + move[i][0];
            const ny = cy + move[i][1];
            const dir = move[i][2];
            
            if (nx < 0 || nx >= n || ny < 0 || ny >= m) continue;
            const dist = Math.abs(nx - r) + Math.abs(ny - c);
            if (dist <= k - 1) {
                k--;
                cx = nx;
                cy = ny;
                answer += dir;
                break;
            }
        }
    }
    
    return answer;
}